import Big from 'big.js';
import mongoose from 'mongoose';
import {
  CART_STATUS,
  CURRENCIES,
  DELIVERY_METHODS,
  PAYMENT_GATEWAYS,
  PAYMENT_METHODS,
  SHIPPING_METHODS,
} from '../../constants/enums.js';
import CartExpiryService from '../../services/cart/CartExpiryService.js';
import CartStockService from '../../services/cart/CartStockService.js';
import CartTotalsService from '../../services/cart/CartTotalsService.js';
import CartValidationService from '../../services/cart/CartValidationService.js';
import { logger } from '../../utils/logger.js';
import { cartItemSchema } from './cartItemSchema.js';
import AppError from '../../utils/HandleAppErrors.js';

const { Schema, model } = mongoose;
const { ObjectId } = Schema;

const CartSchema = new Schema(
  {
    user: {
      type: ObjectId,
      ref: 'User',
      required: false,
    },
    guestCartId: {
      type: String,
      trim: true,
      required: false,
      index: true,
    },
    guestEmail: {
      type: String,
      trim: true,
      required: false,
      index: true,
    },
    guestFullName: {
      type: String,
      trim: true,
      required: false,
    },
    guestPhoneNumber: {
      type: String,
      required: false,
    },
    shop: {
      type: ObjectId,
      ref: 'Shop',
      // required: true,
    },

    items: [cartItemSchema],

    status: {
      type: String,
      enum: Object.values(CART_STATUS),
      default: CART_STATUS.ACTIVE,
    },

    appliedCoupons: [
      {
        code: {
          type: String,
          required: true,
          trim: true,
          uppercase: true,
        },
        discountValue: {
          type: Schema.Types.Decimal128,
          required: true,
          default: 0,
          get: (v) => parseFloat(v.toString()).toFixed(2),
        },
        couponId: {
          type: ObjectId,
          ref: 'DiscountCoupon',
          required: true,
        }, // Add reference to DiscountCoupon for validation
      },
    ],
    order: {
      type: ObjectId,
      ref: 'Order',
      default: null,
    },
    shippingAddress: {
      type: ObjectId,
      ref: 'Address',
      required: false,
    },

    shippingMethod: {
      type: String,
      enum: SHIPPING_METHODS,
      required: function () {
        return this.deliveryMethod === DELIVERY_METHODS.SHIPPING;
      },
    },

    notes: {
      type: String,
      default: '',
    },
    paymentTransactionId: {
      type: String,
    },
    paymentGateway: {
      type: String,
      enum: PAYMENT_GATEWAYS,
    },
    paymentMethod: {
      type: String,
      enum: PAYMENT_METHODS,
    },
    taxes: {
      type: Schema.Types.Decimal128,
      default: 0,
      get: (v) => parseFloat(v.toString()).toFixed(2),
    },
    shippingFee: {
      type: Schema.Types.Decimal128,
      default: 0,
      get: (v) => parseFloat(v.toString()).toFixed(2),
    },
    subtotal: {
      type: Schema.Types.Decimal128,
      default: 0,
      get: (v) => parseFloat(v.toString()).toFixed(2),
      // Note: Use 'subtotal' for persistent storage and queries; use virtual 'totalPrice' for dynamic client-side display
    },
    currency: {
      type: String,
      enum: Object.values(CURRENCIES),
      default: 'NGN',
    },
    exchangeRate: {
      type: Number,
      default: 1,
    },
    exchangeRateSnapshot: {
      type: Number,
      default: 1,
      // Stores the exchange rate at the time of item addition to ensure consistency
    },
    sharedWith: [
      {
        type: ObjectId,
        ref: 'User',
      },
    ],
    abandonedReason: {
      type: String,
      default: '',
    },
    abandonedInsights: {
      deviceType: String,
      timeSpent: Number,
      exitPage: String,
    },
    bundlePurchase: {
      type: Boolean,
      default: false,
    },
    estimatedDelivery: {
      type: Date,
    },
    completedAt: {
      type: Date,
      default: null,
    },
    locked: {
      type: Boolean,
      default: false,
      index: true, // Optional but helpful for performance if you filter by it often
    },
    lockAcquiredAt: {
      type: Date,
      default: null,
    },
    expiresAt: {
      type: Date,
      default: () => new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true, getters: true },
    toObject: { virtuals: true },
  }
);

// // Virtual for dynamic total price (for client-side display)
// CartSchema.virtual('totalPrice').get(function () {
//   return Big(
//     this.items.reduce((acc, item) => acc.plus(Big(item.finalPrice).times(item.quantity)), Big(0))
//   ).toFixed(2);
// });

// // Virtual for total discount (sum of appliedCoupons.discountValue)
// CartSchema.virtual('totalDiscount').get(function () {
//   return this.appliedCoupons
//     .reduce((acc, coupon) => acc.plus(Big(coupon.discountValue)), Big(0))
//     .toFixed(2);
// });
// Line totals come from your computeTotals step, so finalPrice is line total

// 1. totalPrice = sum of each line's finalPrice
CartSchema.virtual('totalPrice').get(function () {
  return Big(this.items.reduce((acc, item) => acc.plus(Big(item.finalPrice)), Big(0))).toFixed(2);
});

// 2. totalDiscount = sum of each line's discountAmount
CartSchema.virtual('totalDiscount').get(function () {
  return Big(
    this.items.reduce((acc, item) => acc.plus(Big(item.discountAmount)), Big(0)),
    Big(0)
  ).toFixed(2);
});

// Update totalWithShipping virtual
CartSchema.virtual('totalWithShipping').get(function () {
  const subtotal = Big(this.subtotal || 0);
  const shipping = Big(this.shippingFee || 0);
  const discount = Big(this.totalDiscount || 0); // virtual returns string
  const taxes = Big(this.taxes || 0);
  return subtotal.minus(discount).plus(taxes).plus(shipping).toFixed(2);
});

CartSchema.virtual('grandTotal').get(function () {
  const subtotal = Big(this.subtotal || 0);
  const discount = Big(this.totalDiscount || 0); // virtual
  const taxes = Big(this.taxes || 0);
  const shipping = Big(this.shippingFee || 0);
  return subtotal.minus(discount).plus(taxes).plus(shipping).toFixed(2);
});

// Single pre-save hook
CartSchema.pre('save', async function (next) {
  try {
    // 1️⃣ Validate identity: must have userId OR guestEmail/guestCartId (and no mix)
    await CartValidationService.ensureValidIdentifiers({
      userId: this.user?.toString(),
      guestEmail: this.guestEmail,
      guestCartId: this.guestCartId,
      shippingAddress: this.shippingAddress, // optional object
      guestFullName: this.guestFullName, // required if shippingAddress + guest
      guestPhoneNumber: this.guestPhoneNumber, // required if shippingAddress + guest
    });

    // 2️⃣ Enforce maximum cart size
    if (this.items.length > 100) {
      throw new AppError('Cart cannot exceed 100 items.', 400);
    }

    // 3️⃣ Stock availability on all items
    await CartStockService.verifyStock(this);

    // Validate applied coupons before computing totals
    // await CartValidationService.validateAppliedCoupons(this);

    // 4️⃣ Recompute all totals (subtotal, discounts, taxes, shipping)
    await CartTotalsService.computeTotals(this);

    // 5️⃣ Extend expiry on modification or new cart
    await CartExpiryService.extendExpiry(this);

    // 6️⃣ Prevent manual status flips to COMPLETED
    if (
      this.isModified('status') &&
      this.status === CART_STATUS.COMPLETED &&
      !this.__allowComplete
    ) {
      throw new AppError('Use CheckoutService.completeCheckout for completing carts.', 400);
    }

    next();
  } catch (error) {
    // Log full context for debugging
    logger.error('Cart save error', {
      cartId: this._id?.toString(),
      userId: this.user?.toString(),
      guestEmail: this.guestEmail,
      guestCartId: this.guestCartId,
      error: error.message,
    });
    next(error);
  }
});

CartSchema.index({ user: 1, status: 1 });
CartSchema.index({ guestCartId: 1, status: 1 });
CartSchema.index({ guestEmail: 1, status: 1 });
CartSchema.index({ createdAt: 1 });
CartSchema.index(
  { user: 1, status: 1, updatedAt: -1 },
  { partialFilterExpression: { status: CART_STATUS.ACTIVE } }
);
CartSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

const Cart = model('Cart', CartSchema);
export default Cart;

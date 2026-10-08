import mongoose from 'mongoose';
import Big from 'big.js';
import {
  ORDER_STATUS,
  PAYMENT_STATUS,
  DELIVERY_METHODS,
  CURRENCIES,
} from '../../constants/enums.js';
import OrderValidationService from '../../services/order/OrderValidationService.js';
import { orderItemSchema } from './orderItemSchema.js';
import { generateTransactionId } from '../../utils/generators.js';

const { Schema, model } = mongoose;
const { ObjectId } = Schema;

const OrderSchema = new Schema(
  {
    // ——— Identity ———
    user: {
      type: ObjectId,
      ref: 'User',
      required: false,
      index: true,
    },

    guestEmail: {
      type: String,
      trim: true,
      lowercase: true,
      default: null,
      index: true,
    },

    shop: {
      type: ObjectId,
      ref: 'Shop',
      required: true,
      index: true,
    },

    // ——— Core Order Info ———
    orderId: {
      type: String,
      required: true,
      unique: true,
      index: true,
      default: () => generateTransactionId({ prefix: 'ORD-' }),
    },

    items: {
      type: [orderItemSchema],
      required: true,
      validate: {
        validator: (arr) => arr.length > 0,
        message: 'An order must contain at least one item',
      },
    },

    // ——— Coupons ———
    appliedCoupons: [
      {
        code: { type: String, trim: true, uppercase: true, required: true },
        discountValue: {
          type: Schema.Types.Decimal128,
          default: 0,
          get: (v) => parseFloat(v.toString()).toFixed(2),
        },
        couponId: { type: ObjectId, ref: 'DiscountCoupon', required: true },
      },
    ],

    // ——— Payment & Shipment ———
    shippingAddress: {
      type: ObjectId,
      ref: 'Address',
      default: null,
    },

    billingAddress: {
      type: ObjectId,
      ref: 'Address',
      required: function () {
        return !this.isDigital;
      },
      default: null,
    },

    deliveryMethod: {
      type: String,
      enum: Object.values(DELIVERY_METHODS),
      required: true,
      default: 'InApp',
    },
    pickupStationId: { type: ObjectId, ref: 'PickupStation', default: null },

    // ——— Statuses ———
    orderStatus: {
      type: String,
      enum: Object.values(ORDER_STATUS),
      default: ORDER_STATUS.PENDING,
      index: true,
    },
    paymentStatus: {
      type: String,
      enum: PAYMENT_STATUS,
      default: PAYMENT_STATUS.PENDING,
      index: true,
    },

    // ——— Money fields ———
    subtotal: {
      type: Schema.Types.Decimal128,
      required: true,
      get: (v) => parseFloat(v.toString()).toFixed(2),
    },
    discountAmount: {
      type: Schema.Types.Decimal128,
      default: 0,
      get: (v) => parseFloat(v.toString()).toFixed(2),
    },
    taxAmount: {
      type: Schema.Types.Decimal128,
      default: 0,
      get: (v) => parseFloat(v.toString()).toFixed(2),
    },
    shippingFee: {
      type: Schema.Types.Decimal128,
      default: 0,
      get: (v) => parseFloat(v.toString()).toFixed(2),
    },
    grandTotal: {
      type: Schema.Types.Decimal128,
      required: true,
      get: (v) => parseFloat(v.toString()).toFixed(2),
    },

    currency: {
      type: String,
      enum: Object.values(CURRENCIES),
      default: 'NGN',
    },
    storeCurrency: {
      type: String,
      enum: Object.values(CURRENCIES),
      default: 'NGN',
    },
    exchangeRate: {
      type: Number,
      required: true,
      default: 1,
    },
    totalInLocalCurrency: {
      type: Schema.Types.Decimal128,
      required: true,
      get: (v) => parseFloat(v.toString()).toFixed(2),
    },
    totalInStoreCurrency: {
      type: Schema.Types.Decimal128,
      required: true,
      get: (v) => parseFloat(v.toString()).toFixed(2),
    },
    statusHistory: [
      {
        status: {
          type: String,
          required: true,
          enum: Object.values(ORDER_STATUS),
        },
        changedAt: {
          type: Date,
          default: Date.now,
        },
        reason: {
          type: String,
          trim: true,
        },
        changedBy: {
          type: ObjectId,
          ref: 'User', // or 'Admin' if you have separate models
          default: null,
        },
        source: {
          type: String,
          enum: ['system', 'admin_panel', 'customer_portal'],
          default: 'system',
        },
      },
    ],

    // ——— Digital / Logistics ———
    isDigital: { type: Boolean, default: false },
    trackingNumber: { type: String, default: null },
    fulfilledAt: {
      type: Date,
      default: null,
      index: true,
      description: 'Actual timestamp when order was fulfilled',
    },
    estimatedDeliveryDate: {
      type: Date,
      default: null,
      description: 'Predicted delivery date based on shipping method',
    },

    // ——— Misc ———
    notes: { type: String, default: '' },

    invoiceUrl: {
      type: String,
      default: null,
      trim: true,
      validate: {
        validator: (v) => !v || /^https?:\/\/.+/.test(v),
        message: 'invoiceUrl must be a valid URL',
      },
      description: 'Public or signed URL to download/view invoice PDF or HTML',
    },

    isGift: { type: Boolean, default: false },

    // free‑form metadata
    metadata: {
      type: Map,
      of: Schema.Types.Mixed,
      default: {},
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true, getters: true },
    toObject: { virtuals: true, getters: true },
  }
);

// ─── Virtuals ───────────────────────────────────────────────────────────────

// Total items count
OrderSchema.virtual('totalItems').get(function () {
  return this.items.reduce((sum, item) => sum + item.quantity, 0);
});

// Sum of all coupon discounts
OrderSchema.virtual('totalDiscount').get(function () {
  return this.appliedCoupons.reduce((acc, c) => acc.plus(Big(c.discountValue)), Big(0)).toFixed(2);
});

// ─── Middleware ─────────────────────────────────────────────────────────────

// Consolidated pre‑save validation
OrderSchema.pre('save', async function (next) {
  try {
    await OrderValidationService.validate(this);
    next();
  } catch (err) {
    next(err);
  }
});

// ─── Indexes ────────────────────────────────────────────────────────────────

OrderSchema.index({ user: 1, orderId: 1 });
OrderSchema.index({ guestEmail: 1, orderStatus: 1 });
OrderSchema.index({ createdAt: -1 });
OrderSchema.index({ shop: 1, orderStatus: 1 });

export default model('Order', OrderSchema);

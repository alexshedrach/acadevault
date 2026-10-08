// services/cart/CartItemService.js

import AppError from '../../utils/HandleAppErrors.js';
import { logger } from '../../utils/logger.js';
import { Big } from '../../utils/numberUtils.js';
import taxCalculation from '../../utils/taxCalculation.js';
import DiscountService from '../discount/DiscountService.js';
import DiscountCoupon from '../../api/models/DiscountCouponModel.js';

class CartItemService {
  /**
   * Compute tax, discount, and per-unit final price for a single cart item,
   * using the embedded materialSnapshot rather than re-populating the master record.
   *
   * @param {Object} item - The cart item
   * @param {mongoose.Document} cart - The parent cart (for shippingAddress, appliedCoupons)
   * @returns {{ taxAmount: number, discountAmount: number, finalPrice: number }}
   */
  static async computeLineItem(item, cart) {
    try {
      // 1️⃣ Require valid snapshot
      const snap = item.materialSnapshot;
      if (!snap || !snap._id) {
        throw new AppError('Invalid cart item: missing material snapshot.', 400);
      }

      // 2️⃣ Unit price and quantity validations
      const unitPriceRaw = snap.unitPrice;
      if (!unitPriceRaw || item.quantity <= 0) {
        throw new AppError('Item price and quantity must be valid.', 400);
      }

      const unitPrice = Big(unitPriceRaw);
      if (unitPrice.lte(0)) {
        throw new AppError('Unit price must be greater than zero.', 400);
      }

      const lineSubtotal = unitPrice.times(item.quantity);

      // 3️⃣ Tax calculation
      const country = cart.shippingAddress?.country ?? null;
      const state = cart.shippingAddress?.state ?? null;
      const taxRaw = await taxCalculation.calculateTaxAmount(
        parseFloat(lineSubtotal.toFixed(2)),
        country,
        state
      );
      const taxAmount = Big(taxRaw || 0);

      // 4️⃣ Apply applicable coupon discounts
      let discountAmount = Big(0);
      const coupons = Array.isArray(cart.appliedCoupons) ? cart.appliedCoupons : [];

      for (const { couponId, code } of coupons) {
        if (!couponId || !code) continue;

        const couponDoc = await DiscountCoupon.findById(couponId).lean();
        if (!couponDoc) continue;

        const couponMeta = await DiscountService.calculateDiscount(
          code,
          cart.user?.toString(),
          parseFloat(lineSubtotal.toFixed(2)),
          [snap.category?.toString()].filter(Boolean),
          cart.guestEmail,
          cart._id?.toString()
        );

        if (
          couponMeta.valid &&
          couponMeta.couponRecord.scope === 'Specific' &&
          couponMeta.couponRecord.applicableToModel === 'Category' &&
          couponMeta.couponRecord.applicableTo?.map(String).includes(snap.category?.toString())
        ) {
          discountAmount = discountAmount.plus(Big(couponMeta.discountAmount || 0));
        }
      }

      // 5️⃣ Final gross & per-unit price calculation
      const gross = lineSubtotal.minus(discountAmount).plus(taxAmount);
      if (gross.lt(0)) {
        throw new AppError('Gross price cannot be negative', 400);
      }

      const finalPrice = gross.div(item.quantity);

      // 6️⃣ Return with strong typing
      return {
        taxAmount: Number(taxAmount.toFixed(2)),
        discountAmount: Number(discountAmount.toFixed(2)),
        finalPrice: Number(finalPrice.toFixed(2)),
      };
    } catch (err) {
      logger.error(`computeLineItem failed`, {
        message: err.message,
        cartId: cart._id?.toString(),
        itemId: item._id?.toString(),
        materialId: item.materialSnapshot?._id?.toString(),
        userId: cart.user?.toString(),
        guestEmail: cart.guestEmail,
        stack: err.stack,
      });
      throw new AppError(
        err.message || 'Failed to compute cart item details.',
        err.statusCode || 500
      );
    }
  }
}

export default CartItemService;

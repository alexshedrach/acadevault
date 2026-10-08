import mongoose from 'mongoose';
import { toDecimal128 } from '../../utils/numberUtils.js';
import AppError from '../../utils/HandleAppErrors.js';
import { logger } from '../../utils/logger.js';
import { CART_STATUS, DISCOUNT_STATUSES, DISCOUNT_SCOPES } from '../../constants/enums.js';
import { Big } from '../../utils/numberUtils.js';
import DiscountCoupon from '../../api/models/DiscountCouponModel.js';
import CouponUsage from '../../api/models/CouponUsage.js';
import Cart from '../../api/models/CartModel.js';
import CartTotalsService from '../cart/CartTotalsService.js';
import CartValidationService from '../cart/CartValidationService.js';

class DiscountService {
  static async calculateDiscount(
    discountCode,
    userId,
    cartTotal,
    itemCategories = [],
    guestEmail = null,
    guestCartId = null
  ) {
    try {
      // Validate inputs
      if (!discountCode || typeof discountCode !== 'string') {
        throw new AppError('Discount code must be a non-empty string.', 400);
      }
      if (!Big(cartTotal).gte(0)) {
        throw new AppError('Cart total must be a non-negative number.', 400);
      }

      // Validate the discount against rules
      const validation = await this.validateDiscount(
        discountCode.trim().toUpperCase(),
        userId,
        cartTotal,
        itemCategories,
        guestEmail,
        guestCartId
      );

      if (!validation.valid) {
        return {
          valid: false,
          discountAmount: toDecimal128(0),
          discount: null,
          message: validation.message,
        };
      }

      const normalizedCode = discountCode.trim().toUpperCase();
      logger.info('Normalized discount code: ', { normalizedCode });

      const discount = await DiscountCoupon.findOne({
        code: normalizedCode,
        status: DISCOUNT_STATUSES.ACTIVE,
      }).lean();

      if (!discount) {
        return {
          valid: false,
          discountAmount: 0,
          discount: null,
          message: 'Invalid or inactive discount code.',
        };
      }

      // Calculate base discount amount
      let discountAmount =
        discount.discountType === 'Percentage'
          ? Big(cartTotal).times(Big(discount.discountValue)).div(100)
          : Big(discount.discountValue);

      // Enforce maximum discount cap
      if (discount.maxDiscountAmount) {
        const maxAmount = Big(discount.maxDiscountAmount);
        if (discountAmount.gt(maxAmount)) {
          discountAmount = maxAmount;
        }
      }

      // Ensure discount does not exceed cart total
      const cartTotalBig = Big(cartTotal);
      if (discountAmount.gt(cartTotalBig)) {
        discountAmount = cartTotalBig;
      }

      return {
        valid: true,
        discountAmount: parseFloat(discountAmount.toFixed(2)),
        message: 'Discount validated successfully.',
        discount: discount,
        couponRecord: discount,
      };
    } catch (error) {
      logger.error(`Error calculating discount: ${error.message}`, {
        discountCode,
        userId,
        guestEmail,
        guestCartId,
        cartTotal,
        itemCategories,
        stack: error.stack,
      });
      throw new AppError(error.message || 'Failed to calculate discount.', error.statusCode || 500);
    }
  }

  static async validateDiscount(
    discountCode,
    userId,
    cartTotal,
    itemCategories = [],
    guestEmail = null,
    guestCartId = null
  ) {
    try {
      // Validate discount code existence
      if (!discountCode) {
        return {
          valid: false,
          discountAmount: 0,
          message: 'No discount code provided.',
        };
      }

      // Fetch discount coupon
      const discount = await DiscountCoupon.findOne({
        code: discountCode,
        status: DISCOUNT_STATUSES.ACTIVE,
      }).lean();

      if (!discount) {
        return {
          valid: false,
          discountAmount: 0,
          message: 'Invalid or inactive discount code.',
        };
      }

      const now = new Date();

      // Check date validity
      if (discount.validFrom > now) {
        return {
          valid: false,
          discountAmount: 0,
          message: 'Discount code is not yet active.',
        };
      }
      if (discount.validUntil < now) {
        return {
          valid: false,
          discountAmount: 0,
          message: 'Discount code has expired.',
        };
      }

      // Check max redemptions
      if (discount.maxRedemptions !== null && discount.redeemedCount >= discount.maxRedemptions) {
        return {
          valid: false,
          discountAmount: 0,
          message: 'Discount code usage limit reached.',
        };
      }

      // Check per-user redemption limit using CouponUsage
      let redemptionQuery = { coupon: discount._id };
      if (userId) {
        redemptionQuery.user = userId;
      } else if (guestEmail || guestCartId) {
        redemptionQuery = {
          ...redemptionQuery,
          $or: [
            { guestEmail: guestEmail || { $exists: false } },
            { guestCartId: guestCartId || { $exists: false } },
          ],
        };
      } else {
        return {
          valid: false,
          discountAmount: 0,
          message: 'User or guest identifiers required for discount validation.',
        };
      }

      const userRedemptionCount = await CouponUsage.countDocuments(redemptionQuery);
      if (userRedemptionCount >= discount.perUserLimit) {
        return {
          valid: false,
          discountAmount: 0,
          message: 'You have reached the usage limit for this discount.',
        };
      }

      // Check target audience eligibility
      if (discount.targetAudience !== 'All') {
        if (!userId) {
          return {
            valid: false,
            discountAmount: 0,
            message: 'This discount is not applicable to guest users.',
          };
        }
        // Additional logic for NewUsers, ReturningUsers, PremiumUsers can be added here
        // For now, assume user-based validation is handled externally
      }

      // Check minimum order amount
      if (discount.minOrderAmount && Big(cartTotal).lt(discount.minOrderAmount)) {
        return {
          valid: false,
          discountAmount: 0,
          message: `Minimum order value is ${discount.minOrderAmount}.`,
        };
      }

      // Check applicability for specific scope
      if (discount.scope === DISCOUNT_SCOPES.SPECIFIC && discount.applicableToModel) {
        const applicableIds = discount.applicableTo.map((id) => id.toString());
        const isApplicable = itemCategories.some((categoryId) =>
          discount.applicableToModel === 'Category' && categoryId
            ? applicableIds.includes(categoryId.toString())
            : false
        );
        if (!isApplicable) {
          return {
            valid: false,
            discountAmount: 0,
            message: 'Discount not applicable to cart items.',
          };
        }
      }

      // Check for stacking conflicts
      // if (!discount.isStackable) {
      //   const cartQuery = userId
      //     ? { user: userId, status: CART_STATUS.ACTIVE }
      //     : {
      //         $or: [
      //           { guestEmail: guestEmail || { $exists: false } },
      //           { _id: guestCartId || { $exists: false } },
      //         ],
      //         status: CART_STATUS.ACTIVE,
      //       };

      //   const cart = await Cart.findOne(cartQuery).lean();
      //   if (cart?.appliedCoupons?.length > 0) {
      //     return {
      //       valid: false,
      //       discountAmount: 0,
      //       message: "This discount cannot be stacked with other coupons.",
      //     };
      //   }
      // }

      // Calculate discount amount
      let discountAmount =
        discount.discountType === 'Percentage'
          ? Big(cartTotal).times(Big(discount.discountValue)).div(100)
          : Big(discount.discountValue);

      // Enforce maximum discount cap
      if (discount.maxDiscountAmount) {
        const maxAmount = Big(discount.maxDiscountAmount);
        if (discountAmount.gt(maxAmount)) {
          discountAmount = maxAmount;
        }
      }

      // Ensure discount does not exceed cart total
      const cartTotalBig = Big(cartTotal);
      if (discountAmount.gt(cartTotalBig)) {
        discountAmount = cartTotalBig;
      }

      return {
        valid: true,
        discountAmount: parseFloat(discountAmount.toFixed(2)),
        message: 'Discount validated successfully.',
        discount,
      };
    } catch (error) {
      logger.error(`Error validating discount: ${error.message}`, {
        discountCode,
        userId,
        guestEmail,
        guestCartId,
        cartTotal,
        stack: error.stack,
      });
      throw new AppError(error.message || 'Failed to validate discount.', error.statusCode || 500);
    }
  }

  static async applyDiscount({ cartId, discountCode }) {
    try {
      // 1️⃣ Load & guard cart
      const cart = await Cart.findById(cartId).exec();
      if (!cart || !Array.isArray(cart.items) || cart.items.length === 0) {
        throw new AppError('Your cart is empty or not found.', 400);
      }

      // 2️⃣ Build context
      const userId = cart.user?.toString() || null;
      const guestEmail = cart.guestEmail || null;
      const guestCartId = cart.guestCartId || null;

      // 3️⃣ Compute cart subtotal
      const subtotal = cart.items.reduce(
        (sum, item) => sum.plus(Big(item.finalPrice).times(item.quantity)),
        Big(0)
      );

      // 4️⃣ Gather categories from snapshot
      const categories = cart.items.flatMap((item) => item.materialSnapshot?.categories || []);

      // 5️⃣ Run your calculateDiscount
      const result = await this.calculateDiscount(
        discountCode,
        userId,
        subtotal,
        categories,
        guestEmail,
        guestCartId
      );

      // 6️⃣ Guard missing result or couponRecord
      if (!result || !result.valid) {
        throw new AppError(result?.message || 'Invalid discount code.', 400);
      }
      const couponRecord = result.couponRecord || result.discount;
      const discountAmount = result.discountAmount;

      if (!couponRecord) {
        throw new AppError('Coupon data not found for code: ' + discountCode, 404);
      }
      if (typeof couponRecord.scope === 'undefined') {
        throw new AppError(`Coupon ${discountCode} does not define a scope.`, 500);
      }

      // 7️⃣ (Optional) enforce stackability, per your business rules
      // …

      // 8️⃣ Apply to cart
      cart.appliedCoupons.push({
        code: discountCode,
        discountValue: toDecimal128(discountAmount),
        couponId: couponRecord._id,
      });

      // 9️⃣ Re‑validate & recalc totals
      await CartValidationService.validateAppliedCoupons(cart);
      await CartTotalsService.computeTotals(cart);

      // 🔟 Persist & record usage
      await cart.save();
      await CouponUsage.create({
        user: userId,
        coupon: couponRecord._id,
        redeemedAmount: parseFloat(discountAmount.toString()),
        guestEmail,
        guestCartId,
      });
      await DiscountCoupon.updateOne(
        { _id: couponRecord._id },
        { $inc: { redeemedCount: 1 }, lastUsedAt: new Date() }
      );

      return {
        cart,
        discountAmount: parseFloat(discountAmount.toString()),
        message: 'Discount applied successfully.',
      };
    } catch (error) {
      logger.error(`Error applying discount: ${error.message}`, {
        discountCode,
        cartId,
        stack: error.stack,
      });
      throw new AppError(error.message || 'Failed to apply discount.', error.statusCode || 500);
    }
  }
}

export default DiscountService;

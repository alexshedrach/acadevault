import DiscountCoupon from '../../api/models/DiscountCouponModel.js';
import { DISCOUNT_STATUSES } from '../../constants/enums.js';
import AppError from '../../utils/HandleAppErrors.js';
import { logger } from '../../utils/logger.js';
import { Big, toDecimal128 } from '../../utils/numberUtils.js';
import DiscountService from '../discount/DiscountService.js';

class CartValidationService {
  static async validateAppliedCoupons(cart) {
    if (!cart.appliedCoupons?.length) {
      return; // Nothing to validate
    }

    const now = new Date();
    const couponIds = cart.appliedCoupons.map((coupon) => coupon.couponId);

    // Fetch all valid coupons in one go
    const coupons = await DiscountCoupon.find({
      _id: { $in: couponIds },
      status: DISCOUNT_STATUSES.ACTIVE,
      validFrom: { $lte: now },
      validUntil: { $gte: now },
    }).lean();

    const subtotal = cart.items.reduce(
      (total, item) => total.plus(Big(item.finalPrice).times(item.quantity)),
      Big(0)
    );
    const itemCategories = cart.items.map((i) => i.material?.category?.toString()).filter(Boolean);

    const validCouponsMap = new Map();

    for (const applied of cart.appliedCoupons) {
      const coupon = coupons.find((c) => c._id.toString() === applied.couponId.toString());

      if (!coupon) {
        logger.warn(`Coupon ${applied.code} is invalid or expired`, {
          cartId: cart._id?.toString(),
          couponId: applied.couponId,
        });
        continue;
      }

      if (coupon.maxRedemptions && coupon.redeemedCount >= coupon.maxRedemptions) {
        logger.warn(`Coupon ${coupon.code} has reached usage limit`, {
          cartId: cart._id?.toString(),
          couponId: coupon._id,
        });
        continue;
      }

      const couponMeta = await DiscountService.calculateDiscount(
        coupon.code,
        cart.user?.toString(),
        parseFloat(subtotal.toFixed(2)),
        itemCategories,
        cart.guestEmail,
        cart._id?.toString()
      );

      if (!couponMeta.valid) {
        logger.warn(`Coupon ${coupon.code} is not applicable: ${couponMeta.message}`, {
          cartId: cart._id?.toString(),
          couponId: coupon._id,
        });
        continue;
      }

      validCouponsMap.set(coupon._id.toString(), {
        code: coupon.code,
        discountValue: toDecimal128(couponMeta.discountAmount),
        couponId: coupon._id,
      });
    }

    // Rebuild appliedCoupons with validated ones, preserve original order if possible
    const originalCount = cart.appliedCoupons.length;

    cart.appliedCoupons = cart.appliedCoupons
      .filter((existing) => validCouponsMap.has(existing.couponId.toString()))
      .map((existing) => {
        const updated = validCouponsMap.get(existing.couponId.toString());
        return updated || existing; // fallback to existing if something failed
      });

    if (cart.appliedCoupons.length < originalCount) {
      logger.info(`Some coupons removed after validation`, {
        cartId: cart._id?.toString(),
        removedCount: originalCount - cart.appliedCoupons.length,
      });
    }

    if (!cart.appliedCoupons.length) {
      logger.warn(`All applied coupons were invalid or expired`, {
        cartId: cart._id?.toString(),
      });
    }
  }

  // static async validateAppliedCoupons(cart) {
  //   const now = new Date();
  //   const couponIds = cart.appliedCoupons.map((coupon) => coupon.couponId);

  //   // Fetch all coupons in one query
  //   const coupons = await DiscountCoupon.find({
  //     _id: { $in: couponIds },
  //     status: DISCOUNT_STATUSES.ACTIVE,
  //     validFrom: { $lte: now },
  //     validUntil: { $gte: now },
  //   }).lean();

  //   // Calculate subtotal for discount validation
  //   const subtotal = cart.items.reduce(
  //     (total, item) => total.plus(Big(item.finalPrice).times(item.quantity)),
  //     Big(0)
  //   );
  //   const itemCategories = cart.items.map((i) => i.material?.category?.toString()).filter(Boolean);

  //   // Validate and recompute discounts
  //   const validCoupons = [];
  //   for (const appliedCoupon of cart.appliedCoupons) {
  //     const coupon = coupons.find((c) => c._id.toString() === appliedCoupon.couponId.toString());
  //     if (!coupon) {
  //       logger.warn(`Coupon ${appliedCoupon.code} is invalid or expired`, {
  //         cartId: cart._id?.toString(),
  //         couponId: appliedCoupon.couponId,
  //       });
  //       continue;
  //     }

  //     // Check max redemptions
  //     if (coupon.maxRedemptions && coupon.redeemedCount >= coupon.maxRedemptions) {
  //       logger.warn(`Coupon ${coupon.code} has reached its usage limit`, {
  //         cartId: cart._id?.toString(),
  //         couponId: coupon._id,
  //       });
  //       continue;
  //     }

  //     // Check stackability
  //     // if (!coupon.isStackable && cart.appliedCoupons.length > 1) {
  //     //   throw new AppError(
  //     //     `Coupon ${coupon.code} cannot be combined with other coupons.`,
  //     //     400
  //     //   );
  //     // }

  //     // Validate discount applicability
  //     const couponMeta = await DiscountService.calculateDiscount(
  //       coupon.code,
  //       cart.user?.toString(),
  //       parseFloat(subtotal.toFixed(2)),
  //       itemCategories,
  //       cart.guestEmail,
  //       cart._id?.toString()
  //     );

  //     if (!couponMeta.valid) {
  //       logger.warn(`Coupon ${coupon.code} is not applicable: ${couponMeta.message}`, {
  //         cartId: cart._id?.toString(),
  //         couponId: coupon._id,
  //       });
  //       continue;
  //     }

  //     validCoupons.push({
  //       code: coupon.code,
  //       discountValue: toDecimal128(couponMeta.discountAmount),
  //       couponId: coupon._id,
  //     });
  //   }

  //   // Update cart with valid coupons only
  //   // cart.appliedCoupons = validCoupons;
  //   // ✅ Instead: Filter only invalid ones
  //   const validCouponIds = validCoupons.map((c) => c.couponId.toString());
  //   cart.appliedCoupons = cart.appliedCoupons
  //     .filter((c) => validCouponIds.includes(c.couponId.toString()))
  //     .map((existing) => {
  //       const updated = validCoupons.find(
  //         (v) => v.couponId.toString() === existing.couponId.toString()
  //       );
  //       return updated || existing;
  //     });
  // }

  /**
   * Ensures that at least one of userId, guestCartId, or guestEmail is present,
   * and that both user and guest identifiers are not mixed.
   * @param {Object} ctx
   * @param {string} [ctx.userId]
   * @param {string} [ctx.guestEmail]
   * @param {string} [ctx.guestCartId]
   * @param {Object} [ctx.shippingAddress]
   * @param {string} [ctx.guestFullName]
   * @param {string} [ctx.guestPhoneNumber]
   */
  // Add this fallback parameter to your method:
  static ensureValidIdentifiers(ctx) {
    const {
      userId,
      guestEmail,
      guestCartId,
      shippingAddress,
      guestFullName,
      guestPhoneNumber,
      allowGuestFallback = false, // 👈 default fallback
    } = ctx;

    if (!userId && !guestEmail && !guestCartId && !allowGuestFallback) {
      throw new AppError('Cart must have either userId, guestCartId, or guestEmail.', 400);
    }

    if (userId && (guestEmail || guestCartId)) {
      throw new AppError('Cannot have both a registered user and guest identifiers.', 400);
    }

    if (!userId && shippingAddress && (!guestFullName || !guestPhoneNumber)) {
      throw new AppError('Guest carts with shipping require name and phone.', 400);
    }
  }
}

export default CartValidationService;

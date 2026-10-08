import mongoose from 'mongoose';
import DiscountCoupon from '../../api/models/DiscountCouponModel.js';
import { DISCOUNT_SCOPES, SHIPPING_METHODS } from '../../constants/enums.js';
import AppError from '../../utils/HandleAppErrors.js';
import { logger } from '../../utils/logger.js';
import { Big, toDecimal128 } from '../../utils/numberUtils.js';
import taxCalculation from '../../utils/taxCalculation.js';
import CartItemService from './CartItemService.js';

class CartTotalsService {
  /**
   * Compute overall cart totals, using materialSnapshot on each item.
   *
   * @param {mongoose.Document} cart
   * @param {mongoose.ClientSession|null} session
   * @returns {{ subtotal, totalDiscount, taxes, shippingFee, total }}
   */
  static async computeTotals(cart, session = null) {
    if (!cart || !Array.isArray(cart.items)) {
      throw new AppError('Invalid cart object.', 400);
    }

    // Reset computed discount
    cart.items.forEach((i) => (i._computedDiscount = Big(0)));

    // Apply all coupons
    for (const { couponId, code } of cart.appliedCoupons || []) {
      const coupon = await DiscountCoupon.findById(couponId).session(session).lean();
      if (!coupon) continue;

      let eligibleCatItems = cart.items;
      if (coupon.scope === DISCOUNT_SCOPES.PRODUCT_SPECIFIC) {
        const allowed = coupon.applicableTo.map((id) => id.toString());
        eligibleCatItems = eligibleCatItems.filter((i) => allowed.includes(i.materialSnapshot._id.toString()));
      }
      if (!eligibleCatItems.length) continue;

      const baseTotal = eligibleCatItems.reduce(
        (sum, i) => sum.plus(Big(i.materialSnapshot.unitPrice).times(i.quantity)),
        Big(0)
      );
      if (baseTotal.lte(0)) continue;

      const couponValue = Big(
        coupon.discountValue?.toString?.() || coupon.value?.toString?.() || 0
      );

      for (const item of eligibleCatItems) {
        const itemBase = Big(item.materialSnapshot.unitPrice).times(item.quantity);

        let discount = Big(0);

        if (coupon.discountType === 'Percentage') {
          discount = itemBase.times(couponValue).div(100);
        } else if (coupon.discountType === 'Fixed') {
          const share = itemBase.div(baseTotal).times(couponValue);
          discount = share;
        }

        item._computedDiscount = item._computedDiscount.plus(discount);
      }
    }

    // Recompute each line
    for (const item of cart.items) {
      const { taxAmount, finalPrice } = await CartItemService.computeLineItem(item, cart);
      item.taxAmount = toDecimal128(taxAmount);
      item.discountAmount = toDecimal128(item._computedDiscount);
      item.finalPrice = toDecimal128(finalPrice);
      delete item._computedDiscount;
    }

    // Aggregate cart-level
    const subtotal = cart.items.reduce(
      (sum, i) => sum.plus(Big(i.materialSnapshot.unitPrice).times(i.quantity)),
      Big(0)
    );
    const totalDiscount = cart.items.reduce((sum, i) => sum.plus(Big(i.discountAmount)), Big(0));
    const totalTax = cart.items.reduce((sum, i) => sum.plus(Big(i.taxAmount)), Big(0));

    const rawShipping = Big(
      await taxCalculation.calculateShippingFee(
        cart.shippingAddress,
        cart.items.map((i) => i.materialSnapshot._id),
        cart.shippingMethod || SHIPPING_METHODS.STANDARD
      )
    );

    const freeShipFlags = await Promise.all(
      (cart.appliedCoupons || []).map(async ({ couponId }) => {
        const c = await DiscountCoupon.findById(couponId).lean();
        return c?.freeShipping || false;
      })
    );
    const shippingFee = freeShipFlags.includes(true) ? Big(0) : rawShipping;

    const total = subtotal.minus(totalDiscount).plus(totalTax).plus(shippingFee);

    if (total.lt(0)) {
      throw new AppError('Total cart value cannot be negative.', 400);
    }

    // Persist computed values
    cart.subtotal = toDecimal128(subtotal);
    cart.totalDiscount = toDecimal128(totalDiscount);
    cart.taxes = toDecimal128(totalTax);
    cart.shippingFee = toDecimal128(shippingFee);
    cart.totalPrice = toDecimal128(total);
    cart.totalWithShipping = toDecimal128(total); // for consistency

    if (cart.shippingAddress && !cart.estimatedDelivery) {
      const base = cart.shippingMethod === SHIPPING_METHODS.EXPRESS ? 2 : 5;
      const regionDays = { NG: 0, US: 2, EU: 3, INTL: 7 }[cart.shippingAddress.country] || 7;
      cart.estimatedDelivery = new Date(Date.now() + (base + regionDays) * 86400e3);
    }

    return {
      subtotal: parseFloat(subtotal.toFixed(2)),
      totalDiscount: parseFloat(totalDiscount.toFixed(2)),
      taxes: parseFloat(totalTax.toFixed(2)),
      shippingFee: parseFloat(shippingFee.toFixed(2)),
      total: parseFloat(total.toFixed(2)),
    };

  }

  /**
   * Computes totals for a subset of cart items (for a specific shop).
   * Used when splitting cart into per-shop orders.
   *
   * @param {Array} items - Array of cart items for this shop
   * @param {String} currency - Currency of the cart
   * @param {mongoose.ClientSession} session - DB session for transactional ops
   * @returns {Object} Totals breakdown
   */
  static async computeShopTotals(items, currency, session) {
    if (!items || !Array.isArray(items) || items.length === 0) {
      throw new AppError('computeShopTotals: items must be a non-empty array', 400);
    }

    // Compute per-item final prices (may already be computed)
    for (const item of items) {
      const { taxAmount, discountAmount, finalPrice } = await CartItemService.computeLineItem(
        item,
        {
          currency,
        }
      );

      item.taxAmount = toDecimal128(Big(taxAmount));
      item.discountAmount = toDecimal128(Big(discountAmount));
      item.finalPrice = toDecimal128(Big(finalPrice));
    }

    // Subtotal
    const subtotal = items.reduce(
      (acc, item) => acc.plus(Big(item.finalPrice).times(item.quantity)),
      Big(0)
    );

    // Total discounts and taxes
    const totalDiscounts = items.reduce(
      (acc, item) => acc.plus(Big(item.discountAmount || 0)),
      Big(0)
    );
    const taxes = items.reduce((acc, item) => acc.plus(Big(item.taxAmount || 0)), Big(0));

    // Shipping fee — you can inject logic here to calculate shop-specific shipping
    const shippingFee = Big(0); // TODO: Customize if per-shop delivery fee is enabled

    const total = subtotal.minus(totalDiscounts).plus(taxes).plus(shippingFee);

    if (total.lt(0)) throw new AppError('Invalid negative total value', 400);

    return {
      subtotal: +subtotal.toFixed(2),
      discounts: +totalDiscounts.toFixed(2),
      taxes: +taxes.toFixed(2),
      shippingFee: +shippingFee.toFixed(2),
      total: +total.toFixed(2),
    };
  }
}

export default CartTotalsService;

// import mongoose from 'mongoose';
// import DiscountCoupon from '../../api/models/DiscountCouponModel.js';
// import { DISCOUNT_SCOPES, SHIPPING_METHODS } from '../../constants/enums.js';
// import AppError from '../../utils/HandleAppErrors.js';
// import { logger } from '../../utils/logger.js';
// import { Big, toDecimal128 } from '../../utils/numberUtils.js';
// import taxCalculation from '../../utils/taxCalculation.js';
// import CartItemService from './CartItemService.js';

// class CartTotalsService {
//   /**
//    * Recompute all cart totals, including per‐coupon scoped discounts.
//    * @param {mongoose.Document} cart – The cart document
//    * @param {mongoose.ClientSession|null} session – Optional transaction session
//    * @returns {{ subtotal, totalDiscount, taxes, shippingFee, total }}
//    */
//   static async computeTotals(cart, session = null) {
//     try {
//       // ─── 0. Basic validation ──────────────────────────────────────────────
//       if (!cart || !Array.isArray(cart.items)) {
//         throw new AppError('Invalid cart or empty items array.', 400);
//       }

//       // ─── 1. Reset per‐item discount accumulators ──────────────────────────
//       // We'll accumulate shares from multiple coupons here
//       cart.items.forEach((item) => {
//         item._computedDiscount = Big(0);
//       });

//       // ─── 2. Loop through each applied coupon ─────────────────────────────
//       for (const couponEntry of cart.appliedCoupons) {
//         // 2.1 Fetch full coupon details (for scope, freeShipping, etc.)
//         const coupon = await DiscountCoupon.findById(couponEntry.couponId).session(session).lean();
//         if (!coupon) continue; // defensive

//         // 2.2 Determine the pool of items eligibleCatItems for THIS coupon
//         let eligibleCatItemsItems = cart.items;
//         if (coupon.scope === DISCOUNT_SCOPES.PRODUCT_SPECIFIC) {
//           // e.g. only apply to specific AcademicMaterials
//           const allowed = coupon.applicableTo.map((id) => id.toString());
//           eligibleCatItemsItems = cart.items.filter(
//             (item) => item.material.toString && allowed.includes(item.material.toString())
//           );
//         }
//         // (extend here for CATEGORY or SHOP scopes if needed)

//         if (!eligibleCatItemsItems.length) {
//           // Nothing to apply this coupon to; skip
//           continue;
//         }

//         // 2.3 Compute the total base‐value of eligibleCatItems items
//         const baseTotal = eligibleCatItemsItems.reduce(
//           (sum, i) => sum.plus(Big(i.unitPrice).times(i.quantity)),
//           Big(0)
//         );
//         if (baseTotal.lte(0)) continue; // avoid division by zero

//         // 2.4 Distribute this coupon’s discountValue across eligibleCatItems items
//         const couponValue = Big(couponEntry.discountValue);
//         for (const item of eligibleCatItemsItems) {
//           // proportional share = (itemPrice / baseTotal) × couponValue
//           const itemBase = Big(item.unitPrice).times(item.quantity);
//           const share = itemBase.div(baseTotal).times(couponValue).toFixed(2); // round to cents

//           // Accumulate per‐item discount
//           item._computedDiscount = item._computedDiscount.plus(share);
//         }
//       }

//       // ─── 3. Recompute each line‐item’s final tax & price ────────────────
//       for (const item of cart.items) {
//         // 3.1 Let CartItemService handle item‐level tax & price logic if needed
//         const { taxAmount: tax, finalPrice: preDiscountPrice } =
//           await CartItemService.computeLineItem(item, cart);

//         // 3.2 Assign computed values
//         const discount = item._computedDiscount;
//         const priceBeforeTaxes = Big(item.unitPrice).times(item.quantity).minus(discount);
//         const finalPrice = priceBeforeTaxes.plus(Big(tax));

//         item.taxAmount = toDecimal128(Big(tax));
//         item.discountAmount = toDecimal128(discount);
//         item.finalPrice = toDecimal128(finalPrice);

//         // 3.3 Clean up temp
//         delete item._computedDiscount;
//       }

//       // ─── 4. Aggregate cart‐level values ─────────────────────────────────
//       const subtotal = cart.items.reduce(
//         (s, i) => s.plus(Big(i.unitPrice).times(i.quantity)),
//         Big(0)
//       );
//       const totalDiscount = cart.items.reduce((s, i) => s.plus(Big(i.discountAmount)), Big(0));
//       const totalTax = cart.items.reduce((s, i) => s.plus(Big(i.taxAmount)), Big(0));

//       // ─── 5. Compute shipping fee ────────────────────────────────────────
//       // Base shipping based on items & address
//       const rawShipping = Big(
//         await taxCalculation.calculateShippingFee(
//           cart.shippingAddress,
//           cart.items.map((i) => i.material || null),
//           cart.shippingMethod || SHIPPING_METHODS.STANDARD
//         )
//       );
//       // If any coupon grants free shipping, zero it out
//       const freeShipping = await Promise.all(
//         cart.appliedCoupons.map(async (cEntry) => {
//           const c = await DiscountCoupon.findById(cEntry.couponId).lean();
//           return c?.freeShipping || false;
//         })
//       );
//       const shippingFee = freeShipping.includes(true) ? Big(0) : rawShipping;

//       // ─── 6. Compute grand total & validate ──────────────────────────────
//       const total = subtotal.minus(totalDiscount).plus(totalTax).plus(shippingFee);
//       if (total.lt(0)) {
//         throw new AppError('Total cart value cannot be negative.', 400);
//       }

//       // ─── 7. Persist back to cart document ───────────────────────────────
//       cart.subtotal = toDecimal128(subtotal);
//       cart.taxes = toDecimal128(totalTax);
//       cart.shippingFee = toDecimal128(shippingFee);

//       // ─── 8. (Optional) Set estimated delivery if not already set ────────
//       if (cart.shippingAddress && !cart.estimatedDelivery) {
//         const baseDays = cart.shippingMethod === SHIPPING_METHODS.EXPRESS ? 2 : 5;
//         const regionDays = { NG: 0, US: 2, EU: 3, INTL: 7 }[cart.shippingAddress.country] || 7;
//         cart.estimatedDelivery = new Date(Date.now() + (baseDays + regionDays) * 86400e3);
//       }

//       // ─── 9. Return breakdown ────────────────────────────────────────────
//       return {
//         subtotal: parseFloat(subtotal.toFixed(2)),
//         totalDiscount: parseFloat(totalDiscount.toFixed(2)),
//         taxes: parseFloat(totalTax.toFixed(2)),
//         shippingFee: parseFloat(shippingFee.toFixed(2)),
//         total: parseFloat(total.toFixed(2)),
//       };
//     } catch (error) {
//       logger.error(`CartTotalsService.computeTotals failed`, {
//         cartId: cart._id?.toString(),
//         error: error.message,
//         stack: error.stack,
//       });
//       throw new AppError(
//         error.message || 'Failed to compute cart totals.',
//         error.statusCode || 500
//       );
//     }
//   }

//   // /**
//   //  * Recompute all cart totals, taxes, shipping, based on validated coupons.
//   //  * @param {mongoose.Document} cart - The cart document to compute totals for
//   //  * @returns {Object} Breakdown of computed totals
//   //  */
//   // static async computeTotals(cart, session = null) {
//   //   try {
//   //     // Validate cart
//   //     if (!cart || !cart.items || !Array.isArray(cart.items)) {
//   //       throw new AppError('Invalid cart or empty items array.', 400);
//   //     }

//   //     // 1️⃣ Recompute line items (tax & discount per item)
//   //     for (const item of cart.items) {
//   //       const { taxAmount, discountAmount, finalPrice } = await CartItemService.computeLineItem(
//   //         item,
//   //         cart
//   //       );
//   //       item.taxAmount = toDecimal128(Big(taxAmount));
//   //       item.discountAmount = toDecimal128(Big(discountAmount));
//   //       item.finalPrice = toDecimal128(Big(finalPrice));
//   //     }

//   //     // 2️⃣ Calculate subtotal = sum(item.finalPrice * qty)
//   //     const subtotal = cart.items.reduce(
//   //       (sum, i) => sum.plus(Big(i.finalPrice).times(i.quantity)),
//   //       Big(0)
//   //     );

//   //     // 3️⃣ Get total discount from validated appliedCoupons
//   //     const totalDiscount = Big(cart.totalDiscount); // Use virtual from Cart model

//   //     // 4️⃣ Calculate taxes on post-discount subtotal
//   //     const country = cart.shippingAddress?.country || null;
//   //     const state = cart.shippingAddress?.state || null;
//   //     const taxableAmount = subtotal.minus(totalDiscount);
//   //     if (taxableAmount.lt(0)) {
//   //       throw new AppError('Taxable amount cannot be negative.', 400);
//   //     }
//   //     const taxes = Big(
//   //       await taxCalculation.calculateTaxAmount(
//   //         parseFloat(taxableAmount.toFixed(2)),
//   //         country,
//   //         state
//   //       )
//   //     );

//   //     // 5️⃣ Calculate shipping fee
//   //     let shippingFee = Big(
//   //       await taxCalculation.calculateShippingFee(
//   //         cart.shippingAddress,
//   //         cart.items.map((i) => i.material || null),
//   //         cart.shippingMethod || SHIPPING_METHODS.STANDARD
//   //       )
//   //     );

//   //     // 6️⃣ Apply free shipping if any coupon provides it
//   //     // After: resolve in parallel with session
//   //     const freeShippingChecks = await Promise.all(
//   //       cart.appliedCoupons.map(async (coupon) => {
//   //         if (!coupon.couponId) return false;
//   //         const c = await DiscountCoupon.findById(coupon.couponId).session(session).lean();
//   //         return c?.freeShipping || false;
//   //       })
//   //     );
//   //     const isFreeShipping = freeShippingChecks.includes(true);

//   //     const finalShippingFee = isFreeShipping ? Big(0) : shippingFee;

//   //     // 7️⃣ Validate total
//   //     const total = subtotal.minus(totalDiscount).plus(taxes).plus(finalShippingFee);
//   //     if (total.lt(0)) {
//   //       throw new AppError('Total cart value cannot be negative.', 400);
//   //     }

//   //     // 8️⃣ Persist all fields
//   //     cart.subtotal = toDecimal128(subtotal);
//   //     cart.taxes = toDecimal128(taxes);
//   //     cart.shippingFee = toDecimal128(finalShippingFee);

//   //     // 9️⃣ Update estimated delivery if applicable
//   //     if (cart.shippingAddress && !cart.estimatedDelivery) {
//   //       const baseDays = cart.shippingMethod === SHIPPING_METHODS.EXPRESS ? 2 : 5;
//   //       const regionDays = { NG: 0, US: 2, EU: 3, INTL: 7 }[cart.shippingAddress.country] || 7;
//   //       cart.estimatedDelivery = new Date(
//   //         Date.now() + (baseDays + regionDays) * 24 * 60 * 60 * 1000
//   //       );
//   //     }

//   //     // 10️⃣ Return breakdown for callers
//   //     return {
//   //       subtotal: parseFloat(subtotal.toFixed(2)),
//   //       totalDiscount: parseFloat(totalDiscount.toFixed(2)),
//   //       taxes: parseFloat(taxes.toFixed(2)),
//   //       shippingFee: parseFloat(finalShippingFee.toFixed(2)),
//   //       total: parseFloat(total.toFixed(2)),
//   //     };
//   //   } catch (error) {
//   //     logger.error(`Error in computeTotals: ${error.message}`, {
//   //       cartId: cart._id?.toString(),
//   //       userId: cart.user?.toString(),
//   //       guestEmail: cart.guestEmail,
//   //       stack: error.stack,
//   //     });
//   //     throw new AppError(
//   //       error.message || 'Failed to compute cart totals.',
//   //       error.statusCode || 500
//   //     );
//   //   }
//   // }

//   /**
//    * Computes totals for a subset of cart items (for a specific shop).
//    * Used when splitting cart into per-shop orders.
//    *
//    * @param {Array} items - Array of cart items for this shop
//    * @param {String} currency - Currency of the cart
//    * @param {mongoose.ClientSession} session - DB session for transactional ops
//    * @returns {Object} Totals breakdown
//    */
//   static async computeShopTotals(items, currency, session) {
//     if (!items || !Array.isArray(items) || items.length === 0) {
//       throw new AppError('computeShopTotals: items must be a non-empty array', 400);
//     }

//     // Compute per-item final prices (may already be computed)
//     for (const item of items) {
//       const { taxAmount, discountAmount, finalPrice } = await CartItemService.computeLineItem(
//         item,
//         {
//           currency,
//         }
//       );

//       item.taxAmount = toDecimal128(Big(taxAmount));
//       item.discountAmount = toDecimal128(Big(discountAmount));
//       item.finalPrice = toDecimal128(Big(finalPrice));
//     }

//     // Subtotal
//     const subtotal = items.reduce(
//       (acc, item) => acc.plus(Big(item.finalPrice).times(item.quantity)),
//       Big(0)
//     );

//     // Total discounts and taxes
//     const totalDiscounts = items.reduce(
//       (acc, item) => acc.plus(Big(item.discountAmount || 0)),
//       Big(0)
//     );
//     const taxes = items.reduce((acc, item) => acc.plus(Big(item.taxAmount || 0)), Big(0));

//     // Shipping fee — you can inject logic here to calculate shop-specific shipping
//     const shippingFee = Big(0); // TODO: Customize if per-shop delivery fee is enabled

//     const total = subtotal.minus(totalDiscounts).plus(taxes).plus(shippingFee);

//     if (total.lt(0)) throw new AppError('Invalid negative total value', 400);

//     return {
//       subtotal: +subtotal.toFixed(2),
//       discounts: +totalDiscounts.toFixed(2),
//       taxes: +taxes.toFixed(2),
//       shippingFee: +shippingFee.toFixed(2),
//       total: +total.toFixed(2),
//     };
//   }
// }

// export default CartTotalsService;

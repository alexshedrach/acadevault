/**
 * Generate a promotional tag object based on pricing and discount logic.
 * Used for displaying dynamic tags like "Promo", "30% Off", etc.
 *
 * @param {Object} params - The input parameters.
 * @param {Object} params.finalPrice - Contains actual pricing details including discount.
 * @param {number} params.finalPrice.amount - The actual sale amount.
 * @param {number} params.finalPrice.originalAmount - The original (pre-discount) price.
 * @param {Object} params.price - Original price object, may include type metadata.
 * @param {string} params.price.type - Pricing strategy (e.g., 'promotional').
 * @param {string} [params.price.notes] - Optional notes about the promotion.
 *
 * @returns {Object|null} An object with `label` and `type` for a UI tag or `null` if no promotion.
 */
export const getPromotionTag = ({ finalPrice, price }) => {
  // Early exit if input is invalid or incomplete
  if (!finalPrice?.originalAmount || !finalPrice?.amount || !price?.type) {
    return null;
  }

  const hasDiscount = finalPrice.originalAmount > finalPrice.amount;
  const isPromotional = price.type === "promotional";
  const isDiscount = hasDiscount && !isPromotional;

  // Case 1: Promotion-based pricing (e.g., flash sale, limited time, etc.)
  if (isPromotional) {
    // Optional enhancement: you can inspect `price.notes` for more context like "Limited Time"
    return {
      label: "Promo", // Could be dynamic if `price.notes` contains more detail
      type: "promo",
    };
  }

  // Case 2: Standard discount (price cut without promotional strategy)
  if (isDiscount) {
    const discountPercent = Math.round(
      ((finalPrice.originalAmount - finalPrice.amount) /
        finalPrice.originalAmount) *
        100
    );

    return {
      label: `${discountPercent}% Off`,
      type: discountPercent >= 30 ? "high-discount" : "discount",
    };
  }

  // Case 3: No promo or discount
  return null;
};

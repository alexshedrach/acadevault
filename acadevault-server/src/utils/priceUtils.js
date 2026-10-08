import AcademicMaterial from '../api/models/AcademicMaterialModel.js';
import Price from '../api/models/PriceModel.js';
import { CURRENCY_SYMBOLS } from '../constants/enums.js';
import PriceService from '../services/PriceService.js';
import { formatCurrency } from './currencyUtils.js';

/**
 * Used when resolving the original price for promotional display purposes.
 * Example: promo is active, and you want to show "Was ₦9.99" from vendor/base.
 *
 * @param {Array} candidates - List of prices
 * @param {Object} selectedPromo - The promotional price already selected
 * @param {Boolean} allowVendorOverride - Whether vendor price is valid fallback
 * @returns {Object|null}
 */
function findOriginalForPromo(candidates, selectedPromo, allowVendorOverride) {
  return candidates.find((p) => {
    if (selectedPromo && p._id?.toString() === selectedPromo._id?.toString())
      return false;
    if (p.type === 'vendor' && allowVendorOverride) return true;
    if (p.type === 'base') return true;
    return false;
  });
}



function priceSortComparator(a, b) {
  const typePriority = (b.typePriority || 0) - (a.typePriority || 0);
  if (typePriority !== 0) return typePriority;

  const customPriority = (b.priority || 0) - (a.priority || 0);
  if (customPriority !== 0) return customPriority;

  return new Date(b.updatedAt) - new Date(a.updatedAt);
}


/**
 * Generic helper to get the "true original" price based on highest valid non-promo price.
 *
 * @param {Array} candidates - All active prices
 * @param {Object} resolved - The current resolved price
 * @param {Boolean} excludePromotional - Avoid using promotional prices as original
 * @returns {Object|null}
 */
export function getOriginalPrice(candidates = [], resolved, excludePromotional = true) {
  if (!Array.isArray(candidates) || candidates.length === 0) return null;

  return (
    candidates
      .filter((price) => {
        if (excludePromotional && price.type === 'promotional') return false;
        return (
          price.materialId?.toString() === resolved.materialId?.toString() &&
          price.materialType === resolved.materialType &&
          price.currency === resolved.currency &&
          price.amount > resolved.amount
        );
      })
      .sort((a, b) => b.amount - a.amount)[0] || null
  );
}

export async function resolvePrice({
  materialId,
  materialType,
  currency,
  region,
  date = new Date(),
}) {
  if (!currency) throw new Error('Currency is required for price resolution.');

  let material = null;
  let pricingStrategy = 'type-based';
  let allowVendorOverride = false;
  let enforceTypePricing = false;
  let basePrice = null;
  let strategySource = 'materialTypeOnly';

  if (materialId) {
    material = await AcademicMaterial.findById(materialId).lean();
    if (!material) throw new Error('Material not found');

    pricingStrategy = material.pricingStrategy || 'type-based';
    allowVendorOverride = material.allowVendorOverride ?? true;
    enforceTypePricing = material.enforceTypePricing ?? false;
    basePrice = material.basePrice ?? null;
    materialType = material.materialType || materialType;
    strategySource = 'materialBound';
  }

  const regionOptions = [region, null];
  const timeConstraints = {
    $and: [
      { $or: [{ effectiveFrom: null }, { effectiveFrom: { $lte: date } }] },
      { $or: [{ effectiveTo: null }, { effectiveTo: { $gte: date } }] },
    ],
  };

  const baseQuery = {
    currency,
    isActive: true,
    region: { $in: regionOptions },
    ...timeConstraints,
  };

  const orConditions = [];

  if (!enforceTypePricing && materialId) {
    orConditions.push({ material: material._id });
  }

  const allowTypeFallback =
    pricingStrategy === 'type-based' ||
    pricingStrategy === 'default' ||
    enforceTypePricing;

  if (materialType && allowTypeFallback) {
    orConditions.push({ materialType });
  }

  if (!orConditions.length) {
    return basePrice
      ? {
          ...basePrice,
          source: 'basePriceFallback',
          strategy: strategySource,
        }
      : null;
  }

  const priceQuery = {
    ...baseQuery,
    $or: orConditions,
  };

  const candidates = await Price.find(priceQuery).lean();

  if (!candidates.length && !material?.discountPrice) {
    return basePrice
      ? {
          ...basePrice,
          source: 'basePriceFallback',
          strategy: strategySource,
        }
      : null;
  }

  const effective = candidates.filter((p) => {
    const fromOk = !p.effectiveFrom || p.effectiveFrom <= date;
    const toOk = !p.effectiveTo || p.effectiveTo >= date;
    return fromOk && toOk && p.isActive;
  });

  const filtered = effective.filter((p) => {
    if (p.type === 'vendor' && !allowVendorOverride) return false;
    return true;
  });

  const sorted = filtered.sort(priceSortComparator);
  let selectedPrice = sorted[0] || null;
  let originalPriceEntry = null;

  // === Promo Price Branch ===
  if (selectedPrice) {
    originalPriceEntry = findOriginalForPromo(
      effective,
      selectedPrice,
      allowVendorOverride,
    );
  }

  // === Fallback: Discount Price ===
  // if (!selectedPrice && material?.discountPrice) {
  //   selectedPrice = {
  //     ...material.discountPrice,
  //     type: 'discount',
  //     source: 'materialDiscount',
  //     isActive: true,
  //     material: material._id,
  //     strategy: 'materialBound',
  //   };
  //   originalPriceEntry = basePrice || null;
  // }
  if (!selectedPrice && material?.discountPrice) {
    selectedPrice = {
      amount: material.discountPrice,
      currency: currency,
      type: 'material-discount',
      source: 'materialDiscount',
      isActive: true,
      material: material._id,
      strategy: strategySource,
      updatedAt: material.updatedAt || new Date(),
    };

    originalPriceEntry = basePrice ?? null;
  }

  const discountApplied =
    originalPriceEntry && originalPriceEntry.amount > selectedPrice.amount;

  const originalPrice = discountApplied
    ? {
        amount: originalPriceEntry.amount,
        currency: originalPriceEntry.currency,
        type: originalPriceEntry.type,
      }
    : null;

  return {
    ...selectedPrice,
    source: selectedPrice.source || 'resolvedPrice',
    strategy: strategySource,
    originalPrice,
    discountApplied,
  };
}

export function validateVendorPrice({
  vendorPrice,
  materialTypeDefaults,
  currency,
}) {
  const adminPrice = materialTypeDefaults.find((p) => p.currency === currency);

  if (!adminPrice) {
    throw new Error(`Currency "${currency}" is not supported.`);
  }

  const { minLimit, maxLimit } = adminPrice;

  if (minLimit !== null && vendorPrice < minLimit) {
    throw new Error(
      `Price is below the minimum allowed of ${minLimit} ${currency}`,
    );
  }
  if (maxLimit !== null && vendorPrice > maxLimit) {
    throw new Error(
      `Price exceeds the maximum allowed of ${maxLimit} ${currency}`,
    );
  }
}

// Use it to format the resolved price (whether base, vendor, promo, etc.), without calculating anything based on discount.
export function formatResolvedPrice(priceDoc) {
  if (!priceDoc) {
    return {
      amount: 0,
      formatted: formatCurrency(0, 'NGN'),
      currencySymbol: '₦',
      discountApplied: false,
      originalAmount: 0,
      source: 'none',
      strategy: 'n/a',
    };
  }

  const amount = parseFloat((priceDoc.amount || 0).toFixed(2));
  const currency = priceDoc.currency || 'NGN';
  const symbol = CURRENCY_SYMBOLS[currency] || currency;

  return {
    amount,
    formatted: formatCurrency(amount, currency),
    currencySymbol: symbol,
    discountApplied: !!priceDoc.discountApplied,
    originalAmount: priceDoc.originalPrice?.amount || amount,
    source: priceDoc.source || 'unknown',
    strategy: priceDoc.strategy || 'n/a',
  };
}


/**
 * Attach computed prices to a list of academic materials.
 * @param {Array} materials - Array of academic material documents.
 * @param {Object} context - Pricing context (currency, region, date, etc).
 * @returns {Promise<Array>} Enriched list of materials with price included.
 */
async function attachMaterialPrices(materials, context = {}) {
  if (!Array.isArray(materials) || materials.length === 0) {
    return [];
  }

  const enrichedMaterials = await Promise.all(
    materials.map(async (material) => {
      try {
        const price = await PriceService.getEffectivePrice(
          material._id,
          material.materialType,
          {
            currency: context.currency || 'NGN',
            region: context.region || null,
            date: context.date || new Date(),
          },
        );

        // Infer discountApplied if not already set
        if (
          price &&
          price.originalPrice &&
          price.originalPrice.amount > price.amount
        ) {
          price.discountApplied = true;
        } else {
          price.discountApplied = false;
        }

        const formattedPrice = formatResolvedPrice(price);

        return {
          ...material.toObject(),
          price,
          finalPrice: formattedPrice,
        };
      } catch (err) {
        console.error(
          `Price resolution failed for material ${material._id}:`,
          err,
        );

        const fallback = material.discountPrice || material.basePrice || null;
        const finalPrice = formatResolvedPrice(fallback);

        return {
          ...material.toObject(),
          price: fallback,
          finalPrice,
        };
      }
    }),
  );

  return enrichedMaterials;
}

export default attachMaterialPrices;

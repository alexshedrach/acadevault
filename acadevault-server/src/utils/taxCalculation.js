import axios from "axios";
import { logger } from "../utils/logger.js";

const TAX_API_ENABLED = process.env.USE_TAX_API === "true";
const TAX_API_KEY = process.env.TAX_API_KEY;
const TAX_API_URL = "https://api.taxjar.com/v2/taxes";

const ShippingRates = {
  NG: { standard: 500, express: 1500 },
  US: { standard: 5.0, express: 15.0 },
  EU: { standard: 10.0, express: 25.0 },
  UK: { standard: 8.0, express: 20.0 },
  IN: { standard: 6.0, express: 18.0 },
  INTL: { standard: 15.0, express: 35.0 },
};

const TaxRatesFallback = {
  NG: { default: 0.075 },
  US: { default: 0.07, CA: 0.0825, NY: 0.088, TX: 0.0625 },
  UK: { default: 0.2 },
  EU: { default: 0.19 },
  CA: { default: 0.13, QC: 0.14975, BC: 0.12 },
  AU: { default: 0.1 },
};

const taxRateCache = new Map();

async function getTaxRate(country = "NG", state = null) {
  const cacheKey = `${country}-${state || "default"}`;
  if (taxRateCache.has(cacheKey)) return taxRateCache.get(cacheKey);

  if (TAX_API_ENABLED) {
    if (!TAX_API_KEY) {
      throw new Error("TAX_API_KEY is required when TAX_API_ENABLED is true.");
    }
    try {
      const response = await axios.post(
        TAX_API_URL,
        { to_country: country, to_state: state, amount: 100 },
        { headers: { Authorization: `Bearer ${TAX_API_KEY}` } }
      );
      if (response.data?.tax?.rate) {
        const taxRate = response.data.tax.rate;
        taxRateCache.set(cacheKey, taxRate);
        return taxRate;
      }
      logger.warn(
        `Tax rate for ${country}${state ? `-${state}` : ""} not found in API.`
      );
    } catch (error) {
      logger.error(`Error fetching tax rate: ${error.message}`);
    }
  }

  const taxRate =
    state && TaxRatesFallback[country]?.[state]
      ? TaxRatesFallback[country][state]
      : TaxRatesFallback[country]?.default || 0.075;
  taxRateCache.set(cacheKey, taxRate);
  return taxRate;
}

async function calculateTaxAmount(
  cartTotal,
  country,
  state = null,
  currency = "NGN"
) {
  if (!cartTotal || cartTotal < 0) return 0;
  const taxRate = await getTaxRate(country, state);
  const adjustedTotal = currency === "NGN" ? cartTotal : cartTotal * 1; // Placeholder for exchange rate
  return parseFloat((adjustedTotal * taxRate).toFixed(2));
}

function calculateShippingFee(
  deliveryAddress,
  materials = [],
  shippingMethod = "standard"
) {
  if (!deliveryAddress || materials.every((m) => m.isDigital)) return 0;

  const region = deliveryAddress.country || "INTL";
  const shippingRate = ShippingRates[region] || ShippingRates["INTL"];

  const totalWeight = materials.reduce((weight, material) => {
    if (material.isDigital) return weight;
    if (!material.weight) {
      logger.warn(
        `Missing weight for material ${material._id}. Defaulting to 0.`
      );
      return weight;
    }
    return weight + material.weight;
  }, 0);

  if (totalWeight === 0) return 0;

  const baseShippingFee = shippingRate[shippingMethod] || shippingRate.standard;
  const weightFactor = Math.ceil(totalWeight / 5);
  return parseFloat((baseShippingFee * weightFactor).toFixed(2));
}

async function calculateFinalTotal(
  cartTotal,
  deliveryAddress,
  materials = [],
  currency = "NGN"
) {
  const materialTotal = materials.reduce(
    (sum, m) => sum + (m.isDigital ? 0 : m.price || 0) * (m.quantity || 1),
    0
  );
  if (Math.abs(materialTotal - cartTotal) > 0.01) {
    throw new Error("Cart total does not match material totals.");
  }

  const { country = "NG", state = null } = deliveryAddress || {};
  const taxAmount = await calculateTaxAmount(
    cartTotal,
    country,
    state,
    currency
  );
  const shippingFee = calculateShippingFee(deliveryAddress, materials);

  const finalTotal = parseFloat(
    (cartTotal + taxAmount + shippingFee).toFixed(2)
  );
  return {
    finalTotal,
    breakdown: {
      cartTotal: parseFloat(cartTotal.toFixed(2)),
      taxAmount,
      shippingFee,
    },
  };
}

export default {
  getTaxRate,
  calculateTaxAmount,
  calculateShippingFee,
  calculateFinalTotal,
};

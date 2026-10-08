import {
  PRICING_UNITS,
  urgencyMultipliers,
  WORDS_PER_PAGE,
} from "@/config/priceConfiguration";
import { currencySymbols } from "@/constants/enums";

/**
 * Determines the default currency based on user preference or country code.
 * @param {string} countryCode - User's country code (e.g., 'NG')
 * @param {string|null} userPreference - User's preferred currency
 * @returns {string} - Default currency code
 */
export function getDefaultCurrency(countryCode, userPreference = null) {
  if (userPreference && currencySymbols[userPreference]) return userPreference;
  return [
    "US",
    "CA",
    "GB",
    "AU",
    "NZ",
    "DE",
    "FR",
    "IT",
    "ES",
    "NL",
    "AE",
    "SG",
    "JP",
    "KR",
    "CH",
  ].includes(countryCode)
    ? "USD"
    : getLocalCurrency(countryCode);
}

/**
 * Maps country code to local currency.
 * @param {string} countryCode - Country code (e.g., 'NG')
 * @returns {string} - Local currency code
 */
export function getLocalCurrency(countryCode) {
  const countryToCurrency = {
    NG: "NGN",
    GH: "GHS",
    CM: "XAF",
    NE: "XOF",
    KE: "KES",
    ET: "ETB",
    ZA: "ZAR",
    SL: "SLE",
    GN: "GNF",
    UG: "UGX",
    RW: "RWF",
    AO: "AOA",
    ST: "STN",
    MW: "MWK",
  };
  return countryToCurrency[countryCode] || "USD";
}

/**
 * Calculate the urgency multiplier.
 *
 * @param {string|Date} deadline     – ISO string or Date object of desired delivery.
 * @param {number} pages             – Number of pages to deliver.
 * @param {"Tier1"|"Tier2"|"Tier3"|"Tier4"} tier
 * @returns {number}
 */
export function calculateUrgencyMultiplier(deadline, pages, tier) {
  if (!deadline) return urgencyMultipliers.flexible;

  const now = new Date().getTime();
  const due = new Date(deadline).getTime();
  const hoursLeft = (due - now) / (1000 * 60 * 60);

  // Enforce a minimum lead time: at least 1 hour per page, but no less than 12 hours
  const minLead = Math.max(pages * 1, 12);

  if (hoursLeft < minLead) {
    // super‑urgent: tier determines the premium
    return (
      urgencyMultipliers.immediate[tier] ?? urgencyMultipliers.immediate.Tier1
    );
  }
  if (hoursLeft <= 12 * 2) {
    // rush window (12–24 h)
    return urgencyMultipliers.rush;
  }
  if (hoursLeft <= 72) {
    // standard window (24–72 h)
    return urgencyMultipliers.standard;
  }
  // flexible (> 72 h)
  return urgencyMultipliers.flexible;
}

/**
 * Calculates urgency text and color based on deadline.
 * @param {string|null} deadline - ISO string of the deadline
 * @returns {Object} - { text: string, color: string } for display
 */
export function calculateUrgencyText(deadline) {
  if (!deadline) return { text: "Not Set", color: "text-gray-500" };
  const diff = Math.ceil(
    (new Date(deadline).getTime() - new Date().getTime()) /
      (1000 * 60 * 60 * 24)
  );
  if (diff <= 0) return { text: "Immediate", color: "text-red-600" };
  if (diff <= 3) return { text: "Rush", color: "text-orange-500" };
  if (diff <= 7) return { text: "Standard", color: "text-blue-500" };
  return { text: "Flexible", color: "text-green-500" };
}

/**
 * Validates deadline feasibility based on word count and material tier.
 * @param {number} wordCount - Word or page count
 * @param {string} deadline - ISO string of the deadline
 * @param {string} materialTier - Material tier (e.g., 'Tier3')
 * @returns {Object} - { isFeasible: boolean, message: string }
 */

export function validateDeadlineFeasibility(
  unitCount,
  deadline,
  materialType,
  tier
) {
  const unitType = PRICING_UNITS[materialType] || "page";
  const pages = unitType === "page" ? unitCount : unitCount * 0.5; // Example conversion for non-page units
  const now = new Date();
  const deadlineDate = new Date(deadline);
  const hoursDiff = (deadlineDate - now) / (1000 * 60 * 60);
  const minHours = Math.max(pages * 1, 12); // 1 hour per page, minimum 12 hours
  if (hoursDiff < minHours) {
    return {
      isFeasible: false,
      message: `Deadline too short. Minimum ${minHours} hours required for ${pages} ${unitType}s.`,
    };
  }
  return { isFeasible: true, message: "" };
}

/**
 * Counts words in a text string.
 * @param {string} text - Input text
 * @returns {number} - Word count
 */
export function wordCountFromText(text) {
  if (!text || typeof text !== "string") return 0;
  return text
    .trim()
    .split(/\s+/g)
    .filter((word) => /^[a-zA-Z0-9]+$/.test(word)).length;
}

/**
 * Provides user‑friendly feedback on project length.
 *
 * @param {number} count        – The raw count (words or pages)
 * @param {"words"|"pages"} unitType
 * @returns {{ text: string, color: string }}
 */
export function calculateWordCountFeedback(count, unitType) {
  // Convert everything to pages
  const pages =
    unitType === "pages" ? count : Math.ceil(count / WORDS_PER_PAGE);

  if (pages < 5) {
    return {
      text: "Great, this is a manageable length!",
      color: "text-green-600",
    };
  } else if (pages < 20) {
    return {
      text: "This is a substantial project!",
      color: "text-blue-600",
    };
  } else {
    return {
      text: "Large project, we'll ensure top quality!",
      color: "text-orange-600",
    };
  }
}

/**
 * Formats price with currency symbol and optional USD equivalent.
 * @param {number} amount - Price amount
 * @param {string} currency - Currency code
 * @param {number|null} [exchangeRate] - Exchange rate to USD
 * @returns {string} - Formatted price string
 */
export function formatPriceWithSymbol(amount, currency, exchangeRate = null) {
  const symbol = currencySymbols[currency] || currency;
  try {
    const formatted = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    })
      .format(amount)
      .replace(currency, symbol);
    if (exchangeRate && currency !== "USD") {
      return `${formatted} (~$${(amount / exchangeRate || 0).toFixed(2)})`;
    }
    return formatted;
  } catch (error) {
    console.error(`Error formatting price for ${currency}:`, error);
    const fallback = `${symbol}${amount.toFixed(2)}`;
    if (exchangeRate && currency !== "USD") {
      return `${fallback} (~$${(amount / exchangeRate || 0).toFixed(2)})`;
    }
    return fallback;
  }
}

export const calculateTotalPrice = (priceItems = []) => {
  return priceItems.reduce((sum, item) => sum + (item.price?.amount ?? 0), 0);
};

export const areAllPricesLoaded = (priceItems = []) => {
  return priceItems.every((item) => !item.loading);
};

export async function fetchEffectivePrice({
  materialId,
  basePrice = 0,
  materialType,
  currency,
  region = null,
}) {
  if (!materialId || !materialType || !currency)
    return { price: { amount: basePrice } };

  const params = new URLSearchParams();
  params.append("materialId", materialId);
  params.append("materialType", materialType);
  params.append("currency", currency);
  if (region) params.append("region", region);

  try {
    const res = await fetch(
      `${
        process.env.NEXT_PUBLIC_API_URL
      }/api/v2/prices/current-price?${params.toString()}`
    );
    const json = await res.json();
    return { price: json?.data ?? { amount: basePrice } };
  } catch (err) {
    console.error("Failed to fetch price:", err);
    return { price: { amount: basePrice } };
  }
}

import { currencySymbols } from "@/constants/enums";

/**
 * Utility to format a price, removing trailing `.00` when appropriate.
 */
export const formatPrice = (formatted, locale = "en-US") => {
  if (typeof formatted === "string") {
    return formatted.replace(/\.00$/, "");
  }
  return Number(formatted).toLocaleString(locale);
};

export const formatCurrency = (amount, currency = "NGN", locale = "en-NG") => {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
  }).format(amount);
};

export const formatPriceWithSymbol = (amount, currency = "NGN") => {
  const symbol = currencySymbols[currency] || currency;

  let formatted = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount);

  // If NGN returns "NGN 5,000" instead of "₦5,000", manually replace
  if (currency === "NGN" && !formatted.includes(symbol)) {
    formatted = formatted.replace(currency, symbol);
  }

  return {
    formatted,
    symbol,
  };
};
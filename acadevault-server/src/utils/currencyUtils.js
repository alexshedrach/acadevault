import { CURRENCIES } from '../constants/enums.js';

/**
 * Validate if a currency code is supported in the system.
 * @param {string} currency - The currency code to validate (e.g., "USD", "EUR").
 * @returns {boolean} - True if the currency is supported, otherwise false.
 */
export const isSupportedCurrency = (currency) => {
  return CURRENCIES.includes(currency);
};

/**
 * Format a given amount based on the currency and locale.
 * @param {number} amount - The amount to format.
 * @param {string} currency - The ISO currency code (e.g., "USD", "NGN").
 * @param {string} [locale='en-US'] - The locale to use (e.g., "en-US", "fr-FR", "en-NG").
 * @returns {string} - The formatted currency string.
 */
export const formatCurrency = (amount, currency, locale) => {
  if (typeof amount !== 'number' || isNaN(amount)) {
    throw new Error('Invalid amount provided.');
  }

  if (!isSupportedCurrency(currency)) {
    throw new Error(`Currency ${currency} is not supported.`);
  }

  // Auto-set locale for NGN to get the ₦ symbol instead of "NGN"
  if (!locale) {
    locale = currency === 'NGN' ? 'en-NG' : 'en-US';
  }

  try {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency,
      currencyDisplay: 'symbol', // ensures symbol is used (₦ instead of NGN)
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  } catch (err) {
    console.warn('Currency formatting fallback:', err);
    return `${amount.toFixed(2)} ${currency}`;
  }
};





/**
 * Convert an amount from one currency to another using a given exchange rate.
 * @param {number} amount - The amount in the source currency.
 * @param {string} fromCurrency - The source currency code.
 * @param {string} toCurrency - The target currency code.
 * @param {number} exchangeRate - The exchange rate from 'fromCurrency' to 'toCurrency'.
 * @returns {number} - The converted amount in the target currency.
 */
export const convertCurrency = (
  amount,
  fromCurrency,
  toCurrency,
  exchangeRate
) => {
  if (!isSupportedCurrency(fromCurrency) || !isSupportedCurrency(toCurrency)) {
    throw new Error(`Invalid currency codes: ${fromCurrency}, ${toCurrency}`);
  }

  if (fromCurrency === toCurrency) {
    return amount; // No conversion needed if currencies are the same.
  }

  // Perform the currency conversion
  return (amount * exchangeRate).toFixed(2); // Round to 2 decimal places
};

/**
 * Fetch the exchange rates for supported currencies (this could integrate with an API).
 * For the purpose of this example, it's a mock function.
 * In real-world usage, this would pull exchange rates from a reliable API like Open Exchange Rates or Forex.
 * @returns {Object} - An object with currency pairs and their exchange rates.
 */
export const fetchExchangeRates = async () => {
  // Mock exchange rates (real implementation would call an API)
  const mockExchangeRates = {
    USD: {
      EUR: 0.85,
      GBP: 0.75,
      INR: 74.5,
      JPY: 110,
      NGN: 410,
    },
    EUR: {
      USD: 1.18,
      GBP: 0.88,
      INR: 87.5,
      JPY: 129,
      NGN: 485,
    },
    GBP: {
      USD: 1.33,
      EUR: 1.14,
      INR: 100.5,
      JPY: 146,
      NGN: 650,
    },
    INR: {
      USD: 0.013,
      EUR: 0.011,
      GBP: 0.0099,
      JPY: 1.46,
      NGN: 5.8,
    },
    JPY: {
      USD: 0.0091,
      EUR: 0.0077,
      GBP: 0.0068,
      INR: 0.68,
      NGN: 3.9,
    },
    NGN: {
      USD: 0.0024,
      EUR: 0.0021,
      GBP: 0.0015,
      INR: 0.17,
      JPY: 0.26,
    },
  };

  return mockExchangeRates;
};

/**
 * Convert an amount to a local currency, considering the current user's location.
 * @param {number} amount - The amount to convert.
 * @param {string} fromCurrency - The currency code to convert from.
 * @param {string} toCurrency - The target currency code (for example, USD, EUR).
 * @param {number} exchangeRate - The exchange rate for conversion.
 * @returns {string} - The amount formatted in the target currency.
 */
export const convertAndFormatCurrency = async (
  amount,
  fromCurrency,
  toCurrency,
  exchangeRate
) => {
  const convertedAmount = convertCurrency(
    amount,
    fromCurrency,
    toCurrency,
    exchangeRate
  );
  return formatCurrency(convertedAmount, toCurrency);
};

/**
 * Convert a string value to a number, ensuring it's a valid currency amount.
 * @param {string} value - The string value representing the currency amount.
 * @returns {number} - The parsed number value.
 */
export const parseCurrencyAmount = (value) => {
  return parseFloat(value.replace(/[^0-9.-]+/g, "")); // Removes any non-numeric characters (like currency symbols)
};

import axios from "axios";

// Configuration (using environment variables for flexibility)
const CURRENCY_API_ENABLED = process.env.USE_CURRENCY_API === "true";
const CURRENCY_API_KEY = process.env.CURRENCY_API_KEY; // Ensure this is set in the environment
const CURRENCY_API_URL = "https://open.er-api.com/v6/latest"; // OpenExchangeRates or similar

// Fallback exchange rates (hardcoded for offline scenarios)
const HardcodedExchangeRates = {
  USD: { EUR: 0.85, GBP: 0.74, NGN: 750, INR: 83, CAD: 1.3 },
  EUR: { USD: 1.18, GBP: 0.86, NGN: 880, INR: 97, CAD: 1.5 },
  GBP: { USD: 1.35, EUR: 1.16, NGN: 1000, INR: 110, CAD: 1.7 },
  NGN: { USD: 0.0013, EUR: 0.0011, GBP: 0.001, INR: 0.12, CAD: 0.0014 },
};

/**
 * 🎯 **Get Exchange Rate**
 * Fetches the exchange rate between two currencies. Uses API or hardcoded rates as fallback.
 * @param {string} fromCurrency - Base currency (e.g., "USD").
 * @param {string} toCurrency - Target currency (e.g., "EUR").
 * @returns {Promise<number>} - The exchange rate between `fromCurrency` and `toCurrency`.
 */
async function getExchangeRate(fromCurrency = "USD", toCurrency = "USD") {
  if (fromCurrency === toCurrency) return 1; // No conversion needed

  try {
    // 🎯 Option 1: Use External Currency API
    if (CURRENCY_API_ENABLED && CURRENCY_API_KEY) {
      const response = await axios.get(`${CURRENCY_API_URL}/${fromCurrency}`, {
        params: { app_id: CURRENCY_API_KEY },
      });

      if (response.data?.rates?.[toCurrency]) {
        return response.data.rates[toCurrency];
      }
      console.warn(
        `⚠️ Exchange rate for ${toCurrency} not found in API response.`
      );
    }

    // 🎯 Option 2: Fallback to hardcoded rates
    const fallbackRate = HardcodedExchangeRates[fromCurrency]?.[toCurrency];
    if (fallbackRate) return fallbackRate;

    console.warn(
      `⚠️ Exchange rate fallback for ${fromCurrency} to ${toCurrency} not found.`
    );
  } catch (error) {
    console.error("⚠️ Error fetching exchange rate:", error);
  }

  // Fallback to 1 if all else fails
  return 1;
}

/**
 * 💱 **Convert Currency Amount**
 * Converts an amount from one currency to another.
 * @param {number} amount - The amount in the base currency.
 * @param {string} fromCurrency - The source currency (e.g., "USD").
 * @param {string} toCurrency - The target currency (e.g., "EUR").
 * @returns {Promise<number>} - The converted amount in the target currency.
 */
async function convertCurrency(
  amount,
  fromCurrency = "USD",
  toCurrency = "USD"
) {
  const rate = await getExchangeRate(fromCurrency, toCurrency);
  return parseFloat((amount * rate).toFixed(2)); // Ensure formatted to 2 decimal places
}

/**
 * 🌎 **Get Supported Currencies**
 * Provides a list of supported currencies.
 * @returns {Array<string>} - List of currency codes (e.g., ["USD", "EUR", "GBP"]).
 */
function getSupportedCurrencies() {
  return Object.keys(HardcodedExchangeRates);
}

export default { getExchangeRate, convertCurrency, getSupportedCurrencies };

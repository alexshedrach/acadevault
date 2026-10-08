// Utility function: convertCurrency.js
async function convertCurrency(amount, targetCurrency, baseCurrency = "USD") {
  if (amount <= 0) {
    throw new Error("Amount must be greater than zero.");
  }

  // Example predefined exchange rates
  const exchangeRates = {
    USD: { EUR: 0.85, NGN: 770, GBP: 0.75 },
    EUR: { USD: 1.18, NGN: 900, GBP: 0.88 },
    NGN: { USD: 0.0013, EUR: 0.0011, GBP: 0.00097 },
  };

  if (
    !exchangeRates[baseCurrency] ||
    !exchangeRates[baseCurrency][targetCurrency]
  ) {
    throw new Error(
      `Exchange rate from ${baseCurrency} to ${targetCurrency} not available.`
    );
  }

  const conversionRate = exchangeRates[baseCurrency][targetCurrency];
  return amount * conversionRate; // Converts the amount
}

module.exports = convertCurrency;

// import axios from "axios";

// // Static fallback exchange rates (USD to other currencies)
// const fixedExchangeRates = {
//   NGN: 1500, // Nigeria: Highly volatile due to inflation (35%), forex shortages, oil dependency
//   GHS: 15, // Ghana: Stabilized post-2022 depreciation, but inflation remains a concern
//   XAF: 600, // Cameroon, Chad, etc.: Euro-pegged, stable but economies face insecurity, poverty
//   XOF: 600, // Benin, Niger, etc.: Euro-pegged, stable but economic challenges persist
//   KES: 130, // Kenya: Managed float, moderate depreciation due to trade imbalances
//   ETB: 120, // Ethiopia: Significant devaluation, conflict, and forex shortages
//   ZAR: 18, // South Africa: Relatively stable, strong economy but inequality issues
//   SLE: 20200, // Sierra Leone: Weak due to high inflation, political instability
//   GNF: 8900, // Guinea: Weakened by infrastructure gaps, political instability
//   UGX: 3664, // Uganda: Depreciating due to remittances, trade deficits
//   RWF: 1415, // Rwanda: Depreciating due to forex inflows to Kenya, policy adjustments
//   AOA: 900, // Angola: Weak due to oil dependency, inflation
//   STN: 22281, // São Tomé and Príncipe: Weakest in Africa, high inflation, low FDI
//   MWK: 1700, // Malawi: Weak due to trade imbalances, devaluation
//   EUR: 0.93, // Stable economy currency
//   GBP: 0.79, // Stable economy currency
//   CAD: 1.37, // Stable economy currency
//   AUD: 1.5, // Stable economy currency
//   USD: 1, // Base currency for stable economies
// };

// // Utility to convert USD base amount to all supported currencies
// export const generatePrices = async (amountInUSD) => {
//   const prices = { USD: amountInUSD };

//   try {
//     // Fetch dynamic exchange rates
//     const response = await axios.get(
//       "https://api.exchangerate-api.com/v4/latest/USD"
//     );
//     const rates = response.data.rates;

//     // Convert USD amount to other currencies
//     Object.keys(fixedExchangeRates).forEach((currency) => {
//       if (currency !== "USD") {
//         const rate = rates[currency] || fixedExchangeRates[currency]; // Use API rate or fallback
//         prices[currency] = Number((amountInUSD * rate).toFixed(2));
//       }
//     });
//   } catch (error) {
//     console.error("Error fetching exchange rates in generatePrices:", error);
//     // Fallback to static rates
//     Object.keys(fixedExchangeRates).forEach((currency) => {
//       if (currency !== "USD") {
//         prices[currency] = Number(
//           (amountInUSD * fixedExchangeRates[currency]).toFixed(2)
//         );
//       }
//     });
//   }

//   return prices;
// };

// // Fixed exchange rates with NGN as base (₦1 = x foreign currency value)
// // Note: These are *static* rates and should be updated regularly or dynamically via an API for real-world use.

export const fixedExchangeRates = {
  NGN: 1, // 🇳🇬 Nigeria (Naira)
  USD: 1000, // 🇺🇸 United States Dollar
  EUR: 1080, // 🇪🇺 Euro (European Union)
  GBP: 1220, // 🇬🇧 British Pound Sterling
  CAD: 930, // 🇨🇦 Canadian Dollar
  AUD: 890, // 🇦🇺 Australian Dollar
  INR: 12.3, // 🇮🇳 Indian Rupee
  CNY: 138, // 🇨🇳 Chinese Yuan
  JPY: 6.4, // 🇯🇵 Japanese Yen
  ZAR: 55, // 🇿🇦 South African Rand
  GHS: 80, // 🇬🇭 Ghanaian Cedi
  KES: 8.5, // 🇰🇪 Kenyan Shilling
  UGX: 0.26, // 🇺🇬 Ugandan Shilling
  TZS: 0.25, // 🇹🇿 Tanzanian Shilling
  XAF: 1.7, // 🇨🇲 Central African CFA Franc
  XOF: 1.7, // 🇸🇳 West African CFA Franc
  BRL: 190, // 🇧🇷 Brazilian Real
  MXN: 55, // 🇲🇽 Mexican Peso
  AED: 270, // 🇦🇪 UAE Dirham
  SAR: 260, // 🇸🇦 Saudi Riyal
  TRY: 32, // 🇹🇷 Turkish Lira
  PKR: 3.2, // 🇵🇰 Pakistani Rupee
};

// Utility to convert NGN base amount to all supported currencies
export const generatePrices = (amountInNGN) => {
  const prices = {};

  Object.entries(fixedExchangeRates).forEach(([currency, rate]) => {
    const converted =
      currency === "NGN"
        ? amountInNGN
        : Math.round((amountInNGN / rate) * 100) / 100; // round to 2 decimal places
    prices[currency] = converted;
  });

  return prices;
};

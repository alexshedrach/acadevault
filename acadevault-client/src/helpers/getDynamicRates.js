import { BASE_RATES } from "@/config/priceConfiguration";
import { CURRENCIES } from "@/constants/enums";
import axios from "axios";

export async function getDynamicRates() {
  try {
    const response = await axios.get(
      "https://api.exchangerate-api.com/v4/latest/USD"
    );
    const rates = response.data.rates;

    const fallbackRates = {
      NGN: 1300,
      GHS: 15,
      XAF: 600,
      XOF: 600,
      KES: 130,
      ETB: 120,
      ZAR: 18,
      SLE: 20200,
      GNF: 8900,
      UGX: 3664,
      RWF: 1415,
      AOA: 900,
      STN: 22281,
      MWK: 1700,
      USD: 1,
      EUR: 0.85,
      GBP: 0.75,
      CAD: 1.3,
      AUD: 1.5,
    };

    const exchangeRates = {
      ...fallbackRates,
      ...rates,
    };

    const convertedRates = Object.keys(BASE_RATES).reduce((acc, type) => {
      const base = BASE_RATES[type]; // e.g., { USD: 12, unit: "page" }

      acc[type] = {
        ...base,
        ...Object.fromEntries(
          CURRENCIES.map((curr) => {
            if (typeof base[curr] === "number") {
              return [curr, base[curr]]; // Respect statically defined NGN etc.
            }
            const convertedRate = Number(
              (base.USD * exchangeRates[curr]).toFixed(2)
            );
            return [curr, convertedRate];
          })
        ),
      };

      return acc;
    }, {});

    return convertedRates;
  } catch (err) {
    console.error("Error fetching exchange rates:", err);

    // Fallback logic if API fails entirely
    return Object.keys(BASE_RATES).reduce((acc, type) => {
      const base = BASE_RATES[type];
      acc[type] = {
        ...base,
        ...Object.fromEntries(
          CURRENCIES.map((curr) => {
            const fallback =
              base[curr] ?? Number((base.USD * fallbackRates[curr]).toFixed(2));
            return [curr, fallback];
          })
        ),
      };
      return acc;
    }, {});
  }
}

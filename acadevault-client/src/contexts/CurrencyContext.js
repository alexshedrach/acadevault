// "use client";

// import { CURRENCIES } from "@/constants/enums";
// import React, { createContext, useState, useEffect } from "react";

// export const CurrencyContext = createContext();
// const DEFAULT_CURRENCY = "NGN";

// export const CurrencyProvider = ({ children }) => {
//   const [currency, setCurrency] = useState(DEFAULT_CURRENCY);
//   const [isStorageError, setIsStorageError] = useState(false);

//   useEffect(() => {
//     try {
//       const saved = localStorage.getItem("selectedCurrency");
//       if (saved && CURRENCIES.includes(saved)) {
//         setCurrency(saved);
//       }
//     } catch (error) {
//       console.error("Error accessing localStorage:", error);
//       setIsStorageError(true);
//     }
//   }, []);

//   const handleSetCurrency = (newCurrency) => {
//     if (!CURRENCIES.includes(newCurrency)) {
//       console.warn(`Invalid currency code: ${newCurrency}`);
//       return;
//     }
//     setCurrency(newCurrency);
//     if (!isStorageError) {
//       try {
//         localStorage.setItem("selectedCurrency", newCurrency);
//       } catch (error) {
//         console.error("Error saving to localStorage:", error);
//         setIsStorageError(true);
//       }
//     }
//   };

//   return (
//     <CurrencyContext.Provider
//       value={{ currency, setCurrency: handleSetCurrency }}
//     >
//       {children}
//     </CurrencyContext.Provider>
//   );
// };

"use client";

import { createContext, useState, useEffect } from "react";
import { getDefaultCurrency } from "@/utils/priceUtils";
import { CURRENCIES } from "@/constants/enums";

export const CurrencyContext = createContext({
  currency: "USD",
  setCurrency: () => {},
});

export function CurrencyProvider({ children }) {
  const [currency, setCurrency] = useState("USD");

  useEffect(() => {
    async function detect() {
      try {
        // You can swap this for any IP‐geolocation service you like
        const res = await fetch("https://ipapi.co/json/");
        if (!res.ok) throw new Error("IP lookup failed");
        const { country_code } = await res.json();
        const detected = getDefaultCurrency(country_code, null);
        // only use if in our list
        if (CURRENCIES.includes(detected)) setCurrency(detected);
      } catch (err) {
        console.warn("Currency detection error:", err);
      }
    }
    detect();
  }, []);

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency }}>
      {children}
    </CurrencyContext.Provider>
  );
}

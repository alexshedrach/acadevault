"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

const DEFAULT_COUNTRY = "Nigeria"; // fallback
const STORAGE_KEY = "acadev_country";

export const CountryContext = createContext();

export const CountryProvider = ({ children }) => {
  const [country, setCountry] = useState(DEFAULT_COUNTRY);

  // Load from localStorage on mount
  useEffect(() => {
    const saved =
      typeof window !== "undefined" && localStorage.getItem(STORAGE_KEY);
    if (saved) setCountry(saved);
  }, []);

  // Save to localStorage when country changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, country);
  }, [country]);

  return (
    <CountryContext.Provider value={{ country, setCountry }}>
      {children}
    </CountryContext.Provider>
  );
};

// Custom hook
export const useCountry = () => {
  const context = useContext(CountryContext);
  if (!context)
    throw new Error("useCountry must be used within a CountryProvider");
  return context;
};

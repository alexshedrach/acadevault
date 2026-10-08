/**
 * Mapping of supported currency codes to their symbols.
 */
export const currencySymbols = Object.freeze({
  NGN: "₦",
  GHS: "₵",
  XAF: "FCFA",
  XOF: "CFA",
  KES: "KSh",
  ETB: "Br",
  ZAR: "R",
  SLE: "Le",
  GNF: "FG",
  UGX: "USh",
  RWF: "FRw",
  AOA: "Kz",
  STN: "Db",
  MWK: "MK",
  USD: "$",
  EUR: "€",
  GBP: "£",
  CAD: "C$",
  AUD: "A$",
});

/**
 * A frozen list of supported currencies from the backend.
 */
export const CURRENCIES = Object.freeze([
  "NGN",
  "GHS",
  "XAF",
  "XOF",
  "KES",
  "ETB",
  "ZAR",
  "SLE",
  "GNF",
  "UGX",
  "RWF",
  "AOA",
  "STN",
  "MWK",
  "USD",
  "EUR",
  "GBP",
  "CAD",
  "AUD",
]);

// Minimum totals per currency
export const MINIMUM_TOTALS = {
  NGN: 3000,
  GHS: 40,
  XAF: 20000,
  XOF: 15000,
  KES: 1000,
  ETB: 500,
  ZAR: 150,
  SLE: 30000,
  GNF: 15000,
  UGX: 5000,
  RWF: 2000,
  AOA: 1000,
  STN: 35000,
  MWK: 2500,
  USD: 15,
  EUR: 12,
  GBP: 10,
  CAD: 18,
  AUD: 20,
};

// Countries with stable economies (default to USD)
export const STABLE_ECONOMY_COUNTRIES = [
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
];

export const citationStyles = [
  { value: "apa", label: "APA" },
  { value: "mla", label: "MLA" },
  { value: "chicago", label: "Chicago" },
  { value: "harvard", label: "Harvard" },
  { value: "ieee", label: "IEEE" },
  { value: "other", label: "Other" },
];

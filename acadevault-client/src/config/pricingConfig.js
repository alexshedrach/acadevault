/**
 * Centralized configuration for pricing-related constants.
 * Defines rates, multipliers, add-ons, promo codes, and currency symbols.
 * Used across all hiring methods for consistent pricing calculations.
 */
export const WORDS_PER_PAGE = 275; // Standard word count per page

export const BASE_RATE = {
  NGN: 500, // Base rate per 100 words for Seminar Form (NGN)
  USD: 0.5, // Base rate per 100 words for Seminar Form (USD)
};

export const academicTypeRates = {
  Journal: 0.05, // Base rate per word for Custom Quote Form
  Essay: 0.04,
  Dissertation: 0.07,
  Thesis: 0.06,
  Assignment: 0.04,
  Seminar: 0.045,
};

export const academicLevelRates = {
  ond: 1.0, // Multiplier for Seminar Form academic levels
  hnd: 1.2,
  pgd: 1.4,
  masters: 1.6,
  others: 1.3,
};

export const complexityMultipliers = {
  Simple: 1.0, // Complexity multipliers for all forms
  Moderate: 1.2,
  Complex: 1.5,
};

export const writerExpertiseMultipliers = {
  Standard: 1.0, // Expertise multipliers for all forms
  Advanced: 1.2,
  Premium: 1.5,
};

export const validPromoCodes = {
  SAVE10: 10, // Promo code: 10% discount
  FIRSTORDER: 15, // Promo code: 15% discount
};

export const AVAILABLE_ADDONS = [
  { id: 'plagiarismReport', label: 'Plagiarism Report', price: 2000 },
  { id: 'consultation', label: 'Consultation Session', price: 3000 },
];

export const currencySymbols = {
  NGN: '₦',
  USD: '$',
};

export const academicOptions = [
  "High School",
  "OND / NCE",
  "HND / B.Sc / BA / B.Ed",
  "PGD",
  "Masters / PhD",
  "Others",
];

export const subjectAreas = [
  "Arts & Humanities",
  "Sciences",
  "Social Sciences",
  "Engineering",
  "Business & Management",
  "Education",
  "Health Sciences",
  "Computer Science",
  "Other",
];

export const citationStyles = [
  { value: "apa", label: "APA" },
  { value: "mla", label: "MLA" },
  { value: "chicago", label: "Chicago" },
  { value: "harvard", label: "Harvard" },
  { value: "ieee", label: "IEEE" },
  { value: "other", label: "Other" },
];

export const documentFormats = [
  { value: "pdf", label: "PDF" },
  { value: "docx", label: "Word (DOCX)" },
  { value: "latex", label: "LaTeX" },
];

export const writerExpertiseOptions = [
  { value: "Standard", label: "Standard" },
  { value: "Advanced", label: "Advanced" },
  { value: "Expert", label: "Expert" },
];


import { regex } from "../constants/regex.js";

/**
 * Function to sanitize an ISBN by removing hyphens and spaces.
 * @param {string} isbn - The ISBN string.
 * @returns {string} - The sanitized ISBN.
 */
export const sanitizeISBN = (isbn) =>
  typeof isbn === "string" ? isbn.replace(regex.ISBN_SANITIZE_REGEX, "") : "";


/**
 * Function to validate an ISBN (10 or 13 digits) after sanitization.
 * @param {string} isbn - The ISBN string.
 * @returns {boolean} - True if the ISBN is valid, false otherwise.
 */
export const validateISBN = (isbn) => {
  const cleanedISBN = sanitizeISBN(isbn);
  return regex.ISBN_REGEX.test(cleanedISBN);
};

/**
 * Format an ISBN with hyphens (e.g., 978-1-23-4567-890).
 * Returns original value if not a valid string.
 * @param {string} isbn - The ISBN string.
 * @returns {string|null}
 */
export const formatISBN = (isbn) => {
  if (typeof isbn !== "string") return null;
  const cleaned = sanitizeISBN(isbn);
  return cleaned.replace(
    /(\d{3})(\d{1})(\d{2})(\d{4})(\d{3})(\d{1})/,
    "$1-$2-$3-$4-$5"
  );
};


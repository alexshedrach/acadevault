/**
 * Truncate a string to a maximum length, adding "…" if it was longer.
 *
 * @param {string} text
 * @param {number} maxLength
 * @returns {string}
 */
export function truncateText(text, maxLength = 100) {
  if (typeof text !== "string") return "";
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength - 1).trimEnd() + "…";
}

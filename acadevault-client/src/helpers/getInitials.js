/**
 * Extracts initials from a full name.
 *
 * @param {string} name - The full name to extract initials from.
 * @param {number} count - Number of initials to return (1 or 2). Defaults to 1.
 * @returns {string} A string of uppercase initials, or '?' if input is invalid.
 */
export function getInitials(name, count = 1) {
  // Validate input: must be a non-empty string
  if (!name || typeof name !== "string") return "?";

  // Split by whitespace and filter out empty parts
  const parts = name.trim().split(/\s+/).filter(Boolean);

  // Return '?' if no usable parts found
  if (parts.length === 0) return "?";

  // Limit count to 1 or 2
  const initialsCount = Math.max(1, Math.min(2, count));

  if (initialsCount === 1) {
    // Return only the first letter of the first word
    return parts[0][0].toUpperCase();
  }

  // If one word only, return the first two letters
  if (parts.length === 1) {
    return parts[0].substring(0, 2).toUpperCase();
  }

  // If multiple words, take the first character of the first two
  return (parts[0][0] + parts[1][0]).toUpperCase();
}

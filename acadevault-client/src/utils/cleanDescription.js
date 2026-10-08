/**
 * Cleans and normalizes a shop's description by removing redundant shop name prefixes
 * and making sure the sentence starts smoothly.
 *
 * @param {string} description - The original raw description.
 * @param {string} shopName - The name of the shop to remove if prefixed.
 * @returns {string} A cleaned, user-friendly version of the description.
 */
export function cleanDescription(description, shopName) {
  // Step 1: Remove leading/trailing whitespace from the original description
  const trimmed = description.trim();

  // Step 2: Build a case-insensitive regex to match the shop name at the beginning,
  // followed optionally by spaces, colons, hyphens, or dashes (e.g., "ShopName -", "ShopName: ")
  const regex = new RegExp(`^${shopName}[\\s:\\-—]*`, "i");

  // Step 3: Remove the matched shop name prefix and trim any leftover whitespace
  const withoutName = trimmed.replace(regex, "").trim();

  // Step 4: Detect if the cleaned description starts abruptly with a verb
  const startsWithVerb =
    /^(offers|provides|delivers|features|sells|shares)/i.test(withoutName);

  // Step 5: If it starts with a verb, prepend it with "This shop" to make it smoother
  if (startsWithVerb) {
    return (
      "This shop " + withoutName.charAt(0).toLowerCase() + withoutName.slice(1)
    );
  }

  // Step 6: Otherwise, return the cleaned description as-is
  return withoutName;
}

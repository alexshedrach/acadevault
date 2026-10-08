/**
 * Automatically hyperlinks any tags found in a given description.
 * This is useful for making keywords or topic tags in a material's description clickable,
 * linking users to a filtered materials page based on that tag.
 *
 * @param {string} description - The input text (typically a material description).
 * @param {string[]} tags - An array of tags to be auto-linked within the description.
 * @returns {string} - The updated description with matched tags turned into hyperlinks.
 */
export function autoLinkTags(description, tags = []) {
  // If there's no description or no tags provided, return the original description as-is
  if (!description || tags.length === 0) return description;

  // Create a regular expression to match any of the tags, using word boundaries
  // The 'gi' flags ensure case-insensitive and global matching
  const tagRegex = new RegExp(`\\b(${tags.join("|")})\\b`, "gi");

  // Replace each matched tag with a markdown-style hyperlink to the /materials page
  return description.replace(tagRegex, (matched) => {
    // Encode the matched tag for use in a URL query parameter
    const encoded = encodeURIComponent(matched.toLowerCase());

    // Return the markdown link: [tag](/materials?tag=encoded-tag)
    return `[${matched}](/materials?tag=${encoded})`;
  });
}

import slugify from "slugify";

/**
 * Generate a unique slug for each category.
 * @param {string} name - Category name.
 * @param {Model} model - The category model to check for slug uniqueness.
 * @returns {Promise<string>} - A unique slug.
 */
export const generateUniqueSlug = async (model, name) => {
  // Convert the name to a slug format (lowercase, no special characters)
  const baseSlug = slugify(name, { lower: true, strict: true });

  // Escape special characters to build a regex to match existing slugs
  const escapeRegex = (string) =>
    string.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&");

  // Regex to check for similar slugs (e.g., title-1, title-2, etc.)
  const regex = new RegExp(`^${escapeRegex(baseSlug)}(-\\d+)?$`);

  // Find existing slugs that match the pattern
  const existingSlugs = await model.find({ slug: regex }).select("slug");

  // Create a set of existing slugs for easy comparison
  const slugSet = new Set(existingSlugs.map((s) => s.slug));

  let slug = baseSlug;
  let count = 1;

  // Increment the slug until it is unique
  while (slugSet.has(slug)) {
    slug = `${baseSlug}-${count++}`;
  }

  return slug;
};

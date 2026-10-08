/* -------------------------------------------------------------------------- */
/*                           Utility Functions                                */
/* -------------------------------------------------------------------------- */
/**
 * Normalize and singularize slugs/material types:
 * - Converts dashes (-) to underscores (_).
 * - Removes a trailing "s" to transform plurals into singular (e.g., project-reports -> project_report).
 */
export const normalizeSlug = (slug) => {
  let normalized = slug.replace(/-/g, "_");
  if (normalized.endsWith("s")) {
    normalized = normalized.slice(0, -1);
  }
  return normalized;
};

export const formatSlug = (slug) => {
  if (!slug) return "";
  return slug
    .toLowerCase()
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
};

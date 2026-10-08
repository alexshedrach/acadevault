import { cleanParams } from "./cleanParams";
import { parsePriceRange } from "./parsePriceRange";

/**
 * Normalize user‐facing URL keys → API query keys:
 *   - “keyword” → “search”
 *   - “sortBy”  → “sort”: "rating-desc" → "-rating"
 *   - “price”   → price[gte], price[lte]
 *   - Boolean flags (“isFree”, “isFeatured”, “isTrending”)
 *   - Array filters (“materialType”, “department”, etc.) → comma-separated
 */
export const normalizeParams = (params) => {
  const normalized = { ...params };

  if (normalized.keyword) {
    normalized.search = normalized.keyword;
    delete normalized.keyword;
  }

  if (normalized.sortBy) {
    const [field, direction] = normalized.sortBy.split("-");
    normalized.sort = direction === "desc" ? `-${field}` : field;
    delete normalized.sortBy;
  }

  if (normalized.price) {
    Object.assign(normalized, parsePriceRange(normalized.price));
    delete normalized.price;
  }

  // Convert "false" → remove, "true" → keep
  ["isFree", "isFeatured", "isTrending"].forEach((flag) => {
    if (normalized[flag] === "false") delete normalized[flag];
    else if (normalized[flag]) normalized[flag] = "true";
  });

  // Convert array filters to comma-separated
  ["materialType", "department", "academicDegree", "deliveryFormat"].forEach(
    (key) => {
      if (Array.isArray(normalized[key])) {
        normalized[key] = normalized[key].join(",");
      }
    }
  );

  return cleanParams(normalized);
};

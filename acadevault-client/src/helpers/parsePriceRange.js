/**
 * parsePriceRange("10-50") → { "price[gte]": 10, "price[lte]": 50 }
 */
export const parsePriceRange = (range) => {
  if (!range) return {};
  const [min, max] = range.split("-").map(Number);
  const filter = {};
  if (!isNaN(min)) filter["price[gte]"] = min;
  if (!isNaN(max)) filter["price[lte]"] = max;
  return filter;
};

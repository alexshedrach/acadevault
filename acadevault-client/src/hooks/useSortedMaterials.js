import { useState, useMemo } from "react";

/**
 * A hook that sorts an array of materials according to a selected key.
 *
 * @param {Array} materials — items with at least `createdAt` (string date),
 *                            optional `price` (number) and `sales` (number).
 * @param {string} initialSort — one of "recent", "popular", "price_low", "price_high"
 */
export function useSortedMaterials(materials = [], initialSort = "recent") {
  const [sortBy, setSortBy] = useState(initialSort);

  const sorted = useMemo(() => {
    return [...materials].sort((a, b) => {
      switch (sortBy) {
        case "price_low":
          return (a.price || 0) - (b.price || 0);
        case "price_high":
          return (b.price || 0) - (a.price || 0);
        case "popular":
          return (b.sales || 0) - (a.sales || 0);
        case "recent":
        default:
          return (
            new Date(b.createdAt).valueOf() - new Date(a.createdAt).valueOf()
          );
      }
    });
  }, [materials, sortBy]);

  return { sorted, sortBy, setSortBy };
}

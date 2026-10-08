"use client";

import {
  useRouter,
  usePathname,
  useSearchParams,
  useParams,
} from "next/navigation";
import { useContext, useMemo, useCallback } from "react";
import debounce from "lodash/debounce";

import { CurrencyContext } from "@/contexts/CurrencyContext";
import { normalizeParams } from "@/helpers/normalizeParams";

/**
 * useMaterialFilters
 *
 * • Reads URL search params (page, limit, sort, price, keyword, etc.)
 * • Exposes `filters` (normalized) for UI binding
 * • Exposes `updateFilters(...)` / `debouncedUpdateFilters(...)` to push new filters into the URL
 * • Returns both `categorySlug` (if on /materials/category/[slug]) and `departmentSlug` (if on /departments/[slug])
 * • Returns `materialQueryParams` = { departmentSlug?, categorySlug?, ...filters }
 */
export function useMaterialFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const params = useParams();
  const { currency } = useContext(CurrencyContext);

  // 1) Detect slugs from dynamic routes:
  //    a) /materials/category/[slug] → categorySlug
  //    b) /departments/[slug]          → departmentSlug
  const categorySlug =
    params?.slug && pathname.includes("/materials/category")
      ? params.slug
      : null;
  const departmentSlug =
    params?.slug && pathname.startsWith("/departments/") ? params.slug : null;

  // 2) Compute the base path for filter updates:
  //    - If on a department page, stay under /departments/[slug]
  //    - Else if on a material-category page, use /materials/category/[slug]
  //    - Otherwise default to /materials
  const basePath = useMemo(() => {
    if (departmentSlug) {
      return `/departments/${encodeURIComponent(departmentSlug)}`;
    }
    if (categorySlug) {
      return `/materials/category/${encodeURIComponent(categorySlug)}`;
    }
    return "/materials";
  }, [departmentSlug, categorySlug]);

  // 3) Read raw query params from the URL
  const rawFilters = useMemo(
    () => Object.fromEntries(searchParams.entries()),
    [searchParams]
  );

  // 4) Normalize for API use (arrays, numbers, booleans)
  const filters = useMemo(() => normalizeParams(rawFilters), [rawFilters]);

  // 5) Derive price range array if needed
  const priceRange = useMemo(() => {
    if (!rawFilters.price) return [null, null];
    const [min, max] = rawFilters.price.split("-").map(Number);
    return [isNaN(min) ? null : min, isNaN(max) ? null : max];
  }, [rawFilters.price]);

  // 6) (Optional) Build a debug query string
  const filterQueryString = useMemo(
    () => new URLSearchParams(filters).toString(),
    [filters]
  );

  // 7) Compose final query params for your `useMaterials` / `fetch` calls
  const materialQueryParams = useMemo(
    () => ({
      ...(departmentSlug ? { departmentSlug } : {}),
      ...(categorySlug ? { categorySlug } : {}),
      ...filters,
    }),
    [departmentSlug, categorySlug, filters]
  );

  // 8) updateFilters: merge newFilters into rawFilters & push to URL
  const updateFilters = useCallback(
    (newFilters = {}) => {
      const merged = { ...rawFilters, ...newFilters };

      // Whenever user changes filters other than page, reset to page 1
      if (!("page" in newFilters)) {
        merged.page = 1;
      }

      // Strip out empty / null / undefined / empty-array values
      Object.entries(merged).forEach(([k, v]) => {
        if (v == null || v === "" || (Array.isArray(v) && v.length === 0)) {
          delete merged[k];
        }
      });

      const normalized = normalizeParams(merged);
      const qs = new URLSearchParams(normalized).toString();

      // ← pass { scroll: false } to preserve scroll position
      router.push(`${basePath}?${qs}`, { scroll: false });
    },
    [rawFilters, basePath, router]
  );

  // 9) Debounced version for sliders, search boxes, etc.
  const debouncedUpdateFilters = useMemo(
    () => debounce(updateFilters, 300),
    [updateFilters]
  );

  // 10) resetFilters: clear all and return to basePath
  const resetFilters = useCallback(() => {
    router.push(basePath, { scroll: false }); // ← scroll:false here too
  }, [router, basePath]);

  return {
    // Context identifiers
    categorySlug,
    departmentSlug,

    // Raw + normalized filters
    rawFilters,
    filters,
    priceRange,
    filterQueryString,

    // Routing helpers
    updateFilters,
    debouncedUpdateFilters,
    resetFilters,

    // For API hooks
    currency,
    materialQueryParams,
  };
}

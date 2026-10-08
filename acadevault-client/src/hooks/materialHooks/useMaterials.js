"use client";

import { useEffect, useState } from "react";
import { useGetMaterialsQuery } from "@/features/materials/academicMaterialsApi";

/**
 * useMaterials
 *
 * @param {Object} queryParams – includes page, limit, sort, filters…
 * @param {boolean} infiniteScroll – append pages if true, else replace
 * @param {Object}  options
 *    • initialData?    (object) – seed data from server: { materials: [], pagination: {…} }
 *    • refetchOnMount? (boolean) – default true; set false when using initialData
 */
export const useMaterials = (
  queryParams = {},
  infiniteScroll = false,
  options = {}
) => {
  const { initialData = null, refetchOnMount = true } = options;

  // ── 1) Local pagination state ────────────────────────────────────────────
  const [page, setPage] = useState(
    queryParams.page
      ? Number(queryParams.page)
      : initialData?.pagination?.currentPage || 1
  );

  // ── 2) Local materials array (seed with initialData if provided) ────────
  const [materials, setMaterials] = useState(initialData?.materials || []);

  // ── 3) Local pagination info state (seed if provided) ───────────────────
  const [pagination, setPagination] = useState(
    initialData?.pagination || {
      totalPages: 1,
      currentPage: page,
      totalResults: initialData?.materials?.length || 0,
    }
  );

  // ── 4) Determine if there's more data ───────────────────────────────────
  const [hasMore, setHasMore] = useState(() => {
    if (initialData?.pagination) {
      return (
        initialData.pagination.currentPage < initialData.pagination.totalPages
      );
    }
    // default to true until we know otherwise
    return true;
  });

  // ── 5) Fire RTK Query with mount behavior controlled by options ──────────
  const {
    data: materialsData,
    error: materialsError,
    isLoading: materialsLoading,
    isFetching: isMaterialsFetching,
    refetch,
  } = useGetMaterialsQuery(
    { ...queryParams, page },
    {
      // if initialData exists and refetchOnMount is false, skip the first fetch
      refetchOnMountOrArgChange: refetchOnMount,
    }
  );

  // ── 6) Sync page if queryParams.page changes externally ─────────────────
  useEffect(() => {
    if (queryParams.page && Number(queryParams.page) !== page) {
      setPage(Number(queryParams.page));
    }
  }, [queryParams.page, page]);

  // ── 7) When RTK returns new data, update local state ────────────────────
  useEffect(() => {
    // No data yet (e.g. first render with initialData and refetchOnMount=false)
    if (!materialsData) return;

    const newMaterials = materialsData.materials || [];
    const meta = materialsData.pagination || materialsData.metadata || {};

    // Update pagination state
    setPagination({
      totalPages: meta.totalPages || pagination.totalPages,
      currentPage: meta.currentPage || page,
      totalResults: meta.totalResults ?? pagination.totalResults,
    });

    if (infiniteScroll) {
      // Append pages in infinite scroll mode
      setMaterials((prev) =>
        page === 1 ? newMaterials : [...prev, ...newMaterials]
      );
      setHasMore((meta.currentPage || page) < (meta.totalPages || 1));
    } else {
      // Replace materials array
      setMaterials(newMaterials);
      setHasMore((meta.currentPage || page) < (meta.totalPages || 1));
      // Scroll-to-top handled by parent if desired
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [materialsData, page, infiniteScroll]);

  // ── 8) Manual pagination setter ─────────────────────────────────────────
  const setManualPage = (newPage) => {
    setPage(newPage);
    if (!infiniteScroll) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // ── 9) Load next page (for infinite scrolling) ──────────────────────────
  const fetchNextPage = () => {
    if (hasMore && !isMaterialsFetching) {
      setPage((prev) => prev + 1);
    }
  };

  return {
    materials,
    pagination,
    materialsLoading,
    isMaterialsFetching,
    materialsError,
    currentPage: page,
    setPage: setManualPage,
    refetch,
    hasMore,
    fetchNextPage,
    isFetchingNextPage: isMaterialsFetching && page > 1,
  };
};

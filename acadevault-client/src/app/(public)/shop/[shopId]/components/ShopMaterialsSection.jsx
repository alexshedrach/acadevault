// components/shop/ShopMaterialsSection.jsx
"use client";

import React, { useState, useMemo } from "react";
import { BookOpen } from "lucide-react";

import Pagination from "@/components/ui/Pagination";
import AsyncStateHandler from "@/components/states/AsyncStateHandler";
import { useGetMaterialsQuery } from "@/features/materials/academicMaterialsApi";
import FilterSortControls from "@/components/common/FilterSortControls";
import AnalyticsDashboard from "@/components/analytics/AnalyticsDashboard";
import { Grid } from "@/components/layout/Grid";
import { GridItem } from "@/components/layout/GridItem";
import MaterialCard from "@/components/materials/materialCard";

export default function ShopMaterialsSection({
  shopId,
  initialPage = 1,
  initialLimit = 12,
  showAnalytics = false,
  analyticsData = null,
}) {
  // UI state
  const [page, setPage] = useState(initialPage);
  const [limit, setLimit] = useState(initialLimit);
  const [sortBy, setSortBy] = useState("-createdAt"); // default newest
  const [filterValue, setFilterValue] = useState(""); // materialType

  // API params
  const apiParams = useMemo(() => {
    return { shopId, page, limit, sort: sortBy };
  }, [shopId, page, limit, sortBy]);

  // Fetch
  const { data, isLoading, isFetching, error, refetch } = useGetMaterialsQuery(
    apiParams,
    { refetchOnMountOrArgChange: true }
  );

  const allMaterials = data?.materials || [];
  const pagination = data?.pagination || {
    currentPage: page,
    totalPages: 1,
    totalResults: 0,
  };

  // Client‑side filter by materialType
  const materials = useMemo(() => {
    if (!filterValue) return allMaterials;
    return allMaterials.filter((m) => m.materialType === filterValue);
  }, [allMaterials, filterValue]);

  const isEmpty = materials.length === 0;

  // Handlers
  const handleSortChange = (value) => {
    setSortBy(value);
    setPage(1);
  };
  const handleFilterChange = (value) => {
    setFilterValue(value);
    setPage(1);
  };
  const handleLimitChange = (value) => {
    setLimit(Number(value));
    setPage(1);
  };

  // Dummy handlers - Replace with actual logic if needed
  const handleAddToCart = (id) => console.log("Add to cart:", id);
  const handleWishlist = (id) => console.log("Wishlist:", id);
  const handleCompare = (id) => console.log("Compare:", id);
  const handleQuickView = (material) => console.log("Quick view:", material);

  return (
    <section id="materials" className="pt-12">
      {/* Header + Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 border-y py-3">
        <div className="flex items-center gap-2">
          <BookOpen className="text-blue-600 w-6 h-6" />
          <h2 className="text-2xl font-bold text-gray-800">Shop Materials</h2>
        </div>
        <FilterSortControls
          sortBy={sortBy}
          onSortChange={handleSortChange}
          showFilters={true}
          filterValue={filterValue}
          onFilterChange={handleFilterChange}
        />

        {/* <SortFilterControls
          sortValue={sortBy}
          onSortChange={handleSortChange}
          filterValue={filterValue}
          onFilterChange={handleFilterChange}
          sortOptions={MATERIAL_SORT_OPTIONS}
          filterOptions={MATERIAL_TYPE_FILTERS}
          showFilters={true}
        /> */}
      </div>

      {/* Count & Limit */}
      <div className="flex items-center justify-between mb-4">
        {pagination.totalResults > 0 && (
          <span className="text-sm text-gray-600">
            Showing {(pagination.currentPage - 1) * limit + 1}–
            {Math.min(pagination.currentPage * limit, pagination.totalResults)}{" "}
            of {pagination.totalResults.toLocaleString()} materials
          </span>
        )}
        <div className="flex items-center gap-2">
          <label className="text-sm text-gray-600">Per page:</label>
          <select
            value={limit}
            onChange={(e) => handleLimitChange(e.target.value)}
            className="border border-gray-300 rounded px-2 py-1 text-sm"
          >
            {[12, 24, 48].map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Grid */}
      <AsyncStateHandler
        loading={isLoading}
        error={error}
        onRetry={refetch}
        showEmptyState
        isEmpty={isEmpty}
        emptyTitle="No materials available"
        emptyMessage="This shop hasn't listed any materials yet."
      >
        <Grid cols={1} colsSm={2} colsLg={3} gap="gap-4">
          {materials.map((mat) => (
            <GridItem key={mat._id}>
              <MaterialCard
                material={mat}
                variant="outlined"
                showMeta
                showRating
                showShopInfo
                showActions
                showPrice
                onAddToCart={() => handleAddToCart(mat._id)}
                onWishlist={() => handleWishlist(mat._id)}
                onCompare={() => handleCompare(mat._id)}
                onQuickView={() => handleQuickView(mat)}
                cardVariant="shadowed"
                cardTheme="light"
                clickable
                className="max-w-sm"
              />
            </GridItem>
          ))}
        </Grid>
      </AsyncStateHandler>

      {/* Pagination */}
      <Pagination
        currentPage={pagination.currentPage}
        totalPages={pagination.totalPages}
        isLoading={isFetching}
        onPageChange={(p) => {
          setPage(p);
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
      />

      {/* Analytics */}
      {/* {showAnalytics && analyticsData && (
        <div className="pt-8 border-t mt-8">
          <h3 className="text-lg font-semibold mb-4">Seller Analytics</h3>
          <AnalyticsDashboard analytics={analyticsData} />
        </div>
      )} */}
    </section>
  );
}

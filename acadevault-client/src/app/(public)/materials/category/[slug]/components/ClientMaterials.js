"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useMaterialFilters } from "@/hooks/materialHooks/useMaterialFilters";
import { useMaterials } from "@/hooks/materialHooks/useMaterials";
import AsyncStateHandler from "@/components/states/AsyncStateHandler";
import MaterialListing from "../../../components/materialListing";
import Container from "@/components/layout/Container";
import MaterialHelpSection from "@/components/materials/MaterialHelpSection";
import TopicsSection from "../../../components/TopicsSection";
import MaterialsSpotlight from "../../../components/MaterialsSpotlight";
import PopularShopSellers from "@/components/sellers/PopularShopSellers";
import CategoryHero from "./CategoryHero";
import { useGetPopularTagsQuery } from "@/features/materials/academicMaterialsApi";
import PromoBanner from "@/components/common/PromoBanner";
import QuickLinks from "@/components/common/QuickLinks";
import TrustBadge from "@/components/common/TrustBadge";

/**
 * ClientMaterials
 *
 * Props:
 *   - categorySlug: string (e.g. "computer-science")
 *   - initialSearchParams: Record<string,string> (e.g. { page: "1", limit: "10" })
 *   - initialData: { materials, pagination } from SSR
 */
export default function ClientMaterials({
  categorySlug,
  initialSearchParams = {},
  initialData = {},
}) {
  const formatted = categorySlug
    .replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());

  // ── 1. URL‐driven filters (includes categorySlug inside materialQueryParams)
  const {
    categorySlug: slugFromHook,
    filters,
    rawFilters,
    updateFilters,
    resetFilters,
    debouncedUpdateFilters,
    materialQueryParams,
  } = useMaterialFilters();

  // ── 2. On mount, push `initialSearchParams` into URL if they differ
  useEffect(() => {
    if (
      Object.keys(initialSearchParams).length > 0 &&
      JSON.stringify(initialSearchParams) !== JSON.stringify(rawFilters)
    ) {
      updateFilters(initialSearchParams);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialSearchParams, updateFilters]);

  // ── 3. Fetch materials via useMaterials({ categorySlug, ...filters })
  // We trust the hook to merge categorySlug for the path, and filters for the query.
  const {
    materials,
    pagination,
    materialsLoading,
    materialsError,
    refetch: refetchMaterials,
    currentPage,
    setPage,
    hasMore,
    fetchNextPage,
    isFetchingNextPage,
  } = useMaterials(materialQueryParams, false);

  // ── 4. Popular Tags (for TopicsSection “onSelectTopic”)
  const {
    data: tagsData,
    error: tagsError,
    isLoading: isTagsLoading,
    isFetching: isTagsFetching,
    refetch: refetchTags,
  } = useGetPopularTagsQuery();

  return (
    <>
      {/* ── 5. Hero: displays category name, description, subcategories, and sample materials */}
      <CategoryHero categorySlug={categorySlug} filters={filters} />

      {/* ── 6. Topic Tags for filtering by tag/keyword */}
      <TopicsSection
        topics={tagsData?.data?.tags || []}
        loading={isTagsLoading || isTagsFetching}
        error={tagsError}
        onSelectTopic={(tag) => updateFilters({ keyword: tag })}
        className="mb-12"
      />

      {/* ── 7. Optional highlights/spotlight sections */}
      <MaterialsSpotlight />
      <PopularShopSellers />

      {/* ── 8. Main Material Listing (AsyncStateHandler + MaterialListing) */}
      <Container background="gray-50" section className="py-16">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_250px] gap-4">
          <div className="min-w-0">
            <AsyncStateHandler
              loading={materialsLoading}
              error={materialsError}
              onRetry={refetchMaterials}
              loaderText="Loading category materials…"
              showEmptyState
              isEmpty={
                !materialsLoading &&
                Array.isArray(materials) &&
                materials.length === 0
              }
              emptyTitle="No materials found in this category"
              emptyMessage="Try a different filter or come back later."
            >
              <MaterialListing
                materials={materials}
                pagination={pagination}
                loading={materialsLoading}
                error={materialsError}
                filters={filters}
                contextTitle={`All ${formatted} Academic Materials`}
                onFilterChange={(newFilters) => updateFilters(newFilters)}
                onSortChange={(sortValue) =>
                  updateFilters({ sortBy: sortValue })
                }
                onPageChange={(pageNumber) =>
                  updateFilters({ page: pageNumber })
                }
                resetFilters={resetFilters}
                hasMore={hasMore}
                fetchNextPage={fetchNextPage}
                isFetchingNextPage={isFetchingNextPage}
              />
            </AsyncStateHandler>
          </div>

          <aside className="hidden lg:block sticky top-24 self-start bg-white/50 rounded-lg shadow px-2 space-y-4">
            <QuickLinks
              groups={["discover", "engage"]}
              layout="list"
              groupClassName="bg-white rounded-lg shadow-sm p-4 space-y-4 border"
              groupHeadingClassName=" border-b inline-block"
            />
            <PromoBanner />
            <TrustBadge />
          </aside>
        </div>
      </Container>

      {/* ── 9. Bottom Help CTA */}
      <MaterialHelpSection />
    </>
  );
}

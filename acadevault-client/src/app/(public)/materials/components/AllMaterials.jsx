"use client";

import { useGetPopularTagsQuery } from "@/features/materials/academicMaterialsApi";
import { useMaterialFilters } from "@/hooks/materialHooks/useMaterialFilters";
import { useMaterials } from "@/hooks/materialHooks/useMaterials";
import React, { useEffect, useMemo } from "react";
import MaterialsHeroSection from "./MaterialsHeroSection";
import TopicsSection from "./TopicsSection";
import Container from "@/components/layout/Container";
import AsyncStateHandler from "@/components/states/AsyncStateHandler";
import TrendingMaterialsCarousel from "./TrendingMaterialsCarousel";
import MaterialsHighlights from "./MaterialsHighlights";
import PopularShopSellers from "@/components/sellers/PopularShopSellers";
import MaterialsSpotlight from "./MaterialsSpotlight";
import MaterialListing from "@/app/(public)/materials/components/materialListing";
import MaterialHelpSection from "@/components/materials/MaterialHelpSection";
import Navbar from "@/components/header/Navbar";
import PromoBanner from "@/components/common/PromoBanner";
import QuickLinks from "@/components/common/QuickLinks";
import TrustBadge from "@/components/common/TrustBadge";

/**
 * AllMaterials Client (Client Component)
 *
 * Props:
 *   - initialSearchParams: object of plain strings (e.g. { keyword: "math", page: "2" })
 *
 * 1) We initialize filters + URL sync via useMaterialFilters().
 * 2) We call useMaterials(filters, false) for paginated listing.
 * 3) We fetch popular tags via RTK Query (useGetPopularTagsQuery).
 * 4) We conditionally render loading / error / listing.
 */

export default function AllMaterials({ initialSearchParams = {} }) {
  // ── 1) Filters + Router Sync ──────────────────────────────────────────────
  //    useMaterialFilters reads current URL, but since this component is
  //    hydrated on the client, we want to “push” initialSearchParams into
  //    the URL if they exist, before everything else.
  const { filters, updateFilters, resetFilters, debouncedUpdateFilters } =
    useMaterialFilters();

  // If the URL is currently empty (e.g. first load),
  // we push the initialSearchParams into the router:
  useEffect(() => {
    if (
      Object.keys(initialSearchParams).length > 0 &&
      JSON.stringify(initialSearchParams) !== JSON.stringify(filters)
    ) {
      // This ensures that, on hydration, the URL matches the initial params.
      updateFilters(initialSearchParams);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialSearchParams]);

  // ── 2) Materials Query (RTK Query) ────────────────────────────────────────
  // ─── 2) Main Materials Query (paginated) ─────────────────────────────────
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
  } = useMaterials(filters, false);

  // ─── 3) Featured Materials for Hero (limit: 2) ──────────────────────────
  const featuredFilters = useMemo(
    () => ({ ...filters, isFeatured: true, limit: 2 }),
    [filters]
  );
  const {
    materials: featuredMaterials,
    materialsLoading: featuredLoading,
    materialsError: featuredError,
    refetch: refetchFeatured,
  } = useMaterials(featuredFilters, false);

  // ─── 4) Popular Tags Query ───────────────────────────────────────────────
  const {
    data: tagsData,
    error: tagsError,
    isLoading: isTagsLoading,
    isFetching: isTagsFetching,
    refetch: refetchTags,
  } = useGetPopularTagsQuery();

  return (
    <>
      <Navbar showSearch={true} showCategories={true} />
      {/* ─── HERO SECTION (Featured) ───────────────────────────────────── */}
      <MaterialsHeroSection
        materials={featuredMaterials}
        loading={featuredLoading}
        error={featuredError}
        onRetry={refetchFeatured}
      />

      {/* ─── TRENDING CAROUSEL ─────────────────────────────────────────── */}
      <TrendingMaterialsCarousel />

      {/* ─── HIGHLIGHTS ────────────────────────────────────────────────── */}
      <MaterialsHighlights />

      {/* ─── TOP TAGS ──────────────────────────────────────────────────── */}
      <TopicsSection
        topics={tagsData?.data?.tags || []}
        loading={isTagsLoading || isTagsFetching}
        error={tagsError}
        onSelectTopic={(tag) => updateFilters({ keyword: tag })}
        className="mb-12"
      />

      {/* ─── POPULAR SHOP SELLERS ──────────────────────────────────────── */}
      <PopularShopSellers />

      {/* ─── SPOTLIGHT FEATURE ───────────────────────────────────────── */}
      <MaterialsSpotlight />

      {/* ─── MAIN MATERIAL LISTING ───────────────────────────────────── */}
      <Container background="gray-50" section className="py-16">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_250px] gap-4">
          <div className="min-w-0">
            <AsyncStateHandler
              loading={materialsLoading}
              error={materialsError}
              onRetry={refetchMaterials}
              loaderText="Fetching academic materials…"
              showEmptyState={true}
              isEmpty={materials.length === 0}
              emptyTitle="No materials found"
              emptyMessage="Try changing your filters or search keywords."
            >
              <MaterialListing
                materials={materials}
                pagination={pagination}
                loading={materialsLoading}
                error={materialsError}
                filters={filters}
                contextTitle="Browse All Materials"
                onFilterChange={(newFilters) => updateFilters(newFilters)}
                onSortChange={(sortValue) =>
                  updateFilters({ sortBy: sortValue })
                }
                onPageChange={(pageNumber) =>
                  updateFilters({ page: pageNumber })
                }
                resetFilters={resetFilters}
                isFetchingNextPage={isFetchingNextPage}
                fetchNextPage={fetchNextPage}
                hasMore={hasMore}
              />
            </AsyncStateHandler>
          </div>

          <aside className="hidden lg:block sticky top-24 self-start bg-white/50 rounded-lg shadow px-2 space-y-4">
            <PromoBanner />
            <QuickLinks
              groups={["discover", "engage"]}
              layout="list"
              groupClassName="bg-white rounded-lg shadow-sm p-4 space-y-4 border"
              groupHeadingClassName=" border-b inline-block"
            />
            <TrustBadge />
          </aside>
        </div>
      </Container>

      {/* ─── BOTTOM HELP CTA ────────────────────────────────────── */}
      <MaterialHelpSection />
    </>
  );
}

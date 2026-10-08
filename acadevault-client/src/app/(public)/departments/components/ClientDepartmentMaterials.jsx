"use client";

import { useEffect } from "react";
import AsyncStateHandler from "@/components/states/AsyncStateHandler";
import { useMaterialFilters } from "@/hooks/materialHooks/useMaterialFilters";
import { useMaterials } from "@/hooks/materialHooks/useMaterials";
import MaterialListing from "../../materials/components/materialListing";
import { useCategoryDetails } from "@/hooks/useCategoryDetails";
import Container from "@/components/layout/Container";
import RelatedDepartmentsSection from "./RelatedDepartmentsSection";
import PromoBanner from "@/components/common/PromoBanner";
import QuickLinks from "@/components/common/QuickLinks";
import TrustBadge from "@/components/common/TrustBadge";

export default function ClientDepartmentMaterials({
  initialData,
  departmentSlug,
  initialSearchParams,
}) {
  const { category } = useCategoryDetails(departmentSlug);

  // ── 2) Filters sync with URL ─────────────────────────────────────────────
  const { filters, updateFilters, resetFilters } = useMaterialFilters();

  // Apply server‐computed filters on mount (only if they differ)
  useEffect(() => {
    const hasServerFilters = Object.keys(initialSearchParams).length > 0;
    if (
      hasServerFilters &&
      JSON.stringify(initialSearchParams) !== JSON.stringify(filters)
    ) {
      updateFilters(initialSearchParams);
    }
    // only run once on hydration
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── 3) Department Materials Fetch (with hybrid initialData) ──────────────
  const {
    materials,
    pagination,
    materialsLoading,
    materialsError,
    refetch,
    hasMore,
    fetchNextPage,
    isFetchingNextPage,
  } = useMaterials(
    {
      ...filters,
      categoryType: "Department",
      categorySlug: departmentSlug,
    },
    false, // infiniteScroll?
    {
      // do not refetch on mount if we've just applied server filters
      refetchOnMount: false,
      // **HYBRID**: seed React Query / RTK Query with the server‐side payload
      initialData,
    }
  );

  return (
    <Container background="gray-50" section className="py-16">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_250px] gap-4">
        <div className="min-w-0">
          {/* ── DEPARTMENT MATERIALS ──────────────────────────────────── */}
          <AsyncStateHandler
            loading={materialsLoading}
            error={materialsError}
            onRetry={refetch}
            loaderText="Fetching department materials..."
            showEmptyState={true}
            isEmpty={materials.length === 0}
            emptyTitle="No materials found"
            emptyMessage="Try adjusting your filters or check back later."
          >
            <MaterialListing
              materials={materials}
              pagination={pagination}
              loading={materialsLoading}
              error={materialsError}
              filters={filters}
              contextTitle={`Browse ${
                category?.name || departmentSlug
              } Materials`}
              onFilterChange={updateFilters}
              onSortChange={(sortBy) => updateFilters({ sortBy })}
              onPageChange={(page) => updateFilters({ page })}
              resetFilters={resetFilters}
              isFetchingNextPage={isFetchingNextPage}
              fetchNextPage={fetchNextPage}
              hasMore={hasMore}
            />
          </AsyncStateHandler>
        </div>

        <aside className="hidden lg:block sticky top-24 self-start bg-white/50 rounded-lg shadow px-2 space-y-4">
          <RelatedDepartmentsSection currentDepartmentId={category?.id} />
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
  );
}

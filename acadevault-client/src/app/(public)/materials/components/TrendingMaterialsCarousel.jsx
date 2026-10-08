// components/materials/TrendingMaterialsCarousel.js
"use client";

import { useState, useMemo } from "react";
import { useMaterials } from "@/hooks/materialHooks/useMaterials";
import CarouselTabs from "@/components/carousel/CarouselTabs";
import { TAB_CONTENT } from "@/constants/tabContent";
import Container from "@/components/layout/Container";
import AsyncStateHandler from "@/components/states/AsyncStateHandler";
import SectionHeader from "@/components/common/SectionHeader";
import MaterialCard from "@/components/materials/materialCard";
import Carousel from "@/components/carousel/Carousel";

const TABS = ["Most popular", "New", "Trending"];

/**
 * Given a tab label, return the corresponding sortBy string.
 * “Most popular” → "popularity"
 * “New”          → "newest"
 * “Trending”     → "trending"
 */
const getSortBy = (tab) => {
  switch (tab) {
    case "Most popular":
      return "popularity";
    case "New":
      return "newest";
    case "Trending":
      return "trending";
    default:
      return "popularity";
  }
};

export default function TrendingMaterialsCarousel() {
  // ─── 1) Track which tab is active ────────────────────────────────────────
  const [activeTab, setActiveTab] = useState(TABS[0]);

  // ─── 2) Derive `sortBy` whenever the active tab changes ──────────────────
  const sortBy = useMemo(() => getSortBy(activeTab), [activeTab]);

  // ─── 3) Build a stable queryParams object (memoized) ────────────────────
  const queryParams = useMemo(
    () => ({
      limit: 10,
      sortBy,
      isPublished: true,
    }),
    [sortBy]
  );

  // ─── 4) Fetch materials using our hook (non-infinite, paginated) ─────────
  const { materials, materialsLoading, isMaterialsFetching, error, refetch } =
    useMaterials(queryParams, false);

  // Combine initial loading and refetching indicators
  const loading = materialsLoading || isMaterialsFetching;
  const isEmpty = !Array.isArray(materials) || materials.length === 0;

  return (
    <Container
      background="blue-100"
      section
      fullHeight
      centerContent
      className="py-16 px-0 sm:px-8"
    >
      {/* ── Section Header (Title + Description from TAB_CONTENT) ───────────── */}
      <SectionHeader
        title={TAB_CONTENT[activeTab].title}
        description={TAB_CONTENT[activeTab].description}
        align="left"
        size="lg"
        headingLevel="h2"
      />

      {/* ── Tabs for switching between “Most popular” / “New” / “Trending” ──── */}
      <CarouselTabs
        tabs={TABS}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        className="mt-6"
      />

      {/* ── AsyncStateHandler: show loader / error / empty state / data ──────── */}
      <AsyncStateHandler
        loading={loading}
        error={error}
        onRetry={refetch}
        loaderText="Fetching materials..."
        errorMessage="Failed to load materials. Please try again."
        isEmpty={isEmpty}
        showEmptyState={true}
        emptyTitle="No materials found"
        emptyMessage="Try switching tabs or check back later for updates."
        centered
        className="w-full mt-8"
      >
        {/* ── CAROUSEL: scrollable list of MaterialCards ─────────────────────── */}
        <Carousel
          items={materials}
          renderItem={(material, idx) => (
            <MaterialCard
              key={material._id ?? idx}
              material={material}
              showShopInfo={true}
              cardVariant="outlined"
              showMeta={false}
              showSummary={false}
              showPrice={true}
              showRating={true}
              showActions={true}
              // We want each MaterialCard to be a fixed width so that the scroll
              // container “peeks” multiple cards at once. We wrap the card in a
              // div with `flex-shrink-0` and set a consistent width (e.g. max-w-[300px]).
              className="max-w-[300px] bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 group"
            />
          )}
          mode="scroll" // ← scroll mode (multi-card, horizontal scroll)
          loop={false} // do not wrap-around
          showControls={true} // show left/right arrows
          scrollAmount="80%" // scroll by 80% of container width each click
          itemWidthClass="flex-shrink-0 w-[300px]"
          size="md" // arrow‐button size
          className="w-full" // outer wrapper styling
        />
      </AsyncStateHandler>
    </Container>
  );
}

"use client";

import { ArrowRight, BookOpenIcon } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

import Container from "@/components/layout/Container";
import SectionHeader from "@/components/common/SectionHeader";
import { useCategoryData } from "@/hooks/useCategoryData";
import AsyncStateHandler from "@/components/states/AsyncStateHandler";
import { groupMaterialCategories } from "@/utils/materialTypeGroup";
import { cn } from "@/utils/cn";
import { InfiniteSlider } from "@/components/carousel/InfiniteSlider";
import { Grid } from "@/components/layout/Grid";
import { GridItem } from "@/components/layout/GridItem";
import { AnimatePresence, motion } from "framer-motion";
import MaterialQuickViewModal from "@/components/modals/MaterialQuickViewModal";
import MaterialCard from "@/components/materials/materialCard";
import { Button } from "@/components/ui/Button";
import Link from "next/link";



export default function TrendingMaterialsSection({ trendingMaterials }) {
  const [selectedType, setSelectedType] = useState("Project Report");
  const [quickViewMaterial, setQuickViewMaterial] = useState(null);

  // ─── Fetch all “Material Type” categories via custom hook ─────────────
  const { categories, isLoading: isCategoriesLoading } = useCategoryData({
    queryParams: { categoryType: "Material Type", limit: 20 },
    autoFetch: true,
  });

  // ─── Group categories and extract only the “Documents” group ─────────
  const allGroups = groupMaterialCategories(categories || []);
  const documentGroup = allGroups.find((g) => g.group === "Documents");
  const documentCategories = documentGroup?.categories || [];

  // ─── Ensure default “Project Report” is valid; if not, pick first in list ────
  useEffect(() => {
    if (
      documentCategories.length > 0 &&
      !documentCategories.some((cat) => cat.name === selectedType)
    ) {
      setSelectedType(documentCategories[0].name);
    }
  }, [documentCategories, selectedType]);

  // ─── Featured materials data ──────────────────────────────
  const error = trendingMaterials === null;
  const items = Array.isArray(trendingMaterials?.materials)
    ? trendingMaterials.materials
    : [];
  const isEmpty = !error && items.length === 0;

  // ─── Filter materials by selectedType ───────────────────────
  const filteredItems = items.filter(
    (mat) => mat.materialType === selectedType
  );

  // ─── Quick View handlers ────────────────────────────────────────────
  const handleQuickView = useCallback((material) => {
    setQuickViewMaterial(material);
  }, []);
  const closeQuickView = useCallback(() => setQuickViewMaterial(null), []);

  // ─── Stub callbacks for actions (replace with real logic) ──────────────
  const handleAddToCart = (id) => console.log("Add to cart:", id);
  const handleWishlist = (id) => console.log("Add to wishlist:", id);
  const handleCompare = (id) => console.log("Compare material:", id);

  const MotionLink = motion.create(Link);
  const MotionArrow = motion.create(ArrowRight);

  return (
    <Container
      as="section"
      variant="fluid"
      background="gray-100 "
      className="py-16"
    >
      <SectionHeader
        title="All the Academic Materials You Need, In One Place"
        description="From research papers and project reports to study guides and data sets, explore comprehensive resources across every discipline."
        icon={<BookOpenIcon className="w-6 h-6" />}
        iconPosition="left"
        variant="primary"
        align="left"
        size="lg"
        maxWidth="3xl"
        headingLevel="h2"
        className="px-0 sm:px-8"
      />

      {/* ─── Filter Bar: “Documents” Material Types ──────────────── */}
      {!isCategoriesLoading && documentCategories.length > 0 && (
        <div className="rounded-2xl bg-white/50 backdrop-blur-md border border-gray-200 shadow-md p-4 sm:p-6">
          <InfiniteSlider speed={60} gap={16} pauseOnHover={true}>
            {documentCategories.map((cat) => (
              <div key={cat._id} className="flex-shrink-0">
                <button
                  onClick={() => setSelectedType(cat.name)}
                  className={cn(
                    "px-5 py-2.5 rounded-full text-sm font-semibold whitespace-nowrap shadow transition-all duration-300 transform",
                    "focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2",
                    selectedType === cat.name
                      ? "bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg scale-[1.05]"
                      : "bg-white text-gray-800 hover:bg-gray-100 hover:shadow-md"
                  )}
                  aria-pressed={selectedType === cat.name}
                >
                  {cat.name}
                </button>
              </div>
            ))}
          </InfiniteSlider>
        </div>
      )}

      {/* ─── Async State Wrapper ─────────────────────────── */}
      <AsyncStateHandler
        loading={false}
        error={error}
        onRetry={null}
        showEmptyState={true}
        isEmpty={isEmpty}
        emptyTitle="No featured materials"
        emptyMessage="No featured materials are available."
        centered={false}
      >
        {filteredItems.length === 0 ? (
          <p className="text-center text-gray-500">
            No trending materials at the moment.
          </p>
        ) : (
          <Grid
            as="div"
            role="list"
            cols={1}
            colsSm={2}
            colsLg={4}
            gap="gap-4"
            className="mt-4 px-0 sm:px-8"
          >
            {filteredItems.map((mat) => (
              <GridItem as="div" key={mat._id}>
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
        )}
      </AsyncStateHandler>
      {/* Call-to-action button that always shows, regardless of loading/error states */}
      <div className="mt-12 text-center">
        <MotionLink
          href="/materials"
          target="_blank"
          className={cn(
            "inline-flex items-center gap-2 px-6 py-3 text-white rounded-full bg-gradient-to-r from-indigo-500 via-orange-500 to-orange-700",
            "transition-shadow duration-300 shadow-lg hover:shadow-2xl group relative overflow-hidden"
          )}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          <span className="relative z-10 font-medium text-base">
            View All Materials
          </span>
          <MotionArrow
            className="relative z-10 w-5 h-5 transition-transform duration-300 ease-in-out group-hover:translate-x-1"
            strokeWidth={2}
          />
          <span
            className="absolute inset-0 bg-white/10 blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-700"
            aria-hidden
          />
        </MotionLink>
      </div>

      {/* ─── Quick View Modal ────────────────────────────────── */}
      <AnimatePresence>
        {quickViewMaterial && (
          <MaterialQuickViewModal
            material={quickViewMaterial}
            onClose={closeQuickView}
          />
        )}
      </AnimatePresence>
    </Container>
  );
}

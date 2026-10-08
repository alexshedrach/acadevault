"use client";

import Carousel from "@/components/carousel/Carousel";
import SectionHeader from "@/components/common/SectionHeader";
import Container from "@/components/layout/Container";
import MaterialCard from "@/components/materials/materialCard";
import AsyncStateHandler from "@/components/states/AsyncStateHandler";
import { useMaterials } from "@/hooks/materialHooks/useMaterials";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";

/**
 * Framer Motion variants for “slider” mode:
 *  • enter  → start at x: 50, opacity: 0
 *  • center → x: 0, opacity: 1
 *  • exit   → end at x: -50, opacity: 0
 *
 * We ignore the `direction` parameter here because we always want the
 * same slide-in/slide-out behavior.
 */
const spotlightVariants = {
  enter: () => ({ x: 50, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: () => ({ x: -50, opacity: 0 }),
};

const MaterialsSpotlight = () => {
  const router = useRouter();

  // Fetch up to 10 featured materials (non-infinite, paginated)
  const {
    materials,
    materialsLoading,
    materialsError,
    refetch: refetchMaterials,
  } = useMaterials({ isFeatured: true, limit: 10 }, false);

  // Placeholder action handlers (replace with real logic as needed)
  const handleAddToCart = (id) => {
    console.log("Add to cart:", id);
  };
  const handleWishlist = (id) => {
    console.log("Add to wishlist:", id);
  };
  const handleCompare = (id) => {
    console.log("Compare material:", id);
  };
  const handleQuickView = (id) => {
    console.log("Open quick view for:", id);
  };

  // Check for “empty” state
  const isEmpty = !Array.isArray(materials) || materials.length === 0;

  return (
    <Container
      background="white"
      section
      className="py-16 px-0 sm:px-8 relative"
    >
      {/* ─── Section Header ─────────────────────────────────────────────── */}
      <SectionHeader
        title="Featured Academic Materials"
        description="Curated by experts and highly rated by learners, these resources stand out for their academic depth and practical value."
        align="left"
        size="md"
        headingLevel="h2"
      />

      {/* ─── Async State Handler (loading / error / empty / data) ─────────── */}
      <AsyncStateHandler
        loading={materialsLoading}
        error={materialsError}
        onRetry={refetchMaterials}
        showEmptyState={true}
        isEmpty={isEmpty}
        emptyTitle="No Spotlight Material"
        emptyMessage="We couldn’t find any featured materials right now. Please check back later."
      >
        {/*
          ─── CAROUSEL IN “SLIDER” MODE ─────────────────────────────────────
          • `items`       : the array of material objects
          • `renderItem`  : given one material, return a small wrapper (for centering)
                             plus the horizontal-variant MaterialCard
          • `mode="slider"` : tells Carousel to show exactly one item at a time,
                              with Framer Motion animating enter/exit
          • `loop={true}` : allow wrap-around; clicking “Next” on last jumps to first
          • `showControls` : render left/right arrow buttons
          • `variants`    : our custom motion variants (fade from right, fade to left)
          • `transitionClass` : (optional) extra CSS classes on the wrapper; in this case we leave it blank
          • `size="md"`   : controls arrow-button sizing (padding)
          • `className="relative overflow-hidden"` : keep overflow hidden so cards don’t show before animating
        */}
        <Carousel
          items={materials}
          renderItem={(material) => (
            <div key={material._id} className="flex flex-col max-w-5xl mx-auto">
              <MaterialCard
                material={material}
                variant="horizontal"
                layout="horizontal"
                showMeta={true}
                showSummary={true}
                showPrice={true}
                showRating={true}
                showActions={false}          // Hover actions are on thumbnail; not on entire card
                showShopInfo={true}
                clickable={true}
                onClick={() => router.push(`/materials/${material.slug}`)}
                onAddToCart={() => handleAddToCart(material._id)}
                onWishlist={() => handleWishlist(material._id)}
                onCompare={() => handleCompare(material._id)}
                onQuickView={() => handleQuickView(material._id)}
                cardVariant="shadowed"
                cardTheme="light"
                className="hover:shadow-lg transition-shadow duration-200"
              />
            </div>
          )}
          mode="slider"
          loop={true}
          showControls={true}
          variants={spotlightVariants}
          transitionClass=""          
          size="md"
          className="relative overflow-hidden"
        />
      </AsyncStateHandler>
    </Container>
  );
};

export default MaterialsSpotlight;
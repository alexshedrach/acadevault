"use client";

import { AnimatePresence } from "framer-motion";
import { BookOpenIcon } from "lucide-react";
import { useCallback, useState } from "react";

import SectionHeader from "@/components/common/SectionHeader";
import Container from "@/components/layout/Container";
import { Grid } from "@/components/layout/Grid";
import { GridItem } from "@/components/layout/GridItem";
import MaterialQuickViewModal from "@/components/modals/MaterialQuickViewModal";
import AsyncStateHandler from "@/components/states/AsyncStateHandler";
import MaterialCard from "@/components/materials/materialCard";

export default function FeaturedMaterialsSection({ featuredMaterials }) {
  const [quickViewMaterial, setQuickViewMaterial] = useState(null);

  // ─── Featured materials data ──────────────────────────────────────────
  const error = featuredMaterials === null;
  const items = Array.isArray(featuredMaterials?.materials)
    ? featuredMaterials.materials
    : [];
  const isEmpty = !error && items.length === 0;

  // ─── Quick View handlers ────────────────────────────────────────────
  const handleQuickView = useCallback((material) => {
    setQuickViewMaterial(material);
  }, []);
  const closeQuickView = useCallback(() => setQuickViewMaterial(null), []);

  // ─── Stub callbacks for actions (replace with real logic) ──────────────
  const handleAddToCart = (id) => console.log("Add to cart:", id);
  const handleWishlist = (id) => console.log("Add to wishlist:", id);
  const handleCompare = (id) => console.log("Compare material:", id);

  return (
    <Container as="section" className="py-16 px-0 sm:px-8">
      <SectionHeader
        title="Handpicked Resources For Your Research"
        description="From leading publishers, universities, and research experts to provide reliable, high-impact academic support."
        icon={<BookOpenIcon className="w-6 h-6" />}
        iconPosition="left"
        variant="tertiary"
        align="left"
        size="lg"
        maxWidth="3xl"
        headingLevel="h2"
      />

      {/* ─── Async State Wrapper ──────────────────────────────────── */}
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
        {/* ─── Grid of Filtered Materials ───────────────────────── */}
        <Grid
          as="div"
          role="list"
          cols={1}
          colsSm={2}
          colsLg={4}
          gap="gap-4"
          className="mt-4"
        >
          {items.map((mat) => (
            <GridItem as="div" key={mat._id}>
              <MaterialCard
                material={mat}
                variant="flip"
                layout="backface"
                showMeta={false}
                showSummary={false} // hide summary on front face
                showRating={true} // show star rating on front face
                showShopInfo={true} // show shop logo on front face
                showActions={false} // no hover actions on front
                showPrice
                onAddToCart={() => handleAddToCart(mat._id)}
                onWishlist={() => handleWishlist(mat._id)}
                onCompare={() => handleCompare(mat._id)}
                onQuickView={() => handleQuickView(mat)}
                cardVariant="shadowed"
                cardTheme="light"
                clickable={true}
                className="max-w-sm"
              />
            </GridItem>
          ))}
        </Grid>
      </AsyncStateHandler>

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

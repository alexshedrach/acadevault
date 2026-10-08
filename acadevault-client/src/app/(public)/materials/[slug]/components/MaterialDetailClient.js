"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import dynamic from "next/dynamic";
import React, { useMemo, useRef } from "react";

import FloatingInfoCard from "@/components/cards/FloatingInfoCard";
import Container from "@/components/layout/Container";
import { useGetMaterialDetailsQuery } from "@/features/materials/academicMaterialsApi";

import { useLearningObjectives } from "@/hooks/useLearningObjectives";
import { generateKeyFeatures } from "@/utils/generateKeyFeatures";
import { getMaterialSectionConfig } from "@/utils/getMaterialSectionConfig";

import TrustedByInstitutions from "@/components/common/TrustedByInstitutions";
import { Grid } from "@/components/layout/Grid";
import { GridItem } from "@/components/layout/GridItem";
import AsyncStateHandler from "@/components/states/AsyncStateHandler";
import DetailsHeroSection from "./DetailsHeroSection";
import IncludedResources from "./IncludedResources";
import MaterialDetailsTabs from "./MaterialDetailsTabs";
import MaterialMetaInfo from "./MaterialMetaInfo";
import MaterialOverview from "./MaterialOverview";
import WhatYouWillLearn from "./WhatYouWillLearn";
import SellerContactCard from "@/components/cards/SellerContactCard";
import MoreFromShopSection from "./MoreFromShopSection";
import NotFoundPrompt from "@/components/materials/not-found/NotFoundPrompt";
import PricingCard from "@/components/Pricing/PricingCard";


/**
 * Client‐side “Detail” page for a single academic material.
 */
const MaterialDetailClient = ({ initialData, slug }) => {
  // ─── Refs & Animation Hooks ────────────────────────────────────────────────
  // 1. Create a ref for the element you want to watch
  const pricingRef = useRef(null);

  // 2. Pass that ref into Framer Motion’s hook to get just the boolean
  const isInView = useInView(pricingRef, {
    once: true, // trigger animation only once
    margin: "-100px", // start animation 100px before the element enters the viewport
  });

  // Handy: respect user’s “reduce motion” accessibility setting
  const shouldReduceMotion = useReducedMotion();

  // ─── Data Fetch via RTK Query ─────────────────────────────────────────────
  const {
    data: fetchedData,
    error,
    isLoading,
    isFetching,
    refetch,
  } = useGetMaterialDetailsQuery(slug, {
    skip: !slug,
    refetchOnMountOrArgChange: true,
    fixedCacheKey: slug,
  });

  // ─── Merge SSR + Client Data ──────────────────────────────────────────────
  // Avoid loader flash if we already have initialData
  const material = useMemo(
    () => fetchedData ?? initialData,
    [fetchedData, initialData]
  );

  // ─── Derived UI State ─────────────────────────────────────────────────────
  const hasData = Boolean(material);
  const isLoadingState = !initialData && (isLoading || isFetching);
  const isErrorState = Boolean(error) && !initialData;
  const isEmptyState = !hasData && !isLoadingState && !isErrorState;

  // ─── Business-Logic Hooks ────────────────────────────────────────────────
  const learningObjectives = useLearningObjectives(material);
  const { section, component } = useMemo(
    () => getMaterialSectionConfig(material?.materialType),
    [material?.materialType]
  );
  const keyFeatures = useMemo(() => generateKeyFeatures(material), [material]);

  return (
    <AsyncStateHandler
      loading={isLoadingState}
      loaderText="Loading material details…"
      error={error}
      onRetry={refetch}
      useAlertBoxForError={true}
      showEmptyState={true}
      isEmpty={isEmptyState}
      emptyTitle="Material not found"
      emptyMessage="We couldn't find the academic material you're looking for."
      centered={true}
    >
      {/* ─── HERO & FLOATING CARD ─────────────────────────────────────────── */}
      <Container
        as="section"
        variant="fluid"
        className="relative"
        aria-labelledby="material-detail-heading"
      >
        <DetailsHeroSection material={material} />

        {/* Desktop-only floating info/pricing */}
        <div className="hidden lg:block absolute right-5 top-4 w-[320px]">
          <FloatingInfoCard material={material} />
        </div>
      </Container>

      {/* ─── MAIN CONTENT GRID ─────────────────────────────────────────────── */}
      <Container
        as="section"
        background="gray-50"
        section
        className="py-16 sm:px-6"
      >
        <Grid cols={1} colsLg={4} gap="gap-26" className="mt-8">
          {/* SIDEBAR PRICING (Desktop) */}
          <GridItem className="hidden lg:block -mt-25">
            <motion.div
              ref={pricingRef} // attach your ref here
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="sticky top-18 w-80 shadow-xl ring-1 ring-gray-200 rounded-2xl bg-white"
            >
              <PricingCard material={material} />
            </motion.div>
          </GridItem>

          {/* MAIN COLUMN */}
          <GridItem colSpan={3} className="lg:col-span-3 space-y-6 -mt-20">
            {/* Section‐based rendering */}
            {component === "overview" && (
              <MaterialOverview
                title={section}
                summary={material.summary}
                keyPoints={keyFeatures}
                // fallbackOverview imported above if needed
              />
            )}
            {component === "learn" && (
              <WhatYouWillLearn items={learningObjectives} />
            )}
            {component === "resources" && (
              <IncludedResources
                items={material.resources}
                // fallbackResources imported above if needed
              />
            )}

            <MaterialMetaInfo material={material} />
            {/* Always-on informational sections */}
            <MaterialDetailsTabs material={material} />
            <TrustedByInstitutions />

            {/* Seller & shop info */}
            <SellerContactCard
              shop={material.shop}
              totalMaterials={material.shop.materialCount}
              onContact={() => null}
              onReport={() => null}
            />
            <MoreFromShopSection
              shopId={material.shop._id}
            />

            {/* Fallback prompt if nothing else renders */}
            <NotFoundPrompt />
          </GridItem>
        </Grid>

        {/* MOBILE PRICING (below content on small screens) */}
        <div className="lg:hidden mt-8 px-4">
          <motion.div
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
            className="w-full rounded-2xl shadow-xl ring-1 ring-gray-200 p-4"
          >
            <PricingCard material={material} />
          </motion.div>
        </div>
      </Container>
    </AsyncStateHandler>
  );
};

export default React.memo(MaterialDetailClient);


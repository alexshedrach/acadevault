"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion, useInView, useAnimation } from "framer-motion";
import { writersBenefitsData } from "@/data/writersBenefitsData";
import BenefitsGrid from "./BenefitsGrid";
import { FloatingBlobs } from "@/components/common/FloatingBlobs";
import SectionHeader from "@/components/common/SectionHeader";
import { FaUserCheck } from "react-icons/fa";

// Section Component: Handles visibility, reduced motion, and layout.
const WhyChooseUs = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const controls = useAnimation();
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  // Detect user motion preferences to improve accessibility
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setIsReducedMotion(mediaQuery.matches);
    const handler = () => setIsReducedMotion(mediaQuery.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  // Trigger animations when section enters viewport
  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  // Staggered animation container variant
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: isReducedMotion ? 0 : 0.2 },
    },
  };

  // Graceful fallback if data is unavailable
  if (!writersBenefitsData.length) {
    return (
      <section className="py-20 bg-gradient-to-br from-indigo-50 via-blue-50 to-blue-100">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-indigo-900">
            Why Choose AcaDeVault?
          </h2>
          <p className="mt-6 text-lg text-gray-600">
            Benefits information is currently unavailable. Please refresh the
            page or contact support.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={ref}
      className="relative py-20 sm:py-28 bg-gradient-to-br from-blue-50 via-white to-blue-100 overflow-hidden"
      aria-labelledby="why-choose-us-heading"
    >
      <FloatingBlobs />

      {/* Section Header */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <SectionHeader
          title="Why Choose AcaDeVault Writers?"
          description="Discover why AcaDeVault is the trusted choice for academic excellence, offering unparalleled expertise, reliability, and personalized service."
          icon={<FaUserCheck className="w-8 h-8" />}
          align="center"
          size="xl"
          maxWidth="2xl"
          animate={false}
          className="mb-16"
          containerProps={{
            as: motion.div,
            variants: containerVariants,
            initial: "hidden",
            animate: controls,
          }}
        />

        {/* Benefits Grid Renderer */}
        <BenefitsGrid
          benefitsData={writersBenefitsData}
          containerVariants={containerVariants}
          controls={controls}
        />
      </div>
    </section>
  );
};

export default WhyChooseUs;

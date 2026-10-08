"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Container from "@/components/layout/Container";
import PricingOverviewSection from "./PricingOverviewSection";

// Centralized category configuration
const categories = [
  { key: "custom", label: "Custom Assistance", icon: "💡" },
  { key: "seminar", label: "Seminar/Assignment", icon: "📖" },
  { key: "ond", label: "OND/NCE", icon: "📚" },
  { key: "hnd", label: "HND/B.Sc/BA", icon: "🎓" },
  { key: "pgd", label: "PGD", icon: "📝" },
  { key: "masters", label: "M.Sc/Ph.D", icon: "🏆" },
];

export default function HireWriterPricingClient({ searchParams }) {
  const [activeCategory, setActiveCategory] = useState(
    searchParams?.quote === "true" ? "custom" : "ond"
  );

  const hasMounted = useRef(false);
  const hasUserInteracted = useRef(false);
  const shouldScrollRef = useRef(false);

  // Smooth scroll to pricing section after interaction
  useEffect(() => {
    if (hasMounted.current && hasUserInteracted.current) {
      document
        .getElementById("pricingSection")
        ?.scrollIntoView({ behavior: "smooth" });
    } else {
      hasMounted.current = true;
    }
  }, [activeCategory]);

  // Track category selection via analytics
  useEffect(() => {
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "select_category", {
        event_category: "engagement",
        event_label: activeCategory,
      });
    }
  }, [activeCategory]);

  // Handle category change
  const handleCategoryChange = useCallback((categoryKey) => {
    hasUserInteracted.current = true;
    shouldScrollRef.current = true;
    setActiveCategory(categoryKey);
  }, []);

  return (
    <Container
      as="section"
      className="py-12 md:py-16 bg-gradient-to-br from-white via-blue-50 to-blue-100"
    >
      {/* Section Header */}
      <header
        role="banner"
        className="text-center max-w-4xl mx-auto mb-10 px-4"
      >
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
          Academic Writing,{" "}
          <span className="text-orange-600">Tailored to You</span>
        </h1>
        <p className="mt-3 text-lg text-gray-600 max-w-2xl mx-auto">
          Transparent pricing for every academic level — from quick assignments
          to complex dissertations. Choose a plan or build your own with our
          custom quote tool.
        </p>
        <div className="mt-4 flex justify-center">
          <span className="inline-block h-1 w-32 bg-orange-500 rounded-full" />
        </div>
      </header>

      {/* Pricing Section */}
      <PricingOverviewSection
        categories={categories}
        activeCategory={activeCategory}
        setActiveCategory={handleCategoryChange}
        searchParams={searchParams}
        shouldScrollIntoView={shouldScrollRef.current}
      />
    </Container>
  );
}

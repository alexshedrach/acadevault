"use client";

import { useState, useEffect, useContext } from "react";
import classNames from "classnames";
import { motion } from "framer-motion";
import useSWR from "swr";
import { ProductJsonLd } from "next-seo";
import { fetchPricing } from "@/lib/writers/fetchPricing";
import { pricingData } from "@/data/pricingData";
import CategoryContentRenderer from "./CategoryContentRenderer";
import PlanCheckoutModal from "@/components/modals/PlanCheckoutModal";
import { CurrencyContext } from "@/contexts/CurrencyContext";

export default function PricingOverviewSection({
  categories,
  activeCategory,
  setActiveCategory,
  searchParams,
  shouldScrollIntoView,
}) {
  const { currency } = useContext(CurrencyContext);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Fetch current category plans
  const { data: currentPlans, error } = useSWR(activeCategory, fetchPricing, {
    fallbackData: pricingData[activeCategory] || [],
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  // Auto-open modal from URL param
  useEffect(() => {
    const plan = searchParams?.plan;
    if (plan && currentPlans) {
      const selected = currentPlans.find(
        (p) => p.title.toLowerCase() === plan.toLowerCase()
      );
      if (selected) {
        setSelectedPlan(selected);
        setShowModal(true);
      }
    }
  }, [searchParams, currentPlans]);

  // Modal trigger
  const handleChoosePlan = (plan) => {
    setSelectedPlan(plan);
    setShowModal(true);

    if (typeof window.gtag !== "undefined") {
      window.gtag("event", "select_plan", {
        event_category: "engagement",
        event_label: plan.title,
      });
    }
  };

  return (
    <section
      id="pricingSection"
      className="px-4 sm:px-6 lg:px-8"
      aria-labelledby="category-selection"
    >
      {/* SEO: Structured product offers */}
      <ProductJsonLd
        productName="Academic Writing Services"
        offers={currentPlans.map((plan) => ({
          price: plan.price[currency],
          priceCurrency: currency,
          name: plan.title,
        }))}
      />

      {/* Category Switcher */}
      <div className="mb-8 text-center">
        <motion.div
          className="flex flex-wrap justify-center gap-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          aria-label="Academic category selector"
        >
          {categories.map(({ key, label, icon }) => (
            <button
              key={key}
              onClick={() => setActiveCategory(key)}
              className={classNames(
                "flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 shadow-sm border",
                activeCategory === key
                  ? "bg-orange-600 text-white border-orange-600"
                  : "bg-white text-gray-800 border-gray-300 hover:bg-gray-50"
              )}
              aria-current={activeCategory === key ? "true" : undefined}
            >
              <span className="text-xl">{icon}</span>
              <span>{label}</span>
            </button>
          ))}
        </motion.div>
      </div>

      {/* Category-based pricing content */}
      <div className="relative">
        <CategoryContentRenderer
          activeCategory={activeCategory}
          pricingPlans={currentPlans}
          onChoosePlan={handleChoosePlan}
          error={error}
          shouldScrollIntoView={shouldScrollIntoView}
        />
      </div>

      {/* Plan checkout modal */}
      {selectedPlan && (
        <PlanCheckoutModal
          plan={selectedPlan}
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          currency={currency}
        />
      )}
    </section>
  );
}

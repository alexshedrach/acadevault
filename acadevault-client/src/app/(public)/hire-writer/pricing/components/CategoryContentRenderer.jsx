"use client";

import { motion } from "framer-motion";
import AsyncStateHandler from "@/components/states/AsyncStateHandler";
import PricingCard from "@/components/cards/PricingCard";
import SeminarForm from "./SeminarForm";
import CustomQuoteForm from "./CustomQuoteForm";
import CurrencySelector from "@/components/common/CurrencySelector";
import { LayoutDashboard } from "lucide-react";
import SectionHeader from "@/components/common/SectionHeader";

export default function CategoryContentRenderer({
  activeCategory,
  pricingPlans = [],
  onChoosePlan,
  error,
  shouldScrollIntoView,
}) {
  // Conditionally render form-based categories
  if (["seminar", "custom"].includes(activeCategory)) {
    const Form = activeCategory === "seminar" ? SeminarForm : CustomQuoteForm;
    return (
      <section className="max-w-5xl mx-auto px-4 md:px-6 lg:px-8">
        <Form shouldScrollIntoView={shouldScrollIntoView} />
      </section>
    );
  }

  return (
    <section
      className="relative"
      aria-labelledby="pricing-section-title"
    >
      {/* Heading & Currency Selector */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div
          className="text-center md:text-left space-y-2 max-w-3xl mx-auto md:mx-0"
          aria-labelledby="pricing-section-title"
        >
          <SectionHeader
            title=" Available Pricing Plans"
            description="Explore a range of plans tailored to your academic level. Select the one that best fits your project’s scope, timeline, and budget. Each plan is crafted to meet different academic demands — from quick essays to full projects."
            icon={
              <LayoutDashboard
                className="w-5 h-5 text-orange-600"
                aria-hidden="true"
              />
            }
            animate
            align="left"
            headingClassName="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight"
            descriptionClassName="text-sm sm:text-base text-gray-600 leading-relaxed"
          />
        </div>
        {/* Header */}

        {/* Currency Selector */}
        <div className="mt-4 md:mt-0">
          <CurrencySelector
            asDropdown={false}
            buttonClassName="border rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>
      </div>

      {/* Async State Wrapper */}
      <AsyncStateHandler
        loading={!pricingPlans && !error}
        error={error}
        loaderText="Loading pricing plans..."
        emptyTitle="No Plans Available"
        emptyMessage="No plans found for this category."
        isEmpty={pricingPlans?.length === 0}
      >
        {/* Plans Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
        >
          {pricingPlans.map((plan, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="relative rounded-2xl overflow-hidden hover:scale-[1.02] transition-transform duration-300 h-fit"
            >
              <PricingCard
                plan={plan}
                onChoosePlan={() => onChoosePlan(plan)}
              />
            </motion.div>
          ))}
        </motion.div>
      </AsyncStateHandler>
    </section>
  );
}

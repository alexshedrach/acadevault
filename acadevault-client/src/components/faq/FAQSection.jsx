"use client";

import React, { useState, useMemo } from "react";
import FAQSearch from "./FAQSearch";
import FAQControls from "./FAQControls";
import FAQCategory from "./FAQCategory";
import { faqs } from "@/data/faqsData";

/**
 * FAQSection
 *
 * Top-level FAQ region: title, search bar, controls, and list of categories.
 */
export default function FAQSection() {
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedAll, setExpandedAll] = useState(false);
  const [collapsedAll, setCollapsedAll] = useState(false);

  // Filter categories based on search term
  const filteredFaqs = useMemo(() => {
    if (!searchTerm.trim()) return faqs;
    const term = searchTerm.toLowerCase();
    return faqs
      .map((cat) => ({
        ...cat,
        items: cat.items.filter((faq) =>
          faq.question.toLowerCase().includes(term)
        ),
      }))
      .filter((cat) => cat.items.length > 0);
  }, [searchTerm]);

  return (
    <section
      id="faq-section"
      className="py-24 w-full bg-gradient-to-b from-gray-50 to-gray-100 transition-colors duration-500"
      aria-labelledby="faq-heading"
      role="region"
    >
      <div className="container mx-auto px-4">
        {/* Title */}
        <div className="text-center mb-12">
          <h2 id="faq-heading" className="text-4xl font-bold text-gray-800">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-lg text-gray-700 max-w-2xl mx-auto">
            Have questions? We’ve got answers. Browse by category or search
            below.
          </p>
        </div>

        {/* Search + Expand/Collapse */}
        <div className="max-w-3xl mx-auto mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <FAQSearch value={searchTerm} onChange={setSearchTerm} />
          <FAQControls
            onExpandAll={() => {
              setExpandedAll(true);
              setCollapsedAll(false);
            }}
            onCollapseAll={() => {
              setCollapsedAll(true);
              setExpandedAll(false);
            }}
          />
        </div>

        {/* Categories */}
        <div className="max-w-3xl mx-auto space-y-6">
          {filteredFaqs.map((category) => (
            <FAQCategory
              key={category.category}
              category={category}
              expandAll={expandedAll}
              collapseAll={collapsedAll}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

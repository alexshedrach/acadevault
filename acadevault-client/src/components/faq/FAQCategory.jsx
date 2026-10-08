"use client";

import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { motion } from "framer-motion";
import FAQItem from "./FAQItem";

/**
 * FAQCategory
 *
 * Renders a collapsible FAQ category and its items.
 */
export default function FAQCategory({ category, expandAll, collapseAll }) {
  const [isOpen, setIsOpen] = useState(false);
  const [openItemIds, setOpenItemIds] = useState([]);

  // Sync with global expand/collapse all
  useEffect(() => {
    if (expandAll) {
      setIsOpen(true);
      setOpenItemIds(category.items.map((item) => item.id));
    }
    if (collapseAll) {
      setIsOpen(false);
      setOpenItemIds([]);
    }
  }, [expandAll, collapseAll, category.items]);

  const toggleCategory = () => setIsOpen((open) => !open);

  const toggleItem = (id) => {
    setOpenItemIds((ids) =>
      ids.includes(id) ? ids.filter((x) => x !== id) : [...ids, id]
    );
    // scroll into view on open
    setTimeout(() => {
      document
        .getElementById(`faq-item-${id}`)
        ?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 200);
  };

  return (
    <div className="border rounded-lg shadow-md bg-white">
      {/* Category Header */}
      <button
        onClick={toggleCategory}
        className="w-full px-6 py-4 bg-blue-200 text-lg font-semibold
                   text-left flex justify-between items-center focus:outline-none"
        aria-expanded={isOpen}
        aria-controls={`category-${category.category}`}
      >
        {category.category}
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          ▼
        </motion.span>
      </button>

      {/* Items List */}
      <motion.div
        id={`category-${category.category}`}
        initial={false}
        animate={{
          height: isOpen ? "auto" : 0,
          opacity: isOpen ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <div className="p-4 space-y-4">
          {category.items.map((faq) => (
            <FAQItem
              key={faq.id}
              faq={faq}
              isOpen={openItemIds.includes(faq.id)}
              onToggle={() => toggleItem(faq.id)}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
}

FAQCategory.propTypes = {
  category: PropTypes.shape({
    category: PropTypes.string.isRequired,
    items: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        question: PropTypes.string,
        answer: PropTypes.string,
      })
    ).isRequired,
  }).isRequired,
  expandAll: PropTypes.bool,
  collapseAll: PropTypes.bool,
};

FAQCategory.defaultProps = {
  expandAll: false,
  collapseAll: false,
};

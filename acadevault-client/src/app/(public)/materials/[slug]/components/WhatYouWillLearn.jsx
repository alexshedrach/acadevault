import React, { useState, useMemo, useCallback } from "react";
import { Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

/** Number of items to show before collapsing */
const COLLAPSE_THRESHOLD = 6;

/** Framer-motion variants for each learning item */
const itemVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: (i) => ({
    opacity: 1,
    x: 0,
    transition: { delay: i * 0.04, ease: "easeOut" },
  }),
};

/**
 * Renders a “What You’ll Learn” section with toggleable expansion.
 *
 * - Shows up to COLLAPSE_THRESHOLD items by default.
 * - Animates each item on entry.
 * - Provides “Show more / Show less” toggle when needed.
 */
export const WhatYouWillLearn = React.memo(
  ({ items = [], title = "What you’ll learn" }) => {
    // Toggle state for expanded/collapsed list
    const [showAll, setShowAll] = useState(false);

    // Memoize the visible slice so we only recompute when items or showAll change
    const visibleItems = useMemo(
      () => (showAll ? items : items.slice(0, COLLAPSE_THRESHOLD)),
      [items, showAll]
    );

    // Only show a toggle if there are more items than our threshold
    const needsToggle = items.length > COLLAPSE_THRESHOLD;

    // Handler for toggling expanded state
    const handleToggle = useCallback(() => {
      setShowAll((prev) => !prev);
    }, []);

    // If there are no items, render nothing (or could render a fallback)
    if (items.length === 0) {
      return null;
    }

    return (
      <section
        aria-labelledby="what-you-will-learn-heading"
        className="mt-6 border border-gray-200 bg-white rounded-lg p-6 shadow-sm"
      >
        {/* Section header */}
        <h2
          id="what-you-will-learn-heading"
          className="text-xl font-semibold mb-4 text-gray-900"
        >
          {title}
        </h2>

        {/* Animated list of items */}
        <AnimatePresence initial={false}>
          <motion.ul
            role="list"
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 text-sm text-gray-800"
          >
            {visibleItems.map((item, idx) => (
              <motion.li
                key={`${item}-${idx}`}
                custom={idx}
                variants={itemVariants}
                className="flex items-start gap-2"
                role="listitem"
              >
                <Check
                  className="mt-1 w-4 h-4 text-purple-600 shrink-0"
                  aria-hidden
                />
                <span>{item}</span>
              </motion.li>
            ))}
          </motion.ul>
        </AnimatePresence>

        {/* Toggle button */}
        {needsToggle && (
          <div className="mt-4 text-center">
            <button
              onClick={handleToggle}
              className="text-sm font-medium text-purple-700 hover:text-purple-900 focus:outline-none focus:ring-2 focus:ring-purple-300 rounded transition"
              aria-expanded={showAll}
              aria-controls="what-you-will-learn-list"
            >
              {showAll ? "Show less" : "Show more"}{" "}
              <span aria-hidden>{showAll ? "▲" : "▼"}</span>
            </button>
          </div>
        )}
      </section>
    );
  }
);

export default WhatYouWillLearn;

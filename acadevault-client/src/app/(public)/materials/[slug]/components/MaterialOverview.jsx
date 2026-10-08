import React, { useState, useMemo, useCallback } from "react";
import { Check, FileText } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

/** How many points to show before “Show more” */
const COLLAPSE_THRESHOLD = 6;

/** Animation variants for list items */
const listItemVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.05, ease: "easeOut" },
  }),
};


/**
 * Renders an overview panel with optional summary and key points.
 * Supports “show more/less” behavior when there are many items.
 */
export const MaterialOverview = React.memo(
  ({ title = "Overview", summary = "", keyPoints = [], fallback }) => {
    // Toggle for showing all points
    const [showAll, setShowAll] = useState(false);

    // Determine which data to render (props take priority over fallback)
    const resolvedSummary = summary.trim() || fallback?.summary?.trim() || "";
    const resolvedKeyPoints = useMemo(
      () => (keyPoints.length ? keyPoints : fallback?.keyPoints || []),
      [keyPoints, fallback]
    );

    // Whether there’s anything to show
    const hasSummary = Boolean(resolvedSummary);
    const hasPoints = resolvedKeyPoints.length > 0;
    if (!hasSummary && !hasPoints) {
      // Nothing to render
      return null;
    }

    // Points to display depending on collapsed/expanded state
    const visiblePoints = useMemo(
      () =>
        showAll
          ? resolvedKeyPoints
          : resolvedKeyPoints.slice(0, COLLAPSE_THRESHOLD),
      [resolvedKeyPoints, showAll]
    );

    // Toggle handler
    const handleToggle = useCallback(() => {
      setShowAll((prev) => !prev);
    }, []);

    return (
      <section
        aria-labelledby="material-overview-heading"
        className="mt-10 border border-gray-200 bg-white rounded-2xl p-6 shadow-md"
      >
        {/* Section header with icon */}
        <h2
          id="material-overview-heading"
          className="text-2xl font-bold text-gray-900 flex items-center gap-3 mb-4"
        >
          <FileText className="w-6 h-6 text-blue-600" aria-hidden />
          {title}
        </h2>

        {/* Summary paragraph */}
        {hasSummary && (
          <p className="text-gray-700 text-base leading-relaxed mb-6 whitespace-pre-line">
            {resolvedSummary}
          </p>
        )}

        {/* Key points list */}
        <AnimatePresence>
          {hasPoints && (
            <motion.ul
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 text-sm text-gray-800"
              role="list"
            >
              {visiblePoints.map((point, idx) => (
                <motion.li
                  key={point + idx}
                  custom={idx}
                  variants={listItemVariants}
                  className="flex items-start gap-2"
                  role="listitem"
                >
                  <Check
                    className="mt-1 w-4 h-4 text-blue-600 shrink-0"
                    aria-hidden
                  />
                  <span>{point}</span>
                </motion.li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>

        {/* Show more / Show less button */}
        {resolvedKeyPoints.length > COLLAPSE_THRESHOLD && (
          <div className="mt-6 text-center">
            <button
              onClick={handleToggle}
              className="text-sm font-medium text-blue-700 hover:text-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-300 rounded transition"
              aria-expanded={showAll}
              aria-controls="material-overview-points"
            >
              {showAll ? "Show less ▲" : "Show more ▼"}
            </button>
          </div>
        )}
      </section>
    );
  }
);

export default MaterialOverview;

"use client";

import { useState, useMemo, useId } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import PropTypes from "prop-types";
import { cn } from "@/utils/cn";
import { slugify } from "@/utils/slugify";

export default function SubcategoryGroup({
  groupName,
  items = [],
  initiallyExpanded = true,
  icon = "📌",
  columns = 2,
  limit = null,
  limitToggleLabels = { showMore: "View More ▼", showLess: "Show Less ▲" },
  className = "",
}) {
  const [expanded, setExpanded] = useState(initiallyExpanded);
  const [showAll, setShowAll] = useState(false);
  const listId = useId();

  const renderedItems = useMemo(() => {
    const visibleItems = showAll || !limit ? items : items.slice(0, limit);

    return visibleItems.map((item, i) => {
      const isString = typeof item === "string";
      const key = slugify(isString ? item : item.name) + `-${i}`;
      const label = isString ? item : item.name;
      const href = isString ? null : item.path;

      return (
        <li
          key={key}
          className="flex items-center gap-2 px-1 py-0.5 text-gray-700 hover:text-orange-500 transition-colors duration-150"
        >
          <span className="text-xs">{icon}</span>
          {href ? (
            <Link
              href={typeof href === "string" ? href : { ...href }}
              className="hover:underline underline-offset-2 decoration-dotted"
            >
              {label}
            </Link>
          ) : (
            <span>{label}</span>
          )}
        </li>
      );
    });
  }, [items, icon, showAll, limit]);

  return (
    <motion.section
      layout
      className={cn("mb-4 rounded", className)}
      aria-labelledby={`heading-${listId}`}
    >
      <button
        onClick={() => setExpanded((prev) => !prev)}
        aria-expanded={expanded}
        aria-controls={listId}
        className="w-full flex justify-between items-center text-xs font-bold text-gray-800 mb-2 uppercase border-b pb-1 tracking-wide hover:text-gray-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500"
      >
        <span id={`heading-${listId}`}>{groupName}</span>
        <motion.span
          animate={{ rotate: expanded ? 90 : 0 }}
          transition={{ duration: 0.2 }}
          className="text-sm"
        >
          ▶
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {expanded && (
          <>
            <motion.ul
              id={listId}
              key="list"
              layout
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className={cn(
                `grid grid-cols-${columns} gap-2 text-sm`,
                "overflow-hidden text-gray-600 space-y-1 max-h-64 overflow-y-auto",
              )}
            >
              {renderedItems}
            </motion.ul>

            {limit && items.length > limit && (
              <button
                onClick={() => setShowAll((prev) => !prev)}
                className="mt-2 text-xs text-blue-600 hover:underline self-start"
              >
                {showAll
                  ? limitToggleLabels.showLess
                  : limitToggleLabels.showMore}
              </button>
            )}
          </>
        )}
      </AnimatePresence>
    </motion.section>
  );
}

SubcategoryGroup.propTypes = {
  groupName: PropTypes.string.isRequired,
  items: PropTypes.array.isRequired,
  initiallyExpanded: PropTypes.bool,
  icon: PropTypes.string,
  columns: PropTypes.number,
  limit: PropTypes.number,
  className: PropTypes.string,
  limitToggleLabels: PropTypes.shape({
    showMore: PropTypes.string,
    showLess: PropTypes.string,
  }),
};

SubcategoryGroup.defaultProps = {
  initiallyExpanded: true,
  icon: "📌",
  columns: 2,
  limit: null,
  className: "",
  limitToggleLabels: {
    showMore: "View More ▼",
    showLess: "Show Less ▲",
  },
};

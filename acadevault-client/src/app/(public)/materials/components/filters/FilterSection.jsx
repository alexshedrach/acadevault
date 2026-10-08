"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

export default function FilterSection({
  id,
  title,
  children,
  active,
  onClear,
  expanded,
  toggleExpand,
  sectionRefs,
}) {
  return (
    <div
      ref={(el) => (sectionRefs.current[id] = el)}
      className="bg-white/50 border border-gray-200 rounded-lg shadow-sm overflow-hidden"
    >
      {/* Header */}
      <motion.div
        role="button"
        tabIndex={0}
        onClick={() => toggleExpand(id)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") toggleExpand(id);
        }}
        initial={false}
        animate={{ backgroundColor: expanded[id] ? "#EFF6FF" : "#FFFFFF" }}
        className="w-full flex items-center justify-between px-2 py-3 cursor-pointer focus:outline-none hover:bg-gray-50 transition-colors rounded"
      >
        <div className="flex items-center">
          <motion.div
            animate={{ rotate: expanded[id] ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <ChevronDown
              size={20}
              className={`transition-colors ${
                expanded[id] ? "text-blue-600" : "text-gray-600"
              }`}
            />
          </motion.div>

          <span
            className={`ml-2 text-lg font-semibold transition-colors ${
              expanded[id] ? "text-blue-600" : "text-gray-800"
            }`}
          >
            {title}
          </span>

          {active && (
            <span className="ml-2 inline-flex items-center justify-center text-xs font-medium text-blue-600 bg-blue-100 rounded-full px-2 py-0.5">
              Active
            </span>
          )}
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation(); // Still important to prevent collapse
            onClear();
          }}
          disabled={!active}
          className={`flex items-center text-sm font-medium transition-colors ${
            active
              ? "text-red-500 hover:text-red-600"
              : "text-gray-300 cursor-not-allowed"
          } focus:outline-none`}
        >
          Clear
        </button>
      </motion.div>

      {/* Collapsible Content */}
      <AnimatePresence initial={false}>
        {expanded[id] && (
          <motion.div
            key="content"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            // className="px-2 pt-2 pb-4 border-t border-gray-200 space-y-4"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

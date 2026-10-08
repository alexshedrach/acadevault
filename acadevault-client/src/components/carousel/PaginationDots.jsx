"use client";

import React from "react";
import PropTypes from "prop-types";
import { cn } from "@/utils/cn";

/**
 * Renders a row of small circles (dots). Each dot corresponds to one testimonial.
 * Highlights the active dot and allows clicking to jump to that index.
 *
 * @param {{
 *   count: number;
 *   currentIndex: number;
 *   onDotClick: (index: number) => void;
 * }} props
 */
export default function PaginationDots({ count, currentIndex, onDotClick }) {
  return (
    <div className="flex justify-center mt-6 space-x-2">
      {Array.from({ length: count }).map((_, idx) => (
        <button
          key={idx}
          type="button"
          onClick={() => onDotClick(idx)}
          aria-label={`Go to testimonial ${idx + 1}`}
          className={cn(
            "h-3 w-3 rounded-full transition-all",
            currentIndex === idx
              ? "bg-blue-600 scale-125 dark:bg-blue-400"
              : "bg-gray-400 dark:bg-gray-600"
          )}
        />
      ))}
    </div>
  );
}

PaginationDots.propTypes = {
  count: PropTypes.number.isRequired,
  currentIndex: PropTypes.number.isRequired,
  onDotClick: PropTypes.func.isRequired,
};

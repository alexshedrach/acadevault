"use client";

import React from "react";
import PropTypes from "prop-types";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "@/utils/cn";

/**
 * A reusable left/right arrow button for any carousel or scroll container.
 *
 * Props:
 *  • onClick: handler when the button is clicked.
 *  • label: aria-label text (for a11y).
 *  • direction: "left" or "right" to pick which icon and which absolute position to use.
 *  • size: one of "sm" | "md" | "lg" (controls padding).
 */
export default function NavigationButton({
  onClick,
  label,
  direction,
  size = "md",
}) {
  // Determine padding classes based on size prop
  const paddingClass =
    size === "sm" ? "p-1" : size === "lg" ? "p-3" : /* default */ "p-2";

  // Absolute positioning (left-0 or right-0)
  const positionClass = direction === "left" ? "left-0" : "right-0";

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={cn(
        "absolute top-1/2 transform -translate-y-1/2 pointer-events-auto",
        positionClass,
        "rounded-full bg-white/80 shadow-lg border border-gray-200 backdrop-blur transition-transform hover:scale-110 hover:bg-white",
        paddingClass
      )}
    >
      {direction === "left" ? (
        <ArrowLeft className="w-5 h-5 text-gray-800" />
      ) : (
        <ArrowRight className="w-5 h-5 text-gray-800" />
      )}
    </button>
  );
}

NavigationButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  direction: PropTypes.oneOf(["left", "right"]).isRequired,
  size: PropTypes.oneOf(["sm", "md", "lg"]),
};

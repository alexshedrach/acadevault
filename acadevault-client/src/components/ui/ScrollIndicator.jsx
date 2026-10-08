"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/utils/cn";

/**
 * ScrollIndicator Component
 * @param {string} position - Position on the screen ('bottom-center', 'bottom-right', 'bottom-left')
 * @param {string} color - Tailwind color class for the indicator
 * @param {string} size - Size of the indicator ('sm', 'md', 'lg')
 * @param {boolean} showLabel - Whether to show a text label below the indicator
 * @param {string} label - Custom label text
 */
const ScrollIndicator = ({
  position = "bottom-center",
  color = "indigo-500",
  size = "md",
  showLabel = false,
  label = "Scroll",
}) => {
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  // Detect reduced motion preferences for accessibility
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setIsReducedMotion(mediaQuery.matches);
    const handler = () => setIsReducedMotion(mediaQuery.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  // Positioning presets
  const positionClasses = {
    "bottom-center": "bottom-8 left-1/2 -translate-x-1/2",
    "bottom-right": "bottom-8 right-8",
    "bottom-left": "bottom-8 left-8",
  };

  // Size presets
  const sizeClasses = {
    sm: "w-4 h-7 p-0.5",
    md: "w-6 h-10 p-1",
    lg: "w-8 h-14 p-1.5",
  };

  const dotSize = {
    sm: "w-1.5 h-1.5",
    md: "w-2 h-2",
    lg: "w-3 h-3",
  };

  return (
    <div
      className={cn("absolute", positionClasses[position])}
      aria-hidden="true"
    >
      <div
        className={cn(
          "border-2 rounded-full flex items-start justify-center",
          `border-${color}`,
          sizeClasses[size]
        )}
      >
        <motion.div
          className={cn("rounded-full", `bg-${color}`, dotSize[size])}
          animate={
            isReducedMotion ? {} : { y: [0, 8, 0], opacity: [1, 0.5, 1] }
          }
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
      {showLabel && (
        <div className="text-sm text-gray-500 text-center mt-2">{label}</div>
      )}
    </div>
  );
};

export default ScrollIndicator;

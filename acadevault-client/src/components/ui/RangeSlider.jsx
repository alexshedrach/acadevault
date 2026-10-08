"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import { cn } from "@/utils/cn";
import Tooltip from "@/components/ui/Tooltip";

/**
 * RangeSlider Component with floating tooltip, full accessibility, and drag awareness
 *
 * @param {number} value - Current slider value
 * @param {function} onChange - Callback when value changes
 * @param {number} min - Minimum slider value
 * @param {number} max - Maximum slider value
 * @param {number} step - Step size
 * @param {string} unit - Unit label (e.g., "words", "pages")
 * @param {string} id - Unique ID for accessibility
 * @param {string} label - Optional visible label above slider
 * @param {string} tooltipPosition - Tooltip side (top | bottom | left | right)
 * @param {string} tooltipColor - Tailwind background class
 * @param {string} tooltipSize - sm | md | lg
 * @param {string} tooltipVisibleOn - "drag" | "always"
 * @param {boolean} disabled - Whether slider is disabled
 * @param {string} className - Optional extra classes for the input
 */
export default function RangeSlider({
  value,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  unit = "units",
  id = "range-slider",
  label,
  tooltipPosition = "top",
  tooltipColor = "bg-gray-800",
  tooltipSize = "sm",
  tooltipVisibleOn = "drag", // Only show when dragging by default
  disabled = false,
  className = "",
}) {
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef(null);

  // Calculate tooltip thumb position as percentage
  const leftPercent = useMemo(() => {
    const range = max - min;
    const safeValue = Math.min(Math.max(value, min), max);
    return ((safeValue - min) / range) * 100;
  }, [value, min, max]);

  // Show tooltip only when needed
  const isTooltipVisible = tooltipVisibleOn === "always" ? true : isDragging;

  // Handlers to manage drag state
  const handleMouseDown = () => setIsDragging(true);
  const handleMouseUp = () => setIsDragging(false);

  useEffect(() => {
    // Allow user to stop dragging with mouse/touch outside input
    const handleUp = () => setIsDragging(false);
    window.addEventListener("mouseup", handleUp);
    window.addEventListener("touchend", handleUp);
    return () => {
      window.removeEventListener("mouseup", handleUp);
      window.removeEventListener("touchend", handleUp);
    };
  }, []);

  return (
    <div className="w-full relative">
      {label && (
        <label
          htmlFor={id}
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          {label}
        </label>
      )}

      <div className="relative mt-2">
        {/* Range input */}
        <input
          ref={inputRef}
          id={id}
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          disabled={disabled}
          onChange={(e) => onChange(Number(e.target.value))}
          onMouseDown={handleMouseDown}
          onTouchStart={handleMouseDown}
          className={cn(
            "w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer transition focus:outline-none focus:ring-2 focus:ring-blue-400",
            "[&::-webkit-slider-thumb]:appearance-none",
            "[&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-blue-600 [&::-webkit-slider-thumb]:rounded-full",
            "[&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:bg-blue-600 [&::-moz-range-thumb]:border-none [&::-moz-range-thumb]:rounded-full",
            disabled && "opacity-60 cursor-not-allowed",
            className
          )}
          aria-valuemin={min}
          aria-valuemax={max}
          aria-label={`Adjust ${unit}`}
          aria-describedby={`${id}-tooltip`}
        />

        {/* Tooltip floating above the thumb */}
        <div
          className="absolute -top-9"
          style={{
            left: `${leftPercent}%`,
            transform: "translateX(-50%)",
            pointerEvents: "none", // Let input take the interactions
          }}
        >
          <Tooltip
            id={`${id}-tooltip`}
            content={`${value} ${unit}`}
            position={tooltipPosition}
            color={tooltipColor}
            size={tooltipSize}
            isOpen={isTooltipVisible}
            arrowSize="w-2 h-2"
            dismissOnClickOutside={false}
          >
            <div className="w-4 h-4" /> {/* Invisible anchor */}
          </Tooltip>
        </div>
      </div>
    </div>
  );
}

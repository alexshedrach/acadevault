"use client";

import React, { useMemo } from "react";
import PropTypes from "prop-types";

/**
 * A flexible, accessible, and customizable horizontal progress bar component.
 *
 * Props:
 * @param {number} value             - Current progress value.
 * @param {number} [min=0]           - Minimum progress value.
 * @param {number} [max=100]         - Maximum progress value.
 * @param {boolean} [showLabel=false]        - Whether to display a textual percentage label.
 * @param {("inside"|"outside"|"none")} [labelPosition="none"]
 *                                     - Position of the label: "inside", "outside", or "none".
 * @param {function} [labelFormatter] - Optional function to format the label text. Receives (value, percentage).
 * @param {string} [height="h-3"]    - Tailwind height class for the bar (e.g., "h-4", "h-6").
 * @param {string} [trackClassName]  - Additional Tailwind classes for the track container.
 * @param {string} [barClassName]    - Additional Tailwind classes for the filled portion.
 * @param {boolean} [striped=false]  - Whether to apply a striped pattern on the filled portion.
 * @param {string} [stripeClassName] - Additional Tailwind classes or custom CSS for striped effect.
 * @param {number} [animationDuration=300]
 *                                   - Transition duration in milliseconds for width changes.
 *
 * Accessibility:
 * - Uses role="progressbar" and aria-valuenow/aria-valuemin/aria-valuemax attributes.
 * - If showLabel is true, associates aria-describedby with the label.
 * 
 * USAGE
 * 1) Basic 40% (of 0–80) with an outside label
 *  <ProgressBar
        value={currentValue}
        min={minValue}
        max={maxValue}
        showLabel={true}
        labelPosition="outside"
        height="h-4"
        barClassName="bg-blue-500"
        trackClassName="bg-gray-700"
    /> 

2) Inside label, striped fill 
<ProgressBar
    value={currentValue}
    min={minValue}
    max={maxValue}
    showLabel={true}
    labelPosition="inside"
    striped={true}
    stripeClassName="bg-gradient-to-r from-teal-400 to-teal-600"
    height="h-3"
    barClassName="bg-teal-500"
    trackClassName="bg-gray-700"
    animationDuration={500}
/> 

3) Custom label formatting: "40 / 80 (50%)" 
<ProgressBar
    value={currentValue}
    min={minValue}
    max={maxValue}
    showLabel={true}
    labelPosition="inside"
    labelFormatter={(val, pct) => `${val} / ${maxValue} (${pct}%)`}
    height="h-4"
    barClassName="bg-blue-500"
    trackClassName="bg-gray-700"
/>
 */
const ProgressBar = React.memo(
  ({
    value,
    min = 0,
    max = 100,
    showLabel = false,
    labelPosition = "none",
    labelFormatter = null,
    height = "h-3",
    trackClassName = "",
    barClassName = "",
    striped = false,
    stripeClassName = "",
    animationDuration = 300,
  }) => {
    // Clamp the "value" between min and max
    const safeValue = useMemo(() => {
      if (value < min) return min;
      if (value > max) return max;
      return value;
    }, [value, min, max]);

    // Compute filled percentage
    const percentage = useMemo(() => {
      if (max === min) return 0;
      return ((safeValue - min) / (max - min)) * 100;
    }, [safeValue, min, max]);

    // Generate label text if requested
    const labelText = useMemo(() => {
      if (typeof labelFormatter === "function") {
        return labelFormatter(safeValue, Math.round(percentage));
      }
      return `${Math.round(percentage)}%`;
    }, [safeValue, percentage, labelFormatter]);

    // Construct inline style for transition & width
    const barStyle = {
      width: `${percentage}%`,
      transition: `width ${animationDuration}ms ease-out`,
    };

    // Generate unique ID for aria-describedby if label is displayed
    const labelId = useMemo(() => {
      if (showLabel && labelPosition !== "none") {
        return `progressbar-label-${Math.random().toString(36).substr(2, 9)}`;
      }
      return undefined;
    }, [showLabel, labelPosition]);

    return (
      <div className="w-full flex flex-col gap-1">
        {/* If labelPosition="outside", render label above the bar */}
        {showLabel && labelPosition === "outside" && (
          <span id={labelId} className="text-sm font-medium text-gray-200">
            {labelText}
          </span>
        )}

        {/* Outer track container */}
        <div
          role="progressbar"
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={safeValue}
          aria-describedby={labelId}
          className={`relative w-full bg-gray-800 rounded-full overflow-hidden ${height} ${trackClassName}`}
        >
          {/* Filled bar */}
          <div
            className={`
              absolute left-0 top-0 h-full bg-green-500 
              rounded-full 
              ${striped ? "bg-stripes bg-stripes-animate" : ""} 
              ${barClassName}
            `}
            style={barStyle}
          />
          {/* If labelPosition="inside", render centered label over the filled bar */}
          {showLabel && labelPosition === "inside" && (
            <div className="absolute inset-0 flex items-center justify-center">
              <span
                id={labelId}
                className={`text-sm font-medium ${
                  percentage > 50 ? "text-white" : "text-gray-200"
                }`}
              >
                {labelText}
              </span>
            </div>
          )}
        </div>
      </div>
    );
  }
);

ProgressBar.displayName = "ProgressBar";

ProgressBar.propTypes = {
  /** Current progress value */
  value: PropTypes.number.isRequired,

  /** Minimum possible value (default: 0) */
  min: PropTypes.number,

  /** Maximum possible value (default: 100) */
  max: PropTypes.number,

  /** Show textual percentage label */
  showLabel: PropTypes.bool,

  /** "inside" | "outside" | "none" (default: "none") */
  labelPosition: PropTypes.oneOf(["inside", "outside", "none"]),

  /** Optional function: (value: number, percentage: number) => string */
  labelFormatter: PropTypes.func,

  /** Tailwind height class for the bar (e.g., "h-3", "h-4", "h-6") */
  height: PropTypes.string,

  /** Additional Tailwind classes for the track container */
  trackClassName: PropTypes.string,

  /** Additional Tailwind classes for the filled portion */
  barClassName: PropTypes.string,

  /** Whether to show a striped pattern */
  striped: PropTypes.bool,

  /** Additional Tailwind classes or custom CSS classes for striped effect */
  stripeClassName: PropTypes.string,

  /** Transition duration in milliseconds (default: 300) */
  animationDuration: PropTypes.number,
};

ProgressBar.defaultProps = {
  min: 0,
  max: 100,
  showLabel: false,
  labelPosition: "none",
  labelFormatter: null,
  height: "h-3",
  trackClassName: "",
  barClassName: "",
  striped: false,
  stripeClassName: "",
  animationDuration: 300,
};

export default ProgressBar;

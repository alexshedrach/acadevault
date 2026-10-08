"use client";

import React, { useMemo } from "react";
import { HiInformationCircle } from "react-icons/hi2";
import { motion } from "framer-motion";
import { cn } from "@/utils/cn";
import Tooltip from "../ui/Tooltip";

const urgencyLabels = {
  1.0: "Flexible",
  1.1: "Standard",
  1.3: "Rush",
  1.5: "Immediate", // Default to Tier1 immediate multiplier; adjusted in usePricing
};

const formatValue = (value, suffix) => {
  const label = urgencyLabels[value] || "Custom";
  return `${label} (${value} days)`;
};

export default function PriceUrgencySlider({
  id,
  value = 7,
  onChange,
  min = 1,
  max = 14,
  step = 1,
  suffix = " days",
  className = "",
  disabled = false,
  ariaDescribedBy,
  label = "Urgency",
  tooltip = "Adjust urgency to set delivery date. Higher urgency increases cost but ensures faster delivery.",
  hasUserOverriddenUrgency,
  setHasUserOverriddenUrgency,
}) {
  const displayValue = useMemo(
    () => formatValue(value, suffix),
    [value, suffix]
  );
  const percentage = ((value - min) / (max - min)) * 100;

  const handleKeyDown = (e) => {
    if (disabled) return;
    let newValue = value;
    const validValues = [1, 3, 7, 14]; // Map to flexible (>72h), standard (24-72h), rush (12-24h), immediate (<12h)
    if (e.key === "ArrowRight" || e.key === "ArrowUp") {
      const nextIndex = validValues.findIndex((v) => v > value);
      newValue = nextIndex !== -1 ? validValues[nextIndex] : max;
    } else if (e.key === "ArrowLeft" || e.key === "ArrowDown") {
      const prevIndex = validValues.findIndex((v) => v < value);
      newValue = prevIndex !== -1 ? validValues[prevIndex] : min;
    }
    if (newValue !== value) {
      onChange(newValue);
      setHasUserOverriddenUrgency(true);
    }
  };

  return (
    <div className={cn("w-full", className)}>
      <div className="w-full flex items-center justify-between mb-1">
        <label htmlFor={id} className="flex text-base font-bold text-gray-700">
          <span>{label}</span>
          <span>
            {tooltip && (
              <Tooltip
                position="top"
                size="md"
                arrowSize="w-2 h-2"
                color="bg-gray-900"
                content={tooltip}
              >
                <button
                  type="button"
                  className="focus:outline-none"
                  aria-label="Urgency info"
                >
                  <HiInformationCircle className="w-4 h-4 text-gray-400 hover:text-gray-600 transition" />
                </button>
              </Tooltip>
            )}
          </span>
        </label>
        <motion.span
          key={displayValue}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.2 }}
          className="text-base font-semibold text-gray-800"
          aria-live="polite"
        >
          {displayValue}
        </motion.span>
      </div>

      <div className="relative w-full h-5 flex items-center">
        <input
          type="range"
          id={id}
          value={value}
          onChange={(e) => {
            const newValue = parseInt(e.target.value);
            onChange(newValue);
            setHasUserOverriddenUrgency(true);
          }}
          onKeyDown={handleKeyDown}
          min={min}
          max={max}
          step={step}
          disabled={disabled}
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={displayValue}
          aria-describedby={ariaDescribedBy}
          className={cn(
            "w-full h-2 appearance-none bg-transparent z-10",
            disabled && "opacity-50 cursor-not-allowed"
          )}
          style={{ zIndex: 3 }}
        />

        <div
          className="absolute top-1/2 left-0 w-full h-2 rounded-full bg-gray-200 overflow-hidden"
          style={{ transform: "translateY(-50%)" }}
        >
          <div
            className="h-full bg-gradient-to-r from-orange-400 to-orange-600"
            style={{ width: `${percentage}%` }}
          />
        </div>

        <motion.div
          className="absolute w-5 h-5 bg-orange-500 shadow-md rounded-full border-2 border-white"
          style={{
            left: `calc(${percentage}% - 10px)`,
            top: "50%",
            transform: "translateY(-50%)",
          }}
          transition={{ duration: 0.2, ease: "easeOut" }}
        />
      </div>

      <div className="flex justify-between mt-2 text-xs text-gray-600">
        {Object.values(urgencyLabels).map((label, i) => (
          <span
            key={i}
            className={
              value === [1, 3, 7, 14][i] ? "font-semibold text-orange-600" : ""
            }
          >
            {label}
          </span>
        ))}
      </div>

      <style jsx>{`
        input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none;
          height: 20px;
          width: 20px;
          background: transparent;
          cursor: pointer;
        }
        input[type="range"]::-moz-range-thumb {
          height: 20px;
          width: 20px;
          background: transparent;
          border: none;
          cursor: pointer;
        }
        input[type="range"]::-ms-thumb {
          height: 20px;
          width: 20px;
          background: transparent;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
}
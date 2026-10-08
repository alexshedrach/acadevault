"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { WORDS_PER_PAGE } from "@/config/pricingConfig";
import { calculateWordCountFeedback } from "@/utils/pricingUtils";
import RangeSlider from "../ui/RangeSlider";
import UnitToggle from "./UnitToggle";
import { cn } from "@/utils/cn";

export default function WordPageCount({
  value,
  onChange,
  unitType,
  setUnitType,
  error,
}) {
  const count = Number(value || 0);

  // Set dynamic bounds
  const min = unitType === "pages" ? 1 : 100;
  const max = unitType === "pages" ? 50 : 15000;
  const step = unitType === "pages" ? 1 : 100;

  const words = unitType === "pages" ? count * WORDS_PER_PAGE : count;
  const pages =
    unitType === "pages" ? count : +(count / WORDS_PER_PAGE).toFixed(1);

  const { text: feedbackText, color: feedbackColor } =
    calculateWordCountFeedback(count, unitType);

  useEffect(() => {
    const saved = localStorage.getItem("unitType");
    const defaultUnit = saved || "pages";
    if (unitType !== defaultUnit) setUnitType(defaultUnit);
  }, []);

  const handleInputChange = (val) => {
    const num = Number(val);
    onChange(Number.isNaN(num) || !val ? "" : num);
  };

  const handleToggleUnit = (newUnit) => {
    if (newUnit !== unitType) {
      const converted =
        newUnit === "pages"
          ? Math.max(1, Math.round(Number(value) / WORDS_PER_PAGE))
          : Math.max(100, Number(value) * WORDS_PER_PAGE);

      localStorage.setItem("unitType", newUnit);
      setUnitType(newUnit);
      onChange(Number.isNaN(converted) ? "" : converted);
    }
  };

  return (
    <div className="w-full space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <label
          htmlFor="wordPageInput"
          className="text-sm font-medium text-gray-800"
        >
          Estimated {unitType === "pages" ? "Pages" : "Words"}
        </label>
        <UnitToggle currentUnit={unitType} onToggle={handleToggleUnit} />
      </div>

      {/* Input Field */}
      <div className="relative">
        <input
          id="wordPageInput"
          type="number"
          min={min}
          max={max}
          step={step}
          value={count || ""}
          onChange={(e) => handleInputChange(e.target.value)}
          placeholder={`Enter ${unitType}`}
          className={cn(
            "block w-full rounded-md border px-4 py-2 shadow-sm text-sm transition-all duration-200 focus:outline-none focus:ring-2",
            error
              ? "border-red-500 text-red-700 placeholder-red-400 focus:ring-red-500/30"
              : "border-gray-300 text-gray-900 placeholder-gray-400 focus:ring-blue-500/30"
          )}
          aria-invalid={!!error}
          aria-describedby="wordCount-feedback"
        />
        {error && (
          <p className="absolute -bottom-5 left-0 text-xs text-red-600">
            {error}
          </p>
        )}
      </div>

      {/* Slider */}
      <RangeSlider
        value={count}
        onChange={handleInputChange}
        min={min}
        max={max}
        step={step}
        unit={unitType}
        id="wordCount-slider"
        tooltipVisibleOn="drag"
        tooltipSize="sm"
        tooltipColor="bg-gray-800"
      />

      {/* Feedback */}
      <AnimatePresence>
        {!!count && (
          <motion.div
            key="feedback"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            className="text-xs text-gray-700 dark:text-gray-300"
            id="wordCount-feedback"
            aria-live="polite"
          >
            <span className={feedbackColor}>{feedbackText}</span>
            <span className="ml-1 text-gray-500 dark:text-gray-400">
              ({words.toLocaleString()} words ≈ {pages} pages)
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

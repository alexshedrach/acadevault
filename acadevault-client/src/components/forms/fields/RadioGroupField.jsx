/**
 * RadioGroupField.jsx
 *
 * A reusable radio-button group with:
 *  - Fieldset + legend for semantic grouping
 *  - Animated error display using framer-motion
 *  - ARIA attributes (aria-invalid, aria-describedby)
 *  - Support for stacked or grid layout for radio options
 *
 * Props:
 *  • label:        string – Legend text for the fieldset
 *  • name:         string – Name attribute for each <input type="radio">
 *  • options:      array – [{ value: string, label: string }]
 *  • selected:     string – Currently selected value
 *  • onChange:     func – (newValue: string) => void
 *  • error:        string – Validation error message
 *  • backendError: string – Server-side error
 *  • disabled:     boolean – Disable all radios if true
 *  • className:    string – Custom wrapper classes
 *  • labelClassName: string – Custom classes for the legend
 *  • layout:       string – Layout type: "stacked" (default) or "grid"
 */
"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import PropTypes from "prop-types";
import { cn } from "@/utils/cn";

export const RadioGroupField = ({
  label,
  name,
  options = [],
  selected,
  onChange,
  error = "",
  backendError = "",
  disabled = false,
  className = "",
  labelClassName = "",
  layout = "stacked",
}) => {
  const hasError = Boolean(error || backendError);
  const errorMessage = error || backendError;

  return (
    <fieldset
      className={cn("mb-4", className)}
      aria-invalid={hasError}
      aria-describedby={hasError ? `${name}-error` : undefined}
    >
      {label && (
        <legend
          className={cn(
            "text-sm font-medium text-gray-700 mb-2",
            labelClassName
          )}
        >
          {label}
          {hasError && <span className="text-red-500 ml-0.5">*</span>}
        </legend>
      )}

      <div
        className={cn(
          layout === "grid"
            ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
            : "space-y-2"
        )}
      >
        {options.map((opt) => (
          <label
            key={opt.value}
            className={cn(
              "flex items-center space-x-2 text-gray-800",
              layout === "grid" && "p-2 rounded-md hover:bg-gray-50"
            )}
          >
            <input
              type="radio"
              name={name}
              value={opt.value}
              checked={selected === opt.value}
              onChange={() => onChange(opt.value)}
              disabled={disabled}
              className={cn(
                "w-4 h-4 accent-blue-600 focus:ring-2 focus:ring-blue-400 transition",
                disabled && "opacity-50 cursor-not-allowed"
              )}
            />
            <span>{opt.label}</span>
          </label>
        ))}
      </div>

      <AnimatePresence>
        {hasError && (
          <motion.p
            id={`${name}-error`}
            className="mt-1 text-xs text-red-600"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
          >
            {errorMessage}
          </motion.p>
        )}
      </AnimatePresence>
    </fieldset>
  );
};

RadioGroupField.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({ value: PropTypes.string, label: PropTypes.string })
  ).isRequired,
  selected: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string,
  backendError: PropTypes.string,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  labelClassName: PropTypes.string,
  layout: PropTypes.oneOf(["stacked", "grid"]),
};

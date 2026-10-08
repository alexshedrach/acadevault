// File: components/forms/CheckboxGroupField.jsx
"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import PropTypes from "prop-types";
import { cn } from "@/utils/cn";

/**
 * CheckboxGroupField
 *
 * A reusable checkbox-group component with:
 *  - fieldset + legend for semantic grouping
 *  - animated error display
 *  - ARIA attributes (aria-invalid, aria-describedby)
 *  - Manages selected array via props
 *
 * Props:
 *  • label:        string – legend text for the fieldset
 *  • name:         string – base name for each <input type="checkbox">
 *  • options:      array – [{ value: string, label: string }]
 *  • selected:     array of string – currently checked values
 *  • onChange:     func – (newSelectedArray: string[]) => void
 *  • error:        string – validation error message
 *  • backendError: string – server-side error
 *  • disabled:     boolean – disable all checkboxes if true
 *  • className:    string – custom wrapper classes
 */
export const CheckboxGroupField = ({
  label,
  name,
  options = [],
  selected = [],
  onChange,
  error = "",
  backendError = "",
  disabled = false,
  className = "",
}) => {
  const hasError = Boolean(error || backendError);
  const errorMessage = error || backendError;

  // Toggle a single value in the selected array
  const handleToggle = (value) => {
    if (selected.includes(value)) {
      onChange(selected.filter((v) => v !== value));
    } else {
      onChange([...selected, value]);
    }
  };

  return (
    <fieldset
      className={cn("mb-4", className)}
      aria-invalid={hasError}
      aria-describedby={hasError ? `${name}-error` : undefined}
    >
      {label && (
        <legend className="text-sm font-medium text-gray-700 mb-2">
          {label}
          {hasError && <span className="text-red-500 ml-0.5">*</span>}
        </legend>
      )}

      <div className="space-y-2">
        {options.map((opt) => (
          <label
            key={opt.value}
            className="flex items-center space-x-2 text-gray-800"
          >
            <input
              type="checkbox"
              name={name}
              value={opt.value}
              checked={selected.includes(opt.value)}
              onChange={() => handleToggle(opt.value)}
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

CheckboxGroupField.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({ value: PropTypes.string, label: PropTypes.string })
  ).isRequired,
  selected: PropTypes.arrayOf(PropTypes.string),
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string,
  backendError: PropTypes.string,
  disabled: PropTypes.bool,
  className: PropTypes.string,
};

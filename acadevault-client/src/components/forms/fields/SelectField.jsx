"use client";

import React, { forwardRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PropTypes from "prop-types";
import { cn } from "@/utils/cn";

/**
 * SelectField
 *
 * A reusable dropdown/select component with:
 *  - label + required indicator
 *  - optional placeholder
 *  - react-hook-form support via ref & {...rest}
 *  - animated error display
 *  - ARIA attributes for accessibility
 *
 * Props:
 *  • label:          string – visible label text
 *  • name:           string – input name/id
 *  • value:          string – current selected value
 *  • onChange:       func – change handler (e => void)
 *  • options:        array – options list, either strings or { value, label } objects
 *  • placeholder:    string – placeholder option text (default: "Select an option")
 *  • error:          string – validation error message
 *  • backendError:   string – server-side error message
 *  • required:       boolean – whether selection is required
 *  • disabled:       boolean – whether the select is disabled
 *  • className:      string – wrapper div custom classes
 *  • selectClassName:string – custom classes for the <select> itself
 *  • ...rest:        any other props (e.g. {...register("country")})
 */
export const SelectField = forwardRef(
  (
    {
      label,
      name,
      value,
      onChange,
      options = [],
      placeholder = "Select an option",
      error = "",
      backendError = "",
      required = false,
      disabled = false,
      className = "",
      selectClassName = "",
      ...rest
    },
    ref
  ) => {
    const hasError = Boolean(error || backendError);
    const errorMessage = error || backendError;

    return (
      <div className={cn("mb-4 flex flex-col", className)}>
        {label && (
          <label
            htmlFor={name}
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            {label}
            {required && <span className="text-red-500 ml-0.5">*</span>}
          </label>
        )}

        <select
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          disabled={disabled}
          aria-invalid={hasError}
          aria-describedby={hasError ? `${name}-error` : undefined}
          ref={ref}
          className={cn(
            "w-full px-3 py-2 rounded-md shadow-sm text-sm transition focus:outline-none focus:ring-2",
            disabled ? "bg-gray-100 cursor-not-allowed" : "bg-white",
            hasError
              ? "border-red-500 focus:ring-red-500"
              : "border-gray-300 focus:ring-blue-500",
            selectClassName
          )}
          {...rest}
        >
          {/* Placeholder option */}
          <option value="" disabled>
            {placeholder}
          </option>

          {options.map((opt) =>
            typeof opt === "object" ? (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ) : (
              <option key={opt} value={opt}>
                {opt}
              </option>
            )
          )}
        </select>

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
      </div>
    );
  }
);

SelectField.displayName = "SelectField";

SelectField.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape({ value: PropTypes.string, label: PropTypes.string }),
    ])
  ),
  placeholder: PropTypes.string,
  error: PropTypes.string,
  backendError: PropTypes.string,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  selectClassName: PropTypes.string,
};

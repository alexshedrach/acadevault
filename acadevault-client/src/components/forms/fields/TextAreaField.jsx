// File: components/forms/TextAreaField.jsx

"use client";

import React, { forwardRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PropTypes from "prop-types";
import { cn } from "@/utils/cn";

/**
 * TextAreaField
 *
 * A reusable, controlled textarea component that supports:
 *  • label + required indicator
 *  • react-hook-form (or any register) via {...rest} and forwardRef
 *  • animated error message using AnimatePresence
 *  • optional hint text when there is no error
 *  • backendError OR local error
 *
 * Props:
 *  • label:         string – the visible label text
 *  • name:          string – textarea name/id
 *  • rows:          number – number of text rows (default: 4)
 *  • placeholder:   string – placeholder text (default: "")
 *  • required:      boolean – whether the field is required
 *  • error:         string – local validation error
 *  • backendError:  string – server-side validation error
 *  • showHint:      boolean – display hint text when no error
 *  • hintText:      string – the hint text (default: "This field is required.")
 *  • ...rest:       any other props (e.g. {...register("message", { minLength: 10 })})
 */
export const TextAreaField = forwardRef(
  (
    {
      label,
      name,
      rows = 4,
      placeholder = "",
      required = false,
      showHint = false,
      hintText = "This field is required.",
      error = "",
      backendError = "",
      labelClassName = "",
      ...rest
    },
    ref
  ) => {
    const hasError = Boolean(error || backendError);
    const errorMessage = error || backendError;

    return (
      <div className="mb-4">
        {label && (
          <label
            htmlFor={name}
            className={cn(
              "block text-sm font-medium text-gray-700 mb-1",
              labelClassName
            )}
          >
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}

        <textarea
          id={name}
          name={name}
          rows={rows}
          placeholder={placeholder}
          required={required}
          aria-invalid={hasError}
          aria-describedby={hasError ? `${name}-error` : undefined}
          ref={ref}
          className={cn(
            "w-full px-3 py-2 bg-white/10 text-gray-800 rounded border shadow-sm text-sm transition",
            "focus:outline-none focus:ring-2",
            hasError
              ? "border-red-500 focus:ring-red-500"
              : "border-gray-300 focus:ring-blue-500",
            // optionally gray-out if disabled
            rest.disabled && "bg-gray-100 cursor-not-allowed"
          )}
          {...rest}
        />

        <AnimatePresence>
          {hasError ? (
            <motion.p
              id={`${name}-error`}
              className="mt-1 text-sm text-red-600 font-medium"
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
            >
              {errorMessage}
            </motion.p>
          ) : (
            showHint && (
              <motion.p
                className="mt-1 text-sm text-gray-400"
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
              >
                {hintText}
              </motion.p>
            )
          )}
        </AnimatePresence>
      </div>
    );
  }
);

TextAreaField.displayName = "TextAreaField";

TextAreaField.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  rows: PropTypes.number,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  showHint: PropTypes.bool,
  hintText: PropTypes.string,
  error: PropTypes.string,
  backendError: PropTypes.string,
  labelClassName: PropTypes.string,
};

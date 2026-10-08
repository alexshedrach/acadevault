"use client";

import React, { forwardRef } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { motion, AnimatePresence } from "framer-motion";

/**
 * InputWithAddon
 * A text input field with left/right addon, error handling, and accessibility.
 */
const InputWithAddon = forwardRef(
  (
    {
      label,
      name,
      value,
      onChange,
      type = "text",
      addon,
      position = "left",
      error,
      required = false,
      placeholder = "",
      className = "",
      disabled = false,
      readOnly = false,
      ...rest
    },
    ref
  ) => {
    const hasError = Boolean(error);
    const inputPadding =
      position === "left"
        ? "pl-10 pr-3"
        : position === "right"
        ? "pr-10 pl-3"
        : "px-3";

    return (
      <div className={clsx("mb-4", className)}>
        {label && (
          <label
            htmlFor={name}
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            {label}
            {required && <span className="text-red-500 ml-0.5">*</span>}
          </label>
        )}

        <div className="relative">
          {position === "left" && addon && (
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
              {addon}
            </span>
          )}

          <input
            type={type}
            id={name}
            name={name}
            value={value}
            onChange={onChange}
            ref={ref}
            placeholder={placeholder}
            disabled={disabled}
            readOnly={readOnly}
            aria-invalid={hasError}
            aria-describedby={hasError ? `${name}-error` : undefined}
            className={clsx(
              "w-full py-3 rounded-md border bg-whitetext-gray-900",
              "focus:outline-none focus:ring-2 transition-all duration-150 ease-in-out",
              inputPadding,
              hasError
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:ring-blue-500"
            )}
            {...rest}
          />

          {position === "right" && addon && (
            <span className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500">
              {addon}
            </span>
          )}
        </div>

        <AnimatePresence>
          {hasError && (
            <motion.p
              id={`${name}-error`}
              className="text-sm text-red-500 mt-1"
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
            >
              {error}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    );
  }
);

InputWithAddon.displayName = "InputWithAddon";

InputWithAddon.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  type: PropTypes.string,
  addon: PropTypes.node,
  position: PropTypes.oneOf(["left", "right"]),
  error: PropTypes.string,
  required: PropTypes.bool,
  placeholder: PropTypes.string,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  readOnly: PropTypes.bool,
};

export default InputWithAddon;

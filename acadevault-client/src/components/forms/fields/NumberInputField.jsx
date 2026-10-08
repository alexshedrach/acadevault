"use client";

import React, { forwardRef, memo, useRef } from "react";
import PropTypes from "prop-types";
import { cn } from "@/utils/cn";
import { motion, AnimatePresence } from "framer-motion";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { PhoneIcon } from "lucide-react";

/**
 * NumberInputField
 *
 * A unified input component that can render:
 *   • A standard text/email/etc. input
 *   • A numeric input (<input type="number">)
 *   • An international phone input (using react-phone-number-input)
 *
 * Features:
 *   – Shared “baseInputClasses” for consistent styling
 *   – Animated error/helper messages
 *   – ARIA attributes for accessibility
 *   – Forwarded ref support
 *   – Phone field retains focus on each keystroke
 */
export const NumberInputField = memo(
  forwardRef(function NumberInputField(
    {
      label,
      name,
      type = "text",
      value,
      onChange,
      placeholder = "",
      required = false,
      disabled = false,
      min,
      max,
      step,
      helperText,
      error = "",
      className = "",
      inputClassName = "",
      ...rest
    },
    ref
  ) {
    const hasError = Boolean(error);
    const inputRef = useRef(null);

    // Merge forwarded ref with local ref
    const combinedRef = (node) => {
      inputRef.current = node;
      if (typeof ref === "function") ref(node);
      else if (ref) ref.current = node;
    };

    // Base styling for all inputs
    const baseInputClasses = cn(
      "w-full pr-4 py-3 rounded-lg text-sm transition duration-150 ease-in-out shadow-sm",
      "placeholder-gray-400 text-gray-800",
      "focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500",
      disabled ? "bg-gray-100 cursor-not-allowed opacity-60" : "bg-white",
      hasError
        ? "border-red-500 focus:border-red-500 focus:ring-red-300"
        : "border-gray-300",
      inputClassName
    );

    /**
     * Render the native number input
     */
    const renderNumberInput = () => (
      <input
        id={name}
        name={name}
        type="number"
        value={value ?? ""}
        onChange={onChange}
        min={min}
        max={max}
        step={step}
        required={required}
        disabled={disabled}
        placeholder={placeholder}
        ref={combinedRef}
        className={cn(baseInputClasses, "pl-4")} // no icon padding
        aria-invalid={hasError}
        aria-describedby={hasError ? `${name}-error` : undefined}
        {...rest}
      />
    );

    /**
     * Render the international phone input.
     * We no longer pass an inline `inputComponent`, so focus is preserved.
     */
    const renderPhoneInput = () => (
      <div className="relative w-full">
        {/* Phone icon on the left */}
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <PhoneIcon className="h-5 w-5 text-gray-400" />
        </div>

        <PhoneInput
          id={name}
          name={name}
          international
          defaultCountry="US"
          value={value || ""}
          onChange={onChange}
          disabled={disabled}
          placeholder={placeholder || "+1 555 555 5555"}
          focusInputOnCountrySelection={false}
          className={cn(
            baseInputClasses,
            "!pl-10", // pad for icon
            "!pr-4 !py-3" // ensure vertical padding
          )}
          aria-invalid={hasError}
          aria-describedby={hasError ? `${name}-error` : `${name}-helper`}
          {...rest}
        />
      </div>
    );

    /**
     * Render a standard text/email/password/etc. input
     */
    const renderTextInput = () => (
      <input
        id={name}
        name={name}
        type={type}
        value={value ?? ""}
        onChange={onChange}
        required={required}
        disabled={disabled}
        placeholder={placeholder}
        ref={combinedRef}
        className={cn(baseInputClasses, "pl-4")}
        aria-invalid={hasError}
        aria-describedby={hasError ? `${name}-error` : undefined}
        {...rest}
      />
    );

    // Choose which input to render based on `type`
    const renderInput = () => {
      if (type === "phone") return renderPhoneInput();
      if (type === "number") return renderNumberInput();
      return renderTextInput();
    };

    // Fallback helper text for phones
    const effectiveHelperText =
      type === "phone"
        ? helperText || "Include country code (e.g. +1, +234, etc.)"
        : helperText;

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

        {renderInput()}

        <AnimatePresence>
          {hasError ? (
            <motion.p
              id={`${name}-error`}
              className="mt-1 text-sm text-red-600 font-medium"
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              role="alert"
            >
              {error}
            </motion.p>
          ) : (
            effectiveHelperText && (
              <motion.p
                id={`${name}-helper`}
                className="mt-1 text-sm text-gray-500"
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
              >
                {effectiveHelperText}
              </motion.p>
            )
          )}
        </AnimatePresence>
      </div>
    );
  })
);

NumberInputField.displayName = "NumberInputField";

NumberInputField.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  type: PropTypes.oneOf([
    "text",
    "email",
    "password",
    "number",
    "phone",
    "tel",
  ]),
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  min: PropTypes.number,
  max: PropTypes.number,
  step: PropTypes.number,
  helperText: PropTypes.string,
  error: PropTypes.string,
  className: PropTypes.string,
  inputClassName: PropTypes.string,
};

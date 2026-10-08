// File: components/forms/InputField.jsx

"use client";

import React, { forwardRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PropTypes from "prop-types";
import { cn } from "@/utils/cn";

/**
 * InputField
 *
 * A reusable, controlled input component that supports:
 *  • label + required indicator
 *  • react-hook-form (or any register) via {...rest} and forwardRef
 *  • animated error message using AnimatePresence
 *  • optional hint text when there is no error
 *  • backendError (e.g. server-side validation) OR local error
 *
 * Props:
 *  • label:         string – the visible label text
 *  • name:          string – input name/id
 *  • type:          string – HTML input type (default: "text")
 *  • autoComplete:  string – autocomplete attribute
 *  • placeholder:   string – placeholder text (default: "")
 *  • required:      boolean – whether the field is required
 *  • autoFocus:     boolean – autofocus on mount
 *  • showHint:      boolean – display hint text when no error
 *  • hintText:      string – the hint text to show (default: "This field is required.")
 *  • error:         string – local validation error (e.g. from react-hook-form)
 *  • backendError:  string – server-side validation error
 *  • ...rest:       any other props (e.g. {...register("email", { required: true })})
 */
export const InputField = forwardRef(
  (
    {
      label,
      name,
      type = "text",
      autoComplete,
      placeholder = "",
      required = false,
      autoFocus = false,
      showHint = false,
      hintText = "This field is required.",
      error = "",
      backendError = "",
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
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}

        <input
          id={name}
          name={name}
          type={type}
          autoComplete={autoComplete}
          placeholder={placeholder}
          required={required}
          autoFocus={autoFocus}
          aria-invalid={hasError}
          aria-describedby={hasError ? `${name}-error` : undefined}
          ref={ref}
          className={cn(
            "w-full px-3 py-2 border rounded-md shadow-sm text-sm transition",
            "focus:outline-none focus:ring-2 text-gray-800",
            hasError
              ? "border-red-500 focus:ring-red-500"
              : "border-gray-300 focus:ring-blue-500",
            // optionally gray-out input when disabled (if passed via rest)
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

InputField.displayName = "InputField";

InputField.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  autoComplete: PropTypes.string,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  autoFocus: PropTypes.bool,
  showHint: PropTypes.bool,
  hintText: PropTypes.string,
  error: PropTypes.string,
  backendError: PropTypes.string,
};

// import cn from "cn";

// export default function InputField({
//   label,
//   name,
//   type = "text",
//   autoComplete,
//   placeholder = "",
//   required = false,
//   autoFocus = false,
//   showHint = false,
//   hintText = "This field is required.",
//   error,
//   backendError,
//   ...rest // 👈 Spread all remaining props from register()
// }) {
//   const hasError = !!(error || backendError);
//   const errorMessage = error || backendError;

//   return (
//     <div className="mb-4">
//       {label && (
//         <label
//           htmlFor={name}
//           className="block text-sm font-medium text-gray-700 mb-1"
//         >
//           {label}
//           {required && <span className="text-red-500 ml-1">*</span>}
//         </label>
//       )}

//       <input
//         id={name}
//         name={name}
//         type={type}
//         autoComplete={autoComplete}
//         placeholder={placeholder}
//         required={required}
//         autoFocus={autoFocus}
//         aria-invalid={hasError}
//         aria-describedby={hasError ? `${name}-error` : undefined}
//         className={cn(
//           "w-full px-3 py-2 border rounded-md shadow-sm text-sm",
//           "focus:outline-none focus:ring-2 focus:ring-blue-500",
//           hasError
//             ? "border-red-500 focus:ring-red-500"
//             : "border-gray-300 focus:border-blue-500"
//         )}
//         {...rest} // 👈 Inject react-hook-form's register handlers
//       />

//       {hasError ? (
//         <p
//           id={`${name}-error`}
//           className="mt-1 text-sm text-red-600 font-medium"
//         >
//           {errorMessage}
//         </p>
//       ) : (
//         showHint && <p className="mt-1 text-sm text-gray-400">{hintText}</p>
//       )}
//     </div>
//   );
// }

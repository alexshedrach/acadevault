// components/reviews/ReviewTitleInput.tsx
"use client";

import React from "react";
import { InputField } from "../ui/InputField";

/**
 * ReviewTitleInput
 *
 * A thin wrapper around InputField specialized for the review title:
 *  • Uses `<InputField>` for label, error & hint display
 *  • Exposes a clean API for value/onChange
 *  • Defaults to optional with a "(optional)" hint
 */
export default function ReviewTitleInput({
  value,
  onChange,
  name = "reviewTitle",
  label = "Review Title",
  placeholder = "Summarize your experience in a few words",
  optional = true,
  maxLength = 100,
  disabled = false,
  error = "",
  backendError = "",
  hintText = "This is optional; you can skip it.",
}) {
  return (
    <InputField
      name={name}
      label={label}
      type="text"
      placeholder={placeholder}
      required={!optional}
      showHint={optional}
      hintText={hintText}
      error={error}
      backendError={backendError}
      maxLength={maxLength}
      disabled={disabled}
      autoComplete="off"
      value={value}
      onChange={onChange}
    />
  );
}

// "use client";

// import React, { forwardRef } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { cn } from "@/utils/cn";

// const ReviewTitleInput = forwardRef(
//   (
//     {
//       label = "Review Title",
//       name,
//       value,
//       onChange,
//       placeholder = "Summarize your experience in a few words",
//       optional = true,
//       maxLength = 100,
//       showHint = false,
//       hintText = "This is optional, but helps summarize your review.",
//       error = "",
//       backendError = "",
//       disabled = false,
//       className = "",
//       inputClassName = "",
//       ...rest
//     },
//     ref
//   ) => {
//     const hasError = Boolean(error || backendError);
//     const errorMessage = error || backendError;

//     return (
//       <div className={cn("mb-4 w-full", className)}>
//         {/* Label */}
//         <label
//           htmlFor={name}
//           className="block text-sm font-medium text-gray-700 mb-1"
//         >
//           {label}
//           {!optional && <span className="text-red-500 ml-1">*</span>}
//           {optional && showHint && !hasError && (
//             <span className="text-gray-400 ml-2 text-sm">{`(${hintText})`}</span>
//           )}
//         </label>

//         {/* Input */}
//         <input
//           id={name}
//           name={name}
//           type="text"
//           value={value}
//           onChange={onChange}
//           placeholder={placeholder}
//           maxLength={maxLength}
//           disabled={disabled}
//           aria-invalid={hasError}
//           aria-describedby={hasError ? `${name}-error` : undefined}
//           ref={ref}
//           className={cn(
//             "w-full px-4 py-2 border rounded-md shadow-sm text-sm transition focus:outline-none focus:ring-2",
//             hasError
//               ? "border-red-500 focus:ring-red-500"
//               : "border-gray-300 focus:ring-blue-500",
//             disabled && "bg-gray-100 cursor-not-allowed opacity-50",
//             inputClassName
//           )}
//           {...rest}
//         />

//         {/* Error or Hint */}
//         <AnimatePresence>
//           {hasError ? (
//             <motion.p
//               key="error"
//               id={`${name}-error`}
//               className="mt-1 text-sm text-red-600 font-medium"
//               initial={{ opacity: 0, y: -4 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: -4 }}
//             >
//               {errorMessage}
//             </motion.p>
//           ) : (
//             showHint && (
//               <motion.p
//                 key="hint"
//                 className="mt-1 text-sm text-gray-400"
//                 initial={{ opacity: 0, y: -4 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 exit={{ opacity: 0, y: -4 }}
//               >
//                 {hintText}
//               </motion.p>
//             )
//           )}
//         </AnimatePresence>
//       </div>
//     );
//   }
// );

// ReviewTitleInput.displayName = "ReviewTitleInput";

// export default ReviewTitleInput;

"use client";

import { useEffect, useState } from "react";
import { Eye, EyeOff, CheckCircle } from "lucide-react";
import classNames from "classnames";
import zxcvbn from "zxcvbn";
import { useController } from "react-hook-form";

const levels = [
  { label: "Very Weak", color: "bg-red-500", emoji: "🟥" },
  { label: "Weak", color: "bg-orange-500", emoji: "🟧" },
  { label: "Fair", color: "bg-yellow-400", emoji: "🟨" },
  { label: "Good", color: "bg-blue-500", emoji: "🟦" },
  { label: "Strong", color: "bg-green-600", emoji: "🟩" },
];

const getZxcvbnStrength = (password, userInputs = []) => {
  if (!password) return null;
  const result = zxcvbn(password, userInputs);
  const { score, feedback, crack_times_display } = result;
  return {
    score,
    label: levels[score].label,
    color: levels[score].color,
    emoji: levels[score].emoji,
    suggestions: feedback.suggestions,
    crackTime: crack_times_display.offline_fast_hashing_1e10_per_second,
  };
};

export function PasswordField({
  name,
  label = "Password",
  control = null, // ➤ Optional
  required = true,
  backendError = "",
  placeholder = "",
  autoComplete = "new-password",
  showPassword,
  setShowPassword,
  showToggle = true,
  className = "",
  inputClassName = "",
  userInputs = [],
  onStrengthChange = () => {},
  value: propValue, // For uncontrolled version
  onChange: propOnChange, // For uncontrolled version
  onBlur: propOnBlur, // For uncontrolled version
  error: externalError, // For uncontrolled version
}) {
  // If control is provided, use react-hook-form
  const hookForm = !!control;

  const {
    field: { value, onChange, onBlur, ref } = {},
    fieldState: { error } = {},
  } = hookForm
    ? useController({
        name,
        control,
        defaultValue: "",
      })
    : {};

  const inputValue = hookForm ? value : propValue;
  const inputOnChange = hookForm ? onChange : propOnChange;
  const inputOnBlur = hookForm ? onBlur : propOnBlur;

  const [strength, setStrength] = useState(null);
  const showStrength = name === "password";

  const hasError = !!(error || backendError || externalError);
  const errorMessage = error?.message || backendError || externalError;
  const showValid = !hasError && inputValue?.trim()?.length > 0;

  useEffect(() => {
    const handler = setTimeout(() => {
      if (showStrength && inputValue) {
        const result = getZxcvbnStrength(inputValue, userInputs);
        setStrength(result);
        onStrengthChange(result);
      } else {
        setStrength(null);
        onStrengthChange(null);
      }
    }, 200);

    return () => clearTimeout(handler);
  }, [inputValue, showStrength, userInputs]);

  return (
    <div className={classNames("mb-6", className)}>
      {label && (
        <label
          htmlFor={name}
          className="form-label block text-sm font-medium text-gray-700 mb-1"
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      <div className="relative">
        <input
          id={name}
          name={name}
          ref={ref}
          type={showPassword ? "text" : "password"}
          value={inputValue}
          onChange={inputOnChange}
          onBlur={inputOnBlur}
          required={required}
          autoComplete={autoComplete}
          placeholder={placeholder}
          aria-invalid={hasError}
          aria-describedby={hasError ? `${name}-error` : undefined}
          className={classNames(
            "input-style pr-10",
            hasError &&
              "border-red-500 ring-red-500 focus:ring-red-500 focus:border-red-500",
            inputClassName
          )}
        />

        {showToggle && (
          <button
            type="button"
            onClick={() => setShowPassword?.((prev) => !prev)}
            className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-700"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        )}

        {showValid && (
          <CheckCircle
            className="absolute right-10 top-2.5 text-green-500"
            size={20}
            aria-hidden="true"
          />
        )}
      </div>

      {showStrength && strength && (
        <div id={`${name}-strength`} className="mt-2 space-y-1">
          <div className="w-full h-2 bg-gray-200 rounded overflow-hidden">
            <div
              className={classNames(
                "h-full transition-all duration-300",
                strength.color
              )}
              style={{ width: `${((strength.score + 1) / 5) * 100}%` }}
            />
          </div>
          <p
            className={classNames(
              "text-xs font-medium flex items-center gap-1",
              strength.color.replace("bg", "text")
            )}
          >
            Strength: {strength.emoji} {strength.label}
            <span className="ml-2 text-gray-500">
              ({strength.crackTime} to crack)
            </span>
          </p>
          {strength.score < 3 && strength.suggestions?.length > 0 && (
            <ul className="text-xs text-gray-600 list-disc list-inside">
              {strength.suggestions.map((msg, idx) => (
                <li key={idx}>{msg}</li>
              ))}
            </ul>
          )}
        </div>
      )}

      {hasError && (
        <p
          id={`${name}-error`}
          className="text-sm text-red-600 mt-1"
          role="alert"
        >
          {errorMessage}
        </p>
      )}
    </div>
  );
}

// "use client";

// import { useState, useEffect } from "react";
// import { Eye, EyeOff, CheckCircle } from "lucide-react";
// import classNames from "classnames";
// import zxcvbn from "zxcvbn";

// const levels = [
//   { label: "Very Weak", color: "bg-red-500", emoji: "🟥" },
//   { label: "Weak", color: "bg-orange-500", emoji: "🟧" },
//   { label: "Fair", color: "bg-yellow-400", emoji: "🟨" },
//   { label: "Good", color: "bg-blue-500", emoji: "🟦" },
//   { label: "Strong", color: "bg-green-600", emoji: "🟩" },
// ];

// const getZxcvbnStrength = (password, userInputs = []) => {
//   if (!password) return null;
//   const result = zxcvbn(password, userInputs);
//   const { score, feedback, crack_times_display } = result;
//   return {
//     score,
//     label: levels[score].label,
//     color: levels[score].color,
//     emoji: levels[score].emoji,
//     suggestions: feedback.suggestions,
//     crackTime: crack_times_display.offline_fast_hashing_1e10_per_second,
//   };
// };

// export function PasswordField({
//   label = "Password",
//   name,
//   value,
//   onChange,
//   onBlur,
//   required = true,
//   error = "",
//   backendError = "",
//   placeholder = "",
//   autoComplete = "new-password",
//   showPassword,
//   setShowPassword,
//   showToggle = false,
//   className = "",
//   inputClassName = "",
//   userInputs = [],
//   onStrengthChange = () => {},
// }) {
//   const [strength, setStrength] = useState(null);
//   const showStrength = name === "password";
//   const hasError = !!(error || backendError);
//   const errorMessage = error || backendError;
//   const showValid = !hasError && value?.trim() !== "";

//   useEffect(() => {
//     const handler = setTimeout(() => {
//       if (showStrength && value) {
//         const result = getZxcvbnStrength(value, userInputs);
//         setStrength(result);
//         onStrengthChange(result);
//       } else {
//         setStrength(null);
//         onStrengthChange(null);
//       }
//     }, 200);

//     return () => clearTimeout(handler);
//   }, [value, showStrength, userInputs]);

//   return (
//     <div className={classNames("mb-6", className)}>
//       {label && (
//         <label
//           htmlFor={name}
//           className="form-label block text-sm font-medium text-gray-700 mb-1"
//         >
//           {label}
//           {required && <span className="text-red-500 ml-1">*</span>}
//         </label>
//       )}

//       <div className="relative">
//         <input
//           id={name}
//           name={name}
//           type={showPassword ? "text" : "password"}
//           value={value}
//           onChange={onChange}
//           onBlur={onBlur}
//           required={required}
//           autoComplete={autoComplete}
//           placeholder={placeholder}
//           aria-invalid={hasError}
//           aria-describedby={hasError ? `${name}-error` : undefined}
//           className={classNames(
//             "input-style pr-10",
//             hasError &&
//               "border-red-500 ring-red-500 focus:ring-red-500 focus:border-red-500",
//             inputClassName
//           )}
//         />

//         {showToggle && (
//           <button
//             type="button"
//             onClick={() => setShowPassword?.((prev) => !prev)}
//             className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-700"
//             aria-label={showPassword ? "Hide password" : "Show password"}
//           >
//             {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
//           </button>
//         )}

//         {showValid && (
//           <CheckCircle
//             className="absolute right-10 top-2.5 text-green-500"
//             size={20}
//             aria-hidden="true"
//           />
//         )}
//       </div>

//       {showStrength && strength && (
//         <div id={`${name}-strength`} className="mt-2 space-y-1">
//           <div className="w-full h-2 bg-gray-200 rounded overflow-hidden">
//             <div
//               className={classNames(
//                 "h-full transition-all duration-300",
//                 strength.color
//               )}
//               style={{ width: `${((strength.score + 1) / 5) * 100}%` }}
//             />
//           </div>
//           <p
//             className={classNames(
//               "text-xs font-medium flex items-center gap-1",
//               strength.color.replace("bg", "text")
//             )}
//           >
//             Strength: {strength.emoji} {strength.label}
//             <span className="ml-2 text-gray-500">
//               ({strength.crackTime} to crack)
//             </span>
//           </p>
//           {strength.score < 3 && strength.suggestions?.length > 0 && (
//             <ul className="text-xs text-gray-600 list-disc list-inside">
//               {strength.suggestions.map((msg, idx) => (
//                 <li key={idx}>{msg}</li>
//               ))}
//             </ul>
//           )}
//         </div>
//       )}

//       {hasError && (
//         <p
//           id={`${name}-error`}
//           className="text-sm text-red-600 mt-1"
//           role="alert"
//         >
//           {errorMessage}
//         </p>
//       )}
//     </div>
//   );
// }

module.exports = {

"[project]/acadevault-client/src/utils/formValidation.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
/**
 * Validates an email string.
 * @param {string} email - The email address to validate.
 * @returns {string | null} - Returns an error message if invalid, otherwise null.
 */ __turbopack_context__.s({
    "validateConfirmPassword": (()=>validateConfirmPassword),
    "validateEmail": (()=>validateEmail),
    "validateName": (()=>validateName),
    "validatePassword": (()=>validatePassword)
});
const validateEmail = (email)=>{
    // Check if the email is empty or only whitespace
    if (!email.trim()) return "Email is required.";
    // Regular expression to match valid email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // Return null if valid, otherwise return error message
    return emailRegex.test(email) ? null : "Invalid email address.";
};
const validatePassword = (password, { allowEmpty = false } = {})=>{
    // List of commonly used weak passwords to reject
    const commonPasswords = [
        "123456",
        "password",
        "123456789",
        "12345678",
        "12345",
        "111111",
        "123123",
        "qwerty",
        "abc123",
        "password1"
    ];
    // Allow empty password if explicitly permitted
    if (!password) {
        return allowEmpty ? null : "Password is required.";
    }
    // Reject passwords shorter than 8 characters
    if (password.length < 8) {
        return "Password must be at least 8 characters.";
    }
    // Must include at least one uppercase letter
    if (!/[A-Z]/.test(password)) {
        return "Password must contain at least one uppercase letter.";
    }
    // Must include at least one lowercase letter
    if (!/[a-z]/.test(password)) {
        return "Password must contain at least one lowercase letter.";
    }
    // Must include at least one number
    if (!/\d/.test(password)) {
        return "Password must contain at least one number.";
    }
    // Must include at least one special character
    if (!/[!@#$%^&*(),.?":{}|<>_\-\\[\];'/+=~`]/.test(password)) {
        return "Password must contain at least one special character.";
    }
    // Reject commonly used weak passwords
    if (commonPasswords.includes(password.toLowerCase())) {
        return "This password is too common. Please choose a more secure one.";
    }
    // All validations passed
    return null;
};
const validateConfirmPassword = (password, confirmPassword)=>{
    // Check if confirmation field is empty
    if (!confirmPassword) return "Please confirm your password.";
    // Return error if passwords do not match
    return password === confirmPassword ? null : "Passwords do not match.";
};
const validateName = (name)=>{
    // Ensure name is not empty or whitespace
    return name.trim() ? null : "Full name is required.";
};
}}),
"[project]/acadevault-client/src/utils/cn.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "cn": (()=>cn)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$clsx$40$2$2e$1$2e$1$2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/clsx@2.1.1/node_modules/clsx/dist/clsx.mjs [app-ssr] (ecmascript)");
;
function cn(...inputs) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$clsx$40$2$2e$1$2e$1$2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["clsx"])(...inputs);
}
}}),
"[project]/acadevault-client/src/components/forms/fields/InputField.jsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
// File: components/forms/InputField.jsx
__turbopack_context__.s({
    "InputField": (()=>InputField)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.3.2_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.3.2_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$35$2e$0_$40$emot_e48b854992a4fef57027c30f397dbbaf$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/framer-motion@12.35.0_@emot_e48b854992a4fef57027c30f397dbbaf/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$35$2e$0_$40$emot_e48b854992a4fef57027c30f397dbbaf$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/framer-motion@12.35.0_@emot_e48b854992a4fef57027c30f397dbbaf/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/prop-types@15.8.1/node_modules/prop-types/index.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$utils$2f$cn$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/acadevault-client/src/utils/cn.js [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
const InputField = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRef"])(({ label, name, type = "text", autoComplete, placeholder = "", required = false, autoFocus = false, showHint = false, hintText = "This field is required.", error = "", backendError = "", ...rest }, ref)=>{
    const hasError = Boolean(error || backendError);
    const errorMessage = error || backendError;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "mb-4",
        children: [
            label && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                htmlFor: name,
                className: "block text-sm font-medium text-gray-700 mb-1",
                children: [
                    label,
                    required && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-red-500 ml-1",
                        children: "*"
                    }, void 0, false, {
                        fileName: "[project]/acadevault-client/src/components/forms/fields/InputField.jsx",
                        lineNumber: 63,
                        columnNumber: 26
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/acadevault-client/src/components/forms/fields/InputField.jsx",
                lineNumber: 58,
                columnNumber: 11
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                id: name,
                name: name,
                type: type,
                autoComplete: autoComplete,
                placeholder: placeholder,
                required: required,
                autoFocus: autoFocus,
                "aria-invalid": hasError,
                "aria-describedby": hasError ? `${name}-error` : undefined,
                ref: ref,
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$utils$2f$cn$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("w-full px-3 py-2 border rounded-md shadow-sm text-sm transition", "focus:outline-none focus:ring-2 text-gray-800", hasError ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500", // optionally gray-out input when disabled (if passed via rest)
                rest.disabled && "bg-gray-100 cursor-not-allowed"),
                ...rest
            }, void 0, false, {
                fileName: "[project]/acadevault-client/src/components/forms/fields/InputField.jsx",
                lineNumber: 67,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$35$2e$0_$40$emot_e48b854992a4fef57027c30f397dbbaf$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                children: hasError ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$35$2e$0_$40$emot_e48b854992a4fef57027c30f397dbbaf$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].p, {
                    id: `${name}-error`,
                    className: "mt-1 text-sm text-red-600 font-medium",
                    initial: {
                        opacity: 0,
                        y: -4
                    },
                    animate: {
                        opacity: 1,
                        y: 0
                    },
                    exit: {
                        opacity: 0,
                        y: -4
                    },
                    children: errorMessage
                }, void 0, false, {
                    fileName: "[project]/acadevault-client/src/components/forms/fields/InputField.jsx",
                    lineNumber: 92,
                    columnNumber: 13
                }, this) : showHint && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$35$2e$0_$40$emot_e48b854992a4fef57027c30f397dbbaf$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].p, {
                    className: "mt-1 text-sm text-gray-400",
                    initial: {
                        opacity: 0,
                        y: -4
                    },
                    animate: {
                        opacity: 1,
                        y: 0
                    },
                    exit: {
                        opacity: 0,
                        y: -4
                    },
                    children: hintText
                }, void 0, false, {
                    fileName: "[project]/acadevault-client/src/components/forms/fields/InputField.jsx",
                    lineNumber: 103,
                    columnNumber: 15
                }, this)
            }, void 0, false, {
                fileName: "[project]/acadevault-client/src/components/forms/fields/InputField.jsx",
                lineNumber: 90,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/acadevault-client/src/components/forms/fields/InputField.jsx",
        lineNumber: 56,
        columnNumber: 7
    }, this);
});
InputField.displayName = "InputField";
InputField.propTypes = {
    label: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].string,
    name: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].string.isRequired,
    type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].string,
    autoComplete: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].string,
    placeholder: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].string,
    required: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].bool,
    autoFocus: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].bool,
    showHint: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].bool,
    hintText: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].string,
    error: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].string,
    backendError: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].string
}; // import cn from "cn";
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
}}),
"[project]/acadevault-client/src/components/forms/fields/PasswordField.jsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "PasswordField": (()=>PasswordField)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.3.2_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.3.2_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$511$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eye$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Eye$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/lucide-react@0.511.0_react@19.2.4/node_modules/lucide-react/dist/esm/icons/eye.js [app-ssr] (ecmascript) <export default as Eye>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$511$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eye$2d$off$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__EyeOff$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/lucide-react@0.511.0_react@19.2.4/node_modules/lucide-react/dist/esm/icons/eye-off.js [app-ssr] (ecmascript) <export default as EyeOff>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$511$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/lucide-react@0.511.0_react@19.2.4/node_modules/lucide-react/dist/esm/icons/circle-check-big.js [app-ssr] (ecmascript) <export default as CheckCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$classnames$40$2$2e$5$2e$1$2f$node_modules$2f$classnames$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/classnames@2.5.1/node_modules/classnames/index.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zxcvbn$40$4$2e$4$2e$2$2f$node_modules$2f$zxcvbn$2f$lib$2f$main$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/zxcvbn@4.4.2/node_modules/zxcvbn/lib/main.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$2d$hook$2d$form$40$7$2e$71$2e$2_react$40$19$2e$2$2e$4$2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/react-hook-form@7.71.2_react@19.2.4/node_modules/react-hook-form/dist/index.esm.mjs [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
;
const levels = [
    {
        label: "Very Weak",
        color: "bg-red-500",
        emoji: "🟥"
    },
    {
        label: "Weak",
        color: "bg-orange-500",
        emoji: "🟧"
    },
    {
        label: "Fair",
        color: "bg-yellow-400",
        emoji: "🟨"
    },
    {
        label: "Good",
        color: "bg-blue-500",
        emoji: "🟦"
    },
    {
        label: "Strong",
        color: "bg-green-600",
        emoji: "🟩"
    }
];
const getZxcvbnStrength = (password, userInputs = [])=>{
    if (!password) return null;
    const result = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zxcvbn$40$4$2e$4$2e$2$2f$node_modules$2f$zxcvbn$2f$lib$2f$main$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])(password, userInputs);
    const { score, feedback, crack_times_display } = result;
    return {
        score,
        label: levels[score].label,
        color: levels[score].color,
        emoji: levels[score].emoji,
        suggestions: feedback.suggestions,
        crackTime: crack_times_display.offline_fast_hashing_1e10_per_second
    };
};
function PasswordField({ name, label = "Password", control = null, required = true, backendError = "", placeholder = "", autoComplete = "new-password", showPassword, setShowPassword, showToggle = true, className = "", inputClassName = "", userInputs = [], onStrengthChange = ()=>{}, value: propValue, onChange: propOnChange, onBlur: propOnBlur, error: externalError }) {
    // If control is provided, use react-hook-form
    const hookForm = !!control;
    const { field: { value, onChange, onBlur, ref } = {}, fieldState: { error } = {} } = hookForm ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$2d$hook$2d$form$40$7$2e$71$2e$2_react$40$19$2e$2$2e$4$2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useController"])({
        name,
        control,
        defaultValue: ""
    }) : {};
    const inputValue = hookForm ? value : propValue;
    const inputOnChange = hookForm ? onChange : propOnChange;
    const inputOnBlur = hookForm ? onBlur : propOnBlur;
    const [strength, setStrength] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const showStrength = name === "password";
    const hasError = !!(error || backendError || externalError);
    const errorMessage = error?.message || backendError || externalError;
    const showValid = !hasError && inputValue?.trim()?.length > 0;
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const handler = setTimeout(()=>{
            if (showStrength && inputValue) {
                const result = getZxcvbnStrength(inputValue, userInputs);
                setStrength(result);
                onStrengthChange(result);
            } else {
                setStrength(null);
                onStrengthChange(null);
            }
        }, 200);
        return ()=>clearTimeout(handler);
    }, [
        inputValue,
        showStrength,
        userInputs
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$classnames$40$2$2e$5$2e$1$2f$node_modules$2f$classnames$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])("mb-6", className),
        children: [
            label && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                htmlFor: name,
                className: "form-label block text-sm font-medium text-gray-700 mb-1",
                children: [
                    label,
                    required && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-red-500 ml-1",
                        children: "*"
                    }, void 0, false, {
                        fileName: "[project]/acadevault-client/src/components/forms/fields/PasswordField.jsx",
                        lineNumber: 99,
                        columnNumber: 24
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/acadevault-client/src/components/forms/fields/PasswordField.jsx",
                lineNumber: 94,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        id: name,
                        name: name,
                        ref: ref,
                        type: showPassword ? "text" : "password",
                        value: inputValue,
                        onChange: inputOnChange,
                        onBlur: inputOnBlur,
                        required: required,
                        autoComplete: autoComplete,
                        placeholder: placeholder,
                        "aria-invalid": hasError,
                        "aria-describedby": hasError ? `${name}-error` : undefined,
                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$classnames$40$2$2e$5$2e$1$2f$node_modules$2f$classnames$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])("input-style pr-10", hasError && "border-red-500 ring-red-500 focus:ring-red-500 focus:border-red-500", inputClassName)
                    }, void 0, false, {
                        fileName: "[project]/acadevault-client/src/components/forms/fields/PasswordField.jsx",
                        lineNumber: 104,
                        columnNumber: 9
                    }, this),
                    showToggle && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: ()=>setShowPassword?.((prev)=>!prev),
                        className: "absolute right-3 top-2.5 text-gray-500 hover:text-gray-700",
                        "aria-label": showPassword ? "Hide password" : "Show password",
                        children: showPassword ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$511$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eye$2d$off$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__EyeOff$3e$__["EyeOff"], {
                            size: 20
                        }, void 0, false, {
                            fileName: "[project]/acadevault-client/src/components/forms/fields/PasswordField.jsx",
                            lineNumber: 132,
                            columnNumber: 29
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$511$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eye$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Eye$3e$__["Eye"], {
                            size: 20
                        }, void 0, false, {
                            fileName: "[project]/acadevault-client/src/components/forms/fields/PasswordField.jsx",
                            lineNumber: 132,
                            columnNumber: 52
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/acadevault-client/src/components/forms/fields/PasswordField.jsx",
                        lineNumber: 126,
                        columnNumber: 11
                    }, this),
                    showValid && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$511$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__["CheckCircle"], {
                        className: "absolute right-10 top-2.5 text-green-500",
                        size: 20,
                        "aria-hidden": "true"
                    }, void 0, false, {
                        fileName: "[project]/acadevault-client/src/components/forms/fields/PasswordField.jsx",
                        lineNumber: 137,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/acadevault-client/src/components/forms/fields/PasswordField.jsx",
                lineNumber: 103,
                columnNumber: 7
            }, this),
            showStrength && strength && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                id: `${name}-strength`,
                className: "mt-2 space-y-1",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "w-full h-2 bg-gray-200 rounded overflow-hidden",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$classnames$40$2$2e$5$2e$1$2f$node_modules$2f$classnames$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])("h-full transition-all duration-300", strength.color),
                            style: {
                                width: `${(strength.score + 1) / 5 * 100}%`
                            }
                        }, void 0, false, {
                            fileName: "[project]/acadevault-client/src/components/forms/fields/PasswordField.jsx",
                            lineNumber: 148,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/acadevault-client/src/components/forms/fields/PasswordField.jsx",
                        lineNumber: 147,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$classnames$40$2$2e$5$2e$1$2f$node_modules$2f$classnames$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])("text-xs font-medium flex items-center gap-1", strength.color.replace("bg", "text")),
                        children: [
                            "Strength: ",
                            strength.emoji,
                            " ",
                            strength.label,
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "ml-2 text-gray-500",
                                children: [
                                    "(",
                                    strength.crackTime,
                                    " to crack)"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/acadevault-client/src/components/forms/fields/PasswordField.jsx",
                                lineNumber: 163,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/acadevault-client/src/components/forms/fields/PasswordField.jsx",
                        lineNumber: 156,
                        columnNumber: 11
                    }, this),
                    strength.score < 3 && strength.suggestions?.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                        className: "text-xs text-gray-600 list-disc list-inside",
                        children: strength.suggestions.map((msg, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                children: msg
                            }, idx, false, {
                                fileName: "[project]/acadevault-client/src/components/forms/fields/PasswordField.jsx",
                                lineNumber: 170,
                                columnNumber: 17
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/acadevault-client/src/components/forms/fields/PasswordField.jsx",
                        lineNumber: 168,
                        columnNumber: 13
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/acadevault-client/src/components/forms/fields/PasswordField.jsx",
                lineNumber: 146,
                columnNumber: 9
            }, this),
            hasError && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                id: `${name}-error`,
                className: "text-sm text-red-600 mt-1",
                role: "alert",
                children: errorMessage
            }, void 0, false, {
                fileName: "[project]/acadevault-client/src/components/forms/fields/PasswordField.jsx",
                lineNumber: 178,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/acadevault-client/src/components/forms/fields/PasswordField.jsx",
        lineNumber: 92,
        columnNumber: 5
    }, this);
} // "use client";
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
}}),
"[project]/acadevault-client/src/components/ui/AlertBox.jsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "AlertBox": (()=>AlertBox)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.3.2_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.3.2_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$35$2e$0_$40$emot_e48b854992a4fef57027c30f397dbbaf$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/framer-motion@12.35.0_@emot_e48b854992a4fef57027c30f397dbbaf/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$35$2e$0_$40$emot_e48b854992a4fef57027c30f397dbbaf$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/framer-motion@12.35.0_@emot_e48b854992a4fef57027c30f397dbbaf/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$511$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/lucide-react@0.511.0_react@19.2.4/node_modules/lucide-react/dist/esm/icons/circle-check-big.js [app-ssr] (ecmascript) <export default as CheckCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$511$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__XCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/lucide-react@0.511.0_react@19.2.4/node_modules/lucide-react/dist/esm/icons/circle-x.js [app-ssr] (ecmascript) <export default as XCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$511$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/lucide-react@0.511.0_react@19.2.4/node_modules/lucide-react/dist/esm/icons/triangle-alert.js [app-ssr] (ecmascript) <export default as AlertTriangle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$511$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$info$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Info$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/lucide-react@0.511.0_react@19.2.4/node_modules/lucide-react/dist/esm/icons/info.js [app-ssr] (ecmascript) <export default as Info>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$511$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/lucide-react@0.511.0_react@19.2.4/node_modules/lucide-react/dist/esm/icons/x.js [app-ssr] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$511$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$rotate$2d$ccw$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__RotateCcw$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/lucide-react@0.511.0_react@19.2.4/node_modules/lucide-react/dist/esm/icons/rotate-ccw.js [app-ssr] (ecmascript) <export default as RotateCcw>");
var __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$utils$2f$cn$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/acadevault-client/src/utils/cn.js [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
/** Mapping variant → icon + base styles */ const VARIANT_CONFIG = {
    success: {
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$511$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__["CheckCircle"], {
            className: "h-5 w-5 text-green-600",
            "aria-hidden": "true"
        }, void 0, false, {
            fileName: "[project]/acadevault-client/src/components/ui/AlertBox.jsx",
            lineNumber: 18,
            columnNumber: 11
        }, this),
        bg: "bg-green-50",
        border: "border-green-400",
        text: "text-green-800"
    },
    error: {
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$511$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__XCircle$3e$__["XCircle"], {
            className: "h-5 w-5 text-red-600",
            "aria-hidden": "true"
        }, void 0, false, {
            fileName: "[project]/acadevault-client/src/components/ui/AlertBox.jsx",
            lineNumber: 24,
            columnNumber: 11
        }, this),
        bg: "bg-red-50",
        border: "border-red-400",
        text: "text-red-800"
    },
    warning: {
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$511$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__["AlertTriangle"], {
            className: "h-5 w-5 text-yellow-600",
            "aria-hidden": "true"
        }, void 0, false, {
            fileName: "[project]/acadevault-client/src/components/ui/AlertBox.jsx",
            lineNumber: 31,
            columnNumber: 7
        }, this),
        bg: "bg-yellow-50",
        border: "border-yellow-400",
        text: "text-yellow-800"
    },
    info: {
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$511$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$info$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Info$3e$__["Info"], {
            className: "h-5 w-5 text-blue-600",
            "aria-hidden": "true"
        }, void 0, false, {
            fileName: "[project]/acadevault-client/src/components/ui/AlertBox.jsx",
            lineNumber: 38,
            columnNumber: 11
        }, this),
        bg: "bg-blue-50",
        border: "border-blue-400",
        text: "text-blue-800"
    }
};
function AlertBox({ variant = "info", title, children, autoDismiss = false, duration = 5000, dismissible = true, onDismiss, onRetry, retryText = "Retry", compact = false, centered = false, className = "" }) {
    const [visible, setVisible] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    const config = VARIANT_CONFIG[variant];
    // Auto-dismiss effect
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!autoDismiss) return;
        const timer = setTimeout(()=>{
            setVisible(false);
            onDismiss?.();
        }, duration);
        return ()=>clearTimeout(timer);
    }, [
        autoDismiss,
        duration,
        onDismiss
    ]);
    // If not visible, unmount
    if (!visible) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$35$2e$0_$40$emot_e48b854992a4fef57027c30f397dbbaf$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AnimatePresence"], {
        children: visible && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$35$2e$0_$40$emot_e48b854992a4fef57027c30f397dbbaf$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
            role: "alert",
            initial: {
                opacity: 0,
                y: 10
            },
            animate: {
                opacity: 1,
                y: 0
            },
            exit: {
                opacity: 0,
                y: -10
            },
            transition: {
                duration: 0.2
            },
            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$utils$2f$cn$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("relative flex items-start gap-3 rounded-md border p-4 shadow-sm", config.bg, config.border, config.text, centered && "justify-center text-center", compact && "p-2 text-sm", className),
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$utils$2f$cn$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("flex-shrink-0", centered && "mx-auto"),
                    children: config.icon
                }, void 0, false, {
                    fileName: "[project]/acadevault-client/src/components/ui/AlertBox.jsx",
                    lineNumber: 107,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex-1",
                    children: [
                        title && !compact && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                            className: "font-semibold",
                            children: title
                        }, void 0, false, {
                            fileName: "[project]/acadevault-client/src/components/ui/AlertBox.jsx",
                            lineNumber: 113,
                            columnNumber: 35
                        }, this),
                        children ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: compact ? "mt-1" : "mt-2",
                            children: children
                        }, void 0, false, {
                            fileName: "[project]/acadevault-client/src/components/ui/AlertBox.jsx",
                            lineNumber: 115,
                            columnNumber: 15
                        }, this) : null,
                        onRetry && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            onClick: onRetry,
                            className: "mt-2 inline-flex items-center text-sm font-medium hover:underline focus:outline-none focus:ring-2 focus:ring-offset-2 rounded",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$511$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$rotate$2d$ccw$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__RotateCcw$3e$__["RotateCcw"], {
                                    className: "w-4 h-4 mr-1",
                                    "aria-hidden": "true"
                                }, void 0, false, {
                                    fileName: "[project]/acadevault-client/src/components/ui/AlertBox.jsx",
                                    lineNumber: 125,
                                    columnNumber: 17
                                }, this),
                                retryText
                            ]
                        }, void 0, true, {
                            fileName: "[project]/acadevault-client/src/components/ui/AlertBox.jsx",
                            lineNumber: 120,
                            columnNumber: 15
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/acadevault-client/src/components/ui/AlertBox.jsx",
                    lineNumber: 112,
                    columnNumber: 11
                }, this),
                dismissible && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    type: "button",
                    "aria-label": "Dismiss alert",
                    onClick: ()=>{
                        setVisible(false);
                        onDismiss?.();
                    },
                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$utils$2f$cn$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("absolute top-2 right-2 inline-flex p-1 rounded focus:outline-none focus:ring-2 focus:ring-offset-2", config.text, config.bg.replace("-50", "-100")),
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$511$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                        className: "w-4 h-4",
                        "aria-hidden": "true"
                    }, void 0, false, {
                        fileName: "[project]/acadevault-client/src/components/ui/AlertBox.jsx",
                        lineNumber: 146,
                        columnNumber: 15
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/acadevault-client/src/components/ui/AlertBox.jsx",
                    lineNumber: 133,
                    columnNumber: 13
                }, this)
            ]
        }, "alert", true, {
            fileName: "[project]/acadevault-client/src/components/ui/AlertBox.jsx",
            lineNumber: 89,
            columnNumber: 9
        }, this)
    }, void 0, false, {
        fileName: "[project]/acadevault-client/src/components/ui/AlertBox.jsx",
        lineNumber: 87,
        columnNumber: 5
    }, this);
} // "use client";
 // import { useEffect, useState } from "react";
 // import { motion, AnimatePresence } from "framer-motion";
 // import {
 //   CheckCircle,
 //   XCircle,
 //   Info,
 //   AlertTriangle,
 //   AlertCircle,
 //   RotateCcw,
 //   X,
 // } from "lucide-react";
 // import cn from "cn";
 // const STATUS_CONFIG = {
 //   success: {
 //     icon: <CheckCircle className="h-5 w-5 text-green-600" />,
 //     bg: "bg-green-100",
 //     text: "text-green-800",
 //     border: "border-green-200",
 //   },
 //   error: {
 //     icon: <XCircle className="h-5 w-5 text-red-600" />,
 //     bg: "bg-red-50",
 //     text: "text-red-800",
 //     border: "border-red-200",
 //   },
 //   warning: {
 //     icon: <AlertTriangle className="h-5 w-5 text-yellow-600" />,
 //     bg: "bg-yellow-50",
 //     text: "text-yellow-800",
 //     border: "border-yellow-200",
 //   },
 //   info: {
 //     icon: <Info className="h-5 w-5 text-blue-600" />,
 //     bg: "bg-blue-50",
 //     text: "text-blue-800",
 //     border: "border-blue-200",
 //   },
 // };
 // export default function AlertBox({
 //   status = "info", // "success" | "error" | "warning" | "info"
 //   title, // Optional
 //   message = "Something happened.",
 //   autoDismiss = false,
 //   duration = 3000,
 //   onDismiss,
 //   onRetry,
 //   showRetry = false,
 //   showDismiss = true,
 //   compact = false,
 //   center = false,
 //   className = "",
 // }) {
 //   const [visible, setVisible] = useState(true);
 //   const config = STATUS_CONFIG[status] || STATUS_CONFIG.info;
 //   useEffect(() => {
 //     if (autoDismiss) {
 //       const timeout = setTimeout(() => {
 //         setVisible(false);
 //         onDismiss?.();
 //       }, duration);
 //       return () => clearTimeout(timeout);
 //     }
 //   }, [autoDismiss, duration, onDismiss]);
 //   if (!visible) return null;
 //   return (
 //     <AnimatePresence>
 //       {visible && (
 //         <motion.div
 //           key="alert"
 //           initial={{ opacity: 0, y: 10 }}
 //           animate={{ opacity: 1, y: 0 }}
 //           exit={{ opacity: 0, y: -10 }}
 //           transition={{ duration: 0.25 }}
 //           role="alert"
 //           className={cn(
 //             "relative flex items-start gap-3 rounded-md border p-4 shadow-sm",
 //             config.bg,
 //             config.text,
 //             config.border,
 //             center && "justify-center text-center",
 //             compact && "p-2 text-sm",
 //             className
 //           )}
 //         >
 //           <div className="shrink-0 mt-1">{config.icon}</div>
 //           <div className="flex-1">
 //             {!compact && title && <div className="font-semibold">{title}</div>}
 //             <div>{message}</div>
 //             {showRetry && onRetry && (
 //               <button
 //                 onClick={onRetry}
 //                 className="mt-2 inline-flex items-center text-sm font-medium hover:underline"
 //               >
 //                 <RotateCcw className="w-4 h-4 mr-1" />
 //                 Retry
 //               </button>
 //             )}
 //           </div>
 //           {showDismiss && (
 //             <button
 //               onClick={() => {
 //                 setVisible(false);
 //                 onDismiss?.();
 //               }}
 //               className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 transition"
 //               aria-label="Dismiss alert"
 //             >
 //               <X className="w-4 h-4" />
 //             </button>
 //           )}
 //         </motion.div>
 //       )}
 //     </AnimatePresence>
 //   );
 // }
}}),
"[project]/acadevault-client/src/components/ui/Button.jsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "Button": (()=>Button)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.3.2_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.3.2_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$classnames$40$2$2e$5$2e$1$2f$node_modules$2f$classnames$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/classnames@2.5.1/node_modules/classnames/index.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.3.2_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
;
;
;
;
// Spinner for loading state
const Spinner = ({ size = "md", className = "" })=>{
    const sizeClasses = {
        xs: "w-4 h-4 border-2",
        sm: "w-5 h-5 border-2",
        md: "w-6 h-6 border-3",
        lg: "w-8 h-8 border-4",
        xl: "w-10 h-10 border-4"
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$classnames$40$2$2e$5$2e$1$2f$node_modules$2f$classnames$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])("border-t-transparent border-solid border-white rounded-full animate-spin", sizeClasses[size] || sizeClasses.md, className),
        role: "status"
    }, void 0, false, {
        fileName: "[project]/acadevault-client/src/components/ui/Button.jsx",
        lineNumber: 16,
        columnNumber: 5
    }, this);
};
const Button = ({ as = "button", href = "", target, rel, variant = "default", size = "md", className, children, isLoading = false, disabled = false, loadingText = "Loading...", ...props })=>{
    const baseClasses = "px-6 py-2 rounded-lg font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 inline-flex items-center justify-center";
    const variantClasses = {
        default: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500 disabled:bg-blue-400",
        outline: "border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white focus:ring-blue-500 disabled:border-gray-400 disabled:text-gray-400",
        ghost: "text-blue-600 hover:bg-blue-100 focus:ring-blue-500 disabled:text-gray-400",
        danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 disabled:bg-red-400",
        success: "bg-green-600 text-white hover:bg-green-700 focus:ring-green-500 disabled:bg-green-400",
        gradient: "bg-gradient-to-tr from-orange-500 to-orange-700 text-white hover:from-orange-600 hover:to-orange-800 focus:ring-orange-500 disabled:from-orange-300 disabled:to-orange-400 cursor-pointer"
    };
    const sizeClasses = {
        xs: "text-xs px-3 py-1",
        sm: "text-sm px-4 py-2",
        md: "text-base px-6 py-3",
        lg: "text-lg px-8 py-4",
        xl: "text-xl px-10 py-5"
    };
    const buttonClasses = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$classnames$40$2$2e$5$2e$1$2f$node_modules$2f$classnames$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])(baseClasses, variantClasses[variant] || variantClasses.default, sizeClasses[size] || sizeClasses.md, className, {
        "opacity-50 cursor-not-allowed": disabled || isLoading
    });
    const content = isLoading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        className: "flex items-center",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Spinner, {
                size: "sm"
            }, void 0, false, {
                fileName: "[project]/acadevault-client/src/components/ui/Button.jsx",
                lineNumber: 77,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "ml-2",
                children: loadingText
            }, void 0, false, {
                fileName: "[project]/acadevault-client/src/components/ui/Button.jsx",
                lineNumber: 78,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/acadevault-client/src/components/ui/Button.jsx",
        lineNumber: 76,
        columnNumber: 5
    }, this) : children;
    if (as === "a") {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
            href: href,
            target: target,
            rel: rel || (target === "_blank" ? "noopener noreferrer" : undefined),
            className: buttonClasses,
            "aria-disabled": disabled || isLoading,
            ...props,
            children: content
        }, void 0, false, {
            fileName: "[project]/acadevault-client/src/components/ui/Button.jsx",
            lineNumber: 86,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        type: "button",
        className: buttonClasses,
        disabled: disabled || isLoading,
        "aria-live": isLoading ? "assertive" : undefined,
        ...props,
        children: content
    }, void 0, false, {
        fileName: "[project]/acadevault-client/src/components/ui/Button.jsx",
        lineNumber: 100,
        columnNumber: 5
    }, this);
};
}}),
"[project]/acadevault-client/src/components/forms/LoginForm.jsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "LoginForm": (()=>LoginForm)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.3.2_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.3.2_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.3.2_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.3.2_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$hooks$2f$useAuth$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/acadevault-client/src/hooks/useAuth.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$utils$2f$formValidation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/acadevault-client/src/utils/formValidation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$2d$icons$40$5$2e$6$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$react$2d$icons$2f$fa$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/react-icons@5.6.0_react@19.2.4/node_modules/react-icons/fa/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$2d$icons$40$5$2e$6$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$react$2d$icons$2f$fc$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/react-icons@5.6.0_react@19.2.4/node_modules/react-icons/fc/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$2d$toastify$40$11$2e$0$2e$5_react_9ebe529e98bfec05ea8830249a12d73d$2f$node_modules$2f$react$2d$toastify$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/react-toastify@11.0.5_react_9ebe529e98bfec05ea8830249a12d73d/node_modules/react-toastify/dist/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$components$2f$forms$2f$fields$2f$InputField$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/acadevault-client/src/components/forms/fields/InputField.jsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$components$2f$forms$2f$fields$2f$PasswordField$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/acadevault-client/src/components/forms/fields/PasswordField.jsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$components$2f$ui$2f$AlertBox$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/acadevault-client/src/components/ui/AlertBox.jsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$components$2f$ui$2f$Button$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/acadevault-client/src/components/ui/Button.jsx [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
;
;
;
;
;
;
;
;
function LoginForm() {
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const { login, isLoading } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$hooks$2f$useAuth$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useAuth"])();
    const [email, setEmail] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [password, setPassword] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [rememberMe, setRememberMe] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [showPassword, setShowPassword] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [errors, setErrors] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({
        email: null,
        password: null,
        backend: null
    });
    const isFormValid = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        return !(0, __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$utils$2f$formValidation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["validateEmail"])(email) && !(0, __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$utils$2f$formValidation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["validatePassword"])(password);
    }, [
        email,
        password
    ]);
    const handleSubmit = async (e)=>{
        e.preventDefault();
        const emailError = (0, __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$utils$2f$formValidation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["validateEmail"])(email);
        const passwordError = (0, __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$utils$2f$formValidation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["validatePassword"])(password);
        setErrors({
            email: emailError,
            password: passwordError,
            backend: null
        });
        if (emailError || passwordError) return;
        const result = await login({
            email,
            password,
            remember: rememberMe
        });
        if (result.success) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$2d$toastify$40$11$2e$0$2e$5_react_9ebe529e98bfec05ea8830249a12d73d$2f$node_modules$2f$react$2d$toastify$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].success("Logged in successfully!");
            router.push("/dashboard");
        } else {
            const backendMessage = result?.error?.data?.message || "Login failed. Please try again.";
            setErrors((prev)=>({
                    ...prev,
                    backend: backendMessage
                }));
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$2d$toastify$40$11$2e$0$2e$5_react_9ebe529e98bfec05ea8830249a12d73d$2f$node_modules$2f$react$2d$toastify$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].error(backendMessage);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
        onSubmit: handleSubmit,
        noValidate: true,
        className: "space-y-4",
        children: [
            errors.backend && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$components$2f$ui$2f$AlertBox$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AlertBox"], {
                status: "error",
                message: errors.backend,
                autoDismiss: false,
                role: "alert",
                "aria-live": "assertive"
            }, void 0, false, {
                fileName: "[project]/acadevault-client/src/components/forms/LoginForm.jsx",
                lineNumber: 67,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$components$2f$forms$2f$fields$2f$InputField$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["InputField"], {
                label: "Email",
                name: "email",
                id: "email",
                type: "email",
                value: email,
                onChange: (e)=>setEmail(e.target.value),
                placeholder: "you@example.com",
                autoComplete: "email",
                required: true,
                error: errors.email
            }, void 0, false, {
                fileName: "[project]/acadevault-client/src/components/forms/LoginForm.jsx",
                lineNumber: 76,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$components$2f$forms$2f$fields$2f$PasswordField$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PasswordField"], {
                label: "Password",
                name: "password",
                id: "password",
                value: password,
                onChange: (e)=>setPassword(e.target.value),
                placeholder: "Enter your password",
                autoComplete: "current-password",
                required: true,
                error: errors.password,
                showPassword: showPassword,
                setShowPassword: setShowPassword,
                showToggle: true,
                userInputs: [
                    email
                ],
                onStrengthChange: ()=>{}
            }, void 0, false, {
                fileName: "[project]/acadevault-client/src/components/forms/LoginForm.jsx",
                lineNumber: 89,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-between text-sm text-gray-600",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        htmlFor: "rememberMe",
                        className: "flex items-center gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                id: "rememberMe",
                                type: "checkbox",
                                checked: rememberMe,
                                onChange: (e)=>setRememberMe(e.target.checked),
                                className: "accent-blue-600"
                            }, void 0, false, {
                                fileName: "[project]/acadevault-client/src/components/forms/LoginForm.jsx",
                                lineNumber: 108,
                                columnNumber: 11
                            }, this),
                            "Remember me"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/acadevault-client/src/components/forms/LoginForm.jsx",
                        lineNumber: 107,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                        href: "/forgot-password",
                        className: "text-blue-600 hover:underline font-medium",
                        children: "Forgot password?"
                    }, void 0, false, {
                        fileName: "[project]/acadevault-client/src/components/forms/LoginForm.jsx",
                        lineNumber: 118,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/acadevault-client/src/components/forms/LoginForm.jsx",
                lineNumber: 106,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$components$2f$ui$2f$Button$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                type: "submit",
                size: "md",
                isLoading: isLoading,
                disabled: isLoading || !isFormValid,
                loadingText: "Signing in...",
                className: "w-full",
                children: "Sign in"
            }, void 0, false, {
                fileName: "[project]/acadevault-client/src/components/forms/LoginForm.jsx",
                lineNumber: 126,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative mb-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute inset-0 flex items-center",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "w-full border-t border-gray-300"
                        }, void 0, false, {
                            fileName: "[project]/acadevault-client/src/components/forms/LoginForm.jsx",
                            lineNumber: 139,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/acadevault-client/src/components/forms/LoginForm.jsx",
                        lineNumber: 138,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "relative text-center",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "bg-white px-2 text-sm text-gray-500",
                            children: "OR"
                        }, void 0, false, {
                            fileName: "[project]/acadevault-client/src/components/forms/LoginForm.jsx",
                            lineNumber: 142,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/acadevault-client/src/components/forms/LoginForm.jsx",
                        lineNumber: 141,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/acadevault-client/src/components/forms/LoginForm.jsx",
                lineNumber: 137,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-col gap-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$components$2f$ui$2f$Button$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                        as: "a",
                        href: "/auth/google",
                        variant: "outline",
                        className: "w-full gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$2d$icons$40$5$2e$6$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$react$2d$icons$2f$fc$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FcGoogle"], {
                                size: 20
                            }, void 0, false, {
                                fileName: "[project]/acadevault-client/src/components/forms/LoginForm.jsx",
                                lineNumber: 153,
                                columnNumber: 11
                            }, this),
                            "Continue with Google"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/acadevault-client/src/components/forms/LoginForm.jsx",
                        lineNumber: 147,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$components$2f$ui$2f$Button$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                        as: "a",
                        href: "/auth/github",
                        variant: "outline",
                        className: "w-full gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$2d$icons$40$5$2e$6$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$react$2d$icons$2f$fa$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FaGithub"], {
                                size: 20
                            }, void 0, false, {
                                fileName: "[project]/acadevault-client/src/components/forms/LoginForm.jsx",
                                lineNumber: 162,
                                columnNumber: 11
                            }, this),
                            "Continue with GitHub"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/acadevault-client/src/components/forms/LoginForm.jsx",
                        lineNumber: 156,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/acadevault-client/src/components/forms/LoginForm.jsx",
                lineNumber: 146,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/acadevault-client/src/components/forms/LoginForm.jsx",
        lineNumber: 65,
        columnNumber: 5
    }, this);
} // "use client";
 // import Link from "next/link";
 // import { useRouter } from "next/navigation";
 // import { useMemo, useState } from "react";
 // import { useAuth } from "@/hooks/useAuth";
 // import { validateEmail, validatePassword } from "@/utils/formValidation";
 // import InputField from "@/components/form/InputField";
 // import { PasswordField } from "@/components/form/PasswordField";
 // import { Button } from "@/components/ui/Button";
 // import AlertBox from "@/components/ui/AlertBox";
 // import { FaGithub } from "react-icons/fa";
 // import { FcGoogle } from "react-icons/fc";
 // import { toast } from "react-toastify";
 // export function LoginForm() {
 //   const router = useRouter();
 //   const { login, isLoading } = useAuth();
 //   const [email, setEmail] = useState("");
 //   const [password, setPassword] = useState("");
 //   const [rememberMe, setRememberMe] = useState(false);
 //   const [showPassword, setShowPassword] = useState(false);
 //   const [errors, setErrors] = useState({
 //     email: null,
 //     password: null,
 //     backend: null,
 //   });
 //   // 🔒 Validates fields fully and disables button accordingly
 //   const isFormValid = useMemo(() => {
 //     const emailError = validateEmail(email);
 //     const passwordError = validatePassword(password);
 //     return !emailError && !passwordError;
 //   }, [email, password]);
 //   const handleSubmit = async (e) => {
 //     e.preventDefault();
 //     const emailError = validateEmail(email);
 //     const passwordError = validatePassword(password);
 //     setErrors({
 //       email: emailError,
 //       password: passwordError,
 //       backend: null,
 //     });
 //     if (emailError || passwordError) return;
 //     const result = await login({ email, password, remember: rememberMe });
 //     if (result.success) {
 //       toast.success("Logged in successfully!");
 //       router.push("/dashboard");
 //     } else {
 //       const backendMessage = result?.error?.data?.message || "Login failed.";
 //       setErrors((prev) => ({ ...prev, backend: backendMessage }));
 //       toast.error(backendMessage);
 //     }
 //   };
 //   return (
 //     <form onSubmit={handleSubmit} noValidate className="space-y-4">
 //       {errors.backend && (
 //         <AlertBox
 //           status="error"
 //           message={errors.backend}
 //           autoDismiss={false}
 //           role="alert"
 //           aria-live="assertive"
 //         />
 //       )}
 //       <InputField
 //         label="Email"
 //         name="email"
 //         id="email"
 //         type="email"
 //         value={email}
 //         onChange={(e) => setEmail(e.target.value)}
 //         placeholder="you@example.com"
 //         autoComplete="email"
 //         required
 //         error={errors.email}
 //       />
 //       <PasswordField
 //         label="Password"
 //         name="password"
 //         id="password"
 //         value={password}
 //         onChange={(e) => setPassword(e.target.value)}
 //         placeholder="Enter your password"
 //         autoComplete="current-password"
 //         required
 //         error={errors.password}
 //         showPassword={showPassword}
 //         setShowPassword={setShowPassword}
 //         showToggle
 //       />
 //       <div className="flex items-center justify-between text-sm text-gray-600">
 //         <label htmlFor="rememberMe" className="flex items-center gap-2">
 //           <input
 //             id="rememberMe"
 //             type="checkbox"
 //             checked={rememberMe}
 //             onChange={(e) => setRememberMe(e.target.checked)}
 //             className="accent-blue-600"
 //           />
 //           Remember me
 //         </label>
 //         <Link
 //           href="/forgot-password"
 //           className="text-blue-600 hover:underline font-medium"
 //         >
 //           Forgot password?
 //         </Link>
 //       </div>
 //       <Button
 //         type="submit"
 //         size="md"
 //         isLoading={isLoading}
 //         disabled={isLoading || !isFormValid}
 //         loadingText="Signing in..."
 //         className="w-full"
 //       >
 //         Sign in
 //       </Button>
 //       <div className="relative mb-4">
 //         <div className="absolute inset-0 flex items-center">
 //           <div className="w-full border-t border-gray-300" />
 //         </div>
 //         <div className="relative text-center">
 //           <span className="bg-white px-2 text-sm text-gray-500">
 //             OR
 //           </span>
 //         </div>
 //       </div>
 //       <div className="flex flex-col gap-3">
 //         <Button
 //           as="a"
 //           href="/auth/google"
 //           variant="outline"
 //           className="w-full gap-2"
 //         >
 //           <FcGoogle size={20} />
 //           Continue with Google
 //         </Button>
 //         <Button
 //           as="a"
 //           href="/auth/github"
 //           variant="outline"
 //           className="w-full gap-2"
 //         >
 //           <FaGithub size={20} />
 //           Continue with GitHub
 //         </Button>
 //       </div>
 //     </form>
 //   );
 // }
}}),

};

//# sourceMappingURL=acadevault-client_src_50e38863._.js.map
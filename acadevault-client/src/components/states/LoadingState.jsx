import React from "react";
import { Loader2 } from "lucide-react";
import { cn } from "@/utils/cn";

/**
 * A flexible, accessible, production-grade loading state UI component.
 *
 * @param {string} message - Optional message to show under the spinner
 * @param {string} size - 'sm' | 'md' | 'lg' | 'xl' (affects spinner and padding)
 * @param {string} alignment - 'center' | 'left' | 'inline' (controls layout)
 * @param {boolean} overlay - Show a semi-transparent full-screen overlay
 * @param {boolean} withDelay - Apply a delay to reduce flicker (UX polish)
 * @param {string} className - Additional container class names
 * @param {React.ReactNode} customSpinner - Optional spinner override
 */
const LoadingState = ({
  message = "Loading...",
  size = "md",
  alignment = "center",
  overlay = false,
  withDelay = false,
  className = "",
  customSpinner,
}) => {
  const sizeMap = {
    sm: "w-4 h-4 text-sm",
    md: "w-6 h-6 text-base",
    lg: "w-10 h-10 text-lg",
    xl: "w-14 h-14 text-xl",
  };

  const paddingMap = {
    sm: "py-2",
    md: "py-4",
    lg: "py-8",
    xl: "py-12",
  };

  const spinnerSize = sizeMap[size] || sizeMap.md;
  const padding = paddingMap[size] || paddingMap.md;

  const layout = cn(
    alignment === "inline"
      ? "inline-flex items-center gap-2"
      : "flex flex-col items-center justify-center text-center gap-3",
    padding
  );

  const spinner = customSpinner || (
    <Loader2 className={cn("animate-spin text-blue-500", spinnerSize)} />
  );

  const delayedClass = withDelay ? "opacity-0 animate-fade-in delay-200" : "";

  const content = (
    <div
      role="status"
      aria-live="polite"
      className={cn(layout, "text-gray-500", delayedClass, className)}
    >
      {spinner}
      {alignment !== "inline" && (
        <p className="text-sm font-medium opacity-80">{message}</p>
      )}
    </div>
  );

  if (overlay) {
    return (
      <div className="fixed inset-0 bg-white/60 z-50 flex items-center justify-center">
        {content}
      </div>
    );
  }

  return content;
};

export default LoadingState;

// 📦 Example Use Cases
// Full Page Load with Overlay
// <LoadingState overlay size="lg" message="Fetching your dashboard..." />

// Section Load with Message
// <LoadingState size="sm" message="Loading reviews..." />

// Button Inline Spinner
// <button className="relative px-4 py-2 bg-indigo-600 text-white rounded disabled:opacity-50" disabled>
//   <LoadingState alignment="inline" size="sm" message="Submitting..." />
// </button>

// Custom Skeleton Spinner
// <LoadingState
//   message="Preparing interface..."
//   size="lg"
//   customSpinner={
//     <div className="w-10 h-10 rounded-full bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse" />
//   }
// />

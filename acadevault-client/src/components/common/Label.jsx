"use client";

import { forwardRef } from "react";
import { cn } from "@/utils/cn";

/**
 * Label component for form inputs.
 * @param {Object} props - Component props
 * @param {string} props.htmlFor - Associated input ID
 * @param {string} [props.className] - Additional CSS classes
 * @param {boolean} [props.error=false] - Indicates error state
 * @param {React.ReactNode} props.children - Label content
 */
const Label = forwardRef(
  ({ htmlFor, className, error = false, children, ...props }, ref) => {
    return (
      <label
        htmlFor={htmlFor}
        className={cn(
          "text-sm font-medium",
          error ? "text-red-600" : "text-gray-700",
          className
        )}
        ref={ref}
        {...props}
      >
        {children}
      </label>
    );
  }
);

Label.displayName = "Label";

export { Label };

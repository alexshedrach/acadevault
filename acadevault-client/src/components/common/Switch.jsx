"use client";

import { forwardRef } from "react";
import { motion } from "framer-motion";
import { cn } from "@/utils/cn";

/**
 * Switch component for toggling between two states.
 * @param {Object} props - Component props
 * @param {string} props.id - Unique identifier for the switch
 * @param {boolean} props.checked - Whether the switch is checked
 * @param {Function} props.onCheckedChange - Callback for state changes
 * @param {boolean} [props.disabled=false] - Whether the switch is disabled
 * @param {string} [props.className] - Additional CSS classes
 * @param {string} [props.aria-label] - Accessibility label
 */
const Switch = forwardRef(
  (
    {
      id,
      checked,
      onCheckedChange,
      disabled = false,
      className,
      "aria-label": ariaLabel,
      ...props
    },
    ref
  ) => {
    const handleChange = () => {
      if (!disabled) {
        onCheckedChange(!checked);
      }
    };

    return (
      <motion.button
        id={id}
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={ariaLabel || "Toggle switch"}
        disabled={disabled}
        onClick={handleChange}
        className={cn(
          "relative inline-flex h-6 w-11 items-center rounded-full border border-gray-300 transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2",
          disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer",
          checked ? "bg-orange-500" : "bg-gray-200",
          className
        )}
        whileTap={{ scale: disabled ? 1 : 0.95 }}
        {...props}
        ref={ref}
      >
        <motion.span
          className="inline-block h-4 w-4 transform rounded-full bg-white shadow-sm transition-transform"
          animate={{ x: checked ? 20 : 2 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        />
      </motion.button>
    );
  }
);

Switch.displayName = "Switch";

export { Switch };

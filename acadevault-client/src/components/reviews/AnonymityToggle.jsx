"use client";

import React from "react";
import { Switch } from "@headlessui/react";
import { cn } from "@/utils/cn";

/**
 * AnonymityToggle
 *
 * A binary Switch control for posting anonymously:
 * - Uses Headless UI Switch for robust a11y & keyboard support
 * - Fully controlled via `enabled` + `onChange`
 * - Customizable labels, disabled state, and styling via `cn`
 * - ARIA attributes tie the switch to its label & description
 */
const AnonymityToggle = ({
  enabled,
  onChange,
  disabled = false,
  id = "anonymous-toggle",
  labels = {
    on: "Your name will be hidden",
    off: "Your name will be visible",
  },
}) => {
  return (
    <div className="flex items-center justify-between gap-4 py-2">
      {/* Label and description */}
      <div>
        <label
          htmlFor={id}
          className={cn(
            "block text-sm font-medium",
            disabled ? "text-gray-400" : "text-gray-800"
          )}
        >
          Post Anonymously
        </label>
        <p
          id={`${id}-desc`}
          className={cn(
            "mt-1 text-xs",
            enabled ? "text-gray-600" : "text-gray-500",
            disabled && "text-gray-400"
          )}
        >
          {enabled ? labels.on : labels.off}
        </p>
      </div>

      {/* Switch */}
      <Switch
        id={id}
        checked={enabled}
        onChange={onChange}
        disabled={disabled}
        aria-describedby={`${id}-desc`}
        className={cn(
          "relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2",
          enabled ? "bg-blue-600" : "bg-gray-300",
          disabled
            ? "cursor-not-allowed opacity-60 focus:ring-0"
            : "cursor-pointer focus:ring-blue-500"
        )}
      >
        <span className="sr-only">Toggle anonymous posting</span>
        <span
          aria-hidden="true"
          className={cn(
            "inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform",
            enabled ? "translate-x-6" : "translate-x-1"
          )}
        />
      </Switch>
    </div>
  );
};

export default AnonymityToggle;

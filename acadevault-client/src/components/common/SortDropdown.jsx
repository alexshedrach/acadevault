"use client";

import React from "react";
import { ChevronDown } from "lucide-react";

export default function SortDropdown({
  labelName = "Sort By",
  options,
  selected,
  onChange,
}) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-2 w-full sm:w-auto">
      {/* Label */}
      <label
        htmlFor="sort-dropdown"
        className="text-sm font-semibold text-gray-600 whitespace-nowrap"
      >
        {labelName}
      </label>

      {/* Select wrapper */}
      <div className="relative w-full sm:w-48">
        <select
          id="sort-dropdown"
          value={selected}
          onChange={(e) => onChange(e.target.value)}
          className="
            block w-full
            bg-white border border-gray-200
            rounded-lg shadow-sm
            px-4 py-2
            text-sm text-gray-700
            appearance-none
            focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500
            transition
          "
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>

        {/* Chevron icon */}
        <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
          <ChevronDown size={16} className="text-gray-400" />
        </div>
      </div>
    </div>
  );
}

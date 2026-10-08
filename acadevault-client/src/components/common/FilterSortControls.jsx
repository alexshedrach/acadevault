"use client";
import React from "react";
import { DEFAULT_SORT_OPTIONS } from "@/constants/sortOptions";

export default function FilterSortControls({
  sortBy,
  onSortChange,
  showFilters = false,
  filterValue = "",
  onFilterChange,
  sortOptions = DEFAULT_SORT_OPTIONS,
}) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
      {showFilters && onFilterChange && (
        <div className="flex items-center gap-3 flex-wrap">
          <label
            htmlFor="typeFilter"
            className="text-sm font-medium text-gray-600"
          >
            Filter by:
          </label>
          <select
            id="typeFilter"
            value={filterValue}
            onChange={(e) => onFilterChange(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 text-sm"
          >
            <option value="">All Types</option>
            <option value="Project Report">Project Reports</option>
            <option value="Past Questions">Past Questions</option>
            <option value="Assignment">Assignments</option>
          </select>
        </div>
      )}

      <div className="relative flex items-center gap-2">
        <label
          htmlFor="sortSelect"
          className="text-sm font-medium text-gray-600"
        >
          Sort by:
        </label>
        <select
          id="sortSelect"
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
          className="border border-gray-300 rounded-md pl-3 pr-8 py-2 text-sm bg-white shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 appearance-none"
        >
          {sortOptions.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
        <svg
          className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500 w-4 h-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>
    </div>
  );
}

"use client";

import { useState, useRef, useEffect } from "react";
import { cn } from "@/utils/cn";
import { ChevronDown } from "lucide-react";

/**
 * Reusable sort and filter control component with dropdown and filter options
 * @param {Object} props
 * @param {string} props.sortValue - Current sort value
 * @param {Function} props.onSortChange - Handler for sort changes
 * @param {string} props.filterValue - Current filter value
 * @param {Function} props.onFilterChange - Handler for filter changes
 * @param {boolean} props.showFilters - Whether to show filter controls
 * @param {boolean} props.useDropdownSort - Use dropdown for sort instead of select
 * @param {Array} props.sortOptions - Array of sort options [{ value, label }]
 * @param {Array} props.filterOptions - Array of filter options [{ value, label }]
 * @param {string} props.filterLabel - Label for filter control
 * @param {string} props.sortLabel - Label for sort control
 * @param {boolean} props.compact - Compact mode for smaller screens
 * @param {string} props.className - Additional CSS classes
 */
export function SortFilterControls({
  sortValue,
  onSortChange,
  filterValue,
  onFilterChange,
  showFilters = false,
  useDropdownSort = false,
  sortOptions = [],
  filterOptions = [],
  filterLabel = "Filter by",
  sortLabel = "Sort by",
  compact = false,
  className = "",
}) {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle keyboard navigation for accessibility
  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setDropdownOpen((prev) => !prev);
    }
    if (e.key === "Escape") {
      setDropdownOpen(false);
    }
  };

  return (
    <div
      className={cn(
        "relative flex flex-col sm:flex-row sm:items-center gap-4",
        compact && "flex-col",
        className
      )}
      role="region"
      aria-label="Sort and filter controls"
    >
      {/* Filter Controls */}
      {showFilters && filterOptions.length > 0 && onFilterChange && (
        <div className="flex items-center gap-3 flex-wrap">
          <label
            htmlFor="typeFilter"
            className="text-sm font-medium text-gray-600"
          >
            {filterLabel}:
          </label>
          <select
            id="typeFilter"
            value={filterValue}
            onChange={(e) => onFilterChange(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 text-sm bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 w-2xl"
            aria-label={filterLabel}
          >
            <option value="">All</option>
            {filterOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Sort Controls */}
      {useDropdownSort ? (
        <div className="relative z-20" ref={dropdownRef}>
          <button
            onClick={() => setDropdownOpen((prev) => !prev)}
            onKeyDown={handleKeyDown}
            className="w-full px-4 py-3 flex items-center justify-between rounded-md border border-gray-300 bg-white text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
            aria-label={sortLabel}
            aria-expanded={isDropdownOpen}
            aria-controls="sort-dropdown"
          >
            <span className="truncate">
              {sortOptions.find((opt) => opt.value === sortValue)?.label ||
                "Select sort"}
            </span>
            <ChevronDown
              className={cn("ml-2 h-4 w-4 transition-transform", {
                "rotate-180": isDropdownOpen,
              })}
              aria-hidden="true"
            />
          </button>

          {isDropdownOpen && (
            <div
              id="sort-dropdown"
              className="absolute mt-2 w-full bg-white border border-gray-200 rounded-md shadow-xl z-30"
            >
              <ul
                className="py-2 text-gray-700"
                role="listbox"
                aria-label="Sort options"
              >
                {sortOptions.map((option) => (
                  <li
                    key={option.value}
                    role="option"
                    aria-selected={sortValue === option.value}
                  >
                    <button
                      onClick={() => {
                        onSortChange(option.value);
                        setDropdownOpen(false);
                      }}
                      className={cn(
                        "w-full text-left px-4 py-2 text-sm transition duration-200",
                        sortValue === option.value
                          ? "bg-blue-100 text-blue-800"
                          : "hover:bg-blue-500 hover:text-white"
                      )}
                      aria-label={`Sort by ${option.label}`}
                    >
                      {option.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ) : (
        <div className="flex items-center gap-2">
          <label
            htmlFor="sortSelect"
            className="text-sm font-medium text-gray-600"
          >
            {sortLabel}:
          </label>
          <select
            id="sortSelect"
            value={sortValue}
            onChange={(e) => onSortChange(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 text-sm bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
            aria-label={sortLabel}
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
}

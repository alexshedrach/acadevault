"use client";

import React, { useRef, useState, useLayoutEffect, useEffect } from "react";
import PropTypes from "prop-types";

/**
 * NewReleaseMaterialFilters
 *
 * Renders a horizontal list of filter buttons (e.g., degree subcategories) with an animated slider
 * underneath indicating the currently selected filter. The “All” option has been removed;
 * the first degree is selected by default in the parent component.
 *
 * Props:
 * - subcategories: Array of objects { _id: string, name: string } to display as filter options.
 * - selectedFilter: Currently selected filter key (string).
 * - onSelectFilter: Callback when a filter button is clicked; receives the filter key.
 *
 * Enhancements for production:
 * 1. Uses useLayoutEffect to measure DOM elements before paint for smoother slider positioning.
 * 2. Listens to window resize to recalc slider position/width when layout changes.
 * 3. Applies ARIA roles for accessibility (acts like a tablist).
 * 4. Provides defaultProps and PropTypes for safer usage.
 * 5. Uses memoized filterOptions to avoid recomputing on every render.
 */
export default function NewReleaseMaterialFilters({
  subcategories,
  selectedFilter,
  onSelectFilter,
}) {
  // Refs to each button element so we can measure its position and width.
  const buttonRefs = useRef([]);

  // Slider style state: left offset (px) and width (px) of the triangle indicator.
  const [sliderStyle, setSliderStyle] = useState({
    left: "0px",
    width: "0px",
  });

  // Memoize the full list of filter options: just the provided subcategories (no “All”).
  // Each option is an object with { _id: string, name: string }.
  const filterOptions = React.useMemo(() => {
    return subcategories;
  }, [subcategories]);

  /**
   * updateSliderPosition
   *
   * Calculates and updates the sliderStyle based on which button is currently selected.
   * Should be invoked whenever selectedFilter or the buttonRefs array changes.
   */
  const updateSliderPosition = () => {
    // Find the index of the active filter among filterOptions
    const activeIndex = filterOptions.findIndex((cat) => {
      return cat._id === selectedFilter;
    });

    // Find the corresponding button element via refs
    const activeButton = buttonRefs.current[activeIndex];

    if (activeButton) {
      // Get the button's DOM position and width
      const { offsetLeft, offsetWidth } = activeButton;

      // Position slider at the horizontal center of the active button,
      // and set its width equal to the button's width.
      setSliderStyle({
        left: `${offsetLeft + offsetWidth / 2}px`,
        width: `${offsetWidth}px`,
      });
    }
  };

  // Use useLayoutEffect to measure before paint for smoother transitions
  useLayoutEffect(() => {
    updateSliderPosition();
  }, [selectedFilter, filterOptions]);

  /**
   * Handle window resize: Recalculate slider position and width so it stays aligned
   * if the button layout shifts (e.g., on mobile/desktop width changes).
   */
  useEffect(() => {
    window.addEventListener("resize", updateSliderPosition);
    return () => {
      window.removeEventListener("resize", updateSliderPosition);
    };
  }, [filterOptions]);

  return (
    <div className="relative">
      {/*
          Role="tablist" for accessibility: Buttons act like tabs to filter content.
          We justify-end here; if you want left- or center-align, adjust justify-content class.
      */}
      <div
        className="flex items-center justify-end space-x-6"
        role="tablist"
        aria-label="Filter by degree"
      >
        {filterOptions.map((cat, index) => {
          // Each button's key is the category ID.
          const catId = cat._id;
          // Determine if this button is currently selected
          const isSelected = selectedFilter === catId;

          // Show only the first word of the category name (e.g., "Bachelor" from "Bachelor of Science")
          // If no name provided, fallback to the full string
          const label = cat.name ? cat.name.split(" ")[0] : cat._id;

          return (
            <button
              key={catId}
              // Save a ref to this button for measuring
              ref={(el) => (buttonRefs.current[index] = el)}
              onClick={() => onSelectFilter(catId)}
              role="tab"
              aria-selected={isSelected}
              tabIndex={isSelected ? 0 : -1}
              className={`
                relative text-sm font-semibold uppercase tracking-wide transition-all
                focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 cursor-pointer
                ${
                  isSelected
                    ? "text-blue-600"
                    : "text-gray-500 hover:text-blue-600"
                }
              `}
            >
              {label}
            </button>
          );
        })}
      </div>

      {/*
        Slider Indicator:
        - A thin line (grey) spanning the full width,
        - A small triangular pointer that moves beneath the active button.
      */}
      <div className="relative mt-3">
        {/* Full-width track line */}
        <div className="h-px bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 w-full" />

        {/* Triangular pointer: absolutely positioned using sliderStyle */}
        <div
          className={`
            absolute -bottom-1 h-0
            border-l-4 border-r-4 border-b-4
            border-l-transparent border-r-transparent
            border-b-orange-500
            transition-all duration-300 ease-out
          `}
          style={{
            left: sliderStyle.left,
            transform: "translateX(-50%)",
            width: sliderStyle.width,
          }}
        />
      </div>
    </div>
  );
}

// Define prop types for runtime validation
NewReleaseMaterialFilters.propTypes = {
  subcategories: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
  selectedFilter: PropTypes.string.isRequired,
  onSelectFilter: PropTypes.func.isRequired,
};

// Provide defaultProps for safer usage if props are omitted
NewReleaseMaterialFilters.defaultProps = {
  subcategories: [],
};

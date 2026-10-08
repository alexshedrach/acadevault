"use client";

import React from "react";
import PropTypes from "prop-types";

/**
 * FAQSearch
 *
 * A simple, accessible search input for filtering FAQs.
 */
export default function FAQSearch({ value, onChange }) {
  return (
    <input
      type="text"
      placeholder="Search FAQs..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full sm:w-2/3 border border-gray-300 rounded-md px-4 py-2
                 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
      aria-label="Search FAQs"
    />
  );
}

FAQSearch.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

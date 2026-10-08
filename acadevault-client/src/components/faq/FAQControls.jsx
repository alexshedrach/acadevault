"use client";

import React from "react";
import PropTypes from "prop-types";

/**
 * FAQControls
 *
 * Buttons to expand or collapse all FAQ items.
 */
export default function FAQControls({ onExpandAll, onCollapseAll }) {
  const btnBase =
    "px-4 py-2 rounded-md text-white focus:outline-none focus:ring-2 transition-transform transform hover:scale-105";
  return (
    <div className="flex space-x-4">
      <button
        onClick={onExpandAll}
        className={`${btnBase} bg-green-600 hover:bg-green-700 focus:ring-green-500`}
      >
        Expand All
      </button>
      <button
        onClick={onCollapseAll}
        className={`${btnBase} bg-red-600 hover:bg-red-700 focus:ring-red-500`}
      >
        Collapse All
      </button>
    </div>
  );
}

FAQControls.propTypes = {
  onExpandAll: PropTypes.func.isRequired,
  onCollapseAll: PropTypes.func.isRequired,
};

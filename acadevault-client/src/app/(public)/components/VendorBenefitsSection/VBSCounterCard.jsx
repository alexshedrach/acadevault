"use client";

import React from "react";
import PropTypes from "prop-types";

/**
 * Single counter card showing a numeric value and a label.
 * Renders with semi-transparent backdrop and rounded corners.
 *
 * @param {Object} props
 * @param {string} props.label - Description of the statistic.
 * @param {number} props.value - Numeric value to display (e.g., 5325).
 */
export default function VBSCounterCard({ label, value }) {
  return (
    <div className="bg-white/10 backdrop-blur-md px-6 py-4 rounded-xl shadow-lg text-center">
      <h3 className="text-3xl font-bold">{value.toLocaleString()}</h3>
      <p className="text-gray-300 text-sm">{label}</p>
    </div>
  );
}

VBSCounterCard.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
};

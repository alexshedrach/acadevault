import React from "react";
import PropTypes from "prop-types";
import { cn } from "@/utils/cn";

/**
 * InfoLine – A key-value display component using semantic tags.
 *
 * Props:
 * - label: The label (key) to display.
 * - value: The value (can be string or ReactNode).
 * - fallback: What to show if value is falsy (default: "N/A")
 * - className: Optional container class
 */
const InfoLine = ({ label, value, fallback = "N/A", className = "" }) => {
  return (
    <dl className={cn("flex text-sm text-gray-200", className)}>
      <dt className="font-medium mr-1">{label}:</dt>
      <dd className="truncate">{value || fallback}</dd>
    </dl>
  );
};

InfoLine.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  fallback: PropTypes.string,
  className: PropTypes.string,
};

export default InfoLine;

"use client";

import React from "react";
import PropTypes from "prop-types";

/**
 * BackgroundGraphic
 *
 * Renders one or more <path> elements inside an SVG that’s positioned
 * (absolutely) at the top or bottom of a container. You can supply:
 *   • position: "top" | "bottom"
 *   • height: Tailwind height classes for the <svg> (e.g. "h-32", "h-full", etc.)
 *   • viewBox: SVG viewBox string
 *   • paths: Array of { d: string, fill?: string, opacity?: number, className?: string }
 *   • wrapperClasses: Extra classes for the wrapper <div>
 *   • svgClasses: Extra classes for the <svg> itself
 *   • style: Any inline styles (e.g. zIndex overrides)
 *
 * This one component replaces both WaveBackground and the previous BackgroundGraphic.
 */
export default function BackgroundGraphic({
  position = "bottom",
  height = "h-32",
  viewBox = "0 0 1440 320",
  paths = [],
  wrapperClasses = "",
  svgClasses = "",
  style = {},
}) {
  // Compute a few base classes to pin SVG either at the top or bottom,
  // and give it the slight translate so it overlaps its parent border nicely.
  const posClasses =
    position === "top"
      ? "absolute inset-x-0 top-0 transform -translate-y-1"
      : "absolute inset-x-0 bottom-0 transform translate-y-1";

  return (
    <div
      className={`${posClasses} w-full overflow-hidden leading-none ${wrapperClasses}`}
      style={style}
    >
      <svg
        className={`relative block w-full ${height} ${svgClasses}`}
        viewBox={viewBox}
        xmlns="http://www.w3.org/2000/svg"
      >
        {/*
          Render each <path> entry. You can pass
          fill, opacity, and/or additional className for styling.
        */}
        {paths.map(({ d, fill, opacity, className }, idx) => (
          <path
            key={idx}
            d={d}
            fill={fill}
            opacity={opacity}
            className={className}
          />
        ))}
      </svg>
    </div>
  );
}

BackgroundGraphic.propTypes = {
  /** "top" renders SVG pinned to top, "bottom" to bottom of its parent */
  position: PropTypes.oneOf(["top", "bottom"]),
  /** Tailwind height classes for the <svg> (e.g. "h-32", "h-40", "h-full"…) */
  height: PropTypes.string,
  /** viewBox string for the <svg> (default matches 1440×320 artboard) */
  viewBox: PropTypes.string,
  /** Array of path definitions: { d: string, fill?: string, opacity?: number, className?: string } */
  paths: PropTypes.arrayOf(
    PropTypes.shape({
      d: PropTypes.string.isRequired,
      fill: PropTypes.string,
      opacity: PropTypes.number,
      className: PropTypes.string,
    })
  ).isRequired,
  /** Extra wrapper classes on the outer <div> (e.g. "opacity-20 pointer-events-none") */
  wrapperClasses: PropTypes.string,
  /** Extra classes on the <svg> element (e.g. "dark:fill-current") */
  svgClasses: PropTypes.string,
  /** Inline style overrides (e.g. { zIndex: -10 }) */
  style: PropTypes.object,
};

BackgroundGraphic.defaultProps = {
  position: "bottom",
  height: "h-32",
  viewBox: "0 0 1440 320",
  wrapperClasses: "",
  svgClasses: "",
  style: {},
};

"use client";

import React from "react";
import PropTypes from "prop-types";
import { cn } from "@/utils/cn";

/**
 * OverlayPattern
 *
 * A customizable, responsive, accessible SVG dot-pattern overlay.
 * Suitable for background textures, banners, or hero sections.
 */
export default function OverlayPattern({
  className = "",
  patternColor = "white",
  dotRadius = 2,
  patternSize = 40,
  opacity = 0.2,
  zIndex = "z-0",
}) {
  const patternId = React.useId();

  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0",
        zIndex,
        className
      )}
      style={{ opacity }}
    >
      <svg
        className="h-full w-full object-cover"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 800 600"
      >
        <defs>
          <pattern
            id={patternId}
            x="0"
            y="0"
            width={patternSize}
            height={patternSize}
            patternUnits="userSpaceOnUse"
          >
            <circle
              cx={dotRadius}
              cy={dotRadius}
              r={dotRadius}
              fill={patternColor}
            />
          </pattern>
        </defs>
        <rect width="800" height="600" fill={`url(#${patternId})`} />
      </svg>
    </div>
  );
}

OverlayPattern.propTypes = {
  className: PropTypes.string,
  patternColor: PropTypes.string,
  dotRadius: PropTypes.number,
  patternSize: PropTypes.number,
  opacity: PropTypes.number,
  zIndex: PropTypes.string,
};

"use client";

import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

const LOADER_TYPES = {
  spinner: "spinner",
  dots: "dots",
  bars: "bars",
  pulse: "pulse",
  wave: "wave",
  skeleton: "skeleton",
};

const SPINNER_SIZES = {
  sm: "w-6 h-6 border-2",
  md: "w-10 h-10 border-4",
  lg: "w-14 h-14 border-4",
};

export default function Loader({
  type = LOADER_TYPES.spinner,
  size = "md",
  color = "blue-600",
  animationSpeed = "animate-spin",
  text = "Loading...",
  fullScreen = false,
  withSkeletonGrid = false,
  skeletonCount = 6,
  skeletonHeight = "h-24",
  skeletonShape = "rounded-lg",
}) {
  const ariaLabel = text || "Loading...";

  return (
    <div
      role="status"
      aria-label={ariaLabel}
      aria-live="polite"
      className={classNames(
        "flex flex-col items-center justify-center space-y-4",
        {
          "fixed inset-0 bg-white bg-opacity-80 z-50": fullScreen,
          "min-h-screen px-4 py-10": fullScreen,
        }
      )}
    >
      {/* Loader Type Variants */}
      {type === LOADER_TYPES.spinner && (
        <div
          className={classNames(
            "border-t-transparent border-solid rounded-full",
            SPINNER_SIZES[size],
            animationSpeed,
            `border-${color}`
          )}
        />
      )}

      {type === LOADER_TYPES.dots && (
        <div className="flex space-x-2">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className={classNames(
                "w-3 h-3 rounded-full bg-current animate-bounce",
                `text-${color}`,
                {
                  "delay-100": i === 1,
                  "delay-200": i === 2,
                }
              )}
            />
          ))}
        </div>
      )}

      {type === LOADER_TYPES.bars && (
        <div className="flex space-x-1">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className={classNames(
                "w-1 h-6 bg-current animate-pulse",
                `text-${color}`,
                `delay-${i * 100}`
              )}
            />
          ))}
        </div>
      )}

      {type === LOADER_TYPES.pulse && (
        <div
          className={classNames(
            "w-10 h-10 rounded-full bg-current opacity-75 animate-pulse",
            `text-${color}`
          )}
        />
      )}

      {type === LOADER_TYPES.wave && (
        <div className="flex space-x-1">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className={classNames(
                "w-2 h-8 bg-current animate-wave",
                `text-${color}`,
                `delay-${i * 150}`
              )}
            />
          ))}
        </div>
      )}

      {type === LOADER_TYPES.skeleton && (
        <div className="flex flex-col gap-4 w-full p-4">
          {Array.from({ length: skeletonCount }).map((_, index) => (
            <div
              key={index}
              className={classNames(
                "bg-gray-200 animate-pulse w-full",
                skeletonHeight,
                skeletonShape
              )}
            />
          ))}
        </div>
      )}

      {/* Message */}
      {text && <p className="text-gray-600 text-sm text-center px-2">{text}</p>}

      {/* Optional Skeleton Grid Preview */}
      {withSkeletonGrid && (
        <div className="mt-10 w-full max-w-6xl animate-pulse space-y-6">
          <div className="h-6 bg-gray-200 w-1/3 mx-auto rounded"></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {[...Array(skeletonCount)].map((_, index) => (
              <div
                key={index}
                className="p-4 bg-gray-100 rounded-lg shadow space-y-3"
              >
                <div className="h-32 bg-gray-300 rounded" />
                <div className="h-5 bg-gray-300 w-3/4 rounded" />
                <div className="h-4 bg-gray-300 w-5/6 rounded" />
                <div className="h-4 bg-gray-300 w-2/3 rounded" />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

Loader.propTypes = {
  type: PropTypes.oneOf(Object.values(LOADER_TYPES)),
  size: PropTypes.oneOf(Object.keys(SPINNER_SIZES)),
  color: PropTypes.string,
  animationSpeed: PropTypes.string,
  text: PropTypes.string,
  fullScreen: PropTypes.bool,
  withSkeletonGrid: PropTypes.bool,
  skeletonCount: PropTypes.number,
  skeletonHeight: PropTypes.string,
  skeletonShape: PropTypes.string,
};

// 🧪 Example Usage

{
  /* 
  
<Loader
  type="spinner"
  size="lg"
  text="Fetching material details..."
  fullScreen
/>

<Loader
  type="skeleton"
  skeletonCount={5}
  skeletonHeight="h-20"
  skeletonShape="rounded-lg"
/>

<Loader
  type="spinner"
  fullScreen
  withSkeletonGrid
  text="Loading course materials..."
/> */
}

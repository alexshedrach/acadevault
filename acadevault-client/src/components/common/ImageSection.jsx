"use client";

import React from "react";
import PropTypes from "prop-types";
import Image from "next/image";

/**
 * ImageSection
 *
 * A flexible, breakpoints-aware image container. By default, it remains hidden
 * until the specified `breakpoint` (e.g. "md") is reached, then renders a
 * Next.js <Image> in `fill` mode. You can also switch to an explicit (width/height)
 * layout by setting `layout="fixed"`.
 *
 * Props:
 *   • src (string, required)                – Path or URL of the image.
 *   • alt (string, required)                – Alt text for accessibility.
 *   • breakpoint (string)                   – Tailwind breakpoint name where image appears (e.g. "md", "lg").
 *                                             Until that breakpoint, the container is `hidden`.
 *   • layout (one of "fill" | "fixed")      – Use Next.js `fill` (default) or explicit `fixed`.
 *   • width (number)                        – Required if `layout="fixed"` (pixel width).
 *   • height (number)                       – Required if `layout="fixed"` (pixel height).
 *   • priority (boolean)                    – If true, next/image will load this image with priority.
 *   • sizes (string)                        – Optional `sizes` attribute for `fill` images (e.g. "(min-width: 768px) 40vw, 100vw").
 *   • placeholderBlurDataURL (string)       – Optional blur placeholder data URL (base64).
 *   • containerClassName (string)           – Additional classes for the outer container.
 *   • imageClassName (string)               – Additional classes for the <Image> itself.
 */
export const ImageSection = React.memo(
  ({
    src,
    alt,
    breakpoint,
    layout,
    width,
    height,
    priority,
    sizes,
    placeholderBlurDataURL,
    containerClassName,
    imageClassName,
  }) => {
    // Build the container’s Tailwind classes:
    //  - always "relative" so that <Image fill> can position itself absolutely
    //  - hidden until the chosen breakpoint
    //  - default width ½ on md, 2/5 on lg, adjustable via `containerClassName`
    const baseContainerClasses = `
      hidden
      ${breakpoint}:block
      relative
      ${layout === "fill" ? "w-full" : ""}
      ${breakpoint === "md" ? "md:w-1/2 lg:w-2/5" : ""}
    `;

    return (
      <div className={`${baseContainerClasses} ${containerClassName}`.trim()}>
        {layout === "fill" ? (
          // “fill” layout: Image stretches to fill parent,
          // which must be position: relative + given dimensions (e.g. height via CSS).
          <Image
            src={src}
            alt={alt}
            fill
            sizes={sizes}
            priority={priority}
            placeholder={placeholderBlurDataURL ? "blur" : undefined}
            blurDataURL={placeholderBlurDataURL}
            className={`object-cover rounded-lg shadow-lg ${imageClassName}`.trim()}
          />
        ) : (
          // “fixed” layout: you must supply explicit width & height (in px)
          <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            priority={priority}
            placeholder={placeholderBlurDataURL ? "blur" : undefined}
            blurDataURL={placeholderBlurDataURL}
            className={`object-cover rounded-lg shadow-lg ${imageClassName}`.trim()}
          />
        )}
      </div>
    );
  }
);

ImageSection.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  breakpoint: PropTypes.oneOf(["sm", "md", "lg", "xl", "2xl"]), // Tailwind breakpoints
  layout: PropTypes.oneOf(["fill", "fixed"]),
  width: (props, propName, componentName) => {
    if (
      props.layout === "fixed" &&
      (props[propName] == null || typeof props[propName] !== "number")
    ) {
      return new Error(
        `\`${propName}\` is required as a number when \`layout="fixed"\` in \`${componentName}\`.`
      );
    }
    return null;
  },
  height: (props, propName, componentName) => {
    if (
      props.layout === "fixed" &&
      (props[propName] == null || typeof props[propName] !== "number")
    ) {
      return new Error(
        `\`${propName}\` is required as a number when \`layout="fixed"\` in \`${componentName}\`.`
      );
    }
    return null;
  },
  priority: PropTypes.bool,
  sizes: PropTypes.string,
  placeholderBlurDataURL: PropTypes.string,
  containerClassName: PropTypes.string,
  imageClassName: PropTypes.string,
};

ImageSection.defaultProps = {
  breakpoint: "md", // Hidden below "md" by default
  layout: "fill", // Use fill layout unless overridden
  priority: false,
  sizes: undefined,
  placeholderBlurDataURL: undefined,
  containerClassName: "",
  imageClassName: "",
};

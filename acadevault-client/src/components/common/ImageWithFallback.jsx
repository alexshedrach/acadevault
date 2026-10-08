"use client";
import Image from "next/image";
import { useState } from "react";

/**
 * ImageWithFallback
 * Renders an image with a graceful fallback: either the first letter of `fallbackText`
 * or a placeholder if the image fails to load or no source is provided.
 *
 * @param {Object} props
 * @param {string} props.src - Image URL.
 * @param {string} props.alt - Alternative text for accessibility.
 * @param {number} [props.size=40] - Size in pixels (used when `fill` is false).
 * @param {string} [props.fallbackText=""] - Fallback text (usually a name or label).
 * @param {string} [props.className=""] - Additional custom styles.
 * @param {boolean} [props.fill=false] - Use full container fill mode (relative parent required).
 */
const ImageWithFallback = ({
  src,
  alt,
  size = 40,
  fallbackText = "",
  className = "",
  fill = false,
}) => {
  const [hasError, setHasError] = useState(false);

  const showFallback = !src || hasError;

  // Compute initial letter from fallback text
  const fallbackInitial = fallbackText?.trim()?.charAt(0)?.toUpperCase() || "?";

  // Fallback UI (e.g., user's initial in a circle)
  if (showFallback) {
    return (
      <div
        className={`rounded-full bg-gray-200 text-gray-700 flex items-center justify-center font-semibold text-sm ${className}`}
        style={fill ? {} : { width: size, height: size }}
        aria-label={alt}
        role="img"
      >
        {fallbackInitial}
      </div>
    );
  }

  // Image UI (with optional fill layout)
  return fill ? (
    <div
      className={`relative rounded-full overflow-hidden ${className}`}
      style={{ aspectRatio: "1 / 1" }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        onError={() => setHasError(true)}
        className="object-cover"
        sizes="(max-width: 768px) 40px, 100vw"
      />
    </div>
  ) : (
    <Image
      src={src}
      alt={alt}
      width={size}
      height={size}
      onError={() => setHasError(true)}
      className={`rounded-full object-cover ${className}`}
    />
  );
};

export default ImageWithFallback;

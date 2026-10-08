"use client";

import React from "react";
import { AlertBox } from "../ui/AlertBox";
import { StarRatingInput } from "../rating/StarRating";

/**
 * RatingSection
 *
 * A self‐contained rating input:
 * - Displays current rating textually and visually
 * - Renders a StarRatingInput for mouse & keyboard
 * - Shows an AlertBox error if submitted without a rating
 * - Provides ARIA labels & descriptions
 */
export default function RatingSection({
  value,
  onChange,
  submitted,
  maxStars = 5,
}) {
  const hasError = submitted && value === 0;

  return (
    <section aria-labelledby="rating-label" className="space-y-2">
      {/* Heading & current value */}
      <div className="text-center">
        <h3 id="rating-label" className="text-lg font-semibold text-gray-800">
          Your Rating
        </h3>
        <p
          className={`text-sm transition-colors duration-200 ${
            value > 0 ? "text-yellow-600 font-medium" : "text-gray-500"
          }`}
        >
          {value > 0 ? `${value} out of ${maxStars}` : "Not rated yet"}
        </p>
      </div>

      {/* Star rating controls */}
      <div
        role="radiogroup"
        aria-labelledby="rating-label"
        aria-required="true"
        className="flex justify-center"
      >
        <StarRatingInput
          value={value}
          onChange={onChange}
          maxStars={maxStars}
          size={36}
          glow
          animate
          showTooltip
        />
      </div>

      {/* Error alert if no rating on submit */}
      {hasError && (
        <AlertBox
          variant="error"
          title="Rating Required"
          onDismiss={() => {}}
          autoDismiss={false}
          compact
          centered
        >
          Please select a rating before submitting.
        </AlertBox>
      )}

      {/* Usage tip */}
      <p
        className="text-xs text-gray-400 italic text-center"
        aria-live="polite"
      >
        Tip: You can also use arrow keys to adjust your rating.
      </p>
    </section>
  );
}

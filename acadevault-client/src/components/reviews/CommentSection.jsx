"use client";

import React, { useState, useRef } from "react";
import { TextAreaField } from "../forms/fields/TextAreaField";


/**
 * CommentSection
 *
 * A controlled comment textarea with:
 *  • animated label & error via TextAreaField
 *  • live character count
 *  • hint when untouched
 *  • required validation on submit
 */
export default function CommentSection({
  reviewData,
  setReviewData,
  submitted,
  maxChar = 1000,
}) {
  const [charCount, setCharCount] = useState(reviewData.comment?.length || 0);
  const textareaRef = useRef(null);

  // Local error message when submitted with empty comment
  const errorMessage =
    submitted && !reviewData.comment?.trim() ? "Comment is required." : "";

  const handleChange = (e) => {
    const newVal = e.target.value;
    if (newVal.length <= maxChar) {
      setReviewData({ comment: newVal });
      setCharCount(newVal.length);
    }
  };

  return (
    <div>
      <TextAreaField
        ref={textareaRef}
        label="Your Detailed Review"
        name="comment"
        rows={5}
        required
        placeholder="Share your full experience. What did you like or dislike? What should others know before they try this?"
        error={errorMessage}
        showHint={!reviewData.comment}
        hintText="Tips: Be honest, specific, and constructive."
        value={reviewData.comment}
        onChange={handleChange}
      />

      {/* Live character count */}
      <div className="mt-1 flex justify-end text-xs text-gray-500">
        <span>
          {charCount} / {maxChar} characters
        </span>
      </div>
    </div>
  );
}

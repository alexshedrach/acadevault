"use client";

import { useState, useEffect } from "react";
import { useDebouncedCallback } from "use-debounce";
import { toast } from "react-toastify";
import { TextAreaField } from "@/components/forms/fields/TextAreaField";
import { Button } from "@/components/ui/Button";
import { WORDS_PER_PAGE } from "@/config/pricingConfig";



// Utility function to count words
const wordCountFromText = (text) => {
  if (!text || typeof text !== "string") return 0;
  // Remove extra whitespace and split by spaces, filter out empty strings
  const words = text
    .trim()
    .split(/\s+/)
    .filter((word) => word.length > 0);
  return words.length;
};

/**
 * WordCalculator
 * A reusable component for real-time word count estimation from pasted text.
 * Displays word count and equivalent pages, with an option to apply to form.
 *
 * Props:
 *  - register: React Hook Form register function
 *  - setValue: React Hook Form setValue function
 *  - formData: Form data object (to access sampleText)
 *  - unitType: "pages" or "words" (to format applied word count)
 */
export default function WordCalculator({
  register,
  setValue,
  formData,
  unitType,
}) {
  const [wordCount, setWordCount] = useState(0);

  // Debounced word count calculation
  const debouncedCalculateWordCount = useDebouncedCallback(() => {
    const count = wordCountFromText(formData.sampleText);
    setWordCount(count);
  }, 300);

  // Trigger word count calculation when sampleText changes
  useEffect(() => {
    debouncedCalculateWordCount();
  }, [formData.sampleText, debouncedCalculateWordCount]);

  // Apply word count to form's wordCount field
  const handleApplyWordCount = () => {
    if (wordCount > 0) {
      const count =
        unitType === "pages"
          ? Math.ceil(wordCount / WORDS_PER_PAGE)
          : wordCount;
      setValue("wordCount", count, { shouldValidate: true });
      toast.success("Word count applied to form!");
    } else {
      toast.error("No valid text to apply.");
    }
  };

  return (
    <div className="space-y-2">
      <TextAreaField
        label="Paste Sample Text (Optional)"
        name="sampleText"
        placeholder="Paste your text here to estimate word count..."
        rows={4}
        {...register("sampleText")}
        showHint={true}
        hintText="Paste text to estimate word count for your document."
        aria-describedby="sample-text-info"
      />
      {formData.sampleText && wordCount > 0 && (
        <div className="flex items-center gap-3">
          <p id="sample-text-info" className="text-xs text-gray-500">
            Estimated: <span className="font-medium">{wordCount}</span> words (≈{" "}
            <span className="font-medium">
              {(wordCount / WORDS_PER_PAGE).toFixed(1)}
            </span>{" "}
            pages)
          </p>
          <Button
            type="button"
            onClick={handleApplyWordCount}
            variant="outline"
            size="sm"
            aria-label="Apply estimated word count to form"
          >
            Apply to Form
          </Button>
        </div>
      )}
    </div>
  );
}

"use client";

import { Controller } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { TextCursorInput } from "lucide-react";

import {
  validateDeadlineFeasibility,
  calculateWordCountFeedback,
} from "@/utils/priceUtils";
import { MATERIAL_TIERS, WORDS_PER_PAGE } from "@/config/priceConfiguration";

import { DateInputField, FileUpload } from "@/components/forms/FormFields";
import UnitToggle from "@/components/common/UnitToggle";
import SectionHeader from "@/components/common/SectionHeader";

export default function SubmissionAssetsStep({
  control,
  errors,
  setValue,
  values,
  hasUserOverriddenUrgency,
  setHasUserOverriddenUrgency,
}) {
  const { unitCount, unitType = "pages" } = values;

  const handleResetUrgency = () => {
    setHasUserOverriddenUrgency(false);
    setValue("deadline", "");
    setValue("urgencyMultiplier", 1.0);
  };

  // Minimum count based on unitType
  const minCount = unitType === "pages" ? 1 : WORDS_PER_PAGE;
  const softMax = unitType === "pages" ? 100 : 100 * WORDS_PER_PAGE;

  // Treat non-number or empty as zero until user types
  const rawCount = typeof unitCount === "number" ? unitCount : 0;
  const pagesCount =
    unitType === "pages" ? rawCount : Math.ceil(rawCount / WORDS_PER_PAGE);
  const wordsCount =
    unitType === "pages" ? rawCount * WORDS_PER_PAGE : rawCount;

  const { text: feedbackText, color: feedbackColor } =
    calculateWordCountFeedback(rawCount, unitType);

  return (
    <motion.section
      className="bg-white rounded-xl border border-gray-200 shadow-md px-6 py-8 space-y-8"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
    >
      <SectionHeader
        title="Content Length & Attachments"
        description="Specify the length of your seminar content and upload any reference files."
        icon={<TextCursorInput className="text-blue-500" />}
      />

      <div className="space-y-6">
        {/* Deadline */}
        <div className="relative">
          <Controller
            name="deadline"
            control={control}
            defaultValue=""
            rules={{
              required: "Deadline is required",
              validate: {
                future: (v) =>
                  new Date(v) > new Date() || "Deadline must be in the future",
                feasible: (v) =>
                  validateDeadlineFeasibility(
                    pagesCount,
                    v,
                    MATERIAL_TIERS["Seminar"]
                  ).isFeasible ||
                  validateDeadlineFeasibility(
                    pagesCount,
                    v,
                    MATERIAL_TIERS["Seminar"]
                  ).message,
              },
            }}
            render={({ field }) => (
              <DateInputField
                {...field}
                control={control}
                label="Submission Deadline"
                usePicker
                showTimeSelect
                minDate={new Date()}
                maxDate={new Date(Date.now() + 180 * 24 * 60 * 60 * 1000)}
                dateFormat="yyyy-MM-dd'T'HH:mm'"
                error={errors.deadline?.message}
                disabled={hasUserOverriddenUrgency}
                className="bg-gray-50 rounded-lg"
              />
            )}
          />
          <AnimatePresence>
            {hasUserOverriddenUrgency && (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.3 }}
                className="text-sm text-yellow-600 mt-1 flex items-center gap-1"
              >
                Deadline set by urgency slider.{" "}
                <button
                  type="button"
                  onClick={handleResetUrgency}
                  className="text-blue-600 hover:underline"
                >
                  Reset urgency
                </button>
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        {/* Unit count */}
        <div className="border-2 border-blue-100 bg-blue-50/30 p-6 rounded-xl shadow-sm space-y-5">
          <div className="flex items-center justify-between">
            <label
              htmlFor="unitCount"
              className="text-sm font-medium text-gray-800"
            >
              Estimated {unitType === "pages" ? "Pages" : "Words"}
            </label>
            <UnitToggle
              currentUnit={unitType}
              onToggle={(newUnit) => {
                // preserve rawCount if number, else zero
                const current = rawCount;
                const updated =
                  newUnit === "words"
                    ? current * WORDS_PER_PAGE
                    : Math.ceil(current / WORDS_PER_PAGE);

                setValue("unitType", newUnit);
                setValue("unitCount", updated, { shouldValidate: true });
                localStorage.setItem("unitType", newUnit);
              }}
            />
          </div>

          <Controller
            name="unitCount"
            control={control}
            defaultValue=""
            rules={{
              required: `Please enter the number of ${unitType}`,
              min: {
                value: minCount,
                message: `Minimum allowed is ${minCount} ${unitType}`,
              },
            }}
            render={({ field }) => (
              <input
                type="number"
                id="unitCount"
                {...field}
                value={field.value ?? ""}
                placeholder={`Enter ${unitType}`}
                min={minCount}
                step={unitType === "pages" ? 1 : 100}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring focus:ring-blue-200 focus:outline-none bg-gray-50"
                onChange={(e) => {
                  const v = e.target.value;
                  field.onChange(v === "" ? "" : Number(v));
                }}
              />
            )}
          />

          {rawCount > softMax && (
            <p className="text-xs text-yellow-600">
              For very large projects ({softMax.toLocaleString()} {unitType}),
              turnaround may be longer.
            </p>
          )}

          <AnimatePresence>
            <motion.div
              key={feedbackText}
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              className="text-xs text-gray-700"
              aria-live="polite"
            >
              <span className={feedbackColor}>{feedbackText}</span>{" "}
              <span className="text-gray-500">
                ({wordsCount.toLocaleString()} words ≈ {pagesCount} pages)
              </span>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* File upload */}
        <FileUpload
          name="files"
          label="Reference Files (optional)"
          control={control}
          accept=".pdf,.doc,.docx"
          multiple
          maxSizeMB={10}
          rules={{
            validate: (files) => {
              if (files) {
                const validTypes = [
                  "application/pdf",
                  "application/msword",
                  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                ];
                for (const f of files) {
                  if (!validTypes.includes(f.type)) {
                    return "Only PDF, DOC, and DOCX allowed.";
                  }
                  if (f.size > 10 * 1024 * 1024) {
                    return "Max file size is 10MB.";
                  }
                }
              }
              return true;
            },
          }}
          error={errors.files?.message}
          helpText="Upload reference materials (PDF, DOC, DOCX; max 10MB each)."
          className="bg-gray-50 rounded-lg"
        />
      </div>
    </motion.section>
  );
}

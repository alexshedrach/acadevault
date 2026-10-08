"use client";

import React, { useState } from "react";
import {
  NumberInputField,
  DateInputField,
  SelectField,
  FileUpload,
  TextAreaField,
} from "@/components/forms/FormFields";
import {
  academicLevelRates,
  MATERIAL_TIERS,
  PRICING_UNITS,
  writerTiers,
} from "@/config/priceConfiguration";
import { citationStyles } from "@/constants/enums";

export default function StepReviewSpecs({
  control,
  errors,
  formData,
  isSubmitting,
  selectedPlanDetails,
}) {
  const [showAdvanced, setShowAdvanced] = useState(false);
  const { mode, academicFormat, referenceSources, plagiarismTolerance } =
    formData || {};
  const isPlanMode = mode === "plan";
  const isWriterMode = mode === "writer";

  // Filter material types to include only Tier2, Tier3, and Tier4
  const materialOptions = Object.keys(PRICING_UNITS)
    .filter((type) =>
      ["Tier2", "Tier3", "Tier4"].includes(MATERIAL_TIERS[type])
    )
    .map((type) => ({
      value: type,
      label: type.replace(/([A-Z])/g, " $1").trim(), // Format for readability (e.g., "ResearchPaper" -> "Research Paper")
    }))
    .sort((a, b) => a.label.localeCompare(b.label)); // Sort alphabetically for better UX

  const academicLevelOptions = Object.keys(academicLevelRates).map((level) => ({
    value: level,
    label: level.toUpperCase(),
  }));

  const writerTierOptions = Object.keys(writerTiers).map((tier) => ({
    value: tier,
    label: tier.charAt(0).toUpperCase() + tier.slice(1), // Capitalize first letter (e.g., "standard" -> "Standard")
  }));

  const languageStyleOptions = [
    { value: "british", label: "British English" },
    { value: "american", label: "American English" },
  ];
  const writingToneOptions = [
    { value: "formal", label: "Formal" },
    { value: "semi-formal", label: "Semi-Formal" },
    { value: "technical", label: "Technical" },
  ];

  return (
    <div className="space-y-8 px-4 md:px-8">
      {isPlanMode && selectedPlanDetails && (
        <div className="mb-6 p-4 bg-blue-50 rounded-lg">
          <h3 className="text-lg font-semibold">
            Selected Plan: {selectedPlanDetails.title}
          </h3>
          <p className="text-sm text-gray-600">
            {selectedPlanDetails.applicability}
          </p>
        </div>
      )}

      {isWriterMode && (
        <header className="mt-2">
          <h2 className="text-xl font-semibold">Review Specifications</h2>
          <p className="text-sm text-gray-500">
            {isPlanMode
              ? "Review prefilled specifications from your plan."
              : "Customize your project preferences."}
          </p>
        </header>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {isWriterMode && (
          <>
            <SelectField
              label="Material Type"
              name="academicType"
              control={control}
              options={materialOptions}
              rules={{ required: "Please select the type of material" }}
              error={errors?.academicType?.message}
              placeholder="Select Material Type"
              disabled={isSubmitting}
            />

            <SelectField
              label="Academic Level"
              name="academicLevel"
              control={control}
              options={academicLevelOptions}
              rules={{ required: "Select an academic level." }}
              placeholder="Select academic level"
              className="bg-gray-50 rounded-lg"
              error={errors?.academicLevel?.message}
              disabled={isSubmitting}
            />
          </>
        )}

        <SelectField
          label="Writer Expertise"
          name="writerExpertise"
          control={control}
          options={writerTierOptions}
          rules={{ required: "Select a writer expertise level." }}
          placeholder="Select writer expertise"
          className="bg-gray-50 rounded-lg"
        />

        <SelectField
          label="Academic Format"
          name="academicFormat"
          control={control}
          options={citationStyles}
          rules={{ required: "Academic format is required" }}
          error={errors?.academicFormat?.message}
          placeholder="Choose format"
          disabled={(isPlanMode && !!academicFormat) || isSubmitting}
        />
        {isPlanMode && (
          <NumberInputField
            label="No. of References"
            name="referenceSources"
            control={control}
            rules={{
              required: "Number of references is required",
              min: { value: 0, message: "Cannot be negative" },
              max: { value: 50, message: "Max 50 references" },
            }}
            error={errors?.referenceSources?.message}
            placeholder="e.g. 10"
            disabled={(isPlanMode && !!referenceSources) || isSubmitting}
          />
        )}
      </div>
      
      <FileUpload
        label="Project Guidelines"
        name="projectGuidelinesFile"
        control={control}
        accept=".pdf,.doc,.docx"
        helpText="PDF or DOCX (max 10MB)"
        error={errors?.projectGuidelinesFile?.message}
        disabled={isSubmitting}
      />
      <TextAreaField
        label="Special Requests/Guideline"
        name="specialRequests"
        control={control}
        rows={4}
        placeholder="Any additional instructions?"
        disabled={isSubmitting}
      />

      <button
        type="button"
        className="text-sm text-blue-600 hover:underline"
        onClick={() => setShowAdvanced(!showAdvanced)}
        disabled={isSubmitting}
      >
        {showAdvanced
          ? "Hide Advanced Preferences"
          : "Show Advanced Preferences"}
      </button>

      {showAdvanced && (
        <div className="grid grid-cols-1 gap-4 border-t pt-4">
          <NumberInputField
            label="Plagiarism Tolerance (%)"
            name="plagiarismTolerance"
            control={control}
            rules={{
              min: { value: 0, message: "Cannot be negative" },
              max: { value: 20, message: "Max 20%" },
            }}
            error={errors?.plagiarismTolerance?.message}
            placeholder="e.g. 5"
            disabled={(isPlanMode && !!plagiarismTolerance) || isSubmitting}
          />

          <SelectField
            label="Language Style"
            name="languageStyle"
            control={control}
            options={languageStyleOptions}
            placeholder="Select style"
            error={errors?.languageStyle?.message}
            disabled={isSubmitting}
          />

          <SelectField
            label="Preferred Writing Tone"
            name="preferredWritingTone"
            control={control}
            options={writingToneOptions}
            placeholder="Select tone"
            error={errors?.preferredWritingTone?.message}
            disabled={isSubmitting}
          />

          <FileUpload
            label="Upload Past Work (Optional)"
            name="pastWorkReference"
            control={control}
            accept=".pdf,.doc,.docx"
            helpText="Max 10MB"
            error={errors?.pastWorkReference?.message}
            disabled={isSubmitting}
          />
        </div>
      )}
    </div>
  );
}

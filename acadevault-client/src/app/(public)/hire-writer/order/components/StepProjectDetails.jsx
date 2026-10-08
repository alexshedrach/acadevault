"use client";

import React, { useEffect } from "react";
import {
  DateInputField,
  InputField,
  InputWithAddon,
  PhoneInputField,
  SelectField,
  TextAreaField,
} from "@/components/forms/FormFields";
import { MATERIAL_TIERS } from "@/config/priceConfiguration";
import { formatDistanceToNow } from "date-fns";
import { validateDeadlineFeasibility } from "@/utils/priceUtils";

export default function StepProjectDetails({
  control,
  watch,
  errors,
  formData,
  isSubmitting,
  setValue,
  selectedPlanDetails,
}) {
  const { mode } = formData || {};
  const isPlanMode = mode === "plan";
  const isWriterMode = mode === "writer";

  const deadlineValue = watch("deadline");
  const academicType = watch("academicType");
  const unitCount = watch("unitCount");

  // Prefill default deadline for plan mode if none set
  useEffect(() => {
    if (isPlanMode && !deadlineValue) {
      const defaultDate = new Date();
      defaultDate.setDate(defaultDate.getDate() + 7);
      const iso = defaultDate.toISOString().split(".")[0];
      setValue("deadline", iso, { shouldValidate: true });
    }
  }, [isPlanMode, deadlineValue, setValue]);

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
          <h2 className="text-xl font-semibold">Project Information</h2>
          <p className="text-sm text-gray-500">
            Tell us about your institution and project topic.{" "}
            {isPlanMode
              ? "Some fields are prefilled based on your plan."
              : "All fields are required."}
          </p>
        </header>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InputField
          label="Full Name"
          name="fullName"
          control={control}
          rules={{ required: "Full Name is required" }}
          error={errors?.fullName?.message}
          placeholder="Enter your full name"
          disabled={isSubmitting}
        />

        <InputField
          label="Email Address"
          name="email"
          type="email"
          control={control}
          rules={{
            required: "Email Address is required",
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: "Please enter a valid email address",
            },
          }}
          error={errors?.email?.message}
          placeholder="Enter your email address"
          disabled={isSubmitting}
        />

        <PhoneInputField
          name="phone"
          label="Phone Number (optional)"
          placeholder="e.g. +234 801 234 5678"
          control={control}
          rules={{
            pattern: {
              value: /^\+?[0-9\s\-()]{7,}$/,
              message: "Invalid phone number.",
            },
          }}
          error={errors?.phone?.message}
          disabled={isSubmitting}
        />

        <SelectField
          label="Department"
          name="department"
          control={control}
          options={[
            { value: "computer_science", label: "Computer Science" },
            { value: "stem", label: "STEM" },
            { value: "humanities", label: "Humanities" },
            { value: "business", label: "Business" },
            { value: "other", label: "Other" },
          ]}
          rules={{ required: "Department is required" }}
          placeholder="Select discipline"
          error={errors?.department?.message}
          disabled={isSubmitting}
        />

        {/* Enhanced Deadline Field */}
        <div className="col-span-2">
          <DateInputField
            label="Deadline"
            name="deadline"
            control={control}
            usePicker={true}
            showTimeSelect={false}
            minDate={new Date()}
            dateFormat="yyyy-MM-dd"
            rules={{
              required: "Deadline is required.",
              validate: {
                feasible: (value) => {
                  const { isFeasible, message } = validateDeadlineFeasibility(
                    unitCount || 1,
                    value,
                    MATERIAL_TIERS[academicType] || "Tier1"
                  );
                  return isFeasible || message;
                },
              },
            }}
            error={errors?.deadline?.message}
            disabled={(isPlanMode && !!deadlineValue) || isSubmitting}
          />
          {deadlineValue && !isNaN(new Date(deadlineValue).getTime()) && (
            <p className="mt-1 text-sm text-gray-500">
              Due{" "}
              {formatDistanceToNow(new Date(deadlineValue), {
                addSuffix: true,
              })}
            </p>
          )}
        </div>

        <InputField
          label="Institution Name (optional)"
          name="institutionName"
          control={control}
          error={errors?.institutionName?.message}
          placeholder="Enter your institution name"
          disabled={isSubmitting}
        />

        <InputField
          label="Country (Optional)"
          name="country"
          control={control}
          rules={{ required: "Country is required" }}
          error={errors?.country?.message}
          placeholder="Your country"
          disabled={isSubmitting}
        />

        {isWriterMode && (
          <InputWithAddon
            label="Max Budget (optional)"
            name="budget"
            control={control}
            type="number"
            addon="$"
            position="left"
            rules={{
              min: { value: 1, message: "Must be positive." },
            }}
            placeholder="Enter your budget"
            className="bg-gray-50 rounded-lg"
          />
        )}
        <div className="col-span-2">
          <TextAreaField
            label="Proposed Project Topic"
            name="topic"
            control={control}
            rows={3}
            rules={{
              required: "Please enter a proposed topic",
              minLength: { value: 8, message: "Topic must be ≥8 characters" },
            }}
            error={errors?.topic?.message}
            placeholder="e.g. Design a digital library"
            disabled={isSubmitting}
          />
        </div>
      </div>
    </div>
  );
}

import {
  InputField,
  SelectField,
  TextAreaField,
} from "@/components/forms/FormFields";
import React from "react";
import { academicLevelRates } from "@/config/priceConfiguration";

const academicOptions = Object.keys(academicLevelRates).map((level) => ({
  value: level,
  label: level.toUpperCase(),
}));

export default function ProjectDetailsStep({ control, errors }) {
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-gray-800">Project Details</h3>

      <InputField
        label="Topic / Question"
        name="topic"
        placeholder="Your Seminar Question"
        control={control}
        required
        rules={{
          required: "Topic is required",
          minLength: {
            value: 10,
            message: "Topic must be at least 10 characters",
          },
          maxLength: {
            value: 500,
            message: "Topic cannot exceed 500 characters",
          },
        }}
        error={errors.topic?.message}
        className="bg-gray-50 rounded-lg"
      />

      <SelectField
        label="Academic Level"
        name="academicLevel"
        control={control}
        options={academicOptions}
        placeholder="Select academic level"
        required
        rules={{ required: "Academic level is required" }}
        error={errors.academicLevel?.message}
        className="bg-gray-50 rounded-lg"
      />

      <TextAreaField
        label="Additional Instructions (Optional)"
        name="additionalInfo"
        rows={4}
        placeholder="Provide any extra context or instruction"
        control={control}
        rules={{
          maxLength: {
            value: 1000,
            message: "Instructions cannot exceed 1000 characters",
          },
        }}
        error={errors.additionalInfo?.message}
        className="bg-gray-50 rounded-lg"
      />
    </div>
  );
}

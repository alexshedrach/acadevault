"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { format, formatDistanceToNow } from "date-fns";
import {
  SelectField,
  DateInputField,
  InputWithAddon,
} from "@/components/forms/FormFields";
import {
  MATERIAL_TIERS,
  PRICING_UNITS,
  academicLevelRates,
  writerTiers,
} from "@/config/priceConfiguration";
import { validateDeadlineFeasibility } from "@/utils/priceUtils";

export default function AcademicSpecsStep({ control, setValue, watch }) {
  const deadlineValue = watch("deadline");
  const academicType = watch("academicType");
  const unitCount = watch("unitCount");

  useEffect(() => {
    if (!deadlineValue) {
      const defaultDeadline = format(
        new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        "yyyy-MM-dd'T'HH:mm"
      );
      setValue("deadline", defaultDeadline);
    }
  }, [deadlineValue, setValue]);

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

  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-2 gap-6"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
    >
      <SelectField
        label="Academic Level"
        name="level"
        control={control}
        options={academicLevelOptions}
        rules={{ required: "Select an academic level." }}
        placeholder="Select academic level"
        className="bg-gray-50 rounded-lg"
      />

      <SelectField
        label="Material Type"
        name="academicType"
        control={control}
        options={materialOptions}
        rules={{ required: "Select a material type." }}
        placeholder="Select material type"
        className="bg-gray-50 rounded-lg"
      />

      <SelectField
        label="Department"
        name="discipline"
        control={control}
        options={[
          { value: "social_sciences", label: "Social Sciences" },
          { value: "stem", label: "STEM" },
          { value: "humanities", label: "Humanities" },
          { value: "business", label: "Business" },
          { value: "other", label: "Other" },
        ]}
        rules={{ required: "Select a discipline." }}
        placeholder="Select discipline"
        className="bg-gray-50 rounded-lg"
      />

      <SelectField
        label="Writer Expertise"
        name="writerExpertise"
        control={control}
        options={writerTierOptions}
        rules={{ required: "Select a writer expertise level." }}
        placeholder="Select writer expertise"
        className="bg-gray-50 rounded-lg"
      />

      <div className="col-span-1 md:col-span-2">
        <DateInputField
          label="Deadline"
          name="deadline"
          control={control}
          usePicker={true}
          showTimeSelect={true}
          minDate={new Date()}
          maxDate={new Date(Date.now() + 180 * 24 * 60 * 60 * 1000)}
          dateFormat="yyyy-MM-dd'T'HH:mm"
          required={true}
          placeholder="Select date and time"
          rules={{
            required: "Deadline is required.",
            validate: {
              feasible: (value) =>
                validateDeadlineFeasibility(
                  unitCount || 1,
                  value,
                  MATERIAL_TIERS[academicType] || "Tier2"
                ).isFeasible || validateDeadlineFeasibility(value).message,
            },
          }}
          className="bg-gray-50 rounded-lg"
        />
        {deadlineValue && !isNaN(new Date(deadlineValue).getTime()) && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-1 text-sm text-gray-500"
          >
            {formatDistanceToNow(new Date(deadlineValue), { addSuffix: true })}
          </motion.p>
        )}
      </div>

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
    </motion.div>
  );
}

"use client";

import React from "react";
import { useWatch } from "react-hook-form";
import {
  RadioGroupField,
  CheckboxGroupField,
  SelectField,
  TextAreaField,
} from "@/components/forms/FormFields";
import {
  writerTiers,
  AVAILABLE_ADDONS,
  MATERIAL_TIERS,
} from "@/config/priceConfiguration";
import { formatPriceWithSymbol } from "@/utils/priceUtils";
import { citationStyles } from "@/constants/enums";

export default function PreferencesStep({ control, errors }) {
  // watch currency & academicType so options stay in sync
  const currency = useWatch({ control, name: "currency" }) || "NGN";
  const materialType = useWatch({ control, name: "academicType" }) || "Seminar";
  const tierKey = MATERIAL_TIERS[materialType] || "Tier1";

  // build addon options exactly like in your first step
  const addonOptions = (AVAILABLE_ADDONS[tierKey] || []).map((addon) => {
    const amount = addon.price[currency] ?? addon.price.USD;
    return {
      value: addon.id,
      label: `${addon.label} (+${formatPriceWithSymbol(amount, currency)})`,
    };
  });

  // writer expertise pull‑in
  const writerTierOptions = Object.keys(writerTiers).map((tier) => ({
    value: tier,
    label: tier.charAt(0).toUpperCase() + tier.slice(1),
  }));

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-gray-800">
        Submission Preferences
      </h3>

      {/* Writer Expertise */}
      <SelectField
        name="writerExpertise"
        control={control}
        label="Writer Expertise"
        options={writerTierOptions}
        required
        rules={{ required: "Select writer expertise" }}
        error={errors.writerExpertise?.message}
        className="bg-gray-50 rounded-lg"
      />

      {/* now a CheckboxGroupField, so selectedAddons is always an array */}
      <CheckboxGroupField
        name="selectedAddons"
        control={control}
        label="Add‑ons (Optional)"
        options={addonOptions}
        error={errors.selectedAddons?.message}
        className="bg-gray-50 rounded-lg p-4"
      />

      {/* Citation Style */}
      <RadioGroupField
        name="citationStyle"
        label="Citation Style"
        control={control}
        options={citationStyles}
        layout="grid"
        rules={{ required: "Citation style is required." }}
        error={errors.citationStyle?.message}
        className="bg-gray-50 rounded-lg p-4"
      />

      {/* Additional Instructions */}
      <TextAreaField
        label="Additional Instructions (Optional)"
        name="additionalInfo"
        control={control}
        rows={4}
        placeholder="Provide any extra context or instruction"
        rules={{
          maxLength: {
            value: 1000,
            message: "Instructions cannot exceed 1000 characters",
          },
        }}
        error={errors.additionalInfo?.message}
        className="bg-gray-50 rounded-lg w-full p-4"
      />
    </div>
  );
}

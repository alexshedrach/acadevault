import {
  InputField,
  PhoneInputField,
  SelectField,
} from "@/components/forms/FormFields";
import React from "react";
import { academicLevelRates } from "@/config/priceConfiguration";

const academicOptions = Object.keys(academicLevelRates).map((level) => ({
  value: level,
  label: level.toUpperCase(),
}));

export default function PersonalDetailsStep({ control, errors, user }) {
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-gray-800">Personal Details</h3>

      {!user && (
        <InputField
          label="Full Name"
          name="name"
          placeholder="Your Full Name"
          control={control}
          required
          rules={{
            required: "Full name is required",
            pattern: {
              value: /^[A-Za-z\s]+$/i,
              message: "Name can only contain letters and spaces",
            },
            minLength: {
              value: 2,
              message: "Name must be at least 2 characters",
            },
          }}
          error={errors.name?.message}
          className="bg-gray-50 rounded-lg"
        />
      )}

      <InputField
        label="Email Address"
        name="email"
        type="email"
        placeholder="Your Email"
        control={control}
        required
        readOnly={!!user}
        rules={{
          required: "Email is required",
          pattern: {
            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,}$/,
            message: "Invalid email address",
          },
        }}
        error={errors.email?.message}
        className="bg-gray-50 rounded-lg"
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
        error={errors.phone?.message}
        className="bg-gray-50 rounded-lg"
      />

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

      <InputField
        label="Academic Discipline"
        name="academicDiscipline"
        placeholder="e.g., Computer Science"
        control={control}
        required
        rules={{
          required: "Academic discipline is required",
          minLength: {
            value: 2,
            message: "Discipline must be at least 2 characters",
          },
          maxLength: {
            value: 100,
            message: "Discipline cannot exceed 100 characters",
          },
        }}
        error={errors.academicDiscipline?.message}
        className="bg-gray-50 rounded-lg"
      />

      <InputField
        label="Institution"
        name="institution"
        placeholder="e.g., University of Lagos"
        control={control}
        required
        rules={{
          required: "Institution is required",
          minLength: {
            value: 2,
            message: "Institution must be at least 2 characters",
          },
          maxLength: {
            value: 100,
            message: "Institution cannot exceed 100 characters",
          },
        }}
        error={errors.institution?.message}
        className="bg-gray-50 rounded-lg"
      />
    </div>
  );
}

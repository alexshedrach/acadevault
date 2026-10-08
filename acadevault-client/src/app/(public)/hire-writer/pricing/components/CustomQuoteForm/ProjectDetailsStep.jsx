"use client";

import ProjectInspirationWidget from "@/components/common/ProjectInspirationWidget";
import {
  InputField,
  PhoneInputField,
  TextAreaField,
} from "@/components/forms/FormFields";

export default function ProjectDetailsStep({
  control,
  user,
  formData,
  errors,
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-6">
        {!user && (
          <InputField
            name="name"
            label="Full Name"
            placeholder="Enter your name"
            control={control}
            rules={{ required: "Your name is required." }}
          />
        )}

        <InputField
          name="email"
          label="Email"
          placeholder="Enter your email"
          type="email"
          control={control}
          rules={{
            required: "Email is required.",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Enter a valid email address.",
            },
          }}
          readOnly={Boolean(user)}
        />

        {/* ✅ Use PhoneInputField directly */}
        <PhoneInputField
          name="phone"
          label="Phone (optional)"
          placeholder="e.g. +234 801 234 5678"
          control={control}
          rules={{
            pattern: {
              value: /^\+?[0-9\s\-()]{7,}$/,
              message: "Invalid phone number.",
            },
          }}
        />

        <InputField
          label="Institution Name (optional)"
          name="institutionName"
          control={control}
          // rules={{ required: "Institution Name is required" }}
          error={errors.institutionName?.message}
          placeholder="Enter your institution name"
        />

        <TextAreaField
          label="Proposed Project Topic"
          name="topic"
          control={control}
          rows={3}
          rules={{
            required: "Please enter a proposed topic",
            minLength: { value: 8, message: "Topic must be ≥8 characters" },
          }}
          error={errors.topic?.message}
          placeholder="e.g. Design a digital library"
        />
      </div>

      <div>
        <ProjectInspirationWidget
          topic={formData.topic || ""}
          email={formData.email || ""}
        />
      </div>
    </div>
  );
}

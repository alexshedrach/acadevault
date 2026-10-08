"use client";

import React, { useState } from "react";
import { AlertBox } from "../ui/AlertBox";
import { Button } from "../ui/Button";
import RatingSection from "./RatingSection";
import { InputField } from "../forms/fields/InputField";
import CommentSection from "./CommentSection";
import ProsConsSection from "./ProsConsSection";
import MediaUploader from "../MediaUploader/MediaUploader";
import AnonymityToggle from "./AnonymityToggle";

export default function ReviewForm({
  formData,
  onChange,
  onSubmit,
  submitted,
  status,
  onDismissAlert,
  backendErrors = {},
}) {
  // Local char count
  const [charCount, setCharCount] = useState(formData.comment.length);

  const updateField = (field, value) => {
    onChange(field, value);
    if (field === "comment") setCharCount(value.length);
  };

  const isLoading = status.type === "loading";
  const isValid = formData.rating > 0 && formData.comment.trim().length > 0;
  const isDisabled = isLoading || !isValid;

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 max-w-3xl mx-auto">
      {/* Header */}
      <div className="mb-8 text-center md:text-left">
        <h3 className="inline-flex items-center gap-3 text-3xl font-bold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-transparent bg-clip-text tracking-tight">
          <svg
            className="w-6 h-6 text-indigo-600 animate-bounce"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 20l9-5-9-5-9 5 9 5zM12 4v10m0 0L3 9m9 5l9-5"
            />
          </svg>
          Submit Your Review
        </h3>
        <p className="mt-2 text-sm text-gray-500 max-w-md">
          Share your experience to help others make informed decisions and help
          us improve.
        </p>
      </div>

      <form onSubmit={onSubmit} className="space-y-6">
        {/* Global feedback */}
        {status.message && (
          <AlertBox
            variant={status.type === "error" ? "error" : "success"}
            title={status.type === "error" ? "Oops!" : "Success"}
            onDismiss={onDismissAlert}
            autoDismiss={status.type === "success"}
            duration={status.type === "success" ? 4000 : 3000}
            compact
            centered
          >
            {status.message}
          </AlertBox>
        )}

        {/* 1) Rating */}
        <RatingSection
          value={formData.rating}
          onChange={(v) => updateField("rating", v)}
          submitted={submitted}
        />

        {/* 2) Title */}
        <InputField
          name="title"
          label="Review Title"
          placeholder="Summarize your experience"
          optional
          hintText="You can leave this blank if you like."
          maxLength={100}
          value={formData.title}
          onChange={(e) => updateField("title", e.target.value)}
          error={status.field === "title" ? status.message : ""}
          backendError={backendErrors.title}
          showHint
        />

        {/* 3) Comment */}
        <CommentSection
          reviewData={formData}
          setReviewData={(data) => {
            updateField("comment", data.comment);
          }}
          submitted={submitted}
          maxChar={1000}
        />

        {/* 4) Pros & Cons */}
        <ProsConsSection
          pros={formData.pros}
          cons={formData.cons}
          onChangePros={(e) => updateField("pros", e.target.value)}
          onChangeCons={(e) => updateField("cons", e.target.value)}
        />

        {/* 5) Media */}
        <MediaUploader
          label="Attach Media"
          subLabel="(optional)"
          accept={["image/*", "video/*"]}
          multiple
          maxFiles={5}
          onChange={(files) => updateField("media", files)}
          preview
          viewMode="grid"
          defaultFiles={formData.media || []}
        />

        {/* 6) Anonymity */}
        <AnonymityToggle
          enabled={formData.anonymous}
          onChange={(val) => updateField("anonymous", val)}
        />

        {/* 7) Submit button */}
        <div className="pt-4">
          <Button
            type="submit"
            variant="gradient"
            size="md"
            isLoading={isLoading}
            loadingText="Submitting..."
            disabled={isDisabled}
            className="w-full md:w-auto"
          >
            {isLoading ? "Submitting..." : "Submit Review"}
          </Button>
        </div>
      </form>
    </div>
  );
}

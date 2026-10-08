"use client";

import React from "react";
import { InputField } from "../forms/fields/InputField";

/**
 * ProsConsSection
 *
 * Renders two InputFields for “Pros” and “Cons”, leveraging the shared
 * InputField component to handle labels, hints, errors, and styling.
 */
export default function ProsConsSection({
  pros,
  cons,
  onChangePros,
  onChangeCons,
}) {
  return (
    <div className="grid md:grid-cols-2 gap-4">
      {/* Pros input (optional) */}
      <InputField
        label="Pros"
        name="pros"
        placeholder="What did you like?"
        required={false}
        showHint
        hintText="List any advantages or highlights (optional)."
        value={pros}
        onChange={onChangePros}
      />

      {/* Cons input (optional) */}
      <InputField
        label="Cons"
        name="cons"
        placeholder="What could be improved?"
        required={false}
        showHint
        hintText="List any drawbacks or areas for improvement (optional)."
        value={cons}
        onChange={onChangeCons}
      />
    </div>
  );
}

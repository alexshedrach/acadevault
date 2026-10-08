"use client";

import React from "react";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { hireWriterSteps } from "@/data/stepsData";
import WriterStepCard from "./WriterStepCard";

export default function HowItWorksGrid() {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const steps = hireWriterSteps;
  const mid = Math.ceil(steps.length / 2);

  // On mobile show single column, otherwise two columns
  const left = steps.slice(0, mid);
  const right = steps.slice(mid);

  if (isMobile) {
    return (
      <div className="space-y-6">
        {steps.map((step, idx) => (
          <WriterStepCard key={idx} step={step} index={idx} />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-6 gap-y-6">
      <div className="space-y-6">
        {left.map((step, idx) => (
          <WriterStepCard key={idx} step={step} index={idx} />
        ))}
      </div>
      <div className="space-y-6">
        {right.map((step, idx) => (
          <WriterStepCard key={idx + mid} step={step} index={idx + mid} />
        ))}
      </div>
    </div>
  );
}

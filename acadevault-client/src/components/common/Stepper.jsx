"use client";

import { motion } from "framer-motion";
import { cn } from "@/utils/cn";

export function Stepper({ steps, currentStep, onStepClick, className }) {
  return (
    <nav
      className={cn("flex items-center justify-between", className)}
      aria-label="Form progress"
    >
      {steps.map((step, index) => (
        <div key={step.id} className="flex-1 text-center">
          <motion.button
            onClick={() => onStepClick(index)}
            className={cn(
              "relative px-4 py-2 text-sm font-semibold rounded-lg transition-all",
              currentStep === index
                ? "bg-blue-600 text-white shadow-md"
                : index < currentStep
                ? "bg-green-100 text-green-700"
                : "bg-gray-100 text-gray-400 cursor-not-allowed"
            )}
            aria-current={currentStep === index ? "step" : undefined}
            aria-disabled={index > currentStep}
            disabled={index > currentStep}
            whileHover={index <= currentStep ? { scale: 1.05 } : {}}
            whileTap={index <= currentStep ? { scale: 0.95 } : {}}
          >
            {step.label}
            {currentStep === index && (
              <motion.span
                className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600"
                layoutId="stepper-underline"
              />
            )}
          </motion.button>
          {index < steps.length - 1 && (
            <div
              className={cn(
                "h-1 flex-1 mx-2",
                index < currentStep ? "bg-green-500" : "bg-gray-200"
              )}
            />
          )}
        </div>
      ))}
    </nav>
  );
}

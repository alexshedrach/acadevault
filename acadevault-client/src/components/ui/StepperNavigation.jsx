/**
 * StepperNavigation.jsx
 * A modern, accessible, and reusable navigation component for multi-step forms.
 * Features smooth animations, responsive design, and progress indicators.
 * Tracks user interactions for analytics and ensures accessibility compliance.
 */
import { useEffect } from "react";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { trackEvent } from "@/utils/analytics";
import { cn } from "@/utils/cn";

export default function StepperNavigation({
  steps,
  activeStep,
  onStepChange,
  validateStep,
}) {
  /**
   * Handles step navigation with validation and analytics tracking.
   * @param {string} stepId - The ID of the step to navigate to.
   */
  const handleStepClick = (stepId) => {
    if (validateStep(activeStep)) {
      onStepChange(stepId);
      trackEvent("switch_to_step", { step: stepId });
    }
  };

  // Track initial step load
  useEffect(() => {
    trackEvent("view_step", { step: activeStep });
  }, [activeStep]);

  return (
    <nav
      aria-label="Multi-step form progress"
      className="relative mb-8 bg-gradient-to-b from-white to-gray-50 px-4 py-3 sm:px-4 md:px-8 rounded-t-lg shadow-sm"
    >
      {/* Progress Bar Background */}
      <div className="absolute top-0 left-0 w-full h-1">
        <motion.div
          className="h-full bg-blue-600"
          initial={{ width: 0 }}
          animate={{
            width: `${
              ((steps.findIndex((s) => s.id === activeStep) + 1) /
                steps.length) *
              100
            }%`,
          }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        />
      </div>

      {/* Stepper Steps */}
      <ol className="flex justify-between items-center gap-2 sm:gap-4 flex-wrap max-w-5xl mx-auto">
        {steps.map((step, index) => {
          const currentStepIndex = steps.findIndex((s) => s.id === activeStep);
          const isStepAccessible = index <= currentStepIndex;
          const isStepCompleted = index < currentStepIndex;
          const isActive = activeStep === step.id;

          return (
            <li
              key={step.id}
              className="relative flex-1 min-w-[100px] text-center"
            >
              <button
                type="button"
                onClick={() => handleStepClick(step.id)}
                disabled={!isStepAccessible}
                className={cn(
                  "relative flex flex-col items-center gap-2 w-full py-3 px-2 rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
                  isActive
                    ? "bg-blue-100 text-blue-900"
                    : isStepAccessible
                    ? "bg-gray-100 text-gray-900 hover:bg-gray-200"
                    : "bg-gray-100 text-gray-400 cursor-not-allowed opacity-70"
                )}
                aria-current={isActive ? "step" : undefined}
                aria-label={`Go to step ${step.label}`}
                // title={step.description}
              >
                {/* Step Indicator */}
                <motion.span
                  className={cn(
                    "w-8 h-8 flex items-center justify-center rounded-full text-sm font-semibold",
                    isActive
                      ? "bg-blue-600 text-white"
                      : isStepCompleted
                      ? "bg-green-500 text-white"
                      : isStepAccessible
                      ? "bg-gray-300 text-gray-700"
                      : "bg-gray-200 text-gray-500"
                  )}
                  animate={{ scale: isActive ? 1.1 : 1 }}
                  transition={{ duration: 0.2 }}
                >
                  {isStepCompleted ? (
                    <CheckCircle2 className="w-5 h-5" aria-hidden="true" />
                  ) : (
                    index + 1
                  )}
                </motion.span>

                {/* Step Label */}
                <span
                  className={cn(
                    "text-xs sm:text-sm font-medium",
                    isActive ? "text-blue-900" : "text-gray-600"
                  )}
                >
                  {step.label}
                </span>

                {/* Step Description (Hidden on small screens) */}
                {/* <AnimatePresence>
                  {isActive && (
                    <motion.span
                      className="hidden sm:block text-xs text-gray-500 mt-1"
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      {step.description}
                    </motion.span>
                  )}
                </AnimatePresence> */}
              </button>

              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div
                  className="hidden sm:block absolute top-4 -right-4 w-8 h-0.5 bg-gray-300"
                  aria-hidden="true"
                >
                  <motion.div
                    className="h-full bg-blue-600"
                    initial={{ width: isStepCompleted ? "100%" : 0 }}
                    animate={{ width: isStepCompleted ? "100%" : 0 }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

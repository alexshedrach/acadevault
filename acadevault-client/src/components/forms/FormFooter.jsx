"use client";

import { Button } from "@/components/ui/Button";
import { Loader2, HelpCircle, Save } from "lucide-react";
import { cn } from "@/utils/cn";
import Link from "next/link";
import { motion } from "framer-motion";
import Tooltip from "@/components/ui/Tooltip";
import { useWatch } from "react-hook-form";

export default function FormFooter({
  activeStep,
  onPrevious,
  onNext,
  isSubmitting,
  captchaToken,
  user,
  onSaveDraft,
  steps,
  control,
}) {
  const isLast = activeStep === steps[steps.length - 1].id;
  const termsChecked = useWatch({ control, name: "terms" });

  const rightDisabled =
    isSubmitting || (isLast && (!termsChecked || (!user && !captchaToken)));

  const tooltip = isLast
    ? !termsChecked
      ? "You must agree to the terms and conditions."
      : !user && !captchaToken
      ? "Please complete the CAPTCHA verification."
      : null
    : null;

  return (
    <motion.footer
      className="bg-white border-t border-gray-200 py-6 px-4 sm:px-6 lg:px-8 mt-12 shadow-sm"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-6 sm:gap-8">
        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
          {!isLast && (
            <Tooltip
              content="Save your progress to resume later."
              id="save-draft-tooltip"
            >
              <Button
                onClick={onSaveDraft}
                variant="outline"
                disabled={isSubmitting}
                className="w-full sm:w-auto min-w-[140px] py-2 px-4 flex items-center justify-center"
              >
                <Save className="w-4 h-4 mr-2" />
                Save Draft
              </Button>
            </Tooltip>
          )}

          <Button
            onClick={onPrevious}
            variant="outline"
            disabled={isSubmitting}
            className="w-full sm:w-auto min-w-[140px] py-2 px-4"
          >
            {activeStep === steps[0].id ? "Cancel" : "Back"}
          </Button>
        </div>

        <div className="flex items-center gap-4 justify-end flex-shrink-0">
          <Tooltip
            content={tooltip}
            id="confirm-tooltip"
            isOpen={!!tooltip && rightDisabled}
          >
            <Button
              onClick={onNext}
              disabled={rightDisabled}
              variant="default"
              className="w-full sm:w-auto min-w-[180px] py-2 px-4 flex items-center justify-center"
            >
              {isSubmitting && isLast ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  Submitting...
                </>
              ) : isLast ? (
                "Confirm Order"
              ) : (
                "Next"
              )}
            </Button>
          </Tooltip>

          <Tooltip content="Contact our support team" id="help-link-tooltip">
            <Link
              href="/support"
              className={cn(
                "flex items-center justify-center w-10 h-10 rounded-md hover:bg-blue-100 transition-colors",
                isSubmitting && "opacity-60 pointer-events-none"
              )}
              aria-label="Contact support"
            >
              <HelpCircle className="w-5 h-5 text-blue-600" />
            </Link>
          </Tooltip>
        </div>
      </div>
    </motion.footer>
  );
}



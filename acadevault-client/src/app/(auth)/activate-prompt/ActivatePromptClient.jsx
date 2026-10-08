"use client";

import ResendActivationForm from "@/components/forms/ResendActivationForm";
import { useRegister } from "@/hooks/useRegister";
import { CheckCircleIcon } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";

export default function ActivatePromptClient() {
  const { registrationMessage, clearRegistrationMessage } = useRegister();

  useEffect(() => {
    clearRegistrationMessage();
  }, [clearRegistrationMessage]);

  return (
    <section
      className="w-full max-w-md bg-white rounded-lg shadow-md p-6 space-y-6"
      aria-live="polite"
    >
      <div className="flex flex-col items-center space-y-2">
        <CheckCircleIcon
          className="h-12 w-12 text-green-500"
          aria-hidden="true"
        />
        <h1
          id="activation-success-title"
          className="text-2xl font-bold text-gray-800 text-center"
        >
          Registration Successful
        </h1>
      </div>

      <p className="text-sm text-center text-gray-700">
        {registrationMessage ||
          "Almost there! Please check your email inbox and click the activation link to verify your account."}
      </p>

      <div className="border-t-2 border-gray-300 pt-4 space-y-4">
        <p className="text-sm text-gray-600 text-center">
          Didn’t receive the activation email? Enter your email below and we’ll
          send it again.
        </p>
        <ResendActivationForm />
      </div>

      <div className="flex flex-col justify-between items-center gap-2 text-center pt-4 border-t border-gray-300 text-sm text-gray-500">
        Already activated?{" "}
        <Link
          href="/login"
          className="text-sm font-medium text-blue-600 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
        >
          ← Back to Login
        </Link>
      </div>
    </section>
  );
}

"use client";

import ResendActivationForm from "@/components/forms/ResendActivationForm";
import AlertBox from "@/components/ui/AlertBox";
import useActivateAccount from "@/hooks/useActivateAccount";

import { AlertCircleIcon, CheckCircleIcon } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

export default function ActivateAccountClient() {
  const router = useRouter();
  const { token } = useParams();
  const hasActivated = useRef(false);

  const {
    activate,
    isActivating,
    activationError,
    activationMessage,
    clearActivationState,
  } = useActivateAccount();

  useEffect(() => {
    clearActivationState();
  }, [clearActivationState]);

  useEffect(() => {
    if (!token || hasActivated.current) return;
    hasActivated.current = true;

    (async () => {
      const res = await activate(token);
      if (res.success) {
        setTimeout(() => router.push("/login"), 3500);
      }
    })();
  }, [token, activate, router]);

  const isExpired =
    activationError?.toLowerCase().includes("expired") ||
    activationError?.toLowerCase().includes("invalid") ||
    activationError?.toLowerCase().includes("token");

  return (
    <section className="w-full max-w-md bg-white rounded-lg shadow-md p-6 space-y-6">
      <div className="flex flex-col items-center space-y-2">
        {activationError ? (
          <AlertCircleIcon className="w-12 h-12 text-red-500" />
        ) : (
          <CheckCircleIcon className="w-12 h-12 text-green-500" />
        )}

        <h1
          id="activation-title"
          className="text-2xl font-bold text-gray-800 text-center"
        >
          {activationError ? "Activation Failed" : "Account Activation"}
        </h1>
      </div>

      <div role="status" aria-live="polite" className="space-y-4">
        {isActivating && (
          <AlertBox
            status="info"
            title="Verifying Account"
            message="🔄 Please wait while we confirm your activation token…"
            compact
            center
          />
        )}

        {!isActivating && activationError && (
          <>
            <AlertBox
              status="error"
              title="Activation Failed"
              message={activationError}
              compact
              center
            />

            {isExpired && (
              <div className="space-y-4 pt-2">
                <p className="text-sm text-gray-600  text-center">
                  Didn’t receive the activation email? Enter your email below
                  and we’ll send it again.
                </p>
                <ResendActivationForm />
              </div>
            )}
          </>
        )}

        {!isActivating && activationMessage && (
          <AlertBox
            status="success"
            title="🎉 Success"
            message={activationMessage}
            autoDismiss
            center
            compact
          />
        )}
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

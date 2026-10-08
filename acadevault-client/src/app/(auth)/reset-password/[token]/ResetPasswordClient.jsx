"use client";

import { useParams } from "next/navigation";
import ResetPasswordForm from "@/components/forms/ResetPasswordForm";
import AlertBox from "@/components/ui/AlertBox";
import Image from "next/image";
import Link from "next/link";

export default function ResetPasswordClient() {
  const { token } = useParams();

  if (!token) {
    return (
      <div className="max-w-sm w-full bg-white shadow rounded-lg p-6 space-y-4 text-center">
        <AlertBox
          status="error"
          message="The reset link is invalid or has expired. Please request a new password reset link."
        />
        <Link
          href="/forgot-password"
          className="text-blue-600 hover:underline text-sm"
        >
          ← Request a new reset link
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-8 space-y-6 animate-fade-in">
      {/* Header Branding */}
      <Link
        href="/"
        className="flex items-center justify-center space-x-3 group"
        aria-label="Back to homepage"
      >
        <Image
          src="/images/acadevault-logo.png"
          alt="AcadeVault Logo"
          width={48}
          height={48}
          className="rounded-lg transition-transform duration-200 group-hover:scale-110"
          priority
        />
        <h1 className="text-2xl font-extrabold tracking-tight bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Reset Your Password
        </h1>
      </Link>

      <p className="text-sm text-gray-600 text-center">
        Create a new password to regain access to your account.
      </p>

      <ResetPasswordForm token={token} />

      <footer className="pt-4 border-t text-center text-xs text-gray-400">
        Need help?{" "}
        <Link href="/contact" className="text-blue-600 hover:underline">
          Contact support
        </Link>
      </footer>
    </div>
  );
}

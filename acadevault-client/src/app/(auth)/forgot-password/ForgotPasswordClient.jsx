"use client";

import ForgotPasswordForm from "@/components/forms/ForgotPasswordForm";
import Image from "next/image";
import Link from "next/link";

export default function ForgotPasswordClient() {
  return (
    <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 space-y-6">
      {/* Branding */}
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
          className="rounded-xl transition-transform duration-200 group-hover:scale-110"
          priority
        />
        <h1 className="text-2xl font-extrabold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent tracking-tight">
          Recover your Password
        </h1>
      </Link>

      <p className="text-sm text-gray-600 text-center">
        To recover your password, enter your email below and submit. An email
        will be sent to you with instructions about how to complete the process.
      </p>

      {/* Form */}
      <ForgotPasswordForm />

      <p className="text-sm text-center text-gray-600 mt-4">
        Remember your password?{" "}
        <Link
          href="/login"
          className="text-blue-600 hover:underline font-medium"
        >
          Sign in
        </Link>
      </p>
    </div>
  );
}

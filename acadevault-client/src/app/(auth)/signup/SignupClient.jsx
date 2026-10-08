"use client";

import Image from "next/image";
import Link from "next/link";
import SignupForm from "@/components/forms/SignupForm";
import OAuthButton from "@/components/common/OAuthButton";
import { FcGoogle } from "react-icons/fc";
import { FaGithub, FaMicrosoft } from "react-icons/fa";

export default function SignupClient() {
  return (
    <div className="flex flex-col md:flex-row bg-gray-50">
      {/* Left Panel: Illustration + OAuth */}
      <section className="hidden md:flex w-1/2 flex-col justify-center items-center bg-gradient-to-br from-purple-50 to-blue-50 px-10 py-12 shadow-inner">
        <>
          <Image
            src="/images/acadevault-signup-illustration.png"
            alt="Illustration"
            width={400}
            height={300}
            className="mx-auto rounded-md shadow-md"
            priority
          />

          <div className="mt-8">
            <p className="text-sm text-gray-600 font-medium mb-4">
              Or sign up with
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <OAuthButton icon={<FcGoogle size={20} />} label="Google" />
              <OAuthButton icon={<FaGithub size={20} />} label="GitHub" />
              <OAuthButton
                icon={<FaMicrosoft size={20} className="text-blue-700" />}
                label="Microsoft"
              />
            </div>
          </div>
        </>
      </section>

      {/* Right Panel: Signup Form */}
      <section className="w-full md:w-1/2 flex flex-col justify-center px-6 sm:px-12 py-10 bg-white">
        <div className="max-w-md w-full mx-auto">
          <Link
            href="/"
            className="inline-flex items-center space-x-3 mb-8 group"
            aria-label="Back to homepage"
          >
            <Image
              src="/images/acadevault-logo.png"
              alt="AcadeVault Logo"
              width={52}
              height={52}
              className="rounded-xl transition-transform duration-200 group-hover:scale-110"
              priority
            />
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Create an Account
            </h1>
          </Link>

          <SignupForm />

          <p className="mt-6 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-blue-600 hover:underline font-medium"
            >
              Sign In
            </Link>
          </p>
        </div>
      </section>
    </div>
  );
}

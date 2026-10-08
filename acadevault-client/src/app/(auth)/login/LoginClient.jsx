import { LoginForm } from "@/components/forms/LoginForm";
import Image from "next/image";
import Link from "next/link";

export default function LoginClient() {
  return (
    <div className="flex">
      {/* Left Column: Form Area */}
      <section className="w-full md:w-1/2 flex flex-col justify-center px-6 sm:px-12 bg-white rounded-xl shadow-lg py-6">
        <div className="max-w-md w-full mx-auto">
          {/* Branding */}
          <Link
            href="/"
            className="inline-flex items-center space-x-3 mb-10 group"
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
            <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Welcome Back!
            </h1>
          </Link>

          {/* Login Form */}
          <LoginForm />

          {/* Sign up CTA */}
          <p className="mt-6 text-center text-sm text-gray-600">
            Don’t have an account?{" "}
            <Link
              href="/signup"
              className="text-blue-600 hover:underline font-medium"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </section>

      {/* Right Column: Visual + Info */}
      <section className="hidden md:flex w-1/2 flex-col justify-center items-center bg-gradient-to-br from-blue-50 to-purple-50 px-8 rounded-xl shadow-lg">
        <div className="max-w-md text-center">
          {/* <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Access Premium Academic Resources
          </h2> */}
          <p className="text-gray-600 mb-6">
            Log in to AcadeVault to securely store, access, and manage your
            academic materials all in one place.
          </p>

          <Image
            src="/images/acadevault-login-illustration.png" // ✅ Replace with your actual image
            alt="Login Illustration"
            width={400}
            height={300}
            className="mx-auto rounded-md shadow-md"
          />
        </div>
      </section>
    </div>
  );
}

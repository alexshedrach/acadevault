"use client";

import React from "react";
import { useRedirectIfAuthenticated } from "@/hooks/useRedirectIfAuthenticated";
import Loader from "@/components/ui/Loader";
import Image from "next/image";

import bgImage from "../../../public/images/auth-illustration.png";

export default function AuthLayout({ children }) {
  const { isLoading } = useRedirectIfAuthenticated();

  if (isLoading) return <Loader withSkeleton={true} />;

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-4 py-4 sm:px-6 lg:px-8">
      {/* Background image */}
      <div className="absolute inset-0 -z-10">
        <Image
          src={bgImage}
          alt="Background image"
          fill
          priority
          className="object-cover w-full h-full"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" />
      </div>
      <>{children}</>
    </section>
  );
}

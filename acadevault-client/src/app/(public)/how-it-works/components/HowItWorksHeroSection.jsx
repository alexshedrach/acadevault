"use client";

import React, { useState } from "react";
import { BookOpen } from "lucide-react";
import Banner from "@/components/ui/Banner";
import { useReducedMotion } from "framer-motion";

const HowItWorksHeroSection = () => {
  const prefersReducedMotion = useReducedMotion();
  const [locale, setLocale] = useState("en"); // Basic i18n support

  return (
    <>
      <Banner
        titleLine1="How Acadavault Works"
        titleLine2=""
        subtitle="Discover how Acadavault empowers students, researchers, and academics to access, share, and create trusted academic materials."
        badgeText="Trusted by 10K+ Academics"
        ctaText="Get Started"
        ctaHref="/signup"
        gradientFrom="rgba(30, 58, 138, 0.96)"
        gradientTo="rgba(79, 70, 229, 0.86)"
        overlayOpacity={80}
        backgroundImage="/images/acadevault-logo.png"
        backgroundAlt="Academic journey background"
        textAlignment="center"
        buttonAlignment="center"
        enableAnimation={!prefersReducedMotion}
        maxWidth="max-w-4xl"
        padding="px-4 sm:px-6 md:px-8"
        headingSize="text-2xl sm:text-3xl md:text-4xl lg:text-5xl"
        showCTA={true}
        customHeader={
          <div className="flex justify-center items-center gap-2 mb-4">
            <BookOpen className="w-10 h-10 text-yellow-400" />
          </div>
        }
        tagline={
          locale === "en"
            ? "Empowering academic success since 2023"
            : "Apoyando el éxito académico desde 2023"
        }
        ctaButtons={[
          {
            label: "Explore Features",
            href: "/features",
            variant: "secondary",
            target: "_self",
          },
        ]}
        className="py-12 rounded-xl"
      />
    </>
  );
};

export default HowItWorksHeroSection;

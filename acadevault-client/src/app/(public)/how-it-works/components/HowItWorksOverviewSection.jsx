"use client";

import { academicSteps, HowItWorksFeatureCards } from "@/data/stepsData";
import { cn } from "@/utils/cn";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import AcademicJourneyHeader from "./AcademicJourneyHeader";



// Animation variants
const sectionVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.6, staggerChildren: 0.2 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  hover: {
    scale: 1.05,
    boxShadow: "0 10px 20px rgba(0, 0, 0, 0.1)",
    transition: { duration: 0.3 },
  },
};

const stepVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
};

const OverviewSection = () => {
  const prefersReducedMotion = useReducedMotion();
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);
  const [locale, setLocale] = useState("en"); // Basic i18n support

  // Client-side mount check
  useEffect(() => {
    setIsMounted(true);
    // Mock i18n detection (replace with real i18n library like next-intl)
    const userLocale = navigator.language.split("-")[0] || "en";
    setLocale(userLocale);
  }, []);

  // Analytics tracking
  useEffect(() => {
    if (isMounted) {
      console.log("OverviewSection viewed", { page: "/overview", locale });
    }
  }, [isMounted, locale]);

  const handleCTAClick = (label, href) => {
    consoleayosconsole.log("Feature CTA clicked", { label, href });
    router.push(href);
  };

  if (!isMounted) return null;

  return (
    <section className="py-16 bg-gray-50">
      {/* Heading */}
      <AcademicJourneyHeader />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Feature Cards */}
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
          className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
        >
          {HowItWorksFeatureCards.map((feature, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={prefersReducedMotion ? {} : "hover"}
              className={cn(
                "relative group bg-white rounded-xl shadow-lg overflow-hidden",
                "transition-all duration-300 hover:shadow-xl"
              )}
              role="region"
              aria-labelledby={`feature-title-${index}`}
            >
              <div className="relative h-48 w-full">
                <Image
                  src={feature.image}
                  alt={feature.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>
              <div className="p-6 flex flex-col items-center text-center space-y-4">
                <feature.icon
                  className="w-8 h-8 text-blue-600"
                  aria-hidden="true"
                />
                <h3
                  id={`feature-title-${index}`}
                  className="text-xl font-semibold text-gray-800"
                >
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-base">{feature.description}</p>
                <button
                  onClick={() =>
                    handleCTAClick(feature.cta.label, feature.cta.href)
                  }
                  className={cn(
                    "inline-flex items-center gap-2 px-4 py-2 rounded-full",
                    "bg-blue-600 text-white text-sm font-medium",
                    "hover:bg-blue-700 transition-colors duration-200"
                  )}
                  aria-label={feature.cta.label}
                >
                  {feature.cta.label}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Condensed Steps Section */}
        <div className="space-y-8">
          <h2 className="text-3xl font-semibold text-gray-800 text-center">
            Simple Steps
          </h2>
          <motion.div
            variants={sectionVariants}
            initial="hidden"
            animate="visible"
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
          >
            {academicSteps.map((step, index) => (
              <motion.div
                key={step.id}
                variants={stepVariants}
                className="flex flex-col items-center text-center p-4 rounded-lg bg-white shadow-md hover:shadow-lg transition-shadow"
                role="region"
                aria-labelledby={`step-title-${index}`}
              >
                <div className="w-12 h-12 mb-4 flex items-center justify-center rounded-full bg-blue-100">
                  <step.icon
                    className="w-6 h-6 text-blue-600"
                    aria-hidden="true"
                  />
                </div>
                <h3
                  id={`step-title-${index}`}
                  className="text-lg font-semibold text-gray-800"
                >
                  {step.title}
                </h3>
                <p className="text-gray-600 text-sm mt-2">{step.description}</p>
                <Link
                  href={step.href}
                  className="mt-4 text-blue-600 hover:underline text-sm font-semibold"
                  aria-label={`Learn more about ${step.title}`}
                  onClick={() => handleCTAClick(step.title, step.href)}
                >
                  Learn More
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Final CTA */}
        {/* <div className="text-center mt-12">
          <h4 className="text-2xl font-semibold text-gray-800 mb-4">
            {locale === "en"
              ? "Ready to Transform Your Academic Experience?"
              : "¡Listo para transformar tu experiencia académica?"}
          </h4>
          <Link
            href="/signup"
            className={cn(
              "inline-flex items-center gap-2 px-8 py-3 rounded-full",
              "bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-lg font-semibold",
              "hover:from-blue-700 hover:to-indigo-700 transition-all duration-300"
            )}
            aria-label={
              locale === "en"
                ? "Join AcadeVault now"
                : "Únete a AcadeVault ahora"
            }
            onClick={() =>
              console.log("Join Now CTA clicked", { href: "/signup" })
            }
          >
            {locale === "en"
              ? "Join AcadeVault Now"
              : "Únete a AcadeVault Ahora"}
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div> */}
      </div>
    </section>
  );
};

export default OverviewSection;

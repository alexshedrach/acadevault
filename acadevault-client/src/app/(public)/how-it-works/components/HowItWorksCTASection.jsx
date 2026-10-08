"use client";

import React, { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, BookOpen, PenTool, Briefcase } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { cn } from "@/utils/cn";
import SectionHeader from "@/components/common/SectionHeader";

// CTA options for AcadeVault
const ctaOptions = [
  {
    label: "Hire a Writer Now",
    href: "/hire-writer/start",
    icon: PenTool,
    variant: "gradient",
    esLabel: "Contrata un Escritor Ahora",
  },
  {
    label: "Browse Resources",
    href: "/resources",
    icon: BookOpen,
    variant: "secondary",
    esLabel: "Explora Recursos",
  },
  {
    label: "Start Selling Materials",
    href: "/sell",
    icon: Briefcase,
    variant: "tertiary",
    esLabel: "Comienza a Vender Materiales",
  },
];

// Animation variants
const sectionVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.6, staggerChildren: 0.2 },
  },
};

const ctaVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  hover: {
    scale: 1.05,
    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.1)",
    transition: { duration: 0.3 },
  },
};

const HowItWorksCTASection = () => {
  const prefersReducedMotion = useReducedMotion();
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);
  const [locale, setLocale] = useState("en");

  // Client-side mount and locale detection
  useEffect(() => {
    setIsMounted(true);
    const userLocale = navigator.language.split("-")[0] || "en";
    setLocale(userLocale);
  }, []);

  // Analytics tracking
  useEffect(() => {
    if (isMounted) {
      console.log("HowItWorksCTASection viewed", {
        page: "/how-it-works",
        locale,
      });
    }
  }, [isMounted, locale]);

  const handleCTAClick = (label, href) => {
    console.log("CTA clicked", { label, href });
    router.push(href);
  };

  if (!isMounted) return null;

  return (
    <section className="py-16 bg-gradient-to-b from-white to-blue-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <SectionHeader
          title={
            <>
              {locale === "en" ? "Take the Next Step" : "Da el Siguiente Paso"}{" "}
              <span className="text-blue-600">with AcadeVault</span>
            </>
          }
          description={
            locale === "en"
              ? "Ready to transform your academic journey? Whether you need custom content, high-quality resources, or a platform to monetize your materials, AcadeVault has you covered."
              : "¿Listo para transformar tu viaje académico? Ya sea que necesites contenido personalizado, recursos de alta calidad o una plataforma para monetizar tus materiales, AcadeVault te respalda."
          }
          icon={<BookOpen className="w-8 h-8" />}
          iconPosition="top"
          variant="primary"
          align="center"
          size="xl"
          maxWidth="4xl"
          headingLevel="h2"
          headingClassName="font-extrabold"
          descriptionClassName="text-gray-600"
          className="py-8"
          animate={!prefersReducedMotion}
        />

        {/* Final CTA */}
        <div className="text-center mt-12">
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
        </div>
      </div>
    </section>
  );
};

export default HowItWorksCTASection;

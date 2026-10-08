"use client";

import React, { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  ShieldCheck,
  Lock,
  FileCheck,
  Key,
  CreditCard,
  UserCheck,
  CheckCircle,
  Eye,
  Zap,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { cn } from "@/utils/cn";
import SectionHeader from "@/components/common/SectionHeader";
import Banner from "@/components/ui/Banner";

// Enhanced security features for AcadeVault
const securityFeatures = [
  {
    id: 1,
    title: "End-to-End Encryption",
    description:
      "All data transfers are secured with HTTPS/TLS 1.3, ensuring your information remains confidential.",
    icon: Lock,
    image: "/images/encryption.jpg",
    alt: "Data encryption illustration",
  },
  {
    id: 2,
    title: "Digital Watermarking",
    description:
      "Protects your academic materials from unauthorized sharing with unique, traceable watermarks.",
    icon: FileCheck,
    image: "/images/watermarking.jpg",
    alt: "Digital watermarking process",
  },
  {
    id: 3,
    title: "Plagiarism Detection",
    description:
      "Advanced tools verify the originality of all uploaded content, ensuring academic integrity.",
    icon: CheckCircle,
    image: "/images/plagiarism-check.jpg",
    alt: "Plagiarism detection interface",
  },
  {
    id: 4,
    title: "Two-Factor Authentication",
    description:
      "Enhance account security with 2FA, requiring a second verification step for login.",
    icon: Key,
    image: "/images/2fa.jpg",
    alt: "Two-factor authentication setup",
  },
  {
    id: 5,
    title: "Secure Payment Gateways",
    description:
      "PCI-DSS compliant payment systems protect your financial transactions.",
    icon: CreditCard,
    image: "/images/secure-payment.jpg",
    alt: "Secure payment processing",
  },
  {
    id: 6,
    title: "GDPR Compliance",
    description:
      "Your personal data is safeguarded under strict GDPR regulations for privacy protection.",
    icon: UserCheck,
    image: "/images/gdpr-compliance.jpg",
    alt: "GDPR compliance badge",
  },
  {
    id: 7,
    title: "Content Access Controls",
    description:
      "Granular permissions ensure only authorized users can access your materials.",
    icon: Eye,
    image: "/images/access-control.jpg",
    alt: "Content access control settings",
  },
  {
    id: 8,
    title: "Regular Security Audits",
    description:
      "Independent audits and penetration testing keep our platform secure and up-to-date.",
    icon: Zap,
    image: "/images/security-audit.jpg",
    alt: "Security audit process",
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

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  hover: {
    scale: 1.05,
    boxShadow: "0 12px 24px rgba(0, 0, 0, 0.15)",
    transition: { duration: 0.3 },
  },
};

const SecurityTrustSection = () => {
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
      console.log("SecurityTrustSection viewed", { page: "/security", locale });
    }
  }, [isMounted, locale]);

  const handleCTAClick = (label, href) => {
    console.log("CTA clicked", { label, href });
    router.push(href);
  };

  if (!isMounted) return null;

  return (
    <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <SectionHeader
          title={
            <>
              Uncompromising{" "}
              <span className="text-blue-600 ml-4">Security & Trust</span>
            </>
          }
          description="At AcadeVault, your data, materials, and privacy are protected with industry-leading security measures, ensuring a safe and trustworthy platform for all your academic needs."
          icon={<ShieldCheck className="w-8 h-8" />}
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

        {/* Security Features */}
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
          className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4"
        >
          {securityFeatures.map((feature, index) => (
            <motion.div
              key={feature.id}
              variants={cardVariants}
              whileHover={prefersReducedMotion ? {} : "hover"}
              className={cn(
                "relative group bg-white rounded-xl shadow-lg overflow-hidden",
                "transition-all duration-300"
              )}
              role="region"
              aria-labelledby={`feature-title-${index}`}
            >
              {/* Feature Image */}
              <div className="relative h-32 w-full">
                <Image
                  src={feature.image}
                  alt={feature.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 25vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  loading={index < 4 ? "eager" : "lazy"}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              </div>

              {/* Feature Content */}
              <div className="p-6 flex flex-col items-center text-center space-y-4">
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-blue-100">
                  <feature.icon
                    className="w-6 h-6 text-blue-600"
                    aria-hidden="true"
                  />
                </div>
                <h3
                  id={`feature-title-${index}`}
                  className="text-lg font-semibold text-gray-800"
                >
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
                <Link
                  href={`/security/feature-${feature.id}`}
                  className="text-blue-600 hover:underline text-sm font-semibold"
                  aria-label={`Learn more about ${feature.title}`}
                  onClick={() =>
                    handleCTAClick(
                      feature.title,
                      `/security/feature-${feature.id}`
                    )
                  }
                >
                  Learn More
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Final Call-to-Action */}
        {/* <div className="text-center mt-12">
          <h4 className="text-2xl font-semibold text-gray-800 mb-4">
            {locale === "en"
              ? "Trust AcadeVault with Your Academic Journey"
              : "Confía en AcadeVault para tu viaje académico"}
          </h4>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/security"
              className={cn(
                "inline-flex items-center gap-2 px-8 py-3 rounded-full",
                "bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-lg font-semibold",
                "hover:from-blue-700 hover:to-indigo-700 transition-all duration-300"
              )}
              aria-label={
                locale === "en"
                  ? "Explore Security Features"
                  : "Explora funciones de seguridad"
              }
              onClick={() =>
                handleCTAClick("Explore Security Features", "/security")
              }
            >
              {locale === "en"
                ? "Explore Security Features"
                : "Explora Funciones de Seguridad"}
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/security-whitepaper"
              className={cn(
                "inline-flex items-center gap-2 px-8 py-3 rounded-full",
                "bg-gray-200 text-gray-800 text-lg font-semibold",
                "hover:bg-gray-300 transition-all duration-300"
              )}
              aria-label={
                locale === "en"
                  ? "Download Whitepaper"
                  : "Descarga el informe técnico"
              }
              onClick={() =>
                handleCTAClick("Download Whitepaper", "/security-whitepaper")
              }
            >
              {locale === "en"
                ? "Download Whitepaper"
                : "Descarga el Informe Técnico"}
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div> */}
      </div>
    </section>
  );
};

export default SecurityTrustSection;

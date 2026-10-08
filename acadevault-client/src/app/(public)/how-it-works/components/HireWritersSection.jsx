"use client";

import React, { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  PenTool,
  Users,
  CheckCircle,
  FileText,
  MessageSquare,
  CheckSquare,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { cn } from "@/utils/cn";
import SectionHeader from "@/components/common/SectionHeader";
import Banner from "@/components/ui/Banner";

// Enhanced steps for hiring writers
const hiringSteps = [
  {
    id: 1,
    title: "Submit Project Details",
    description:
      "Specify your topic, word count, deadline, and any special requirements to start your project.",
    icon: PenTool,
    image: "/images/submit-project.jpg",
    alt: "Submitting project details interface",
  },
  {
    id: 2,
    title: "Review Writer Proposals",
    description:
      "Browse proposals from vetted academic experts and select the best match for your needs.",
    icon: FileText,
    image: "/images/review-proposals.jpg",
    alt: "Reviewing writer proposals",
  },
  {
    id: 3,
    title: "Match with a Writer",
    description:
      "Get paired with a qualified writer specializing in your academic field for personalized content.",
    icon: Users,
    image: "/images/writer-match.jpg",
    alt: "Matching with an academic writer",
  },
  {
    id: 4,
    title: "Collaborate with Writer",
    description:
      "Communicate directly with your writer to ensure the content aligns with your vision.",
    icon: MessageSquare,
    image: "/images/collaborate-writer.jpg",
    alt: "Collaborating with writer",
  },
  {
    id: 5,
    title: "Receive Your Content",
    description:
      "Download your plagiarism-free, high-quality content and request revisions if needed.",
    icon: CheckCircle,
    image: "/images/receive-content.jpg",
    alt: "Receiving completed content",
  },
  {
    id: 6,
    title: "Approve and Publish",
    description:
      "Review, approve, and use your content for academic or professional purposes with confidence.",
    icon: CheckSquare,
    image: "/images/approve-publish.jpg",
    alt: "Approving and publishing content",
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

const HireWritersSection = () => {
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
      console.log("HireWritersSection viewed", {
        page: "/hire-writers",
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
    <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <SectionHeader
          title={
            <>
              Hire Expert Writers{" "}
              <span className="text-blue-600 ml-4">
                for Your Academic Success
              </span>
            </>
          }
          description="Connect with vetted academic professionals to create custom, plagiarism-free content tailored to your research, assignments, or publications. Our secure platform ensures a seamless hiring process."
          icon={<PenTool className="w-8 h-8" />}
          iconPosition="top"
          variant="secondary"
          align="center"
          size="xl"
          maxWidth="4xl"
          headingLevel="h2"
          headingClassName="font-extrabold"
          descriptionClassName="text-gray-600 text-base"
          descriptionSizeClasses='md'
          className="py-8"
          animate={!prefersReducedMotion}
        />

        {/* Hiring Steps */}
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
          className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
        >
          {hiringSteps.map((step, index) => (
            <motion.div
              key={step.id}
              variants={cardVariants}
              whileHover={prefersReducedMotion ? {} : "hover"}
              className={cn(
                "relative group bg-white rounded-xl shadow-lg overflow-hidden",
                "transition-all duration-300"
              )}
              role="region"
              aria-labelledby={`step-title-${index}`}
            >
              {/* Step Image */}
              <div className="relative h-40 w-full">
                <Image
                  src={step.image}
                  alt={step.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  loading={index < 3 ? "eager" : "lazy"}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              </div>

              {/* Step Content */}
              <div className="p-6 flex flex-col items-center text-center space-y-4">
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-blue-100">
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
                <p className="text-gray-600 text-sm">{step.description}</p>
                <Link
                  href={`/hire-writer/step-${step.id}`}
                  className="text-blue-600 hover:underline text-sm font-semibold"
                  aria-label={`Learn more about ${step.title}`}
                  onClick={() =>
                    handleCTAClick(step.title, `/hire-writer/step-${step.id}`)
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
              ? "Ready to Create Exceptional Academic Content?"
              : "¡Listo para crear contenido académico excepcional?"}
          </h4>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/hire-writer/start"
              className={cn(
                "inline-flex items-center gap-2 px-8 py-3 rounded-full",
                "bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-lg font-semibold",
                "hover:from-blue-700 hover:to-indigo-700 transition-all duration-300"
              )}
              aria-label={
                locale === "en"
                  ? "Hire a Writer Now"
                  : "Contrata un escritor ahora"
              }
              onClick={() =>
                handleCTAClick("Hire a Writer Now", "/hire-writer/start")
              }
            >
              {locale === "en"
                ? "Hire a Writer Now"
                : "Contrata un Escritor Ahora"}
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/writers"
              className={cn(
                "inline-flex items-center gap-2 px-8 py-3 rounded-full",
                "bg-gray-200 text-gray-800 text-lg font-semibold",
                "hover:bg-gray-300 transition-all duration-300"
              )}
              aria-label={
                locale === "en" ? "Explore Writers" : "Explora Escritores"
              }
              onClick={() => handleCTAClick("Explore Writers", "/writers")}
            >
              {locale === "en" ? "Explore Writers" : "Explora Escritores"}
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div> */}
      </div>
    </section>
  );
};

export default HireWritersSection;

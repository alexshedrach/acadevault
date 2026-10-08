"use client";

import React, { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { BookOpen, Headphones, CheckCircle, ArrowRight } from "lucide-react";

// Animation variants
const containerVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { staggerChildren: 0.2, ease: "easeOut", duration: 0.6 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
  hover: { scale: 1.03, boxShadow: "0 12px 24px rgba(0,0,0,0.1)" },
};

export function VendorSupportSubsection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  // Support options data
  const supportOptions = [
    {
      icon: <BookOpen className="w-8 h-8 text-indigo-600" />,
      title: "Onboarding Guides",
      desc: "Step-by-step tutorials and videos to get you selling in minutes.",
    },
    {
      icon: <Headphones className="w-8 h-8 text-indigo-600" />,
      title: "24/7 Support",
      desc: "Chat, email, or call our dedicated team any time you need help.",
    },
    {
      icon: <CheckCircle className="w-8 h-8 text-indigo-600" />,
      title: "Analytics Dashboard",
      desc: "Track sales, traffic, and earnings in real time with detailed reports.",
    },
  ];

  return (
    <motion.div
      ref={ref}
      role="region"
      aria-labelledby="vendor-support-heading"
      className="bg-gray-100 rounded-2xl shadow-xl p-8 flex flex-col gap-6"
      variants={containerVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
    >
      {/* Section Header */}
      <div className="relative flex items-center gap-3">
        <motion.span
          initial={{ scale: 0 }}
          animate={inView ? { scale: 1 } : { scale: 0 }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 20,
            delay: 0.2,
          }}
          className="p-2 bg-white rounded-full"
        >
          <Headphones className="w-6 h-6 text-indigo-600" />
        </motion.span>
        <h2
          id="vendor-support-heading"
          className="text-3xl font-bold text-gray-800"
        >
          Dedicated Vendor Support
          <span className="absolute bottom-0 left-0 w-16 h-1 bg-gradient-to-r from-indigo-600 to-blue-600 rounded-full" />
        </h2>
      </div>

      <p className="text-gray-600 leading-relaxed max-w-2xl">
        We’re committed to your success—access all the resources and assistance
        you need to grow your academic business.
      </p>

      {/* Support Options Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {supportOptions.map((opt, idx) => (
          <motion.div
            key={idx}
            role="article"
            aria-label={opt.title}
            className="flex flex-col items-center text-center p-6 bg-white rounded-lg border border-gray-200"
            variants={cardVariants}
            whileHover="hover"
          >
            <div className="mb-3">{opt.icon}</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              {opt.title}
            </h3>
            <p className="text-gray-600 text-sm">{opt.desc}</p>
          </motion.div>
        ))}
      </div>

      {/* Dashboard Preview */}
      <motion.div
        className="bg-white rounded-lg overflow-hidden shadow-lg border border-gray-200"
        variants={cardVariants}
        whileHover="hover"
      >
        <div className="relative w-full h-48">
          <Image
            src="/images/academic-img.png"
            alt="Vendor dashboard preview"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h3 className="text-xl font-semibold text-gray-800">
              Preview Your Dashboard
            </h3>
            <p className="text-gray-600 text-sm">
              Explore real-time analytics, sales stats, and material insights.
            </p>
          </div>
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 px-6 py-2 bg-indigo-600 text-white rounded-full font-medium text-sm shadow hover:bg-indigo-700 transition"
            aria-label="Explore vendor dashboard"
          >
            <CheckCircle className="mr-2 w-5 h-5" />
            Explore Dashboard
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </motion.div>
    </motion.div>
  );
}

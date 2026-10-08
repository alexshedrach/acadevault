"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Typewriter } from "react-simple-typewriter";
import { Briefcase } from "lucide-react";
import { EarningPotentialSubsection } from "./EarningPotentialSubsection";
import { SecurityTrustSubsection } from "./SecurityTrustSubsection";
import { VendorSupportSubsection } from "./VendorSupportSubsection";
import SuccessStoriesSubsection from "./SuccessStoriesSubsection";

// Animation for header
const headerVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function VendorAdvantagesSection() {
  return (
    <section
      className="relative py-20 bg-gradient-to-b from-gray-50 to-gray-100 overflow-hidden"
      aria-labelledby="vendor-advantages-heading"
    >
      {/* Decorative shoulder shape */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120vw] h-96 bg-indigo-600/10 rounded-b-full pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={headerVariants}
          className="text-center mb-16 relative z-10"
        >
          <h2
            id="vendor-advantages-heading"
            className="inline-flex items-center justify-center text-4xl sm:text-5xl font-bold text-gray-900 gap-3"
          >
            <Briefcase className="w-10 h-10 text-indigo-600" />
            Why Choose AcadeVault?
          </h2>
          {/* animated underline */}
          <motion.div
            layoutId="underline"
            className="mt-2 h-1 bg-indigo-600 w-24 mx-auto rounded-full"
          />
          <p className="mt-4 text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
            <Typewriter
              words={[
                "Unlock unparalleled earning potential.",
                "Join a trusted global academic platform.",
                "Benefit from world-class support and security.",
              ]}
              loop
              cursor
              cursorStyle="|"
              typeSpeed={70}
              deleteSpeed={50}
              delaySpeed={2000}
            />
          </p>
        </motion.div>

        {/* Custom Responsive Grid */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4 lg:grid-rows-[auto_auto_auto] lg:grid-flow-row-dense">
          {/* Earning Potential spans full width on mobile, 2 cols on desktop */}
          <div className="lg:col-span-4">
            <EarningPotentialSubsection />
          </div>

          {/* Success Stories on right */}
          <div className="lg:col-start-1 lg:col-span-2">
            <SuccessStoriesSubsection />
          </div>

          {/* Security & Trust sits under SuccessStories */}
          <div className="lg:col-start-3 lg:col-span-2 lg:row-start-2">
            <SecurityTrustSubsection />
          </div>

          {/* Vendor Support spans all columns at bottom */}
          <div className="lg:col-span-4">
            <VendorSupportSubsection />
          </div>
        </div>

        {/* Primary CTA */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-12 text-center z-10 relative"
        >
          <Link
            href="/signup/vendors"
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-full font-semibold text-xl shadow-lg hover:from-indigo-700 hover:to-blue-700 transition duration-300"
            aria-label="Start selling on AcadeVault"
          >
            <Briefcase className="mr-2 w-6 h-6" />
            Start Selling Today
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

"use client";

import React from "react";
import { motion } from "framer-motion";
import VBSStats from "./VBSStats";
import VendorBenefitsGrid from "./VendorBenefitsGrid";
import VendorBenefitsCTA from "./VendorBenefitsCTA";
import Counter from "@/components/ui/Counter";
import { Users } from "lucide-react";

/**
 * Root container for the Vendor Benefits section.
 * Assembles header, live stats, benefit cards, and CTAs.
 */
export default function VendorBenefitsSection() {
  return (
    <section className="relative py-16 bg-gradient-to-b from-blue-900 via-indigo-800 to-purple-900 text-white">
      {/* Semi-transparent floating background pattern */}
      <div
        className="absolute inset-0 bg-[url('/images/abstract-pattern.jpg')] bg-cover bg-center opacity-2 pointer-events-none"
        aria-hidden="true"
      />
      {/* <div
        className="absolute inset-0 bg-gradient-to-tr from-black/20 to-transparent pointer-events-none"
        aria-hidden="true"
      /> */}

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-extrabold text-white mb-4">
            Why Sell on <span className="text-green-400">AcadeVault</span>?
          </h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            Turn your academic expertise into earnings. Join thousands of
            sellers on AcadeVault and gain access to a global audience while
            maximizing your revenue.
          </p>
        </motion.div>
        {/* Live Platform Stats (counters) */}
        <VBSStats />

        {/* Grid of Vendor Benefit Cards */}
        <VendorBenefitsGrid />

        {/* Bottom Call-To-Action Buttons */}
        <VendorBenefitsCTA />
      </div>
    </section>
  );
}

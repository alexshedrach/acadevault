"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

/**
 * Renders bottom call-to-action buttons:
 *   • “Start Selling Today” (primary)
 *   • “Explore the Marketplace” (secondary)
 * Uses framer-motion to fade in from below with slight delay.
 */
export default function VendorBenefitsCTA() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.5 }}
      className="text-center mt-12 space-x-4"
    >
      <Link
        href="/signup/vendors"
        className="inline-block bg-green-600 text-white font-semibold px-6 py-3 rounded-full shadow-lg transform transition-all duration-300 hover:bg-indigo-800 hover:scale-105"
      >
        Start Selling Today
      </Link>

      <Link
        href="/vendors"
        className="px-6 py-3 bg-white text-blue-900 font-semibold rounded-lg shadow-md hover:bg-gray-100 transition"
      >
        Explore the More
      </Link>
    </motion.div>
  );
}

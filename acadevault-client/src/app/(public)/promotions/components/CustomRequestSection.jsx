"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { BookOpen } from "lucide-react";

const CustomRequestSection = ({
  title = "Need a Custom Academic Solution?",
  description = "Can’t find the perfect deal? Submit a custom request, and we’ll tailor a solution to your academic needs.",
  ctaText = "Submit Custom Request",
  ctaUrl = "/custom-request",
  backgroundImage = "/images/custom-request-bg.jpg",
}) => {
  const handleCTAClick = () => {
    try {
      // Placeholder for analytics tracking function
      trackEvent({
        category: "CustomRequestSection",
        action: "CTA_Click",
        label: ctaText,
      });
    } catch (error) {
      console.warn("Analytics tracking failed:", error);
    }
  };

  return (
    <motion.section
      className="relative py-16 bg-gradient-to-r from-blue-50 via-gray-100 to-blue-50 text-center overflow-hidden"
      style={{
        backgroundImage: backgroundImage
          ? `url(${backgroundImage})`
          : undefined,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
      role="region"
      aria-label="Custom Academic Request Section"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* Overlay for readability */}
      <div
        className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-gray-100/50 to-blue-600/20"
        aria-hidden="true"
      />

      <div className="container mx-auto px-6 sm:px-12 md:px-20 max-w-5xl relative z-10 space-y-6">
        {/* Icon and Title */}
        <motion.h2
          className="text-3xl sm:text-4xl font-bold text-gray-800 flex justify-center items-center gap-3"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <BookOpen className="w-8 h-8 text-blue-600" />
          {title}
        </motion.h2>

        {/* Description */}
        <motion.p
          className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          {description}
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <Link href={ctaUrl}>
            <motion.button
              onClick={handleCTAClick}
              className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-3 rounded-full font-semibold text-base hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-md"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label={ctaText}
            >
              <BookOpen className="w-5 h-5" />
              {ctaText}
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default CustomRequestSection;


// <CustomRequestSection
//         title="Need a Tailored Academic Resource?"
//         description="Not finding what you need? Let us create a custom solution for your academic goals."
//         ctaText="Request Now"
//         ctaUrl="/custom-request-form"
//         backgroundImage="/images/academic-bg.jpg"
//       />
//     </div>
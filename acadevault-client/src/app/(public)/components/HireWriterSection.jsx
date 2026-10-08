"use client";

import React, { memo } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/Button";

/**
 * Animation variants
 */
const slideInLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0 },
};
const slideInRight = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0 },
};
const hoverScale = {
  hover: { scale: 1.05 },
};

/**
 * Floating blob/gradient background elements
 */
const BlobBackground = memo(() => (
  <>
    <div
      aria-hidden="true"
      className="absolute top-0 left-0 w-48 h-48 bg-blue-100 dark:bg-gray-700 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"
    />
    <div
      aria-hidden="true"
      className="absolute bottom-10 right-10 w-36 h-36 bg-indigo-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"
    />
  </>
));
BlobBackground.displayName = "BlobBackground";

/**
 * HireWriterSection
 *
 * A production-grade “Hire a Writer” call-to-action section.
 * - Semantic HTML with `aria-labelledby`.
 * - Motion variants extracted for clarity.
 * - Lazy-loaded, responsive <Image> with gradient overlay.
 * - Separate BlobBackground for reuse or easy removal.
 */
const HireWriterSection = memo(function HireWriterSection() {
  return (
    <section
      aria-labelledby="hire-writer-heading"
      className="relative py-20 bg-gradient-to-t from-blue-100 to-gray-200 overflow-hidden"
    >
      {/* Floating Background Elements */}
      <BlobBackground />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex flex-col-reverse md:flex-row items-center gap-10">
          {/* Text Content */}
          <motion.div
            className="md:w-1/2"
            variants={slideInLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <h2
              id="hire-writer-heading"
              className="text-4xl md:text-5xl font-extrabold text-orange-800 mb-6 leading-tight"
            >
              Elevate Your Research with Expert Writers
            </h2>
            <p className="text-lg text-gray-600 mb-6">
              Get high-quality, well-researched academic writing from
              experienced professionals. Meet deadlines effortlessly, enhance
              your study outcomes, and gain a competitive edge.
            </p>
            <motion.div
              variants={hoverScale}
              whileHover="hover"
              transition={{ duration: 0.3 }}
              className="inline-block"
            >
              <Link href="/hire-writer" passHref aria-label="Hire a Writer">
                <Button
                  size="md"
                  className="shadow-lg shadow-gray-800 cursor-pointer"
                  variant="default"
                >
                  Hire a Writer
                </Button>
              </Link>
            </motion.div>
          </motion.div>

          {/* Image Content */}
          <motion.div
            className="md:w-1/2 relative w-full h-72 md:h-96 rounded-lg overflow-hidden shadow-xl"
            variants={slideInRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            {/* Gradient Overlay (for text legibility) */}
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-b from-transparent to-black/40 z-10"
            />

            <Image
              src="/images/writer-img.png"
              alt="Professional writer at work"
              fill
              className="object-cover transition-transform duration-700 hover:scale-105"
              sizes="(max-width: 768px) 100vw, 50vw"
              loading="lazy"
              priority={false}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
});

HireWriterSection.displayName = "HireWriterSection";

export default HireWriterSection;

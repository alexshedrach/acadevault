"use client";

import React from "react";
import { motion } from "framer-motion";
import { ImageSection } from "@/components/common/ImageSection";
import { ContactForm } from "@/components/forms/ContactForm";

/**
 * ContactSection
 *
 * A full-width section combining:
 *  1) An animated ContactForm on the left (slides in from left on first view)
 *  2) A ResponsiveImageSection on the right (hidden on small screens, appears at md+)
 *
 * Layout:
 *  • On small screens: form spans full width, image is hidden.
 *  • On md+ screens: form takes 1/2 width, image takes remaining space.
 *
 * Usage:
 *   <ContactSection />
 */
export default function ContactSection() {
  return (
    <section
      className="w-full flex flex-col-reverse md:flex-row items-stretch justify-center bg-gray-50"
      aria-labelledby="contact-heading"
    >
      {/*
        ------------------------------------------------------------
        Left Column: Form Container
        ------------------------------------------------------------
        • On small: spans full width
        • On md+: spans 1/2 width
        • BG: white (for contrast), rounded corners, drop shadow
        • Slide-in animation from left
      */}
      <motion.div
        className="max-w-3xl bg-blue-50 text-gray-900 py-8 px-16 rounded-lg shadow-xl"
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {/* Section Title */}
        <h2
          id="contact-heading"
          className="text-3xl font-bold mb-3 text-blue-700"
        >
          LET&apos;S CONNECT
        </h2>

        {/* Section Subtitle */}
        <p className="mb-6 text-gray-600">
          Whether you have questions, feedback, or want to partner with us, fill
          in your details below and we’ll get right back to you.
        </p>
        <PublicContactForm />
      </motion.div>

      {/*
        ------------------------------------------------------------
        Right Column: Decorative Image
        ------------------------------------------------------------
        • Uses ResponsiveImageSection:
        • Hidden below md breakpoint
        • On md+: occupies remaining width
        • Container class controls height:  h-80 on small (though hidden), auto on md+
      */}
      <ImageSection
        src="/images/monitize-bg.png" // Path to your image
        alt="Research Illustration"
        breakpoint="md" // Hidden until md
        layout="fill" // Fill parent container
        priority={false} // Not high-priority by default
        sizes="(min-width: 768px) 40vw, 100vw" // Responsive sizes
        placeholderBlurDataURL={undefined} // Add a base64 string if you want blur
        containerClassName="hidden md:block relative max-w-3xl min-h-80"
        imageClassName="object-contain rounded-lg shadow-lg"
      />
    </section>
  );
}

function PublicContactForm() {
  return (
    <ContactForm
      endpoint="/api/contact"
      hiddenFields={{ role: "public" }}
      reasonOptions={[
        { value: "", label: "Select a reason…" },
        { value: "General Inquiry", label: "General Inquiry" },
        { value: "Support", label: "Support" },
        { value: "Partnership", label: "Partnership" },
      ]}
      onSuccess={() => alert("Thanks! We’ll be in touch soon.")}
    />
  );
}

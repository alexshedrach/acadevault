"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNewsletterSignup } from "@/hooks/useNewsletterSignup";
import { FloatingBlobs } from "@/components/common/FloatingBlobs";
import { FloatingParticles } from "@/components/common/FloatingParticles";
import { NewsletterSignupForm } from "@/components/forms/NewsletterSignupForm";
import { SuccessMessage } from "@/components/common/SuccessMessage";

/**
 * NewsletterSignupSection
 *
 * Renders:
 *  • A dark gradient background (parent has `relative`)
 *  • Floating blobs (behind everything, `z-index: 0`)
 *  • Floating particles (behind content but above blobs, since no explicit z-index)
 *  • A centered heading, subheading, and form or success message (front layer)
 */
export default function NewsletterSignupSection() {
  const {
    email,
    setEmail,
    submitted,
    error,
    isLoading,
    ripples,
    handleSubmit,
    handleButtonClick,
    setSubmitted,
  } = useNewsletterSignup();

  // Keep track of window size for confetti (or other effects)
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  useEffect(() => {
    const updateWindowSize = () =>
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    updateWindowSize();
    window.addEventListener("resize", updateWindowSize);
    return () => window.removeEventListener("resize", updateWindowSize);
  }, []);

  return (
    <motion.section
      className="relative w-full py-20 overflow-hidden bg-gradient-to-br from-purple-700 to-indigo-800 text-white"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {/* 1) Floating background blobs (z-index: 0) */}
      <FloatingBlobs />

      {/* 2) Floating particle dots (z-index defaults to auto, so they appear above blobs) */}
      <FloatingParticles
        count={20}
        minSize={7}
        maxSize={10}
        minOpacity={0.1}
        maxOpacity={0.25}
        minDuration={4}
        maxDuration={9}
        variation={true}
      />

      {/* 3) Main content (by default z-index: auto, so it sits above blobs & particles) */}
      <div className="relative mx-auto max-w-2xl px-6 text-center z-10">
        <motion.h2
          className="text-5xl font-bold mb-6 drop-shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          📢 Elevate Your Knowledge – Stay Ahead!
        </motion.h2>

        <motion.p
          className="text-lg mb-10 text-gray-200"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          Be the first to access{" "}
          <strong>exclusive content, expert insights,</strong> and unbeatable
          deals. 📩 Join thousands of forward-thinkers shaping the future –
          right in your inbox.
        </motion.p>

        <AnimatePresence>
          {submitted ? (
            <SuccessMessage windowSize={windowSize} />
          ) : (
            <NewsletterSignupForm
              email={email}
              setEmail={setEmail}
              error={error}
              isLoading={isLoading}
              ripples={ripples}
              handleSubmit={handleSubmit}
              handleButtonClick={handleButtonClick}
            />
          )}
        </AnimatePresence>

        <AnimatePresence>
          {error && (
            <motion.p
              id="email-error"
              className="mt-4 text-red-400 font-medium"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {error}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {/* Ripple keyframes (for your NewsletterSignupForm button ripples) */}
      <style jsx>{`
        @keyframes ripple {
          0% {
            transform: scale(0);
            opacity: 1;
          }
          100% {
            transform: scale(4);
            opacity: 0;
          }
        }
        .animate-ripple {
          animation: ripple 0.6s linear;
        }
      `}</style>
    </motion.section>
  );
}

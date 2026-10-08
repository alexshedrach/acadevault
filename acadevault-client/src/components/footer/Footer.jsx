"use client";

import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useNewsletterSignup } from "@/hooks/useNewsletterSignup";
import { NewsletterSignupForm } from "../forms/NewsletterSignupForm";
import AppDownloadLinks from "./AppDownloadLinks";
import FooterBottom from "./FooterBottom";
import FooterNavSection from "./FooterNavSection";
import { FormStatusWithSuccess } from "../forms/FormStatusWithSuccess";
import { useChat } from "@/contexts/ChatContext";

const NAV_SECTIONS = [
  {
    title: "Need Help?",
    links: [
      { text: "Chat with Us" },
      { text: "Help Center", href: "/help-support" },
      { text: "Contact Support", href: "/help-support/contact-support" },
      { text: "Report a Problem", href: "/help-support/report-issue" },
    ],
  },
  {
    title: "Useful Info",
    links: [
      { text: "How AcadeVault Works", href: "how-it-works" },
      { text: "How to Shop on Acadavault?", href: "how-to-shop" },
      { text: "Delivery Methods and Timelines", href: "/deliver-options" },
      { text: "Return & Refund Policy", href: "/refund-policy" },
      { text: "Bulk & Corporate Orders", href: "bulk-orders" },
    ],
  },
  {
    title: "About AcadeVault",
    links: [
      { text: "About Us", href: "/about" },
      { text: "Acadavault Careers", href: "/carrers" },
      { text: "Payment Information Guidelines", href: "/payment-info" },
      { text: "Community Guidelines", href: "/community-guidelines" },
      { text: "Privacy Policy", href: "/privacy-policy" },
      { text: "Terms of Service", href: "terms-and-conditions" },
      { text: "Cookie Notice", href: "/cookie-notice" },
    ],
  },
  {
    title: "Make Money With Us",
    links: [
      { text: "Sell Academic Content", href: "/vendors" },
      { text: "Join Affiliate Program", href: "/affiliate" },
      { text: "Partner Opportunities", href: "/promotions" },
      { text: "Instructor Onboarding", href: "/onboarding" },
    ],
  },
  {
    title: "AcadeVault Global",
    links: [
      { text: "United States", href: "" },
      { text: "United Kingdom", href: "" },
      { text: "Canada", href: "" },
      { text: "Australia", href: "" },
    ],
  },
];

export default function Footer() {
  // Pull all newsletter signup state & handlers from custom hook
  const {
    email,
    setEmail,
    submitted,
    error,
    isLoading,
    ripples,
    handleSubmit,
    handleButtonClick,
    // setSubmitted, // no longer used here
  } = useNewsletterSignup();

  const { openChat } = useChat();
  /**
   * Determine formStatus string:
   *  - "submitting" when isLoading === true
   *  - "success" when submitted === true
   *  - "idle" otherwise
   */
  const formStatus = isLoading ? "submitting" : submitted ? "success" : "idle";

  return (
    <footer className="bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-300 text-sm">
      <div className="max-w-screen-xl mx-auto px-4 lg:px-16 py-10 space-y-10">
        <section
          aria-labelledby="newsletter-heading"
          className="flex flex-col md:flex-row justify-between items-start gap-6 border-b border-gray-300 dark:border-gray-700 pb-8"
        >
          {/* ------------------------------------------------------------ */}
          {/* Newsletter Section (Left Column) */}
          {/* ------------------------------------------------------------ */}
          <div className="newsletter md:w-1/2 space-y-2">
            <motion.h2
              className="text-2xl font-bold mb-6 drop-shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              📢 Elevate Your Knowledge – Stay Ahead!
            </motion.h2>

            <motion.p
              className="text-base text-gray-200"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              Be the first to access{" "}
              <strong>exclusive content, expert insights,</strong> and
              unbeatable deals. 📩 Join thousands of forward-thinkers shaping
              the future – right in your inbox.
            </motion.p>

            {/* ------------------------------------------------------------ */}
            {/* Show either the signup form or the success message */}
            {/* ------------------------------------------------------------ */}
            <AnimatePresence>
              {formStatus === "success" ? (
                // When subscription is successful, show confetti + thank you
                <FormStatusWithSuccess formStatus="success" />
              ) : (
                // Otherwise render the form itself
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

            {/* ------------------------------------------------------------ */}
            {/* Show any error messages under the form */}
            {/* ------------------------------------------------------------ */}
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

          {/* ------------------------------------------------------------ */}
          {/* App Download Links (Right Column) */}
          {/* ------------------------------------------------------------ */}
          <AppDownloadLinks />
        </section>

        {/* ------------------------------------------------------------ */}
        {/* Footer Navigation Grid */}
        {/* ------------------------------------------------------------ */}
        <section
          aria-labelledby="footer-navigation"
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8"
        >
          {NAV_SECTIONS.map((section) => (
            <FooterNavSection
              key={section.title}
              {...section}
              openChat={openChat}
            />
          ))}
        </section>

        {/* ------------------------------------------------------------ */}
        {/* Bottom-most Footer Row (e.g., copyright, small print) */}
        {/* ------------------------------------------------------------ */}
        <FooterBottom />
      </div>
    </footer>
  );
}

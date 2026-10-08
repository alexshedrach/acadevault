"use client";

import React, { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { X } from "lucide-react";
import { cn } from "@/utils/cn";
import { usePreferences } from "@/contexts/PreferencesContext";

// Animation variants
const modalVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.4 } },
};

const ProgramModal = ({ isOpen, onClose, onCtaClick }) => {
  const { highContrast } = usePreferences();
  const modalRef = useRef(null);

  // Focus trap
  useEffect(() => {
    if (isOpen) {
      const focusableElements = modalRef.current?.querySelectorAll(
        "button, [href], input, select, textarea, [tabindex]:not([tabindex='-1'])"
      );
      const first = focusableElements?.[0];
      const last = focusableElements?.[focusableElements.length - 1];

      const handleKeyDown = (e) => {
        if (e.key === "Escape") {
          onClose();
          return;
        }
        if (e.key === "Tab") {
          if (e.shiftKey && document.activeElement === first) {
            e.preventDefault();
            last?.focus();
          } else if (!e.shiftKey && document.activeElement === last) {
            e.preventDefault();
            first?.focus();
          }
        }
      };

      first?.focus();
      document.addEventListener("keydown", handleKeyDown);
      return () => document.removeEventListener("keydown", handleKeyDown);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          role="dialog"
          aria-labelledby="modal-heading"
        >
          <motion.div
            ref={modalRef}
            variants={modalVariants}
            className={cn(
              "p-8 rounded-lg bg-white max-w-md mx-4 relative",
              highContrast && "bg-gray-800 text-white"
            )}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
              aria-label="Close modal"
            >
              <X className="w-6 h-6" />
            </button>
            <h3 id="modal-heading" className="text-2xl font-semibold mb-4">
              About the Affiliate Program
            </h3>
            <p className="text-base mb-4">
              Join Acadevault’s affiliate program to earn 15% commissions on
              your sales. Promote our resources to your audience and track
              performance with our intuitive dashboard.
            </p>
            <ul className="list-disc pl-5 mb-4">
              <li>30-day cookie window</li>
              <li>Real-time analytics</li>
              <li>Monthly payouts via Paystack/Stripe</li>
              <li>Free promotional tools</li>
            </ul>
            <Link
              href="/signup/affiliate"
              onClick={onCtaClick}
              className={cn(
                "inline-flex items-center px-6 py-2 rounded-full bg-yellow-400 text-black hover:bg-yellow-500",
                highContrast && "bg-yellow-300"
              )}
              aria-label="Join the affiliate program from modal"
            >
              Get Started
            </Link>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProgramModal;

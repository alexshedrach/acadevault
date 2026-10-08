"use client";

import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { AnimatePresence, motion } from "framer-motion";
import Confetti from "react-confetti";
import { useWindowSize } from "@/hooks/useWindowSize";

/**
 * FormStatusWithSuccess
 *
 * Displays a dynamic success message and a one-time confetti animation
 * when the formStatus is "success". Also handles entering/exiting animations.
 *
 * Props:
 *   • formStatus: one of "idle" | "submitting" | "success"
 */
export const FormStatusWithSuccess = ({ formStatus }) => {
    // Retrieve current window size for Confetti dimensions
    const windowSize = useWindowSize();
    const [showConfetti, setShowConfetti] = useState(false);
  
    // Whenever formStatus transitions to "success", trigger confetti once
    useEffect(() => {
      if (formStatus === "success") {
        setShowConfetti(true);
  
        // Automatically stop confetti after 5 seconds
        const timer = setTimeout(() => setShowConfetti(false), 5000);
        return () => clearTimeout(timer);
      }
    }, [formStatus]);
  
    return (
      <AnimatePresence>
        {formStatus === "success" && (
          <motion.div
            key="form-success"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="relative col-span-2 p-4 rounded-lg text-center bg-green-500 overflow-hidden"
          >
            <p className="text-white font-semibold text-lg">
              🎉 Thank you! Your message has been sent.
            </p>
  
            {showConfetti && (
              <Confetti
                width={windowSize.width}
                height={windowSize.height}
                numberOfPieces={200}
                recycle={false}
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    );
  };
  
  FormStatusWithSuccess.propTypes = {
    formStatus: PropTypes.oneOf(["idle", "submitting", "success"]).isRequired,
  };
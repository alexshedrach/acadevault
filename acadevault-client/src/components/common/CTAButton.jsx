"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "../ui/Button";


/**
 * CTAButton (Call To Action Button)
 *
 * Renders a button with:
 *  - Soft glowing background pulse
 *  - Click ripple effect
 *  - Redirects to "/signup" after a brief loading state
 *
 * Props: none (hardcoded redirect to "/signup")
 */
export function CTAButton() {
  const [isLoading, setIsLoading] = useState(false);
  const [ripple, setRipple] = useState([]);

  const handleClick = (e) => {
    setIsLoading(true);

    // Calculate click position relative to the button for the ripple
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Create one ripple circle at {x, y}, remove after 600ms
    const id = Date.now();
    setRipple([{ x, y, id }]);
    setTimeout(() => setRipple([]), 600);

    // Simulate a 2s loading, then redirect
    setTimeout(() => {
      setIsLoading(false);
      window.location.href = "/signup";
    }, 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="relative inline-block"
    >
      {/* Soft glowing background pulse */}
      <motion.div
        className="absolute -inset-2 bg-blue-500 opacity-50 rounded-lg blur-lg"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Ripple effect container */}
      <div className="relative overflow-hidden">
        <Button
          size="lg"
          variant="default"
          isLoading={isLoading}
          loadingText="Redirecting..."
          onClick={handleClick}
          className="relative z-10 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-indigo-500 hover:to-purple-500 
                     transition-all duration-500 shadow-lg hover:shadow-2xl transform hover:scale-105 overflow-hidden 
                     rounded-lg text-white px-8 py-3 font-semibold"
        >
          Get Started
        </Button>

        {/* Render ripple circles */}
        {ripple.map((r) => (
          <span
            key={r.id}
            className="absolute bg-white opacity-30 rounded-full animate-ripple"
            style={{
              top: r.y - 15,
              left: r.x - 15,
              width: 30,
              height: 30,
            }}
          />
        ))}
      </div>
    </motion.div>
  );
}

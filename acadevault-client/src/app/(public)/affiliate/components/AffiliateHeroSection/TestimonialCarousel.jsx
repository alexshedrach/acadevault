"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { cn } from "@/utils/cn";
import { usePreferences } from "@/contexts/PreferencesContext";

const TestimonialCarousel = ({ testimonials }) => {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const { highContrast } = usePreferences();

  useEffect(() => {
    if (isPaused || !testimonials) return;
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isPaused, testimonials]);

  const handlePrev = () =>
    setCurrent(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  const handleNext = () =>
    setCurrent((prev) => (prev + 1) % testimonials.length);

  return (
    <div
      className="mt-12 max-w-2xl mx-auto relative"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.5 }}
          className={cn(
            "p-6 rounded-lg backdrop-blur-sm bg-white/30 text-center",
            highContrast && "bg-gray-700/50"
          )}
        >
          <p className="italic text-lg mb-4">"{testimonials[current].quote}"</p>
          <div className="flex items-center justify-center gap-4">
            <div className="w-12 h-12 relative">
              <Image
                src={testimonials[current].avatar}
                alt={`${testimonials[current].author} avatar`}
                fill
                className="rounded-full object-cover"
                loading="lazy"
              />
            </div>
            <div>
              <p className="font-semibold">{testimonials[current].author}</p>
              <p className="text-sm">{testimonials[current].role}</p>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
      <div className="flex justify-center gap-4 mt-4">
        <button
          onClick={handlePrev}
          className="p-2 rounded-full bg-white/20 text-white"
          aria-label="Previous testimonial"
        >
          ←
        </button>
        <button
          onClick={handleNext}
          className="p-2 rounded-full bg-white/20 text-white"
          aria-label="Next testimonial"
        >
          →
        </button>
      </div>
    </div>
  );
};

export default TestimonialCarousel;

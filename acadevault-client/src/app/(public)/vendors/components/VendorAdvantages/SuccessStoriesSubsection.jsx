"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft, Star } from "lucide-react";

const STORIES = [
  {
    quote: "Selling my lecture notes has earned me over $2,000 this year!",
    author: "Dr. Ngozi Adebayo",
    title: "Lecturer, University of Lagos",
    avatar: "/avatars/tony.png",
    earnings: "$2,000+",
  },
  {
    quote: "Sharing my research guides globally was easy with Acadevault!",
    author: "Prof. James Carter",
    title: "Researcher, University of Oxford",
    avatar: "/avatars/james.png",
    earnings: "$1,500+",
  },
  {
    quote: "I turned my thesis into a study guide and reached thousands!",
    author: "Sarah Kim",
    title: "PhD Candidate, MIT",
    avatar: "/avatars/jenny.png",
    earnings: "$3,000+",
  },
];

const sectionVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const cardVariants = {
  enter: { opacity: 0, x: 50 },
  center: { opacity: 1, x: 0, transition: { duration: 0.5 } },
  exit: { opacity: 0, x: -50, transition: { duration: 0.5 } },
};

export default function SuccessStoriesSubsection() {
  const [current, setCurrent] = useState(0);
  const slideInterval = useRef(null);

  const prev = useCallback(() => {
    setCurrent((c) => (c - 1 + STORIES.length) % STORIES.length);
  }, []);

  const next = useCallback(() => {
    setCurrent((c) => (c + 1) % STORIES.length);
  }, []);

  // autoplay
  useEffect(() => {
    slideInterval.current = setInterval(next, 5000);
    return () => clearInterval(slideInterval.current);
  }, [next]);

  // pause on hover
  const handleMouseEnter = () => clearInterval(slideInterval.current);
  const handleMouseLeave = () => {
    clearInterval(slideInterval.current);
    slideInterval.current = setInterval(next, 5000);
  };

  // keyboard nav
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [prev, next]);

  return (
    <motion.section
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="bg-white rounded-2xl shadow-xl p-8 grid gap-6"
      style={{ gridTemplateRows: "auto auto auto" }}
      aria-label="Vendor success stories carousel"
    >
      {/* Header & Description */}
      <div className="relative flex items-center gap-3">
        <motion.span
          initial={{ rotate: -45, opacity: 0 }}
          animate={{ rotate: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="p-2 bg-yellow-50 rounded-full"
        >
          <Star className="w-6 h-6 text-yellow-500" />
        </motion.span>
        <h2 className="text-3xl font-bold text-gray-800">
          <span className="absolute bottom-0 left-0 w-16 h-1 bg-gradient-to-r from-indigo-600 to-blue-600 rounded-full" />
          Vendor Success Stories
        </h2>
      </div>
      <p className="text-gray-600 leading-relaxed max-w-2xl">
        Hear from educators who’ve turned their expertise into sustainable
        income on AcadeVault.
      </p>

      {/* Carousel Container */}
      <div className="relative overflow-hidden min-h-[200px]">
        <AnimatePresence initial={false} mode="wait">
          <motion.div
            key={current}
            variants={cardVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="absolute inset-0 bg-gray-50 rounded-lg p-6 shadow-md flex flex-col sm:flex-row items-center gap-6"
          >
            <div className="w-24 h-24 relative flex-shrink-0">
              <Image
                src={STORIES[current].avatar}
                alt={`${STORIES[current].author} avatar`}
                fill
                className="rounded-full object-cover"
              />
            </div>
            <div className="flex-1">
              <p className="italic text-gray-700 mb-4">
                “{STORIES[current].quote}”
              </p>
              <p className="font-semibold text-gray-900 mb-1">
                — {STORIES[current].author}, {STORIES[current].title}
              </p>
              <p className="text-sm text-indigo-600">
                Earnings: {STORIES[current].earnings}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Prev / Next Buttons */}
        <button
          onClick={prev}
          aria-label="Previous story"
          className="absolute top-1/2 left-0 -translate-y-1/2 p-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-300"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <button
          onClick={next}
          aria-label="Next story"
          className="absolute top-1/2 right-0 -translate-y-1/2 p-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-300"
        >
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>

      {/* Dot Indicators */}
      <div className="flex justify-center gap-2">
        {STORIES.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`w-3 h-3 rounded-full transition ${
              current === idx
                ? "bg-indigo-600"
                : "bg-gray-300 hover:bg-gray-400"
            }`}
            aria-label={`Go to story ${idx + 1}`}
            aria-current={current === idx}
          />
        ))}
      </div>
    </motion.section>
  );
}

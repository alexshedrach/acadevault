"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import useAnalytics from "@/hooks/useAnalytics";
import { milestonesData } from "@/data/milestonesData";



export default function OurMilestonesSection() {
  const { trackEvent } = useAnalytics();
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef(null);
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });
  const itemRefs = useRef([]);

  const containerControls = useAnimation();

  // Animate section when in view
  useEffect(() => {
    if (inView) {
      containerControls.start("visible");
      trackEvent("Milestones:section_in_view");
    }
  }, [inView, trackEvent, containerControls]);

  // Scroll spy for active dot
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = Number(entry.target.getAttribute("data-index"));
          if (entry.isIntersecting) {
            setActiveIndex(index);
          }
        });
      },
      { rootMargin: "-30% 0px -60% 0px", threshold: 0.25 }
    );

    itemRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.2 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 120 },
    },
  };

  return (
    <section
      ref={ref}
      id="milestones"
      className="relative py-24 bg-gradient-to-b from-white via-blue-50 to-blue-100 overflow-hidden"
    >
      {/* Parallax Background Graphics */}
      <motion.div
        className="absolute top-[-10%] left-[20%] w-96 h-96 opacity-10 text-indigo-300 z-0"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 120, ease: "linear" }}
      >
        <svg viewBox="0 0 400 400" fill="none">
          <circle cx="200" cy="200" r="200" fill="currentColor" />
        </svg>
      </motion.div>

      <motion.div
        className="absolute bottom-[-10%] right-[10%] w-64 h-64 opacity-10 text-indigo-200 z-0"
        animate={{ rotate: -360 }}
        transition={{ repeat: Infinity, duration: 150, ease: "linear" }}
      >
        <svg viewBox="0 0 400 400" fill="none">
          <rect width="400" height="400" fill="currentColor" />
        </svg>
      </motion.div>

      <div className="container mx-auto px-4 z-10 relative">
        <h2 className="text-4xl font-extrabold text-center text-gray-900 mb-20">
          Our Milestones
        </h2>

        <div className="relative flex">
          {/* Stepper Navigation */}
          <div className="hidden md:flex flex-col items-center space-y-6 absolute left-1/2 transform -translate-x-1/2 z-10">
            {milestonesData.map((_, idx) => (
              <div
                key={idx}
                className={`w-4 h-4 rounded-full transition-all duration-300 border-2 ${
                  activeIndex === idx
                    ? "bg-indigo-600 border-indigo-600 scale-110 shadow-md"
                    : "bg-white border-indigo-300"
                }`}
              />
            ))}
          </div>

          {/* Timeline Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={containerControls}
            className="space-y-24 w-full"
          >
            {milestonesData.map((ms, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <motion.article
                  key={ms.id}
                  variants={itemVariants}
                  ref={(el) => (itemRefs.current[idx] = el)}
                  data-index={idx}
                  className={`flex flex-col md:flex-row items-center ${
                    isEven ? "md:flex-row-reverse" : ""
                  }`}
                >
                  {/* Spacer */}
                  <div className="hidden md:block w-1/2" />

                  {/* Year Badge with connector */}
                  <div className="relative z-10 flex flex-col items-center mb-8 md:mb-0">
                    <div className="w-16 h-16 bg-indigo-600 text-white text-lg font-bold rounded-full shadow-lg flex items-center justify-center">
                      {ms.year}
                    </div>
                    {idx !== milestonesData.length - 1 && (
                      <div className="w-1 h-24 bg-indigo-300 mt-2"></div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="md:w-1/2 bg-white p-8 rounded-xl shadow-md border border-gray-100 hover:shadow-2xl transition duration-300">
                    <h3 className="text-2xl font-semibold text-gray-800 mb-3">
                      {ms.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {ms.description}
                    </p>
                  </div>
                </motion.article>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

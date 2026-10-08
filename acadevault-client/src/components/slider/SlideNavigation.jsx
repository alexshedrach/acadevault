"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import * as Tooltip from "@radix-ui/react-tooltip";

export default function SlideNavigation({ slides, currentSlide, goToSlide }) {
  const [visible, setVisible] = useState(true);

  // Auto-hide on inactivity (same as arrows)
  // useEffect(() => {
  //   let timeout;

  //   const resetTimer = () => {
  //     clearTimeout(timeout);
  //     setVisible(true);
  //     timeout = setTimeout(() => setVisible(false), 3000);
  //   };

  //   window.addEventListener("mousemove", resetTimer);
  //   window.addEventListener("keydown", resetTimer);

  //   resetTimer();

  //   return () => {
  //     clearTimeout(timeout);
  //     window.removeEventListener("mousemove", resetTimer);
  //     window.removeEventListener("keydown", resetTimer);
  //   };
  // }, []);

  return (
    <motion.nav
      initial={{ opacity: 0 }}
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.6 }}
      role="tablist"
      aria-label="Slider navigation"
      className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center gap-3 sm:gap-4 md:gap-5 z-30 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full shadow-xl ring-1 ring-white/20"
    >
      {slides.map((slide, index) => {
        const isActive = index === currentSlide;

        return (
          <Tooltip.Provider key={slide.id}>
            <Tooltip.Root>
              <Tooltip.Trigger asChild>
                <button
                  onClick={() => goToSlide(index)}
                  role="tab"
                  aria-label={`Slide ${index + 1}`}
                  aria-selected={isActive}
                  aria-controls={`slide-panel-${slide.id}`}
                  className="relative focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2"
                >
                  {isActive && (
                    <span className="absolute inset-0 rounded-full animate-ping bg-blue-400 opacity-20" />
                  )}
                  <motion.div
                    className="relative w-6 h-6"
                    initial={false}
                    animate={{ rotate: isActive ? 360 : 0 }}
                    transition={{ duration: 1, ease: "easeInOut" }}
                  >
                    <svg className="absolute inset-0 w-full h-full">
                      <circle
                        cx="12"
                        cy="12"
                        r="10"
                        stroke={isActive ? "#3B82F6" : "transparent"}
                        strokeWidth="2"
                        fill="none"
                        className="transition-all duration-300 ease-in-out"
                      />
                    </svg>

                    <motion.span
                      layout
                      initial={{ scale: 1, opacity: 0.6 }}
                      animate={{
                        scale: isActive ? 1.3 : 1,
                        opacity: isActive ? 1 : 0.6,
                        boxShadow: isActive
                          ? "0 0 0 6px rgba(59, 130, 246, 0.3), 0 0 8px rgba(59, 130, 246, 0.6)"
                          : "0 0 0 2px rgba(156, 163, 175, 0.2)",
                      }}
                      whileHover={{
                        scale: isActive ? 1.3 : 1.1,
                        boxShadow: "0 0 0 6px rgba(147, 197, 253, 0.4)",
                      }}
                      whileTap={{ scale: 0.9 }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 25,
                      }}
                      className={`w-4 h-4 sm:w-5 sm:h-5 rounded-full border border-white/20 duration-300 transition-colors ${
                        isActive
                          ? "bg-gradient-to-tr from-indigo-500 via-sky-400 to-green-400"
                          : "bg-gray-300/70 hover:bg-gray-200"
                      }`}
                    />
                  </motion.div>
                </button>
              </Tooltip.Trigger>
              <Tooltip.Portal>
                <Tooltip.Content
                  side="top"
                  sideOffset={6}
                  className="bg-white/90 backdrop-blur-md text-black px-2.5 py-1.5 rounded-md text-xs shadow-lg border border-gray-200"
                >
                  {slide.title || `Slide ${index + 1}`}
                  <Tooltip.Arrow className="fill-white" />
                </Tooltip.Content>
              </Tooltip.Portal>
            </Tooltip.Root>
          </Tooltip.Provider>
        );
      })}
    </motion.nav>
  );
}

// 🧠 Optional Add-Ons

// Add keyboard navigation (Tab, Enter, Space).

// Consider tooltips for dot previews or slide titles.

// Add support for custom dot icons or thumbnails via optional prop.

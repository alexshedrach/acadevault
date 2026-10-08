"use client";

import React, { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import * as Tooltip from "@radix-ui/react-tooltip";
import { useTheme } from "next-themes";

const NavigationArrows = ({
  goToPrevSlide,
  goToNextSlide,
  size = 36,
  className = "",
  keyboardNav = true,
}) => {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";
  const [visible, setVisible] = useState(true);

  // Auto-hide after 3 seconds of inactivity
  useEffect(() => {
    let timeout;

    const resetTimer = () => {
      clearTimeout(timeout);
      setVisible(true);
      timeout = setTimeout(() => setVisible(false), 3000);
    };

    window.addEventListener("mousemove", resetTimer);
    window.addEventListener("keydown", resetTimer);

    resetTimer();

    return () => {
      clearTimeout(timeout);
      window.removeEventListener("mousemove", resetTimer);
      window.removeEventListener("keydown", resetTimer);
    };
  }, []);

  // Keyboard navigation
  useEffect(() => {
    if (!keyboardNav) return;

    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft") goToPrevSlide();
      if (e.key === "ArrowRight") goToNextSlide();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goToPrevSlide, goToNextSlide, keyboardNav]);

  const baseStyles = `
    flex items-center justify-center rounded-full shadow-xl
    focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 transition-transform cursor-pointer
    ${
      isDark
        ? "bg-gradient-to-br from-gray-800 via-gray-700 to-gray-600 text-white"
        : "bg-gradient-to-br from-gray-200 via-gray-100 to-white text-black"
    }
  `;

  return (
    <>
      {/* Left Arrow */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: visible ? 1 : 0 }}
        transition={{ duration: 0.4 }}
        className={`absolute top-1/2 -left-2 transform -translate-y-1/2 z-30 ${className}`}
      >
        <Tooltip.Provider>
          <Tooltip.Root>
            <Tooltip.Trigger asChild>
              <motion.button
                onClick={goToPrevSlide}
                aria-label="Previous Slide"
                title="Previous"
                className={baseStyles}
                style={{ width: size, height: size }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <ChevronLeft size={size * 0.6} />
              </motion.button>
            </Tooltip.Trigger>
            <Tooltip.Portal>
              <Tooltip.Content
                side="right"
                className="bg-black text-white px-2 py-1 rounded text-sm shadow-lg select-none"
              >
                Previous
              </Tooltip.Content>
            </Tooltip.Portal>
          </Tooltip.Root>
        </Tooltip.Provider>
      </motion.div>

      {/* Right Arrow */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: visible ? 1 : 0 }}
        transition={{ duration: 0.4 }}
        className={`absolute top-1/2 -right-2 transform -translate-y-1/2 z-30 ${className}`}
      >
        <Tooltip.Provider>
          <Tooltip.Root>
            <Tooltip.Trigger asChild>
              <motion.button
                onClick={goToNextSlide}
                aria-label="Next Slide"
                title="Next"
                className={baseStyles}
                style={{ width: size, height: size }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <ChevronRight size={size * 0.6} />
              </motion.button>
            </Tooltip.Trigger>
            <Tooltip.Portal>
              <Tooltip.Content
                side="left"
                className="bg-black text-white px-2 py-1 rounded text-sm shadow-lg select-none"
              >
                Next
              </Tooltip.Content>
            </Tooltip.Portal>
          </Tooltip.Root>
        </Tooltip.Provider>
      </motion.div>
    </>
  );
};

export default NavigationArrows;

// "use client";
// import React from "react";
// import { ChevronLeft, ChevronRight } from "lucide-react";
// import { motion } from "framer-motion";

// export default function NavigationArrows({
//   goToPrevSlide,
//   goToNextSlide,
//   size = 36,
//   className = "",
// }) {
//   const buttonBaseStyles =
//     "flex items-center justify-center rounded-full bg-gradient-to-br from-gray-800 to-gray-700 text-white shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 transition-transform duration-300 hover:scale-110";

//   return (
//     <>
//       <motion.div
//         initial={{ opacity: 0, x: -20 }}
//         animate={{ opacity: 1, x: 0 }}
//         transition={{ duration: 0.4 }}
//         className={`absolute top-1/2 -left-0 transform -translate-y-1/2 z-30 ${className}`}
//       >
//         <button
//           onClick={goToPrevSlide}
//           aria-label="Previous Slide"
//           className={buttonBaseStyles}
//           style={{ width: size, height: size }}
//         >
//           <ChevronLeft size={size * 0.6} />
//         </button>
//       </motion.div>

//       <motion.div
//         initial={{ opacity: 0, x: 20 }}
//         animate={{ opacity: 1, x: 0 }}
//         transition={{ duration: 0.4 }}
//         className={`absolute top-1/2 right-0 transform -translate-y-1/2 z-30 ${className}`}
//       >
//         <button
//           onClick={goToNextSlide}
//           aria-label="Next Slide"
//           className={buttonBaseStyles}
//           style={{ width: size, height: size }}
//         >
//           <ChevronRight size={size * 0.6} />
//         </button>
//       </motion.div>
//     </>
//   );
// }

// 🔄 Optional Add-Ons
// Support keyboard arrow keys via useEffect + keydown.

// Add tooltip or hover title for enhanced feedback.

// Inject via context to control from anywhere in a parent slider.

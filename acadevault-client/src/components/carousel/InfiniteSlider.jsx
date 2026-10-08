import React, { useRef, useEffect, useState } from "react";
import { motion, useAnimation, useMotionValue } from "framer-motion";

/**
 * InfiniteSlider (fixed: no “empty” gap at loop point)
 *
 * Props:
 *   • children: React.ReactNode[] (slides)
 *   • speed: pixels/sec (default 50)
 *   • gap: px between slides (default 0)
 *   • pauseOnHover: boolean (default true)
 */
export const InfiniteSlider = ({
  children,
  speed = 50,
  gap = 0,
  pauseOnHover = true,
}) => {
  const containerRef = useRef(null);
  const controls = useAnimation();
  const x = useMotionValue(0);
  const [totalWidth, setTotalWidth] = useState(0);

  // 1) Measure once on mount & again on resize
  useEffect(() => {
    let resizeTimeout;

    const calculateTotalWidth = () => {
      if (!containerRef.current) return;
      const container = containerRef.current;

      // select only the FIRST batch (we’ll duplicate in the DOM)
      const slides = Array.from(
        container.querySelectorAll("[data-slide]")
      ).slice(0, children.length);

      // sum up each slide’s bounding width
      const widths = slides.map((el) => el.getBoundingClientRect().width);
      // total = sum(widths) + gap * numberOfSlides
      setTotalWidth(
        widths.reduce((acc, w) => acc + w, 0) + gap * children.length
      );
    };

    calculateTotalWidth();
    window.addEventListener("resize", () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = window.setTimeout(calculateTotalWidth, 100);
    });

    return () => {
      clearTimeout(resizeTimeout);
      window.removeEventListener("resize", calculateTotalWidth);
    };
  }, [children, gap]);

  // 2) Kick off the infinite loop whenever totalWidth is known
  useEffect(() => {
    if (!totalWidth) return;

    controls.start({
      x: [0, -totalWidth],
      transition: {
        ease: "linear",
        repeat: Infinity,
        duration: totalWidth / speed,
      },
    });
  }, [totalWidth, speed, controls]);

  // 3) Pause on hover
  const handleMouseEnter = () => {
    if (pauseOnHover) controls.stop();
  };

  // 4) Resume from EXACT spot when hover ends
  const handleMouseLeave = () => {
    if (!pauseOnHover || !totalWidth) return;

    // x.get() might be negative or positive—mod by totalWidth to get "how far into the loop" we are
    let currentX = x.get() % totalWidth;
    // If mod gave a positive (very rare), shift it to the negative side:
    if (currentX > 0) currentX -= totalWidth;

    // Now restart from currentX → currentX - totalWidth
    controls.start({
      x: [currentX, currentX - totalWidth],
      transition: {
        ease: "linear",
        repeat: Infinity,
        duration: totalWidth / speed,
      },
    });
  };

  return (
    <div
      ref={containerRef}
      className="overflow-hidden w-full relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      role="region"
      aria-label="Infinite content slider"
    >
      <motion.div
        className="flex whitespace-nowrap"
        animate={controls}
        style={{ x, gap: `${gap}px` }}
      >
        {/*
          We render the entire children array twice (so the second copy
          flows immediately after the first). Notice: *no* marginRight on each slide—
          we rely on `gap` in the flex container to set spacing.
        */}
        {[...children, ...children].map((child, idx) => (
          <div key={idx} data-slide className="flex-shrink-0">
            {child}
          </div>
        ))}
      </motion.div>
    </div>
  );
};

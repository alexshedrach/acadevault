"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/utils/cn";

/**
 * HorizontalScroller
 *
 * A low-level horizontal scrolling container that:
 *  • Shows optional left/right arrows when scrolling is possible.
 *  • Auto-scrolls at a configurable interval (pauses on hover/focus).
 *  • Supports infinite looping by jumping to start/end when the edge is reached.
 *  • Emits smooth scrolling behavior.
 *
 * Props:
 *  • children: The horizontal list of elements to display.
 *  • showArrows (bool): Whether to render scroll arrows. Default: true.
 *  • autoScroll (bool): Whether to auto-scroll. Default: false.
 *  • autoScrollInterval (number): ms between auto-scroll steps. Default: 5000.
 *  • loop (bool): Enable looping behavior. Default: false.
 *  • containerClassName (string): Classes for the scrollable inner container.
 *  • className (string): Classes for the outer wrapper.
 *  • ...props: Spread any other HTML attributes onto the outer wrapper.
 */
export const HorizontalScroller = React.memo(function HorizontalScroller({
  children,
  showArrows = true,
  autoScroll = false,
  autoScrollInterval = 5000,
  loop = false,
  containerClassName = "",
  className = "",
  ...props
}) {
  const containerRef = useRef(null);
  const intervalRef = useRef(null);
  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Update arrow visibility based on scroll position
  const updateScrollState = useCallback(() => {
    const el = containerRef.current;
    if (!el) return;
    setShowLeft(el.scrollLeft > 0);
    setShowRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
  }, []);

  // Scroll left or right by ~70% of container width
  const scroll = useCallback(
    (direction) => {
      const el = containerRef.current;
      if (!el) return;
      const scrollAmount = el.clientWidth * 0.7;

      if (direction === "right") {
        if (loop && el.scrollLeft + el.clientWidth >= el.scrollWidth - 1) {
          // Jump back to start smoothly
          el.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          el.scrollBy({ left: scrollAmount, behavior: "smooth" });
        }
      } else {
        if (loop && el.scrollLeft <= 0) {
          // Jump to end smoothly
          el.scrollTo({ left: el.scrollWidth, behavior: "smooth" });
        } else {
          el.scrollBy({ left: -scrollAmount, behavior: "smooth" });
        }
      }
    },
    [loop]
  );

  // Start auto-scrolling at given interval, unless hovered/focused
  const startAutoScroll = useCallback(() => {
    if (!autoScroll || isHovered) return;
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      scroll("right");
    }, autoScrollInterval);
  }, [autoScroll, autoScrollInterval, scroll, isHovered]);

  // Stop auto-scrolling
  const stopAutoScroll = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  // Keyboard navigation: arrow keys scroll
  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "ArrowLeft") scroll("left");
      if (e.key === "ArrowRight") scroll("right");
    },
    [scroll]
  );

  // Attach event listeners on mount, clean up on unmount
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    updateScrollState();
    el.addEventListener("scroll", updateScrollState);
    window.addEventListener("resize", updateScrollState);
    el.addEventListener("keydown", handleKeyDown);

    return () => {
      el.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
      el.removeEventListener("keydown", handleKeyDown);
    };
  }, [updateScrollState, handleKeyDown]);

  // Manage auto-scrolling lifecycle
  useEffect(() => {
    startAutoScroll();
    return () => {
      stopAutoScroll();
    };
  }, [startAutoScroll, stopAutoScroll]);

  return (
    <div
      className={cn("relative group", className)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsHovered(true)}
      onBlur={() => setIsHovered(false)}
      {...props}
    >
      {showArrows && showLeft && (
        <button
          onClick={() => scroll("left")}
          aria-label="Scroll left"
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-md rounded-full p-1 hover:bg-gray-100 transition"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
      )}

      <div
        ref={containerRef}
        className={cn(
          "flex items-center gap-3 overflow-x-auto no-scrollbar scroll-smooth snap-x snap-mandatory py-2 px-1 focus:outline-none",
          containerClassName
        )}
        tabIndex={0}
      >
        {children}
      </div>

      {showArrows && showRight && (
        <button
          onClick={() => scroll("right")}
          aria-label="Scroll right"
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-md rounded-full p-1 hover:bg-gray-100 transition"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      )}
    </div>
  );
});
HorizontalScroller.displayName = "HorizontalScroller";
HorizontalScroller.propTypes = {
  children: PropTypes.node.isRequired,
  showArrows: PropTypes.bool,
  autoScroll: PropTypes.bool,
  autoScrollInterval: PropTypes.number,
  loop: PropTypes.bool,
  containerClassName: PropTypes.string,
  className: PropTypes.string,
};

// "use client";

// import { useRef, useState, useEffect, useCallback } from "react";
// import { ChevronLeft, ChevronRight } from "lucide-react";
// import { cn } from "@/utils/cn";

// export const HorizontalScroller = ({
//   children,
//   showArrows = true,
//   autoScroll = true,
//   autoScrollInterval = 5000,
//   loop = true, // enable looping
//   className,
//   containerClassName,
//   ...props
// }) => {
//   const containerRef = useRef(null);
//   const intervalRef = useRef(null);
//   const [showLeft, setShowLeft] = useState(false);
//   const [showRight, setShowRight] = useState(false);
//   const [isHovered, setIsHovered] = useState(false);

//   const updateScrollState = () => {
//     const el = containerRef.current;
//     if (!el) return;

//     setShowLeft(el.scrollLeft > 0);
//     setShowRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
//   };

//   const scroll = useCallback(
//     (direction) => {
//       const el = containerRef.current;
//       if (!el) return;
//       const scrollAmount = el.clientWidth * 0.7;

//       if (direction === "right") {
//         // If at end and looping is enabled, reset to start
//         if (loop && el.scrollLeft + el.clientWidth >= el.scrollWidth - 1) {
//           el.scrollTo({ left: 0, behavior: "smooth" });
//         } else {
//           el.scrollBy({ left: scrollAmount, behavior: "smooth" });
//         }
//       } else {
//         // If at start and looping is enabled, jump to end
//         if (loop && el.scrollLeft <= 0) {
//           el.scrollTo({ left: el.scrollWidth, behavior: "smooth" });
//         } else {
//           el.scrollBy({ left: -scrollAmount, behavior: "smooth" });
//         }
//       }
//     },
//     [loop]
//   );

//   const startAutoScroll = useCallback(() => {
//     if (!autoScroll || isHovered) return;
//     stopAutoScroll();

//     intervalRef.current = setInterval(() => {
//       scroll("right");
//     }, autoScrollInterval);
//   }, [autoScroll, autoScrollInterval, scroll, isHovered]);

//   const stopAutoScroll = () => {
//     if (intervalRef.current) {
//       clearInterval(intervalRef.current);
//       intervalRef.current = null;
//     }
//   };

//   const handleKeyDown = useCallback(
//     (e) => {
//       if (e.key === "ArrowLeft") scroll("left");
//       if (e.key === "ArrowRight") scroll("right");
//     },
//     [scroll]
//   );

//   useEffect(() => {
//     const el = containerRef.current;
//     if (!el) return;

//     updateScrollState();

//     el.addEventListener("scroll", updateScrollState);
//     window.addEventListener("resize", updateScrollState);
//     el.addEventListener("keydown", handleKeyDown);

//     return () => {
//       el.removeEventListener("scroll", updateScrollState);
//       window.removeEventListener("resize", updateScrollState);
//       el.removeEventListener("keydown", handleKeyDown);
//     };
//   }, [handleKeyDown]);

//   useEffect(() => {
//     startAutoScroll();
//     return stopAutoScroll;
//   }, [startAutoScroll]);

//   return (
//     <div
//       className={cn("relative group", className)}
//       onMouseEnter={() => setIsHovered(true)}
//       onMouseLeave={() => setIsHovered(false)}
//       onFocus={() => setIsHovered(true)}
//       onBlur={() => setIsHovered(false)}
//       {...props}
//     >
//       {showArrows && showLeft && (
//         <button
//           onClick={() => scroll("left")}
//           aria-label="Scroll left"
//           className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-md rounded-full p-1 hover:bg-gray-100 transition"
//         >
//           <ChevronLeft className="w-5 h-5" />
//         </button>
//       )}

//       <div
//         ref={containerRef}
//         className={cn(
//           "flex items-center gap-3 overflow-x-auto no-scrollbar scroll-smooth snap-x snap-mandatory py-2 px-1 focus:outline-none",
//           containerClassName
//         )}
//         tabIndex={0}
//       >
//         {children}
//       </div>

//       {showArrows && showRight && (
//         <button
//           onClick={() => scroll("right")}
//           aria-label="Scroll right"
//           className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-md rounded-full p-1 hover:bg-gray-100 transition"
//         >
//           <ChevronRight className="w-5 h-5" />
//         </button>
//       )}
//     </div>
//   );
// };

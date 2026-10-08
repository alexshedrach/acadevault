"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/utils/cn";

/**
 * Tooltip Component
 * @param {ReactNode} children - The trigger element (e.g., button, icon)
 * @param {ReactNode|string} content - The tooltip content
 * @param {string} id - Optional unique ID for accessibility
 * @param {string} position - top | bottom | left | right (default: "top")
 * @param {string} color - Tailwind background color (e.g., "bg-black")
 * @param {string} size - sm | md | lg
 * @param {string} trigger - hover | click | focus
 * @param {number} delay - Delay before showing tooltip in ms
 * @param {boolean} isOpen - Controlled open/close state
 * @param {boolean} dismissOnClickOutside - Hide tooltip when clicking outside
 * @param {string} arrowSize - Tailwind size for tooltip arrow
 * @param {string} minWidth - Min width for tooltip box
 * @param {string} maxWidth - Max width for tooltip box
 * @param {object} animationProps - Optional motion config
 */

const Tooltip = ({
  children,
  content,
  id,
  position = "top",
  color = "bg-indigo-800",
  size = "md",
  trigger = "hover",
  delay = 100,
  isOpen,
  dismissOnClickOutside = false,
  arrowSize = "w-3 h-3",
  minWidth = "200px",
  maxWidth = "24rem",
  animationProps = {
    initial: { opacity: 0, scale: 0.95, y: 5 },
    animate: { opacity: 1, scale: 1, y: 0 },
    exit: { opacity: 0, scale: 0.95, y: 5 },
    transition: { duration: 0.2 },
  },
}) => {
  const [visible, setVisible] = useState(false);
  const [timeoutId, setTimeoutId] = useState(null);
  const wrapperRef = useRef(null);

  const controlled = typeof isOpen === "boolean";
  const shouldShow = controlled ? isOpen : visible;

  // Show with optional delay
  const showTooltip = () => {
    if (controlled) return;
    const tid = setTimeout(() => setVisible(true), delay);
    setTimeoutId(tid);
  };

  // Hide immediately
  const hideTooltip = () => {
    if (controlled) return;
    if (timeoutId) clearTimeout(timeoutId);
    setVisible(false);
  };

  const toggleTooltip = () => {
    if (controlled) return;
    setVisible((prev) => !prev);
  };

  // Event bindings based on trigger type
  const handleTriggerEvents = () => {
    if (controlled) return {};

    switch (trigger) {
      case "click":
        return { onClick: toggleTooltip };
      case "focus":
        return { onFocus: showTooltip, onBlur: hideTooltip };
      case "hover":
      default:
        return { onMouseEnter: showTooltip, onMouseLeave: hideTooltip };
    }
  };

  // Hide when clicking outside
  useEffect(() => {
    if (!dismissOnClickOutside || !visible) return;

    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        hideTooltip();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dismissOnClickOutside, visible]);

  // Tooltip position classes
  const positionClasses = {
    top: "-top-16 left-1/2 -translate-x-1/2",
    bottom: "top-full mt-3 left-1/2 -translate-x-1/2",
    left: "right-full mr-3 top-1/2 -translate-y-1/2",
    right: "left-full ml-3 top-1/2 -translate-y-1/2",
  };

  // Arrow positioning
  const arrowPosition = {
    top: "-bottom-1.5 left-1/2 -translate-x-1/2 rotate-45",
    bottom: "-top-1.5 left-1/2 -translate-x-1/2 rotate-45",
    left: "top-1/2 -right-1.5 -translate-y-1/2 rotate-45",
    right: "top-1/2 -left-1.5 -translate-y-1/2 rotate-45",
  };

  // Tooltip sizes
  const sizeClasses = {
    sm: "text-xs px-2 py-1",
    md: "text-sm px-3 py-2",
    lg: "text-base px-4 py-2.5 max-w-md",
  };

  return (
    <div
      ref={wrapperRef}
      className="relative inline-block group focus:outline-none w-full"
      {...handleTriggerEvents()}
      tabIndex={trigger === "focus" ? 0 : undefined}
      aria-describedby={id}
    >
      {/* Trigger element */}
      {children}

      {/* Tooltip box */}
      <AnimatePresence>
        {shouldShow && (
          <motion.div
            id={id}
            role="tooltip"
            {...animationProps}
            className={cn(
              "absolute z-50 shadow-lg rounded-lg text-white p-2",
              positionClasses[position],
              color,
              sizeClasses[size]
            )}
            style={{ minWidth, maxWidth }}
          >
            <div className="break-words">{content}</div>
            <div
              className={cn(
                "absolute",
                arrowSize,
                color,
                arrowPosition[position]
              )}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Tooltip;

// "use client";

// import React, { useState, useRef, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { cn } from "@/utils/cn";

// /**
//  * Tooltip Component
//  * @param {ReactNode} children - Trigger element
//  * @param {ReactNode | string} content - Tooltip content (supports rich content)
//  * @param {string} id - Accessibility ID
//  * @param {string} position - top | bottom | left | right
//  * @param {string} color - Tailwind background color
//  * @param {string} size - sm | md | lg
//  * @param {string} trigger - hover | click | focus
//  * @param {number} delay - Delay before showing (ms)
//  * @param {boolean} isOpen - Controlled visibility
//  * @param {boolean} dismissOnClickOutside - Whether to dismiss on outside click
//  * @param {string} arrowSize - Tailwind width/height for arrow (e.g. "w-3 h-3")
//  */

// const Tooltip = ({
//   children,
//   content,
//   id,
//   position = "top",
//   color = "bg-indigo-800",
//   size = "md",
//   trigger = "hover",
//   delay = 100,
//   isOpen = undefined,
//   dismissOnClickOutside = false,
//   arrowSize = "w-3 h-3",
// }) => {
//   const [visible, setVisible] = useState(false);
//   const [timeoutId, setTimeoutId] = useState(null);
//   const wrapperRef = useRef(null);

//   const controlled = typeof isOpen === "boolean";

//   const positionClasses = {
//     top: "-top-16 left-1/2 -translate-x-1/2",
//     bottom: "top-full mt-3 left-1/2 -translate-x-1/2",
//     left: "right-full mr-3 top-1/2 -translate-y-1/2",
//     right: "left-full ml-3 top-1/2 -translate-y-1/2",
//   };

//   const arrowPosition = {
//     top: "-top-1.5 left-1/2 -translate-x-1/2 rotate-45",
//     bottom: "-bottom-1.5 left-1/2 -translate-x-1/2 rotate-45",
//     left: "left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 rotate-45",
//     right: "right-1/2 top-1/2 -translate-y-1/2 translate-x-1/2 rotate-45",
//   };

//   const sizeClasses = {
//     sm: "text-xs px-2 py-1",
//     md: "text-sm px-3 py-2",
//     lg: "text-base px-4 py-2.5 max-w-md", // Increased width to max-w-md (24rem)
//   };

//   const showTooltip = () => {
//     if (delay) {
//       const id = setTimeout(() => setVisible(true), delay);
//       setTimeoutId(id);
//     } else {
//       setVisible(true);
//     }
//   };

//   const hideTooltip = () => {
//     clearTimeout(timeoutId);
//     setVisible(false);
//   };

//   const toggleTooltip = () => setVisible((prev) => !prev);

//   const handleTriggerEvents = () => {
//     if (controlled) return {};

//     switch (trigger) {
//       case "click":
//         return { onClick: toggleTooltip };
//       case "focus":
//         return { onFocus: showTooltip, onBlur: hideTooltip };
//       case "hover":
//       default:
//         return { onMouseEnter: showTooltip, onMouseLeave: hideTooltip };
//     }
//   };

//   useEffect(() => {
//     if (!dismissOnClickOutside || !visible) return;

//     const handleClickOutside = (event) => {
//       if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
//         hideTooltip();
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, [dismissOnClickOutside, visible]);

//   const shouldShow = controlled ? isOpen : visible;

//   return (
//     <div
//       ref={wrapperRef}
//       className="relative inline-block group focus:outline-none w-full"
//       {...handleTriggerEvents()}
//       tabIndex={trigger === "focus" ? 0 : undefined}
//       aria-describedby={id}
//     >
//       {children}

//       <AnimatePresence>
//         {shouldShow && (
//           <motion.div
//             id={id}
//             role="tooltip"
//             initial={{ opacity: 0, scale: 0.95, y: 5 }}
//             animate={{ opacity: 1, scale: 1, y: 0 }}
//             exit={{ opacity: 0, scale: 0.95, y: 5 }}
//             transition={{ duration: 0.2 }}
//             className={cn(
//               "absolute z-50 shadow-lg rounded-lg text-white",
//               positionClasses[position],
//               color,
//               sizeClasses[size],
//               "p-2" // Added padding for better content spacing
//             )}
//             style={{ minWidth: "200px", maxWidth: "24rem" }} // Explicit width control
//           >
//             <div className="text-wrap break-words">{content}</div>
//             <div
//               className={cn(
//                 "absolute",
//                 color,
//                 arrowSize,
//                 arrowPosition[position]
//               )}
//             />
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// };

// export default Tooltip;

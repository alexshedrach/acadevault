"use client";

import { cn } from "@/utils/cn";
import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";

/**
 * FloatingBlobs
 * - Supports global and per-blob animations
 * - Modular, scalable decorative background
 */
export function FloatingBlobs({ blobs = defaultBlobs }) {
  const globalControls = useAnimation();

  useEffect(() => {
    globalControls.start({
      x: [0, 30, -30, 0],
      y: [0, -20, 20, 0],
      transition: {
        duration: 10,
        repeat: Infinity,
        ease: "easeInOut",
      },
    });
  }, [globalControls]);

  return (
    <>
      {blobs.map((blob, idx) => {
        const {
          size = "w-64 h-64",
          color = "bg-purple-500",
          position = "top-0 left-0",
          opacity = "opacity-30",
          zIndex = 0,
          customClass = "",
          animate = null, // Allow per-blob override
          transition = null,
          key = `blob-${idx}`,
        } = blob;

        const controls = animate ? animate : globalControls;

        return (
          <motion.div
            key={key}
            animate={controls}
            transition={
              transition || {
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut",
              }
            }
            className={cn(
              "absolute rounded-full blur-3xl pointer-events-none",
              size,
              color,
              position,
              opacity,
              customClass
            )}
            style={{ zIndex }}
          />
        );
      })}
    </>
  );
}

// Example default blobs
const defaultBlobs = [
  {
    key: "default-top-left",
    size: "w-64 h-64",
    color: "bg-blue-400",
    position: "top-10 left-10",
    opacity: "opacity-30",
  },
  {
    key: "default-bottom-right",
    size: "w-72 h-72",
    color: "bg-pink-400",
    position: "bottom-10 right-10",
    opacity: "opacity-30",
  },
];

// "use client";

// import { cn } from "@/utils/cn";
// import { motion, useAnimation, } from "framer-motion";
// import { useEffect } from "react";

// // Blob configuration type

// /**
//  * FloatingBlobs
//  *
//  * Renders floating blurred background blobs for decoration.
//  */
// export function FloatingBlobs({
//   blobs = defaultBlobs,
// }) {
//   const controls = useAnimation();

//   useEffect(() => {
//     controls.start({
//       x: [0, 30, -30, 0],
//       y: [0, -20, 20, 0],
//       transition: {
//         duration: 10,
//         repeat: Infinity,
//         ease: "easeInOut",
//       },
//     });
//   }, [controls]);

//   return (
//     <>
//       {blobs.map((blob, idx) => {
//         const {
//           size = "w-64 h-64",
//           color = "bg-purple-500",
//           position = "top-0 left-0",
//           opacity = "opacity-30",
//           zIndex = 0,
//           customClass = "",
//           animate = controls,
//           transition,
//           key = `blob-${idx}`,
//         } = blob;

//         return (
//           <motion.div
//             key={key}
//             animate={animate}
//             transition={transition}
//             className={cn(
//               "absolute rounded-full blur-3xl pointer-events-none",
//               size,
//               color,
//               position,
//               opacity,
//               customClass
//             )}
//             style={{ zIndex }}
//           />
//         );
//       })}
//     </>
//   );
// }

// // Default blobs (2 diagonal blobs)
// const defaultBlobs = [
//   {
//     key: "default-top-left",
//     size: "w-64 h-64",
//     color: "bg-blue-400",
//     position: "top-10 left-10",
//     opacity: "opacity-30",
//   },
//   {
//     key: "default-bottom-right",
//     size: "w-72 h-72",
//     color: "bg-pink-400",
//     position: "bottom-10 right-10",
//     opacity: "opacity-30",
//   },
// ];

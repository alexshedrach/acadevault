"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { animationVariants } from "@/config/vendorConfig";

// Background section with animation and overlays
export default function VendorBackground({
  backgroundImage,
  backgroundAlt,
  animationType,
  overlayColor,
  overlayOpacity,
  imagePosition = "cover",
  imagePriority = true,
}) {
  const prefersReducedMotion = useReducedMotion();
  const animation =
    animationVariants[animationType] ?? animationVariants.static;

  return (
    <>
      {/* Background image with kenburns effect */}
      <motion.div
        initial={prefersReducedMotion ? {} : animation.initial}
        animate={prefersReducedMotion ? {} : animation.animate}
        transition={{
          duration: 20,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "mirror",
        }}
        className="absolute inset-0 z-0"
      >
        <Image
          src={backgroundImage}
          alt={backgroundAlt}
          fill
          sizes="100vw"
          priority={imagePriority}
          className={`object-${imagePosition} brightness-75`}
          onError={(e) => (e.currentTarget.style.display = "none")}
        />
      </motion.div>

      {/* Gradient overlay */}
      <div
        className="absolute inset-0 z-10"
        style={{
          background: `linear-gradient(to right, rgba(30, 58, 138, 0.7), rgba(59, 130, 246, 0.8))`,
        }}
      />

      {/* Semi-opaque overlay */}
      <div
        className="absolute inset-0 z-20"
        style={{ backgroundColor: overlayColor, opacity: overlayOpacity / 100 }}
      />
    </>
  );
}

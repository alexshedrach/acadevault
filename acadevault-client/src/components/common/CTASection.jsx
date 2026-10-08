"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import clsx from "clsx";

// Define gradient/button/overlay per variant
const variantStyles = {
  primary: {
    gradient: "from-blue-600 via-indigo-600 to-purple-600",
    overlay: "rgba(30, 64, 175, VAR_OPACITY)",
    button: "bg-gradient-to-r from-blue-500 to-indigo-600 text-white",
  },
  success: {
    gradient: "from-green-500 via-emerald-600 to-teal-600",
    overlay: "rgba(5, 150, 105, VAR_OPACITY)",
    button: "bg-gradient-to-r from-emerald-500 to-teal-600 text-white",
  },
  dark: {
    gradient: "from-gray-900 via-gray-800 to-gray-700",
    overlay: "rgba(17, 24, 39, VAR_OPACITY)",
    button: "bg-gradient-to-r from-gray-800 to-gray-700 text-white",
  },
  custom: {
    gradient: "",
    overlay: "rgba(0, 0, 0, VAR_OPACITY)",
    button: "bg-white text-blue-700",
  },
};

const CTASection = ({
  title = "Ready to get started?",
  subtitle = "Join thousands of students and professionals excelling with AcadeVault.",
  buttonText = "Get Started",
  buttonLink = "/signup",
  variant = "primary",
  background = "gradient", // 'gradient' | 'image'
  bgImage = "/images/cta-bg.jpg",
  useParallax = false,
  overlayOpacity = 0.6,
  blur = false,
  className = "",
  children,
  icon: Icon, // optional icon component
  showBadge = false,
  badgeImage = "/images/logo-white.png",
}) => {
  const isImage = background === "image";
  const variantConfig = variantStyles[variant] || variantStyles.primary;

  const bgClasses = isImage
    ? "bg-cover bg-center bg-no-repeat"
    : `bg-gradient-to-r ${variantConfig.gradient}`;

  const overlayColor = variantConfig.overlay.replace(
    "VAR_OPACITY",
    overlayOpacity.toString()
  );

  return (
    <section
      className={clsx(
        "relative overflow-hidden rounded-xl py-20 px-6 sm:px-10 shadow-xl",
        bgClasses,
        className
      )}
      style={{
        backgroundImage: isImage ? `url(${bgImage})` : undefined,
        backgroundAttachment: useParallax ? "fixed" : "scroll",
      }}
    >
      {/* Background Image Lazy Load (non-visual but semantic fallback) */}
      {isImage && (
        <img
          src={bgImage}
          alt="background"
          className="absolute w-full h-full object-cover pointer-events-none opacity-0"
          loading="lazy"
        />
      )}

      {/* Overlay for background image */}
      {isImage && (
        <div
          className={clsx("absolute inset-0 z-0", blur && "backdrop-blur-md")}
          style={{ backgroundColor: overlayColor }}
        />
      )}

      {/* Optional badge/logo */}
      {showBadge && (
        <img
          src={badgeImage}
          alt="Badge"
          className="absolute top-6 left-6 z-20 h-12 w-auto object-contain"
        />
      )}

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="relative z-10 max-w-5xl mx-auto text-center text-white"
      >
        <h2 className="text-4xl sm:text-5xl font-bold flex justify-center items-center gap-3">
          {Icon && <Icon className="w-8 h-8 text-white" />}
          {title}
        </h2>
        <p className="mt-4 text-lg sm:text-xl text-white/90">{subtitle}</p>

        {children && <div className="mt-6">{children}</div>}

        <Link
          href={buttonLink}
          className={clsx(
            "mt-8 inline-block px-6 py-3 text-lg font-semibold rounded-lg shadow-lg transition duration-300",
            variantConfig.button
          )}
        >
          {buttonText}
        </Link>
      </motion.div>
    </section>
  );
};

export default CTASection;

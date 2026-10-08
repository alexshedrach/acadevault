"use client";

import React from "react";
import PropTypes from "prop-types";
import { motion } from "framer-motion";
import cn from "classnames";
import Link from "next/link";

/**
 * ───────────────────────────────────────────────────────────────
 * SectionHeader
 *
 * A flexible, production-grade section header with optional icon,
 * customizable heading & description styles, alignment, and responsive sizing.
 *
 * Props:
 *  - title: string (required) – main heading text
 *  - description: string or React node – supporting paragraph or JSX
 *  - icon: React node – an icon component (e.g., <SomeIcon />)
 *  - iconPosition: "top" | "left" – where to place the icon relative to title
 *  - variant: "primary" | "secondary" | "tertiary" – controls text color scheme
 *  - align: "left" | "center" | "right" – text alignment
 *  - size: "sm" | "md" | "lg" | "xl" – heading size (and description scaling)
 *  - maxWidth: string – defines a Tailwind max-w-* value for description (e.g., "2xl" → "max-w-2xl")
 *  - headingLevel: string – heading HTML tag (e.g., "h2", "h3")
 *  - headingClassName: string – extra classes for the heading
 *  - descriptionClassName: string – extra classes for the description
 *  - className: string – extra classes for the container
 *
 * Usage:
 * <SectionHeader
 *   title="Discover Our Courses"
 *   description="Browse a curated list of academic materials."
 *   icon={<BookOpenIcon className="w-6 h-6 text-blue-600" />}
 *   iconPosition="left"
 *   variant="primary"
 *   align="center"
 *   size="lg"
 *   maxWidth="3xl"
 *   headingLevel="h2"
 *   className="mt-12"
 * />
 * ──────────────────────────────────────────────────────────────
 */

const SectionHeader = ({
  title,
  description,
  link,
  error,
  icon,
  iconPosition = "left",
  variant = "primary",
  align = "center",
  size = "lg",
  maxWidth = "2xl",
  headingLevel = "h2",
  headingClassName = "",
  descriptionClassName = "",
  className = "",
  animate = true,
  gradient = false,
}) => {
  const HeadingTag = motion[headingLevel] || motion.h2;

  const headingSizeClasses = {
    sm: "text-lg md:text-xl font-extrabold",
    md: "text-xl md:text-2xl font-extrabold ",
    lg: "text-2xl md:text-3xl font-semibold ",
    xl: "text-3xl md:text-4xl font-bold ",
  };

  const descriptionSizeClasses = {
    sm: "text-sm md:text-base",
    md: "text-base md:text-lg",
    lg: "text-base md:text-lg",
    xl: "text-lg md:text-lg",
  };

  const variantClasses = {
    primary: {
      title: "text-gray-900",
      description: "text-gray-600",
      icon: "text-blue-600",
    },
    secondary: {
      title: "text-blue-800",
      description: "text-blue-600",
      icon: "text-blue-800",
    },
    tertiary: {
      title: "text-white",
      description: "text-gray-100",
      icon: "text-white",
    },
  };

  const colors = variantClasses[variant] || variantClasses.primary;
  const alignClasses = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
  };

  const maxWidthClass = maxWidth ? `max-w-${maxWidth}` : "";

  const headingMotionProps = animate
    ? {
        initial: { opacity: 0, y: 30 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.6, ease: "easeOut" },
        animate: gradient
          ? {
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            }
          : undefined,
      }
    : {};

  const paragraphMotionProps = animate
    ? {
        initial: { opacity: 0, y: 30 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.7, ease: "easeOut" },
      }
    : {};

  return (
    <div className={cn("mb-5", alignClasses[align], className)}>
      {/* Optional icon above */}
      {icon && iconPosition === "top" && (
        <div className={cn("flex justify-center mb-2", colors.icon)}>
          {icon}
        </div>
      )}

      {/* Title / Heading */}
      <HeadingTag
        className={cn(
          "flex items-center justify-" + align,
          headingSizeClasses[size],
          "tracking-tight mb-3",
          gradient
            ? "bg-gradient-to-r from-blue-300 via-purple-400 to-pink-500 bg-clip-text text-transparent"
            : colors.title,
          headingClassName
        )}
        style={gradient ? { backgroundSize: "200% auto" } : {}}
        {...headingMotionProps}
      >
        {icon && iconPosition === "left" && (
          <span className={cn("mr-2 flex-shrink-0", colors.icon)}>{icon}</span>
        )}
        {title}
      </HeadingTag>

      {/* Description */}
      {description && (
        <motion.p
          className={cn(
            "mt-2 leading-relaxed",
            descriptionSizeClasses[size],
            colors.description,
            maxWidthClass,
            align === "center" ? "mx-auto" : "",
            descriptionClassName
          )}
          {...paragraphMotionProps}
        >
          {description}
        </motion.p>
      )}

      {link && (
        <Link
          href={link}
          className="text-sm text-blue-600 hover:underline font-medium"
        >
          View all
        </Link>
      )}

      {/* Optional error message */}
      {error && (
        <motion.p
          className="mt-2 text-sm text-red-500"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          {error}
        </motion.p>
      )}
    </div>
  );
};

SectionHeader.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  error: PropTypes.string,
  icon: PropTypes.node,
  iconPosition: PropTypes.oneOf(["top", "left"]),
  variant: PropTypes.oneOf(["primary", "secondary", "tertiary"]),
  align: PropTypes.oneOf(["left", "center", "right"]),
  size: PropTypes.oneOf(["sm", "md", "lg", "xl", "2xl"]),
  maxWidth: PropTypes.string,
  headingLevel: PropTypes.string,
  headingClassName: PropTypes.string,
  descriptionClassName: PropTypes.string,
  className: PropTypes.string,
  animate: PropTypes.bool,
  gradient: PropTypes.bool,
};

export default SectionHeader;

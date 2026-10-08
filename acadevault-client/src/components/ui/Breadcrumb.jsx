"use client";

import React, { useMemo } from "react";
import Link from "next/link";
import { HiChevronRight } from "react-icons/hi";
import { motion } from "framer-motion";
import { cn } from "@/utils/cn";

/**
 * Breadcrumb component
 *
 * A flexible, accessible, and responsive breadcrumb navigation component.
 *
 * Props:
 * - items: Array of { label: string, href?: string, isCurrentPage?: boolean }
 * - separator: string | JSX.Element (defaults to HiChevronRight icon)
 * - className: Additional classes for the nav container
 * - textColor: Tailwind text color class (e.g., "text-gray-600")
 * - activeColor: Tailwind text color for the current page (e.g., "text-gray-900")
 * - hoverColor: Tailwind hover color for links (e.g., "hover:text-blue-600")
 * - size: "sm" | "md" | "lg" (controls text size)
 * - compact: boolean (reduces spacing if true)
 * - ariaLabel: Accessibility label (defaults to "Breadcrumb")
 * - animate: boolean (enables Framer Motion animations)
 */
const Breadcrumb = ({
  items = [],
  separator = <HiChevronRight className="w-4 h-4 text-gray-400" />,
  className = "",
  textColor = "text-gray-600",
  activeColor = "text-gray-900",
  hoverColor = "hover:text-blue-600",
  size = "sm",
  compact = false,
  ariaLabel = "Breadcrumb",
  animate = false,
}) => {
  const breadcrumbItems = useMemo(() => items || [], [items]);

  if (!breadcrumbItems.length) {
    return null;
  }

  const sizeClass =
    {
      sm: "text-sm",
      md: "text-base",
      lg: "text-lg",
    }[size] || "text-sm";

  const spacingClass = compact ? "gap-1" : "gap-2";

  const containerVariants = animate
    ? {
        initial: { opacity: 0, y: -10 },
        animate: { opacity: 1, y: 0, transition: { duration: 0.3 } },
      }
    : {};

  return (
    <motion.nav
      variants={containerVariants}
      initial="initial"
      animate="animate"
      aria-label={ariaLabel}
      className={cn(
        "flex items-center overflow-x-auto whitespace-nowrap",
        sizeClass,
        spacingClass,
        textColor,
        className
      )}
      role="navigation"
    >
      <ol className="flex items-center">
        {breadcrumbItems.map((item, index) => {
          const isLast = index === breadcrumbItems.length - 1;
          const isCurrentPage = item.isCurrentPage ?? isLast;

          return (
            <li key={index} className="flex items-center truncate">
              {index > 0 && (
                <span aria-hidden="true" className="mx-1.5 select-none">
                  {typeof separator === "string" ? separator : separator}
                </span>
              )}

              {item.href && !isCurrentPage ? (
                <Link
                  href={item.href}
                  className={cn(
                    "transition-colors duration-200 truncate",
                    textColor,
                    hoverColor,
                    "hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
                  )}
                  aria-current={undefined}
                >
                  {item.label}
                </Link>
              ) : (
                <span
                  className={cn(
                    "truncate font-semibold",
                    isCurrentPage ? activeColor : textColor
                  )}
                  aria-current={isCurrentPage ? "page" : undefined}
                >
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </motion.nav>
  );
};

export default Breadcrumb;

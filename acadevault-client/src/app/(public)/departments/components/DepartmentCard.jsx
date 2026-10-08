"use client";

import React, { useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/utils/cn";

// Gradient background styles for cards
const backgroundStyles = [
  "from-blue-600 to-purple-700",
  "from-emerald-600 to-lime-600",
  "from-rose-500 to-indigo-600",
  "from-cyan-600 to-teal-500",
];

// Utility to get initials from department name
const getInitials = (name) =>
  name
    .split(" ")
    .slice(0, 2)
    .map((word) => word.charAt(0).toUpperCase())
    .join("");

// Framer Motion card animation
const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.4, ease: "easeOut" },
  }),
};

/**
 * Department card component displaying department details with image or initials
 * @param {Object} props
 * @param {Object} props.department - Department data
 * @param {number} props.index - Index for animation delay
 */
export default function DepartmentCard({ department, index }) {
  const prefersReducedMotion = useReducedMotion();
  const gradient = backgroundStyles[index % backgroundStyles.length];

  // Memoize initials to prevent recomputation
  const initials = useMemo(
    () => getInitials(department.name),
    [department.name]
  );

  // Memoize material count text
  const materialText = useMemo(() => {
    return department.materialCount > 0
      ? `${department.materialCount} Material${
          department.materialCount > 1 ? "s" : ""
        }`
      : "No Materials";
  }, [department.materialCount]);

  return (
    <motion.article
      custom={index}
      initial="hidden"
      animate="visible"
      variants={prefersReducedMotion ? {} : cardVariants}
      className="relative z-0 w-full group"
      role="article"
      aria-labelledby={`department-${department._id}`}
    >
      <Link
        href={`/departments/${department.slug}`}
        className="relative block rounded-xl overflow-hidden focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600 transition-all duration-300"
        aria-label={`View details for ${department.name}`}
      >
        {/* Background image or fallback initials */}
        <div
          className={cn(
            "relative h-52 w-full rounded-xl shadow-md overflow-hidden",
            "group-hover:shadow-xl",
            `bg-gradient-to-br ${gradient}`
          )}
        >
          {department.image ? (
            <Image
              src={department.image}
              alt={department.name}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
              priority={index < 3}
              loading={index < 3 ? "eager" : "lazy"}
              className="object-cover transition-opacity duration-500 ease-in-out group-hover:opacity-90"
              onError={(e) => {
                e.target.style.display = "none"; // Fallback to gradient on error
              }}
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center -mt-3">
              <span className="text-white text-6xl font-extrabold drop-shadow-lg">
                {initials}
              </span>
            </div>
          )}

          {/* Dark overlay */}
          <div className="absolute inset-0 bg-black/50 group-hover:bg-black/60 transition-opacity duration-300" />

          {/* Material badge */}
          <div className="absolute top-2 left-2 bg-white/20 backdrop-blur-sm px-3 py-1 text-xs font-semibold text-white rounded-full shadow-sm">
            {materialText}
          </div>

          {/* Content */}
          <header
            className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/80 via-black/30 to-transparent backdrop-blur-sm"
            id={`department-${department._id}`}
          >
            <h3 className="text-lg font-bold text-white group-hover:text-amber-400 transition-colors truncate">
              {department.name}
            </h3>
            {department.description && (
              <p className="mt-1 text-sm text-gray-300 line-clamp-2">
                {department.description.length > 100
                  ? department.description.slice(0, 100) + "..."
                  : department.description}
              </p>
            )}
          </header>

          {/* CTA Button (only on hover) */}
          <footer className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
            <span className="inline-block bg-blue-600 text-white text-xs font-medium px-3 py-1.5 rounded-md shadow-md hover:bg-blue-700 transition-colors">
              View Details
            </span>
          </footer>
        </div>
      </Link>
    </motion.article>
  );
}

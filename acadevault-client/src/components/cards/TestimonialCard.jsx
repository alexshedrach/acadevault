"use client";

import React from "react";
import { motion } from "framer-motion";
import PropTypes from "prop-types";
import { cn } from "@/utils/cn";
import Avatar from "../common/Avatar";

/**
 * Individual Testimonial Card with drag/swipe support (Framer Motion).
 */
const TestimonialCard = ({ testimonial, variants, direction, onDragEnd }) => {
  return (
    <motion.div
      key={testimonial.id}
      custom={direction}
      variants={variants}
      initial="enter"
      animate="center"
      exit="exit"
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={onDragEnd}
      transition={{
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 },
      }}
      role="group"
      className="relative p-10 bg-white dark:bg-gray-800 rounded-xl shadow-2xl text-center max-w-lg mx-auto  h-full"
    >
      {/* Testimonial Message */}
      <p className="text-xl md:text-2xl italic text-gray-700 dark:text-gray-300">
        “{testimonial.message}”
      </p>

      {/* User Info: Avatar, Name, Designation, Optional Rating */}
      <div className="mt-8 flex flex-col items-center">
        <Avatar
          /**
           * src: either a valid URL or local path; if it fails to load,
           * Avatar falls back to `fallback` and then to initials.
           */
          src={testimonial.avatar}
          alt={`Avatar of ${testimonial.name}`}
          /**
           * name is used to generate initials if the image fails.
           */
          name={testimonial.name}
          /**
           * You can override size if you need a different dimension.
           * Our default is "md" → 48×48px, but you could do "lg" or a number.
           */
          size="lg"
          /**
           * If your testimonial data includes a status, pass it here:
           *   status="online" | "offline" | "away" | "busy"
           * Otherwise, omit this prop and no status‐dot will appear.
           */
          status={testimonial.status}
          /**
           * fallback: a local image (e.g. "/avatars/default.png")
           * that will be used if `src` fails to load.
           */
          fallback="/avatars/default.png"
          /**
           * Warn in console if the image fails to load.
           */
          warnOnError
        />

        <h3 className="mt-4 text-2xl font-bold text-gray-800 dark:text-gray-100">
          {testimonial.name}
        </h3>
        <p className="text-lg text-gray-500 dark:text-gray-400">
          {testimonial.designation}
        </p>

        {testimonial.rating != null && (
          <div
            className="mt-2 flex justify-center space-x-1"
            role="img"
            aria-label={`Rating: ${testimonial.rating} out of 5`}
          >
            {Array.from({ length: 5 }).map((_, idx) => (
              <svg
                key={idx}
                className={cn("w-5 h-5", {
                  "text-yellow-400": idx < testimonial.rating,
                  "text-gray-300": idx >= testimonial.rating,
                })}
                fill="currentColor"
                viewBox="0 0 20 20"
                aria-hidden="true"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.17c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.538 1.118l-3.38-2.455a1 1 0 00-1.175 0l-3.38 2.455c-.783.57-1.838-.197-1.538-1.118l1.287-3.957a1 1 0 00-.364-1.118L2.34 9.384c-.783-.57-.38-1.81.588-1.81h4.17a1 1 0 00.95-.69l1.286-3.957z" />
              </svg>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};

TestimonialCard.propTypes = {
  testimonial: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    message: PropTypes.string.isRequired,
    avatar: PropTypes.string,
    name: PropTypes.string.isRequired,
    designation: PropTypes.string.isRequired,
    rating: PropTypes.number,
    status: PropTypes.oneOf(["online", "offline", "away", "busy"]),
  }).isRequired,
  variants: PropTypes.shape({
    enter: PropTypes.func.isRequired,
    center: PropTypes.object.isRequired,
    exit: PropTypes.func.isRequired,
  }).isRequired,
  direction: PropTypes.number.isRequired,
  onDragEnd: PropTypes.func.isRequired,
};

export default React.memo(TestimonialCard);

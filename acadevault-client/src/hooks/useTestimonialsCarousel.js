"use client";

import { useState, useEffect, useCallback } from "react";
import { testimonialsData } from "@/data/testimonialsData";

/**
 * Custom hook for managing a testimonial carousel.
 *
 * @param {number} autoPlayMs - Number of milliseconds between automatic slide changes.
 * @returns {{
 *   page: number,
 *   direction: number,
 *   currentTestimonial: object,
 *   paginate: (delta: number) => void,
 *   handleDragEnd: (e: unknown, info: { offset: { x: number }, velocity: { x: number } }) => void
 * }}
 */
export function useTestimonialsCarousel(autoPlayMs = 7000) {
  const [page, setPage] = useState(0);
  const [direction, setDirection] = useState(0);

  // Number of testimonials from data source
  const count = testimonialsData.length;

  // Move to a new page, wrapping around via modulo
  const paginate = useCallback(
    (delta) => {
      setDirection(delta);
      setPage((prev) => (prev + delta + count) % count);
    },
    [count]
  );

  // On drag/swipe end, determine if enough swipe velocity/offset to paginate
  const handleDragEnd = useCallback(
    (e, { offset, velocity }) => {
      const swipePower = offset.x * velocity.x;
      const threshold = 1000;
      if (swipePower < -threshold) {
        paginate(1);
      } else if (swipePower > threshold) {
        paginate(-1);
      }
    },
    [paginate]
  );

  // Auto-play: advance every autoPlayMs milliseconds
  useEffect(() => {
    const timerId = setInterval(() => {
      paginate(1);
    }, autoPlayMs);
    return () => clearInterval(timerId);
  }, [page, paginate, autoPlayMs]);

  // The current testimonial object (from data array)
  const currentTestimonial = testimonialsData[page];

  return {
    page,
    direction,
    currentTestimonial,
    paginate,
    handleDragEnd,
  };
}

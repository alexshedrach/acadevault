"use client";

import { useState, useEffect } from "react";

/**
 * Custom hook to track media query matches in real-time.
 * @param {string} query The media query string, e.g. "(max-width: 768px)"
 * @returns {boolean} Boolean indicating if the query matches the current viewport
 */
export function useMediaQuery(query) {
  const [matches, setMatches] = useState(() => {
    if (typeof window !== "undefined") {
      return window.matchMedia(query).matches;
    }
    return false; // Default for SSR
  });

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mediaQueryList = window.matchMedia(query);

    const updateMatch = () => setMatches(mediaQueryList.matches);

    updateMatch(); // Run immediately on mount

    mediaQueryList.addEventListener("change", updateMatch);

    return () => {
      mediaQueryList.removeEventListener("change", updateMatch);
    };
  }, [query]);

  return matches;
}

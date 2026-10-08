// hooks/useScrollToTop.js
import { useRef, useCallback } from "react";

/**
 * Custom hook to scroll to the top of a section smoothly.
 * Useful for multi-step forms or any paginated component.
 *
 * @param {number} offset - Optional offset for sticky headers.
 * @returns {Array} [ref, scrollToTop]
 */
export function useScrollToTop(offset = 80) {
  const sectionRef = useRef(null);

  const scrollToTop = useCallback(() => {
    if (sectionRef.current) {
      const top =
        sectionRef.current.getBoundingClientRect().top +
        window.pageYOffset -
        offset;

      window.scrollTo({ top, behavior: "smooth" });
    }
  }, [offset]);

  return [sectionRef, scrollToTop];
}

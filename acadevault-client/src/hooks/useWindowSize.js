import { useEffect, useState } from "react";

/**
 * useWindowSize - Custom hook to track the current window size in real-time.
 * Returns an object: { width, height }
 */
export const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    // On SSR, `window` is undefined—initialize to zero
    width: typeof window !== "undefined" ? window.innerWidth : 0,
    height: typeof window !== "undefined" ? window.innerHeight : 0,
  });

  useEffect(() => {
    // Handler to update state whenever window is resized
    const handleResize = () =>
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });

    // Immediately set initial size
    handleResize(); // Set initial size
    // Add listener
    window.addEventListener("resize", handleResize);

    // Cleanup on unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowSize;
};

// hooks/useContainerDimensions.ts
import { useCallback, useLayoutEffect, useRef, useState } from "react";

export function useContainerDimensions() {
  const containerRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  const updateDimensions = useCallback(() => {
    if (containerRef.current) {
      const { offsetWidth: width, offsetHeight: height } = containerRef.current;
      setDimensions({ width, height });
    }
  }, []);

  useLayoutEffect(() => {
    if (!containerRef.current) return;

    const observer = new ResizeObserver(updateDimensions);
    observer.observe(containerRef.current);

    updateDimensions(); // Initial call

    return () => {
      observer.disconnect();
    };
  }, [updateDimensions]);

  return { containerRef, dimensions };
}

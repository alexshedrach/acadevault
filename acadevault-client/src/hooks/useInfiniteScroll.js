import { useEffect, useRef, useCallback } from "react";

/**
 * Hook for infinite scrolling: calls `onLoadMore` whenever the sentinel element
 * scrolls into view and you have more to load.
 *
 * @param {Object}   options
 * @param {boolean}  options.hasMore        — whether there is more data to load
 * @param {boolean}  options.isLoading      — whether a load is already in progress
 * @param {Function} options.onLoadMore     — callback to fetch next batch
 * @param {string}   [options.rootMargin]   — space around root for intersection (e.g. "0px 0px 200px 0px")
 * @param {number}   [options.threshold=0.1] — intersection threshold (0.0–1.0)
 * @returns {Function} a ref callback to attach to your “sentinel” node
 */
export function useInfiniteScroll({
  hasMore,
  isLoading,
  onLoadMore,
  rootMargin = "0px 0px 200px 0px",
  threshold = 0.1,
}) {
  // Keep a stable reference to the latest onLoadMore to avoid re-creating observer
  const callbackRef = useRef(onLoadMore);
  callbackRef.current = onLoadMore;

  // Store the current IntersectionObserver instance
  const observer = useRef(null);

  /**
   * Ref callback: React will call this with the sentinel DOM node.
   * We attach (or re‐attach) our IntersectionObserver here.
   */
  const setSentinel = useCallback(
    (node) => {
      // Disconnect previous observer if any
      if (observer.current) {
        observer.current.disconnect();
      }

      if (node && hasMore && !isLoading) {
        // Create a new observer instance
        observer.current = new IntersectionObserver(
          (entries) => {
            // When sentinel enters the viewport
            if (entries[0].isIntersecting) {
              callbackRef.current();
            }
          },
          { rootMargin, threshold }
        );
        observer.current.observe(node);
      }
    },
    [hasMore, isLoading, rootMargin, threshold]
  );

  // Clean up on unmount
  useEffect(() => {
    return () => {
      observer.current?.disconnect();
    };
  }, []);

  return setSentinel;
}

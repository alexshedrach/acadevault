// useCounter.js
"use client";

import { useEffect, useRef, useState, useCallback } from "react";

/**
 * useCounter
 *
 * Animates a numeric value between `from` and `to` over `duration` ms.
 * Can loop, reverse or restart, and pause on hover or via imperative calls.
 *
 * @param {object} options
 * @param {number} options.from         – Starting value.
 * @param {number} options.to           – Ending value.
 * @param {number} [options.duration=1500]  – Milliseconds for one cycle.
 * @param {function} [options.easing=t=>t]  – Easing fn(t:0→1) → easedProgress.
 * @param {"up"|"down"} [options.direction] – Force direction; defaults to up if to>from else down.
 * @param {boolean} [options.loop=false]    – Whether to restart automatically.
 * @param {number} [options.pauseAtEnd=0]   – Ms to pause at each cycle’s end before looping.
 * @param {boolean} [options.pauseOnHover=false] – Pause when hovered.
 * @param {number} [options.delay=0]        – Initial ms delay before starting.
 * @param {() => void} [options.onEnd]      – Called when a non-looping cycle finishes.
 *
 * @returns {{
 *   value: number,
 *   pause: () => void,
 *   resume: () => void,
 *   bind: {
 *     onMouseEnter: () => void,
 *     onMouseLeave: () => void
 *   }
 * }}
 */
export function useCounter({
  from = 0,
  to,
  duration = 1500,
  easing = (t) => t,
  direction,
  loop = false,
  pauseAtEnd = 0,
  pauseOnHover = false,
  delay = 0,
  onEnd,
}) {
  const [value, setValue] = useState(from);
  const rafId = useRef(null);
  const startTime = useRef(null);
  const paused = useRef(false);
  const hoverPaused = useRef(false);
  const initialTimeout = useRef(null);

  // Determine natural direction
  const dir = direction || (to > from ? "up" : "down");
  const delta = Math.abs(to - from);

  const step = useCallback(
    (timestamp) => {
      if (paused.current || hoverPaused.current) {
        // skip frames while paused
        rafId.current = requestAnimationFrame(step);
        return;
      }
      if (startTime.current === null) {
        startTime.current = timestamp;
      }
      const elapsed = timestamp - startTime.current;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easing(progress);

      // interpolate value
      const current =
        dir === "up"
          ? from + delta * eased
          : from - delta * eased + (dir === "down" ? delta : 0);

      setValue(Math.round(current));

      if (elapsed < duration) {
        rafId.current = requestAnimationFrame(step);
      } else {
        // end of one cycle
        setValue(to);
        onEnd?.();
        if (loop) {
          // pause then restart
          initialTimeout.current = setTimeout(() => {
            startTime.current = null;
            rafId.current = requestAnimationFrame(step);
          }, pauseAtEnd);
        }
      }
    },
    [from, to, duration, easing, delta, dir, loop, pauseAtEnd, onEnd]
  );

  // Imperative controls
  const pause = useCallback(() => {
    paused.current = true;
  }, []);
  const resume = useCallback(() => {
    paused.current = false;
  }, []);

  // hover handlers
  const bind = {
    onMouseEnter: pauseOnHover
      ? () => {
          hoverPaused.current = true;
        }
      : undefined,
    onMouseLeave: pauseOnHover
      ? () => {
          hoverPaused.current = false;
        }
      : undefined,
  };

  // lifecycle
  useEffect(() => {
    // kick off after optional delay
    if (delay > 0) {
      initialTimeout.current = setTimeout(() => {
        rafId.current = requestAnimationFrame(step);
      }, delay);
    } else {
      rafId.current = requestAnimationFrame(step);
    }
    // cleanup
    return () => {
      clearTimeout(initialTimeout.current);
      cancelAnimationFrame(rafId.current);
    };
  }, [step, delay]);

  return { value, pause, resume, bind };
}

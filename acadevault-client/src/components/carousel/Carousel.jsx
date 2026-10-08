"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import { AnimatePresence, motion } from "framer-motion";
import NavigationButton from "./NavigationButton";
import { cn } from "@/utils/cn";

/**
 * Generic Carousel component that supports TWO modes:
 *
 * 1) "scroll" mode (horizontal scrollable list of items),
 *    very similar to the original multi-item carousel.
 *
 * 2) "slider" mode (single-item Framer-Motion slider with enter/exit animations),
 *    very similar to the TestimonialCarousel approach.
 *
 * You choose mode via the `mode` prop. Everything else (buttons, looping, autoplay, etc.)
 * can be configured via props. Each responsibility is documented below.
 *
 * ----------------------------------------------------------------
 *
 * Props:
 *
 * • items           : array of any values you want to render.
 * • renderItem      : (item, index) => ReactNode. How to render each “slide” or each “scroll item”.
 *
 * • mode            : "scroll" | "slider". Determines internal behavior.
 *   – "scroll": we render all items in a row and allow horizontal scroll.
 *   – "slider": we render exactly one item at a time with Framer Motion animations.
 *
 * • initialIndex    : starting index (number). Only applies in slider mode.
 * • loop            : boolean. If true, “prev/next” wrap around at ends.
 *                       In scroll mode, loop only affects whether to hide/show arrows;
 *                       it does NOT auto-jump the scrolling container.
 *
 * • showControls    : boolean. If false, hides left/right arrows completely.
 *
 * • autoPlay        : number (ms). If > 0 and mode="slider", auto-advance every autoPlay ms.
 *                       If 0 (default), no autoplay.
 *
 * • scrollAmount    : string or number (e.g. "80%" or 300). Only used in scroll mode:
 *                       how far (pixels or percent) to scroll on each arrow click.
 *
 * • itemWidthClass  : string. Only in scroll mode: a Tailwind (or other) class to force each
 *                       item’s width (e.g. "w-1/3 md:w-1/4 lg:w-1/5"). Must be a flex item.
 *
 * • transitionClass : string. Only in slider mode: classes you want to apply to the wrapper
 *                       around the single slide (for any extra CSS transitions).
 *
 * • size            : "sm" | "md" | "lg". Controls arrow‐button sizes in both modes.
 *
 * • className       : string. Any extra wrapper classes on the outermost div.
 *
 * • variants        : Framer Motion variants object (only for slider mode). Shape:
 *                       {
 *                         enter: (direction) => ({ x, opacity }),
 *                         center: { x: 0, opacity: 1 },
 *                         exit:  (direction) => ({ x, opacity })
 *                       }
 *
 * ----------------------------------------------------------------
 *
 * HOW IT WORKS INTERNALLY:
 *
 * – If mode="scroll":
 *     • We keep a ref to the scroll container (`containerRef`).
 *     • Clicking left/right calls `container.scrollBy({ left: ±value, behavior: "smooth" })`.
 *     • We track whether we’re at the very start or very end (via `scroll` event listener),
 *       to decide if we should hide the prev/next arrows (unless loop=true).
 *     • We render _all_ items in a flex row, each wrapped in a `div` with `itemWidthClass`.
 *
 * – If mode="slider":
 *     • We maintain internal `index` state and `direction` (–1 or +1) for animation.
 *     • Clicking prev/next updates `index` (wrapping if loop=true). We store `direction`.
 *     • If `autoPlay>0`, we set up a `setInterval` to call `goNext()` every autoPlay ms.
 *     • We render exactly one item inside a Framer Motion `<AnimatePresence>`,
 *       passing `variants`, `direction`, and a `transition` for smooth spring.
 *
 * In both cases, the same `NavigationButton` is used. We simply hide it (via
 * a local boolean) when we’re at the start/end and loop=false.
 *
 * Single responsibility is respected by:
 *  • Pulling out arrow buttons into `NavigationButton.jsx`.
 *  • Keeping scroll vs slider logic gated behind `mode`.
 *  • Exposing only a simple `renderItem` prop so you can “slot in” any kind of card.
 *  • Not mixing concerns: slider-only props live in a block, scroll-only props in another.
 *
 *  * We have added three new OPTIONAL props for “external control”:
 *  • currentIndex       (number)  → override internal index
 *  • externalDirection  (number)  → override internal direction
 *  • onDragEnd          (func)    → callback when user drags/swipes
 *
 * If you pass currentIndex (and externalDirection), Carousel will:
 *   – ignore its own internal index/direction state
 *   – render exactly items[currentIndex]
 *   – use externalDirection for enter/exit variants
 *   – call onDragEnd(...) instead of its own swipe logic
 * ----------------------------------------------------------------
 */
export default function Carousel({
  items,
  renderItem,
  mode = "slider",
  // INTERNAL slider-mode props (ignored if external control is provided):
  initialIndex = 0,
  loop = false,
  showControls = true,
  autoPlay = 0,
  scrollAmount = "80%",
  itemWidthClass = "",
  transitionClass = "transition-all duration-500 ease-in-out",
  size = "md",
  className = "",
  variants = {
    enter: (direction) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: { x: 0, opacity: 1 },
    exit: (direction) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
    }),
  },

  // ► NEW “external” control props for slider mode:
  currentIndex = undefined, // if provided, Carousel will render items[currentIndex] instead of its own index
  externalDirection = 0, // if provided, this is the “direction” passed to motion variants
  onDragEnd = undefined, // if provided, Carousel calls this instead of using its own swipe logic

  // END NEW props
}) {
  // Total number of items
  const total = Array.isArray(items) ? items.length : 0;

  // Refs (only used in scroll mode)
  const containerRef = useRef(null);

  // ────────────── SLIDER-MODE INTERNAL STATE (used only if currentIndex is NOT provided) ──────────────
  const [index, setIndex] = useState(initialIndex);
  const [direction, setDirection] = useState(0);

  //───────────────────────────────────────────────────────────────────────────
  // 1) HANDLERS FOR “slider” MODE (single-item Framer animations)
  //───────────────────────────────────────────────────────────────────────────

  // Pagination callbacks (internal) for slider mode
  const goPrev = useCallback(() => {
    if (total === 0) return;
    setDirection(-1);
    setIndex((prev) => (prev === 0 ? (loop ? total - 1 : 0) : prev - 1));
  }, [loop, total]);

  const goNext = useCallback(() => {
    if (total === 0) return;
    setDirection(1);
    setIndex((prev) =>
      prev === total - 1 ? (loop ? 0 : total - 1) : prev + 1
    );
  }, [loop, total]);

  // Autoplay logic (internal only if no external control)
  useEffect(() => {
    // Only do this if mode="slider" AND we are NOT externally controlled AND autoPlay > 0
    if (mode !== "slider" || autoPlay <= 0 || total <= 1) return;
    if (currentIndex !== undefined) return; // skip if external control
    const intervalId = setInterval(() => {
      goNext();
    }, autoPlay);
    return () => clearInterval(intervalId);
  }, [autoPlay, goNext, mode, total, currentIndex]);

  // ────────────── SCROLL-MODE STATE (unchanged) ──────────────

  //  whether we’re at start/end (for hiding arrows)
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);
  //───────────────────────────────────────────────────────────────────────────
  // 2) HANDLERS FOR “scroll” MODE (multi-item scroll)
  //───────────────────────────────────────────────────────────────────────────

  // Scroll by a computed number of pixels (or percentage of container width)
  const scrollContainerBy = (directionStr) => {
    const container = containerRef.current;
    if (!container) return;

    // Determine raw scroll value: either in px (if numeric) or % of offsetWidth
    let value;
    if (typeof scrollAmount === "string" && scrollAmount.endsWith("%")) {
      const pct = parseFloat(scrollAmount) / 100;
      value = pct * container.offsetWidth;
    } else {
      value = parseFloat(scrollAmount);
    }

    container.scrollBy({
      left: directionStr === "left" ? -value : value,
      behavior: "smooth",
    });
  };

  const scrollPrev = () => {
    scrollContainerBy("left");
  };

  const scrollNext = () => {
    scrollContainerBy("right");
  };

  // On scroll, update atStart/atEnd so we know whether to hide arrows
  useEffect(() => {
    if (mode !== "scroll" || !containerRef.current) return;

    const container = containerRef.current;

    const updateScrollStatus = () => {
      const { scrollLeft, scrollWidth, clientWidth } = container;
      // within 10px of either edge → consider atStart/atEnd
      setAtStart(scrollLeft <= 10);
      setAtEnd(scrollLeft + clientWidth >= scrollWidth - 10);
    };

    updateScrollStatus(); // initialize on mount
    container.addEventListener("scroll", updateScrollStatus);
    return () => container.removeEventListener("scroll", updateScrollStatus);
  }, [mode]);

  // ────────────── Determine which index/direction to use ──────────────
  // If `currentIndex` is provided, use that; otherwise, fall back to internal `index`.
  const actualIndex = currentIndex !== undefined ? currentIndex : index;
  // If `externalDirection` is provided, use that; otherwise, fall back to internal `direction`.
  const actualDirection =
    currentIndex !== undefined ? externalDirection : direction;

  // Should we hide Prev/Next? (shared logic for both modes)

  // For hiding arrows if loop=false
  const shouldHidePrev =
    mode === "scroll" ? atStart && !loop : index === 0 && !loop;

  const shouldHideNext =
    mode === "scroll" ? atEnd && !loop : index === total - 1 && !loop;

  // If no items, render nothing
  if (total === 0 || !Array.isArray(items)) {
    return null;
  }

  return (
    <div className={cn("relative w-full", className)}>
      {/* ─── NAVIGATION CONTROLS (shared by both modes) ───────────────────── */}
      {showControls && total > 1 && (
        <div className="absolute inset-y-0 left-0 right-0 z-10 flex items-center justify-between px-2 md:px-6 pointer-events-none">
          {/* Hide “Prev” if atStart or at first slide (and not looping) */}
          {!shouldHidePrev && (
            <NavigationButton
              onClick={
                mode === "scroll"
                  ? scrollPrev
                  : currentIndex !== undefined
                  ? () => {
                      /* if externally controlled, do nothing here.
                         Caller (e.g. TestimonialsSection) will supply its own arrow. */
                    }
                  : goPrev
              }
              label="Previous"
              direction="left"
              size={size}
            />
          )}

          {/* Hide “Next” if atEnd or at last slide (and not looping) */}
          {!shouldHideNext && (
            <NavigationButton
              onClick={
                mode === "scroll"
                  ? scrollNext
                  : currentIndex !== undefined
                  ? () => {
                      /* no-op; externally controlled by parent component */
                    }
                  : goNext
              }
              label="Next"
              direction="right"
              size={size}
            />
          )}
        </div>
      )}

      {/* ─── CONTENT RENDERING ─────────────────────────────────────────────── */}
      {mode === "scroll" ? (
        <div
          ref={containerRef}
          className="flex gap-2 overflow-x-hidden scroll-smooth no-scrollbar"
        >
          {items.map((item, i) => (
            <div key={i} className={cn("snap-start shrink-0", itemWidthClass)}>
              {renderItem(item, i)}
            </div>
          ))}
        </div>
      ) : (
        // ─── SLIDER MODE: show exactly ONE item at a time ────────────────
        <div className={cn("relative w-full overflow-hidden", transitionClass)}>
          {/* We set a min‐height so the container doesn’t collapse when unmounting */}
          <div className="relative w-full h-full overflow-hidden min-h-[360px]">
            <AnimatePresence
              initial={false}
              custom={actualDirection}
              mode="wait"
            >
              <motion.div
                key={actualIndex} // important: unique key so AnimatePresence animates correctly
                custom={actualDirection}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 },
                }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                onDragEnd={(e, info) => {
                  if (onDragEnd) {
                    // If parent provided an onDragEnd, call it
                    onDragEnd(e, info);
                  } else {
                    // Otherwise fallback to internal swipe logic
                    const swipePower = info.offset.x * info.velocity.x;
                    const threshold = 1000;
                    if (swipePower < -threshold) {
                      goNext();
                    } else if (swipePower > threshold) {
                      goPrev();
                    }
                  }
                }}
                className="absolute w-full h-full top-0 left-0 flex justify-center items-center"
              >
                {renderItem(items[actualIndex], actualIndex)}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      )}
    </div>
  );
}

Carousel.propTypes = {
  items: PropTypes.array.isRequired,
  renderItem: PropTypes.func.isRequired,

  mode: PropTypes.oneOf(["scroll", "slider"]),
  initialIndex: PropTypes.number,
  loop: PropTypes.bool,
  showControls: PropTypes.bool,
  autoPlay: PropTypes.number,

  scrollAmount: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  itemWidthClass: PropTypes.string,
  transitionClass: PropTypes.string,

  size: PropTypes.oneOf(["sm", "md", "lg"]),
  className: PropTypes.string,

  // Only used when mode="slider"
  variants: PropTypes.shape({
    enter: PropTypes.func.isRequired,
    center: PropTypes.object.isRequired,
    exit: PropTypes.func.isRequired,
  }),

  // ─── NEW props: external slider control ──────────────────────────────
  currentIndex: PropTypes.number,
  externalDirection: PropTypes.number,
  onDragEnd: PropTypes.func,
};

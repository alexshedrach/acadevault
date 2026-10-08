"use client";
import { useId } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import NavigationArrows from "./NavigationArrows";
import PausePlayToggle from "./PausePlayToggle";
import ProgressBar from "./ProgressBar";
import SlideNavigation from "./SlideNavigation";

export default function Slider({
  slides,
  interval = 5000,
  pauseDelay = 2000,
  transitionDuration = 0.6,
  swipeThreshold = 50,
  showArrows = true,
  showDots = true,
  showPauseToggle = true,
  showProgressBar = false,
  progressPosition = "bottom",
  variant = "linear",
  autoResumeOnHoverOut = true,
}) {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const debounceRef = useRef(null);
  const touchStartX = useRef(0);
  let touchStartTime = useRef(0);
  const touchEndX = useRef(0);
  const sectionRef = useRef(null);

  const sliderId = useId();

  const resetAutoplay = useCallback(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    setPaused(true);
    debounceRef.current = setTimeout(() => {
      setPaused(false);
    }, pauseDelay);
  }, [pauseDelay]);

  const goTo = useCallback(
    (index) => {
      setCurrent(index);
      resetAutoplay();
    },
    [resetAutoplay]
  );

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const prev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  }, [slides.length]);

  const handleTouchStart = (e) => {
    touchStartX.current = e.changedTouches[0].screenX;
    touchStartTime.current = Date.now();
  };
  const handleTouchEnd = (e) => {
    touchEndX.current = e.changedTouches[0].screenX;
    const delta = touchStartX.current - touchEndX.current;
    const duration = Date.now() - touchStartTime.current;

    if (Math.abs(delta) > swipeThreshold && duration < 1000) {
      delta > 0 ? next() : prev();
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "ArrowRight") next();
    else if (e.key === "ArrowLeft") prev();
    else if (e.key === " " || e.key === "Spacebar") {
      e.preventDefault();
      setPaused((prev) => !prev);
    }
  };

  const handleMouseEnter = () => {
    setPaused(true);
  };

  const handleMouseLeave = () => {
    if (autoResumeOnHoverOut) resetAutoplay();
  };

  useEffect(() => {
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, []);

  useEffect(() => {
    sectionRef.current?.focus();
  }, []);


  return (
    <div
      ref={sectionRef}
      id={sliderId}
      className="relative w-full h-full overflow-hidden outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      aria-roledescription="carousel"
      aria-label="Content Slider"
    >
      <AnimatePresence mode="sync">
        <motion.div
          key={slides[current].id}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: transitionDuration }}
          className="absolute top-0 left-0 w-full h-full"
        >
          {slides[current].content}
        </motion.div>
      </AnimatePresence>

      {showProgressBar && (
        <ProgressBar
          key={current}
          duration={interval}
          isPaused={paused}
          onComplete={next}
          position={progressPosition}
          variant={variant}
          colorClass="from-yellow-200 via-green-300 to-blue-100"
        />
      )}
      {showDots && (
        <div role="region" aria-label="Slide navigation controls">
          <SlideNavigation
            slides={slides}
            currentSlide={current}
            goToSlide={goTo}
          />
        </div>
      )}

      {showArrows && (
        <div role="region" aria-label="Slider navigation controls">
          <NavigationArrows
            size={36}
            goToPrevSlide={prev}
            goToNextSlide={next}
            keyboardNav={true} // Optional: can toggle via prop or device check
          />
        </div>
      )}

      {/* inside your Slider’s JSX */}
      {showPauseToggle && (
        <PausePlayToggle
          size={30}
          isPaused={paused}
          togglePause={() => setPaused((prev) => !prev)}
          onTogglePause={(newState) => {
            // if you need to hook into pause/play events,
            // e.g. reset your autoplay debounce:
            if (!newState) {
              // resuming
              resetAutoplay();
            }
          }}
          autoHide={true} // hide the button when idle
          hideDelay={3000} // ms until it fades out
          position="top-4 right-4"
          className="z-30"
        />
      )}
    </div>
  );
}

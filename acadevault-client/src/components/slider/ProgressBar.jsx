"use client";

import { motion, useAnimation } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import clsx from "clsx";

export default function ProgressBar({
  duration = 5000,
  isPaused = false,
  onComplete = () => {},
  position = "bottom",
  variant = "linear",
  colorClass = "from-yellow-200 via-green-300 to-blue-100",
  className = "",
  ariaLabel = "Slide progress",
}) {
  const controls = useAnimation();
  const [progress, setProgress] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);
  const intervalRef = useRef(null);
  const hasCompleted = useRef(false);

  useEffect(() => {
    if (isPaused) {
      controls.stop();
      clearInterval(intervalRef.current);
      return;
    }

    let timeoutAfterFade;
    setProgress(0);
    setFadeOut(false);
    hasCompleted.current = false;

    // Start linear bar animation (Framer Motion)
    controls.start({
      width: "100%",
      opacity: 1,
      transition: {
        duration: duration / 1000,
        ease: "linear",
      },
    });

    const startTime = Date.now();

    intervalRef.current = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const percentage = Math.min((elapsed / duration) * 100, 100);
      setProgress(Math.round(percentage));

      if (percentage >= 100 && !hasCompleted.current) {
        hasCompleted.current = true;
        clearInterval(intervalRef.current);
        setFadeOut(true);

        // Wait for fade out to complete (0.4s), then trigger onComplete
        timeoutAfterFade = setTimeout(() => {
          onComplete();
        }, 400);
      }
    }, 50); // More frequent updates = smoother progress bar

    return () => {
      clearInterval(intervalRef.current);
      clearTimeout(timeoutAfterFade);
    };
  }, [isPaused, duration, controls, onComplete]);
  

  const positionClass = {
    top: "top-0 left-0 w-full",
    bottom: "bottom-0 left-0 w-full",
    center:
      "top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full",
  }[position];

  if (variant === "radial") {
    const radius = 15.9155;
    const circumference = 2 * Math.PI * radius;
    const offset = ((100 - progress) / 100) * circumference;

    return (
      <div
        role="progressbar"
        aria-label={ariaLabel}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={progress}
        aria-valuetext={`${progress}%`}
        className={clsx("relative w-12 h-12", className)}
      >
        <svg
          className="absolute top-0 left-0 w-full h-full"
          viewBox="0 0 36 36"
        >
          <circle
            cx="18"
            cy="18"
            r={radius}
            fill="none"
            stroke="#e5e7eb"
            strokeWidth="4"
          />
          <motion.circle
            cx="18"
            cy="18"
            r={radius}
            fill="none"
            strokeWidth="4"
            stroke="url(#radial-gradient)"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 0.1 }}
          />
          <defs>
            <linearGradient
              id="radial-gradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="#facc15" />
              <stop offset="100%" stopColor="#4ade80" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    );
  }

  return (
    <div
      role="progressbar"
      aria-label={ariaLabel}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={progress}
      aria-valuetext={`${progress}%`}
      aria-busy={!fadeOut}
      className={clsx(
        "absolute h-2 rounded-full overflow-hidden z-20",
        positionClass,
        className
      )}
    >
      <motion.div
        className={clsx(
          "h-full bg-gradient-to-r rounded-full shadow-md",
          colorClass
        )}
        animate={controls}
        initial={{ width: "0%", opacity: 1 }}
        style={{ willChange: "width, opacity" }}
      />
      {fadeOut && (
        <motion.div
          className={clsx("absolute inset-0 bg-gradient-to-r", colorClass)}
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        />
      )}
    </div>
  );
}

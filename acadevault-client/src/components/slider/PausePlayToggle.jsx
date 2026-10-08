"use client";

import React, { useEffect, useState, useCallback } from "react";
import { Pause, Play } from "lucide-react";
import { motion } from "framer-motion";
import * as Tooltip from "@radix-ui/react-tooltip";
import { useTheme } from "next-themes";

const PausePlayToggle = ({
  isPaused,
  togglePause,
  onTogglePause,
  size = 36,
  className = "",
  position = "top-4 right-4",
  autoHide = true,
  hideDelay = 3000,
}) => {
  const [visible, setVisible] = useState(true);
  const { resolvedTheme } = useTheme();

  const handleToggle = useCallback(() => {
    togglePause();
    onTogglePause?.(!isPaused);
    if (navigator.vibrate) navigator.vibrate(10);
  }, [isPaused, onTogglePause, togglePause]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleToggle();
    }
  };

  useEffect(() => {
    if (!autoHide) return;

    let timeout;

    const resetTimer = () => {
      clearTimeout(timeout);
      setVisible(true);
      timeout = setTimeout(() => setVisible(false), hideDelay);
    };

    window.addEventListener("mousemove", resetTimer);
    window.addEventListener("keydown", resetTimer);
    resetTimer();

    return () => {
      clearTimeout(timeout);
      window.removeEventListener("mousemove", resetTimer);
      window.removeEventListener("keydown", resetTimer);
    };
  }, [autoHide, hideDelay]);

  const isDark = resolvedTheme === "dark";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.4 }}
      className={`absolute z-30 ${position} ${className}`}
    >
      <Tooltip.Provider delayDuration={100}>
        <Tooltip.Root>
          <Tooltip.Trigger asChild>
            <motion.button
              onClick={handleToggle}
              onKeyDown={handleKeyDown}
              aria-label={isPaused ? "Play Slider" : "Pause Slider"}
              aria-pressed={isPaused}
              title={isPaused ? "Play" : "Pause"}
              className={`flex justify-center items-center rounded-full shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 transition-transform
                ${
                  isDark
                    ? "bg-gradient-to-br from-gray-800 via-gray-700 to-gray-600 text-white"
                    : "bg-gradient-to-br from-gray-200 via-gray-100 to-white text-black"
                }`}
              style={{ width: size, height: size }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              {isPaused ? (
                <Play size={size * 0.6} />
              ) : (
                <Pause size={size * 0.6} />
              )}
            </motion.button>
          </Tooltip.Trigger>
          <Tooltip.Portal>
            <Tooltip.Content
              side="left"
              className="bg-black text-white px-2 py-1 rounded text-sm shadow-lg select-none"
            >
              {isPaused ? "Play" : "Pause"}
            </Tooltip.Content>
          </Tooltip.Portal>
        </Tooltip.Root>
      </Tooltip.Provider>
    </motion.div>
  );
};

export default PausePlayToggle;

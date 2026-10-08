"use client";

import React from "react";
import { motion } from "framer-motion";
import { PlayCircle } from "lucide-react";
import { usePreferences } from "@/contexts/PreferencesContext";

const Preferences = () => {
  const {
    showVideo,
    setShowVideo,
    highContrast,
    setHighContrast,
    reducedMotion,
    setReducedMotion,
  } = usePreferences();

  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-2">
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setShowVideo(!showVideo)}
        className="p-2 bg-white/20 rounded-full text-white"
        aria-label={
          showVideo ? "Disable video background" : "Enable video background"
        }
        title={showVideo ? "Disable Video" : "Enable Video"}
      >
        <PlayCircle className="w-5 h-5" />
      </motion.button>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setHighContrast(!highContrast)}
        className="p-2 bg-white/20 rounded-full text-white"
        aria-label={
          highContrast ? "Disable high contrast" : "Enable high contrast"
        }
        title={highContrast ? "Normal Contrast" : "High Contrast"}
      >
        {highContrast ? "Normal" : "Contrast"}
      </motion.button>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setReducedMotion(!reducedMotion)}
        className="p-2 bg-white/20 rounded-full text-white"
        aria-label={reducedMotion ? "Enable animations" : "Disable animations"}
        title={reducedMotion ? "Enable Motion" : "Disable Motion"}
      >
        {reducedMotion ? "Motion" : "No Motion"}
      </motion.button>
    </div>
  );
};

export default Preferences;

"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

const PreferencesContext = createContext();

export const PreferencesProvider = ({ children }) => {
  const [showVideo, setShowVideo] = useState(true);
  const [highContrast, setHighContrast] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mediaQuery.matches);

    const savedPrefs = JSON.parse(
      localStorage.getItem("affiliate-prefs") || "{}"
    );
    if (savedPrefs.showVideo !== undefined) setShowVideo(savedPrefs.showVideo);
    if (savedPrefs.highContrast !== undefined)
      setHighContrast(savedPrefs.highContrast);
    if (savedPrefs.reducedMotion !== undefined)
      setReducedMotion(savedPrefs.reducedMotion);

    const handleChange = () => {
      localStorage.setItem(
        "affiliate-prefs",
        JSON.stringify({ showVideo, highContrast, reducedMotion })
      );
    };
    window.addEventListener("storage", handleChange);
    return () => window.removeEventListener("storage", handleChange);
  }, [showVideo, highContrast, reducedMotion]);

  return (
    <PreferencesContext.Provider
      value={{
        showVideo,
        setShowVideo,
        highContrast,
        setHighContrast,
        reducedMotion,
        setReducedMotion,
      }}
    >
      {children}
    </PreferencesContext.Provider>
  );
};

export const usePreferences = () => {
  const context = useContext(PreferencesContext);
  if (!context) {
    throw new Error("usePreferences must be used within a PreferencesProvider");
  }
  return context;
};

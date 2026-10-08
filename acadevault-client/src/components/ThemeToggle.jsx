"use client";

import { useEffect, useState } from "react";
import { FaSun, FaMoon } from "react-icons/fa";

export default function ThemeToggle() {
  const [theme, setTheme] = useState(null);

  // Detect preferred theme on client
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    const systemPrefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    const resolvedTheme = storedTheme || (systemPrefersDark ? "dark" : "light");

    setTheme(resolvedTheme);
    document.documentElement.classList.toggle("dark", resolvedTheme === "dark");
  }, []);

  // Toggle and persist theme
  const toggleTheme = () => {
    if (!theme) return;

    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
    localStorage.setItem("theme", newTheme);
  };

  if (!theme) return null; // Prevent render until theme is resolved

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full text-yellow-600 hover:bg-gray-100 transition cursor-pointer"
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
      title={`Toggle ${theme === "light" ? "dark" : "light"} mode`}
    >
      {theme === "dark" ? <FaSun size={18} /> : <FaMoon size={18} />}
    </button>
  );
}

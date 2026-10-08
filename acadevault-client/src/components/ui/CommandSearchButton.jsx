"use client";

import { useState, useEffect } from "react";
import { useHotkeys } from "react-hotkeys-hook";
import { BiSearch } from "react-icons/bi";
import SearchModal from "@/components/modals/SearchModal";

export default function CommandSearchButton() {
  const [isOpen, setIsOpen] = useState(false);

  // Keyboard shortcut to open modal
  useHotkeys(
    "ctrl+k, meta+k",
    (e) => {
      e.preventDefault();
      setIsOpen(true);
    },
    { enableOnTags: ["INPUT", "TEXTAREA", "SELECT"] }
  );

  // Close on Escape
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      window.addEventListener("keydown", handleEscape);
    }
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isOpen]);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        aria-label="Open search"
        className="flex w-full max-w-xl items-center justify-between gap-2 rounded-md border border-gray-300 bg-white px-4 py-2 shadow-sm transition-all hover:border-gray-400 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-orange-500"
      >
        <div className="flex items-center gap-2 text-gray-500">
          <BiSearch className="text-xl opacity-70" />
          <span className="text-sm text-gray-500">
            Search for academic materials, topics, courses...
          </span>
        </div>
        <kbd className="ml-auto rounded border border-gray-200 bg-gray-100 px-2 py-0.5 text-xs font-mono text-gray-500 shadow-inner">
          ⌘ / Ctrl K
        </kbd>
      </button>

      <SearchModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}

"use client";

import React, { useEffect, useRef, useCallback, useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import clsx from "clsx";
import { useCountry } from "@/contexts/CountryContext";

const DEFAULT_COUNTRIES = ["Nigeria", "USA", "UK", "Canada", 'South Africa'];

const CountrySelector = ({
  countries = DEFAULT_COUNTRIES,
  buttonClassName = "",
}) => {
  const { country, setCountry } = useCountry();
  const [showDropdown, setShowDropdown] = useState(false);

  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);

  const handleSelect = (selected) => {
    setCountry(selected);
    setShowDropdown(false);
    buttonRef.current?.focus();
  };

  const handleClickOutside = useCallback((e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setShowDropdown(false);
    }
  }, []);

  const handleEsc = useCallback((e) => {
    if (e.key === "Escape") {
      setShowDropdown(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEsc);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEsc);
    };
  }, [handleClickOutside, handleEsc]);

  return (
    <div className="relative text-sm" ref={dropdownRef}>
      <button
        ref={buttonRef}
        aria-haspopup="listbox"
        aria-expanded={showDropdown}
        onClick={() => setShowDropdown((prev) => !prev)}
        className={clsx(
          "flex items-center px-3 py-1.5 border rounded-md text-gray-700 hover:bg-gray-100 transition font-medium focus:outline-none focus:ring-2 focus:ring-blue-500",
          buttonClassName
        )}
      >
        🌍 {country}
        <FaChevronDown className="ml-2 text-xs" />
      </button>

      {showDropdown && (
        <ul
          role="listbox"
          className="absolute right-0 mt-2 w-44 bg-white border border-gray-200 shadow-md rounded-md z-50"
        >
          {countries.map((c) => (
            <li key={c}>
              <button
                role="option"
                aria-selected={c === country}
                onClick={() => handleSelect(c)}
                className={clsx(
                  "w-full text-left px-4 py-2 text-sm transition-colors",
                  c === country
                    ? "bg-gray-100 font-semibold"
                    : "hover:bg-gray-50"
                )}
              >
                {c}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CountrySelector;

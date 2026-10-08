"use client";

import { useState, useContext, useRef, useEffect, useCallback } from "react";
import { FaChevronDown } from "react-icons/fa";
import { cn } from "@/utils/cn";
import { CurrencyContext } from "@/contexts/CurrencyContext";
import { CURRENCIES, currencySymbols } from "@/constants/enums";

const CurrencySelector = ({
  asDropdown = false,
  label = "",
  buttonClassName = "",
}) => {
  const context = useContext(CurrencyContext);
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);
  const [showDropdown, setShowDropdown] = useState(false);

  if (!context) {
    console.error(
      "CurrencyContext not found. Ensure CurrencySelector is wrapped with CurrencyProvider."
    );
    return null;
  }

  const { currency, setCurrency } = context;

  const closeDropdown = useCallback(() => {
    setShowDropdown(false);
    buttonRef.current?.focus();
  }, []);

  // Close dropdown on outside click or ESC
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        closeDropdown();
      }
    };

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        closeDropdown();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [closeDropdown]);

  // Keyboard navigation for dropdown
  const handleKeyDownDropdown = (e, code) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setCurrency(code);
      closeDropdown();
    }
  };

  if (!asDropdown) {
    return (
      <label className="flex items-center gap-2 text-sm text-gray-700">
        {label && <span>{label}</span>}
        <select
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
          className="border rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label="Select currency"
        >
          {CURRENCIES.map((code) => (
            <option key={code} value={code}>
              {currencySymbols[code]} {code}
            </option>
          ))}
        </select>
      </label>
    );
  }

  return (
    <div className="relative inline-block text-sm" ref={dropdownRef}>
      <button
        type="button"
        ref={buttonRef}
        onClick={() => setShowDropdown((prev) => !prev)}
        aria-haspopup="listbox"
        aria-expanded={showDropdown}
        aria-label={`Select currency, current: ${currency}`}
        className={cn(
          "flex items-center px-3 py-1.5 rounded-md border text-gray-700 hover:bg-gray-100 transition cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500",
          buttonClassName
        )}
      >
        <span>
          {currencySymbols[currency]} {currency}
        </span>
        <FaChevronDown className="ml-2 text-xs" />
      </button>

      {showDropdown && (
        <ul
          role="listbox"
          aria-label="Currency options"
          className="absolute right-0 mt-2 w-44 bg-white border border-gray-200 shadow-lg rounded-md z-50 max-h-64 overflow-y-auto"
        >
          {CURRENCIES.map((code, index) => (
            <li key={code} role="option" aria-selected={code === currency}>
              <button
                type="button"
                onClick={() => {
                  setCurrency(code);
                  closeDropdown();
                }}
                onKeyDown={(e) => handleKeyDownDropdown(e, code)}
                className={cn(
                  "w-full text-left px-4 py-2 text-sm transition-colors",
                  code === currency
                    ? "bg-gray-100 font-semibold"
                    : "hover:bg-gray-50 focus:bg-gray-50"
                )}
              >
                {currencySymbols[code]} {code}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CurrencySelector;

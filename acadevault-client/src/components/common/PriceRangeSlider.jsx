"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
import Slider from "@mui/material/Slider";

const CURRENCY_SYMBOLS = {
  USD: "$",
  NGN: "₦",
  EUR: "€",
  GBP: "£",
  CAD: "CA$",
  INR: "₹",
};

export default function PriceRangeSlider({
  value = [0, 10000],
  min = 0,
  max = 10000,
  loading = false,
  onChange = () => {},
  onApply = () => {},
  onReset = () => {},
  currency = "USD",
}) {
  const [tempRange, setTempRange] = useState(value);
  const currencySymbol = useMemo(
    () => CURRENCY_SYMBOLS[currency] || currency,
    [currency]
  );

  useEffect(() => {
    setTempRange(value);
  }, [value]);

  const handleSliderChange = useCallback(
    (_, newValue) => {
      setTempRange(newValue);
      onChange(newValue);
    },
    [onChange]
  );

  const handleInputChange = useCallback(
    (index, val) => {
      const num = Number(val);
      if (!isNaN(num)) {
        const updatedRange = [...tempRange];
        updatedRange[index] = Math.min(Math.max(num, min), max);

        // Ensure lower bound is not higher than upper bound
        if (index === 0 && updatedRange[0] > updatedRange[1]) {
          updatedRange[0] = updatedRange[1];
        } else if (index === 1 && updatedRange[1] < updatedRange[0]) {
          updatedRange[1] = updatedRange[0];
        }

        setTempRange(updatedRange);
        onChange(updatedRange);
      }
    },
    [tempRange, min, max, onChange]
  );

  const applyFilter = useCallback(() => {
    onApply(tempRange);
  }, [tempRange, onApply]);

  const resetFilter = useCallback(() => {
    setTempRange([min, max]);
    onReset();
  }, [min, max, onReset]);

  const isPriceActive = useMemo(() => {
    return tempRange[0] !== min || tempRange[1] !== max;
  }, [tempRange, min, max]);

  return (
    <div className="space-y-5 p-3">
      {/* Display */}
      <div className="flex justify-between text-gray-800 text-sm font-medium">
        <span>
          {currencySymbol}
          {tempRange[0].toLocaleString()}
        </span>
        <span>
          {currencySymbol}
          {tempRange[1].toLocaleString()}
        </span>
      </div>

      {/* MUI Slider */}
      {loading ? (
        <div className="h-6 bg-gray-200 animate-pulse rounded" />
      ) : (
        <Slider
          getAriaLabel={() => "Price range"}
          value={tempRange}
          onChange={handleSliderChange}
          valueLabelDisplay="off"
          min={min}
          max={max}
          sx={{
            color: "#2563eb", // Tailwind blue-600
            height: 6,
            "& .MuiSlider-thumb": {
              width: 18,
              height: 18,
              backgroundColor: "#fff",
              border: "2px solid #2563eb",
              boxShadow: "0 0 0 4px rgba(37,99,235,0.2)",
              "&:hover, &.Mui-focusVisible": {
                boxShadow: "0 0 0 6px rgba(37,99,235,0.3)",
              },
            },
          }}
        />
      )}

      {/* Input Fields */}
      <div className="flex items-center gap-4">
        {["Min", "Max"].map((label, idx) => (
          <div className="flex-1 relative" key={label}>
            <span className="absolute left-3 top-2.5 text-gray-500">
              {currencySymbol}
            </span>
            <input
              inputMode="numeric"
              type="number"
              value={tempRange[idx]}
              onChange={(e) => handleInputChange(idx, e.target.value)}
              className="pl-8 pr-3 py-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm"
              placeholder={label}
              min={min}
              max={max}
              disabled={loading}
            />
          </div>
        ))}
      </div>

      {/* Actions */}
      <div className="flex justify-between pt-1">
        <button
          onClick={applyFilter}
          disabled={loading}
          className="bg-blue-600 text-white text-sm px-4 py-2 rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:outline-none transition disabled:opacity-50"
        >
          Apply
        </button>
        <button
          onClick={resetFilter}
          disabled={loading || !isPriceActive}
          className="text-sm text-gray-600 hover:text-red-500 focus:outline-none transition disabled:opacity-50"
        >
          Reset
        </button>
      </div>
    </div>
  );
}

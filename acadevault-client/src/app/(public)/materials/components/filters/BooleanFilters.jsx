import React, { useCallback } from "react";

const booleanOptions = [
  { label: "Free Materials", key: "isFree" },
  { label: "Featured", key: "isFeatured" },
  { label: "Trending", key: "isTrending" },
];

const BooleanFilters = ({ defaultSelected = {}, onChange, onReset }) => {
  const handleCheckboxChange = useCallback(
    (key) => {
      const updated = { ...defaultSelected, [key]: !defaultSelected[key] };
      onChange(updated);
    },
    [defaultSelected, onChange]
  );

  return (
    <div className="flex flex-col gap-4">
      {booleanOptions.map((option) => (
        <div
          key={option.key}
          className="flex justify-between items-center p-3 rounded-md border border-gray-200 shadow-sm hover:shadow-md transition duration-200 bg-white"
        >
          <span className="text-sm font-medium text-gray-800">
            {option.label}
          </span>
          <label className="inline-flex relative items-center cursor-pointer">
            <input
              type="checkbox"
              checked={!!defaultSelected[option.key]}
              onChange={() => handleCheckboxChange(option.key)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-500 rounded-full peer peer-checked:bg-blue-600 transition-all duration-300"></div>
            <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow-md transform peer-checked:translate-x-5 transition-transform duration-300"></div>
          </label>
        </div>
      ))}

      {Object.values(defaultSelected).some(Boolean) && (
        <button
          onClick={onReset}
          className="self-start text-sm text-blue-600 hover:underline mt-1"
        >
          Reset Filters
        </button>
      )}
    </div>
  );
};

export default BooleanFilters;

import React, { useCallback } from "react";

const formats = ["digital", "physical", "hybrid"];

const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

const DeliveryFormatFilter = ({ defaultSelected = [], onChange, onReset }) => {
  const handleCheckboxChange = useCallback(
    (format) => {
      const isSelected = defaultSelected.includes(format);
      const updated = isSelected
        ? defaultSelected.filter((f) => f !== format)
        : [...defaultSelected, format];

      onChange(updated);
    },
    [defaultSelected, onChange]
  );

  return (
    <div className="p-3">
      <div className="flex flex-col gap-3">
        {formats.map((format) => (
          <label
            key={format}
            className="flex items-center justify-between p-2 rounded-md cursor-pointer border border-transparent hover:border-blue-200 transition group"
          >
            <span className="text-sm text-gray-700 group-hover:text-blue-600 transition-colors">
              {capitalize(format)}
            </span>
            <input
              type="checkbox"
              checked={defaultSelected.includes(format)}
              onChange={() => handleCheckboxChange(format)}
              className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 transition duration-200"
            />
          </label>
        ))}
      </div>

      {defaultSelected.length > 0 && (
        <div className="mt-4 border-t border-gray-100 pt-3">
          <button
            onClick={onReset}
            className="text-xs font-medium text-blue-600 hover:underline transition"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
};

export default DeliveryFormatFilter;

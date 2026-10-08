"use client";

import React, { useState, useCallback, useEffect } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

function LevelsWithDegreeFilter({
  data = [],
  defaultSelected = [],
  onChange = () => {},
}) {
  const [expandedLevel, setExpandedLevel] = useState(null);
  const [selectedDegreesByLevel, setSelectedDegreesByLevel] = useState({});

  // Initialize from default
  useEffect(() => {
    if (defaultSelected.length > 0) {
      const init = {};
      defaultSelected.forEach((deg) => {
        data.forEach(({ level, degrees }) => {
          if (degrees.some((d) => d.code === deg)) {
            init[level] = [...(init[level] || []), deg];
          }
        });
      });
      setSelectedDegreesByLevel(init);
      const levels = Object.keys(init);
      if (levels.length === 1) setExpandedLevel(levels[0]);
    }
  }, [defaultSelected, data]);

  const handleToggleExpand = useCallback((level) => {
    setExpandedLevel((prev) => (prev === level ? null : level));
  }, []);

  const handleDegreeToggle = useCallback(
    (degreeCode, parentLevel) => {
      setSelectedDegreesByLevel((prev) => {
        const current = prev[parentLevel] || [];
        const isSelected = current.includes(degreeCode);

        // Create a new state where only the current level is active
        const updatedDegrees = isSelected
          ? [] // Unchecking the only selected one = clear
          : [degreeCode]; // Replace with the new one

        const next = updatedDegrees.length
          ? { [parentLevel]: updatedDegrees }
          : {}; // Clear all if nothing is selected

        setExpandedLevel(parentLevel); // Expand the new one

        const allDegrees = Object.values(next).flat();

        onChange({
          degrees: allDegrees,
          level: parentLevel,
          full: next,
        });

        return next;
      });
    },
    [onChange]
  );

  return (
    <div className="space-y-4">
      <ul className="space-y-2">
        {data.map(({ level, degrees }) => {
          const isExpanded = expandedLevel === level;
          const selected = selectedDegreesByLevel[level] || [];
          return (
            <li key={level}>
              <button
                type="button"
                onClick={() => handleToggleExpand(level)}
                className={`flex justify-between items-center w-full text-left px-3 py-2 rounded-md border transition
                    ${
                      isExpanded
                        ? "bg-blue-50 border-blue-500 text-blue-800 font-semibold"
                        : "bg-white border-gray-300 text-gray-700 hover:border-blue-400"
                    }`}
                aria-expanded={isExpanded}
                aria-controls={`degrees-${level}`}
              >
                <span>{level}</span>
                {isExpanded ? (
                  <ChevronUp className="w-4 h-4" />
                ) : (
                  <ChevronDown className="w-4 h-4" />
                )}
              </button>

              {isExpanded && degrees.length > 0 && (
                <ul
                  id={`degrees-${level}`}
                  className="mt-2 ml-4 space-y-1"
                  role="group"
                  aria-labelledby={level}
                >
                  {degrees.map((degree) => (
                    <li key={degree.code}>
                      <label className="inline-flex items-center text-sm text-gray-700">
                        <input
                          type="checkbox"
                          checked={selected.includes(degree.code)}
                          onChange={() =>
                            handleDegreeToggle(degree.code, level)
                          }
                          className="form-checkbox mr-2"
                        />
                        {degree.name}
                      </label>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default LevelsWithDegreeFilter;

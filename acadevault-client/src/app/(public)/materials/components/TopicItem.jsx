import React from "react";

const COLORS = [
  "from-blue-600 to-blue-400",
  "from-purple-600 to-purple-400",
  "from-green-600 to-green-400",
  "from-red-600 to-red-400",
  "from-yellow-600 to-yellow-400",
  "from-teal-600 to-teal-400",
];

const TopicItem = ({ label, colorIndex, onClick }) => {
  const gradientColor = COLORS[colorIndex % COLORS.length];

  return (
    <button
      onClick={onClick}
      aria-label={`Filter materials by tag: ${label}`}
      className="relative w-full h-20 overflow-hidden rounded-lg shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
    >
      {/* Left Gradient Background */}
      <div
        className={`absolute inset-0 bg-gradient-to-r ${gradientColor}`}
        style={{ clipPath: "polygon(0 0, 60% 0, 50% 100%, 0 100%)" }}
      />
      {/* White Slash */}
      <div
        className="absolute inset-0 bg-white"
        style={{ clipPath: "polygon(60% 0, 50% 100%, 50% 100%, 60% 0)" }}
      />
      {/* Right Gradient Background */}
      <div
        className={`absolute inset-0 bg-gradient-to-r ${gradientColor}`}
        style={{ clipPath: "polygon(60% 0, 100% 0, 100% 100%, 50% 100%)" }}
      />
      {/* Label */}
      <span className="relative z-10 flex items-center justify-center h-full font-semibold text-white uppercase tracking-wider text-sm">
        {label}
      </span>
    </button>
  );
};

export default TopicItem;

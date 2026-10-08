import React from "react";
import { motion } from "framer-motion";
import PropTypes from "prop-types";
import { cn } from "@/utils/cn";

/**
 * StatusTag — A floating, animated, contextual tag for visual status indicators
 * on cards or featured elements.
 */

const getTagColor = (type) => {
  switch (type.toLowerCase()) {
    case "sold-out":
    case "high-discount":
      return "bg-red-600";
    case "limited-time":
    case "trending":
      return "bg-orange-500";
    case "promo":
    case "new":
      return "bg-green-600";
    case "info":
      return "bg-blue-600";
    default:
      return "bg-gray-600";
  }
};

const getDefaultIcon = (type) => {
  switch (type.toLowerCase()) {
    case "sold-out":
      return "❌";
    case "new":
      return "🆕";
    case "trending":
      return "🔥";
    case "high-discount":
      return "💸";
    case "promo":
      return "🏷️";
    case "limited-time":
      return "⏳";
    case "info":
      return "ℹ️";
    default:
      return null;
  }
};

const positionMap = {
  "top-left": "top-2 left-2",
  "top-right": "top-2 right-2",
  "bottom-right": "bottom-2 right-2",
  "bottom-left": "bottom-2 left-2",
};

export const StatusTag = ({
  label,
  icon,
  type = "default",
  position = "top-right",
  responsivePosition = {},
  className = "",
  animation = true,
  style,
  ...props
}) => {
  const bgColorClass = getTagColor(type);
  const effectiveIcon = icon ?? getDefaultIcon(type);
  const basePositionClass = positionMap[position] || positionMap["top-right"];

  const responsiveClass = Object.entries(responsivePosition)
    .map(([bp, pos]) => `${bp}:${positionMap[pos] || basePositionClass}`)
    .join(" ");

  const tagContent = (
    <div
      className={cn(
        "absolute z-10 text-white text-[11px] font-medium px-2.5 py-0.5 rounded shadow-sm flex items-center gap-1",
        bgColorClass,
        basePositionClass,
        responsiveClass,
        className
      )}
      style={style}
      {...props}
    >
      {effectiveIcon && <span className="text-xs">{effectiveIcon}</span>}
      <span>{label}</span>
    </div>
  );

  if (!animation) return tagContent;

  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {tagContent}
    </motion.div>
  );
};

StatusTag.propTypes = {
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  icon: PropTypes.node,
  type: PropTypes.oneOf([
    "high-discount",
    "limited-time",
    "promo",
    "default",
    "new",
    "sold-out",
    "trending",
    "info",
  ]),
  className: PropTypes.string,
  position: PropTypes.oneOf([
    "top-left",
    "top-right",
    "bottom-right",
    "bottom-left",
  ]),
  responsivePosition: PropTypes.object, // { sm: 'top-left', md: 'bottom-right' }
  animation: PropTypes.bool,
  style: PropTypes.object,
};

// 🎯 Real-World Usage Examples

{
  /*

<StatusTag
  label="Limited Time"
  type="limited-time"
  position="top-left"
  responsivePosition={{ sm: "top-left", md: "bottom-right" }}
/>

<StatusTag
  label="🔥 Trending"
  type="trending"
  icon="🔥"
  className="animate-bounce"
  animation
/> */
}

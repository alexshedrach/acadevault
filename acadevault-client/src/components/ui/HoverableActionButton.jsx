import React from "react";
import PropTypes from "prop-types";
import { motion } from "framer-motion";
import { cn } from "@/utils/cn";
import TooltipWrapper from "../common/TooltipWrapper";

const HoverableActionButton = ({
  icon: Icon,
  label,
  onClick,
  className = "",
}) => (
  <TooltipWrapper label={label}>
    <motion.button
      onClick={onClick}
      title={label}
      aria-label={label}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className={cn(
        "bg-white/90 backdrop-blur-sm p-2 mb-1 rounded-full shadow-md border border-gray-200 hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500",
        className
      )}
    >
      <Icon className="w-4 h-4 text-gray-600 group-hover:text-blue-600" />
    </motion.button>
  </TooltipWrapper>
);

HoverableActionButton.propTypes = {
  icon: PropTypes.elementType.isRequired,
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  className: PropTypes.string,
};

export default HoverableActionButton;

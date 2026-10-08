import React from "react";
import PropTypes from "prop-types";
import { cn } from "@/utils/cn";

const OverlayButton = ({
  icon: Icon,
  label,
  onClick,
  bgClass,
  hoverBgClass,
  textClass,
  ringClass,
  extraClasses,
}) => (
  <button
    onClick={(e) => {
      e.stopPropagation();
      onClick(e);
    }}
    className={cn(
      bgClass,
      hoverBgClass,
      textClass,
      ringClass,
      "p-2 rounded-full shadow-lg transition cursor-pointer",
      extraClasses
    )}
    aria-label={label}
  >
    <Icon size={20} />
  </button>
);

OverlayButton.propTypes = {
  icon: PropTypes.elementType.isRequired,
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  bgClass: PropTypes.string,
  hoverBgClass: PropTypes.string,
  textClass: PropTypes.string,
  ringClass: PropTypes.string,
  extraClasses: PropTypes.string,
};

OverlayButton.defaultProps = {
  bgClass: "bg-gray-600",
  hoverBgClass: "hover:bg-gray-700",
  textClass: "text-white",
  ringClass: "ring-gray-100",
  extraClasses: "",
};

export default OverlayButton;

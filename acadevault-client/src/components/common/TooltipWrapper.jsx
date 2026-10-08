import React from "react";
import PropTypes from "prop-types";
import { cn } from "@/utils/cn";

const getPositionClasses = (position) => {
  switch (position) {
    case "top":
      return {
        tooltip: "bottom-full left-1/2 -translate-x-1/2 mb-2",
        arrow: "top-full left-1/2 -translate-x-1/2 border-t-gray-800",
      };
    case "bottom":
      return {
        tooltip: "top-full left-1/2 -translate-x-1/2 mt-2",
        arrow: "bottom-full left-1/2 -translate-x-1/2 border-b-gray-800",
      };
    case "left":
      return {
        tooltip: "right-full top-1/2 -translate-y-1/2 mr-2",
        arrow: "left-full top-1/2 -translate-y-1/2 border-l-gray-800",
      };
    case "right":
    default:
      return {
        tooltip: "left-full top-1/2 -translate-y-1/2 ml-2",
        arrow: "right-full top-1/2 -translate-y-1/2 border-r-gray-800",
      };
  }
};

const TooltipWrapper = ({
  label,
  children,
  className = "",
  position = "left",
}) => {
  const { tooltip, arrow } = getPositionClasses(position);

  return (
    <div className={cn("group relative flex", className)}>
      {children}
      <div
        role="tooltip"
        className={cn(
          "absolute z-50 bg-gray-800 text-white text-xs px-2 py-1 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none whitespace-nowrap",
          tooltip
        )}
      >
        {label}
        {/* Arrow */}
        <div
          className={cn("absolute w-0 h-0 border-8 border-transparent", arrow)}
        />
      </div>
    </div>
  );
};

TooltipWrapper.propTypes = {
  label: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  position: PropTypes.oneOf(["top", "right", "bottom", "left"]),
};

export default TooltipWrapper;

// import React from "react";
// import PropTypes from "prop-types";
// import { cn } from "@/utils/cn";

// const TooltipWrapper = ({ label, children, className = "" }) => (
//   <div className={cn("group relative flex", className)}>
//     {children}
//     <span
//       role="tooltip"
//       className="absolute z-50 left-full top-1/2 -translate-y-1/2 ml-2 bg-gray-800 text-white text-xs px-2 py-1 rounded shadow-lg opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300 pointer-events-none whitespace-nowrap"
//     >
//       {label}
//     </span>
//   </div>
// );

// TooltipWrapper.propTypes = {
//   label: PropTypes.string.isRequired,
//   children: PropTypes.node.isRequired,
//   className: PropTypes.string,
// };

// export default TooltipWrapper;

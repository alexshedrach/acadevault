import classNames from "classnames";
import { motion } from "framer-motion";
import { StarEmpty, StarFull, StarHalf } from "./StarIcons";
import { StarTooltip } from "./StarTooltip";


export const StarButton = ({
  index,
  type,
  size,
  color,
  inactiveColor,
  readOnly,
  glow,
  animate,
  showTooltip,
  onMouseEnter,
  onMouseLeave,
  onClick,
}) => {
  const Icon =
    type === "full" ? StarFull : type === "half" ? StarHalf : StarEmpty;
  const fillColor = type === "empty" ? inactiveColor : color;

  return (
    <motion.button
      key={index}
      role="radio"
      aria-checked={type !== "empty"}
      aria-label={`${index} Star${index > 1 ? "s" : ""}`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
      onKeyDown={(e) => {
        if ((e.key === "Enter" || e.key === " ") && !readOnly) {
          e.preventDefault();
          onClick();
        }
      }}
      className={classNames(
        "relative outline-none",
        !readOnly && "cursor-pointer",
        glow && type === "full" && "drop-shadow-[0_0_8px_rgba(250,204,21,0.7)]"
      )}
      whileHover={animate && !readOnly ? { scale: 1.2 } : {}}
      whileTap={animate && !readOnly ? { scale: 0.9 } : {}}
      tabIndex={readOnly ? -1 : 0}
    >
      <Icon size={size} color={fillColor} />
      {showTooltip && <StarTooltip index={index} />}
    </motion.button>
  );
};

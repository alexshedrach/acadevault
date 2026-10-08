// Counter.jsx
"use client";

import React from "react";
import PropTypes from "prop-types";
import { cn } from "@/utils/cn";
import { useCounter } from "@/hooks/useCounter";

/**
 * Counter
 *
 * A highly-configurable, animated counter component.
 * Provides up/down direction, looping, end-pause, hover-pause, and
 * full styling via variants, color schemes, icons, prefixes/suffixes, etc.
 */
export default function Counter({
  label,
  value,
  from = 0,
  duration = 1500,
  easing,
  direction,
  loop = false,
  pauseAtEnd = 1000,
  pauseOnHover = true,
  delay = 0,
  prefix = "",
  suffix = "",
  formatValue,
  icon = null,
  variant = "solid",
  colorScheme = "green",
  size = "md",
  loading = false,
  ariaLabel,
  className,
}) {
  const { value: animatedValue, bind } = useCounter({
    from,
    to: value,
    duration,
    easing,
    direction,
    loop,
    pauseAtEnd,
    pauseOnHover,
    delay,
  });

  const display = loading
    ? "—"
    : formatValue
    ? formatValue(animatedValue)
    : `${prefix}${animatedValue.toLocaleString()}${suffix}`;

  // Tailwind mappings
  const sizeMap = {
    sm: {
      container: "px-4 py-2",
      number: "text-2xl",
      label: "text-xs",
      icon: "w-5 h-5",
    },
    md: {
      container: "px-6 py-4",
      number: "text-3xl",
      label: "text-sm",
      icon: "w-6 h-6",
    },
    lg: {
      container: "px-8 py-6",
      number: "text-5xl",
      label: "text-base",
      icon: "w-8 h-8",
    },
  };
  const variantMap = {
    solid: {
      base: `bg-${colorScheme}-600 text-white`,
      hover: `hover:bg-${colorScheme}-700`,
      ring: "",
    },
    outline: {
      base: `border border-${colorScheme}-500 text-${colorScheme}-500`,
      hover: `hover:bg-${colorScheme}-50`,
      ring: `focus:ring-2 focus:ring-${colorScheme}-400`,
    },
    ghost: {
      base: `bg-transparent text-${colorScheme}-500`,
      hover: `hover:bg-${colorScheme}-100`,
      ring: `focus:ring-2 focus:ring-${colorScheme}-400`,
    },
  };

  const containerClasses = cn(
    "rounded-xl shadow transition-shadow duration-200 flex flex-col items-center justify-center text-center",
    sizeMap[size].container,
    variantMap[variant].base,
    variantMap[variant].hover,
    variantMap[variant].ring,
    className
  );

  return (
    <div
      role="group"
      aria-label={ariaLabel || `${label}: ${value}`}
      className={containerClasses}
      {...bind}
    >
      {icon && (
        <div className="mb-2">
          {React.cloneElement(icon, {
            className: cn(sizeMap[size].icon, icon.props.className),
            "aria-hidden": true,
          })}
        </div>
      )}
      <div className="font-extrabold leading-none">{display}</div>
      <p className="opacity-80 mt-1">{label}</p>
    </div>
  );
}

Counter.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  from: PropTypes.number,
  duration: PropTypes.number,
  easing: PropTypes.func,
  direction: PropTypes.oneOf(["up", "down"]),
  loop: PropTypes.bool,
  pauseAtEnd: PropTypes.number,
  pauseOnHover: PropTypes.bool,
  delay: PropTypes.number,
  prefix: PropTypes.string,
  suffix: PropTypes.string,
  formatValue: PropTypes.func,
  icon: PropTypes.element,
  variant: PropTypes.oneOf(["solid", "outline", "ghost"]),
  colorScheme: PropTypes.string,
  size: PropTypes.oneOf(["sm", "md", "lg"]),
  loading: PropTypes.bool,
  ariaLabel: PropTypes.string,
  className: PropTypes.string,
};

Counter.defaultProps = {
  from: 0,
  duration: 1500,
  easing: (t) => t,
  loop: false,
  pauseAtEnd: 1000,
  pauseOnHover: true,
  delay: 0,
  prefix: "",
  suffix: "",
  formatValue: null,
  icon: null,
  variant: "solid",
  colorScheme: "green",
  size: "md",
  loading: false,
  ariaLabel: "",
  className: "",
};

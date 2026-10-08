import React from "react";
import { cn } from "@/utils/cn";
import PropTypes from "prop-types";

/**
 * Badge — A small, inline label used for denoting status, categories, or metadata.
 * Commonly used in filters, tags, or notification counters.
 */
export const Badge = ({
  children,
  className = "",
  variant = "default",
  size = "sm",
  rounded = "full",
  icon,
  iconPosition = "left",
  ...props
}) => {
  const baseStyles =
    "inline-flex items-center font-medium ring-1 ring-inset whitespace-nowrap";

  const sizeStyles = {
    sm: "text-xs px-2.5 py-0.5",
    md: "text-sm px-3 py-1",
  };

  const variants = {
    default: "bg-gray-100 text-gray-800 ring-gray-300",
    outline: "bg-transparent text-blue-600 ring-blue-600",
    success: "bg-green-100 text-green-800 ring-green-300",
    warning: "bg-yellow-100 text-yellow-800 ring-yellow-300",
    danger: "bg-red-100 text-red-800 ring-red-300",
    info: "bg-blue-100 text-blue-800 ring-blue-300",
    muted: "bg-gray-200 text-gray-600 ring-gray-300",
  };

  const roundedStyles = {
    full: "rounded-full",
    md: "rounded-md",
    sm: "rounded-sm",
  };

  const iconWrapper = icon ? (
    <span className="flex-shrink-0 text-xs leading-none">
      {typeof icon === "string" ? <span>{icon}</span> : icon}
    </span>
  ) : null;

  return (
    <span
      className={cn(
        baseStyles,
        sizeStyles[size],
        variants[variant],
        roundedStyles[rounded],
        className
      )}
      {...props}
    >
      {icon && iconPosition === "left" && (
        <span className="mr-1">{iconWrapper}</span>
      )}
      {children}
      {icon && iconPosition === "right" && (
        <span className="ml-1">{iconWrapper}</span>
      )}
    </span>
  );
};

Badge.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  variant: PropTypes.oneOf([
    "default",
    "outline",
    "success",
    "warning",
    "danger",
    "info",
    "muted",
  ]),
  size: PropTypes.oneOf(["sm", "md"]),
  rounded: PropTypes.oneOf(["full", "md", "sm"]),
  icon: PropTypes.node,
  iconPosition: PropTypes.oneOf(["left", "right"]),
};

// 🎯 Real-World Usage Examples

{
  /* <Badge variant="success" icon="✅">
  Verified
</Badge>

<Badge variant="outline" size="md" icon="🔍" iconPosition="right">
  Searchable
</Badge> */
}

// import React from "react";
// import clsx from "clsx";

// export function Badge({
//   children,
//   className = "",
//   variant = "default",
//   ...props
// }) {
//   const baseStyles =
//     "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ring-1 ring-inset";

//   const variants = {
//     default: "bg-gray-100 text-gray-800 ring-gray-300",
//     outline: "bg-transparent text-blue-600 ring-blue-600",
//     success: "bg-green-100 text-green-800 ring-green-300",
//     warning: "bg-yellow-100 text-yellow-800 ring-yellow-300",
//     danger: "bg-red-100 text-red-800 ring-red-300",
//   };

//   return (
//     <span className={clsx(baseStyles, variants[variant], className)} {...props}>
//       {children}
//     </span>
//   );
// }

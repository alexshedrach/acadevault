import React from "react";
import classNames from "classnames";
import Link from "next/link";

// Spinner for loading state
const Spinner = ({ size = "md", className = "" }) => {
  const sizeClasses = {
    xs: "w-4 h-4 border-2",
    sm: "w-5 h-5 border-2",
    md: "w-6 h-6 border-3",
    lg: "w-8 h-8 border-4",
    xl: "w-10 h-10 border-4",
  };

  return (
    <div
      className={classNames(
        "border-t-transparent border-solid border-white rounded-full animate-spin",
        sizeClasses[size] || sizeClasses.md,
        className
      )}
      role="status"
    />
  );
};

export const Button = ({
  as = "button", // 'button' or 'a'
  href = "",
  target,
  rel,
  variant = "default",
  size = "md",
  className,
  children,
  isLoading = false,
  disabled = false,
  loadingText = "Loading...",
  ...props
}) => {
  const baseClasses =
    "px-6 py-2 rounded-lg font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 inline-flex items-center justify-center";

  const variantClasses = {
    default:
      "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500 disabled:bg-blue-400",
    outline:
      "border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white focus:ring-blue-500 disabled:border-gray-400 disabled:text-gray-400",
    ghost:
      "text-blue-600 hover:bg-blue-100 focus:ring-blue-500 disabled:text-gray-400",
    danger:
      "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 disabled:bg-red-400",
    success:
      "bg-green-600 text-white hover:bg-green-700 focus:ring-green-500 disabled:bg-green-400",
    gradient:
      "bg-gradient-to-tr from-orange-500 to-orange-700 text-white hover:from-orange-600 hover:to-orange-800 focus:ring-orange-500 disabled:from-orange-300 disabled:to-orange-400 cursor-pointer",
  };

  const sizeClasses = {
    xs: "text-xs px-3 py-1",
    sm: "text-sm px-4 py-2",
    md: "text-base px-6 py-3",
    lg: "text-lg px-8 py-4",
    xl: "text-xl px-10 py-5",
  };

  const buttonClasses = classNames(
    baseClasses,
    variantClasses[variant] || variantClasses.default,
    sizeClasses[size] || sizeClasses.md,
    className,
    { "opacity-50 cursor-not-allowed": disabled || isLoading }
  );

  const content = isLoading ? (
    <span className="flex items-center">
      <Spinner size="sm" />
      <span className="ml-2">{loadingText}</span>
    </span>
  ) : (
    children
  );

  if (as === "a") {
    return (
      <Link
        href={href}
        target={target}
        rel={rel || (target === "_blank" ? "noopener noreferrer" : undefined)}
        className={buttonClasses}
        aria-disabled={disabled || isLoading}
        {...props}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      type="button"
      className={buttonClasses}
      disabled={disabled || isLoading}
      aria-live={isLoading ? "assertive" : undefined}
      {...props}
    >
      {content}
    </button>
  );
};

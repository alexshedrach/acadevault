import React, { memo } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

/**
 * Production-Ready Card Component
 *
 * - header: Optional React node displayed at the top.
 * - footer: Optional React node displayed at the bottom.
 * - children: Core content of the card.
 * - variant: Style of the card ("default", "outlined", "shadowed", "gradient").
 * - theme: Card color theme ("light", "dark", "glass", "neon").
 * - clickable: Enables interactivity (hover, focus, click).
 * - className: Additional Tailwind/utility classes.
 * - onClick: Card click handler.
 */


// Card component (reused from provided code, optimized)
const Card = memo(
  ({
    header,
    footer,
    children,
    variant = "default",
    theme = "light",
    clickable = false,
    className,
    onClick,
    ...props
  }) => {
    const baseClasses =
      "relative rounded-xl transition-all duration-300 ease-in-out overflow-hidden group";
    const variantClasses = {
      default: "shadow-md",
      outlined: "border border-gray-300 dark:border-gray-600",
      shadowed: "shadow-lg hover:shadow-2xl",
      gradient:
        "bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 text-white shadow-xl",
    };
    const themeClasses = {
      light: "bg-white text-gray-900 dark:bg-gray-100",
      dark: "bg-gray-900 text-gray-100 border border-gray-700",
      glass:
        "bg-white/20 dark:bg-gray-900/20 backdrop-blur-md border border-white/10 shadow-md",
      neon: "bg-black text-white border border-pink-600 shadow-pink-500/50 glow-effect",
    };
    const clickableClasses = clickable
      ? "cursor-pointer hover:scale-[1.02] hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      : "";

    const handleKeyPress = (e) => {
      if (clickable && (e.key === "Enter" || e.key === " ")) {
        e.preventDefault();
        onClick?.(e);
      }
    };

    return (
      <div
        role={clickable ? "button" : undefined}
        tabIndex={clickable ? 0 : undefined}
        aria-pressed={clickable ? "false" : undefined}
        className={classNames(
          baseClasses,
          variantClasses[variant],
          themeClasses[theme],
          clickableClasses,
          className
        )}
        onClick={clickable ? onClick : undefined}
        onKeyDown={clickable ? handleKeyPress : undefined}
        {...props}
      >
        {header && (
          <div className="px-5 py-4 border-b border-gray-200 dark:border-gray-700 font-semibold text-base">
            {header}
          </div>
        )}
        {children}
        {footer && (
          <div className="px-5 py-3 border-t border-gray-200 dark:border-gray-700 text-sm">
            {footer}
          </div>
        )}
      </div>
    );
  }
);

// const Card = memo(
//   ({
//     header,
//     footer,
//     children,
//     variant = "default",
//     theme = "light",
//     clickable = false,
//     className,
//     onClick,
//     ...props
//   }) => {
//     const baseClasses =
//       "relative rounded-xl transition-all duration-300 ease-in-out overflow-hidden group";

//     const variantClasses = {
//       default: "shadow-md",
//       outlined: "border border-gray-300 dark:border-gray-600",
//       shadowed: "shadow-lg hover:shadow-2xl",
//       gradient:
//         "bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 text-white shadow-xl",
//     };

//     const themeClasses = {
//       light: "bg-white text-gray-900 dark:bg-gray-100",
//       dark: "bg-gray-900 text-gray-100 border border-gray-700",
//       glass:
//         "bg-white/20 dark:bg-gray-900/20 backdrop-blur-md border border-white/10 shadow-md",
//       neon: "bg-black text-white border border-pink-600 shadow-pink-500/50 glow-effect",
//     };

//     const clickableClasses = clickable
//       ? "cursor-pointer hover:scale-[1.02] hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
//       : "";

//     const handleKeyPress = (e) => {
//       if (clickable && (e.key === "Enter" || e.key === " ")) {
//         e.preventDefault();
//         onClick?.(e);
//       }
//     };

//     return (
//       <div
//         role={clickable ? "button" : undefined}
//         tabIndex={clickable ? 0 : undefined}
//         aria-pressed={clickable ? "false" : undefined}
//         className={classNames(
//           baseClasses,
//           variantClasses[variant],
//           themeClasses[theme],
//           clickableClasses,
//           className
//         )}
//         onClick={clickable ? onClick : undefined}
//         onKeyDown={clickable ? handleKeyPress : undefined}
//         {...props}
//       >
//         {header && (
//           <div className="px-5 py-4 border-b border-gray-200 dark:border-gray-700 font-semibold text-base">
//             {header}
//           </div>
//         )}

//         {children}

//         {footer && (
//           <div className="px-5 py-3 border-t border-gray-200 dark:border-gray-700 text-sm">
//             {footer}
//           </div>
//         )}
//       </div>
//     );
//   }
// );

Card.propTypes = {
  header: PropTypes.node,
  footer: PropTypes.node,
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(["default", "outlined", "shadowed", "gradient"]),
  theme: PropTypes.oneOf(["light", "dark", "glass", "neon"]),
  clickable: PropTypes.bool,
  className: PropTypes.string,
  onClick: PropTypes.func,
};

export { Card };

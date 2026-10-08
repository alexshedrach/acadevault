"use client";

import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  CheckCircle,
  XCircle,
  AlertTriangle,
  Info,
  X,
  RotateCcw,
} from "lucide-react";
import { cn } from "@/utils/cn";

/** Mapping variant → icon + base styles */
const VARIANT_CONFIG = {
  success: {
    icon: <CheckCircle className="h-5 w-5 text-green-600" aria-hidden="true" />,
    bg: "bg-green-50",
    border: "border-green-400",
    text: "text-green-800",
  },
  error: {
    icon: <XCircle className="h-5 w-5 text-red-600" aria-hidden="true" />,
    bg: "bg-red-50",
    border: "border-red-400",
    text: "text-red-800",
  },
  warning: {
    icon: (
      <AlertTriangle className="h-5 w-5 text-yellow-600" aria-hidden="true" />
    ),
    bg: "bg-yellow-50",
    border: "border-yellow-400",
    text: "text-yellow-800",
  },
  info: {
    icon: <Info className="h-5 w-5 text-blue-600" aria-hidden="true" />,
    bg: "bg-blue-50",
    border: "border-blue-400",
    text: "text-blue-800",
  },
};

/**
 * <Alert>
 *
 * A fully accessible, animated, feature-rich alert component:
 * - Variants: success, error, warning, info
 * - Optional title & body (children)
 * - Auto-dismiss with configurable duration
 * - Dismiss button
 * - Retry action
 * - Compact & centered layouts
 */
export function AlertBox({
  variant = "info",
  title,
  children,
  autoDismiss = false,
  duration = 5000,
  dismissible = true,
  onDismiss,
  onRetry,
  retryText = "Retry",
  compact = false,
  centered = false,
  className = "",
}) {
  const [visible, setVisible] = useState(true);
  const config = VARIANT_CONFIG[variant];

  // Auto-dismiss effect
  useEffect(() => {
    if (!autoDismiss) return;
    const timer = setTimeout(() => {
      setVisible(false);
      onDismiss?.();
    }, duration);
    return () => clearTimeout(timer);
  }, [autoDismiss, duration, onDismiss]);

  // If not visible, unmount
  if (!visible) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="alert"
          role="alert"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className={cn(
            "relative flex items-start gap-3 rounded-md border p-4 shadow-sm",
            config.bg,
            config.border,
            config.text,
            centered && "justify-center text-center",
            compact && "p-2 text-sm",
            className
          )}
        >
          {/* Icon */}
          <div className={cn("flex-shrink-0", centered && "mx-auto")}>
            {config.icon}
          </div>

          {/* Content */}
          <div className="flex-1">
            {title && !compact && <h3 className="font-semibold">{title}</h3>}
            {children ? (
              <div className={compact ? "mt-1" : "mt-2"}>{children}</div>
            ) : null}

            {/* Retry Button */}
            {onRetry && (
              <button
                type="button"
                onClick={onRetry}
                className="mt-2 inline-flex items-center text-sm font-medium hover:underline focus:outline-none focus:ring-2 focus:ring-offset-2 rounded"
              >
                <RotateCcw className="w-4 h-4 mr-1" aria-hidden="true" />
                {retryText}
              </button>
            )}
          </div>

          {/* Dismiss Button */}
          {dismissible && (
            <button
              type="button"
              aria-label="Dismiss alert"
              onClick={() => {
                setVisible(false);
                onDismiss?.();
              }}
              className={cn(
                "absolute top-2 right-2 inline-flex p-1 rounded focus:outline-none focus:ring-2 focus:ring-offset-2",
                config.text,
                config.bg.replace("-50", "-100")
              )}
            >
              <X className="w-4 h-4" aria-hidden="true" />
            </button>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// "use client";

// import { useEffect, useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import {
//   CheckCircle,
//   XCircle,
//   Info,
//   AlertTriangle,
//   AlertCircle,
//   RotateCcw,
//   X,
// } from "lucide-react";
// import cn from "cn";

// const STATUS_CONFIG = {
//   success: {
//     icon: <CheckCircle className="h-5 w-5 text-green-600" />,
//     bg: "bg-green-100",
//     text: "text-green-800",
//     border: "border-green-200",
//   },
//   error: {
//     icon: <XCircle className="h-5 w-5 text-red-600" />,
//     bg: "bg-red-50",
//     text: "text-red-800",
//     border: "border-red-200",
//   },
//   warning: {
//     icon: <AlertTriangle className="h-5 w-5 text-yellow-600" />,
//     bg: "bg-yellow-50",
//     text: "text-yellow-800",
//     border: "border-yellow-200",
//   },
//   info: {
//     icon: <Info className="h-5 w-5 text-blue-600" />,
//     bg: "bg-blue-50",
//     text: "text-blue-800",
//     border: "border-blue-200",
//   },
// };

// export default function AlertBox({
//   status = "info", // "success" | "error" | "warning" | "info"
//   title, // Optional
//   message = "Something happened.",
//   autoDismiss = false,
//   duration = 3000,
//   onDismiss,
//   onRetry,
//   showRetry = false,
//   showDismiss = true,
//   compact = false,
//   center = false,
//   className = "",
// }) {
//   const [visible, setVisible] = useState(true);
//   const config = STATUS_CONFIG[status] || STATUS_CONFIG.info;

//   useEffect(() => {
//     if (autoDismiss) {
//       const timeout = setTimeout(() => {
//         setVisible(false);
//         onDismiss?.();
//       }, duration);
//       return () => clearTimeout(timeout);
//     }
//   }, [autoDismiss, duration, onDismiss]);

//   if (!visible) return null;

//   return (
//     <AnimatePresence>
//       {visible && (
//         <motion.div
//           key="alert"
//           initial={{ opacity: 0, y: 10 }}
//           animate={{ opacity: 1, y: 0 }}
//           exit={{ opacity: 0, y: -10 }}
//           transition={{ duration: 0.25 }}
//           role="alert"
//           className={cn(
//             "relative flex items-start gap-3 rounded-md border p-4 shadow-sm",
//             config.bg,
//             config.text,
//             config.border,
//             center && "justify-center text-center",
//             compact && "p-2 text-sm",
//             className
//           )}
//         >
//           <div className="shrink-0 mt-1">{config.icon}</div>
//           <div className="flex-1">
//             {!compact && title && <div className="font-semibold">{title}</div>}
//             <div>{message}</div>
//             {showRetry && onRetry && (
//               <button
//                 onClick={onRetry}
//                 className="mt-2 inline-flex items-center text-sm font-medium hover:underline"
//               >
//                 <RotateCcw className="w-4 h-4 mr-1" />
//                 Retry
//               </button>
//             )}
//           </div>

//           {showDismiss && (
//             <button
//               onClick={() => {
//                 setVisible(false);
//                 onDismiss?.();
//               }}
//               className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 transition"
//               aria-label="Dismiss alert"
//             >
//               <X className="w-4 h-4" />
//             </button>
//           )}
//         </motion.div>
//       )}
//     </AnimatePresence>
//   );
// }

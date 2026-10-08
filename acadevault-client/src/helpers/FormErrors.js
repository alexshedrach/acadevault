import React from "react";
import PropTypes from "prop-types";
import { motion, AnimatePresence } from "framer-motion";
import { AlertCircle, Info } from "lucide-react";
import { cn } from "@/utils/cn";

// — Base components —

function FormError({
  id,
  message,
  className = "",
  icon = true,
  role = "alert",
}) {
  if (!message) return null;

  const content = (
    <div
      id={id}
      className={cn(
        "flex items-start gap-2 text-sm text-red-600 mt-2",
        className
      )}
      role={role}
      aria-live="polite"
    >
      {icon && (
        <AlertCircle
          className="w-4 h-4 mt-0.5 flex-shrink-0"
          aria-hidden="true"
        />
      )}
      <span>{message}</span>
    </div>
  );

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
      >
        {content}
      </motion.div>
    </AnimatePresence>
  );
}

function HelperText({
  id,
  message,
  className = "",
  icon = false,
  role = "note",
}) {
  if (!message) return null;

  const content = (
    <div
      id={id}
      className={cn(
        "flex items-start gap-2 text-sm text-gray-500 mt-1",
        className
      )}
      role={role}
      aria-live="polite"
    >
      {icon && (
        <Info className="w-4 h-4 mt-0.5 flex-shrink-0" aria-hidden="true" />
      )}
      <span>{message}</span>
    </div>
  );

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
      >
        {content}
      </motion.div>
    </AnimatePresence>
  );
}

function InputAdornment({ children, position = "right" }) {
  return (
    <span
      className={cn(
        "absolute inset-y-0 flex items-center",
        position === "left" ? "left-0 pl-3" : "right-0 pr-3"
      )}
    >
      {children}
    </span>
  );
}

// — Memoized exports —

export const MemoizedFormError = React.memo(FormError);
export const MemoizedHelperText = React.memo(HelperText);
export const MemoizedInputAdornment = React.memo(InputAdornment);

// — propTypes after declarations —

MemoizedFormError.propTypes = {
  id: PropTypes.string.isRequired,
  message: PropTypes.string,
  className: PropTypes.string,
  icon: PropTypes.bool,
  role: PropTypes.string,
};

MemoizedHelperText.propTypes = {
  id: PropTypes.string.isRequired,
  message: PropTypes.string,
  className: PropTypes.string,
  icon: PropTypes.bool,
  role: PropTypes.string,
};

MemoizedInputAdornment.propTypes = {
  children: PropTypes.node.isRequired,
  position: PropTypes.oneOf(["left", "right"]),
};

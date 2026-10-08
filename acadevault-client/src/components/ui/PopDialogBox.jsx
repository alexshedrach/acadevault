"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import PropTypes from "prop-types";

const PopDialogBox = ({
  isOpen,
  onClose,
  children,
  className = "",
  size = "md",
  position = "center",
  backdropOpacity = 0.6,
  backdropColor = "bg-black",
  animationType = "scale",
  transitionDuration = 0.4,
  closeOnEscape = true,
  ariaLabel = "Dialog",
}) => {
  // Handle Escape key press
  React.useEffect(() => {
    if (!closeOnEscape) return;

    const handleEscape = (e) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose, closeOnEscape]);

  // Size mappings
  const sizeMap = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
  };

  // Position mappings
  const positionMap = {
    center: "items-center justify-center",
    top: "items-start justify-center pt-10",
    bottom: "items-end justify-center pb-10",
    left: "items-center justify-start pl-10",
    right: "items-center justify-end pr-10",
  };

  // Animation variants
  const animationVariants = {
    scale: {
      initial: { scale: 0.8, opacity: 0 },
      animate: { scale: 1, opacity: 1 },
      exit: { scale: 0.8, opacity: 0 },
    },
    slide: {
      initial: { y: 50, opacity: 0 },
      animate: { y: 0, opacity: 1 },
      exit: { y: 50, opacity: 0 },
    },
    fade: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
    },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={`fixed inset-0 z-50 flex ${
            positionMap[position]
          } ${backdropColor}/${Math.round(backdropOpacity * 100)}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: transitionDuration / 2 }}
          onClick={onClose}
          role="dialog"
          aria-label={ariaLabel}
          aria-modal="true"
        >
          <motion.div
            className={`relative bg-white/95 backdrop-blur-lg rounded-2xl shadow-2xl p-6 mx-4 ${sizeMap[size]} ${className}`}
            variants={animationVariants[animationType]}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: transitionDuration, ease: "easeInOut" }}
            onClick={(e) => e.stopPropagation()}
          >
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

PopDialogBox.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  size: PropTypes.oneOf(["sm", "md", "lg", "xl"]),
  position: PropTypes.oneOf(["center", "top", "bottom", "left", "right"]),
  backdropOpacity: PropTypes.number,
  backdropColor: PropTypes.string,
  animationType: PropTypes.oneOf(["scale", "slide", "fade"]),
  transitionDuration: PropTypes.number,
  closeOnEscape: PropTypes.bool,
  ariaLabel: PropTypes.string,
};

export default PopDialogBox;

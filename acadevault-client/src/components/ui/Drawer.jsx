"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { X } from "lucide-react";
import { cn } from "@/utils/cn";
import { Transition, TransitionChild } from "@headlessui/react";

// 1) Drawer width/height classes
const sizeClasses = {
  auto: "",
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-2xl",
  full: "w-screen h-screen",
};

// 2) Position map for placement
const positionMap = {
  right: "inset-y-0 right-0",
  left: "inset-y-0 left-0",
  top: "top-0 inset-x-0",
  bottom: "bottom-0 inset-x-0",
  "top-left": "top-0 left-0",
  "top-right": "top-0 right-0",
  "bottom-left": "bottom-0 left-0",
  "bottom-right": "bottom-0 right-0",
};

// 3) Translate classes for animations
const translateHidden = {
  right: "translate-x-full",
  left: "-translate-x-full",
  top: "-translate-y-full",
  bottom: "translate-y-full",
  "top-left": "-translate-y-full -translate-x-full",
  "top-right": "-translate-y-full translate-x-full",
  "bottom-left": "translate-y-full -translate-x-full",
  "bottom-right": "translate-y-full translate-x-full",
};

const translateVisible = "translate-x-0 translate-y-0";

export function Drawer({
  isOpen,
  onClose,
  children,
  position = "right",
  size = "auto",
  showCloseButton = true,
  withOverlay = true,
  title,
  variant = "standard",
  zIndex = 50,
}) {
  const [isShowing, setIsShowing] = useState(isOpen);
  const panelRef = useRef(null);
  const startTouch = useRef(null);

  // Animate in when isOpen is true
  useEffect(() => {
    if (isOpen) setIsShowing(true);
  }, [isOpen]);

  // Cleanup after animation
  const handleTransitionEnd = () => {
    if (!isOpen) setIsShowing(false);
  };

  // Touch/swipe-to-close
  const handleTouchStart = (e) => {
    const coord = ["left", "right"].includes(position)
      ? e.touches[0].clientX
      : e.touches[0].clientY;
    startTouch.current = coord;
  };

  const handleTouchEnd = (e) => {
    const coord = ["left", "right"].includes(position)
      ? e.changedTouches[0].clientX
      : e.changedTouches[0].clientY;
    if (Math.abs(coord - startTouch.current) > 80) {
      onClose();
    }
  };

  const isAutoDefault = size === "auto" && variant === "standard";

  if (!isShowing && !isOpen) return null;

  return (
    <Transition show={isOpen} as={Fragment}>
      <div
        role="dialog"
        aria-modal="true"
        className={cn("fixed inset-0", `z-[${zIndex}]`)}
      >
        {/* === Overlay === */}
        {withOverlay && (
          <div
            className="absolute inset-0 z-0"
            onClick={(e) => {
              // Prevent closing if clicking inside the panel
              if (panelRef.current && panelRef.current.contains(e.target))
                return;
              onClose();
            }}
          >
            <TransitionChild
              as={Fragment}
              enter="transition-opacity ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="absolute inset-0 bg-black/40 backdrop-blur-sm pointer-events-auto" />
            </TransitionChild>
          </div>
        )}

        {/* === Sliding Panel === */}
        <div className="absolute inset-0 overflow-hidden">
          <div className={cn("absolute flex", positionMap[position])}>
            <TransitionChild
              as={Fragment}
              enter="transition-transform duration-300 ease-out"
              enterFrom={translateHidden[position]}
              enterTo={translateVisible}
              leave="transition-transform duration-200 ease-in"
              leaveFrom={translateVisible}
              leaveTo={translateHidden[position]}
              afterLeave={handleTransitionEnd}
            >
              <div
                ref={panelRef}
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
                className={cn(
                  !isAutoDefault &&
                    "bg-white shadow-xl transform flex flex-col transition-transform",
                  !isAutoDefault && size !== "auto" && sizeClasses[size],
                  [
                    "top",
                    "bottom",
                    "top-left",
                    "top-right",
                    "bottom-left",
                    "bottom-right",
                  ].includes(position)
                    ? "w-full"
                    : !isAutoDefault && size !== "auto"
                    ? "h-full"
                    : "",
                  !isAutoDefault && size === "full"
                    ? "rounded-none"
                    : !isAutoDefault
                    ? "rounded-xl"
                    : "",
                  variant === "floating" &&
                    "m-4 border border-gray-200 shadow-lg"
                )}
              >
                {/* === Header (optional) === */}
                {!isAutoDefault &&
                  variant !== "preview-only" &&
                  (title || showCloseButton) && (
                    <div className="flex items-center justify-between p-4 border-b bg-white/90 backdrop-blur-md sticky top-0 z-10">
                      {title && (
                        <div className="text-base sm:text-lg font-semibold text-gray-900">
                          {title}
                        </div>
                      )}
                      {showCloseButton && (
                        <button
                          onClick={onClose}
                          className="p-2 rounded-md hover:bg-gray-100 text-gray-600 focus:outline-none"
                          aria-label="Close drawer"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      )}
                    </div>
                  )}

                {/* === Body === */}
                <div
                  className={cn(
                    isAutoDefault
                      ? ""
                      : variant !== "preview-only"
                      ? "flex-1 overflow-auto p-6"
                      : "flex-1 overflow-auto"
                  )}
                >
                  {children}
                </div>
              </div>
            </TransitionChild>
          </div>
        </div>
      </div>
    </Transition>
  );
}

Drawer.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  position: PropTypes.oneOf([
    "right",
    "left",
    "top",
    "bottom",
    "top-left",
    "top-right",
    "bottom-left",
    "bottom-right",
  ]),
  size: PropTypes.oneOf(["auto", "sm", "md", "lg", "xl", "full"]),
  showCloseButton: PropTypes.bool,
  withOverlay: PropTypes.bool,
  title: PropTypes.string,
  variant: PropTypes.oneOf(["standard", "floating", "preview-only"]),
  zIndex: PropTypes.number,
};

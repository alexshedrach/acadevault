"use client";

import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Description,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { Fragment, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { cn } from "@/utils/cn";

/**
 * Production-Grade Modal Component
 * Highly configurable, accessible, and scalable modal.
 */

/**
 * @param {boolean} isOpen - Controls whether the modal is shown or hidden.
 *
 * @param {function} onClose - Function triggered when the modal should close.
 * Handles click-away, ESC key, and close button.
 *
 * @param {function=} onSave - Optional. Function triggered when the "Save" button is clicked.
 * Typically used to confirm or submit modal actions.
 *
 * @param {ReactNode=} title - Optional. Modal title content rendered inside <DialogTitle>.
 *
 * @param {ReactNode} children - Main content of the modal, rendered in the body section.
 *
 * @param {'sm' | 'md' | 'lg' | 'xl' | 'full'} size - Optional. Controls modal width.
 * Defaults to `'md'`. Preset widths are responsive and production-safe.
 *
 * @param {string=} className - Optional. Additional custom class names for the modal container.
 *
 * @param {boolean=} disableBackdropClose - Optional. If true, disables closing the modal when
 * clicking the backdrop. Defaults to `false`.
 *
 * @param {'light' | 'dark' | 'glass' | 'neon'} theme - Optional. Defines the modal theme.
 * Controls background, text, border, and shadow styling. Defaults to `'glass'`.
 *
 * @param {string=} saveLabel - Optional. Label for the "Save" button. Defaults to `'Save'`.
 *
 * @param {string=} cancelLabel - Optional. Label for the "Cancel" button. Defaults to `'Cancel'`.
 *
 * @param {boolean=} isSaving - Optional. Controls the saving/loading state of the "Save" button.
 * Disables and shows a spinner/text. Defaults to `false`.
 *
 * @param {ReactNode=} footer - Optional. Allows full override of the footer section (buttons).
 * If not provided, the default Cancel/Save layout is used.
 *
 * @param {boolean=} draggable - Optional. If true, the modal panel can be dragged vertically
 * using Framer Motion. Defaults to `true`.
 */

export const Modal = ({
  isOpen,
  onClose,
  onCancel,
  onSave,
  closeButton = true,
  title,
  description,
  children,
  size = "md",
  className = "",
  disableBackdropClose = false,
  theme = "glass",
  saveLabel = "Save",
  cancelLabel = "Cancel",
  isSaving = false,
  footer,
  draggable = true,
  titleClassName = "text-2xl font-semibold mb-2 text-center",
}) => {
  const modalRef = useRef(null);
  const lastFocusedElement = useRef(null);

  // Manage focus and scroll lock
  useEffect(() => {
    if (isOpen) {
      lastFocusedElement.current = document.activeElement;
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      if (lastFocusedElement.current?.focus) {
        lastFocusedElement.current.focus();
      }
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleBackdropClick = (e) => {
    if (
      !disableBackdropClose &&
      modalRef.current &&
      !modalRef.current.contains(e.target)
    ) {
      onClose();
    }
  };

  // Modal Size Variants
  const sizeClasses = {
    sm: "w-[320px] max-w-sm",
    md: "w-[480px] max-w-md",
    lg: "w-[640px] max-w-lg",
    xl: "w-[800px] max-w-2xl",
    full: "w-full h-full max-w-5xl max-h-full",
  };

  // Modal Theme Variants
  const themeClasses = {
    light: "bg-white text-gray-900 shadow-lg border border-gray-200",
    dark: "bg-gray-900 text-white shadow-lg border border-gray-700",
    glass:
      "bg-white/20 dark:bg-gray-800/40 text-white backdrop-blur-xl border border-gray-300/20 dark:border-gray-700/20 shadow-2xl",
    neon: "bg-black text-white shadow-lg border border-gray-800 ring-2 ring-pink-500",
  };

  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-[9999]" onClose={onClose}>
        {/* Backdrop */}
        <TransitionChild
          enter="transition-opacity ease-out duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-in duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-md"
            onClick={handleBackdropClick}
          />
        </TransitionChild>

        {/* Modal Panel */}
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <TransitionChild
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <DialogPanel
              as={motion.div}
              ref={modalRef}
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              drag={draggable ? "y" : false}
              dragConstraints={{ top: 0, bottom: 100 }}
              onDragEnd={(_, info) => {
                if (draggable && info.offset.y > 80) onClose();
              }}
              transition={{ type: "spring", stiffness: 250, damping: 20 }}
              className={cn(
                "relative flex flex-col overflow-hidden rounded-2xl p-6 max-h-[90vh]",
                sizeClasses[size],
                themeClasses[theme],
                className
              )}
            >
              {/* Close Button */}
              {closeButton && (
                <motion.button
                  whileHover={{ rotate: 90, scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onClose}
                  className="absolute top-3 right-3 p-2 bg-gray-200 dark:bg-gray-800 rounded-full text-gray-800 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-700 transition"
                  aria-label="Close modal"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </motion.button>
              )}

              {/* Title */}
              {title && (
                <DialogTitle as="h3" className={cn(titleClassName)}>
                  {title}
                </DialogTitle>
              )}

              {/* Description */}
              {description && (
                <Description className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  {description}
                </Description>
              )}

              {/* Modal Body */}
              <div className="overflow-y-auto flex-grow pr-1">{children}</div>

              {/* Footer Section */}
              {typeof footer === "boolean" && footer && (
                <div className="mt-2 flex justify-end gap-3 border-t pt-2 border-gray-300">
                  <button
                    type="button"
                    onClick={onCancel || onClose}
                    className="px-4 py-2 rounded-md bg-gray-200 text-gray-800 hover:bg-gray-300 transition"
                  >
                    {cancelLabel}
                  </button>
                  <button
                    type="button"
                    onClick={onSave}
                    disabled={isSaving}
                    className={cn(
                      "px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed",
                      { "cursor-wait": isSaving }
                    )}
                  >
                    {isSaving ? "Saving..." : saveLabel}
                  </button>
                </div>
              )}

              {typeof footer !== "boolean" && footer}
            </DialogPanel>
          </TransitionChild>
        </div>
      </Dialog>
    </Transition>
  );
};

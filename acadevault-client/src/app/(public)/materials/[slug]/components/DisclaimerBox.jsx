"use client";

import React, { useState } from "react";
import { AlertTriangle, X } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

/**
 * DisclaimerBox Component
 *
 * A robust, dismissible disclaimer component with enhanced accessibility, animations,
 * and support for custom content. Production-ready and scalable for real-world applications.
 */
export default function DisclaimerBox({
  title = "Important Disclaimer",
  description = "AcadeVault materials are provided exclusively for academic research and reference purposes. By purchasing or accessing this material, you acknowledge and agree that the content is designed to assist in academic exploration and is not intended for any other use.",
  confirmText = "By proceeding with the purchase or download, you confirm that you have read, understood, and accepted AcadeVault’s Terms of Use and all applicable conditions.",
  termsLink = "/terms-of-use",
  closable = true, // Whether the box can be dismissed
  className = "",
}) {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className={`mt-10 bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-xl shadow-sm ${className}`}
          role="alert"
          aria-live="assertive"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex items-start gap-4">
            <AlertTriangle className="w-6 h-6 text-yellow-600 mt-1 flex-shrink-0" />

            <div className="flex-1">
              <h3
                className="text-lg font-semibold text-yellow-800 mb-2"
                id="disclaimer-title"
              >
                {title}
              </h3>

              <p className="text-sm text-gray-800 mb-2">{description}</p>

              <p className="text-sm text-gray-800">
                {confirmText.split("AcadeVault’s").map((part, index, arr) => (
                  <React.Fragment key={index}>
                    {part}
                    {index < arr.length - 1 && (
                      <>
                        <span className="font-semibold text-blue-700">
                          AcadeVault’s
                        </span>{" "}
                        <Link
                          href={termsLink}
                          className="text-blue-600 underline hover:text-blue-800"
                        >
                          Terms of Use
                        </Link>
                      </>
                    )}
                  </React.Fragment>
                ))}
              </p>
            </div>

            {closable && (
              <button
                onClick={() => setVisible(false)}
                aria-label="Dismiss disclaimer"
                className="text-yellow-600 hover:text-yellow-800 transition-colors p-1 rounded-full"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

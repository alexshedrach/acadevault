import { useState, useCallback } from "react";

/**
 * useCopyToClipboard Hook
 *
 * A robust, reusable hook to copy text to the clipboard with proper feedback and error handling.
 * Supports tracking the copy state per item type and auto-resets after a configurable timeout.
 *
 * @returns {object} - { copied, handleCopy, error }
 *    copied: The current type of the copied item (can be used to track button state)
 *    handleCopy: Function to trigger the copy action
 *    error: Optional error message if copying fails
 */
export default function useCopyToClipboard({ resetAfter = 2000 } = {}) {
  const [copied, setCopied] = useState(null); // Tracks what was copied (useful for UI feedback)
  const [error, setError] = useState(null); // Tracks any clipboard errors

  /**
   * Copies the provided text to the clipboard.
   *
   * @param {string} text - The text to be copied.
   * @param {string} type - The identifier/type of the item copied (useful for UI feedback).
   */
  const handleCopy = useCallback(
    async (text, type) => {
      if (!navigator?.clipboard) {
        setError("Clipboard API not supported in this browser.");
        return;
      }

      try {
        await navigator.clipboard.writeText(text);
        setCopied(type);
        setError(null);

        // Auto-reset after specified timeout
        const timer = setTimeout(() => setCopied(null), resetAfter);

        // Cleanup to avoid memory leaks in fast UI updates
        return () => clearTimeout(timer);
      } catch (err) {
        console.error("Failed to copy to clipboard:", err);
        setError("Failed to copy to clipboard. Please try again.");
      }
    },
    [resetAfter]
  );

  return { copied, handleCopy, error };
}

// import { useState } from "react";

// export default function useCopyToClipboard() {
//   const [copied, setCopied] = useState(null);

//   const handleCopy = (text, type) => {
//     navigator.clipboard.writeText(text);
//     setCopied(type);
//     setTimeout(() => setCopied(null), 2000);
//   };

//   return { copied, handleCopy };
// }

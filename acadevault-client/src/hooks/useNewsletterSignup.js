'use client'

import { validateEmail } from "@/utils/formValidation";

const { useState, useCallback } = require("react");

/**
 * Custom hook: useNewsletterSignup
 *
 * Encapsulates all state and logic related to newsletter sign-up:
 * - email input value
 * - validation & error handling
 * - loading / submission simulation
 * - ripple effect data for button clicks
 */
export function useNewsletterSignup() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [ripples, setRipples] = useState([]);

  // Handle form submission
  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      if (!validateEmail(email.trim())) {
        setError("Please enter a valid email address.");
        return;
      }
      setError("");
      setIsLoading(true);

      try {
        // Simulate network delay (replace with real fetch/axios)
        await new Promise((resolve) => setTimeout(resolve, 1500));
        setSubmitted(true);
        setEmail("");
      } catch {
        setError("Something went wrong. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    },
    [email]
  );

  const handleButtonClick = useCallback((e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const newRipple = { x, y, id: Date.now() };
    setRipples([newRipple]);
    setTimeout(() => setRipples([]), 600);
  }, []);

  return {
    email,
    setEmail,
    submitted,
    setSubmitted,
    error,
    setError,
    isLoading,
    ripples,
    handleSubmit,
    handleButtonClick,
  };
}

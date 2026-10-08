"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail } from "lucide-react";

const QuickStartForm = ({ onSubmit }) => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      setError("Please enter a valid email address.");
      setIsSubmitting(false);
      return;
    }

    try {
      // Mock API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      onSubmit();
      setEmail("");
      alert("Thank you for signing up!");
    } catch (err) {
      setError("Failed to sign up. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="mt-12 max-w-md mx-auto p-6 rounded-lg backdrop-blur-sm bg-white/30 border border-gray-200 shadow-lg"
    >
      <h3 className="text-xl font-semibold mb-4">Get Started in Minutes</h3>
      <p className="text-base mb-4">
        Download our free Affiliate Quick-Start Guide to boost your earnings.
      </p>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <div className="relative flex-1">
          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 text-gray-700"
            aria-label="Email for quick-start guide"
            disabled={isSubmitting}
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 rounded-full bg-yellow-400 text-black hover:bg-yellow-500 disabled:opacity-50"
          aria-label="Sign up for quick-start guide"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Get Guide"}
        </button>
      </form>
      {error && (
        <p className="text-red-500 text-sm mt-2" role="alert">
          {error}
        </p>
      )}
    </motion.div>
  );
};

export default QuickStartForm;

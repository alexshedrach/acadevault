'use client '

import { motion } from "framer-motion";
import { Button } from "../ui/Button";


/**
 * SignupForm
 *
 * Renders:
 *  • Email input
 *  • Validation error (via aria-describedby)
 *  • Subscribe button with ripple & loading spinner
 *
 * Props:
 *  - email: string
 *  - setEmail: (val: string) => void
 *  - error: string
 *  - isLoading: boolean
 *  - ripples?: Array<{ x: number; y: number; id: number }>
 *  - handleSubmit: (e) => void
 *  - handleButtonClick: (e) => void
 */
export function NewsletterSignupForm({
  email,
  setEmail,
  error,
  isLoading,
  ripples = [], // default to empty array to avoid undefined
  handleSubmit,
  handleButtonClick,
}) {
  return (
    <motion.form
      onSubmit={handleSubmit}
      className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full bg-white/20 backdrop-blur-lg rounded-3xl p-6 shadow-xl border border-white/20 transition-all"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
    >
      {/* Email Input */}
      <div className="relative w-full">
        <label htmlFor="newsletter-email" className="sr-only">
          Email Address
        </label>
        <input
          id="newsletter-email"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-5 py-3 pl-12 rounded-full border border-gray-300 bg-white bg-opacity-20 text-white placeholder-gray-300 focus:outline-none focus:ring-4 focus:ring-indigo-400 focus:border-indigo-500 transition-all"
          aria-invalid={!!error}
          aria-describedby={error ? "email-error" : undefined}
          required
        />
        {/* Email icon inside input */}
        <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-300 pointer-events-none">
          ✉️
        </div>
      </div>

      {/* Subscribe Button + Ripple */}
      <div className="relative">
        <Button
          type="submit"
          disabled={isLoading}
          onClick={handleButtonClick}
          className="relative inline-flex items-center justify-center px-6 py-3 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-medium shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all"
        >
          {isLoading ? (
            <motion.div
              className="w-6 h-6 border-2 border-t-2 border-white rounded-full"
              initial={{ rotate: 0 }}
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
            />
          ) : (
            "Subscribe"
          )}
        </Button>

        {/* Ripple Circles */}
        {ripples.map((r) => (
          <span
            key={r.id}
            className="absolute bg-white opacity-30 rounded-full animate-ripple"
            style={{
              top: r.y - 15,
              left: r.x - 15,
              width: 30,
              height: 30,
            }}
          />
        ))}
      </div>
    </motion.form>
  );
}
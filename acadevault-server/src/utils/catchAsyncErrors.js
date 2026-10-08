import { logger } from "./logger.js";

/**
 * Utility to handle asynchronous route/middleware errors gracefully.
 * Wraps an async function and ensures unhandled rejections are passed to the global error handler.
 * @param {Function} asyncFn - The asynchronous function to be executed.
 * @returns {Function} A middleware function that handles errors and forwards them to the next middleware.
 */
export const catchAsyncErrors = (asyncFn) => {
  return (req, res, next) => {
    // Ensure any promise rejection is caught and forwarded to the global error handler
    Promise.resolve(asyncFn(req, res, next)).catch((err) => {
      // Log the error for debugging or monitoring purposes
      logger.error("Unhandled error in async function", {
        error: err.message,
        stack: err.stack,
        route: req.originalUrl,
        method: req.method,
      });

      // Pass the error to the next middleware
      next(err);
    });
  };
};

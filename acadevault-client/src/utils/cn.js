import { clsx } from "clsx";

/**
 * Combines multiple class names conditionally using clsx under the hood.
 * Handles falsy values, nested arrays, and conditional objects gracefully.
 *
 * @param  {...any} inputs - Strings, arrays, objects with conditional keys.
 * @returns {string} A final string of merged class names.
 */
export function cn(...inputs) {
  return clsx(...inputs);
}

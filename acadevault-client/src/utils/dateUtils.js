import { format, parseISO } from "date-fns";

/**
 * formatDate
 *
 * @param {string|Date} dateInput – an ISO string or a JS Date
 * @returns {string} e.g. "June 9, 2025 at 3:45 PM"
 */
export function formatDate(dateInput) {
  // If it's a string, parse it; otherwise assume it's already a Date.
  const date = typeof dateInput === "string" ? parseISO(dateInput) : dateInput;

  // Format exactly as: Full month name, day, year, "at", hour:minute AM/PM
  return format(date, "MMMM d, yyyy 'at' h:mm a");
}

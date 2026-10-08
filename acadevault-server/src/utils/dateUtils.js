import { format, parseISO, differenceInDays, addDays } from "date-fns";

/**
 * Utility to format a timestamp.
 * @param {Date} timestamp - The date object to format.
 * @param {Object} [options] - Optional formatting options.
 * @param {string} [locale='en-US'] - The locale for date formatting.
 * @returns {string|null} Formatted date string or null if timestamp is invalid.
 */
export function formatTimestamp(timestamp, options = {}, locale = "en-US") {
  if (!timestamp || !(timestamp instanceof Date)) return null;
  return timestamp.toLocaleString(locale, options);
}

/**
 * Format a date into a readable format (e.g., "January 4, 2025").
 * @param {Date|string} date - The date to format (can be a Date object or ISO string).
 * @returns {string} - The formatted date string.
 */
export const formatDate = (date) => {
  try {
    return format(parseISO(date), "MMMM dd, yyyy");
  } catch (error) {
    console.error("Error formatting date:", error);
    return null;
  }
};

/**
 * Compare if a date is within a certain range (e.g., check if a discount is active).
 * @param {Date|string} startDate - Start of the range.
 * @param {Date|string} endDate - End of the range.
 * @param {Date|string} currentDate - Date to compare.
 * @returns {boolean} - True if the currentDate is within the range, otherwise false.
 */
export const isDateInRange = (startDate, endDate, currentDate) => {
  try {
    return (
      differenceInDays(parseISO(endDate), parseISO(currentDate)) >= 0 &&
      differenceInDays(parseISO(currentDate), parseISO(startDate)) >= 0
    );
  } catch (error) {
    console.error("Error comparing dates:", error);
    return false;
  }
};

/**
 * Get the difference in days between two dates.
 * @param {Date|string} date1 - The first date.
 * @param {Date|string} date2 - The second date.
 * @returns {number} - The number of days between the two dates.
 */
export const getDaysDifference = (date1, date2) => {
  try {
    return differenceInDays(parseISO(date1), parseISO(date2));
  } catch (error) {
    console.error("Error calculating days difference:", error);
    return null;
  }
};

/**
 * Add a certain number of days to a date (e.g., for subscription expiry).
 * @param {Date|string} date - The original date.
 * @param {number} daysToAdd - The number of days to add.
 * @returns {Date} - The new date after adding the days.
 */
export const addDaysToDate = (date, daysToAdd) => {
  try {
    return addDays(parseISO(date), daysToAdd);
  } catch (error) {
    console.error("Error adding days to date:", error);
    return null;
  }
};

/**
 * Convert a date into ISO format (e.g., "2025-01-04").
 * @param {Date|string} date - The date to convert.
 * @returns {string} - The ISO string representation of the date.
 */
export const toISOString = (date) => {
  try {
    return new Date(date).toISOString();
  } catch (error) {
    console.error("Error converting date to ISO:", error);
    return null;
  }
};

/**
 * Check if the provided date is in the future (e.g., check if a subscription is still valid).
 * @param {Date|string} date - The date to check.
 * @returns {boolean} - True if the date is in the future, otherwise false.
 */
export const isFutureDate = (date) => {
  try {
    return parseISO(date) > new Date();
  } catch (error) {
    console.error("Error checking if date is in the future:", error);
    return false;
  }
};

/**
 * Get the current date in "YYYY-MM-DD" format.
 * @returns {string} - The current date in "YYYY-MM-DD" format.
 */
export const getCurrentDate = () => {
  try {
    return format(new Date(), "yyyy-MM-dd");
  } catch (error) {
    console.error("Error getting current date:", error);
    return null;
  }
};

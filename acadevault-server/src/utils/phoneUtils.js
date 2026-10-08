import { parsePhoneNumberFromString } from "libphonenumber-js";

/**
 * Format a phone number into an international format.
 * @param {string} phoneNumber - The phone number to format.
 * @returns {string} - The formatted phone number or the original input if invalid.
 */
export const formatPhoneNumber = (phoneNumber) => {
  try {
    const phone = parsePhoneNumberFromString(phoneNumber);
    return phone ? phone.formatInternational() : phoneNumber;
  } catch (error) {
    console.error("Error formatting phone number:", error);
    return phoneNumber;
  }
};

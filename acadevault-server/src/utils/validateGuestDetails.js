import { isValidEmail, isValidFullName, isValidPhoneNumber } from './commonUtils.js';

/**
 * Validates guest identity fields: email, full name, phone number.
 * Throws an error if any are invalid.
 *
 * @param {Object} params
 * @param {string} params.email - Guest's email address
 * @param {string} [params.fullName] - Guest's full name
 * @param {string} [params.phoneNumber] - Guest's phone number
 *
 * @throws {AppError} - If any validation fails
 */
export const validateGuestDetails = ({ email, fullName, phoneNumber }) => {
  if (!email || !isValidEmail(email)) {
    throw new AppError('Invalid guest email address', 400);
  }

  if (fullName && !isValidFullName(fullName)) {
    throw new AppError('Invalid guest full name', 400);
  }

  if (phoneNumber && !isValidPhoneNumber(phoneNumber)) {
    throw new AppError('Invalid guest phone number', 400);
  }
};

/**
 * Validates an email string.
 * @param {string} email - The email address to validate.
 * @returns {string | null} - Returns an error message if invalid, otherwise null.
 */
export const validateEmail = (email) => {
  // Check if the email is empty or only whitespace
  if (!email.trim()) return "Email is required.";

  // Regular expression to match valid email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Return null if valid, otherwise return error message
  return emailRegex.test(email) ? null : "Invalid email address.";
};

/**
 * Validates password strength.
 * @param {string} password - The password to validate.
 * @returns {string | null} - Returns an error message if invalid, otherwise null.
 */
/**
 * Validates the strength and structure of a password.
 *
 * @param {string} password - The password to validate.
 * @param {Object} options - Optional configuration.
 * @param {boolean} [options.allowEmpty=false] - Whether to allow empty passwords.
 * @returns {string|null} - Returns a validation error message if invalid, or null if valid.
 */
// export const validatePassword = (password, { allowEmpty = false } = {}) => {
//   // If the password is empty
//   if (!password) {
//     // Allow empty password only if explicitly permitted
//     return allowEmpty ? null : "Password is required.";
//   }

//   // Enforce minimum password length of 8 characters
//   if (password.length < 8) {
//     return "Password must be at least 8 characters.";
//   }

//   // Ensure password includes at least one uppercase letter and one number
//   if (!/[A-Z]/.test(password) || !/\d/.test(password)) {
//     return "Password must contain at least one uppercase letter and one number.";
//   }

//   // Return null if all validations pass
//   return null;
// };

/**
 * Validates the strength and security of a password.
 *
 * Enforces:
 * - Minimum 8 characters
 * - At least one uppercase letter
 * - At least one lowercase letter
 * - At least one number
 * - At least one special character
 * - Not a commonly used weak password
 *
 * @param {string} password - The password to validate.
 * @param {Object} options - Optional settings.
 * @param {boolean} [options.allowEmpty=false] - Whether to allow empty passwords.
 * @returns {string|null} - Returns an error message if invalid, or null if valid.
 */
export const validatePassword = (password, { allowEmpty = false } = {}) => {
  // List of commonly used weak passwords to reject
  const commonPasswords = [
    "123456",
    "password",
    "123456789",
    "12345678",
    "12345",
    "111111",
    "123123",
    "qwerty",
    "abc123",
    "password1",
  ];

  // Allow empty password if explicitly permitted
  if (!password) {
    return allowEmpty ? null : "Password is required.";
  }

  // Reject passwords shorter than 8 characters
  if (password.length < 8) {
    return "Password must be at least 8 characters.";
  }

  // Must include at least one uppercase letter
  if (!/[A-Z]/.test(password)) {
    return "Password must contain at least one uppercase letter.";
  }

  // Must include at least one lowercase letter
  if (!/[a-z]/.test(password)) {
    return "Password must contain at least one lowercase letter.";
  }

  // Must include at least one number
  if (!/\d/.test(password)) {
    return "Password must contain at least one number.";
  }

  // Must include at least one special character
  if (!/[!@#$%^&*(),.?":{}|<>_\-\\[\];'/+=~`]/.test(password)) {
    return "Password must contain at least one special character.";
  }

  // Reject commonly used weak passwords
  if (commonPasswords.includes(password.toLowerCase())) {
    return "This password is too common. Please choose a more secure one.";
  }

  // All validations passed
  return null;
};

/**
 * Confirms that the repeated password matches the original.
 * @param {string} password - The original password.
 * @param {string} confirmPassword - The repeated confirmation password.
 * @returns {string | null} - Returns an error message if they don't match, otherwise null.
 */
export const validateConfirmPassword = (password, confirmPassword) => {
  // Check if confirmation field is empty
  if (!confirmPassword) return "Please confirm your password.";

  // Return error if passwords do not match
  return password === confirmPassword ? null : "Passwords do not match.";
};

/**
 * Validates the user's full name input.
 * @param {string} name - The full name to validate.
 * @returns {string | null} - Returns an error message if invalid, otherwise null.
 */
export const validateName = (name) => {
  // Ensure name is not empty or whitespace
  return name.trim() ? null : "Full name is required.";
};

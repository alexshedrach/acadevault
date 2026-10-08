export const regex = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PASSWORD:
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
  PHONE: /^[0-9]{10,15}$/,
  URL: /^(http|https):\/\/[^\s$.?#].[^\s]*$/,
  // Regular expression for validating ISBN (10 or 13 digits)
  ISBN_REGEX: /^(97(8|9))?\d{9}(\d|X)$/,
  // Regular expression for sanitizing ISBN input (removing hyphens and spaces)
  ISBN_SANITIZE_REGEX: /[-\s]/g,
};

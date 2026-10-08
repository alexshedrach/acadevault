import crypto from 'crypto';

// ------------------------------
// **  Validation Utilities **
// ------------------------------

// ------------------------------
// ** Guest Validation Utilities **
// ------------------------------

export const isValidPhoneNumber = (phone) => {
  const phoneRegex = /^\+?\d{7,15}$/;
  return phoneRegex.test(phone);
};

export const isValidFullName = (name) => {
  return typeof name === 'string' && name.trim().length >= 2;
};

// Helper function to validate guest email
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const isValidPassword = (password) => {
  // At least 8 characters, one uppercase, one lowercase, one number, one special character
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(password);
};

// Common Configuration Utilities
export const getEnv = (key, fallback) => process.env[key] || fallback;
export const boolEnv = (key, fallback = false) => process.env[key] === 'true' || fallback;

// ------------------------------
// ** String Utilities **
// ------------------------------

export const capitalizeFirstLetter = (string) => {
  if (!string) return '';
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
};

export const truncateString = (str, num) => {
  return str.length > num ? str.slice(0, num) + '...' : str;
};

// ------------------------------
// ** Date Utilities **
// ------------------------------

export const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export const timeSince = (date) => {
  const seconds = Math.floor((new Date() - new Date(date)) / 1000);
  const intervals = [
    { label: 'year', seconds: 31536000 },
    { label: 'month', seconds: 2592000 },
    { label: 'day', seconds: 86400 },
    { label: 'hour', seconds: 3600 },
    { label: 'minute', seconds: 60 },
  ];

  for (const interval of intervals) {
    const count = Math.floor(seconds / interval.seconds);
    if (count > 0) {
      return `${count} ${interval.label}${count > 1 ? 's' : ''} ago`;
    }
  }
  return 'just now';
};

// ------------------------------
// ** Random Generators **
// ------------------------------

export const generateRandomString = (length) => {
  return Math.random().toString(36).substr(2, length);
};

export const generateUniqueId = () => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

// Utility to generate a random 6-digit OTP
export const generateOTP = () => {
  const otp = crypto.randomInt(100000, 999999).toString(); // Generate OTP and convert to string
  console.log('Generated OTP:', otp); // Only log in development mode
  return otp;
};

// Generate Transaction ID
export const generateTransactionId = () => {
  const timestamp = Date.now(); // Current timestamp
  const randomString = Math.random().toString(36).substring(2, 15); // Longer random alphanumeric string for better uniqueness
  return `TXN-${timestamp}-${randomString}`;
};

// Generate a random token
export const generateRandomToken = () => {
  return crypto.randomBytes(32).toString('hex');
};

// ------------------------------
// **  Currency Utilities **
// ------------------------------

export const formatCurrency = (amount, currency = 'NGN') => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(amount);
};

// ------------------------------
// ** Array Utilities **
// ------------------------------

export const removeDuplicates = (array, key) => {
  return array.filter((item, index, self) => index === self.findIndex((t) => t[key] === item[key]));
};

export const chunkArray = (array, size) => {
  return array.reduce((chunks, item, index) => {
    const chunkIndex = Math.floor(index / size);
    chunks[chunkIndex] = chunks[chunkIndex] || [];
    chunks[chunkIndex].push(item);
    return chunks;
  }, []);
};

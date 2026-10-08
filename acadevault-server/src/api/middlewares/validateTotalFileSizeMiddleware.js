import AppError from "../../utils/HandleAppErrors.js";

/**
 * Middleware to validate the total size of uploaded files.
 * Ensures that the combined size of all files in the request does not exceed the specified maximum size.
 *
 * @param {number} maxSizeMB - The maximum allowed total size of files in megabytes (MB).
 * @returns {function} - Express middleware function for file size validation.
 */
export const validateTotalFileSize = (maxSizeMB) => (req, res, next) => {
  // Calculate the total size of all files in the request.
  // `req.files` is assumed to be an array of uploaded files, where each file has a `size` property (in bytes).
  const totalSize = (req.files || []).reduce((acc, file) => acc + file.size, 0);

  // Check if the total size exceeds the specified maximum size.
  if (totalSize > maxSizeMB * 1024 * 1024) {
    // If it does, pass an error to the next middleware using `next` with an appropriate error message.
    return next(new AppError(`Total size exceeds ${maxSizeMB}MB.`, 400));
  }

  // If the total size is within the limit, proceed to the next middleware or route handler.
  next();
};

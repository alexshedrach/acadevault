/**
 * Send a standardized JSON response to the client.
 * @param {Object} res - The Express response object.
 * @param {Number} statusCode - The HTTP status code.
 * @param {String} message - A message to send to the client.
 * @param {Object} [data] - Optional data to include in the response.
 */
export const sendResponse = (res, statusCode, message, data = {}) => {
  res.status(statusCode).json({
    status: "success",
    message,
    data,
  });
};

import validator from "validator";

/**
 * Validates a list of URLs or a single URL.
 * @param {string | string[]} urls - Single URL or array of URLs to be validated.
 * @param {Array} protocols - Allowed protocols, defaults to ["http", "https"].
 * @returns {boolean} - Returns true if all URLs are valid, otherwise false.
 */
export const validateURLs = (urls, protocols = ["http", "https"]) => {
  const urlArray = Array.isArray(urls) ? urls : [urls];

  return urlArray.every((url) => {
    if (
      url.startsWith("http://localhost") ||
      url.startsWith("https://localhost")
    ) {
      return true; // ✅ Allow localhost URLs
    }
    return validator.isURL(url, { protocols });
  });
};
/**
 * Enhanced version of the validateURLs function that gives detailed feedback.
 * @param {string | string[]} urls - Single URL or array of URLs to be validated.
 * @param {Array} protocols - Allowed protocols, defaults to ["http", "https"].
 * @returns {Object} - Returns an object containing success status and error details (if any).
 */
export const validateURLsWithDetails = (
  urls,
  protocols = ["http", "https"]
) => {
  const urlArray = Array.isArray(urls) ? urls : [urls];
  const invalidUrls = urlArray.filter(
    (url) => !validator.isURL(url, { protocols })
  );

  if (invalidUrls.length > 0) {
    return {
      success: false,
      message: `The following URLs are invalid: ${invalidUrls.join(", ")}`,
    };
  }

  return {
    success: true,
    message: "All URLs are valid.",
  };
};

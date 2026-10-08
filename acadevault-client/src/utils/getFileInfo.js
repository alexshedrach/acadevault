/**
 * Returns a simplified file information object from a File input.
 * Useful for displaying user-friendly file metadata in the UI.
 *
 * @param {File} file - The File object to extract info from.
 * @returns {Object} An object containing a shortened name, formatted size, and file type category.
 */
export function getFileInfo(file) {
  // Truncate file name if it's longer than 30 characters for cleaner display
  const name =
    file.name.length > 30 ? file.name.slice(0, 27) + "..." : file.name;

  // Format the file size into human-readable units (e.g., "2.3 MB")
  const size = formatBytes(file.size);

  // Determine file type category based on MIME type prefix
  const type = file.type.startsWith("image")
    ? "image"
    : file.type.startsWith("video")
    ? "video"
    : "other"; // Default to "other" if not image or video

  return { name, size, type };
}

/**
 * Converts a byte size into a human-readable string.
 *
 * @param {number} bytes - The number of bytes.
 * @param {number} [decimals=1] - Number of decimal places to round to.
 * @returns {string} A formatted string like "1.2 MB".
 */
export function formatBytes(bytes, decimals = 1) {
  if (bytes === 0) return "0 B";

  const k = 1024; // Conversion base
  const dm = decimals < 0 ? 0 : decimals; // Ensure decimals is non-negative
  const sizes = ["B", "KB", "MB", "GB"]; // Units

  const i = Math.floor(Math.log(bytes) / Math.log(k)); // Determine size unit index
  const value = bytes / Math.pow(k, i); // Convert bytes to appropriate unit

  return parseFloat(value.toFixed(dm)) + " " + sizes[i]; // Format value with unit
}



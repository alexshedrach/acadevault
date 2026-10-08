import { v4 as uuidv4 } from 'uuid';
import slugify from 'slugify';

/**
 * Generates a sanitized and unique filename based on the original name.
 *
 * @param {string} originalName - The original file name.
 * @param {string} extension - The file extension (e.g., "jpg", "pdf").
 * @returns {string} - The generated unique filename.
 */
export const generateFilename = (originalName, extension) => {
  const timestamp = Date.now();
  const baseName = originalName.replace(/\.[^/.]+$/, '').replace(/\s+/g, '_');
  return `${baseName}-${timestamp}.${extension}`;
};

/**
 * Generates a folder path based on the provided parameters.
 *
 * @param {string} parentId - The parent entity ID (e.g., userId, materialId).
 * @param {string} uploadType - Type of upload (e.g., 'profile', 'preview', 'materials').
 * @param {string} customFolder - Optional custom folder structure (default: 'uploads').
 * @returns {string} - The generated folder path.
 */
export const generateFolderPath = (
  parentId,
  uploadType,
  customFolder = 'uploads',
) => {
  return parentId
    ? `uploads/${parentId}/${uploadType}`
    : `uploads/${customFolder}/${uploadType}`;
};

/**
 * Generates a sanitized, unique filename and folder path for a file upload.
 *
 * @param {string} originalName - The original file name.
 * @param {string} extension - The file extension (e.g., 'jpg', 'mp4').
 * @param {string} uploadType - Type of upload (e.g., 'profile', 'preview').
 * @param {string} parentId - The parent entity ID (e.g., userId, materialId).
 * @param {string} customFolder - Optional custom folder structure (default: 'uploads').
 * @returns {Object} - Contains the generated filename and folder path.
 */
export const generateFileDetails = (
  originalName,
  extension,
  uploadType,
  parentId = null,
  customFolder = 'uploads',
) => {
  const filename = generateFilename(originalName, extension);
  const folder = generateFolderPath(parentId, uploadType, customFolder);

  return { filename, folder };
};

/**
 * Generates a unique identifier for the file.
 *
 * @returns {string} - A unique UUID.
 */
export const generateFileId = () => {
  return uuidv4();
};

/**
 * Generates a clean base name from a file name, to be used for folders and filenames.
 *
 * @param {string} originalName - The original file name.
 * @returns {string} - A sanitized base name (slugified).
 */
export const generateBaseName = (originalName) => {
  return slugify(originalName.replace(/\.[^/.]+$/, ''), {
    lower: true,
    strict: true,
  });
};

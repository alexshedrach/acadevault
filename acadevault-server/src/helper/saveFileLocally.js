import fs from 'fs/promises';
import path from 'path';
import AppError from '../utils/HandleAppErrors.js';

/**
 * Save a buffer as a file locally with robust error handling.
 *
 * @param {Buffer} buffer - The file buffer to save.
 * @param {string} folder - Relative subfolder path under "public/uploads".
 * @param {string} filename - The desired filename (e.g., "profile.jpg").
 * @returns {Promise<string>} - The relative URL path to the saved file.
 * @throws {AppError} - Custom error for any failure during the save process.
 */

export const saveProfileLocally = async (buffer, folder, filename) => {
  try {
    const baseDirectory = 'public'; // Base directory for local uploads
    const absoluteFolderPath = path.resolve(baseDirectory, folder);

    // Ensure the folder exists
    await fs.mkdir(absoluteFolderPath, { recursive: true });

    // Construct the full file path
    const absoluteFilePath = path.join(absoluteFolderPath, filename);

    // Write the file to the local filesystem
    await fs.writeFile(absoluteFilePath, buffer);

    // Return the accessible file URL
    return `/${folder}/${filename}`; // Avoid prepending "public" to avoid duplication
  } catch (error) {
    console.error('Error saving file locally:', error.message);
    throw new AppError(`Error saving file locally: ${error.message}`, 500);
  }
};

/**
 * Save a buffer as a file locally with robust error handling.
 *
 * @param {Buffer} buffer - The file buffer to save.
 * @param {string} folder - Relative subfolder path under "public/uploads".
 * @param {string} filename - The desired filename (e.g., "profile.jpg").
 * @returns {Promise<string>} - The relative URL path to the saved file.
 * @throws {AppError} - Custom error for any failure during the save process.
 */

export const saveFileLocally = async (buffer, folder, filename) => {
  try {
    if (!buffer) {
      throw new AppError('File buffer is required.', 400);
    }

    // Sanitize folder and filename to prevent directory traversal and unwanted characters.
    // const sanitizedFolder = path.normalize(folder).replace(/^(\.\.[/\\])+/, '');
    const sanitizedFolder = folder
      .replace(/\\/g, '/')
      .replace(/^(\.\.\/)+/, '');

    // const sanitizedFilename = filename
    //   .replace(/[\s]+/g, '_')
    //   .replace(/[^a-zA-Z0-9._-]/g, '');
    const sanitizedFilename = filename
      .replace(/\\/g, '/')
      .replace(/[\s]+/g, '_')
      .replace(/[^a-zA-Z0-9._-]/g, '');

    const baseDirectory = 'public'; // Base directory for local uploads
    const absoluteFolderPath = path.resolve(baseDirectory, sanitizedFolder);

    // Ensure the folder exists
    await fs.mkdir(absoluteFolderPath, { recursive: true });

    // Generate full file path
    const absoluteFilePath = path.join(absoluteFolderPath, sanitizedFilename);

    // Write the file to the local filesystem
    await fs.writeFile(absoluteFilePath, buffer);

    // Return both the absolute path and a relative URL for client access.
    return {
      path: absoluteFilePath,
      // url: `/${sanitizedFolder}/${sanitizedFilename}`,
      url: `/${sanitizedFolder}/${sanitizedFilename}`.replace(/\\/g, '/'),
    };
  } catch (error) {
    console.error('Error saving file locally:', {
      folder,
      filename,
      message: error.message,
    });
    throw new AppError(`Error saving file locally: ${error.message}`, 500);
  }
};

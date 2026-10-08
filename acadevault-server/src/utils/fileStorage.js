import path from 'path';
import fs from 'fs/promises';
import AppError from './HandleAppErrors.js';
import cloudinary from '../config/cloudinary.js';


// Helper to sanitize paths and filenames for safe storage
const sanitizePath = (input) =>
  input.replace(/\\/g, '/').replace(/^(\.\.\/)+/, '');

const sanitizeFilename = (name) =>
  name.replace(/[\s]+/g, '_').replace(/[^a-zA-Z0-9._-]/g, '');

// ==========================
// Local File Storage
// ==========================

export const saveFileLocally = async (buffer, folder, filename) => {
  if (!buffer) throw new AppError('File buffer is required.', 400);

  // Sanitize folder and filename to prevent directory traversal and unwanted characters.
  const sanitizedFolder = sanitizePath(folder);
  const sanitizedFilename = sanitizeFilename(filename);
  const targetDir = path.resolve('public', sanitizedFolder);

  // Ensure the folder exists
  await fs.mkdir(targetDir, { recursive: true });

  // Construct the full file path
  const absolutePath = path.join(targetDir, sanitizedFilename);
  // Write the file to the local filesystem
  await fs.writeFile(absolutePath, buffer);

  return {
    path: absolutePath,
    url: `/${sanitizedFolder}/${sanitizedFilename}`.replace(/\\/g, '/'),
  };
};

// ==========================
// Cloudinary Upload Handler
// ==========================

export const uploadToCloudinary = async (
  file,
  folder,
  resourceType = 'auto',
  customName = '',
) => {
  if (!file) throw new AppError('No file provided for Cloudinary upload.', 400);

  const options = { folder, resource_type: resourceType };

  if (customName) {
    const timestamp = Date.now();
    const cleanName = customName
      .replace(/\s+/g, '_')
      .replace(/[^a-zA-Z0-9_-]/g, '');
    options.public_id = `${cleanName}_${timestamp}`;
  }

  try {
    if (Buffer.isBuffer(file)) {
      return await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          options,
          (err, result) => {
            if (err)
              return reject(
                new AppError(`Cloudinary Upload Error: ${err.message}`, 500),
              );
            resolve(result);
          },
        );
        uploadStream.end(file);
      });
    }

    if (typeof file === 'string') {
      return await cloudinary.uploader.upload(file, options);
    }

    throw new AppError('Unsupported file type for Cloudinary upload.', 400);
  } catch (error) {
    throw new AppError(`Cloudinary Upload Error: ${error.message}`, 500);
  }
};

// ==========================
// Cloudinary Deletion Handler
// ==========================

export const deleteFromCloudinary = async (
  publicId,
  resourceType = 'image',
) => {
  if (!publicId)
    throw new AppError('Invalid or missing Cloudinary public_id.', 400);

  try {
    const result = await cloudinary.v2.uploader.destroy(publicId, {
      resource_type: resourceType,
    });

    if (result.result !== 'ok' && result.result !== 'not found') {
      throw new AppError(
        `Cloudinary deletion failed for "${publicId}": ${result.result}`,
        500,
      );
    }

    return result;
  } catch (error) {
    throw new AppError(`Cloudinary Deletion Failed: ${error.message}`, 500);
  }
};

// ==========================
// Local File Deletion
// ==========================

export const deleteLocalFile = async (relativePath) => {
  if (!relativePath) return;

  const absolutePath = path.resolve(
    'public',
    relativePath.replace(/^\/+/, '').replace(/\\/g, '/'),
  );
  try {
    await fs.access(absolutePath);
    await fs.unlink(absolutePath);
    console.log(`✅ Deleted local file: ${absolutePath}`);
  } catch (error) {
    console.log(error)
    console.warn(`⚠️ File not found or already deleted: ${absolutePath}`);
  }
};

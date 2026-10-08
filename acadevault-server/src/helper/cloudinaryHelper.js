import cloudinary from '../config/cloudinary.js';
import AppError from '../utils/HandleAppErrors.js';
import { logger } from '../utils/logger.js';

export const uploadToCloudinary = async (
  file,
  folder,
  resourceType,
  customName = '',
) => {
  try {
    if (!file) {
      throw new AppError('No file provided for Cloudinary upload.', 400);
    }

    const options = {
      folder,
      resource_type: resourceType || 'auto',
    };

    // Add custom public_id if customName is provided
    if (customName) {
      const timestamp = Date.now();
      const sanitizedCustomName = customName
        .replace(/\s+/g, '_')
        .replace(/[^a-zA-Z0-9_-]/g, '');
      options.public_id = `${sanitizedCustomName}_${timestamp}`;
    }

    // Log upload intent
    console.log(
      `[Cloudinary Upload] Uploading file to folder: "${folder}" as "${options.public_id || 'auto-generated'}"`,
    );

    // If file is a buffer, use upload_stream
    if (Buffer.isBuffer(file)) {
      return await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          options,
          (error, result) => {
            if (error) {
              console.error('[Cloudinary Upload Error]', { error, options });
              return reject(
                new AppError(`Cloudinary Upload Error: ${error.message}`, 500),
              );
            }
            return resolve(result);
          },
        );
        stream.end(file);
      });
    }

    // If file is a file path (string), use standard upload
    if (typeof file === 'string') {
      const result = await cloudinary.uploader.upload(file, options);
      return result;
    }

    throw new AppError('Unsupported file type for Cloudinary upload.', 400);
  } catch (error) {
    console.error('[Cloudinary Upload Exception]', {
      message: error.message,
      stack: error.stack,
    });
    throw new AppError(`Cloudinary Upload Error: ${error.message}`, 500);
  }
};

export const deleteFromCloudinary = async (
  publicId,
  resourceType = 'image',
) => {
  try {
    if (!publicId || typeof publicId !== 'string') {
      throw new AppError('Invalid or missing Cloudinary public_id.', 400);
    }

    logger.info(
      `[Cloudinary Delete] Attempting to delete: "${publicId}" [type: ${resourceType}]`,
    );

    const result = await cloudinary.v2.uploader.destroy(publicId, {
      resource_type: resourceType,
    });

    if (!result || (result.result !== 'ok' && result.result !== 'not found')) {
      throw new AppError(
        `Failed to delete file with public_id "${publicId}". Cloudinary response: ${result.result}`,
        500,
      );
    }

    // Provide distinct log for not found case (not necessarily an error)
    if (result.result === 'not found') {
      logger.warn(
        `[Cloudinary Delete] File with public_id "${publicId}" was not found. It may have already been deleted.`,
      );
    } else {
      logger.info(
        `[Cloudinary Delete] Successfully deleted file with public_id: "${publicId}"`,
      );
    }

    return result;
  } catch (error) {
    logger.error(`[Cloudinary Delete Error] ${error.message}`, {
      publicId,
      timestamp: new Date().toISOString(),
    });

    throw new AppError(`Cloudinary Deletion Failed: ${error.message}`, 500);
  }
};

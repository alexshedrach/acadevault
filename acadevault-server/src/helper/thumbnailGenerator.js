import { uploadToCloudinary } from './cloudinaryHelper.js';
import {
  generateImageThumbnail,
  generatePdfThumbnail,
  generateTextThumbnail,
  generateVideoThumbnail,
} from './generateThumbnails.js';
import { saveFileLocally } from './saveFileLocally.js';

/**
 * Generates a thumbnail for a given file based on its MIME type.
 * @param {string} fileUrl - URL or path of the file.
 * @param {string} mimeType - MIME type of the file.
 * @param {string} title - Title of the material (for text-based thumbnails).
 * @returns {Promise<string|null>} - Public URL of the generated thumbnail or null on failure.
 */
export const generateThumbnail = async (fileUrl, mimeType, title) => {
  try {
    if (mimeType.startsWith('image/')) {
      return await generateImageThumbnail(fileUrl);
    } else if (mimeType.startsWith('video/')) {
      return await generateVideoThumbnail(fileUrl);
    } else if (mimeType.startsWith('application/pdf')) {
      return await generatePdfThumbnail(fileUrl);
    } else {
      return await generateTextThumbnail(title);
    }
  } catch (error) {
    console.error('Error generating thumbnail:', error);
    return null;
  }
};

/**
 * Handles uploading a thumbnail file.
 * @param {Object} thumbnailFile - Thumbnail file object from multer.
 * @param {Object} material - The academic material document (for dynamic folder structure).
 * @param {boolean} useLocal - If true, file is saved locally; otherwise, to Cloudinary.
 * @returns {Promise<Object>} - Object containing fileUrl, fileId, and previewUrl.
 */
export const handleThumbnailUpload = async (
  thumbnailFile,
  material,
  useLocal,
) => {
  const folder = `uploads/materials/${material._id}/thumbnails`;
  // Generate a sanitized filename with current timestamp
  const filename = `${Date.now()}-${thumbnailFile.originalname.replace(/\s+/g, '_')}`;

  let uploadedThumbnail;
  if (useLocal) {
    uploadedThumbnail = await saveFileLocally(
      thumbnailFile.buffer,
      folder,
      filename,
    );
  } else {
    uploadedThumbnail = await uploadToCloudinary(
      thumbnailFile.buffer,
      folder,
      'image',
    );
  }

  return {
    fileUrl: uploadedThumbnail.url,
    fileId: uploadedThumbnail.public_id || null,
    previewUrl: uploadedThumbnail.url, // Using the same URL as a preview for now
  };
};

// import { saveFileLocally } from "./saveUserFileLocally.js";
// import { uploadToCloudinary } from "./cloudinaryHelper.js";
// import {
//   generateImageThumbnail,
//   generatePdfThumbnail,
//   generateTextThumbnail,
//   generateVideoThumbnail,
// } from "./generateThumbnails.js";

// /**
//  * Generates a thumbnail for a given file based on its MIME type.
//  * @param {string} fileUrl - URL or path of the file.
//  * @param {string} mimeType - MIME type of the file.
//  * @param {string} title - Title of the material (for text-based thumbnails).
//  * @returns {Promise<string>} - Path or URL of the generated thumbnail.
//  */
// export const generateThumbnail = async (fileUrl, mimeType, title) => {
//   try {
//     if (mimeType.startsWith("image/")) {
//       return await generateImageThumbnail(fileUrl);
//     } else if (mimeType.startsWith("video/")) {
//       return await generateVideoThumbnail(fileUrl);
//     } else if (mimeType.startsWith("application/pdf")) {
//       return await generatePdfThumbnail(fileUrl);
//     } else {
//       return await generateTextThumbnail(title);
//     }
//   } catch (error) {
//     console.error("Error generating thumbnail:", error);
//     return null;
//   }
// };

// export const handleThumbnailUpload = async (
//   thumbnailFile,
//   material,
//   useLocal
// ) => {
//   const folder = `uploads/materials/${material._id}/thumbnails`;
//   const filename = `${Date.now()}-${thumbnailFile.originalname.replace(/\s+/g, "_")}`;

//   let uploadedThumbnail;
//   if (useLocal) {
//     uploadedThumbnail = await saveFileLocally(
//       thumbnailFile.buffer,
//       folder,
//       filename
//     );
//   } else {
//     uploadedThumbnail = await uploadToCloudinary(
//       thumbnailFile.buffer,
//       folder,
//       "image"
//     );
//   }

//   return {
//     fileUrl: uploadedThumbnail.url,
//     fileId: uploadedThumbnail.public_id || null,
//     previewUrl: uploadedThumbnail.url, // Preview URL for manual thumbnail
//   };
// };

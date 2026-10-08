import { FILE_TYPE_EXT } from "../constants/enums.js";
import { saveFileLocally, uploadToCloudinary } from "../utils/fileStorage.js";
import AppError from "../utils/HandleAppErrors.js";

/**
 * Handles profile image uploads to either local storage or Cloudinary.
 *
 * @param {Object} file - The uploaded file object.
 * @param {boolean} useLocal - Whether to store locally (default: true in development).
 * @param {string} userId - Optional user ID to organize uploads.
 * @returns {Object} File info { url, public_id? }
 */
export const handleProfileUpload = async (
  file,
  useLocal = process.env.NODE_ENV !== 'production',
  userId = null,
) => {
  if (!file || !file.buffer) {
    throw new AppError('Invalid file provided for upload.', 400);
  }

  const timestamp = Date.now();
  const baseName = file.originalname
    .replace(/\.[^/.]+$/, '')
    .replace(/\s+/g, '_');
  const extension = file.originalname.split('.').pop().toLowerCase();

  const filename = `${baseName}-${timestamp}.${extension}`;
  const folder = userId
    ? `uploads/users/${userId}/profile`
    : 'uploads/users/profile';

  if (useLocal) {
    const { url } = await saveFileLocally(file.buffer, folder, filename);
    return { url }; // Local return structure
  }

  const resourceType = file.mimetype.startsWith('image/') ? 'image' : 'auto';
  const uploaded = await uploadToCloudinary(
    file.buffer,
    folder,
    resourceType,
    baseName,
  );

  return {
    url: uploaded.url,
    public_id: uploaded.public_id,
  };
};

/**
 * Handles file uploads to local storage or Cloudinary.
 *
 * @param {Object} file - File object from multer.
 * @param {boolean} useLocal - Local storage flag.
 * @param {string} parentId - Optional parent entity ID for structured folders.
 * @param {string} uploadType - Subfolder type (e.g. 'profile', 'preview', 'documents').
 * @returns {Object} File metadata.
 */
export const handleFileUpload = async (
  file,
  useLocal = process.env.NODE_ENV !== 'production',
  parentId = null,
  uploadType = 'general'
) => {
  if (!file || !file.buffer) {
    console.error('Invalid file received:', file);
    throw new AppError('Invalid file provided for upload.', 400);
  }

  const fileType = file.originalname.split('.').pop().toLowerCase();
  if (!FILE_TYPE_EXT.includes(fileType)) {
    throw new AppError(
      `Unsupported file type: ${fileType}. Allowed: ${FILE_TYPE_EXT.join(', ')}`,
      400
    );
  }

  const fileCategory = file.mimetype.split('/')[0];

  const timestamp = Date.now();
  const baseName = file.originalname.replace(/\.[^/.]+$/, '').replace(/\s+/g, '_');
  const filename = `${baseName}-${timestamp}.${fileType}`;
  const folder = parentId
    ? `uploads/${parentId}/${uploadType}`
    : `uploads/${uploadType}`;

  try {
    if (useLocal) {
      const { url, path } = await saveFileLocally(file.buffer, folder, filename);
      const serverBaseUrl = process.env.SERVER_URL || 'http://localhost:5000';
      return {
        url: `${serverBaseUrl}${url}`,
        path,
        fileType,
        fileCategory
      };
    }

    const resourceType = fileCategory === 'image' ? 'image' : 'auto';
    const cloudResult = await uploadToCloudinary(file.buffer, folder, resourceType, baseName);

    if (!cloudResult || !cloudResult.url) {
      throw new AppError('Cloudinary upload failed.', 500);
    }

    return {
      url: cloudResult.url,
      public_id: cloudResult.public_id,
      fileType,
      fileCategory
    };
  } catch (err) {
    console.error('File upload error:', err);
    throw new AppError('File upload failed.', 500);
  }
};

// import { uploadToCloudinary } from './cloudinaryHelper.js';
// import AppError from '../utils/HandleAppErrors.js';
// import { saveFileLocally, saveProfileLocally } from './saveFileLocally.js';
// import { FILE_TYPE_EXT } from '../constants/enums.js';

// export const handleProfileUpload = async (
//   file,
//   useLocal = process.env.NODE_ENV !== 'production',
// ) => {
//   if (!file || !file.buffer) {
//     throw new AppError('Invalid file provided for upload.', 400);
//   }

//   const folder = file.folder || 'uploads';
//   const filename = `${Date.now()}-${file.originalname.replace(/\s+/g, '_')}`;

//   if (useLocal) {
//     // Save locally in development
//     const localUrl = await saveProfileLocally(file.buffer, folder, filename);
//     return { url: localUrl }; // Return object with 'url'
//   }

//   // Save to Cloudinary in production
//   const resourceType = file.mimetype.startsWith('image/') ? 'image' : 'auto';
//   const { url, public_id } = await uploadToCloudinary(
//     file.buffer,
//     folder,
//     resourceType,
//   );
//   return { url, public_id }; // Return object with 'url' and 'public_id'
// };

// /**
//  * Handles file uploads to either local storage or Cloudinary.
//  * Supports images, videos, and documents.
//  *
//  * @param {Object} file - The file object received from request (req.file).
//  * @param {boolean} useLocal - Determines if the file should be stored locally (default: true in non-production).
//  * @param {string} customFolder - (Optional) Custom folder name for file storage.
//  * @returns {Object} - Object containing file URL, path (if local), file type, and category.
//  * @throws {AppError} - Throws error if file validation or upload fails.
//  */
// export const handleFileUpload = async (
//   file,
//   useLocal = process.env.NODE_ENV !== 'production',
//   customFolder = 'uploads', // Default base folder is "uploads"
//   customName = '', // Optional custom file name
// ) => {
//   if (!file || !file.buffer) {
//     console.error('Invalid file received:', file);
//     throw new AppError('Invalid file provided for upload.', 400);
//   }

//   // Extract the file extension from the original filename
//   const fileType = file.originalname.split('.').pop().toLowerCase();

//   // Validate file type against allowed extensions
//   if (!FILE_TYPE_EXT.includes(fileType)) {
//     throw new AppError(
//       `Unsupported file type: ${fileType}. Allowed types are ${FILE_TYPE_EXT.join(', ')}`,
//       400,
//     );
//   }

//   // Determine file category based on MIME type (e.g., image, video, application)
//   const fileCategory = file.mimetype.split('/')[0];

//   // Append the custom folder structure to the base "uploads" folder
//   const folder = `uploads/${customFolder || 'uploads'}`;

//   // Generate a unique filename to avoid conflicts
//   const filename = `${Date.now()}-${file.originalname.replace(/\s+/g, '_')}`;

//   try {
//     if (useLocal) {
//       console.log(`Saving file locally in folder: ${folder}...`);

//       // Save file locally
//       const savedFile = await saveFileLocally(file.buffer, folder, filename);

//       if (!savedFile || !savedFile.path) {
//         throw new AppError('Local file saving failed.', 500);
//       }

//       // Construct absolute file URL using server base URL
//       const serverBaseUrl = process.env.SERVER_URL || 'http://localhost:5000';
//       const fullUrl = `${serverBaseUrl}${savedFile.url}`;

//       console.log('File saved locally at:', fullUrl);

//       return {
//         url: fullUrl, // Absolute URL for file access
//         path: savedFile.path, // Local file path
//         fileType,
//         fileCategory,
//       };
//     }

//     console.log(`Uploading file to Cloudinary in folder: ${folder}...`);

//     // Determine Cloudinary resource type (images use "image", others use "auto")
//     const resourceType = fileCategory === 'image' ? 'image' : 'auto';

//     // Upload file to Cloudinary
//     const cloudinaryResponse = await uploadToCloudinary(
//       file.buffer,
//       folder,
//       resourceType,
//       customName, // Pass the optional custom name
//     );

//     if (!cloudinaryResponse || !cloudinaryResponse.url) {
//       throw new AppError('Cloudinary upload failed.', 500);
//     }

//     return {
//       url: cloudinaryResponse.url, // Cloudinary file URL
//       public_id: cloudinaryResponse.public_id, // Cloudinary file ID for deletion
//       fileType,
//       fileCategory,
//     };
//   } catch (error) {
//     console.error('File upload error:', error);
//     throw new AppError('File upload failed.', 500);
//   }
// };

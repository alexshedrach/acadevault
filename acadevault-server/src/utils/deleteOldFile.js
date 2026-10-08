import { deleteFromCloudinary, deleteLocalFile } from './fileStorage.js';

/**
 * Deletes a file from storage (local or cloud).
 * @param {Object} params
 * @param {Object} params.fileData - The file document or plain object { fileUrl, fileId }.
 * @param {string} params.storageType - 'cloud' or 'local'.
 */
export const deleteOldFile = async ({ fileData, storageType }) => {
  try {
    if (!fileData) return;

    const isCloud = storageType === 'cloud';
    const isLocal = storageType === 'local';

    // Cloudinary deletion
    if (isCloud && fileData.fileId) {
      await deleteFromCloudinary(fileData.fileId);
    }

    // Local filesystem deletion
    if (isLocal && fileData.fileUrl) {
      await deleteLocalFile(fileData.fileUrl);
    }
  } catch (error) {
    console.warn(`⚠️ File deletion failed (${storageType}):`, error.message);
  }
};

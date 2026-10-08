import File from '../api/models/FileModel.js';
import { deleteFromCloudinary, deleteLocalFile } from '../utils/fileStorage.js';

/**
 * Deletes all associated files of a material:
 * - Main digital file
 * - Preview files
 * - Additional files
 * - Thumbnail image
 *
 * Automatically cleans Cloudinary or Local files, as well as their database records.
 * @param {Object} material - The AcademicMaterial Mongoose Document.
 * @param {boolean} useLocal - If true, delete from local filesystem; otherwise from Cloudinary.
 */
export const deleteMaterialAssets = async (material, useLocal = false) => {
  try {
    /**
     * Helper function to delete a file both from storage and database.
     * @param {string} fileId - MongoDB ObjectId of the file.
     */
    const cleanFile = async (fileId) => {
      if (!fileId) return;
      const fileDoc = await File.findById(fileId);
      if (!fileDoc) return;

      // Delete from cloud or local based on configuration
      if (!useLocal && fileDoc.fileId) {
        await deleteFromCloudinary(fileDoc.fileId);
      } else if (useLocal && fileDoc.fileUrl) {
        await deleteLocalFile(fileDoc.fileUrl);
      }

      // Finally remove from DB
      await File.findByIdAndDelete(fileDoc._id);
    };

    // ========== Delete Main Digital File ==========
    if (material.digitalContent?.file) {
      await cleanFile(material.digitalContent.file);
      material.digitalContent.file = undefined;
      material.markModified('digitalContent');
    }

    // ========== Delete Preview Files ==========
    if (
      Array.isArray(material.previewFiles) &&
      material.previewFiles.length > 0
    ) {
      await Promise.all(
        material.previewFiles.map((fileId) => cleanFile(fileId)),
      );
      material.previewFiles = [];
      material.markModified('previewFiles');
    }

    // ========== Delete Additional Files ==========
    if (
      Array.isArray(material.digitalContent?.additionalFiles) &&
      material.digitalContent.additionalFiles.length > 0
    ) {
      await Promise.all(
        material.digitalContent.additionalFiles.map((fileId) =>
          cleanFile(fileId),
        ),
      );
      material.digitalContent.additionalFiles = [];
      material.markModified('digitalContent');
    }

    // ========== Delete Thumbnail ==========
    if (material.thumbnail) {
      if (useLocal) {
        await deleteLocalFile(material.thumbnail);
      } else {
        await deleteFromCloudinary(material.thumbnail);
      }
      material.thumbnail = undefined;
      material.markModified('thumbnail');
    }

    // Save the cleared material to the database
    await material.save();
  } catch (error) {
    console.warn('⚠️ Failed to clean up material assets:', error.message);
  }
};

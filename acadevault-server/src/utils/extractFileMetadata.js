import mime from 'mime-types';
import AppError from './HandleAppErrors.js';
import { mimeToFileType } from '../constants/mineType.js';
import { getFileCategory } from '../helper/getFileCategory.js';
import { getMediaDuration } from '../helper/getMediaDuration.js';
import { extractPageCount } from '../helper/pageCountExtractor.js';

/**
 * Extracts comprehensive metadata from a given uploaded file.
 * @param {Object} file - The uploaded file object (e.g., from Multer)
 * @param {Buffer} file.buffer - The raw file buffer for page extraction
 * @param {string} file.originalname - The original file name
 * @param {string} file.mimetype - MIME type
 * @param {number} file.size - File size in bytes
 * @returns {Promise<Object>} Metadata including name, size, type, category, extension, page count
 */

/**
 * Extracts metadata from a file buffer (pdf, docx, etc).
 */
export const extractFileMetadata = async (file) => {
  if (
    !file ||
    !file.originalname ||
    !file.mimetype ||
    typeof file.size !== 'number'
  ) {
    throw new AppError(
      'Incomplete file object: missing originalname, mimetype, or size.',
      400,
    );
  }

  const { originalname, mimetype, size, buffer } = file;
  const extension = originalname.split('.').pop()?.toLowerCase() || 'unknown';
  const fileType =
    mimeToFileType[mimetype] || mime.extension(mimetype) || extension;
  const fileCategory = getFileCategory(mimetype);

  let pageCount = null;
  let duration = null;

  if (['pdf', 'docx'].includes(fileType) && buffer) {
    try {
      pageCount = await extractPageCount(buffer, fileType);
    } catch (err) {
      console.error(`[extractFileMetadata] Page count extraction failed:`, err);
    }
  }

    if (['video', 'audio'].includes(fileCategory) && buffer) {
      try {
        duration = await getMediaDuration(buffer);
      } catch (err) {
        console.error(`Error extracting media duration:`, err);
      }
    }

  return {
    fileName: originalname.trim(),
    fileSize: size,
    fileType,
    fileExtension: extension,
    mimeType: mimetype,
    fileCategory,
    pageCount,
    duration,
  };
};

// export const extractFileMetadata = async (file) => {
//   if (
//     !file ||
//     !file.originalname ||
//     !file.mimetype ||
//     typeof file.size !== 'number'
//   ) {
//     throw new AppError(
//       'Incomplete file object: missing originalname, mimetype, or size.',
//       400,
//     );
//   }

//   const { originalname, mimetype, size, buffer } = file;
//   const extension = originalname.split('.').pop()?.toLowerCase() || 'unknown';
//   const fileType =
//     mimeToFileType[mimetype] || mime.extension(mimetype) || extension;
//   const fileCategory = getFileCategory(mimetype);

//   let pageCount = null;
//   let duration = null;

//   if (['pdf', 'docx'].includes(fileType) && buffer) {
//     pageCount = await extractPageCount(buffer, fileType);

//     console.log(`Page count extracted: ${pageCount}`);

//   }

//   if (['video', 'audio'].includes(fileCategory) && buffer) {
//     try {
//       duration = await getMediaDuration(buffer);
//     } catch (err) {
//       console.error(`Error extracting media duration:`, err);
//     }
//   }

//   return {
//     fileName: originalname.trim(),
//     fileSize: size,
//     fileType,
//     fileExtension: extension,
//     mimeType: mimetype,
//     fileCategory,
//     pageCount,
//     duration,
//   };
// };

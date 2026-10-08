import fs from "fs-extra";
import path from "path";
import fileType from "file-type"; // Library to detect file type
import { statSync } from "fs"; // For file size
import pdfLib from "pdf-lib"; // For PDF-specific metadata
import ffmpeg from "fluent-ffmpeg"; // For audio/video metadata

/**
 * Extract metadata for uploaded files.
 * @param {string} filePath - Path to the uploaded file.
 * @returns {Promise<object>} Metadata including format, size, and more.
 */
export const extractFileMetadata = async (filePath) => {
  try {
    // Validate that the file exists
    if (!fs.existsSync(filePath)) {
      throw new Error(`File not found: ${filePath}`);
    }

    // Get file size
    const { size } = statSync(filePath); // Size in bytes

    // Get file type using `file-type`
    const typeInfo = await fileType.fromFile(filePath);
    const format = typeInfo
      ? typeInfo.ext.toUpperCase()
      : path.extname(filePath).toUpperCase().replace(".", "");

    const metadata = {
      fileFormat: format, // e.g., PDF, MP4
      fileSize: (size / (1024 * 1024)).toFixed(2), // Convert to MB
    };

    // Additional metadata for PDFs
    if (format === "PDF") {
      const pdfDoc = await pdfLib.PDFDocument.load(fs.readFileSync(filePath));
      metadata.pageCount = pdfDoc.getPageCount(); // Add page count
    }

    // Additional metadata for videos or audio
    if (["MP4", "MP3"].includes(format)) {
      metadata.duration = await getMediaDuration(filePath); // Duration in seconds
    }

    return metadata;
  } catch (error) {
    console.error("Error extracting metadata:", error);
    throw error;
  }
};

/**
 * Get duration of audio/video files using ffmpeg.
 * @param {string} filePath - Path to the media file.
 * @returns {Promise<number>} Duration in seconds.
 */
const getMediaDuration = (filePath) => {
  return new Promise((resolve, reject) => {
    ffmpeg.ffprobe(filePath, (err, metadata) => {
      if (err) return reject(err);
      resolve(metadata.format.duration); // Duration in seconds
    });
  });
};

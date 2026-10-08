
import { PDFDocument } from 'pdf-lib';
import mammoth from 'mammoth';

/**
 * Estimate the number of pages in a document based on its format.
 *
 * @param {Buffer} fileBuffer - The uploaded file buffer.
 * @param {string} fileFormat - The simplified file format: 'pdf' or 'docx'.
 * @returns {Promise<number|null>} - The estimated page count or null if not applicable.
 */
export const extractPageCount = async (fileBuffer, fileFormat) => {
  try {
    if (!fileBuffer || !fileFormat) {
      throw new Error(
        'Missing required parameters (fileBuffer or fileFormat).',
      );
    }

    if (fileFormat === 'pdf') {
      // Quick validation to ensure it's likely a PDF
      if (!fileBuffer.toString('utf8', 0, 4).includes('%PDF')) {
        throw new Error('Invalid PDF format');
      }

      const pdfDoc = await PDFDocument.load(fileBuffer);
      const count = pdfDoc.getPageCount();
      return count > 0 ? count : null;
    } else if (fileFormat === 'docx') {
      // Extract raw text using mammoth
      const { value } = await mammoth.extractRawText({ buffer: fileBuffer });

      if (!value || value.trim() === '') {
        throw new Error('No content extracted from DOCX');
      }

      // Heuristic: Assume 1800 characters per page
      const estimatedPageCount = Math.max(1, Math.ceil(value.length / 1800));
      return estimatedPageCount;
    } else {
      console.warn(
        `Page count extraction not supported for file format: ${fileFormat}`,
      );
      return null;
    }
  } catch (error) {
    console.error(
      `Failed to extract page count for format "${fileFormat}":`,
      error.message,
    );
    return null;
  }
};


// import { PDFDocument } from "pdf-lib";
// import mammoth from "mammoth";

// /**
//  * Extract page count for supported document types
//  * @param {Buffer} fileBuffer - The uploaded file buffer
//  * @param {string} fileFormat - The format of the file (e.g., pdf, docx)
//  * @returns {Promise<number|null>} - The number of pages or null if not applicable
//  */
// export const extractPageCount = async (fileBuffer, fileFormat) => {
//   try {
//     if (fileFormat === "pdf") {
//       // Check for a valid PDF signature
//       if (!fileBuffer.toString("utf8").startsWith("%PDF")) {
//         throw new Error("Invalid PDF format");
//       }
//       const pdfDoc = await PDFDocument.load(fileBuffer);
//       return pdfDoc.getPageCount();
//     } else if (fileFormat === "docx") {
//       // Extract text from DOCX and estimate page count
//       const { value } = await mammoth.extractRawText({ buffer: fileBuffer });
//       if (!value || value.trim() === "") {
//         throw new Error("Unable to extract text from DOCX file");
//       }
//       const estimatedPageCount = Math.ceil(value.length / 1800); // Estimate: 1800 characters per page
//       return estimatedPageCount;
//     } else {
//       return null; // Page count extraction not supported for this file type
//     }
//   } catch (error) {
//     console.error(`Error extracting page count for ${fileFormat}:`, error);
//     return null;
//   }
// };

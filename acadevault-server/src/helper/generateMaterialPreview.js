import axios from "axios";
import sharp from "sharp";
import ffmpeg from "fluent-ffmpeg";
import pdf2image from "pdf2image";
// import { createCanvas } from "canvas";
import fs from "fs-extra";
import path from "path";
import { v4 as uuidv4 } from "uuid";

// Base directory for storing generated previews
const BASE_UPLOAD_DIR = path.resolve("public/uploads");
const PREVIEW_DIR = path.join(BASE_UPLOAD_DIR, "previews");
fs.ensureDirSync(PREVIEW_DIR);

/**
 * Helper function to generate preview for an academic material.
 * If file is an image or video, use dedicated functions.
 * For PDFs and DOCX (text-based), use heuristics to extract first portion.
 * @param {string} fileUrl - URL or path of the primary file.
 * @param {string} mimeType - MIME type of the primary file.
 * @param {string} title - Title of the material.
 * @param {string} materialType - Material type (e.g., research_paper, journal, etc.)
 * @returns {Promise<string|null>} - Path/URL to preview file.
 */
export const generateMaterialPreview = async (
  fileUrl,
  mimeType,
  title,
  materialType
) => {
  try {
    if (mimeType.startsWith("image/")) {
      return await generateImagePreview(fileUrl);
    } else if (mimeType.startsWith("video/")) {
      return await generateVideoPreview(fileUrl);
    } else if (mimeType.startsWith("application/pdf")) {
      // For documents, auto-generate preview by extracting first page or snippet
      const textBasedTypes = [
        "research_paper",
        "journal",
        "thesis",
        "dissertation",
        "project_report",
        "term_paper",
        "assignment",
        "handout",
        "proposal",
      ];
      if (textBasedTypes.includes(materialType)) {
        return await generatePdfPreview(fileUrl);
      }
      return await generateTextPreview(fileUrl);
    } else if (
      mimeType ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
      // For DOCX files, generate text preview
      return await generateTextPreview(fileUrl);
    } else {
      return await generateTextPreview(title);
    }
  } catch (error) {
    console.error("Error generating material preview:", error);
    return null;
  }
};

// --- Example implementations for preview generators (simplified) ---

export const generateImagePreview = async (fileUrl) => {
  try {
    let imageBuffer;
    if (/^https?:\/\//.test(fileUrl)) {
      const response = await axios.get(fileUrl, {
        responseType: "arraybuffer",
      });
      imageBuffer = Buffer.from(response.data, "binary");
    } else {
      if (!fs.existsSync(fileUrl)) return null;
      imageBuffer = await fs.readFile(fileUrl);
    }
    const previewPath = path.join(PREVIEW_DIR, `preview_${uuidv4()}.png`);
    await sharp(imageBuffer).resize({ width: 500 }).toFile(previewPath);
    return previewPath;
  } catch (error) {
    console.error("Error generating image preview:", error);
    return null;
  }
};

// Explicitly bind fluent-ffmpeg to our bundled static binary.
// This guarantees the app works on any server without requiring OS-level installations.
ffmpeg.setFfmpegPath(ffmpegStatic);

/**
 * Generates a thumbnail preview from a video file.
 * Safely spawns a child process using the bundled static FFmpeg binary.
 * * @param {string} fileUrl - Path to the local video file.
 * @returns {Promise<string|null>} - Path to the generated PNG preview.
 */
export const generateVideoPreview = async (fileUrl) => {
  return new Promise((resolve, reject) => {
    // 1. Sanity check: Ensure the source video actually exists on disk
    if (!fs.existsSync(fileUrl)) {
      console.warn(`⚠️ Video file not found for preview generation: ${fileUrl}`);
      return reject(null);
    }

    // 2. Define the output destination
    const previewFileName = `preview_${uuidv4()}.png`;
    const previewPath = path.join(PREVIEW_DIR, previewFileName);

    // 3. Execute the FFmpeg command
    ffmpeg(fileUrl)
      .screenshots({
        timestamps: ["10%"], // Grab a frame at the 10% mark of the video duration
        filename: previewFileName,
        folder: PREVIEW_DIR,
        size: "500x?",     // Maintain aspect ratio with a 500px width
      })
      .on("end", () => {
        // Successfully generated the thumbnail
        resolve(previewPath);
      })
      .on("error", (error) => {
        // Catch and log any processing or codec errors safely
        console.error("❌ Error generating video preview:", error.message);
        reject(null);
      });
  });
};

export const generatePdfPreview = async (pdfUrl) => {
  try {
    if (!fs.existsSync(pdfUrl)) return '/default-pdf-preview.png';

    // 1. Read the PDF file into a buffer
    const dataBuffer = await fs.readFile(pdfUrl);

    // 2. Extract ONLY the first page to save memory and processing time
    const pdfData = await pdfParse(dataBuffer, { max: 1 });

    // 3. If the PDF has readable text, pipe it to our Sharp SVG-to-PNG generator
    if (pdfData.text && pdfData.text.trim().length > 0) {
      // Create a temporary text file to satisfy the existing generateTextPreview signature
      const tempTextPath = `${pdfUrl}_temp.txt`;
      await fs.writeFile(tempTextPath, pdfData.text.trim());

      const previewPath = await generateTextPreview(tempTextPath);

      // Clean up the temporary text file
      await fs.remove(tempTextPath);

      return previewPath || '/default-pdf-preview.png';
    }

    // 4. Fallback if the PDF is scanned (image-based) with no extractable text
    return '/default-pdf-preview.png';
  } catch (error) {
    console.error('PDF preview generation failed:', error.message);
    return '/default-pdf-preview.png';
  }
};

export const generateTextPreview = async (fileUrl) => {
  try {
    if (!fs.existsSync(fileUrl)) return null;

    const textContent = await fs.readFile(fileUrl, 'utf-8');

    // 1. Extract first 10% of text and normalize whitespace
    let previewText = textContent.substring(0, Math.floor(textContent.length * 0.1));
    previewText = previewText.replace(/\s+/g, ' ').trim();

    // 2. Wrap text algorithmically (replaces the old Canvas measureText)
    // We estimate ~70 characters per line for a 560px width at 16px font size
    const MAX_CHARS_PER_LINE = 70;
    const MAX_LINES = 15; // Keeps text safely within the 400px height
    const words = previewText.split(' ');
    const lines = [];
    let currentLine = '';

    for (const word of words) {
      if ((currentLine + word).length > MAX_CHARS_PER_LINE) {
        lines.push(currentLine.trim());
        currentLine = word + ' ';
        if (lines.length >= MAX_LINES) break; // Stop if we hit vertical limit
      } else {
        currentLine += word + ' ';
      }
    }
    if (lines.length < MAX_LINES && currentLine) {
      lines.push(currentLine.trim());
    }

    // 3. Escape XML characters to prevent malformed SVG errors
    const escapeXml = (unsafe) =>
      unsafe.replace(/[<>&'"]/g, (c) => {
        switch (c) {
          case '<':
            return '&lt;';
          case '>':
            return '&gt;';
          case '&':
            return '&amp;';
          case "'":
            return '&apos;';
          case '"':
            return '&quot;';
          default:
            return c;
        }
      });

    // 4. Construct <tspan> elements for multi-line SVG text
    // We use a 24px line-height (dy="24") for standard readability
    const svgLines = lines
      .map((line, index) => `<tspan x="20" dy="${index === 0 ? 0 : 24}">${escapeXml(line)}</tspan>`)
      .join('');

    // 5. Build the raw SVG markup
    const svgImage = `
      <svg width="600" height="400" xmlns="http://www.w3.org/2000/svg">
        <rect width="100%" height="100%" fill="#f0f0f0"/>
        <text x="20" y="40" font-family="Arial, sans-serif" font-size="16px" fill="#333333">
          ${svgLines}
        </text>
      </svg>
    `;

    // 6. Use Sharp to seamlessly convert the SVG buffer into a PNG file
    const previewPath = path.join(PREVIEW_DIR, `preview_${uuidv4()}.png`);
    await sharp(Buffer.from(svgImage)).png().toFile(previewPath);

    return previewPath;
  } catch (error) {
    console.error('Error generating text preview:', error);
    return null;
  }
};


// import axios from "axios";
// import sharp from "sharp";
// import ffmpeg from "fluent-ffmpeg";
// import pdf2image from "pdf2image";
// import { createCanvas } from "canvas";
// import fs from "fs-extra";
// import path from "path";
// import { v4 as uuidv4 } from "uuid";

// // Base directory for storing generated previews
// const BASE_UPLOAD_DIR = path.resolve("public/uploads");
// const PREVIEW_DIR = path.join(BASE_UPLOAD_DIR, "previews");
// fs.ensureDirSync(PREVIEW_DIR);

// /**
//  * Generates an image preview by resizing the image.
//  * @param {string} fileUrl - URL or local path to the image file.
//  * @returns {Promise<string|null>} - Preview file path.
//  */
// export const generateImagePreview = async (fileUrl) => {
//   try {
//     let imageBuffer;
//     if (/^https?:\/\//.test(fileUrl)) {
//       const response = await axios.get(fileUrl, { responseType: "arraybuffer" });
//       imageBuffer = Buffer.from(response.data, "binary");
//     } else {
//       if (!fs.existsSync(fileUrl)) return null;
//       imageBuffer = await fs.readFile(fileUrl);
//     }
//     const previewPath = path.join(PREVIEW_DIR, `preview_${uuidv4()}.png`);
//     await sharp(imageBuffer).resize({ width: 500 }).toFile(previewPath);
//     return previewPath;
//   } catch (error) {
//     console.error("Error generating image preview:", error);
//     return null;
//   }
// };

// /**
//  * Generates a video preview by capturing a short clip (e.g., first 30 seconds).
//  * @param {string} fileUrl - URL or local path to the video file.
//  * @returns {Promise<string|null>} - Preview file path.
//  */
// export const generateVideoPreview = async (fileUrl) => {
//   try {
//     let localFilePath = fileUrl;
//     if (/^https?:\/\//.test(fileUrl)) {
//       const response = await axios.get(fileUrl, { responseType: "arraybuffer" });
//       const tempPath = path.join(BASE_UPLOAD_DIR, `temp_${uuidv4()}${path.extname(fileUrl)}`);
//       await fs.writeFile(tempPath, Buffer.from(response.data, "binary"));
//       localFilePath = tempPath;
//     } else if (!fs.existsSync(fileUrl)) {
//       return null;
//     }
//     const previewPath = path.join(PREVIEW_DIR, `preview_${uuidv4()}.png`);
//     return new Promise((resolve, reject) => {
//       ffmpeg(localFilePath)
//         .screenshots({
//           timestamps: ["00:00:05"], // Capture a frame at 5 seconds (or adjust as needed)
//           filename: path.basename(previewPath),
//           folder: PREVIEW_DIR,
//           size: "500x?"
//         })
//         .on("end", async () => {
//           if (/^temp_/.test(path.basename(localFilePath))) {
//             await fs.remove(localFilePath);
//           }
//           resolve(previewPath);
//         })
//         .on("error", async (err) => {
//           console.error("Error generating video preview:", err);
//           if (/^temp_/.test(path.basename(localFilePath))) {
//             await fs.remove(localFilePath);
//           }
//           reject(null);
//         });
//     });
//   } catch (error) {
//     console.error("Error generating video preview:", error);
//     return null;
//   }
// };

// /**
//  * Generates a PDF preview by extracting the first few pages.
//  * If the document lacks clear chapter divisions, extract a fixed number of pages.
//  * @param {string} pdfUrl - URL or local path to the PDF file.
//  * @returns {Promise<string>} - Path to the generated preview image, or default if failure.
//  */
// export const generatePdfPreview = async (pdfUrl) => {
//   try {
//     if (!fs.existsSync(pdfUrl)) {
//       console.error(`PDF file not found: ${pdfUrl}`);
//       return "/default-pdf-preview.png";
//     }
//     const imagePaths = await pdf2image.convertPDF(pdfUrl, {
//       outputFormat: "jpeg",
//       outputPath: PREVIEW_DIR,
//       dpi: 100,
//       firstPageOnly: true, // Extract only the first page as preview
//     });
//     if (imagePaths && imagePaths[0]) {
//       return imagePaths[0];
//     } else {
//       throw new Error("PDF preview generation failed");
//     }
//   } catch (error) {
//     console.error("PDF preview generation failed:", error.message);
//     return "/default-pdf-preview.png";
//   }
// };

// /**
//  * Generates a text preview by extracting the first 10% of the content.
//  * This is a fallback for documents that are not arranged by chapters.
//  * @param {string} fileUrl - URL or path of the document file.
//  * @returns {Promise<string|null>} - Path to a generated text preview image.
//  */
// export const generateTextPreview = async (fileUrl) => {
//   try {
//     // Read the file contents (assuming it’s a text-based file, e.g., DOCX processed into plain text)
//     if (!fs.existsSync(fileUrl)) return null;
//     const textContent = await fs.readFile(fileUrl, "utf-8");
//     const previewText = textContent.substring(0, Math.floor(textContent.length * 0.1)); // First 10%

//     // Create a canvas with the preview text
//     const { createCanvas } = require("canvas");
//     const canvas = createCanvas(600, 400);
//     const ctx = canvas.getContext("2d");
//     ctx.fillStyle = "#f0f0f0"; // light background
//     ctx.fillRect(0, 0, canvas.width, canvas.height);
//     ctx.fillStyle = "#333";
//     ctx.font = "16px Arial";
//     ctx.textAlign = "left";
//     wrapText(ctx, previewText, 20, 30, 560, 20); // Custom wrapText function to render multi-line text

//     const previewPath = path.join(PREVIEW_DIR, `preview_${uuidv4()}.png`);
//     const buffer = canvas.toBuffer("image/png");
//     await fs.writeFile(previewPath, buffer);
//     return previewPath;
//   } catch (error) {
//     console.error("Error generating text preview:", error);
//     return null;
//   }
// };

// // Helper function to wrap text on canvas
// function wrapText(context, text, x, y, maxWidth, lineHeight) {
//   const words = text.split(" ");
//   let line = "";
//   for (let n = 0; n < words.length; n++) {
//     const testLine = line + words[n] + " ";
//     const metrics = context.measureText(testLine);
//     const testWidth = metrics.width;
//     if (testWidth > maxWidth && n > 0) {
//       context.fillText(line, x, y);
//       line = words[n] + " ";
//       y += lineHeight;
//     } else {
//       line = testLine;
//     }
//   }
//   context.fillText(line, x, y);
// }

// /**
//  * Generates a preview for an academic material based on its file type and material type.
//  * If a seller-supplied preview file is provided, it should be used separately.
//  * Otherwise, auto-generate a preview using a hybrid approach.
//  *
//  * @param {string} fileUrl - URL or path of the main file.
//  * @param {string} mimeType - MIME type of the file.
//  * @param {string} title - Title of the academic material.
//  * @param {string} materialType - The digital material type (e.g., research_paper, journal, source_code, etc.)
//  * @returns {Promise<string|null>} - Path or URL of the generated preview file.
//  */
// export const generateMaterialPreview = async (fileUrl, mimeType, title, materialType) => {
//   try {
//     // If the file is an image, generate an image preview
//     if (mimeType.startsWith("image/")) {
//       return await generateImagePreview(fileUrl);
//     }
//     // For videos, capture a preview frame (or short clip if needed)
//     else if (mimeType.startsWith("video/")) {
//       return await generateVideoPreview(fileUrl);
//     }
//     // For PDFs
//     else if (mimeType.startsWith("application/pdf")) {
//       // For materials that are text heavy (e.g., research papers, journals, theses, etc.),
//       // generate a preview by extracting the first page.
//       const textBasedTypes = [
//         "research_paper",
//         "journal",
//         "thesis",
//         "dissertation",
//         "project_report",
//         "term_paper",
//         "assignment",
//         "handout",
//         "proposal",
//       ];
//       if (textBasedTypes.includes(materialType)) {
//         return await generatePdfPreview(fileUrl);
//       }
//       // Fallback: Generate a text-based preview from the content
//       return await generateTextPreview(fileUrl);
//     }
//     // For DOCX documents (or similar text-based documents)
//     else if (mimeType === "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
//       // For known academic document types, try auto-generating a preview.
//       const textBasedTypes = [
//         "research_paper",
//         "journal",
//         "thesis",
//         "dissertation",
//         "project_report",
//         "term_paper",
//         "assignment",
//         "handout",
//         "proposal",
//       ];
//       if (textBasedTypes.includes(materialType)) {
//         // We can either implement a dedicated DOCX preview generator
//         // or fallback to extracting text and creating a text preview.
//         return await generateTextPreview(fileUrl);
//       }
//       // For other document types, fallback to text preview
//       return await generateTextPreview(fileUrl);
//     }
//     // For source code, presentations, or interactive media, a custom preview can be generated.
//     // Here, as a fallback, we generate a text preview using the title.
//     else {
//       return await generateTextPreview(title);
//     }
//   } catch (error) {
//     console.error("Error generating material preview:", error);
//     return null;
//   }
// };

import sharp from 'sharp';
import ffmpeg from 'fluent-ffmpeg';
import ffmpegStatic from 'ffmpeg-static';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const pdfParse = require('pdf-parse');
import axios from 'axios';
import fs from 'fs-extra';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

// Bind fluent-ffmpeg to the static binary to prevent OS-level crashes
ffmpeg.setFfmpegPath(ffmpegStatic);

// Base directory for storing generated thumbnails
const BASE_UPLOAD_DIR = path.resolve('public/uploads');
const THUMBNAIL_DIR = path.join(BASE_UPLOAD_DIR, 'thumbnails');

// Ensure that the thumbnails directory exists
fs.ensureDirSync(THUMBNAIL_DIR);

const normalizeWebPath = (filepath) =>
  filepath.replace(path.resolve('public'), '').replace(/\\/g, '/');

const fileExists = async (filepath) => {
  try {
    await fs.access(filepath);
    return true;
  } catch {
    return false;
  }
};

/**
 * Generates a text-based thumbnail for unsupported file types.
 * Uses Sharp to render an SVG directly to PNG, bypassing Canvas.
 */
export const generateTextThumbnail = async (title = 'Untitled') => {
  try {
    const width = 800;
    const height = 450;
    await fs.mkdir(THUMBNAIL_DIR, { recursive: true });

    // Truncate long titles
    const maxLength = 60;
    const displayText = title.length > maxLength ? title.slice(0, maxLength) + '...' : title;

    // Escape XML characters to prevent SVG parsing errors
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

    // Build the SVG layout (matches your original canvas design)
    const svgImage = `
      <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
        <rect width="100%" height="100%" fill="#007bff"/>
        <text x="50%" y="50%" font-family="Arial, sans-serif" font-weight="bold" font-size="40px" fill="#333333" text-anchor="middle" dominant-baseline="middle">
          ${escapeXml(displayText)}
        </text>
      </svg>
    `;

    const filename = `thumb_${uuidv4()}.png`;
    const filePath = path.join(THUMBNAIL_DIR, filename);

    // Convert SVG buffer to PNG using Sharp
    await sharp(Buffer.from(svgImage)).png().toFile(filePath);

    return `/uploads/thumbnails/${filename}`;
  } catch (err) {
    console.error('Error generating text thumbnail:', err);
    return null;
  }
};

/**
 * Generates a thumbnail for an image file.
 */
export const generateImageThumbnail = async (fileUrl) => {
  try {
    let imageBuffer;

    if (/^https?:\/\//.test(fileUrl)) {
      const { data } = await axios.get(fileUrl, { responseType: 'arraybuffer' });
      imageBuffer = Buffer.from(data, 'binary');
    } else {
      if (!(await fileExists(fileUrl))) {
        console.error(`Image file not found: ${fileUrl}`);
        return null;
      }
      imageBuffer = await fs.readFile(fileUrl);
    }

    const thumbnailFilename = `thumb_${uuidv4()}.png`;
    const thumbnailPath = path.join(THUMBNAIL_DIR, thumbnailFilename);

    await sharp(imageBuffer).resize({ width: 300 }).toFile(thumbnailPath);

    return normalizeWebPath(thumbnailPath);
  } catch (error) {
    console.error('Error generating image thumbnail:', error);
    return null;
  }
};

/**
 * Generates a thumbnail for a video file securely.
 */
export const generateVideoThumbnail = async (fileUrl) => {
  try {
    let localFilePath = fileUrl;
    let isTemp = false;

    if (/^https?:\/\//.test(fileUrl)) {
      const { data } = await axios.get(fileUrl, { responseType: 'arraybuffer' });
      const tempFilename = `temp_${uuidv4()}${path.extname(fileUrl)}`;
      localFilePath = path.join(BASE_UPLOAD_DIR, tempFilename);
      await fs.writeFile(localFilePath, Buffer.from(data, 'binary'));
      isTemp = true;
    } else if (!(await fileExists(fileUrl))) {
      console.error(`Video file not found: ${fileUrl}`);
      return null;
    }

    const thumbnailFilename = `thumb_${uuidv4()}.png`;

    return new Promise((resolve, reject) => {
      ffmpeg(localFilePath)
        .screenshots({
          timestamps: ['10%'],
          filename: thumbnailFilename,
          folder: THUMBNAIL_DIR,
          size: '300x?',
        })
        .on('end', async () => {
          if (isTemp) await fs.remove(localFilePath);
          resolve(`/uploads/thumbnails/${thumbnailFilename}`);
        })
        .on('error', async (error) => {
          console.error('Error generating video thumbnail:', error.message);
          if (isTemp) await fs.remove(localFilePath);
          reject(null);
        });
    });
  } catch (error) {
    console.error('Error generating video thumbnail:', error);
    return null;
  }
};

/**
 * Generates a thumbnail for a PDF file using pure JS parsing.
 */
export const generatePdfThumbnail = async (pdfUrl) => {
  try {
    let pdfBuffer;

    if (/^https?:\/\//.test(pdfUrl)) {
      const { data } = await axios.get(pdfUrl, { responseType: 'arraybuffer' });
      pdfBuffer = Buffer.from(data, 'binary');
    } else {
      if (!(await fileExists(pdfUrl))) {
        console.error(`PDF file not found: ${pdfUrl}`);
        return '/default-pdf-thumbnail.png';
      }
      pdfBuffer = await fs.readFile(pdfUrl);
    }

    // Extract text strictly from the first page
    const pdfData = await pdfParse(pdfBuffer, { max: 1 });

    // If text exists, use our text generator. Otherwise, fallback to default.
    if (pdfData.text && pdfData.text.trim().length > 0) {
      // Clean up the extracted text and pass it to the text thumbnail generator
      const cleanTitle = pdfData.text.replace(/\s+/g, ' ').trim();
      const generatedPath = await generateTextThumbnail(cleanTitle);
      return generatedPath || '/default-pdf-thumbnail.png';
    }

    return '/default-pdf-thumbnail.png';
  } catch (error) {
    console.error('PDF thumbnail generation failed:', error.message);
    return '/default-pdf-thumbnail.png';
  }
};

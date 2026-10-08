import fs from 'fs/promises';
import path from 'path';
import { PDFDocument } from 'pdf-lib';
import { v4 as uuidv4 } from 'uuid';
import mammoth from 'mammoth';
import { execFile } from 'child_process';
import util from 'util';

const execFilePromise = util.promisify(execFile);

const PREVIEW_OUTPUT_DIR = path.resolve('public/previews');

const ensureOutputDir = async () => {
  try {
    await fs.mkdir(PREVIEW_OUTPUT_DIR, { recursive: true });
  } catch (e) {
    console.error('⚠️ Failed to ensure preview directory:', e.message);
  }
};

/**
 * Core function for generating previews from any supported document type.
 * @param {Buffer} buffer - Original file as Buffer.
 * @param {string} mimeType - File mimeType.
 * @param {string|null} pageRange - Optional vendor-defined page range string.
 * @returns {Promise<Object>} - Metadata including path and page count.
 */
export const generateDocumentPreview = async (
  buffer,
  mimeType,
  pageRange = null,
) => {
  await ensureOutputDir();

  switch (mimeType) {
    case 'application/pdf':
      return await generatePdfPreview(buffer, pageRange);

    case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document': // DOCX
    case 'application/msword': // DOC
      return await generateWordPreview(buffer);

    default:
      throw new Error(
        `Unsupported document type for preview generation: ${mimeType}`,
      );
  }
};

/**
 * Generate a PDF preview, subset of pages.
 */
const generatePdfPreview = async (originalBuffer, pageRange = null) => {
  const originalPdf = await PDFDocument.load(originalBuffer);
  const totalPages = originalPdf.getPageCount();
  const previewPdf = await PDFDocument.create();

  let pagesToExtract = [];

  if (pageRange) {
    pagesToExtract = parsePageRange(pageRange, totalPages);
  } else {
    pagesToExtract = Array.from(
      { length: Math.min(5, totalPages) },
      (_, i) => i,
    );
  }

  const copiedPages = await previewPdf.copyPages(originalPdf, pagesToExtract);
  copiedPages.forEach((page) => previewPdf.addPage(page));

  const previewBuffer = await previewPdf.save();
  const previewFilename = `preview_${uuidv4()}.pdf`;
  const previewPath = path.join(PREVIEW_OUTPUT_DIR, previewFilename);

  await fs.writeFile(previewPath, previewBuffer);

  return {
    type: 'pdf',
    path: `/previews/${previewFilename}`,
    pageCount: copiedPages.length,
  };
};

/**
 * Generates a plain-text or HTML preview from Word DOC / DOCX.
 * For DOC: uses LibreOffice to convert to .txt.
 * For DOCX: uses mammoth for clean extraction.
 */
const generateWordPreview = async (buffer) => {
  const tempInputPath = path.join(PREVIEW_OUTPUT_DIR, `tmp_${uuidv4()}.docx`);
  const previewFilename = `preview_${uuidv4()}.txt`;
  const previewPath = path.join(PREVIEW_OUTPUT_DIR, previewFilename);

  await fs.writeFile(tempInputPath, buffer);

  let extractedText = '';

  try {
    if (tempInputPath.endsWith('.docx')) {
      const result = await mammoth.extractRawText({ path: tempInputPath });
      extractedText = result.value;
    } else {
      // Fallback for `.doc` or other formats using LibreOffice
      const { stdout } = await execFilePromise('soffice', [
        '--headless',
        '--convert-to',
        'txt:Text',
        '--outdir',
        PREVIEW_OUTPUT_DIR,
        tempInputPath,
      ]);
      const outputMatch = stdout.match(/-> (.*\.txt)/);
      if (outputMatch) {
        const convertedPath = outputMatch[1];
        extractedText = await fs.readFile(convertedPath, 'utf8');
      }
    }
    // Truncate to first N characters if too long
    if (extractedText.length > 4000) {
      extractedText =
        extractedText.slice(0, 4000) + '\n...\n[Preview Truncated]';
    }
    await fs.writeFile(previewPath, extractedText);
  } finally {
    await fs.unlink(tempInputPath).catch(() => {}); // Cleanup temp file
  }

  return {
    type: 'text',
    path: `/previews/${previewFilename}`,
    snippetLength: extractedText.length,
  };
};

/**
 * Parses human-friendly page range strings into page indexes.
 * Supports formats like '1-3,5,7-9'.
 */
function parsePageRange(rangeStr, totalPages) {
  const indexes = [];

  rangeStr.split(',').forEach((part) => {
    if (part.includes('-')) {
      const [start, end] = part.split('-').map((n) => parseInt(n, 10));
      for (let i = start; i <= end; i++) {
        if (i > 0 && i <= totalPages) indexes.push(i - 1);
      }
    } else {
      const num = parseInt(part, 10);
      if (num > 0 && num <= totalPages) indexes.push(num - 1);
    }
  });

  return indexes;
}

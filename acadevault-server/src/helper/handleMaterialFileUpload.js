import slugify from 'slugify';
import { v4 as uuidv4 } from 'uuid';
import { saveFileLocally, uploadToCloudinary } from '../utils/fileStorage.js';
import AppError from '../utils/HandleAppErrors.js';
import {
  generateThumbnail,
  handleThumbnailUpload,
} from './thumbnailGenerator.js';
import { extractFileMetadata } from '../utils/extractFileMetadata.js';
import { fileValidationSchema } from '../api/validations/fileValidationSchema.js';
// import { thumbnailQueue } from '../queues/thumbnailQueue.js';

// TODO
// Utilzing fileUtils.js to generate filename and folders.

export const handleMaterialFileUpload = async (
  file,
  materialId,
  thumbnailFile = null,
  useLocal = process.env.NODE_ENV !== 'production',
  uploadType = 'main',
) => {
  if (!file || !file.buffer) throw new AppError('Invalid file provided.', 400);
  if (!['main', 'preview', 'additional'].includes(uploadType)) {
    throw new AppError('Invalid upload type.', 400);
  }

  // Extract metadata
  const {
    fileExtension,
    pageCount,
    duration,
    fileCategory,
    mimeType,
    fileType,
    fileSize,
    fileName,
  } = await extractFileMetadata(file); // Future: hash-based caching

  // Generate a clean, unique filename
  const baseName = slugify(fileName.replace(/\.[^/.]+$/, ''), {
    lower: true,
    strict: true,
  });
  const filename = `${baseName}-${Date.now()}.${fileExtension}`;
  const folder = `uploads/materials/${materialId}/${uploadType}`;
  const fileId = uuidv4();

  let uploadedFile;

  // Upload either locally or to Cloudinary
  if (useLocal) {
    const { url } = await saveFileLocally(file.buffer, folder, filename);
    uploadedFile = { url, fileId };
  } else {
    uploadedFile = await uploadToCloudinary(
      file.buffer,
      folder,
      fileCategory === 'image' ? 'image' : 'auto',
      baseName,
    );
  }

  // Handle thumbnail for 'main' files
  let thumbnailPath = null;
  if (uploadType === 'main') {
    thumbnailPath = thumbnailFile
      ? (await handleThumbnailUpload(thumbnailFile, materialId, useLocal))
          .fileUrl
      : await generateThumbnail(uploadedFile.url, mimeType, fileName); // You can delegate this to a worker
  }
  // Handle thumbnail for 'main' files USING JOB QUEUES
  // let thumbnailPath = null;
  // if (uploadType === 'main') {
  //   if (thumbnailFile) {
  //     thumbnailPath = (
  //       await handleThumbnailUpload(thumbnailFile, materialId, useLocal)
  //     ).fileUrl;
  //   } else {
  //     // Enqueue thumbnail generation job
  //     await thumbnailQueue.add('generate', {
  //       materialId,
  //       fileUrl: uploadedFile.url,
  //       mimeType,
  //       fileName,
  //       storageType: useLocal ? 'local' : 'cloud',
  //     });
  //   }
  // }

  const fileUrlStr =
    typeof uploadedFile.url === 'string'
      ? uploadedFile.url
      : uploadedFile.url?.url || '';

  const fileDetails = {
    fileUrl: fileUrlStr,
    fileId,
    fileType,
    fileName,
    fileSize,
    mimeType,
    storageType: useLocal ? 'local' : 'cloud',
    fileCategory,
    uploadedAt: new Date(),
    duration,
  };

  // Validate file details
  const { error } = fileValidationSchema.validate(fileDetails, {
    abortEarly: false,
  });

  return {
    fileDetails: {
      ...fileDetails,
      validationStatus: error ? 'failed' : 'validated',
      validationErrors: error ? error.details.map((e) => e.message) : [],
      pageCount,
      duration,
    },
    thumbnailPath,
  };
};

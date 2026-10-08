import multer from "multer";
import AppError from "../../utils/HandleAppErrors.js";
import { MIME_TYPES } from "../../constants/mineType.js";

// Multer Storage (Memory for processing before saving)
const multerStorage = multer.memoryStorage();

// File Filter (Validates MIME Type)
const fileFilter = (allowedTypes) => (req, file, cb) => {
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new AppError("Unsupported file type.", 400), false);
  }
};

// File Upload Middleware Factory
export const createUploader = ({
  allowedTypes,
  maxFileSizeMB,
  fieldName,
  fields = null, // Add support for `fields`
  multiple = false,
}) => {
  const limits = { fileSize: maxFileSizeMB * 1024 * 1024 }; // Max size in MB
  const upload = multer({
    storage: multerStorage, // Define your multer storage
    fileFilter: fileFilter(allowedTypes),
    limits,
  });

  // Handle `.single()`, `.array()`, or `.fields()` dynamically
  if (fields) {
    return upload.fields(fields); // Use `.fields` if provided
  }
  return multiple ? upload.array(fieldName) : upload.single(fieldName);
};

// Example Usage
export const uploadSingleImage = createUploader({
  allowedTypes: MIME_TYPES.images,
  maxFileSizeMB: 5,
  fieldName: "profilePicture",
});

export const uploadLogo = createUploader({
  allowedTypes: MIME_TYPES.images,
  maxFileSizeMB: 5,
  fieldName: "logo", // Field name for logo upload
});

export const uploadBanner = createUploader({
  allowedTypes: MIME_TYPES.images,
  maxFileSizeMB: 10,
  fieldName: "banner", // Field name for banner upload
});

export const uploadMultipleImages = createUploader({
  allowedTypes: MIME_TYPES.images,
  maxFileSizeMB: 5,
  fieldName: "images",
  multiple: true,
});

export const uploadMaterials = multer({
  storage: multerStorage,
  fileFilter: fileFilter([
    ...MIME_TYPES.documents,
    ...MIME_TYPES.videos,
    ...MIME_TYPES.images,
  ]), // Allow both images (for thumbnail) and other file types
  limits: { fileSize: 50 * 1024 * 1024 }, // Max file size: 50 MB
}).fields([
  { name: "file", maxCount: 1 }, // Accept a single file for the digital material
  { name: "thumbnail", maxCount: 1 }, // Accept a single thumbnail image
  { name: "previewFiles", maxCount: 10 },
  { name: "additionalFiles", maxCount: 10 },
]);

export const uploadShopVerifyDocument = createUploader({
  // Accept both image and document file types
  allowedTypes: [...MIME_TYPES.images, ...MIME_TYPES.documents],
  maxFileSizeMB: 10, // Adjust file size limit as needed
  fieldName: "document", // Field name for file upload
});

// Define Multer upload middleware for logo and banner
export const uploadShopMedia = createUploader({
  allowedTypes: MIME_TYPES.images, // Ensure this is a list of allowed MIME types
  maxFileSizeMB: 5, // Max file size: 5 MB
  fields: [
    { name: "logo", maxCount: 1 }, // Allow a single logo file
    { name: "banner", maxCount: 1 }, // Allow a single banner file
  ],
});

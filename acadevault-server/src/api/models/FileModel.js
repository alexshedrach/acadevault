import mongoose from "mongoose";
import { FILE_TYPE_EXT } from '../../constants/enums.js';
import { fileUrlValidators } from "../../utils/fileUrlValidator.js";

// Schema setup
const { Schema, model } = mongoose;

const FileSchema = new Schema(
  {
    // Original file name
    fileName: {
      type: String,
      required: true,
    },

    // File size in bytes
    fileSize: {
      type: Number,
      min: [0, 'File size must be a positive number'],
      max: 500 * 1024 * 1024, // Max file size: 500 MB
      required: true,
      message: 'File size must be less than or equal to 500 MB',
      description:
        'The size of the file in megabytes (MB). Helps manage server resources and inform users of file size before download.',
    },

    // File type (e.g., image, document, video, etc.)
    fileType: {
      type: String,
      enum: FILE_TYPE_EXT, // All valid file types extension
      required: true,
      description:
        'The format of the digital file (e.g., PDF, EPUB, video, audio).',
    },

    // MIME type (e.g., image/png, application/pdf, etc.)
    mimeType: {
      type: String,
      required: true,
    },

    // File category (image, document, video, etc.)
    fileCategory: {
      type: String,
      enum: ['image', 'document', 'video', 'audio', 'archive', 'other'],
      required: true,
    },

    duration: {
      type: Number, // seconds
      required: function () {
        return ['video', 'audio'].includes(this.fileCategory);
      },
      description: 'Duration in seconds for audio or video files.',
    },

    // Storage type (local/cloud/external)
    storageType: {
      type: String,
      enum: ['local', 'cloud', 'external'],
      required: true,
    },

    // File URL - used for cloud storage or external links
    fileUrl: {
      type: String,
      required: function () {
        return this.storageType !== 'local'; // URL is required for cloud/external storage
      },
      validate: function () {
        return fileUrlValidators(this.parent().materialType); // Dynamically generate validators
      },
    },
    // File path or Cloudinary public ID
    fileId: {
      type: String,
      required: function () {
        return this.storageType !== 'external'; // ID required for local/cloud storage
      },
    },

    // Metadata for additional properties (e.g., dimensions, duration, etc.)
    metadata: {
      type: Map,
      of: mongoose.Schema.Types.Mixed, // Store flexible key-value pairs
      default: {},
    },
    // New fields for validation
    validationStatus: {
      type: String,
      enum: ['pending', 'validated', 'failed'],
      default: 'pending',
    },
    validationErrors: {
      type: [String],
      default: [],
    },
    isPreview: {
      type: Boolean,
      default: false, // Flag to indicate if the file is a preview
    },
    isAdditional: {
      type: Boolean,
      default: false, // Flag to indicate if the file is a preview
    },

    // Timestamp for when the file was uploaded
    uploadedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true },
);

FileSchema.pre("validate", function (next) {
  if (this.fileCategory === "document" && this.fileSize > 100 * 1024 * 1024) {
    return next(new Error("Document file size must not exceed 100 MB"));
  }
  if (this.fileCategory === "video" && this.fileSize > 500 * 1024 * 1024) {
    return next(new Error("Video file size must not exceed 500 MB"));
  }
  next();
});

FileSchema.virtual('fileSizeMB').get(function () {
  return (this.fileSize / (1024 * 1024)).toFixed(2); // e.g., 12.34 MB
});



const File = model("File", FileSchema);
export default File;

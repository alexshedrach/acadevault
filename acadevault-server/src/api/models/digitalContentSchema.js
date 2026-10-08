import mongoose from 'mongoose';
import { MATERIAL_LICENSES } from '../../constants/enums.js';

// Schema setup
const { Schema } = mongoose;
const { ObjectId } = Schema;

// Digital Content Subschema Definition
export const digitalContentSchema = new Schema({
  file: {
    type: ObjectId,
    ref: 'File', // Reference to the primary file in FileSchema
    // required: true,
    description:
      'The main file for the digital content, which can be a PDF, EPUB, video, etc.',
  },
  additionalFiles: [
    {
      type: ObjectId,
      ref: 'File',
      description:
        'Optional supplementary files related to the academic material.',
    },
  ],
  license: {
    type: String,
    // required: true,
    enum: Object.values(MATERIAL_LICENSES),
    default: 'standard_license', // Default license type
    description: 'The type of license governing the material.',
  },
  licenseDetails: {
    type: String,
    description:
      'Additional information about the license, such as restrictions or allowed uses.',
  },
  expirationDate: {
    type: Date,
    description:
      'For subscription-based licenses, the date when access to the digital content expires.',
  },
  usageRights: {
    canBeShared: { type: Boolean, default: false },
    canBeDownloaded: { type: Boolean, default: false },
    canBePrinted: { type: Boolean, default: false },
    canBeModified: { type: Boolean, default: false },
    canBeRedistributed: { type: Boolean, default: false },
    canBeResold: { type: Boolean, default: false },
    description: {
      type: String,
      description:
        "A general description of the usage rights for the digital content. For example, 'can be shared with a license or for non-commercial use only.'",
    },
  },
  downloadLimit: {
    type: Number,
    default: 1, // 0 means unlimited downloads
    min: [0, 'Download limit must be a non-negative number'],
    description:
      'The number of times the content can be downloaded. 0 means unlimited, and any number specifies a limited number of downloads.',
  },
  digitalRightsManagement: {
    type: Boolean,
    default: false,
    description:
      'Indicates if digital rights management (DRM) protections are applied to the digital content. This would prevent unauthorized sharing or copying of the material.',
  },
  hostedRegion: {
    type: String,
    enum: ['Domestic', 'International'],
    default: 'Domestic',
    description:
      'Specifies where the digital content is hosted, which can impact access speeds or compliance with local regulations.',
  },
  
  // fileFormat: {
  //   type: String,
  //   enum: FILE_TYPE_EXT,
  //   // required: true,
  //   default: null,
  //   description:
  //     "The format of the digital file (e.g., PDF, EPUB, video, audio).",
  // },
  // fileSize: {
  //   type: Number,
  //   // required: true,
  //   default: 0, // Default to 0 if unknown
  //   min: [0, "File size must be a positive number"],
  //   description:
  //     "The size of the file in megabytes (MB). Helps manage server resources and inform users of file size before download.",
  // },
  // duration: {
  //   type: Number,
  //   required: function () {
  //     return ["MP4", "MP3"].includes(this.fileFormat); // Relevant for videos/audio
  //   },
  //   description:
  //     "The duration of the material in seconds. Required for video or audio content.",
  // },

  pageCount: {
    type: Number,
    description:
      'The number of pages in the material. Required for books/documents but not multimedia content.',
  },
  isAvailableForPurchase: {
    type: Boolean,
    default: true,
    description:
      'Indicates whether the digital content is available for purchase or just free to download.',
  },

  previewDuration: {
    type: Number,
    default: 30, // in minutes
    description:
      'For multimedia content, the duration of the preview (e.g., for a video, how long a user can watch before purchasing).',
  },
  isAccessibleOffline: {
    type: Boolean,
    default: false,
    description:
      'Indicates if the digital content can be downloaded and accessed offline (e.g., an ebook reader feature).',
  },
  expirationPolicy: {
    type: String,
    enum: ['never', 'time_limit', 'usage_limit'],
    default: 'never',
    description:
      "Defines the expiration policy for the digital content. Options could include 'never', 'time_limit' (expires after a set time), or 'usage_limit' (expires after a set number of uses).",
  },
  expirationDetails: {
    type: String,
    description:
      'Details on how and when the digital content expires, if applicable. This field gives a more detailed explanation of the expiration policy.',
  },

  downloadCodes: [
    {
      type: ObjectId,
      ref: 'DownloadCode',
      description: 'References to download codes associated with the content.',
    },
  ],
});

///////////////////////// TO DO /////////////////////////////////////////

// Automatically Extract Page Count Upon Upload

digitalContentSchema.virtual('duration').get(function () {
  if (this.file?.metadata?.duration) {
    return this.file.metadata.duration;
  }
  return null;
});

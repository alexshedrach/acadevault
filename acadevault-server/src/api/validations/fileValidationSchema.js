import Joi from 'joi';
import { FILE_TYPE_EXT } from '../../constants/enums.js';

// File Schema Validation
export const fileValidationSchema = Joi.object({
  fileName: Joi.string().max(255).required().messages({
    'string.max': 'File name cannot exceed 255 characters.',
    'any.required': 'File name is required.',
  }),

  fileSize: Joi.number()
    .max(500 * 1024 * 1024)
    .required()
    .messages({
      'number.max': 'File size must be less than or equal to 500 MB.',
      'any.required': 'File size is required.',
    }),

  fileType: Joi.string()
    .valid(...FILE_TYPE_EXT)
    .required()
    .messages({
      'any.only': `File type must be one of ${FILE_TYPE_EXT.join(', ')}.`,
    }),

  mimeType: Joi.string().required().messages({
    'any.required': 'MIME type is required.',
  }),

  fileCategory: Joi.string()
    .valid('image', 'document', 'video', 'audio', 'archive', 'other')
    .required()
    .messages({
      'any.only':
        'File category must be one of image, document, video, audio, archive, or other.',
      'any.required': 'File category is required.',
    }),
  // fileUrl: Joi.string().required().uri(),
  duration: Joi.number().optional().allow(null),
  // duration: Joi.number()
  //   .min(0)
  //   .when('fileType', {
  //     is: Joi.string().valid('MP4', 'MP3'),
  //     then: Joi.required(),
  //     otherwise: Joi.forbidden(),
  //   })
  //   .messages({
  //     'number.base': 'Duration must be a number.',
  //     'number.min': 'Duration must be a positive number.',
  //     'any.required': 'Duration is required for multimedia content.',
  //     'any.unknown': 'Duration is not applicable for this file format.',
  //   }),

  storageType: Joi.string()
    .valid('local', 'cloud', 'external')
    .required()
    .messages({
      'any.only':
        'Storage type must be one of "local", "cloud", or "external".',
    }),

  // fileUrl: Joi.when("storageType", {
  //   is: Joi.valid("cloud", "external"),
  //   then: Joi.string().uri().required().messages({
  //     "string.uri": "File URL must be a valid URI.",
  //     "any.required": "File URL is required for cloud/external storage.",
  //   }),
  //   otherwise: Joi.forbidden(),
  // }),
  
  fileUrl: Joi.string().optional(), // Allow fileUrl

  fileId: Joi.when('storageType', {
    is: Joi.valid('local', 'cloud'),
    then: Joi.string().required().messages({
      'any.required': 'File ID is required for local or cloud storage.',
    }),
    otherwise: Joi.forbidden(),
  }),

  metadata: Joi.object()
    .pattern(
      Joi.string(),
      Joi.alternatives().try(
        Joi.string(),
        Joi.number(),
        Joi.boolean(),
        Joi.object(),
        Joi.array(),
      ),
    )
    .default({}),

  validationStatus: Joi.string()
    .valid('pending', 'validated', 'failed')
    .default('pending'),

  validationErrors: Joi.array().items(Joi.string()).default([]),

  isPreview: Joi.boolean().default(false),

  uploadedAt: Joi.date().default(Date.now),
}).options({ allowUnknown: false });

import Joi from 'joi';
import {
  ACADEMIC_DEGREES,
  ACADEMIC_LEVELS,
  CURRENCIES,
  DIGITAL_MATERIAL_TYPES,
  HYBRID_MATERIAL_TYPES,
  MATERIAL_FORMATS,
  PHYSICAL_MATERIAL_TYPES,
  TYPES_REQUIRING_PUBLICATION,
} from '../../constants/enums.js';
import {
  analyticsValidationSchema,
  digitalContentSchema,
  physicalContentSchema,
  purchaseOptionsSchema,
  reviewProcessSchema,
} from './materialContentValidation.js';
import { sanitizeISBN, validateISBN } from '../../utils/isbnUtils.js';

// Combine valid material types for hybrid delivery format
const ALL_MATERIAL_TYPES = [
  ...Object.values(PHYSICAL_MATERIAL_TYPES),
  ...Object.values(DIGITAL_MATERIAL_TYPES),
  ...Object.values(HYBRID_MATERIAL_TYPES),
];

// Joi Validation Schema
export const academicMaterialValidationSchema = Joi.object({
  title: Joi.string().max(200).required().messages({
    'string.empty': 'Title is required.',
    'string.min': 'Title should have at least 3 characters.',
    'string.max': 'Title must be less than 200 characters.',
  }),
  summary: Joi.string()
    .required()
    .messages({ 'string.empty': 'Summary is required.' }),
  description: Joi.string().max(2000).required().messages({
    'string.empty': 'Description is required.',
    'string.min': 'Description should have at least 10 characters.',
    'string.max': 'Description must be less than 2000 characters.',
  }),
  // price: Joi.number().min(0).required().messages({
  //   'number.base': 'Price must be a number.',
  //   'number.min': 'Price must be a positive number.',
  // }),
  // discount: Joi.number().min(0).max(100).default(0).messages({
  //   'number.min': 'Discount must be at least 0.',
  //   'number.max': 'Discount cannot exceed 100%.',
  // }),
  // discountStartDate: Joi.date().optional(),
  // discountEndDate: Joi.date()
  //   .greater(Joi.ref('discountStartDate'))
  //   .optional()
  //   .messages({
  //     'date.greater': 'Discount end date must be after the start date.',
  //   }),
  shop: Joi.string()
    .pattern(/^[a-f\d]{24}$/i)
    .required()
    .messages({
      'string.empty': 'Shop ID is required.',
      'string.pattern.base': 'Shop ID must be a valid ObjectId.',
    }),
  categories: Joi.array()
    .items(
      Joi.string()
        .pattern(/^[a-f\d]{24}$/i)
        .messages({
          'string.pattern.base': 'Category ID must be a valid ObjectId.',
        }),
    )
    .min(1)
    .required()
    .messages({
      'array.min': 'At least one category is required.',
    }),
  department: Joi.string()
    .regex(/^[0-9a-fA-F]{24}$/)
    .required()
    .messages({
      'string.empty': 'Department is required.',
      'string.pattern.base': 'Invalid department ID.',
    }),

  academicLevel: Joi.string()
    .valid(...Object.values(ACADEMIC_LEVELS))
    .required()
    .messages({
      'any.only': 'Invalid academic level.',
      'string.empty': 'Academic level is required.',
    }),

  academicDegree: Joi.string()
    .valid(...Object.keys(ACADEMIC_DEGREES))
    .required()
    .messages({
      'any.only': 'Invalid academic degree.',
      'string.empty': 'Academic degree is required.',
    }),
  thumbnail: Joi.string()
    .uri()
    // .required()
    .description('Path or URL to the thumbnail image')
    .messages({
      'string.base': 'Thumbnail must be a string.',
      'string.uri': 'Thumbnail must be a valid URL or path.',
      // "any.required": "Thumbnail is required.",
    }),
  purchaseType: Joi.string().valid('direct', 'affiliate').required().messages({
    'string.base': 'Purchase type must be a string.',
    'any.required': 'Purchase type is required.',
    'any.only': "Purchase type must be either 'direct' or 'affiliate'.",
  }),
  publisher: Joi.string().when('materialType', {
    is: Joi.valid(...TYPES_REQUIRING_PUBLICATION),
    then: Joi.required().messages({
      'string.empty': 'Publisher is required for this material type.',
    }),
    otherwise: Joi.optional(),
  }),

  publicationDate: Joi.date().when('materialType', {
    is: Joi.valid(...TYPES_REQUIRING_PUBLICATION),
    then: Joi.required().messages({
      'date.base': 'Publication date must be a valid date.',
      'any.required': 'Publication date is required for this material type.',
    }),
    otherwise: Joi.optional(),
  }),

  isPublished: Joi.boolean().default(true),
  isFeatured: Joi.boolean().default(false),
  isTrending: Joi.boolean().default(false),
  isbn: Joi.string()
    .custom((value, helpers) => {
      if (!value) return value; // Allow null or empty ISBN as valid

      // Sanitize the ISBN (removes hyphens and spaces)
      const sanitizedISBN = sanitizeISBN(value);

      // Validate the cleaned ISBN
      if (!validateISBN(sanitizedISBN)) {
        return helpers.message('ISBN must be a valid 10 or 13-digit number.');
      }

      return sanitizedISBN; // Return the cleaned ISBN
    })
    .messages({
      'string.pattern.base': 'ISBN must be a valid 10 or 13-digit number.',
      'string.base': 'ISBN must be a string.',
    }),

  tags: Joi.array().items(Joi.string().max(30)).max(10).messages({
    'array.max': 'You can specify up to 10 tags.',
    'string.max': 'Each tag must be less than 30 characters.',
  }),
  currency: Joi.string()
    .valid(...CURRENCIES)
    .default('USD')
    .messages({
      'any.only': `Currency must be one of ${CURRENCIES.join(', ')}.`,
    }),
  deliveryFormat: Joi.string()
    .valid(...MATERIAL_FORMATS)
    .required()
    .messages({
      'any.only': `Delivery Format must be one of ${MATERIAL_FORMATS.join(', ')}.`,
    }),

  materialType: Joi.alternatives()
    .try(
      // Validation for physical delivery format
      Joi.string()
        .valid(...Object.values(PHYSICAL_MATERIAL_TYPES))
        .when('deliveryFormat', {
          is: 'physical',
          then: Joi.required(),
        }),

      // Validation for digital delivery format
      Joi.string()
        .valid(...Object.values(DIGITAL_MATERIAL_TYPES))
        .when('deliveryFormat', {
          is: 'digital',
          then: Joi.required(),
        }),

      // Validation for hybrid delivery format
      // Validation for hybrid delivery format
      Joi.array()
        .items(Joi.string().valid(...ALL_MATERIAL_TYPES))
        .when('deliveryFormat', {
          is: 'hybrid',
          then: Joi.required(),
        }),
    )
    .required()
    .messages({
      'alternatives.match':
        'materialType must match the format specified by the deliveryFormat.',
      'string.base':
        'materialType must be a valid string for physical or digital delivery formats.',
      'any.required':
        'materialType is required based on the selected deliveryFormat.',
      'array.base': 'materialType must be an array for hybrid delivery format.',
      'array.includes': 'One or more material types in the array are invalid.',
    }),

  digitalContent: Joi.when('deliveryFormat', {
    is: Joi.valid('digital', 'hybrid'), // Allow digital content for both digital and hybrid formats
    then: digitalContentSchema.required(),
    otherwise: Joi.forbidden(),
  }).messages({
    'object.base': 'Digital content must be a valid object.',
  }),

  physicalContent: Joi.when('deliveryFormat', {
    is: Joi.valid('physical', 'hybrid'), // Allow physical content for both physical and hybrid formats
    then: physicalContentSchema.required(),
    otherwise: Joi.forbidden(),
  }).messages({
    'object.base': 'Physical content must be a valid object.',
  }),

  purchaseOptions: Joi.array()
    .items(purchaseOptionsSchema)
    .default([])
    .messages({
      'array.base':
        'Purchase options must be an array of valid purchase options.',
      'array.includes': 'Invalid purchase option format.',
    }),

  analytics: analyticsValidationSchema.optional().default({}),

  reviewProcess: reviewProcessSchema.optional().default({}),

  rating: Joi.number().min(1).max(5).allow(null).optional().messages({
    'number.min': 'Rating must be at least 1.0.',
    'number.max': 'Rating must be at most 5.0.',
  }),
  numReviews: Joi.number().default(0),
  salesCount: Joi.number().min(0).default(0),
  relatedMaterials: Joi.array().items(
    Joi.string()
      .pattern(/^[a-f\d]{24}$/i)
      .messages({
        'string.pattern.base': 'Related material ID must be a valid ObjectId.',
      }),
  ),
  status: Joi.string()
    .valid('available', 'out_of_stock', 'archived')
    .default('available'),
  isActive: Joi.boolean().default(true),
  createdBy: Joi.string()
    .pattern(/^[a-f\d]{24}$/i)
    .messages({
      'string.pattern.base': 'Created By must be a valid ObjectId.',
    }),
  isDeleted: Joi.boolean().default(false),
  deletedAt: Joi.date().optional(),
}); //.options({ allowUnknown: true }); // Disallow unknown fields

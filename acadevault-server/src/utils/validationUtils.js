import Joi from 'joi';
import {
  MATERIAL_FILE_TYPE_MAP,
  PHYSICAL_MATERIAL_TYPES,
  DIGITAL_MATERIAL_TYPES,
  HYBRID_MATERIAL_TYPES,
  MATERIAL_TYPE_KEY_MAP,
} from '../constants/enums.js';
import AppError from './HandleAppErrors.js';
import { validateURLs } from './validateURLs.js';

// ✅ Dynamically validate fileUrl based on material type and file type
export const validateFileUrl = Joi.string().custom((value, helpers) => {
  const materialType = helpers.state.ancestors[0]?.type;

  // Normalize materialType using the key map
  const normalizedTypeKey = MATERIAL_TYPE_KEY_MAP[materialType] || materialType;

  // Get valid extensions for that normalized key
  const validFileTypes = MATERIAL_FILE_TYPE_MAP[normalizedTypeKey] || [];

  const fileExtension = value.split('.').pop().toLowerCase();

  if (!validFileTypes.includes(fileExtension)) {
    return helpers.error(
      'any.invalid',
      `File extension '${fileExtension}' is not valid for material type '${materialType}'. Allowed extensions are: ${validFileTypes.join(', ')}.`,
    );
  }

  if (/^(ftp|http|https):\/\/[^ "]+$/.test(value)) {
    return helpers.error(
      'any.invalid',
      'File URL must be a file path, not an external URL.',
    );
  }

  return value;
});

// ✅ Validate materialType against correct delivery format
export const validateMaterialType = (deliveryFormat, materialType) => {
  const validMaterialTypes = {
    hybrid: Object.values({
      ...PHYSICAL_MATERIAL_TYPES,
      ...DIGITAL_MATERIAL_TYPES,
      ...HYBRID_MATERIAL_TYPES,
    }),
    physical: Object.values(PHYSICAL_MATERIAL_TYPES),
    digital: Object.values(DIGITAL_MATERIAL_TYPES),
  };

  if (deliveryFormat === 'hybrid') {
    return (
      Array.isArray(materialType) &&
      materialType.length > 0 &&
      materialType.every((type) => validMaterialTypes.hybrid.includes(type))
    );
  }

  if (deliveryFormat === 'physical' || deliveryFormat === 'digital') {
    return (
      typeof materialType === 'string' &&
      validMaterialTypes[deliveryFormat].includes(materialType)
    );
  }

  return false;
};

// ✅ Ensure only one of `public_id` or `url` is provided
export const validateSingleImageField = (image) => {
  if (image.public_id && image.url) {
    throw new AppError(
      'Only one of public_id or url should be provided for the image.',
      400,
    );
  }
};

// ✅ Validate Social Media Links
export const validateSocialMediaLinks = (links) => {
  links.forEach((link) => {
    if (!link.platform || !link.url) {
      throw new AppError(
        'Each social media link must include a platform and a valid URL.',
        400,
      );
    }
    if (!validateURLs(link.url)) {
      throw new AppError(
        `Invalid URL provided for platform: ${link.platform}`,
        400,
      );
    }
  });
};

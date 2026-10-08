import {
  CATEGORY_TYPES,
  DIGITAL_MATERIAL_TYPES,
  HYBRID_MATERIAL_TYPES,
  PHYSICAL_MATERIAL_TYPES,
} from '../../constants/enums.js';
import AppError from '../../utils/HandleAppErrors.js';

/**
 * Get all available material types.
 * @returns {string[]} Array of all material types.
 */
const getAllMaterialTypes = () => [
  ...Object.values(PHYSICAL_MATERIAL_TYPES),
  ...Object.values(DIGITAL_MATERIAL_TYPES),
  ...Object.values(HYBRID_MATERIAL_TYPES),
];

/**
 * Validate and process category data.
 * @param {Object} categoryData - Data for the new category.
 */
export const validateCategoryData = (categoryData) => {
  if (!categoryData || typeof categoryData !== 'object') {
    throw new AppError('Invalid category data provided.', 400);
  }

  const { name, categoryType, materialTypes } = categoryData;

  // Validate 'name'
  if (!name || typeof name !== 'string' || name.trim() === '') {
    throw new AppError(
      'Category name is required and must be a non-empty string.',
      400,
    );
  }

  // Validate 'categoryType'
  if (!categoryType || typeof categoryType !== 'string') {
    throw new AppError('Category type is required and must be a string.', 400);
  }

  if (!Object.values(CATEGORY_TYPES).includes(categoryType)) {
    throw new AppError(
      `Invalid category type: '${categoryType}'. Allowed values are: ${Object.values(CATEGORY_TYPES).join(', ')}.`,
      400,
    );
  }

  // Only enforce 'materialTypes' for 'MATERIAL_TYPE', auto-assign for 'DEPARTMENT'
  if (categoryType === CATEGORY_TYPES.MATERIAL_TYPE) {
    if (!Array.isArray(materialTypes) || materialTypes.length === 0) {
      throw new AppError(
        'At least one material type is required for Material Type categories.',
        400,
      );
    }
  }

  let assignedMaterialTypes = materialTypes || [];

  // Auto-assign all material types if categoryType is DEPARTMENT
  if (categoryType === CATEGORY_TYPES.DEPARTMENT) {
    assignedMaterialTypes = getAllMaterialTypes();
  }

  // Flatten MATERIAL_TYPES into a single array of values
  const ALL_MATERIAL_TYPES = getAllMaterialTypes();

  for (const material of assignedMaterialTypes) {
    if (!ALL_MATERIAL_TYPES.includes(material)) {
      throw new AppError(
        `Invalid material type: '${material}'. Allowed values are: ${ALL_MATERIAL_TYPES.join(', ')}.`,
        400,
      );
    }
  }

  // Return sanitized data
  return {
    name: name.trim(),
    categoryType,
    materialTypes: assignedMaterialTypes, // Automatically assigned for DEPARTMENT
  };
};

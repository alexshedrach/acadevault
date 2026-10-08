import {
  CATEGORY_TYPES,
  DIGITAL_MATERIAL_TYPES,
  HYBRID_MATERIAL_TYPES,
  PHYSICAL_MATERIAL_TYPES,
} from '../constants/enums.js';

/**
 * Get all available material types.
 * @returns {string[]} Array of all material types.
 */
export const getAllMaterialTypes = () => [
  ...Object.values(PHYSICAL_MATERIAL_TYPES),
  ...Object.values(DIGITAL_MATERIAL_TYPES),
  ...Object.values(HYBRID_MATERIAL_TYPES),
];

/**
 * Assign default material types based on category type.
 * @returns {string[]|undefined} Default material types or undefined.
 */
export const assignDefaultMaterialTypes = function () {
  return this.categoryType === CATEGORY_TYPES.DEPARTMENT
    ? getAllMaterialTypes()
    : undefined;
};

/**
 * Validate if the materialTypes field is correctly populated.
 * @param {string[]} val - Material types array.
 * @returns {boolean} Validation result.
 */
export const validateMaterialTypes = function (val) {
  const requiresMaterialTypes = [
    CATEGORY_TYPES.MATERIAL_TYPE,
    CATEGORY_TYPES.DEPARTMENT,
  ].includes(this.categoryType);

  return requiresMaterialTypes ? Array.isArray(val) && val.length > 0 : true;
};

/**
 * Filters the provided object to include only the allowed fields.
 * This function allows for dynamic filtering based on specified field names.
 *
 * @param {Object} obj - The object to be filtered.
 * @param {Array} allowedFields - List of allowed field names.
 * @returns {Object} A new object with only the allowed fields.
 * @throws {Error} If the input is not an object or if `allowedFields` is not an array.
 */
const filterObject = (obj, allowedFields = []) => {
  // Ensure the input is an object
  if (typeof obj !== "object" || obj === null) {
    throw new Error("First argument must be an object");
  }

  // Ensure allowedFields is an array
  if (!Array.isArray(allowedFields)) {
    throw new Error("Second argument must be an array");
  }

  // If no allowed fields are provided, return an empty object or the original object
  if (allowedFields.length === 0) {
    return {}; // or return obj if you want to include all fields
  }

  // Use reduce to create a new object with only allowed fields
  return Object.keys(obj).reduce((newObj, key) => {
    if (allowedFields.includes(key)) {
      newObj[key] = obj[key]; // Include only allowed fields
    }
    return newObj;
  }, {}); // Return the filtered object
};

export default filterObject;

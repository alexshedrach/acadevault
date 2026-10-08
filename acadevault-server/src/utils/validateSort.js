// Validate query parameters before using them in ApiFeatures
// This middleware function checks that the sort fields provided by the user are valid
export const validateSort = (sort) => {
  // Define an array of allowed fields for sorting
  const allowedFields = ["createdAt", "updatedAt", "name", "email", "role"];

  // Split the 'sort' parameter (which is a comma-separated list) into individual field names
  // Use 'map' to remove any '-' signs and trim any whitespace around the field names
  const fields = sort.split(",").map((field) => field.replace("-", "").trim());

  // Filter out any fields that are not included in the allowedFields list
  const invalidFields = fields.filter(
    (field) => !allowedFields.includes(field)
  );

  // If there are any invalid fields, throw an error specifying the invalid fields
  if (invalidFields.length > 0) {
    throw new Error(
      `Invalid field(s) for sorting: ${invalidFields.join(", ")}`
    );
  }
};

import Joi from "joi";
import { academicMaterialValidationSchema } from "./academicMaterialValidation.js";
import AppError from "../../utils/HandleAppErrors.js";

/**
 * Recursively extracts only the validation rules for updated fields.
 */
const extractPartialSchema = (schema, data) => {
  if (!Joi.isSchema(schema) || typeof data !== "object" || data === null) {
    return Joi.object(); // Return an empty schema if data is invalid
  }

  const extractedSchema = {};

  for (const key of Object.keys(data)) {
    const schemaField = schema.$_terms.keys?.find((s) => s.key === key)?.schema;

    if (schemaField) {
      if (schemaField.type === "object" && typeof data[key] === "object") {
        // Recursively extract nested objects
        extractedSchema[key] = extractPartialSchema(schemaField, data[key]);
      } else {
        // Make fields optional for update
        extractedSchema[key] = schemaField.optional();
      }
    }
  }

  return Joi.object(extractedSchema);
};

/**
 * Validates only the updated fields in the request.
 */
export const validateUpdatedFields = (updates) => {
  if (typeof updates !== "object" || updates === null) {
    throw new AppError("Invalid update data provided.", 400);
  }

  // Ensure we only validate fields that are being updated
  const partialSchema = extractPartialSchema(
    academicMaterialValidationSchema,
    updates
  );

  const { error } = partialSchema.validate(updates, { abortEarly: false });

  if (error) {
    throw new AppError(
      `Validation failed: ${error.details.map((d) => d.message).join(", ")}`,
      400
    );
  }

  // ✅ Handle conditional validation for `physicalContent`
  if (updates.physicalContent) {
    const { physicalContent } = updates;

    if (
      physicalContent.availabilityStatus === "pre_order" &&
      !physicalContent.preOrderReleaseDate
    ) {
      throw new AppError(
        "Pre-order release date is required when availability status is 'pre_order'.",
        400
      );
    }

    if (
      "shippingWeight" in physicalContent &&
      (physicalContent.shippingWeight === undefined ||
        physicalContent.shippingWeight <= 0)
    ) {
      throw new AppError(
        "Shipping weight is required and must be a positive number.",
        400
      );
    }

    if ("dimensions" in physicalContent) {
      const { dimensions } = physicalContent;
      if (
        !dimensions ||
        !dimensions.length ||
        !dimensions.width ||
        !dimensions.height
      ) {
        throw new AppError(
          "All dimension fields (length, width, height) are required.",
          400
        );
      }
    }

    if (
      "shippingRegion" in physicalContent &&
      !physicalContent.shippingRegion
    ) {
      throw new AppError("Shipping region is required.", 400);
    }
  }
};

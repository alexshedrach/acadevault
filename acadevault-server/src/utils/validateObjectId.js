import mongoose from "mongoose";
import AppError from "./HandleAppErrors.js";

/**
 * Middleware for validating MongoDB ObjectId.
 * This function checks whether a given ID is a valid MongoDB ObjectId.
 * If the ID is invalid, it throws an error with a detailed message.
 * @param {string} id - The ObjectId to validate. This is typically passed as part of a route parameter.
 * @param {string} resourceName - The name of the resource to include in the error message (default is "Resource").
 * @throws {AppError} - Throws an AppError with a status of 400 if the ObjectId is invalid.
 */
// export const validateObjectId = (id, resourceName = "Resource") => {
//   // Check if the provided ID is a valid MongoDB ObjectId using Mongoose's ObjectId validation method
//   if (!mongoose.Types.ObjectId.isValid(id)) {
//     // If the ID is invalid, throw a custom AppError with a status code of 400 (Bad Request)
//     throw new AppError(`${resourceName} ID is invalid`, 400);
//   }
// };
// 
// Utility: Validate ObjectId
export const validateObjectId = (id, fieldName) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new AppError(`Invalid ${fieldName} provided.`, 400);
  }
};
import { appConfig } from '../constants/appConfig.js';
import { isProduction } from "./envUtils.js";

class AppError extends Error {
  constructor(
    message,
    statusCode,
    isOperational = true,
    category = "General",
    metadata = {}
  ) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    this.isOperational = isOperational; // Operational errors are expected
    this.appName = appConfig.APP_NAME; // Use APP_NAME for consistency in logs
    this.category = category; // Categorize errors (e.g., "Validation", "Auth")
    this.metadata = metadata; // Optional metadata for debugging (e.g., invalid fields)
    Error.captureStackTrace(this, this.constructor);
  }

  // Custom toJSON method
  toJSON() {
    const errorDetails = {
      statusCode: this.statusCode,
      status: this.status,
      message: this.message,
      appName: this.appName,
      isOperational: this.isOperational,
    };

    // Only include stack trace in non-production environments
    if (!isProduction) {
      errorDetails.stack = this.stack;
    }

    return errorDetails;
  }

  // Static methods for common error cases
  static notFound(resource = "Resource") {
    return new AppError(`${resource} not found in ${appConfig.APP_NAME}.`, 404);
  }

  static unauthorized(message = "Unauthorized access.") {
    return new AppError(message, 401);
  }

  static forbidden(message = "Access is forbidden.") {
    return new AppError(message, 403);
  }

  static validationError(details, metadata = {}) {
    return new AppError(
      `Validation error: ${details}`,
      422,
      true,
      "Validation",
      metadata
    );
  }

  static conflict(message = "Conflict occurred.") {
    return new AppError(message, 409);
  }

  static internalServerError(
    message = "Internal server error. Please try again later."
  ) {
    return new AppError(message, 500);
  }
}

export default AppError;

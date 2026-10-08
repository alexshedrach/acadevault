import AppError from "../../utils/HandleAppErrors.js";
import { errorMessages } from "../../constants/errorMessages.js";
import { httpStatus } from "../../constants/httpStatus.js";
import { capitalizeFirstLetter } from "../../utils/commonUtils.js";
import { isProduction } from "../../utils/envUtils.js";
import { logger } from "../../utils/logger.js";

/**
 * Handles Mongoose Cast Errors (e.g., invalid ObjectId type).
 * @param {Object} err - The error object.
 * @returns {AppError} - Returns a custom error message.
 */
const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path}: ${err.value}. Please provide a valid ${err.path}.`;
  return new AppError(message, httpStatus.BAD_REQUEST);
};

/**
 * Handles MongoDB Duplicate Key Errors (e.g., when a unique field is duplicated).
 * @param {Object} err - The error object.
 * @returns {AppError} - Returns a custom error message with the field that caused the duplication.
 */
const handleDuplicateFieldsDB = (err) => {
  const field = Object.keys(err.keyValue)[0];
  const value = err.keyValue[field];
  const message = `Duplicate field value: "${value}" for field "${field}". Please choose another value.`;
  return new AppError(message, httpStatus.BAD_REQUEST);
};

/**
 * Handles Validation Errors, typically from Mongoose or custom validation logic.
 * @param {Object} err - The error object.
 * @returns {AppError} - Returns a custom error message with the validation issue.
 */
const handleValidationErrorDB = (err) => {
  const errors = err.errors ? Object.values(err.errors) : [];
  const message = `Invalid input data: ${errors
    .map((el) => capitalizeFirstLetter(el.message))
    .join(". ")}`;
  return new AppError(message, httpStatus.BAD_REQUEST);
};

/**
 * Handles JSON Web Token (JWT) errors.
 * @returns {AppError} - Returns an error indicating the token is invalid.
 */
const handleJWTError = () =>
  new AppError(errorMessages.INVALID_CREDENTIALS, httpStatus.UNAUTHORIZED);

/**
 * Handles JWT Expired Errors.
 * @returns {AppError} - Returns an error indicating the token has expired.
 */
const handleJWTExpiredError = () =>
  new AppError(
    "Your token has expired! Please log in again.",
    httpStatus.UNAUTHORIZED
  );

const handleNotBeforeError = () =>
  new AppError(
    "Token is not valid yet. Please try again later.",
    httpStatus.UNAUTHORIZED
  );

/**
 * Sends error details in the development environment (includes stack trace for debugging).
 * @param {Object} err - The error object.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
const sendErrorDev = (err, req, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    stack: err.stack,
    path: req.originalUrl,
    method: req.method,
  });
};

/**
 * Sends error details in the production environment (hides stack trace for security).
 * @param {Object} err - The error object.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
const sendErrorProd = (err, req, res) => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
      path: req.originalUrl,
      method: req.method,
    });
  } else {
    logger.error("Unhandled Error 💥", err); // Log the error for debugging
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      status: "error",
      message: errorMessages.SERVER_ERROR,
      path: req.originalUrl,
      method: req.method,
    });
  }
};

/**
 * Global error handling middleware.
 * This middleware intercepts errors in the application and sends appropriate responses based on the environment (dev vs prod).
 * @param {Object} err - The error object.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 */
const globalAppErrorHandler = (err, req, res, next) => {
  // Ensure default error properties
  err.statusCode = err.statusCode || httpStatus.INTERNAL_SERVER_ERROR;
  err.status = err.status || "error";

  // Add fallback for isOperational if undefined
  if (typeof err.isOperational === "undefined") {
    err.isOperational = false;
  }

  // Development vs Production handling
  if (!isProduction) {
    sendErrorDev(err, req, res);
  } else {
    let error = {
      statusCode: err.statusCode,
      status: err.status,
      message: err.message,
      ...err,
    };

    // Handle specific error types
    if (error.name === "CastError") error = handleCastErrorDB(error);
    if (error.code === 11000) error = handleDuplicateFieldsDB(error);
    if (error.name === "ValidationError")
      error = handleValidationErrorDB(error);
    if (error.name === "JsonWebTokenError") error = handleJWTError();
    if (error.name === "TokenExpiredError") error = handleJWTExpiredError();
    if (error.name === "NotBeforeError") error = handleNotBeforeError();

    // Log unexpected errors for debugging
    if (!error.isOperational) {
      logger.error("Unexpected Error 💥", {
        name: err.name,
        message: err.message,
        stack: err.stack,
      });
    }

    sendErrorProd(error, req, res);
  }
  next();
};

export default globalAppErrorHandler;

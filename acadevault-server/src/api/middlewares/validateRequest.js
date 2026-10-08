import { validationResult } from "express-validator";
import AppError from "../../utils/HandleAppErrors.js";

export const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // If validation fails, create a new AppError instance with status 422 (Validation Error)
    const errorDetails = errors.array().map((err) => ({
      field: err.param,
      message: err.msg,
    }));
    return next(AppError.validationError(errorDetails));
  }
  next();
};

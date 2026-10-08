import { appConfig } from '../../constants/enums.js';
import AppError from "../../utils/HandleAppErrors.js";

export const serviceValidator = (req, res, next) => {
  const currentHour = new Date().getHours();
  const isWorkingHours = currentHour >= 9 && currentHour <= 18;

  if (!isWorkingHours) {
    return next(
      AppError.forbidden("Service is available only between 9 AM and 6 PM.")
    );
  }

  // Example: Check if a specific service is enabled
  if (!appConfig.ENABLE_SERVICE) {
    return next(AppError.forbidden("Service is temporarily disabled."));
  }

  next();
};

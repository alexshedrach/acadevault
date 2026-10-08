import rateLimit from "express-rate-limit";
import { apiConfig } from "../../config/apiConfig.js";

const rateLimiter = () => {
  return rateLimit({
    max: apiConfig.rateLimit.maxRequests,
    windowMs: apiConfig.rateLimit.windowMs,
    message: "Too many requests from this IP, please try again after an hour.",
  });
};

export default rateLimiter;

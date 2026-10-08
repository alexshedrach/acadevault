import mongoose from "mongoose";
import { validateURLs } from "../../utils/validateURLs.js";

const mediaFieldSchema = new mongoose.Schema({
  public_id: {
    type: String,
    required: function () {
      return !this.url; // `public_id` is required if `url` is not provided
    },
    validate: {
      validator: function (value) {
        if (!value) return true; // Allow empty if `url` is provided
        return /^[a-zA-Z0-9-_]+$/.test(value); // Basic validation for Cloudinary public_id format
      },
      message: "Invalid Cloudinary public_id format.",
    },
  },
  url: {
    type: String,
    required: function () {
      return !this.public_id; // `url` is required if `public_id` is not provided
    },
    validate: {
      validator: function (value) {
        if (!value) return true; // Allow empty if `public_id` is provided
        return validateURLs(value); // Validate URL format
      },
      message: "Please provide a valid URL.",
    },
  },
  metadata: {
    type: Object, // Store optional metadata (e.g., dimensions, file type, size)
    default: null,
  },
  uploadedAt: {
    type: Date, // Record the upload timestamp
    default: null,
  },
});

export const MediaField = mediaFieldSchema;

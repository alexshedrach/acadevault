import mongoose from "mongoose";
import { CURRENCIES, MATERIAL_STATUSES } from '../../constants/enums.js';

// Schema setup
const { Schema } = mongoose;
const { ObjectId } = Schema;

// Analytics Subschema Definition
export const AnalyticsSchema = new Schema(
  {
    materialId: {
      type: ObjectId,
      ref: "AcademicMaterial",
      // required: true,
      index: true, // Optimized for queries by materialId
      description:
        "Reference to the academic material this analytics data belongs to.",
    },
    viewsCount: {
      type: Number,
      default: 0,
      min: 0,
      description: "Total number of times the material has been viewed.",
    },
    downloadsCount: {
      type: Number,
      default: 0,
      min: 0,
      description: "Total number of times the material has been downloaded.",
    },
    purchases: {
      type: Number,
      default: 0,
      min: 0,
      description: "Total number of purchases for the material.",
    },
    upvotes: {
      type: Number,
      default: 0,
      min: 0,
      description: "Total number of upvotes received for the material.",
    },
    downvotes: {
      type: Number,
      default: 0,
      min: 0,
      description: "Total number of downvotes received for the material.",
    },
    updatedAt: {
      type: Date,
      default: Date.now,
      description: "Timestamp of the last update to the analytics data.",
    },
  },
  {
    timestamps: true, // Automatically manages createdAt and updatedAt
  }
);

// Add compound index for analytics insights and optimized lookups
AnalyticsSchema.index({ materialId: 1, updatedAt: -1 });

// purchaseOptions Subschema Definition
// Extended purchaseOptions Subschema
export const purchaseOptionsSchema = new Schema({
  platform: {
    type: String,
    required: true,
    enum: ["Amazon", "Udemy", "Ebay", "Publisher Site", "Other"],
  },
  purchaseLink: {
    type: String,
    required: true,
    validate: {
      validator: (v) => /^(ftp|http|https):\/\/[^ "]+$/.test(v),
      message:
        "The purchase link must be a valid URL (e.g., https://example.com)",
    },
  },
  price: {
    type: Number,
    required: [true, "An academic material must have a price"],
    min: [0, "Price must be a positive number"],
    validate: {
      validator: (val) => val >= 0,
      message: "Price must be greater than or equal to 0",
    },
  },
  currency: {
    type: String,
    required: true,
    enum: Object.values(CURRENCIES), // Supported currencies
  },
  platformDetails: {
    platformFee: {
      type: Number,
      default: 0,
      min: 0,
      description:
        "Percentage or fixed fee charged by the platform for sales. Helps in financial reporting.",
    },
    affiliateCommission: {
      type: Number,
      default: 0,
      min: 0,
      description:
        "Percentage or fixed amount given to affiliates for sales via this platform.",
    },
    regionAvailability: {
      type: [String],
      default: ["Global"],
      description:
        "List of regions/countries where this platform is available (e.g., ['US', 'UK', 'EU']).",
    },
    deliveryOptions: {
      type: [String],
      enum: ["Digital", "Physical", "Both"],
      default: ["Digital"],
      description: "Delivery modes supported by this platform.",
    },
    estimatedDeliveryTime: {
      type: String,
      description:
        "For physical products, specify the estimated delivery time (e.g., '3-5 business days').",
    },
    integrationStatus: {
      type: String,
      enum: ["Active", "Pending", "Inactive"],
      default: "Active",
      description:
        "Tracks whether the integration with this platform is live, pending setup, or inactive.",
    },
    platformSupportContact: {
      email: {
        type: String,
        // validate: {
        //   validator: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),
        //   message: "Please enter a valid email address",
        // },
        description: "Support email for the platform for troubleshooting.",
      },
      phone: {
        type: String,
        description: "Support phone number for platform-related issues.",
      },
    },
    apiIntegration: {
      apiKey: {
        type: String,
        description: "API key for platform integration (if applicable).",
      },
      apiEndpoint: {
        type: String,
        description: "API endpoint for this platform’s integration.",
      },
      lastSyncDate: {
        type: Date,
        description: "Date when data was last synchronized with the platform.",
      },
    },
  },
  // Metadata for reporting and insights
  analytics: {
    salesCount: { type: Number, default: 0, min: 0 },
    viewsCount: { type: Number, default: 0, min: 0 },
    conversionRate: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
      description:
        "Percentage of users who visited the link and completed a purchase.",
    },
  },
});

// Subschema for Review Process Details
export const reviewProcessSchema = new Schema({
  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending",
  },
  comments: {
    type: String,
    trim: true, // Trim whitespace to ensure clean input
  }, // Optional field for admin or reviewer comments
  reviewDate: {
    type: Date,
    default: Date.now, // Automatically set to the current timestamp
  },
  reviewer: {
    type: ObjectId,
    ref: "User",
    // required: true, // Ensure there is always a reviewer assigned
  },
  approvalStage: {
    type: String,
    enum: ["initial", "final", "resubmission"], // Added 'resubmission' for flexibility
    default: "initial",
  },
  reviewedBySystem: {
    type: Boolean,
    default: false, // Flag to indicate if the review was automated
  },
});

export const correctionSchema = new mongoose.Schema(
  {
    correctionText: {
      // The issue pointed out by the admin
      type: String,
      required: true,
    },
    feedbackDetails: {
      // Optional additional notes for clarity
      type: String,
      default: "",
    },
    correctedAt: {
      // When the seller resolved the issue
      type: Date,
      default: Date.now,
    },
    isResolved: {
      // Tracks whether the seller has addressed the issue
      type: Boolean,
      default: false,
    },
    resolutionNotes: {
      // Notes by the seller on how they addressed the issue
      type: String,
      default: "",
    },
    resolvedAt: {
      // Timestamp of when the admin marked it as resolved
      type: Date,
    },
    resolvedBy: {
      // Admin who confirmed resolution
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export const approvalHistorySchema = new mongoose.Schema(
  {
    status: { type: String, enum: MATERIAL_STATUSES, required: true },
    feedback: { type: String },
    reviewedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    reviewedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

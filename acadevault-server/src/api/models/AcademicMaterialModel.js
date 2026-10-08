import mongoose from "mongoose";
import {
  MATERIAL_FORMATS,
  RANKING_WEIGHTS,
  MATERIAL_STATUSES,
  ACADEMIC_LEVELS,
  ACADEMIC_DEGREES,
  TYPES_REQUIRING_PUBLICATION,
} from "../../constants/enums.js";
import AppError from "../../utils/HandleAppErrors.js";
import { digitalContentSchema } from "./digitalContentSchema.js";
import { physicalContentSchema } from "./physicalContentSchema.js";
import {
  AnalyticsSchema,
  purchaseOptionsSchema,
  reviewProcessSchema,
  correctionSchema,
  approvalHistorySchema,
} from "./embeddedDocument.js";
import {
  formatISBN,
  sanitizeISBN,
  validateISBN,
} from "../../utils/isbnUtils.js";
import { validateMaterialType } from "../../utils/validationUtils.js";
import Category from "./CategoryModel.js";
import { updateMaterialCounts } from "../../utils/updateMaterialCount.js";
import Shop from "./ShopModel.js";
import { resolvePrice } from "../../utils/priceUtils.js";
import { formatCurrency } from "../../utils/currencyUtils.js";
import ApiFeatures from "../../utils/ApiFeatures.js";

// Schema setup
const { Schema, model } = mongoose;
const { ObjectId } = Schema;

// Academic Material Schema Definition
const AcademicMaterialSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "An academic material must have a title"],
      trim: true,
      maxlength: [200, "Title must be less than 200 characters"],
    },
    slug: {
      type: String,
      unique: true,
      required: true,
    },
    summary: {
      type: String,
      required: [true, "Please provide a summary for the material"],
    },
    description: {
      type: String,
      required: [true, "An academic material must have a description"],
      maxlength: [2000, "Description must be less than 2000 characters"],
    },

    pricingStrategy: {
      type: String,
      enum: ["default", "type-based", "vendor-override", "region-specific"],
      default: "default",
      description:
        "Indicates preferred pricing strategy (used by the pricing resolver).",
    },

    allowVendorOverride: {
      type: Boolean,
      default: true,
      description: "If false, vendor-specific price overrides will be ignored.",
    },

    enforceTypePricing: {
      type: Boolean,
      default: false,
      description:
        "If true, price must be derived from material type base pricing.",
    },

    // New optional default base price (used as fallback, not surfaced directly to user)
    basePrice: {
      type: mongoose.Schema.Types.Mixed,
      default: null,
      description:
        "Optional default base price used as a final fallback if pricing model yields no matches. Structured as { amount, currency, region }.",
    },

    discountPrice: {
      type: Object,
      default: null,
      validate: {
        validator: function (val) {
          if (!val) return true;
          return (
            typeof val.amount === "number" && typeof val.currency === "string"
          );
        },
        message: "Invalid discount price object.",
      },
    },

    shop: {
      type: ObjectId,
      ref: "Shop",
      required: [true, "Academic material must belong to a shop"],
    },
    // Category Assignments
    categories: [
      {
        type: ObjectId,
        ref: "Category",
        required: [true, "At least one category is required"],
      },
    ],

    department: {
      type: ObjectId,
      ref: "Category", // Reference to specific department
      required: true,
    },

    academicLevel: {
      type: String,
      enum: Object.values(ACADEMIC_LEVELS), // Use enum from backend mapping
      required: true,
    },
    academicDegree: {
      type: String,
      enum: Object.keys(ACADEMIC_DEGREES), // Store key, use mapping for details
      required: true,
    },

    previewFiles: [
      {
        type: ObjectId,
        ref: "File",
        required: false, // Not mandatory, allows flexibility
        description:
          "A preview file that users can access before purchasing the digital content.",
      },
    ],
    previewSource: {
      type: String,
      enum: ["auto-generated", "manual"],
      default: "manual",
    },
    previewPageRange: {
      type: String, // e.g., '1-5' or '1,3,5-7'
      default: null,
    },
    thumbnail: {
      type: String,
      description: "Path or URL to the thumbnail image",
    },
    isbn: {
      type: String,
      unique: false, // Individual ISBN may not need to be unique
      validate: {
        validator: function (v) {
          return validateISBN(v);
        },
        message: "ISBN must be a valid 10 or 13-digit number after formatting.",
      },
      set: function (v) {
        return sanitizeISBN(v);
      },
      get: function (v) {
        return formatISBN(v) ?? v;
      },
      description:
        "The International Standard Book Number (ISBN) of the material, which is a unique identifier for books. The ISBN can be either 10 or 13 digits long, and is formatted with hyphens (e.g., 978-3-16-148410-0).",
    },
    tags: {
      type: [String],
      validate: {
        validator: (val) => val.length <= 10,
        message: "You can specify up to 10 tags",
      },
    },

    deliveryFormat: {
      type: String,
      enum: MATERIAL_FORMATS,
      required: true,
      description:
        "The broad category of the material (physical, digital, or hybrid).",
    },

    materialType: {
      type: Schema.Types.Mixed,
      required: true,
      validate: {
        validator: function (value) {
          return validateMaterialType(this.deliveryFormat, value);
        },
        message:
          "materialType must be an array of valid types for hybrid delivery, or a string for physical or digital delivery.",
      },
      description:
        "The specific type of the material (e.g., book, ebook, dataset).",
    },
    // Embedding Digital Content Schema
    digitalContent: {
      type: digitalContentSchema,
      required: function () {
        return this.deliveryFormat === "digital";
      },
      validate: {
        validator: function () {
          return this.materialType; // Ensure materialType is accessible
        },
        message: "Digital content must align with material type.",
      },
    },
    physicalContent: {
      type: physicalContentSchema,
      required: function () {
        return this.format === "physical";
      },
    },
    purchaseType: {
      type: String,
      required: true,
      enum: ["direct", "affiliate"],
      description: "The type of purchase (either direct or affiliate).",
    },
    // Embedded purchaseOptions schema
    // Only include purchase options if it's an affiliate product
    purchaseOptions: {
      type: [purchaseOptionsSchema],
      required: function () {
        return this.purchaseType === "affiliate"; // Only required if affiliate
      },
      validate: function (value) {
        // Ensure purchaseOptions are provided if purchaseType is affiliate
        if (this.purchaseType === "affiliate" && value.length === 0) {
          return false; // If affiliate is selected, options must be provided
        }
        return true;
      },
      message:
        "Affiliate purchase options must be provided when purchaseType is 'affiliate'.",
    },
    // Embedded analytics schema
    analytics: AnalyticsSchema,
    // Embedded review process information
    reviewProcess: { type: reviewProcessSchema, default: {} },
    // Approval history for status transitions
    approvalHistory: [approvalHistorySchema],
    // Corrections list to track admin feedback and seller responses
    corrections: [correctionSchema],
    // Optional, for admin feedback
    feedback: {
      type: String,
      required: function () {
        return this.status === "rejected" || this.status === "approved";
      },
      default: "",
    },
    // Count of how many times the material has been resubmitted
    resubmissionCount: {
      type: Number,
      default: 0,
    },
    pendingChanges: {
      type: Object,
      default: null, // Contains the fields the user wants to update
    },

    rating: {
      type: Number,
      default: null,
      min: [1, "Rating must be at least 1.0"],
      max: [5, "Rating must be at most 5.0"],
      set: (val) => Math.round(val * 10) / 10, // Round to 1 Decimal
    },
    numReviews: { type: Number, default: 0 },
    salesCount: { type: Number, default: 0, min: 0 },

    relatedMaterials: [
      {
        type: ObjectId,
        ref: "AcademicMaterial",
        description:
          "Manually or automatically associated related academic materials.",
      },
    ],

    status: {
      type: String,
      enum: MATERIAL_STATUSES,
      default: "draft",
    },
    updateStatus: {
      type: String,
      enum: ["awaiting-approval", "approved", "rejected", null],
      default: null, // Tracks whether an update is pending
    },
    publisher: {
      type: String,
      default: "",
    },
    publicationDate: {
      type: Date,
      required: function () {
        return TYPES_REQUIRING_PUBLICATION.includes(
          this.materialType?.toLowerCase?.()
        );
      },
    },
    promotionExpiresAt: {
      type: Date,
    },
    isPublished: {
      type: Boolean,
      default: false,
    },
    isPromoted: {
      type: Boolean,
      default: false,
    },
    premium: {
      type: Boolean,
      default: false, // Default to non-premium
    },
    isFeatured: { type: Boolean, default: false },
    isTrending: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
    isDigital: {
      type: Boolean,
      required: true,
      default: true, // to change later to false
    },
    approvedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    rejectedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    approvedAt: { type: Date },
    submittedAt: { type: Date },
    rejectedAt: { type: Date },
    reviewedBySystem: { type: Boolean, default: false },
    createdBy: { type: ObjectId, ref: "User", required: true },
    isDeleted: { type: Boolean, default: false },
    deletedAt: Date,
    // watermark: { type: Boolean, default: true }, // Apply watermark if true
    encryptionEnabled: { type: Boolean, default: false }, // For DRM protection
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Indexes for optimized queries
AcademicMaterialSchema.index({ relatedMaterials: 1 });
AcademicMaterialSchema.index({ createdBy: 1 });
AcademicMaterialSchema.index({ categories: 1, status: 1 });
AcademicMaterialSchema.index({
  isPublished: 1,
  publisher: 1,
});
AcademicMaterialSchema.index({ isDeleted: 1, deletedAt: 1 });
AcademicMaterialSchema.index(
  {
    title: "text",
    summary: "text",
    description: "text",
    tags: "text",
  },
  {
    weights: {
      title: 10,
      summary: 5,
      description: 2,
      tags: 1,
    },
    name: "MaterialTextIndex",
  }
);

/// =================== /// Virtuals  /// =======================///

// --- Virtual field for active prices (populates from Price model) ---
AcademicMaterialSchema.virtual("prices", {
  ref: "Price",
  localField: "_id",
  foreignField: "material",
  justOne: false,
  match: { isActive: true },
});

// Populate reviews as a virtual field on the AcademicMaterial schema
AcademicMaterialSchema.virtual("reviews", {
  // Reference to the "Review" model, which contains the reviews for materials
  ref: "Review",

  // The local field in the AcademicMaterial schema to match with the foreign field in the Review schema
  localField: "_id", // The _id of the academic material (this is the material being reviewed)

  // The foreign field in the Review schema that references the academic material
  foreignField: "material", // The "material" field in the Review schema, which stores the reference to the academic material

  // Optionally, you can add just the fields you need, like:
  // match: { status: "approved" }, // to only return approved reviews
  // select: "rating comment", // to only include certain fields (e.g., rating and comment)
});

AcademicMaterialSchema.virtual("formattedDimensions").get(function () {
  if (this.deliveryFormat !== "physical") return null;
  const dimensions = this.physicalContent?.dimensions;
  return dimensions
    ? `${dimensions.length}cm x ${dimensions.width}cm x ${dimensions.height}cm`
    : "N/A";
});

// virtual field that returns the discipline based on the populated department
AcademicMaterialSchema.virtual("academicDiscipline").get(function () {
  // Ensure the department is populated
  if (this.department && this.department.parentCategory) {
    return this.department.parentCategory;
  }
  return null;
});

// Virtual field to calculate the net votes (upvotes - downvotes)
AcademicMaterialSchema.virtual("netVotes").get(function () {
  // If analytics data is not available, return 0
  if (!this.analytics) return 0;
  // Return the difference between upvotes and downvotes
  return (this.analytics.upvotes || 0) - (this.analytics.downvotes || 0);
});

// Virtual field to derive the stock status of physical content
AcademicMaterialSchema.virtual("stockStatus").get(function () {
  // Only applicable for physical format
  if (this.deliveryFormat === "physical") {
    // If stock quantity is greater than 0, return 'In Stock'
    if (this.physicalContent?.stockQty > 0) {
      return "In Stock";
    }
    // If stock quantity is 0, return 'Out of Stock'
    if (this.physicalContent?.stockQty === 0) {
      return "Out of Stock";
    }
  }
  // Return null if it's not physical content
  return null;
});

/// ========================= /// Middleware /// =================== ///

//  * Update material counts across all related category fields (categories[], department, and their parentCategories).

AcademicMaterialSchema.post("save", async function () {
  if (this.isNew && this.status === "published") {
    await updateMaterialCounts(this, +1);
  }
});

AcademicMaterialSchema.post("remove", async function () {
  if (this.status === "published") {
    await updateMaterialCounts(this, -1);
  }
});

AcademicMaterialSchema.pre("findOneAndDelete", async function (next) {
  this._docToDelete = await this.model.findOne(this.getFilter());
  next();
});

AcademicMaterialSchema.post("findOneAndDelete", async function () {
  if (this._docToDelete?.status === "published") {
    await updateMaterialCounts(this._docToDelete, -1);
  }
});

// Middleware to automatically assigns a publisher value to an academic material if it's missing.
AcademicMaterialSchema.pre("save", async function (next) {
  // Check if the 'publisher' field is not already set
  if (!this.publisher) {
    // Convert the materialType to lowercase string (if it exists and is a string)
    const materialTypeKey =
      typeof this.materialType === "string"
        ? this.materialType.toLowerCase()
        : null;

    // If the material type is not in the list of types that require a formal publisher
    if (!TYPES_REQUIRING_PUBLICATION.includes(materialTypeKey)) {
      // Dynamically get the User model
      const User = mongoose.model("User");
      // Fetch the user who created the material, selecting only name and email
      const user = await User.findById(this.createdBy).select("name email");

      // If the user exists, assign their name (or email as fallback) as the publisher
      if (user) {
        this.publisher = user.name || user.email;
      }
    }
  }

  // Continue to the next middleware or save operation
  next();
});

// Pre-validation middleware to Auto-Set States
AcademicMaterialSchema.pre("save", function (next) {
  // Check if the status is "approved" but isPublished is not yet true
  if (this.status === "approved" && !this.isPublished) {
    // Ensure required fields are set before publishing
    if (!this.publisher || !this.publicationDate) {
      return next(
        new Error("Publisher and publication date are required for publishing.")
      );
    }

    // Set the material as published
    this.isPublished = true;
  }

  // Proceed to the next middleware or save operation
  next();
});

// Pre-validation middleware Validate Format of the Material
AcademicMaterialSchema.pre("validate", function (next) {
  // Import ValidationError from Mongoose
  const { ValidationError } = mongoose.Error;

  // Create a new instance of ValidationError to collect multiple field-specific errors
  const error = new ValidationError(this);

  // Check if the format is "digital" and the digitalContent field is not provided
  if (this.deliveryFormat === "digital" && !this.digitalContent) {
    // Add a specific error for the 'digitalContent' field
    error.addError(
      "digitalContent",
      new mongoose.Error.ValidatorError({
        message:
          "Digital content is required when the format is set to 'digital'.",
        path: "digitalContent",
      })
    );
  }

  // Check if the format is "physical" and the physicalContent field is not provided
  if (this.deliveryFormat === "physical" && !this.physicalContent) {
    // Add a specific error for the 'physicalContent' field
    error.addError(
      "physicalContent",
      new mongoose.Error.ValidatorError({
        message:
          "Physical content is required when the format is set to 'physical'.",
        path: "physicalContent",
      })
    );
  }

  // If there are any errors, pass them to the next middleware
  if (Object.keys(error.errors).length > 0) {
    return next(error);
  }

  // Proceed to the next middleware or save operation if no errors
  next();
});

// Middleware for stock validation (Physical materials only)
AcademicMaterialSchema.pre("save", function (next) {
  // Proceed only if the material format is physical
  if (this.deliveryFormat === "physical") {
    if (!this.physicalContent || this.physicalContent.stockQty === undefined) {
      return next(
        new AppError("Stock quantity is required for physical materials.", 400)
      );
    }

    // Stock quantity cannot be negative
    if (this.physicalContent.stockQty < 0) {
      return next(
        new AppError(
          "Stock quantity cannot be negative for physical materials.",
          400
        )
      );
    }

    // Automatically set availability based on stockQty
    this.physicalContent.availability = this.physicalContent.stockQty > 0;
    this.physicalContent.availabilityStatus =
      this.physicalContent.stockQty > 0 ? "available" : "out_of_stock";
  }

  next();
});

// Middleware to handle digital content initialization
AcademicMaterialSchema.pre("save", function (next) {
  if (this.deliveryFormat === "digital" || this.deliveryFormat === "hybrid") {
    // Ensure digitalContent exists
    this.digitalContent = this.digitalContent || {};

    // Explicitly initialize the `file` field if not provided
    if (this.digitalContent.file === undefined) {
      this.digitalContent.file = null; // Set to null to explicitly include in the document
    }
  } else {
    // Remove digitalContent if not applicable
    this.digitalContent = undefined;
  }

  next();
});

// Validator for digital content
AcademicMaterialSchema.path("digitalContent").validate(function (value) {
  if (this.deliveryFormat === "digital" && !value) {
    throw new AppError(
      "Digital content details are required for digital materials.",
      400
    );
  }
  return true;
}, "Digital content validation failed.");

// Ensures all tags are stored in lowercase for consistency and efficient querying
AcademicMaterialSchema.pre("save", function (next) {
  if (this.tags && Array.isArray(this.tags)) {
    // Normalize: Convert to lowercase, trim spaces, and remove duplicates
    const normalizedTags = this.tags.map((tag) => tag.trim().toLowerCase());
    this.tags = [...new Set(normalizedTags)];
  }
  next();
});

// validations to ensure discountStartDate is before discountEndDate
AcademicMaterialSchema.pre("save", function (next) {
  if (
    this.discountStartDate &&
    this.discountEndDate &&
    this.discountStartDate >= this.discountEndDate
  ) {
    throw new Error("Discount start date must be before the end date.");
  }
  next();
});

// Post-Save Hook: Update Related Materials' Popularity
// Updates the isTrending flag for related materials based on the number of views or sales.
AcademicMaterialSchema.post("save", async function (doc) {
  if (doc.relatedMaterials?.length) {
    try {
      const threshold = process.env.TRENDING_THRESHOLD || 100; // Use a configurable threshold
      const relatedMaterials = await model("AcademicMaterial").find({
        _id: { $in: doc.relatedMaterials },
      });

      // Filter only materials where `isTrending` needs to be updated
      const updates = relatedMaterials
        .filter(
          (material) => material.isTrending !== doc.viewsCount > threshold
        )
        .map((material) => material._id);

      if (updates.length) {
        await model("AcademicMaterial").updateMany(
          { _id: { $in: updates } },
          { $set: { isTrending: doc.viewsCount > threshold } }
        );
      }
    } catch (err) {
      console.error("Error updating related materials' trending status:", err);
    }
  }
});

// Middleware to update total materials in the shop
AcademicMaterialSchema.pre("save", async function (next) {
  const Shop = model("Shop");

  try {
    if (this.isNew) {
      // Increment total materials when a new material is added
      await Shop.findByIdAndUpdate(
        this.shop,
        { $inc: { totalMaterials: 1 } },
        { new: true }
      );
    } else if (this.isModified("isDeleted")) {
      // Adjust total materials when isDeleted is modified
      const incrementValue = this.isDeleted ? -1 : 1;
      await Shop.findByIdAndUpdate(
        this.shop,
        { $inc: { totalMaterials: incrementValue } },
        { new: true }
      );
    }
    next();
  } catch (err) {
    next(err); // Pass any errors to the next middleware or error handler
  }
});

// Cleans up references in related collections (e.g., reviews or stats) when a material is deleted.
// Logical deletion support (optional)
AcademicMaterialSchema.pre("save", async function (next) {
  if (this.isModified("isDeleted") && this.isDeleted) {
    try {
      // Clean up reviews or update the shop count
      await model("Review").deleteMany({ materialId: this._id });

      await model("Shop").findByIdAndUpdate(
        this.shop,
        { $inc: { totalMaterials: -1 } },
        { new: true }
      );
    } catch (err) {
      return next(err); // Pass errors to the next middleware or error handler
    }
  }
  next();
});

// Middleware to set license details
// Middleware to set license details
AcademicMaterialSchema.pre("save", function (next) {
  // Check if the material is digital content
  if (this.deliveryFormat === "digital") {
    // If licensing or usageRights is modified or newly added
    if (
      this.isModified("digitalContent.license") &&
      !this.digitalContent.usageRights
    ) {
      // Mapping of license types to default usage rights
      const licenseDetailsMapping = {
        open_access: {
          description: "Open access material. Free to use and share.",
          rights: {
            canBeShared: true,
            canBeDownloaded: true,
            canBePrinted: true,
            canBeModified: true,
            canBeRedistributed: true,
            canBeResold: false,
          },
        },
        restricted_access: {
          description: "Restricted access. Terms and conditions apply.",
          rights: {
            canBeShared: false,
            canBeDownloaded: false,
            canBePrinted: false,
            canBeModified: false,
            canBeRedistributed: false,
            canBeResold: false,
          },
        },
        commercial_license: {
          description: "Commercial license. Redistribution prohibited.",
          rights: {
            canBeShared: false,
            canBeDownloaded: true,
            canBePrinted: false,
            canBeModified: false,
            canBeRedistributed: false,
            canBeResold: false,
          },
        },
        creative_commons: {
          description: "Creative Commons license with attribution.",
          rights: {
            canBeShared: true,
            canBeDownloaded: true,
            canBePrinted: true,
            canBeModified: true,
            canBeRedistributed: true,
            canBeResold: false,
          },
        },
        private_use: {
          description: "Private use only. Redistribution not allowed.",
          rights: {
            canBeShared: false,
            canBeDownloaded: true,
            canBePrinted: true,
            canBeModified: false,
            canBeRedistributed: false,
            canBeResold: false,
          },
        },
      };

      const selectedLicense = this.digitalContent.license;
      const licenseDetails = licenseDetailsMapping[selectedLicense];

      if (!licenseDetails) {
        return next(new Error(`Invalid license type: ${selectedLicense}`));
      }

      // Set default usage rights and license description if not provided
      this.digitalContent.usageRights = licenseDetails.rights;
      this.digitalContent.licenseDetails = licenseDetails.description;
    }
  } else {
    // If it's physical content, no need to handle license/usageRights for it
    if (this.digitalContent) {
      this.digitalContent.usageRights = undefined; // Ensure no usageRights are set for physical content
      this.digitalContent.licenseDetails = undefined; // Ensure no license details are set for physical content
    }
  }

  next();
});

// Middleware to calculate shipping cost and handling fee
AcademicMaterialSchema.pre("save", function (next) {
  // Only apply to physical content
  if (this.deliveryFormat === "physical") {
    // Check if weight and dimensions are available
    if (
      this.physicalContent &&
      this.physicalContent.shippingWeight &&
      this.physicalContent.dimensions
    ) {
      const { length, width, height } = this.physicalContent.dimensions;
      const weight = this.physicalContent.shippingWeight;

      // Example calculation based on weight and dimensions (you can adjust this formula based on real-world logic)
      const volume = length * width * height; // Volume in cubic cm
      const volumetricWeight = volume / 5000; // Volumetric weight (using a divisor to calculate based on volume)
      const shippingWeight = Math.max(weight, volumetricWeight); // Use the greater of actual weight or volumetric weight

      // Assuming flat rate shipping cost (adjust calculation logic as necessary)
      this.physicalContent.shippingCost = shippingWeight * 0.5; // $0.5 per kg (example rate)
    }

    // Calculate handling fee (could be a flat rate or based on size/weight)
    this.physicalContent.handlingFee = this.physicalContent.shippingWeight * 2; // $2 per kg (example rate)
  }

  next();
});

// Middleware to adjust fees based on region
AcademicMaterialSchema.pre("save", function (next) {
  if (this.deliveryFormat === "physical") {
    const regionMultiplier =
      this.physicalContent.shippingRegion === "International" ? 1.5 : 1;

    // Adjust shipping cost and handling fee based on region
    if (this.physicalContent.shippingCost) {
      this.physicalContent.shippingCost *= regionMultiplier;
    }

    if (this.physicalContent.handlingFee) {
      this.physicalContent.handlingFee *= regionMultiplier;
    }
  }

  next();
});

// Ensure New Materials Have Analytics
AcademicMaterialSchema.pre("save", function (next) {
  if (!this.analytics) {
    this.analytics = {
      viewsCount: 0,
      downloadsCount: 0,
      purchases: 0,
      upvotes: 0,
      downvotes: 0,
    };
  }
  next();
});

// Soft Delete Handling
// Automatically excludes materials marked as deleted (isDeleted: true) from query results.
// This ensures that deleted materials do not show up in searches unless explicitly requested.
AcademicMaterialSchema.pre(/^find/, function (next) {
  if (!this.getFilter().includeDeleted) {
    // Exclude materials marked as deleted by default
    this.where({ isDeleted: false });
  }
  next();
});

// Enforce Published Materials Filter
// Automatically filters out unpublished materials unless explicitly requested.
// Only materials with the "isPublished" flag set to true are included by default.
AcademicMaterialSchema.pre(/^find/, function (next) {
  const filter = this.getFilter();

  // If `includeUnpublished` is explicitly set to true, skip the `isPublished` filter
  if (!filter.includeUnpublished) {
    this.where({ isPublished: true });
  } else {
    // Remove `includeUnpublished` from the query to avoid issues with unknown fields
    delete filter.includeUnpublished;
  }

  next();
});

// Automatically populate related fields like categories and shop for all queries.
// This ensures that related data (e.g., category and shop details) is always included in the result set.
// This helps reduce the need for manual population in each query.
// AcademicMaterialSchema.pre(/^find/, function (next) {
//   this.populate("categories") // Populate category information
//     .populate("shop"); // Populate shop information
//   next();
// });

// Restrict query results based on the user's role (e.g., Admin, Seller, or Buyer).
// Different roles have different access levels:
// - Admins can view all materials
// - Sellers can only view materials they created
// - Buyers can only view published materials
AcademicMaterialSchema.pre(/^find/, function (next) {
  const userRole = this.getOptions()?.userRole; // Get user role from query options
  const userId = this.getOptions()?.userId; // Get user ID from query options

  // Restrict Seller access to their own materials
  if (userRole === "Seller") {
    this.where({ createdBy: userId }); // Only materials created by the seller are visible
  } else if (userRole === "User") {
    // Restrict Buyer access to published materials
    this.where({ isPublished: true });
  }
  // Admins are not restricted by role-based queries, they can access everything
  next();
});

// ✅ Handling Material Deletions
AcademicMaterialSchema.post("remove", async function () {
  try {
    // Update the material count for all categories this material was in
    await Category.updateMany(
      { _id: { $in: this.categories } },
      { $inc: { materialCount: -1 } } // Decrease count
    );
  } catch (error) {
    console.error("Error updating category material count:", error);
  }
});

/// ========================= Static Methods =========================== ///

/**
 * Adds a static method to bulk update multiple documents based on a filter.
 * Useful for administrative updates like modifying statuses, categories, etc.
 * @param {Object} filter - The filter object to find the documents.
 * @param {Object} updates - The updates to apply to the matching documents.
 * @returns {Promise} - Returns the result of the update operation.
 */
AcademicMaterialSchema.statics.bulkUpdate = async function (filter, updates) {
  return this.updateMany(filter, updates);
};

/**
 * Increments the sales count and handles stock management for physical materials
 * and downloads for digital materials. Throws errors if the material doesn't exist
 * or if stock is insufficient for physical materials.
 *
 * @param {String} materialId - The ID of the academic material.
 * @param {Number} quantity - The quantity to increment sales/downloads.
 * @throws {AppError} - Throws an error if material is not found or if stock is insufficient.
 * @returns {Promise<Object>} - Returns the updated material document.
 */
AcademicMaterialSchema.statics.incrementSales = async function (
  materialId,
  quantity
) {
  // Find the material by ID
  const material = await this.findById(materialId);

  // Check if the material exists
  if (!material) {
    throw new AppError("Material not found", 404);
  }

  // Handle sales increment for free materials or check physical stock availability
  if (
    material.isFree || // Free content doesn't require stock checks
    (material.physicalContent && material.physicalContent.stockQty >= quantity) // Physical materials with sufficient stock
  ) {
    // Reduce stock for physical materials if applicable
    if (material.physicalContent) {
      material.physicalContent.stockQty -= quantity;
    }

    // Increment sales count
    material.salesCount += quantity;

    // Update download count for digital content
    if (material.format === "digital") {
      material.downloads += quantity;
    }

    // Save the updated material
    await material.save();
  } else {
    // Throw error if stock is insufficient for physical materials
    throw new AppError("Insufficient stock", 400);
  }

  return material; // Return the updated material
};

// Static method to check and update the trending status
AcademicMaterialSchema.statics.updateTrendingStatus = async function () {
  const viewsThreshold = 1000; // Minimum views for trending status
  const ratingThreshold = 4.5; // Minimum rating for trending status

  try {
    // Bulk update for materials meeting trending criteria
    await this.updateMany(
      {
        "analytics.viewsCount": { $gte: viewsThreshold },
        rating: { $gte: ratingThreshold },
        isTrending: { $ne: true },
        status: "available",
        isActive: true,
      },
      { $set: { isTrending: true } }
    );

    // Bulk update for materials no longer meeting trending criteria
    await this.updateMany(
      {
        $or: [
          { "analytics.viewsCount": { $lt: viewsThreshold } },
          { rating: { $lt: ratingThreshold } },
        ],
        isTrending: { $ne: false },
      },
      { $set: { isTrending: false } }
    );

    console.log("Trending status updated successfully.");
  } catch (error) {
    console.error("Error updating trending status:", error);
    throw new Error("Failed to update trending status.");
  }
};

// Method to update and calculate average rating based on reviews
AcademicMaterialSchema.methods.calculateAverageRating = async function () {
  const stats = await model("Review").aggregate([
    { $match: { material: this._id } },
    {
      $group: {
        _id: "$material", // Group by material ID
        avgRating: { $avg: "$rating" }, // Calculate average rating
        numReviews: { $sum: 1 }, // Count the number of reviews
      },
    },
  ]);

  if (stats.length > 0) {
    this.rating = stats[0].avgRating;
    this.numReviews = stats[0].numReviews;
    await this.save(); // Save updated rating and review count to the database
  } else {
    this.rating = 0; // Reset rating if no reviews
    this.numReviews = 0;
    await this.save();
  }
};

// Method to check if material is trending based on views, downloads, and ratings
AcademicMaterialSchema.methods.checkTrending = async function () {
  const minimumViews = 100; // Example threshold
  const minimumDownloads = 50; // Example threshold
  const minimumAverageRating = 4.5; // Example threshold

  const views = this.analytics.viewsCount || 0;
  const downloads = this.analytics.downloadsCount || 0;
  const averageRating = this.rating || 0;

  this.isTrending =
    views >= minimumViews &&
    downloads >= minimumDownloads &&
    averageRating >= minimumAverageRating;

  await this.save();
};

// Method to increment view count and update rank
AcademicMaterialSchema.statics.incrementViews = async function (materialId) {
  const material = await this.findById(materialId);
  if (!material) throw new AppError("Material not found", 404);

  material.analytics.viewsCount += 1;
  await material.save();

  // Recalculate and update rank
  const rankingScore = this.calculateRankingScore(material);
  material.rank = rankingScore;
  await material.save();

  return material.analytics.viewsCount;
};

// Static method to calculate material ranking score
AcademicMaterialSchema.statics.calculateRankingScore = function (material) {
  const { analytics, rating, numReviews } = material;

  // Calculate individual component scores
  const viewsScore = analytics.viewsCount * RANKING_WEIGHTS.views;
  const downloadsScore = analytics.downloadsCount * RANKING_WEIGHTS.downloads;
  const ratingScore = (rating / 5) * 100 * RANKING_WEIGHTS.rating; // Normalize rating to percentage (0-100)
  const reviewsScore = numReviews * RANKING_WEIGHTS.reviews;

  // Calculate total score
  return viewsScore + downloadsScore + ratingScore + reviewsScore;
};

// Method to increment downloads and update rank
AcademicMaterialSchema.statics.incrementDownloads = async function (
  materialId
) {
  const material = await this.findById(materialId);
  if (!material) throw new AppError("Material not found", 404);

  material.analytics.downloadsCount += 1;
  await material.save();

  // Recalculate and update rank
  const rankingScore = this.calculateRankingScore(material);
  material.rank = rankingScore;
  await material.save();

  return material.analytics.downloadsCount;
};

// Method to update material rating and recalculate rank
AcademicMaterialSchema.statics.updateRating = async function (
  materialId,
  newRating
) {
  const material = await this.findById(materialId);
  if (!material) throw new AppError("Material not found", 404);

  // Update rating and recalculate
  material.rating = newRating;
  await material.save();

  // Recalculate and update rank
  const rankingScore = this.calculateRankingScore(material);
  material.rank = rankingScore;
  await material.save();
};

// Method to increment review count and update rank
AcademicMaterialSchema.statics.incrementReviews = async function (materialId) {
  const material = await this.findById(materialId);
  if (!material) throw new AppError("Material not found", 404);

  material.numReviews += 1;
  await material.save();

  // Recalculate and update rank
  const rankingScore = this.calculateRankingScore(material);
  material.rank = rankingScore;
  await material.save();
};

// Enhanced search and filter method
AcademicMaterialSchema.statics.searchAndFilter = async function (queryString) {
  const {
    search,
    rating,
    categories,
    materialType,
    academicLevel,
    academicDegree,
    academicDiscipline,
    department,
    tags,
    deliveryFormat,
    isFree,
    isFeatured,
    isTrending,
    shop,
  } = queryString;

  const filterQuery = {};

  // Full-text Search
  if (search) {
    filterQuery.$or = [
      { title: { $regex: search, $options: "i" } },
      { summary: { $regex: search, $options: "i" } },
      { description: { $regex: search, $options: "i" } },
      { tags: { $regex: search, $options: "i" } },
    ];
  }

  // Rating Filter
  if (rating) {
    filterQuery.rating = { $gte: Number(rating) };
  }

  // Categories: support both IDs and names
  if (categories) {
    const rawValues = categories.split(",").map((val) => val.trim());
    const ids = rawValues.filter((v) => /^[a-f\d]{24}$/i.test(v));
    const names = rawValues.filter((v) => !/^[a-f\d]{24}$/i.test(v));

    const foundCategoriesByName = await Category.find({
      name: { $in: names },
    }).select("_id");

    const allCategoryIds = [
      ...ids,
      ...foundCategoriesByName.map((cat) => cat._id.toString()),
    ];

    if (allCategoryIds.length > 0) {
      filterQuery.categories = { $in: allCategoryIds };
    }
  }

  if (materialType) {
    filterQuery.materialType = { $in: materialType.split(",") };
  }

  if (academicLevel) filterQuery.academicLevel = academicLevel;
  if (academicDegree) filterQuery.academicDegree = academicDegree;

  if (academicDiscipline) {
    const discipline = await Category.findOne({
      name: academicDiscipline,
      categoryType: "Academic Discipline",
    }).select("_id");
    if (discipline) filterQuery.academicDiscipline = discipline._id;
  }

  if (department) {
    const departmentCategory = await Category.findOne({
      name: department,
      categoryType: "Department",
    }).select("_id");
    if (departmentCategory) filterQuery.department = departmentCategory._id;
  }

  if (tags) {
    filterQuery.tags = { $in: tags.split(",") };
  }

  if (deliveryFormat) filterQuery.deliveryFormat = deliveryFormat;
  if (isFree !== undefined) filterQuery.isFree = isFree === "true";
  if (isFeatured !== undefined) filterQuery.isFeatured = isFeatured === "true";
  if (isTrending !== undefined) filterQuery.isTrending = isTrending === "true";

  // Shop Filter (supports slug or ObjectId)
  if (shop) {
    let shopDoc = null;

    if (/^[a-f\d]{24}$/i.test(shop)) {
      shopDoc = await Shop.findById(shop).select("_id");
    } else {
      shopDoc = await Shop.findOne({
        businessName: new RegExp(shop, "i"),
      }).select("_id");
    }

    if (shopDoc) {
      filterQuery.shop = shopDoc._id;
    } else {
      // Return no results if shop is not found
      return { _id: { $exists: false } };
    }
  }

  return filterQuery;
};

// AcademicMaterialSchema.methods.findRelatedMaterials = async function () {
//   const limit = 5;

//   // 1. Prefer manually curated related materials
//   if (
//     Array.isArray(this.relatedMaterials) &&
//     this.relatedMaterials.length > 0
//   ) {
//     return AcademicMaterial.find({
//       _id: { $in: this.relatedMaterials },
//       isActive: true,
//     })
//       .select('title price thumbnail categories materialType academicLevel')
//       .populate('categories', 'name description');
//   }

//   // 2. Dynamic fallback logic — weighted similarity
//   const conditions = [];
//   const {
//     department,
//     academicLevel,
//     academicDegree,
//     materialType,
//     categories,
//     tags,
//   } = this;

//   if (department) conditions.push({ department });
//   if (academicLevel) conditions.push({ academicLevel });
//   if (academicDegree) conditions.push({ academicDegree });
//   if (materialType) conditions.push({ materialType });
//   if (categories?.length) conditions.push({ categories: { $in: categories } });
//   if (tags?.length) conditions.push({ tags: { $in: tags } });

//   const query = {
//     isActive: true,
//     _id: { $ne: this._id },
//     $or: conditions,
//   };

//   const relatedMaterials = await AcademicMaterial.find(query)
//     .limit(limit)
//     .sort({ updatedAt: -1 }) // prioritize freshness
//     .select('title price thumbnail categories materialType academicLevel')
//     .populate('categories', 'name description');

//   return relatedMaterials;
// };

AcademicMaterialSchema.methods.findRelatedMaterials = async function (
  queryParams = {}
) {
  const {
    _id,
    department,
    academicLevel,
    academicDegree,
    materialType,
    categories = [],
    tags = [],
  } = this;

  // Step 1: Precompute related material IDs via aggregation
  const relatedIdsAndScores = await AcademicMaterial.aggregate([
    {
      $match: {
        isActive: true,
        _id: { $ne: _id },
      },
    },
    {
      $addFields: {
        score: {
          $add: [
            { $cond: [{ $eq: ["$department", department] }, 3, 0] },
            { $cond: [{ $eq: ["$academicLevel", academicLevel] }, 2, 0] },
            { $cond: [{ $eq: ["$academicDegree", academicDegree] }, 2, 0] },
            { $cond: [{ $eq: ["$materialType", materialType] }, 1.5, 0] },
            {
              $cond: [
                {
                  $gt: [
                    {
                      $size: { $setIntersection: ["$categories", categories] },
                    },
                    0,
                  ],
                },
                1,
                0,
              ],
            },
            {
              $cond: [
                { $gt: [{ $size: { $setIntersection: ["$tags", tags] } }, 0] },
                1,
                0,
              ],
            },
          ],
        },
      },
    },
    { $match: { score: { $gt: 0 } } },
    { $sort: { score: -1, updatedAt: -1 } },
    { $project: { _id: 1, score: 1 } },
  ]);

  const relatedIds = relatedIdsAndScores.map((item) => item._id);
  const scoreMap = Object.fromEntries(
    relatedIdsAndScores.map((item) => [item._id.toString(), item.score])
  );

  if (!relatedIds.length) return [];

  // Step 2: Use Mongoose query to fetch and apply API features
  const queryBuilder = AcademicMaterial.find({
    _id: { $in: relatedIds },
  }).lean();

  const apiFeatures = new ApiFeatures(queryBuilder, queryParams)
    .sort() // Sorting (customizable)
    .limitFields(); // Field limiting

  await apiFeatures.pagination(); // Apply pagination
  const rawMaterials = await apiFeatures.query;

  // Step 3: Populate categories
  const populated = await AcademicMaterial.populate(rawMaterials, {
    path: "categories",
    select: "name description",
  });

  // Step 4: Add scores and resolve prices
  const resolved = await Promise.all(
    populated.map(async (mat) => {
      const price = await resolvePrice({
        materialId: mat._id,
        materialType: mat.materialType,
        currency: "NGN",
        region: null,
      });

      const finalPrice = price
        ? {
            amount: price.amount,
            currency: price.currency,
            formatted: formatCurrency(price.amount, price.currency),
            discountApplied: price.discountApplied,
            originalAmount: price.originalPrice?.amount || null,
            strategy: price.strategy,
            source: price.source,
          }
        : null;

      return {
        ...mat,
        score: scoreMap[mat._id.toString()] || 0,
        finalPrice,
      };
    })
  );

  return resolved;
};

// Export Model
const AcademicMaterial = model("AcademicMaterial", AcademicMaterialSchema);
export default AcademicMaterial;

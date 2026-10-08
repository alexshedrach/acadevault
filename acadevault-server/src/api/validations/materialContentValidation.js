import Joi from "joi";
import {
  CURRENCIES,
  // FILE_TYPE_EXT,
  MATERIAL_LICENSES,
} from '../../constants/enums.js';

// Digital Content Validation
export const digitalContentSchema = Joi.object({
  file: Joi.string()
    .pattern(/^[a-f\d]{24}$/i)
    // .required()
    .messages({
      "string.pattern.base": "file must be a valid ObjectId.",
    }),
  additionalFiles: Joi.array()
    .items(
      Joi.string()
        .pattern(/^[a-f\d]{24}$/i)
        .messages({
          "string.pattern.base":
            "Each additionalFile must be a valid ObjectId.",
        })
    )
    .optional()
    .messages({
      "array.base": "additionalFiles must be an array of valid ObjectIds.",
    }),
  license: Joi.string()
    .valid(...Object.values(MATERIAL_LICENSES))
    .default("standard_license")
    .messages({
      "any.only": `License must be one of ${MATERIAL_LICENSES.join(", ")}.`,
      "any.required": "License is required.",
    }),
  licenseDetails: Joi.string().optional().allow(null),
  expirationDate: Joi.date().optional().allow(null).messages({
    "date.base": "Expiration date must be a valid date.",
  }),
  usageRights: Joi.object({
    canBeShared: Joi.boolean().default(false),
    canBeDownloaded: Joi.boolean().default(false),
    canBePrinted: Joi.boolean().default(false),
    canBeModified: Joi.boolean().default(false),
    canBeRedistributed: Joi.boolean().default(false),
    canBeResold: Joi.boolean().default(false),
  })
    .optional()
    .messages({
      "object.base": "Usage rights must be an object with valid properties.",
    }),
  downloadLimit: Joi.number().min(0).default(0).messages({
    "number.base": "Download limit must be a number.",
    "number.min": "Download limit cannot be negative.",
  }),
  digitalRightsManagement: Joi.boolean().default(false),
  hostedRegion: Joi.string()
    .valid("Domestic", "International")
    .optional()
    .messages({
      "any.only": "Hosted region must be either 'Domestic' or 'International'.",
    }),
  // fileFormat: Joi.string()
  //   .valid(...FILE_TYPE_EXT) // Allow only valid file types from FILE_TYPE_EXT
  //   .default(null) // Default to "UNKNOWN" if not provided
  //   .messages({
  //     "any.only": `File format must be one of ${FILE_TYPE_EXT.join(", ")}.`,
  //     "any.required": "File format is required.",
  //   }),

  // fileSize: Joi.number()
  //   .min(0) // File size should be a positive number
  //   .default(0) // Default to 0 if not provided
  //   .messages({
  //     "number.base": "File size must be a number.",
  //     "number.min": "File size must be a positive number.",
  //     "any.required": "File size is required.",
  //   }),
  
  pageCount: Joi.number()
    .min(0)
    .when("fileFormat", {
      is: Joi.string().valid("PDF", "DOCX"),
      then: Joi.optional(),
      otherwise: Joi.forbidden(),
    })
    .messages({
      "number.base": "Page count must be a number.",
      "number.min": "Page count must be a positive number.",
      "any.unknown": "Page count is not applicable for this file format.",
    }),
  isAvailableForPurchase: Joi.boolean().default(true),
  previewFile: Joi.string()
    .pattern(/^[a-f\d]{24}$/i)
    .optional()
    .messages({
      "string.pattern.base": "previewFile must be a valid ObjectId.",
    }),
  previewDuration: Joi.number().min(0).default(30).optional().messages({
    "number.base": "Preview duration must be a number.",
    "number.min": "Preview duration cannot be negative.",
  }),
  isAccessibleOffline: Joi.boolean().default(false),
  expirationPolicy: Joi.string()
    .valid("never", "time_limit", "usage_limit")
    .default("never")
    .messages({
      "any.only":
        "Expiration policy must be 'never', 'time_limit', or 'usage_limit'.",
    }),
  expirationDetails: Joi.string().optional(),
  downloadCodes: Joi.array()
    .items(
      Joi.string()
        .pattern(/^[a-f\d]{24}$/i)
        .messages({
          "string.pattern.base": "Each downloadCode must be a valid ObjectId.",
        })
    )
    .optional()
    .messages({
      "array.base": "downloadCodes must be an array of valid ObjectIds.",
    }),
});

// Physical Content Validation
export const physicalContentSchema = Joi.object({
  stockQty: Joi.number().min(0).default(1).messages({
    "number.base": "Stock quantity must be a number.",
    "number.min": "Stock quantity cannot be less than 0.",
  }),

  availability: Joi.boolean().default(false),

  availabilityStatus: Joi.string()
    .valid("available", "out_of_stock", "archived", "pre_order")
    .default("available")
    .messages({
      "any.only":
        "Availability status must be one of 'available', 'out_of_stock', 'archived', or 'pre_order'.",
    }),

  preOrderReleaseDate: Joi.date()
    .when("availabilityStatus", {
      is: "pre_order",
      then: Joi.required(),
      otherwise: Joi.optional().allow(null),
    })
    .messages({
      "date.base": "Pre-order release date must be a valid date.",
      "any.required": "Pre-order release date is required for pre-order items.",
    }),

  // ✅ Shipping Weight: Only required if it's part of the update
  shippingWeight: Joi.number().min(0).messages({
    "number.base": "Shipping weight must be a number.",
    "number.min": "Shipping weight must be a positive number.",
  }),

  // ✅ Dimensions: Only required if provided in update request
  dimensions: Joi.object({
    length: Joi.number().min(0).messages({
      "number.base": "Length must be a number.",
      "number.min": "Length must be a positive number.",
    }),
    width: Joi.number().min(0).messages({
      "number.base": "Width must be a number.",
      "number.min": "Width must be a positive number.",
    }),
    height: Joi.number().min(0).messages({
      "number.base": "Height must be a number.",
      "number.min": "Height must be a positive number.",
    }),
  })
    .optional()
    .messages({
      "object.base":
        "Dimensions must be an object with length, width, and height.",
    }),

  // ✅ Allow empty image arrays
  images: Joi.array()
    .items(
      Joi.string()
        .pattern(/^[a-f\d]{24}$/i)
        .messages({
          "string.pattern.base": "Each image must be a valid ObjectId.",
        })
    )
    .optional()
    .messages({
      "array.base": "Images must be an array of valid ObjectIds.",
    }),

  shippingCost: Joi.number().min(0).default(0).messages({
    "number.base": "Shipping cost must be a number.",
    "number.min": "Shipping cost cannot be negative.",
  }),

  handlingFee: Joi.number().min(0).default(0).messages({
    "number.base": "Handling fee must be a number.",
    "number.min": "Handling fee cannot be negative.",
  }),

  // ✅ Shipping Region: Only required if provided in update
  shippingRegion: Joi.string().valid("Domestic", "International").messages({
    "any.only": "Shipping region must be either 'Domestic' or 'International'.",
  }),

  restockDate: Joi.date().optional().messages({
    "date.base": "Restock date must be a valid date.",
  }),

  isPreOrderAvailable: Joi.boolean().default(false),

  preOrderQty: Joi.number().min(0).default(0).messages({
    "number.base": "Pre-order quantity must be a number.",
    "number.min": "Pre-order quantity cannot be negative.",
  }),

  lastRestockDate: Joi.date().optional().messages({
    "date.base": "Last restock date must be a valid date.",
  }),

  isBackorderAvailable: Joi.boolean().default(false),

  archivedDate: Joi.date().optional().messages({
    "date.base": "Archived date must be a valid date.",
  }),
});


// // Purchase Options Validation
export const purchaseOptionsSchema = Joi.object({
  platform: Joi.string()
    .valid("Amazon", "Udemy", "Ebay", "Publisher Site", "Other")
    .required()
    .messages({
      "any.only":
        "Platform must be one of 'Amazon', 'Udemy', 'Ebay', 'Publisher Site', or 'Other'.",
      "any.required": "Platform is required.",
    }),
  purchaseLink: Joi.string().uri().required().messages({
    "string.uri": "Purchase link must be a valid URL.",
    "any.required": "Purchase link is required.",
  }),
  price: Joi.number().min(0).required().messages({
    "number.base": "Price must be a number.",
    "number.min": "Price cannot be negative.",
    "any.required": "Price is required.",
  }),
  currency: Joi.string()
    .valid(...CURRENCIES) // CURRENCIES must be a predefined array of valid currency codes
    .required()
    .messages({
      "any.only": `Currency must be one of ${CURRENCIES.join(", ")}.`,
      "any.required": "Currency is required.",
    }),
});

export const analyticsValidationSchema = Joi.object({
  materialId: Joi.string()
    .pattern(/^[a-f\d]{24}$/i)
    // .required()
    .messages({
      "string.empty": "Material ID is required",
      "string.pattern.base": "Material ID must be a valid ObjectId",
    }),
  viewsCount: Joi.number()
    .min(0)
    .default(0)
    .messages({ "number.min": "Views count cannot be negative" }),
  downloadsCount: Joi.number()
    .min(0)
    .default(0)
    .messages({ "number.min": "Downloads count cannot be negative" }),
  purchases: Joi.number().min(0).default(0).messages({
    "number.min": "Purchases cannot be negative",
  }),
  upvotes: Joi.number()
    .min(0)
    .default(0)
    .messages({ "number.min": "Upvotes cannot be negative" }),
  downvotes: Joi.number()
    .min(0)
    .default(0)
    .messages({ "number.min": "Downvotes cannot be negative" }),
  updatedAt: Joi.date().default(() => new Date()),
});

export const reviewProcessSchema = Joi.object({
  status: Joi.string()
    .valid("pending", "approved", "rejected")
    .default("pending")
    .messages({
      "any.only": "Status must be one of 'pending', 'approved', or 'rejected'.",
    }),

  comments: Joi.string().trim().optional().allow("").messages({
    "string.base": "Comments must be a string.",
  }),

  reviewDate: Joi.date()
    .optional()
    .default(() => new Date()),

  reviewer: Joi.string()
    .pattern(/^[a-f\d]{24}$/i)
    .optional()
    .messages({
      "string.pattern.base": "Reviewer must be a valid ObjectId.",
    }),

  approvalStage: Joi.string()
    .valid("initial", "final", "resubmission")
    .default("initial")
    .messages({
      "any.only":
        "Approval stage must be one of 'initial', 'final', or 'resubmission'.",
    }),

  reviewedBySystem: Joi.boolean().default(false).messages({
    "boolean.base": "Reviewed by system must be a boolean value.",
  }),
});

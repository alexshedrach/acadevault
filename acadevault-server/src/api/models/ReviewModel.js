import mongoose from "mongoose";

// Schema setup
const { Schema, model } = mongoose;
const { ObjectId } = Schema;

// Affiliate Schema Definition

const ReviewSchema = new Schema(
  {
    // Reference to the AcademicMaterial model
    material: {
      type: ObjectId,
      ref: "AcademicMaterial",
      required: true,
    },
    // Reference to the Shop model
    shopId: {
      type: ObjectId,
      ref: "Shop",
      // required: true,
    },
    // Reference to the User model (reviewer)
    user: {
      type: ObjectId,
      ref: "User",
      required: true,
    },
    // Rating value
    rating: {
      type: Number,
      required: [true, "Rating is required"],
      min: [1, "Rating must be at least 1"],
      max: [5, "Rating must not exceed 5"],
    },
    // Review text
    comment: {
      type: String,
      trim: true,
      maxlength: [1000, "Review comment cannot exceed 1000 characters"],
    },
    // Verified purchase flag
    isVerifiedPurchase: {
      type: Boolean,
      default: false,
    },
    // Date when the review was created
    reviewedAt: {
      type: Date,
      default: Date.now,
    },
    // Moderation status (for spam or policy compliance)
    status: {
      type: String,
      enum: ["approved", "pending", "rejected"],
      default: "pending",
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },

    isDeleted: {
      type: Boolean,
      default: false,
    },
    upvotes: {
      type: Number,
      default: 0,
    },
    downvotes: {
      type: Number,
      default: 0,
    },
    helpfulScore: {
      type: Number,
      default: 0, // Calculated score for sorting
    },
    reports: [
      {
        user: {
          type: ObjectId,
          ref: "User",
          required: true,
        },
        reason: {
          type: String,
          required: true,
          enum: ["spam", "offensive", "irrelevant", "other"],
          maxlength: 500, // Limit report reasons to 500 characters
        },
        reportedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

ReviewSchema.index({ shopId: 1, status: 1 });
ReviewSchema.index({ material: 1, user: 1, status: 1 }, { unique: true });
ReviewSchema.index({ reviewedAt: -1 });
ReviewSchema.index({ isDeleted: 1, reviewedAt: -1 });
ReviewSchema.index({ "reports.user": 1 });

/// === Export Model === ///
const Review = model("Review", ReviewSchema);
export default Review;

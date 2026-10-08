import mongoose from "mongoose";

const { Schema, model } = mongoose;

const bannerSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Banner title is required"],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    imageUrl: {
      type: String,
      required: [true, "Banner image URL is required"],
    },
    link: {
      type: String,
      trim: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    position: {
      type: String,
      enum: ["hero", "sidebar", "footer", "popup"],
      default: "hero",
    },
    displayOrder: {
      type: Number,
      default: 0,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Indexes for query optimization
bannerSchema.index({ position: 1, isActive: 1, displayOrder: 1 });

// Middleware: Add hooks or audit trails here

// Export model
const Banner = model("Banner", bannerSchema);
export default Banner;

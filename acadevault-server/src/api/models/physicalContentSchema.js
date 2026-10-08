import mongoose from "mongoose";

// Schema setup
const { Schema } = mongoose;
const { ObjectId } = Schema;

// Physical Content Schema Definition
export const physicalContentSchema = new Schema(
  {
    stockQty: {
      type: Number,
      default: 1,
      min: [0, "Stock quantity cannot be less than 0"],
      description: "The available stock quantity for the physical material.",
    },
    availability: {
      type: Boolean,
      default: false,
      description:
        "Indicates if the physical content is available for sale or out of stock.",
    },
    availabilityStatus: {
      type: String,
      enum: ["available", "out_of_stock", "archived", "pre_order"],
      default: "available",
      description:
        "The status of availability for the physical content, supporting different states.",
    },
    preOrderReleaseDate: {
      type: Date,
      required: function () {
        return this.availabilityStatus === "pre_order";
      },
      description:
        "For items available for pre-order, the expected release date.",
    },
    shippingWeight: {
      type: Number,
      required: true,
      min: [0, "Shipping weight must be a positive number"],
      description:
        "The shipping weight of the physical content in kilograms (kg). This is essential for calculating shipping costs.",
    },
    dimensions: {
      length: {
        type: Number,
        required: true,
        min: [0, "Length must be a positive number"],
        description: "Length of the physical content in centimeters (cm).",
      },
      width: {
        type: Number,
        required: true,
        min: [0, "Width must be a positive number"],
        description: "Width of the physical content in centimeters (cm).",
      },
      height: {
        type: Number,
        required: true,
        min: [0, "Height must be a positive number"],
        description: "Height of the physical content in centimeters (cm).",
      },
    },
    images: [
      {
        type: ObjectId,
        ref: "File", // Optional reference to the File schema for images of the physical product
        required: false, // Not mandatory but allows images of physical products
      },
    ],
    shippingCost: {
      type: Number,
      default: 0,
      description:
        "Shipping cost for the physical content, can be calculated based on weight and dimensions.",
    },
    handlingFee: {
      type: Number,
      default: 0,
      description:
        "Handling fee for processing the physical content, this could vary based on packaging.",
    },
    shippingRegion: {
      type: String,
      required: true,
      enum: ["Domestic", "International"],
      description:
        "Indicates the region for shipping (Domestic or International). This helps with logistics and delivery time.",
    },
    restockDate: {
      type: Date,
      description:
        "The date when the next stock of the physical product is expected to arrive. This is useful for inventory planning.",
    },
    isPreOrderAvailable: {
      type: Boolean,
      default: false,
      description:
        "Indicates if the physical material is available for pre-order. If true, a release date should be specified.",
    },
    preOrderQty: {
      type: Number,
      default: 0,
      min: [0, "Pre-order quantity must be a non-negative number"],
      description:
        "The quantity of the physical material available for pre-order. Helps track demand for upcoming releases.",
    },
    lastRestockDate: {
      type: Date,
      description:
        "Date of the last stock replenishment. Can be used for tracking restocking frequency.",
    },
    isBackorderAvailable: {
      type: Boolean,
      default: false,
      description:
        "Indicates if backordering is allowed when stock is unavailable. If true, users can still place an order for the item.",
    },
    archivedDate: {
      type: Date,
      description:
        "Date when the product was archived. Once archived, it will no longer be available for sale.",
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

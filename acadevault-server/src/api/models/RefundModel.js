import mongoose from "mongoose";
import {
  REFUND_STATUSES,
  REFUND_METHODS,
  REFUND_REASONS,
} from "../../constants/enums.js";

const { Schema, model } = mongoose;
const { ObjectId } = Schema;

const RefundSchema = new Schema(
  {
    refundId: {
      type: String,
      unique: true,
      required: [true, "A refund must have a unique identifier"],
    },

    user: {
      type: ObjectId,
      ref: "User",
      required: [true, "A refund must belong to a user"],
    },

    order: {
      type: ObjectId,
      ref: "Order",
      required: [true, "A refund must be linked to an order"],
    },

    transaction: {
      type: ObjectId,
      ref: "Transaction",
      required: [true, "A refund must be linked to a transaction"],
    },

    originalPaymentMethod: {
      type: String,
      required: true,
      description: "The payment method used for the original transaction.",
    },

    refundMethod: {
      type: String,
      enum: REFUND_METHODS,
      required: true,
      description:
        "How the refund is processed (Original Payment, Store Credit, etc.).",
    },

    refundAmount: {
      type: Schema.Types.Decimal128,
      required: [true, "Refund amount is required"],
      min: [0, "Refund amount must be positive"],
      get: (v) => parseFloat(v.toString()).toFixed(2),
    },

    refundStatus: {
      type: String,
      enum: REFUND_STATUSES,
      default: "Pending",
    },

    refundReason: {
      type: String,
      enum: REFUND_REASONS,
      required: true,
      description: "Reason for issuing the refund.",
    },

    adminNote: {
      type: String,
      default: null,
      description: "Internal notes from admins processing the refund.",
    },

    processedBy: {
      type: ObjectId,
      ref: "Admin",
      default: null,
      description: "Admin user who processed the refund.",
    },

    refundTransactionId: {
      type: ObjectId,
      ref: "Transaction",
      default: null,
      description: "Transaction record for the refund.",
    },

    refundRequestedAt: {
      type: Date,
      default: Date.now,
    },

    refundedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
    toJSON: { getters: true, virtuals: true },
    toObject: { getters: true, virtuals: true },
  }
);

// ------------------------------------
// ** Indexes for Optimization **
// ------------------------------------
RefundSchema.index({ user: 1, refundStatus: 1 });
RefundSchema.index({ order: 1, transaction: 1 });
RefundSchema.index({ createdAt: -1 });

/// === Export Model === ///
const Refund = model("Refund", RefundSchema);
export default Refund;

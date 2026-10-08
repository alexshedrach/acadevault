import mongoose from "mongoose";

const { Schema, model } = mongoose;
const { ObjectId } = Schema;

const CouponUsageSchema = new Schema(
  {
    user: {
      type: ObjectId,
      ref: "User",
      required: false, // Allow null for guest carts
    },
    coupon: {
      type: ObjectId,
      ref: "DiscountCoupon",
      required: true,
    },
    order: {
      type: ObjectId,
      ref: "Order",
      default: null,
    },
    redeemedAt: {
      type: Date,
      default: Date.now,
    },
    redeemedAmount: {
      type: Number,
      required: false, // Optional for FREE_SHIPPING
      default: 0,
    },
    sessionId: {
      type: String,
      default: null,
    },
    guestEmail: {
      type: String,
      default: null,
    },
    guestCartId: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

CouponUsageSchema.index(
  { user: 1, coupon: 1, guestEmail: 1, guestCartId: 1 },
  {
    unique: true,
    partialFilterExpression: {
      $or: [
        { user: { $exists: true, $ne: null } },
        { guestEmail: { $exists: true, $ne: null } },
        { guestCartId: { $exists: true, $ne: null } },
      ],
    },
  }
);

const CouponUsage = model("CouponUsage", CouponUsageSchema);
export default CouponUsage;

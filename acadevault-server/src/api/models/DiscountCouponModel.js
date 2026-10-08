import mongoose from "mongoose";
import {
  DISCOUNT_TYPES,
  DISCOUNT_SCOPES,
  DISCOUNT_STATUSES,
} from "../../constants/enums.js";

const { Schema, model } = mongoose;
const { ObjectId } = Schema;

const DiscountCouponSchema = new Schema(
  {
    code: {
      type: String,
      unique: true,
      required: [true, 'A discount coupon must have a unique code'],
      trim: true,
      uppercase: true,
    },
    discountType: {
      type: String,
      enum: Object.values(DISCOUNT_TYPES),
      required: true,
    },
    discountValue: {
      type: Schema.Types.Decimal128,
      required: true,
      min: [0, 'Discount value must be positive'],
      get: (v) => parseFloat(v.toString()).toFixed(2),
    },
    maxDiscountAmount: {
      type: Schema.Types.Decimal128,
      default: null,
      get: (v) => (v ? parseFloat(v.toString()).toFixed(2) : null),
    },
    minOrderAmount: {
      type: Schema.Types.Decimal128,
      default: 0,
      get: (v) => parseFloat(v.toString()).toFixed(2),
    },
    scope: {
      type: String,
      enum: Object.values(DISCOUNT_SCOPES),
      required: true,
    },
    applicableTo: [
      {
        type: ObjectId,
        refPath: 'applicableToModel',
      },
    ],
    applicableToModel: {
      type: String,
      enum: ['AcademicMaterial', 'Shop', 'Category'],
      default: 'AcademicMaterial',
    },
    isStackable: {
      type: Boolean,
      default: false,
    },
    maxRedemptions: {
      type: Number,
      default: null,
    },
    perUserLimit: {
      type: Number,
      default: 1,
    },
    redeemedCount: {
      type: Number,
      default: 0,
    },
    validFrom: {
      type: Date,
      required: true,
    },
    validUntil: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: Object.values(DISCOUNT_STATUSES),
      default: DISCOUNT_STATUSES.PENDING,
      // default: 'Active',
    },
    createdBy: {
      type: ObjectId,
      ref: 'User',
      required: true,
    },
    lastUsedAt: {
      type: Date,
      default: null,
    },
    campaignName: {
      type: String,
      trim: true,
    },
    targetAudience: {
      type: String,
      enum: ['All', 'NewUsers', 'ReturningUsers', 'PremiumUsers'],
      default: 'All',
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

//
// 🔁 Indexes
//
// DiscountCouponSchema.index({ code: 1 });
DiscountCouponSchema.index({ status: 1, validUntil: -1 });
DiscountCouponSchema.index({ campaignName: 1 });

//
// 🧠 Virtual: `isExpired`
//
DiscountCouponSchema.virtual("isExpired").get(function () {
  return new Date() > this.validUntil;
});

//
// ✅ Optimized Pre-save Hook (Merged Logic)
//
DiscountCouponSchema.pre("save", function (next) {
  if (this.validFrom > this.validUntil) {
    return next(new Error("validFrom cannot be later than validUntil"));
  }

  if (new Date() > this.validUntil) {
    this.status = "Expired";
  }

  next();
});

//
// 🧪 Static Method: Check Usability
//
DiscountCouponSchema.statics.isUsable = function (
  couponDoc,
  userId,
  cartTotal
) {
  const now = new Date();

  if (couponDoc.status !== "Active") return false;
  if (couponDoc.validFrom > now || couponDoc.validUntil < now) return false;
  if (couponDoc.minOrderAmount && cartTotal < couponDoc.minOrderAmount)
    return false;
  if (
    couponDoc.maxRedemptions &&
    couponDoc.redeemedCount >= couponDoc.maxRedemptions
  )
    return false;

  // This only checks static eligibility; dynamic user-based limit
  // should be handled in a service layer (CouponUsage etc.)
  return true;
};

const DiscountCoupon = model("DiscountCoupon", DiscountCouponSchema);

export default DiscountCoupon;

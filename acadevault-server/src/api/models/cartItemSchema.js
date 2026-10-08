import mongoose from 'mongoose';
import { CURRENCIES } from '../../constants/enums.js';
import AppError from '../../utils/HandleAppErrors.js';
import { logger } from '../../utils/logger.js';

const { Schema } = mongoose;
const { ObjectId } = Schema;

const cartItemSchema = new Schema(
  {
    material: {
      type: ObjectId,
      ref: 'AcademicMaterial',
      required: true,
    },

    materialSnapshot: {
      _id: { type: ObjectId, required: true },
      slug: { type: String, required: true },
      title: { type: String, required: true },
      shop: { type: ObjectId, ref: 'Shop', required: true }, // ✅ ← ADD THIS
      thumbnail: { type: String },
      isDigital: { type: Boolean, required: true },
      deliveryFormat: { type: String, required: true },
      materialType: { type: Schema.Types.Mixed, required: true },
      academicLevel: { type: String },
      academicDegree: { type: String },
      departmentName: { type: String },
      categories: { type: ObjectId, ref: 'Category', required: true },
      shopName: { type: String },
      unitPrice: {
        type: Schema.Types.Decimal128,
        required: true,
        get: (v) => parseFloat(v.toString()),
      },
      currency: { type: String, enum: Object.values(CURRENCIES), default: 'NGN' },
      discountAmount: {
        type: Schema.Types.Decimal128,
        default: 0,
        get: (v) => parseFloat(v.toString()),
      },
      taxAmount: {
        type: Schema.Types.Decimal128,
        default: 0,
        get: (v) => parseFloat(v.toString()),
      },
      rating: { type: Number },
      premium: { type: Boolean },
      isPromoted: { type: Boolean },
      publicationDate: { type: Date },
    },

    quantity: {
      type: Number,
      required: true,
      min: [1, 'Quantity must be at least 1'],
    },

    unitPrice: {
      type: Schema.Types.Decimal128,
      required: true,
      get: (v) => parseFloat(v.toString()).toFixed(2),
    },

    taxAmount: {
      type: Schema.Types.Decimal128,
      default: 0,
      get: (v) => parseFloat(v.toString()).toFixed(2),
    },

    discountAmount: {
      type: Schema.Types.Decimal128,
      default: 0,
      get: (v) => parseFloat(v.toString()).toFixed(2),
    },

    finalPrice: {
      type: Schema.Types.Decimal128,
      required: true,
      get: (v) => parseFloat(v.toString()).toFixed(2),
    },

    currency: {
      type: String,
      enum: Object.values(CURRENCIES),
      default: 'NGN',
    },

    digitalDownload: {
      type: Boolean,
      default: false,
    },

    licenseKey: {
      type: String,
      unique: true,
      sparse: true,
      partialFilterExpression: { licenseKey: { $type: 'string' } },
    },

    bundleId: {
      type: ObjectId,
      ref: 'Bundle',
      required: false,
    },

    addedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    toJSON: { getters: true },
    toObject: { getters: true },
  }
);

// Structural validation
cartItemSchema.pre('validate', async function (next) {
  try {
    const parentCart = this.parent();
    const material = await mongoose.model('AcademicMaterial').findById(this.material);
    if (!material) {
      throw new AppError(`Material with ID ${this.material} not found`, 404);
    }

    if (this.currency !== parentCart?.currency) {
      throw new Error(
        `Item currency (${this.currency}) must match cart currency (${parentCart.currency}).`
      );
    }

    if (this.digitalDownload && !this.licenseKey) {
      throw new Error('License key required for digital materials.');
    }

    if (!this.digitalDownload && this.licenseKey) {
      throw new Error('License key not applicable for physical materials.');
    }

    if (!this.digitalDownload && !material.weight && parentCart?.shippingAddress) {
      throw new AppError(
        `Item "${material.title || 'unknown'}" cannot be shipped due to missing weight information.`,
        400
      );
    }

    if (
      parseFloat(this.unitPrice) < 0 ||
      parseFloat(this.taxAmount) < 0 ||
      parseFloat(this.discountAmount) < 0
    ) {
      throw new Error('Unit price, tax, and discount must be non-negative.');
    }

    next();
  } catch (error) {
    logger.error(`CartItem validation error: ${error.message}`);
    next(error);
  }
});

cartItemSchema.index({ material: 1 });

export { cartItemSchema };

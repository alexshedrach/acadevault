import mongoose from 'mongoose';
import { MATERIAL_FORMATS, FULFILLMENT_STATUS } from '../../constants/enums.js';

const { Schema } = mongoose;
const { ObjectId } = Schema;

export const orderItemSchema = new Schema(
  {
    material: {
      type: ObjectId,
      ref: 'AcademicMaterial',
      required: true,
    },

    quantity: {
      type: Number,
      required: true,
    },

    unitPrice: {
      type: Schema.Types.Decimal128,
      required: true,
      get: (v) => parseFloat(v.toString()).toFixed(2),
    },
    taxAmount: {
      type: Schema.Types.Decimal128,
      default: 0.0,
      get: (v) => parseFloat(v.toString()).toFixed(2),
    },
    discountAmount: {
      type: Schema.Types.Decimal128,
      default: 0.0,
      get: (v) => parseFloat(v.toString()).toFixed(2),
    },
    subtotal: {
      type: Schema.Types.Decimal128,
      required: true,
      get: (v) => parseFloat(v.toString()).toFixed(2),
    },

    deliveryFormat: {
      type: String,
      enum: MATERIAL_FORMATS,
      default: null,
    },

    isDigital: {
      type: Boolean,
      default: false,
    },
    licenseKey: {
      type: String,
      default: null,
    },
    downloadUrl: {
      type: String,
      default: null,
    },
    downloadExpiry: {
      type: Date,
      default: null,
    },

    pickupStationId: {
      type: ObjectId,
      ref: 'PickupStation',
      default: null,
    },

    bundleId: {
      type: ObjectId,
      ref: 'Bundle',
      default: null,
    },

    fulfillmentStatus: {
      type: String,
      enum: FULFILLMENT_STATUS,
      default: FULFILLMENT_STATUS.PENDING,
    },

    trackingNumber: {
      type: String,
      default: null,
    },
    estimatedDeliveryDate: {
      type: Date,
      default: null,
    },

    refundRequest: {
      type: ObjectId,
      ref: 'Refund',
      default: null,
    },
  },
  {
    _id: false,
    toJSON: { getters: true },
    toObject: { getters: true },
  }
);

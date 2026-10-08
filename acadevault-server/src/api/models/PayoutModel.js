import mongoose from 'mongoose';
import { PAYOUT_STATUSES } from '../../constants/enums.js';

const { Schema, model } = mongoose;
const { ObjectId } = Schema.Types;

/**
 * Payout Schema
 * Records the vendor payout details split from a transaction.
 */
const PayoutSchema = new Schema(
  {
    transaction: {
      type: ObjectId,
      ref: 'Transaction',
      required: true,
      index: true,
    },
    order: {
      type: ObjectId,
      ref: 'Order',
      required: true,
      index: true,
    },
    shop: {
      type: ObjectId,
      ref: 'Shop',
      required: true,
      index: true,
    },
    currency: {
      type: String,
      required: true,
    },
    grossAmount: {
      type: Schema.Types.Decimal128,
      required: true,
      get: (v) => parseFloat(v.toString()).toFixed(2),
    },
    feeAmount: {
      type: Schema.Types.Decimal128,
      required: true,
      get: (v) => parseFloat(v.toString()).toFixed(2),
    },
    netAmount: {
      type: Schema.Types.Decimal128,
      required: true,
      get: (v) => parseFloat(v.toString()).toFixed(2),
    },
    status: {
      type: String,
      enum: Object.values(PAYOUT_STATUSES),
      default: PAYOUT_STATUSES.PENDING,
      index: true,
    },
    initiatedAt: {
      type: Date,
      required: true,
      default: Date.now,
    },
    completedAt: {
      type: Date,
      default: null,
    },
    failureReason: {
      type: String,
      default: null,
    },
    metadata: {
      type: Map,
      of: Schema.Types.Mixed,
      default: {},
      description: 'Any additional data (e.g. payout provider response)',
    },
  },
  {
    timestamps: true,
    toJSON: { getters: true, virtuals: false },
    toObject: { getters: true, virtuals: false },
  }
);

// Index for quick lookups by shop and status
PayoutSchema.index({ shop: 1, status: 1, initiatedAt: -1 });

export default model('Payout', PayoutSchema);

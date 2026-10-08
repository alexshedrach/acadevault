import mongoose from 'mongoose';
import { CURRENCIES, TRANSACTION_STATUSES, TRANSACTION_TYPES } from '../../constants/enums.js';
import { generateTransactionId } from '../../utils/generators.js';
import TransactionValidationService from '../../services/transaction/TransactionValidationService.js';

const { Schema, model } = mongoose;
const { ObjectId } = Schema;

const TransactionSchema = new Schema(
  {
    transactionId: {
      type: String,
      required: true,
      unique: true,
      default: () => generateTransactionId({ prefix: 'TNX-' }),
      index: true,
    },
    user: {
      type: ObjectId,
      ref: 'User',
      required: function () {
        return !this.guestEmail;
      },
      index: true,
    },
    guestEmail: {
      type: String,
      trim: true,
      lowercase: true,
      default: null,
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
      default: null,
    },
    withdrawal: {
      type: ObjectId,
      ref: 'Withdrawal',
      default: null,
    },
    payments: [
      {
        type: ObjectId,
        ref: 'Payment',
      },
    ],
    transactionType: {
      type: String,
      enum: Object.values(TRANSACTION_TYPES),
      required: true,
    },
    amount: {
      type: Schema.Types.Decimal128,
      required: true,
      min: 0,
      get: (v) => parseFloat(v.toString()).toFixed(2),
    },
    currency: {
      type: String,
      enum: Object.values(CURRENCIES),
      required: true,
    },
    exchangeRate: {
      type: Schema.Types.Decimal128,
      default: 1,
      get: (v) => parseFloat(v.toString()).toFixed(4),
    },
    status: {
      type: String,
      enum: Object.values(TRANSACTION_STATUSES),
      default: TRANSACTION_STATUSES.PENDING,
      index: true,
    },
    statusHistory: [
      {
        status: {
          type: String,
          enum: Object.values(TRANSACTION_STATUSES),
          required: true,
        },
        changedAt: {
          type: Date,
          default: Date.now,
        },
        reason: {
          type: String,
          trim: true,
        },
        changedBy: {
          type: ObjectId,
          ref: 'User', // or 'User' if needed
          default: null,
        },
        source: {
          type: String,
          enum: ['system', 'payment_gateway', 'admin_panel'],
          default: 'system',
        },
      },
    ],
    initiatedBy: {
      type: String,
      enum: ['user', 'webhook', 'admin', 'system'],
      default: 'user',
    },
    transactionDate: {
      type: Date,
      default: Date.now,
      index: true,
    },
    description: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

// Indexes
TransactionSchema.index({ user: 1, status: 1 });
TransactionSchema.index({ createdAt: -1 });

// Virtals
TransactionSchema.virtual('paymentDetails', {
  ref: 'Payment',
  localField: '_id',
  foreignField: 'transaction',
});

TransactionSchema.pre('save', async function (next) {
  try {
    await TransactionValidationService.validate(this);
    next();
  } catch (err) {
    next(err);
  }
});

export default model('Transaction', TransactionSchema);

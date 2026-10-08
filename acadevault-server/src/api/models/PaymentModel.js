import mongoose from 'mongoose';
import {
  CURRENCIES,
  PAYMENT_METHODS,
  PAYMENT_GATEWAYS,
  PAYMENT_STATUS,
  TRANSACTION_STATUSES,
} from '../../constants/enums.js';
import validatePaymentData from '../../services/payment/PaymentValidation.js';
import PaymentEvaluationService from '../../services/payment/PaymentEvaluationService.js';

const { Schema, model } = mongoose;
const { ObjectId } = Schema.Types;

const PaymentSchema = new Schema(
  {
    user: {
      type: ObjectId,
      ref: 'User',
      required: function () {
        return !this.guestEmail; // inverse condition
      },
    },

    guestEmail: {
      type: String,
      required: function () {
        return !this.user; // only required if there is no user
      },
    },
    orders: [
      {
        type: ObjectId,
        ref: 'Order',
        required: true,
      },
    ],

    transaction: {
      type: ObjectId,
      ref: 'Transaction',
      required: true,
    },
    gatewayTransactionId: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      index: true,
    },
    paymentMethod: {
      type: String,
      enum: Object.values(PAYMENT_METHODS),
      required: true,
    },
    paymentGateway: {
      type: String,
      enum: Object.values(PAYMENT_GATEWAYS),
      required: true,
    },
    gatewayResponse: {
      type: Schema.Types.Mixed,
      default: {},
    },
    paymentStatus: {
      type: String,
      enum: Object.values(PAYMENT_STATUS),
      default: PAYMENT_STATUS.PENDING,
      index: true,
    },
    amountPaid: {
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
    source: {
      type: String,
      enum: ['web', 'mobile', 'api', 'admin', 'system'],
      default: 'web',
    },
    paymentDate: {
      type: Date,
      default: Date.now,
    },
    failureReason: {
      type: String,
      default: null,
    },
    refundId: {
      type: ObjectId,
      ref: 'Refund',
      default: null,
    },
    isRefunded: {
      type: Boolean,
      default: false,
      index: true,
    },
    refundedAmount: {
      type: Schema.Types.Decimal128,
      default: 0,
      min: 0,
      get: (v) => parseFloat(v.toString()).toFixed(2),
    },
    manualVerified: {
      type: Boolean,
      default: false,
    },
    verifiedAt: {
      type: Date,
    },
    adminNote: {
      type: String,
      default: '',
    },
    isFlagged: {
      type: Boolean,
      default: false,
    },
    flagReason: {
      type: String,
    },
    flaggedBy: {
      type: ObjectId,
      ref: 'User',
    },
    flaggedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
    toJSON: { getters: true, virtuals: true },
    toObject: { getters: true, virtuals: true },
  }
);

// Virtuals
PaymentSchema.virtual('paymentAge').get(function () {
  return Math.floor((Date.now() - this.createdAt.getTime()) / 1000);
});

PaymentSchema.virtual('isHighValueTransaction').get(function () {
  return PaymentEvaluationService.isHighValue(this.amountPaid, this.currency);
});

PaymentSchema.virtual('isManualReviewNeeded').get(function () {
  return PaymentEvaluationService.requiresManualReview(this);
});

// Validation middleware
PaymentSchema.pre('save', async function (next) {
  try {
    await validatePaymentData(this);
    next();
  } catch (err) {
    next(err);
  }
});

// Post-save refund flagging
PaymentSchema.post('save', async function () {
  if (this.refundId && !this.isRefunded) {
    await this.constructor.updateOne({ _id: this._id }, { isRefunded: true });
  }
});

// After each Payment save, recalc its Transaction’s captured total
PaymentSchema.post('save', async function () {
  if (![PAYMENT_STATUS.CAPTURED, PAYMENT_STATUS.CAPTURED_PARTIAL].includes(this.paymentStatus)) {
    return;
  }

  const txn = await mongoose.model('Transaction').findById(this.transaction).populate('payments');

  // Sum captured amounts
  const totalCaptured = txn.payments
    .filter((p) =>
      [PAYMENT_STATUS.CAPTURED, PAYMENT_STATUS.CAPTURED_PARTIAL].includes(p.paymentStatus)
    )
    .reduce((sum, p) => sum.plus(Big(p.amountPaid)), Big(0));

  // Transition transaction.status
  if (totalCaptured.gte(Big(txn.amount))) {
    txn.status = TRANSACTION_STATUSES.COMPLETED;
  } else {
    txn.status = TRANSACTION_STATUSES.PARTIALLY_PAID;
  }

  await txn.save();
});

// Indexes
PaymentSchema.index({ createdAt: -1 });

const Payment = model('Payment', PaymentSchema);
export default Payment;

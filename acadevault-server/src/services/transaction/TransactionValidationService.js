import mongoose from 'mongoose';
import Big from 'big.js';
import AppError from '../../utils/HandleAppErrors.js';
import { TRANSACTION_STATUSES, TRANSACTION_TYPES, CURRENCIES } from '../../constants/enums.js';

export default class TransactionValidationService {
  /**
   * Validates a Transaction document before saving.
   * @param {mongoose.Document} txDoc
   */
  static async validate(txDoc) {
    // 1️⃣ Identity: must have user OR guestEmail
    if (!txDoc.user && !txDoc.guestEmail) {
      throw new AppError('Transaction must reference a user or a guest email.', 400);
    }

    // 2️⃣ Orders must exist
    if (Array.isArray(txDoc.orders) && txDoc.orders.length) {
      const Order = mongoose.model('Order');
      const session = txDoc.$session?.();

      if (session) {
        console.warn('Transaction validation for orders deferred due to active session.');
      } else {
        const missingOrders = await Promise.all(
          txDoc.orders.map(async (oid) => {
            const exists = await Order.exists({ _id: oid });
            return !exists;
          })
        );
        if (missingOrders.some(Boolean)) {
          throw new AppError('One or more referenced orders do not exist.', 404);
        }
      }
    }

    // 3️⃣ Amount must be non‑negative
    const amt = Big(txDoc.amount?.toString() || 0);
    if (amt.lt(0)) {
      throw new AppError('Transaction amount cannot be negative.', 400);
    }

    // 4️⃣ Currency must be valid
    if (!Object.values(CURRENCIES).includes(txDoc.currency)) {
      throw new AppError(`Unsupported currency "${txDoc.currency}".`, 400);
    }

    // 5️⃣ Exchange rate must be > 0
    const ex = Big(txDoc.exchangeRate?.toString() || 0);
    if (ex.lte(0)) {
      throw new AppError('Exchange rate must be greater than zero.', 400);
    }

    // 6️⃣ Type and Status must be valid enums
    if (!Object.values(TRANSACTION_TYPES).includes(txDoc.transactionType)) {
      throw new AppError(`Invalid transaction type "${txDoc.transactionType}".`, 400);
    }
    if (!Object.values(TRANSACTION_STATUSES).includes(txDoc.status)) {
      throw new AppError(`Invalid transaction status "${txDoc.status}".`, 400);
    }

    // 7️⃣ Payments must exist (only if no session)
    if (Array.isArray(txDoc.payments) && txDoc.payments.length) {
      const Payment = mongoose.model('Payment');
      const session = txDoc.$session?.();

      if (session) {
        console.warn('Transaction validation for payments deferred due to active session.');
      } else {
        const missingPayments = await Promise.all(
          txDoc.payments.map(async (pid) => {
            const exists = await Payment.exists({ _id: pid });
            return !exists;
          })
        );
        if (missingPayments.some(Boolean)) {
          throw new AppError('One or more referenced payments do not exist.', 400);
        }
      }
    }

    // 8️⃣ Ensure unique transactionId
    const exists = await mongoose.models.Transaction.exists({
      transactionId: txDoc.transactionId,
      _id: { $ne: txDoc._id },
    });
    if (exists) {
      throw new AppError(`Duplicate transactionId "${txDoc.transactionId}".`, 400);
    }

    return true;
  }
}

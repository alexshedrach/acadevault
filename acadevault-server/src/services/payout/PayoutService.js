import mongoose from 'mongoose';
import Transaction from '../../api/models/TransactionModel.js';
import Payout from '../../api/models/PayoutModel.js'; 
import { TRANSACTION_STATUSES, PAYOUT_STATUSES } from '../../constants/enums.js';
import { logger } from '../../utils/logger.js';

/**
 * PayoutService
 * Handles vendor payout generation and processing for multi‑vendor marketplace.
 */
class PayoutService {
  /**
   * Generate payout records for a completed transaction.
   * Splits the transaction across its orders (one per shop) and creates Payout documents.
   * @param {String} transactionId - The unique transactionId (e.g. 'TXN-...')
   * @returns {Promise<Array>} - Array of created Payout documents
   */
  static async generatePayoutsForTransaction(transactionId) {
    // Start a DB session for atomic operations
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      // 1️⃣ Fetch transaction and populate orders
      const txn = await Transaction.findOne({ transactionId }).populate('orders').session(session);
      if (!txn) {
        throw new Error(`Transaction ${transactionId} not found`);
      }
      if (txn.status !== TRANSACTION_STATUSES.PENDING) {
        throw new Error(`Transaction ${transactionId} is not ready for settlement`);
      }

      // 2️⃣ Loop through each order to create a payout per shop
      const payouts = [];
      for (const order of txn.orders) {
        // Calculate vendor payout amount (grandTotal minus any platform fees)
        const vendorAmount = PayoutService.calculateVendorAmount(order);
        const feeAmount = PayoutService.calculatePlatformFee(order);

        // 3️⃣ Create a Payout record for this order
        const payout = await new Payout({
          transaction: txn._id,
          order: order._id,
          shop: order.shop,
          currency: order.currency,
          grossAmount: order.grandTotal, // total paid by customer
          feeAmount, // platform fee
          netAmount: vendorAmount, // amount to vendor
          status: PAYOUT_STATUSES.PENDING, // will be processed later
          initiatedAt: new Date(),
        }).save({ session });

        payouts.push(payout);
      }

      // 4️⃣ Update transaction status to 'SETTLED'
      txn.status = TRANSACTION_STATUSES.SETTLED;
      txn.statusHistory.push({
        status: TRANSACTION_STATUSES.SETTLED,
        changedAt: new Date(),
        reason: 'Payouts generated',
      });
      await txn.save({ session });

      // Commit the atomic operation
      await session.commitTransaction();
      session.endSession();

      logger.info(`Generated ${payouts.length} payouts for transaction ${transactionId}`);
      return payouts;
    } catch (error) {
      // Rollback on error
      await session.abortTransaction();
      session.endSession();
      logger.error('Payout generation failed', { transactionId, error: error.message });
      throw error;
    }
  }

  /**
   * Calculate platform fee for an order.
   * Placeholder: apply a flat percentage fee (e.g., 5%).
   * @param {Document} order - Order document
   * @returns {Number} - Fee amount
   */
  static calculatePlatformFee(order) {
    const PLATFORM_FEE_PERCENT = 0.05; // 5% fee
    return parseFloat(order.grandTotal) * PLATFORM_FEE_PERCENT;
  }

  /**
   * Calculate net vendor amount after fees.
   * @param {Document} order - Order document
   * @returns {Number} - Amount payable to vendor
   */
  static calculateVendorAmount(order) {
    const gross = parseFloat(order.grandTotal);
    const fee = PayoutService.calculatePlatformFee(order);
    return parseFloat((gross - fee).toFixed(2));
  }

  /**
   * Process all pending payouts: send to vendors via payment gateway and mark as completed.
   * @returns {Promise<void>}
   */
  static async processPendingPayouts() {
    // 1️⃣ Fetch all pending payouts
    const pending = await Payout.find({ status: PAYOUT_STATUSES.PENDING });

    for (const payout of pending) {
      try {
        // 2️⃣ Execute actual transfer (integration with payment provider)
        // Example: await PaymentProvider.transfer({ to: shopAccount, amount: payout.netAmount, currency });
        // TODO: integrate real gateway

        // 3️⃣ Update payout record as 'COMPLETED'
        payout.status = PAYOUT_STATUSES.COMPLETED;
        payout.completedAt = new Date();
        await payout.save();

        logger.info(`Payout ${payout._id} processed successfully`);
      } catch (err) {
        // On failure, mark as 'FAILED' and record reason
        payout.status = PAYOUT_STATUSES.FAILED;
        payout.failureReason = err.message;
        payout.completedAt = new Date();
        await payout.save();

        logger.error(`Payout ${payout._id} failed`, { error: err.message });
      }
    }
  }

  /**
   * Get a summary of payouts (optionally filtered by status or shop).
   * @param {Object} filter - Mongoose query filter
   * @returns {Promise<Array>} - List of payouts with related order and shop info
   */
  static async getPayoutReport(filter = {}) {
    return Payout.find(filter)
      .populate('order', 'orderId grandTotal shop')
      .populate('shop', 'name bankDetails')
      .sort({ initiatedAt: -1 })
      .lean();
  }
}

export default PayoutService;

import mongoose from 'mongoose';
import Payment from '../../../api/models/PaymentModel.js';
import Transaction from '../../../api/models/TransactionModel.js';
import {
  PAYMENT_GATEWAYS,
  PAYMENT_STATUS,
  TRANSACTION_STATUSES,
} from '../../../constants/enums.js';
import AppError from '../../../utils/HandleAppErrors.js';
import { logger } from '../../../utils/logger.js';
import FlutterwaveHandler from './handlers/FlutterwaveHandler.js';
import PaystackHandler from './handlers/PaystackHandler.js';
import StripeHandler from './handlers/StripeHandler.js';

// Handler registry per supported gateway
const gatewayHandlers = {
  [PAYMENT_GATEWAYS.PAYSTACK]: PaystackHandler,
  [PAYMENT_GATEWAYS.FLUTTERWAVE]: FlutterwaveHandler,
  [PAYMENT_GATEWAYS.STRIPE]: StripeHandler,
};

class PaymentWebhookService {
  /**
   * Verifies and returns the parsed webhook payload.
   *
   * @param {Object} params
   * @param {string} params.gateway
   * @param {Buffer|string} params.rawBody
   * @param {string} params.signature
   * @param {string} params.secret
   * @returns {Promise<{ verified: object }>} - Parsed & verified payload
   */
  static async verifyAndParse({ gateway, rawBody, signature, secret }) {
    const handler = gatewayHandlers[gateway];
    if (!handler || typeof handler.verifyWebhook !== 'function') {
      throw new AppError(`No handler found for gateway: ${gateway}`, 400);
    }

    let payload;

    if (gateway === PAYMENT_GATEWAYS.STRIPE) {
      payload = handler.verifyWebhook(rawBody, signature, secret);
      if (!payload) throw new AppError('Stripe webhook verification failed', 400);
    } else {
      // ✅ First verify raw body
      handler.verifyWebhook(rawBody, signature, secret); // throws if invalid

      // ✅ Then parse payload
      try {
        payload = JSON.parse(rawBody.toString());
      } catch (err) {
        throw new AppError(`Invalid JSON payload from ${gateway}`, 400);
      }
    }

    return { verified: payload };
  }

  /**
   * Processes a webhook from a specific payment gateway.
   *
   * @param {Object} params
   * @param {string} params.gateway - The name of the gateway (e.g. 'Paystack').
   * @param {Object} params.body - Parsed JSON body of the request.
   * @param {string} params.signature - Signature header from the webhook request.
   * @param {string} params.secret - Webhook secret key (for validation).
   * @param {Buffer} [params.rawBody] - Raw body (used only by Stripe).
   *
   * @returns {Promise<{ paymentId: string, status: string }>}
   */
  static async processWebhook({ gateway, body, signature, secret, rawBody }) {
    const handler = gatewayHandlers[gateway];

    if (!handler) {
      throw new AppError(`Unsupported webhook gateway: ${gateway}`, 400);
    }

    // === 1. Signature Verification ===
    let parsedPayload = body;

    try {
      if (gateway === PAYMENT_GATEWAYS.STRIPE) {
        const event = handler.verifyWebhook(rawBody, signature, secret);
        if (!event) throw new Error('Stripe signature verification failed');
        parsedPayload = event;
      }
      // 🚫 Do not verify again for Paystack/Flutterwave
      // They were already verified in verifyAndParse()
    } catch (err) {
      logger.error('Webhook signature verification failed', {
        gateway,
        error: err.message,
      });
      throw new AppError(`Webhook verification failed: ${err.message}`, 400);
    }

    // === 2. Start DB transaction ===
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      // === 3. Delegate event handling ===
      const { paymentId, status } = await handler.handleEvent(parsedPayload, session);

      // === 4. Update Transaction Status (if applicable) ===
      const payment = await Payment.findById(paymentId).session(session);
      if (payment) {
        const transaction = await Transaction.findOne({
          transactionId: payment.transaction,
        }).session(session);

        if (transaction) {
          const statusMap = {
            [PAYMENT_STATUS.SUCCESS]: TRANSACTION_STATUSES.COMPLETED,
            [PAYMENT_STATUS.FAILED]: TRANSACTION_STATUSES.FAILED,
            [PAYMENT_STATUS.REFUNDED]: TRANSACTION_STATUSES.REFUNDED,
          };

          const transactionStatus = statusMap[status] || TRANSACTION_STATUSES.FAILED;

          transaction.status = transactionStatus;
          transaction.statusHistory.push({
            status: transactionStatus,
            changedAt: new Date(),
            reason: `Webhook event processed for gateway: ${gateway}`,
          });

          await transaction.save({ session });
        }
      }

      await session.commitTransaction();

      logger.info('Webhook processed and transaction updated', {
        gateway,
        paymentId,
        status,
      });

      return { paymentId, status };
    } catch (err) {
      await session.abortTransaction();

      logger.error('Webhook processing failed', {
        gateway,
        error: err.message,
        stack: err.stack,
      });

      throw new AppError(`Webhook handling failed: ${err.message}`, 500);
    } finally {
      session.endSession();
    }
  }
}

export default PaymentWebhookService;

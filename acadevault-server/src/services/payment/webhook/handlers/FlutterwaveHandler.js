import mongoose from 'mongoose';
import crypto from 'crypto';
import Payment from '../../../../api/models/PaymentModel.js';
import AppError from '../../../../utils/HandleAppErrors.js';
import { PAYMENT_STATUS, ORDER_STATUS } from '../../../../constants/enums.js';
import { logger } from '../../../../utils/logger.js';
import OrderService from '../../../order/OrderService.js';

/**
 * Handler for Flutterwave webhook events.
 */
class FlutterwaveHandler {
  /**
   * Verifies the Flutterwave webhook signature.
   *
   * @param {Object} body - The JSON-parsed webhook payload.
   * @param {string} signature - Signature sent in headers from Flutterwave.
   * @param {string} secret - The shared webhook secret.
   * @returns {boolean} True if the signature matches, false otherwise.
   */
  static verifyWebhook(body, signature, secret) {
    const hash = crypto.createHmac('sha256', secret).update(JSON.stringify(body)).digest('hex');

    if (hash !== signature) {
      logger.warn('Invalid Flutterwave webhook signature', { signature, hash });
      return false;
    }

    return true;
  }

  /**
   * Handles a validated Flutterwave webhook event.
   *
   * @param {Object} event - Webhook payload object from Flutterwave.
   * @param {mongoose.ClientSession} session - Mongoose session for atomic update.
   * @returns {Object} Object containing paymentId and updated payment status.
   */
  static async handleEvent(event, session) {
    try {
      const ref = event.data?.tx_ref;
      const status = event.data?.status;

      if (!ref || !status) {
        throw new AppError('Invalid webhook payload: missing tx_ref or status', 400);
      }

      // Find the payment by transaction reference
      const payment = await Payment.findOne({
        gatewayTransactionId: ref,
      }).session(session);

      if (!payment) {
        throw new AppError(`Payment not found for tx_ref: ${ref}`, 404);
      }

      // Prevent duplicate updates for already completed/failed payments
      if (payment.paymentStatus !== PAYMENT_STATUS.PENDING) {
        logger.warn('Webhook event already processed', {
          ref,
          currentStatus: payment.paymentStatus,
        });

        return { paymentId: payment._id, status: payment.paymentStatus };
      }

      // Determine status update
      let update = {};
      let orderStatus = '';

      switch (status) {
        case 'successful':
          update.paymentStatus = PAYMENT_STATUS.SUCCESS;
          orderStatus = ORDER_STATUS.COMPLETED;
          break;

        case 'failed':
        case 'cancelled':
          update.paymentStatus = PAYMENT_STATUS.FAILED;
          orderStatus = ORDER_STATUS.CANCELED;
          break;

        default:
          throw new AppError(`Unhandled Flutterwave event: ${status}`, 400);
      }

      update.gatewayResponse = event.data;

      // Update payment record
      await Payment.updateOne({ _id: payment._id }, update, { session });

      // Update order status
      await OrderService.updateOrderStatus(
        {
          orderId: payment.order,
          status: orderStatus,
          note: `Webhook: ${status}`,
        },
        session
      );

      logger.info('Flutterwave webhook handled', {
        ref,
        status,
        paymentId: payment._id,
        orderId: payment.orderId,
      });

      return { paymentId: payment._id, status: update.paymentStatus };
    } catch (err) {
      logger.error('Flutterwave webhook handling failed', {
        ref: event.data?.tx_ref,
        error: err.message,
        stack: err.stack,
      });

      throw err;
    }
  }
}

export default FlutterwaveHandler;

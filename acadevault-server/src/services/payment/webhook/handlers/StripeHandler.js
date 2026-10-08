import mongoose from 'mongoose';
import Stripe from 'stripe';
import Payment from '../../../../api/models/PaymentModel.js';
import AppError from '../../../../utils/HandleAppErrors.js';
import { PAYMENT_STATUS, ORDER_STATUS } from '../../../../constants/enums.js';
import { logger } from '../../../../utils/logger.js';
import OrderService from '../../../order/OrderService.js';

// Initialize Stripe SDK
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2024-04-10',
});

/**
 * Handles Stripe webhook events related to payments.
 */
class StripeHandler {
  /**
   * Verifies the Stripe webhook and parses the event.
   *
   * @param {Buffer} rawBody - Raw request body buffer (not parsed JSON).
   * @param {string} signature - Stripe-Signature header value.
   * @param {string} secret - Webhook signing secret.
   * @returns {Object|null} The parsed Stripe event or null if verification fails.
   */
  static verifyWebhook(rawBody, signature, secret) {
    try {
      const event = stripe.webhooks.constructEvent(rawBody, signature, secret);
      return event;
    } catch (err) {
      logger.error('Stripe webhook verification failed', { error: err.message });
      return null;
    }
  }

  /**
   * Handles a verified Stripe webhook event and updates payment/order status.
   *
   * @param {Object} event - Parsed Stripe event object.
   * @param {mongoose.ClientSession} session - Mongoose transaction session.
   * @returns {Object} Result containing the payment ID and new status.
   */
  static async handleEvent(event, session) {
    try {
      const intent = event.data.object;
      const transactionRef = intent.id;

      if (!transactionRef || !event.type) {
        throw new AppError('Invalid webhook payload: missing intent ID or event type', 400);
      }

      // Find the corresponding payment by Stripe PaymentIntent ID
      const payment = await Payment.findOne({
        gatewayTransactionId: transactionRef,
      }).session(session);

      if (!payment) {
        throw new AppError(`Payment not found for intent ID: ${transactionRef}`, 404);
      }

      // Prevent duplicate processing if already finalized
      if (payment.paymentStatus !== PAYMENT_STATUS.PENDING) {
        logger.warn('Stripe webhook already processed', {
          transactionRef,
          currentStatus: payment.paymentStatus,
        });

        return { paymentId: payment._id, status: payment.paymentStatus };
      }

      let update = {};
      let orderStatus = '';

      // Map Stripe event types to our system statuses
      switch (event.type) {
        case 'payment_intent.succeeded':
          update.paymentStatus = PAYMENT_STATUS.SUCCESS;
          orderStatus = ORDER_STATUS.COMPLETED;
          break;

        case 'payment_intent.payment_failed':
          update.paymentStatus = PAYMENT_STATUS.FAILED;
          orderStatus = ORDER_STATUS.CANCELED;
          break;

        default:
          logger.warn('Unhandled Stripe webhook event', { type: event.type });
          throw new AppError(`Unhandled Stripe event: ${event.type}`, 400);
      }

      update.gatewayResponse = intent;

      // Update payment record
      await Payment.updateOne({ _id: payment._id }, update, { session });

      // Update corresponding order status
      await OrderService.updateOrderStatus(
        {
          orderId: payment.order,
          status: orderStatus,
          note: `Webhook: ${event.type}`,
        },
        session
      );

      logger.info('Stripe webhook handled successfully', {
        transactionRef,
        status: update.paymentStatus,
        paymentId: payment._id,
        orderId: payment.orderId,
      });

      return { paymentId: payment._id, status: update.paymentStatus };
    } catch (err) {
      logger.error('Stripe webhook handler error', {
        transactionRef: event.data?.object?.id,
        error: err.message,
        stack: err.stack,
      });

      throw err;
    }
  }
}

export default StripeHandler;

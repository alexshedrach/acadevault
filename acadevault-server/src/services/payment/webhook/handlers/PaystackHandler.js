import mongoose from 'mongoose';
import Payment from '../../../../api/models/PaymentModel.js';
import AppError from '../../../../utils/HandleAppErrors.js';
import { PAYMENT_STATUS, ORDER_STATUS } from '../../../../constants/enums.js';
import { logger } from '../../../../utils/logger.js';
import OrderService from '../../../order/OrderService.js';
import PaystackGatewayService from '../../gateways/PaystackGatewayService.js';

/**
 * Handler for processing Paystack webhook events.
 */
class PaystackHandler {
  /**
   * Verifies the webhook signature from Paystack using the shared secret.
   * @param {Object} body - Parsed webhook body from Paystack
   * @param {string} signature - Value from x-paystack-signature header
   * @param {string} secret - Your webhook secret key from Paystack dashboard
   * @returns {boolean} - Returns true if signature is valid
   */
  static verifyWebhook(rawBody, signature, secret) {
    PaystackGatewayService.verifyWebhook(rawBody, signature, secret);
    return true;
  }

  /**
   * Handles the Paystack webhook event after successful signature verification.
   * @param {Object} event - Full event body sent by Paystack
   * @param {mongoose.ClientSession} session - Mongoose session for transactional consistency
   * @returns {Promise<{paymentId: string, status: string}>}
   */
  static async handleEvent(event, session) {
    const { event: eventType, data } = event;
    logger.info('Paystack webhook payload received', {
      eventType,
      reference: data?.reference,
    });

    if (!eventType) {
      throw new AppError('Missing `event` field in Paystack payload', 400);
    }

    // Only care about transaction events:
    const EVENT_MAP = {
      'charge.success': { payStatus: PAYMENT_STATUS.SUCCESS, orderStatus: ORDER_STATUS.COMPLETED },
      'charge.failed': { payStatus: PAYMENT_STATUS.FAILED, orderStatus: ORDER_STATUS.CANCELED },
      'transfer.failed': { payStatus: PAYMENT_STATUS.FAILED, orderStatus: ORDER_STATUS.CANCELED },
    };

    // If it’s not in our map, ignore
    if (!Object.prototype.hasOwnProperty.call(EVENT_MAP, eventType)) {
      logger.info('Ignoring non‑transaction event', { eventType });
      return { paymentId: null, status: null };
    }

    if (!data?.reference) {
      throw new AppError('Missing `data.reference` in Paystack payload', 400);
    }
    const { reference } = data;

    // Lookup payment & guard idempotency
    const payment = await Payment.findOne({ gatewayTransactionId: reference }).session(session);
    if (!payment) {
      throw new AppError(`No payment found for reference ${reference}`, 404);
    }
    if (payment.paymentStatus !== PAYMENT_STATUS.PENDING) {
      logger.warn('Duplicate webhook delivery; skipping', {
        paymentId: payment._id,
        currentStatus: payment.paymentStatus,
      });
      return { paymentId: payment._id.toString(), status: payment.paymentStatus };
    }

    // Apply updates
    const { payStatus, orderStatus } = EVENT_MAP[eventType];
    payment.paymentStatus = payStatus;
    payment.gatewayResponse = data;
    await payment.save({ session });

    // Update the associated order
    await OrderService.updateOrderStatus(
      {
        orderId: payment.orders,
        status: orderStatus,
        note: `Processed via webhook event ${eventType}`,
      },
      session
    );

  
    logger.info('Paystack event handled', {
      paymentId: payment._id,
      newStatus: payStatus,
      orderStatus,
    });

    return { paymentId: payment._id.toString(), status: payStatus };
  }
}

export default PaystackHandler;

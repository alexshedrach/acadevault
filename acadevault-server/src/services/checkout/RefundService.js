import mongoose from "mongoose";
import Paystack from "paystack-api";
import Order from "../../api/models/OrderModel.js";
import Payment from "../../api/models/PaymentModel.js";
import User from "../../api/models/UserModel.js";
import Refund from "../../api/models/RefundModel.js";
import AppError from "../../utils/HandleAppErrors.js";
import { logger } from "../../utils/logger.js";
import {
  PAYMENT_GATEWAYS,
  PAYMENT_STATUS,
  ORDER_STATUS,
  REFUND_STATUSES,
  REFUND_METHODS,
  REFUND_REASONS,
} from "../../constants/enums.js";
import NotificationService from "./NotificationService.js";
import PaymentGatewayFactory from "./PaymentGatewayFactory.js";
import { generateTransactionId } from "../../utils/generators.js";

const paystackClient = Paystack(process.env.PAYSTACK_SECRET_KEY);

/**
 * Refund Service for managing refund requests in the checkout system
 */
class RefundService {
  /**
   * Creates a refund request
   * @param {Object} params - Parameters including orderId, userId, isGuest, email, reason, amount
   * @param {Object} [session] - MongoDB session for transaction
   * @returns {Object} Created refund
   */
  static async createRefundRequest(
    { orderId, userId, isGuest, email, reason, amount },
    session
  ) {
    try {
      const order = await Order.findById(orderId).session(session);
      if (!order) throw new AppError("Order not found", 404);

      if (isGuest && order.guestEmail !== email) {
        throw new AppError("Unauthorized access to order", 403);
      }
      if (!isGuest && (!order.user || order.user.toString() !== userId)) {
        throw new AppError("Unauthorized access to order", 403);
      }

      const payment = await Payment.findOne({ orderId }).session(session);
      if (!payment) throw new AppError("Payment not found", 404);
      if (payment.paymentStatus !== PAYMENT_STATUS.SUCCESS) {
        throw new AppError("Cannot refund a non-completed payment", 400);
      }

      // Validate refund amount using Decimal128
      const paymentAmount = parseFloat(payment.amountPaid.toString());
      const refundAmount = parseFloat(amount.toString());
      if (refundAmount <= 0 || refundAmount > paymentAmount) {
        throw new AppError(
          `Invalid refund amount. Must be between 0 and ${paymentAmount}`,
          400
        );
      }

      // Check if order contains digital items and download expiry
      if (order.isDigital) {
        const hasExpiredDownloads = order.items.some(
          (item) =>
            item.isDigital &&
            item.downloadExpiry &&
            new Date(item.downloadExpiry) < new Date()
        );
        if (!hasExpiredDownloads) {
          throw new AppError(
            "Cannot refund digital items with active download links",
            400
          );
        }
      }

      // Validate refund reason
      if (!Object.values(REFUND_REASONS).includes(reason)) {
        throw new AppError("Invalid refund reason", 400);
      }

      const refund = new Refund({
        refundId: generateTransactionId(),
        user: isGuest ? null : userId,
        order: orderId,
        transaction: payment._id,
        originalPaymentMethod: payment.paymentMethod,
        refundMethod: REFUND_METHODS.ORIGINAL_PAYMENT,
        refundAmount: amount, // Stored as Decimal128 per schema
        currency: payment.currency,
        refundReason: reason,
        refundStatus: REFUND_STATUSES.PENDING,
        refundRequestedAt: new Date(),
      });

      await refund.save({ session });

      // Update order and payment
      order.refunds.push(refund._id);
      payment.refundId = refund._id;
      payment.isRefunded = true;
      await order.save({ session });
      await payment.save({ session });

      // Send notification
      await NotificationService.sendRefundRequestNotification(
        {
          refundId: refund._id,
          userId,
          email: isGuest
            ? email
            : (await User.findById(userId).session(session))?.email,
          phoneNumber: isGuest
            ? null
            : (await User.findById(userId).session(session))?.phoneNumber,
        },
        session
      );

      logger.info("Refund request created", {
        refundId: refund.refundId,
        orderId,
        userId,
        amount: refundAmount,
      });

      return refund;
    } catch (error) {
      logger.error("Failed to create refund request", {
        orderId,
        userId,
        error: error.message,
      });
      throw new AppError(
        `Failed to create refund request: ${error.message}`,
        500
      );
    }
  }

  /**
   * Processes a refund request via Paystack
   * @param {Object} params - Parameters including refundId, processedBy
   * @param {Object} [session] - MongoDB session for transaction
   * @returns {Object} Processed refund
   */
  static async processRefund({ refundId, processedBy }, session) {
    try {
      const refund = await Refund.findById(refundId).session(session);
      if (!refund) throw new AppError("Refund request not found", 404);
      if (refund.refundStatus !== REFUND_STATUSES.PENDING) {
        throw new AppError("Refund request already processed", 400);
      }

      const payment = await Payment.findById(refund.transaction).session(
        session
      );
      if (!payment) throw new AppError("Payment not found", 404);

      const order = await Order.findById(refund.order).session(session);
      if (!order) throw new AppError("Order not found", 404);

      // Process refund via Paystack
      const gateway = PaymentGatewayFactory.getGateway(
        PAYMENT_GATEWAYS.PAYSTACK
      );
      const refundResponse = await paystackClient.refund.create({
        transaction: payment.gatewayTransactionId,
        amount: parseFloat(refund.refundAmount.toString()) * 100, // Convert to kobo
      });

      if (!refundResponse.status) {
        throw new AppError("Paystack refund processing failed", 500);
      }

      // Update refund
      refund.refundStatus = REFUND_STATUSES.PROCESSED;
      refund.refundedAt = new Date();
      refund.processedBy = processedBy || null;
      refund.refundTransactionId = refundResponse.data.id;
      refund.gatewayResponse = refundResponse.data;
      await refund.save({ session });

      // Update payment
      payment.paymentStatus = PAYMENT_STATUS.REFUNDED;
      await payment.save({ session });

      // Update order
      order.orderStatus = ORDER_STATUS.REFUNDED;
      order.paymentStatus = PAYMENT_STATUS.REFUNDED;
      order.items.forEach((item) => {
        item.fulfillmentStatus = "Refunded";
      });
      await order.save({ session });

      // Send notification
      await NotificationService.sendRefundProcessedNotification(
        {
          refundId,
          userId: refund.user,
          email:
            refund.guestEmail ||
            (await User.findById(refund.user).session(session))?.email,
          phoneNumber: refund.user
            ? (await User.findById(refund.user).session(session))?.phoneNumber
            : null,
        },
        session
      );

      logger.info("Refund processed", {
        refundId: refund.refundId,
        orderId: refund.order,
        gatewayRefundId: refundResponse.data.id,
      });

      return refund;
    } catch (error) {
      logger.error("Failed to process refund", {
        refundId,
        error: error.message,
      });
      throw new AppError(`Failed to process refund: ${error.message}`, 500);
    }
  }

  /**
   * Rejects a refund request
   * @param {Object} params - Parameters including refundId, reason, processedBy
   * @param {Object} [session] - MongoDB session for transaction
   * @returns {Object} Rejected refund
   */
  static async rejectRefund({ refundId, reason, processedBy }, session) {
    try {
      const refund = await Refund.findById(refundId).session(session);
      if (!refund) throw new AppError("Refund request not found", 404);
      if (refund.refundStatus !== REFUND_STATUSES.PENDING) {
        throw new AppError("Refund request already processed", 400);
      }

      const payment = await Payment.findById(refund.transaction).session(
        session
      );
      if (!payment) throw new AppError("Payment not found", 404);

      const order = await Order.findById(refund.order).session(session);
      if (!order) throw new AppError("Order not found", 404);

      // Update refund
      refund.refundStatus = REFUND_STATUSES.REJECTED;
      refund.adminNote = reason || "Refund request rejected";
      refund.processedBy = processedBy || null;
      await refund.save({ session });

      // Revert payment refund status
      payment.isRefunded = false;
      payment.refundId = null;
      await payment.save({ session });

      // Send notification
      await NotificationService.sendRefundRejectedNotification(
        {
          refundId,
          userId: refund.user,
          email:
            refund.guestEmail ||
            (await User.findById(refund.user).session(session))?.email,
          phoneNumber: refund.user
            ? (await User.findById(refund.user).session(session))?.phoneNumber
            : null,
          reason,
        },
        session
      );

      logger.info("Refund request rejected", {
        refundId: refund.refundId,
        orderId: refund.order,
        reason,
      });

      return refund;
    } catch (error) {
      logger.error("Failed to reject refund", {
        refundId,
        error: error.message,
      });
      throw new AppError(`Failed to reject refund: ${error.message}`, 500);
    }
  }
}

export default RefundService;

import mongoose from "mongoose";
import Order from "../api/models/OrderModel.js";
import AppError from "../utils/HandleAppErrors.js";
import {
  REFUND_METHODS,
  REFUND_STATUSES,
} from "../constants/enums";
import Payment from "../api/models/PaymentModel.js";
import PaymentGateway from "./paymentGateway.js";
import Refund from "../api/models/RefundModel";
import applyStoreCredit from "../helper/applyStoreCredit.js";
import EmailService from "./EmailService.js";

export default class RefundService {
  /**
   * 🌟 Initiates a Refund Request for an Order
   * @param {String} orderId - Order ID to refund
   * @param {String} reason - Reason for refund
   * @param {String} refundMethod - How refund should be processed (Original Payment, Store Credit, etc.)
   * @param {String} adminId - Optional admin processing the refund (for manual refunds)
   */
  static async initiateRefund(orderId, reason, refundMethod, adminId = null) {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      // 1️⃣ Retrieve and Validate Order
      const order = await Order.findById(orderId)
        .populate("transaction")
        .session(session);
      if (!order || order.orderStatus === "refunded") {
        throw new AppError("Order is not eligible for refund.", 400);
      }

      if (!Object.values(REFUND_METHODS).includes(refundMethod)) {
        throw new AppError("Invalid refund method.", 400);
      }

      // 2️⃣ Retrieve Payment Record
      const payment = await Payment.findOne({ orderId }).session(session);
      if (!payment || payment.paymentStatus !== "successful") {
        throw new AppError("Payment not found or not successful.", 400);
      }

      // 3️⃣ Process Refund Based on Method
      let refundTransactionId = null;
      let refundStatus = REFUND_STATUSES.PENDING;

      if (refundMethod === REFUND_METHODS.ORIGINAL_PAYMENT) {
        // Refund via Payment Gateway (e.g., Stripe, PayPal)
        const refundResponse = await PaymentGateway.processRefund(
          payment.gatewayTransactionId,
          order.totalAmount
        );

        if (refundResponse.status !== "succeeded") {
          throw new AppError("Refund failed at payment gateway.", 500);
        }

        refundTransactionId = refundResponse.id;
        refundStatus = REFUND_STATUSES.COMPLETED;
      } else if (refundMethod === REFUND_METHODS.STORE_CREDIT) {
        // Refund as Store Credit
        await applyStoreCredit(order.user, order.totalAmount);
        refundStatus = REFUND_STATUSES.COMPLETED;
      }

      // 4️⃣ Create Refund Record
      const refund = new Refund({
        refundId: `REF-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
        user: order.user,
        order: order._id,
        transaction: payment._id,
        originalPaymentMethod: payment.paymentMethod,
        refundMethod,
        refundAmount: order.totalAmount,
        refundStatus,
        refundReason: reason,
        processedBy: adminId || null,
        refundTransactionId,
        refundedAt:
          refundStatus === REFUND_STATUSES.COMPLETED ? new Date() : null,
      });

      await refund.save({ session });

      // 5️⃣ Update Order & Payment Status
      order.orderStatus = "refunded";
      payment.paymentStatus =
        refundStatus === REFUND_STATUSES.COMPLETED ? "refunded" : "pending";
      await order.save({ session });
      await payment.save({ session });

      // 6️⃣ Notify User & Admin

      // await NotificationService.sendRefundConfirmation(
      //   order.user || order.guestEmail,
      //   refund._id
      // );
      // if (adminId) {
      //   await NotificationService.sendAdminRefundNotification(
      //     adminId,
      //     refund._id
      //   );
      // }

      // Notify the admin about the refund
      await EmailService.sendRefundConfirmation(
        order.user || order.guestEmail,
        refund
      );
      await EmailService.sendAdminRefundNotification(refund);

      await session.commitTransaction();
      return refund;
    } catch (error) {
      await session.abortTransaction();
      throw new AppError("Refund initiation failed: " + error.message, 500);
    } finally {
      session.endSession();
    }
  }
}

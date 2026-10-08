import mongoose from "mongoose";
import Payment from "../../api/models/PaymentModel.js";
import Order from "../../api/models/OrderModel.js";
import User from "../../api/models/UserModel.js";
import Cart from "../../api/models/CartModel.js";
import AppError from "../../utils/HandleAppErrors.js";
import { logger } from "../../utils/logger.js";
import {
  PAYMENT_GATEWAYS,
  PAYMENT_METHODS,
  PAYMENT_STATUS,
  CURRENCIES,
} from "../../constants/enums.js";
import PaymentGatewayFactory from "./PaymentGatewayFactory.js";
import OrderService from "./OrderService.js";
import NotificationService from "./NotificationService.js";
import {
  generateTransactionId,
  generateIdempotencyKey,
} from "../../utils/utils.js";

/**
 * Transaction Service for managing payment transactions in the checkout system
 */
class TransactionService {
  /**
   * Initiates a payment transaction for an order
   * @param {Object} params - Parameters including cartId, orderId, userId, isGuest, email
   * @param {Object} [session] - MongoDB session for transaction
   * @returns {Object} Payment details
   */
  static async initiateTransaction(
    { cartId, orderId, userId, isGuest, email },
    session
  ) {
    try {
      const cart = await Cart.findById(cartId).session(session);
      if (!cart) throw new AppError("Cart not found", 404);
      if (cart.status !== "Active")
        throw new AppError("Cart is not active", 400);

      const order = await Order.findById(orderId).session(session);
      if (!order) throw new AppError("Order not found", 404);

      if (isGuest && !email) throw new AppError("Guest email required", 400);
      if (!isGuest && (!cart.user || cart.user.toString() !== userId)) {
        throw new AppError("Unauthorized cart access", 403);
      }

      const recipientEmail =
        email || (await User.findById(userId).session(session))?.email;
      if (!recipientEmail) throw new AppError("Recipient email required", 400);

      // Initialize payment with Paystack
      const gateway = PaymentGatewayFactory.getGateway(
        PAYMENT_GATEWAYS.PAYSTACK
      );
      const paymentData = {
        amount: order.grandTotal,
        currency: order.currency || CURRENCIES.NGN,
        email: recipientEmail,
        cartId,
        userId: userId || "guest",
        orderId,
      };

      const { clientSecret, transactionRef } =
        await gateway.initiate(paymentData);

      const payment = new Payment({
        userId: userId || null,
        guestEmail: isGuest ? email : null,
        orderId,
        transactionId: generateTransactionId(),
        paymentMethod: PAYMENT_METHODS.CARD,
        paymentStatus: PAYMENT_STATUS.PENDING,
        amountPaid: order.grandTotal,
        currency: order.currency,
        paymentGateway: PAYMENT_GATEWAYS.PAYSTACK,
        gatewayTransactionId: transactionRef,
        gatewayResponse: {
          authorization_url: clientSecret,
          reference: transactionRef,
        },
      });

      await payment.save({ session });

      // Update cart with transaction ID
      cart.paymentTransactionId = payment.transactionId;
      await cart.save({ session });

      // Update order with transaction reference
      order.transaction = payment._id;
      await order.save({ session });

      logger.info("Transaction initiated", {
        transactionId: payment.transactionId,
        orderId,
        cartId,
        userId,
        type: isGuest ? "guest" : "authenticated",
        paymentGateway: PAYMENT_GATEWAYS.PAYSTACK,
        transactionRef,
      });

      return {
        paymentId: payment._id,
        clientSecret,
        transactionRef,
        idempotencyKey: generateIdempotencyKey(cartId, userId),
        amount: payment.amountPaid,
        currency: payment.currency,
      };
    } catch (error) {
      logger.error("Transaction initiation failed", {
        cartId,
        orderId,
        userId,
        error: error.message,
      });
      throw new AppError(
        `Transaction initiation failed: ${error.message}`,
        500
      );
    }
  }

  /**
   * Verifies a payment transaction
   * @param {Object} params - Parameters including transactionRef, orderId
   * @param {Object} [session] - MongoDB session for transaction
   * @returns {Object} Verification result
   */
  static async verifyTransaction({ transactionRef, orderId }, session) {
    try {
      const payment = await Payment.findOne({
        gatewayTransactionId: transactionRef,
      }).session(session);
      if (!payment) throw new AppError("Payment not found", 404);

      const order = await Order.findById(orderId).session(session);
      if (!order) throw new AppError("Order not found", 404);

      const gateway = PaymentGatewayFactory.getGateway(
        PAYMENT_GATEWAYS.PAYSTACK
      );
      const { status, gatewayResponse } = await gateway.verify(transactionRef);

      if (status === "success") {
        payment.paymentStatus = PAYMENT_STATUS.SUCCESS;
        payment.gatewayResponse = gatewayResponse;
        await payment.save({ session });

        // Update order status
        await OrderService.updateOrderStatus(
          { orderId, status: "completed" },
          session
        );

        // Send payment confirmation notification
        await NotificationService.sendPaymentConfirmation(
          {
            paymentId: payment._id,
            userId: payment.userId,
            email: payment.guestEmail,
            phoneNumber: payment.userId
              ? (await User.findById(payment.userId).session(session))
                  ?.phoneNumber
              : null,
          },
          session
        );

        logger.info("Transaction verified: success", {
          transactionRef,
          orderId,
        });
      } else {
        payment.paymentStatus = PAYMENT_STATUS.FAILED;
        payment.gatewayResponse = gatewayResponse;
        await payment.save({ session });

        // Update order status
        await OrderService.updateOrderStatus(
          { orderId, status: "cancelled" },
          session
        );

        // Send cancellation notification
        await NotificationService.sendOrderCancellation(
          {
            orderId,
            email:
              payment.guestEmail ||
              (await User.findById(payment.userId).session(session))?.email,
            phoneNumber: payment.userId
              ? (await User.findById(payment.userId).session(session))
                  ?.phoneNumber
              : null,
          },
          session
        );

        logger.info("Transaction verified: failed", {
          transactionRef,
          orderId,
        });
      }

      return { status, payment };
    } catch (error) {
      logger.error("Transaction verification failed", {
        transactionRef,
        orderId,
        error: error.message,
      });
      throw new AppError(
        `Transaction verification failed: ${error.message}`,
        400
      );
    }
  }

  /**
   * Retrieves a transaction by ID or transaction reference
   * @param {Object} params - Parameters including transactionId, transactionRef, userId, isGuest
   * @returns {Object} Payment details
   */
  static async getTransaction({
    transactionId,
    transactionRef,
    userId,
    isGuest,
  }) {
    try {
      const query = transactionId
        ? { _id: transactionId }
        : { gatewayTransactionId: transactionRef };
      const payment = await Payment.findOne(query)
        .populate("orderId")
        .populate("userId");

      if (!payment) throw new AppError("Transaction not found", 404);

      if (
        isGuest &&
        payment.guestEmail !== (await User.findById(userId))?.email
      ) {
        throw new AppError("Unauthorized access to transaction", 403);
      }
      if (!isGuest && payment.userId?.toString() !== userId) {
        throw new AppError("Unauthorized access to transaction", 403);
      }

      logger.info("Transaction retrieved", {
        transactionId: payment.transactionId,
        userId,
        type: isGuest ? "guest" : "authenticated",
      });

      return payment;
    } catch (error) {
      logger.error("Transaction retrieval failed", {
        transactionId,
        transactionRef,
        userId,
        error: error.message,
      });
      throw new AppError(`Transaction retrieval failed: ${error.message}`, 404);
    }
  }

  /**
   * Cancels a pending transaction
   * @param {Object} params - Parameters including transactionId, userId, isGuest
   * @param {Object} [session] - MongoDB session for transaction
   * @returns {Object} Cancelled payment
   */
  static async cancelTransaction({ transactionId, userId, isGuest }, session) {
    try {
      const payment = await Payment.findOne({ transactionId }).session(session);
      if (!payment) throw new AppError("Transaction not found", 404);

      if (
        isGuest &&
        payment.guestEmail !== (await User.findById(userId))?.email
      ) {
        throw new AppError("Unauthorized access to transaction", 403);
      }
      if (!isGuest && payment.userId?.toString() !== userId) {
        throw new AppError("Unauthorized access to transaction", 403);
      }

      if (payment.paymentStatus !== PAYMENT_STATUS.PENDING) {
        throw new AppError("Only pending transactions can be cancelled", 400);
      }

      payment.paymentStatus = PAYMENT_STATUS.FAILED;
      payment.gatewayResponse = {
        ...payment.gatewayResponse,
        status: "cancelled",
      };
      await payment.save({ session });

      // Update order status
      await OrderService.updateOrderStatus(
        { orderId: payment.orderId, status: "cancelled" },
        session
      );

      // Send cancellation notification
      await NotificationService.sendOrderCancellation(
        {
          orderId: payment.orderId,
          email:
            payment.guestEmail ||
            (await User.findById(payment.userId).session(session))?.email,
          phoneNumber: payment.userId
            ? (await User.findById(payment.userId).session(session))
                ?.phoneNumber
            : null,
        },
        session
      );

      logger.info("Transaction cancelled", {
        transactionId,
        orderId: payment.orderId,
        userId,
        type: isGuest ? "guest" : "authenticated",
      });

      return payment;
    } catch (error) {
      logger.error("Transaction cancellation failed", {
        transactionId,
        userId,
        error: error.message,
      });
      throw new AppError(
        `Transaction cancellation failed: ${error.message}`,
        400
      );
    }
  }
}

export default TransactionService;

import StripeService from "./StripeService.js";
import PayPalService from "./PayPalService.js";
import FlutterwaveService from "./FlutterwaveService.js";
import PaystackService from "./PaystackService.js";
import Payment from "../api/models/PaymentModel.js";
import {
  PAYMENT_GATEWAYS,
  PAYMENT_STATUS,
} from "../constants/enums.js";
import { logger } from "../utils/logger.js";
import { retry } from "../helper/RetryHelper.js";

class PaymentGateway {
  /**
   * Creates a payment session with the selected payment gateway.
   * Implements robust error handling and retry mechanism for transient failures.
   * @param {Object} params
   * @returns {Object} Payment session details (URL, transaction ID)
   */
  static async createPaymentSession({
    amount,
    currency,
    userId,
    guestEmail,
    cartId,
    paymentMethod,
    gateway,
  }) {
    try {
      let paymentSession;

      switch (gateway) {
        case PAYMENT_GATEWAYS.STRIPE:
          paymentSession = await retry(() =>
            StripeService.createPaymentSession(
              amount,
              currency,
              userId,
              guestEmail,
              cartId
            )
          );
          break;

        case PAYMENT_GATEWAYS.PAYPAL:
          paymentSession = await retry(() =>
            PayPalService.createPaymentSession(
              amount,
              currency,
              userId,
              guestEmail,
              cartId
            )
          );
          break;

        case PAYMENT_GATEWAYS.FLUTTERWAVE:
          paymentSession = await retry(() =>
            FlutterwaveService.createPaymentSession(
              amount,
              currency,
              userId,
              guestEmail,
              cartId
            )
          );
          break;

        case PAYMENT_GATEWAYS.PAYSTACK:
          paymentSession = await retry(() =>
            PaystackService.createPaymentSession(
              amount,
              currency,
              userId,
              guestEmail,
              cartId
            )
          );
          break;

        default:
          throw new Error("Unsupported payment gateway.");
      }

      // Store the payment transaction in DB
      const payment = new Payment({
        userId,
        guestEmail,
        orderId: cartId,
        transactionId: paymentSession.transactionId,
        paymentMethod,
        paymentStatus: PAYMENT_STATUS.PENDING,
        amountPaid: amount,
        currency,
        paymentGateway: gateway,
        gatewayTransactionId: paymentSession.gatewayTransactionId,
        gatewayResponse: paymentSession.rawResponse,
      });

      await payment.save();

      return {
        paymentUrl: paymentSession.paymentUrl,
        sessionId: paymentSession.transactionId,
      };
    } catch (error) {
      logger.error(`Payment session creation failed for ${gateway}:`, error);
      throw new Error("Payment session creation failed. Please try again.");
    }
  }

  /**
   * Verifies the payment status after user completes the transaction.
   */
  static async verifyPayment(transactionId, gateway) {
    try {
      let verificationResponse;

      switch (gateway) {
        case PAYMENT_GATEWAYS.STRIPE:
          verificationResponse =
            await StripeService.verifyPayment(transactionId);
          break;
        case PAYMENT_GATEWAYS.PAYPAL:
          verificationResponse =
            await PayPalService.verifyPayment(transactionId);
          break;
        case PAYMENT_GATEWAYS.FLUTTERWAVE:
          verificationResponse =
            await FlutterwaveService.verifyPayment(transactionId);
          break;
        case PAYMENT_GATEWAYS.PAYSTACK:
          verificationResponse =
            await PaystackService.verifyPayment(transactionId);
          break;
        default:
          throw new Error("Unsupported payment gateway.");
      }

      // Update Payment Record in DB
      const payment = await Payment.findOne({ transactionId });

      if (!payment) throw new Error("Payment record not found.");

      payment.paymentStatus = verificationResponse.success
        ? PAYMENT_STATUS.SUCCESS
        : PAYMENT_STATUS.FAILED;
      payment.gatewayResponse = verificationResponse.rawResponse;
      await payment.save();

      return verificationResponse;
    } catch (error) {
      logger.error(`Payment verification failed for ${gateway}:`, error);
      throw new Error("Payment verification failed. Please contact support.");
    }
  }

  // /**
  //  * Handles asynchronous payment callbacks/webhooks from providers.
  //  */
  // static async handlePaymentCallback(sessionId, provider) {
  //   try {
  //     // Check if the session exists and update payment status
  //     const payment = await Payment.findOne({
  //       gatewayTransactionId: sessionId,
  //     });

  //     if (!payment) {
  //       throw new Error("Payment session not found.");
  //     }

  //     let providerResponse;
  //     switch (provider) {
  //       case "STRIPE":
  //         providerResponse = await StripeService.getPaymentStatus(sessionId);
  //         break;
  //       case "PAYPAL":
  //         providerResponse = await axios.get(
  //           `https://api.paypal.com/v2/checkout/orders/${sessionId}`,
  //           {
  //             headers: {
  //               Authorization: `Bearer ${process.env.PAYPAL_ACCESS_TOKEN}`,
  //             },
  //           }
  //         );
  //         break;
  //       case "PAYSTACK":
  //         providerResponse = await axios.get(
  //           `https://api.paystack.co/transaction/verify/${sessionId}`,
  //           {
  //             headers: {
  //               Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
  //             },
  //           }
  //         );
  //         break;
  //       default:
  //         throw new Error("Unsupported payment provider.");
  //     }

  //     // Determine the final payment status
  //     const isPaymentSuccessful =
  //       providerResponse.data?.status === "success" ||
  //       providerResponse.data?.payment_status === "paid" ||
  //       providerResponse.data?.status === "COMPLETED";

  //     payment.paymentStatus = isPaymentSuccessful
  //       ? PAYMENT_STATUS.SUCCESS
  //       : PAYMENT_STATUS.FAILED;
  //     await payment.save();

  //     return payment;
  //   } catch (error) {
  //     logger.error("Error in payment callback handling:", error);
  //     throw new Error("Error processing payment callback.");
  //   }
  // }

  /**
   * Processes refunds for a completed transaction.
   */
  static async processRefund(transactionId, gateway, amount) {
    try {
      let refundResponse;

      switch (gateway) {
        case PAYMENT_GATEWAYS.STRIPE:
          refundResponse = await StripeService.processRefund(
            transactionId,
            amount
          );
          break;
        case PAYMENT_GATEWAYS.PAYPAL:
          refundResponse = await PayPalService.processRefund(
            transactionId,
            amount
          );
          break;
        case PAYMENT_GATEWAYS.FLUTTERWAVE:
          refundResponse = await FlutterwaveService.processRefund(
            transactionId,
            amount
          );
          break;
        case PAYMENT_GATEWAYS.PAYSTACK:
          refundResponse = await PaystackService.processRefund(
            transactionId,
            amount
          );
          break;
        default:
          throw new Error("Unsupported payment gateway.");
      }

      // Update Payment Record in DB
      const payment = await Payment.findOne({ transactionId });
      if (!payment) throw new Error("Payment record not found.");

      payment.isRefunded = refundResponse.success;
      await payment.save();

      return refundResponse;
    } catch (error) {
      logger.error(`Refund failed for ${gateway}:`, error);
      throw new Error("Refund processing failed. Please contact support.");
    }
  }
}

export default PaymentGateway;

import axios from "axios";
import crypto from "crypto";
import dotenv from "dotenv";

dotenv.config();

const PAYSTACK_BASE_URL = "https://api.paystack.co";
const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY;
const FRONTEND_URL = process.env.FRONTEND_URL;

class PaystackService {
  /**
   * Create a payment session using Paystack
   * @param {number} amount - Payment amount
   * @param {string} currency - Payment currency (e.g., "NGN")
   * @param {string} userId - User ID (if logged in)
   * @param {string} guestEmail - Guest email (if guest checkout)
   * @param {string} cartId - Cart/Order ID
   * @returns {object} Payment session details
   */
  static async createPaymentSession(
    amount,
    currency,
    userId,
    guestEmail,
    cartId
  ) {
    try {
      const response = await axios.post(
        `${PAYSTACK_BASE_URL}/transaction/initialize`,
        {
          email: guestEmail,
          amount: amount * 100, // Paystack uses kobo (multiply by 100)
          currency,
          reference: `paystack_${Date.now()}`,
          callback_url: `${FRONTEND_URL}/payment-status`,
          metadata: {
            userId,
            cartId,
          },
        },
        { headers: { Authorization: `Bearer ${PAYSTACK_SECRET_KEY}` } }
      );

      return {
        transactionId: response.data.data.reference,
        paymentUrl: response.data.data.authorization_url,
        gatewayTransactionId: response.data.data.reference,
        rawResponse: response.data,
      };
    } catch (error) {
      console.error(
        "❌ Paystack Payment Error:",
        error.response?.data || error.message
      );
      throw new Error("Error initializing Paystack payment. Please try again.");
    }
  }

  /**
   * Verify payment transaction status
   * @param {string} transactionId - Transaction reference from Paystack
   * @returns {object} Payment verification result
   */
  static async verifyPayment(transactionId) {
    try {
      const response = await axios.get(
        `${PAYSTACK_BASE_URL}/transaction/verify/${transactionId}`,
        { headers: { Authorization: `Bearer ${PAYSTACK_SECRET_KEY}` } }
      );

      const paymentStatus = response.data.data.status; // "success", "failed", "abandoned"
      const isSuccess = paymentStatus === "success";

      return {
        success: isSuccess,
        status: paymentStatus,
        amountPaid: response.data.data.amount / 100, // Convert back to major currency unit
        currency: response.data.data.currency,
        rawResponse: response.data,
      };
    } catch (error) {
      console.error(
        "❌ Paystack Verification Error:",
        error.response?.data || error.message
      );
      throw new Error("Error verifying Paystack payment.");
    }
  }

  /**
   * Process a refund for a given transaction
   * @param {string} transactionId - Transaction reference
   * @param {number} amount - Refund amount
   * @returns {object} Refund result
   */
  static async processRefund(transactionId, amount) {
    try {
      const response = await axios.post(
        `${PAYSTACK_BASE_URL}/refund`,
        {
          transaction: transactionId,
          amount: amount * 100, // Convert to kobo
        },
        { headers: { Authorization: `Bearer ${PAYSTACK_SECRET_KEY}` } }
      );

      return {
        success: response.data.status === true, // Paystack returns 'true' for successful refunds
        message: response.data.message,
        rawResponse: response.data,
      };
    } catch (error) {
      console.error(
        "❌ Paystack Refund Error:",
        error.response?.data || error.message
      );
      throw new Error("Error processing Paystack refund.");
    }
  }

  /**
   * Verifies the authenticity of a Paystack webhook request.
   * @param {Object} req - The request object containing raw body and headers.
   * @returns {boolean} True if the webhook is valid, false otherwise.
   */
  static verifyWebhook(req) {
    try {
      const signature = req.headers["x-paystack-signature"];
      if (!signature) return false;

      const expectedHash = crypto
        .createHmac("sha512", PAYSTACK_SECRET_KEY)
        .update(JSON.stringify(req.body))
        .digest("hex");

      return signature === expectedHash;
    } catch (error) {
      console.error("❌ Paystack Webhook Verification Error:", error.message);
      return false;
    }
  }
}

export default PaystackService;

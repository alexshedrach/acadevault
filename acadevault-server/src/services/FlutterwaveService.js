import axios from "axios";
import crypto from "crypto";
import dotenv from "dotenv";

dotenv.config();

const FLW_SECRET_KEY = process.env.FLW_SECRET_KEY;
const FLW_WEBHOOK_SECRET = process.env.FLW_WEBHOOK_SECRET;
const FRONTEND_URL = process.env.FRONTEND_URL;

class FlutterwaveService {
  /**
   * Creates a payment session with Flutterwave.
   *
   * @param {number} amount - Amount to charge.
   * @param {string} currency - Currency code (e.g., USD, NGN).
   * @param {string} userId - User ID (if logged in).
   * @param {string} guestEmail - Guest email (if applicable).
   * @param {string} cartId - Cart identifier for tracking.
   * @returns {Object} Transaction details including the payment link.
   */
  static async createPaymentSession(
    amount,
    currency,
    userId,
    guestEmail,
    cartId
  ) {
    try {
      const tx_ref = `flw_${Date.now()}`;

      const response = await axios.post(
        "https://api.flutterwave.com/v3/payments",
        {
          tx_ref,
          amount,
          currency,
          redirect_url: `${FRONTEND_URL}/payment-status?tx_ref=${tx_ref}`,
          customer: { email: guestEmail },
          meta: { userId, cartId },
        },
        {
          headers: { Authorization: `Bearer ${FLW_SECRET_KEY}` },
        }
      );

      return {
        transactionId: response.data.data.tx_ref,
        paymentUrl: response.data.data.link,
        gatewayTransactionId: response.data.data.id,
        rawResponse: response.data,
      };
    } catch (error) {
      console.error(
        "❌ Flutterwave Payment Error:",
        error.response?.data || error.message
      );
      throw new Error("Error initiating Flutterwave payment.");
    }
  }

  /**
   * Verifies a payment with Flutterwave.
   *
   * @param {string} transactionId - The Flutterwave transaction reference.
   * @returns {Object} Verification result with payment status.
   */
  static async verifyPayment(transactionId) {
    try {
      const response = await axios.get(
        `https://api.flutterwave.com/v3/transactions/${transactionId}/verify`,
        {
          headers: { Authorization: `Bearer ${FLW_SECRET_KEY}` },
        }
      );

      const isSuccess =
        response.data.status === "success" &&
        response.data.data.status === "successful";

      return {
        success: isSuccess,
        gatewayTransactionId: response.data.data.id,
        amountPaid: response.data.data.amount,
        currency: response.data.data.currency,
        paymentStatus: isSuccess ? "SUCCESS" : "FAILED",
        rawResponse: response.data,
      };
    } catch (error) {
      console.error(
        "❌ Flutterwave Verification Error:",
        error.response?.data || error.message
      );
      throw new Error("Error verifying Flutterwave payment.");
    }
  }

  /**
   * Processes a refund for a Flutterwave transaction.
   *
   * @param {string} transactionId - The Flutterwave transaction ID.
   * @param {number} amount - Refund amount (optional for partial refunds).
   * @returns {Object} Refund status.
   */
  static async processRefund(transactionId, amount = null) {
    try {
      const refundData = {
        transaction_id: transactionId,
        amount,
      };

      const response = await axios.post(
        `https://api.flutterwave.com/v3/refunds`,
        refundData,
        {
          headers: { Authorization: `Bearer ${FLW_SECRET_KEY}` },
        }
      );

      return {
        success: response.data.status === "success",
        refundId: response.data.data.id,
        rawResponse: response.data,
      };
    } catch (error) {
      console.error(
        "❌ Flutterwave Refund Error:",
        error.response?.data || error.message
      );
      throw new Error("Refund processing failed.");
    }
  }

  /**
   * Verifies the authenticity of a Flutterwave webhook request.
   *
   * @param {Object} req - The request object containing raw body and headers.
   * @returns {boolean} True if the webhook is valid, false otherwise.
   */
  static verifyWebhook(req) {
    try {
      const signature = req.headers["verif-hash"];
      if (!signature) return false;

      const expectedHash = crypto
        .createHmac("sha256", FLW_WEBHOOK_SECRET)
        .update(JSON.stringify(req.body))
        .digest("hex");

      return signature === expectedHash;
    } catch (error) {
      console.error(
        "❌ Flutterwave Webhook Verification Error:",
        error.message
      );
      return false;
    }
  }
}

export default FlutterwaveService;

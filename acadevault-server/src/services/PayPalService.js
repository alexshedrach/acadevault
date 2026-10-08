import axios from "axios";
import crypto from "crypto";
import dotenv from "dotenv";

dotenv.config();

const PAYPAL_BASE_URL =
  process.env.PAYPAL_MODE === "sandbox"
    ? "https://api-m.sandbox.paypal.com"
    : "https://api-m.paypal.com";

const PAYPAL_CLIENT_ID = process.env.PAYPAL_CLIENT_ID;
const PAYPAL_SECRET = process.env.PAYPAL_SECRET;
const PAYPAL_WEBHOOK_SECRET = process.env.PAYPAL_WEBHOOK_SECRET;
const FRONTEND_URL = process.env.FRONTEND_URL;

class PayPalService {
  /**
   * Get OAuth Token from PayPal
   * @returns {string} OAuth token
   */
  static async getAccessToken() {
    try {
      const response = await axios.post(
        `${PAYPAL_BASE_URL}/v1/oauth2/token`,
        "grant_type=client_credentials",
        {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          auth: { username: PAYPAL_CLIENT_ID, password: PAYPAL_SECRET },
        }
      );

      return response.data.access_token;
    } catch (error) {
      console.error(
        "❌ PayPal OAuth Error:",
        error.response?.data || error.message
      );
      throw new Error("Error obtaining PayPal access token.");
    }
  }

  /**
   * Create a PayPal payment session
   * @param {number} amount - Payment amount
   * @param {string} currency - Payment currency (e.g., "USD")
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
      const accessToken = await this.getAccessToken();

      const paymentData = {
        intent: "CAPTURE",
        purchase_units: [
          {
            amount: {
              currency_code: currency,
              value: amount.toFixed(2),
            },
            custom_id: cartId,
          },
        ],
        payer: {
          email_address: guestEmail,
        },
        application_context: {
          brand_name: "AcadeVault",
          return_url: `${FRONTEND_URL}/payment-success`,
          cancel_url: `${FRONTEND_URL}/checkout`,
        },
      };

      const response = await axios.post(
        `${PAYPAL_BASE_URL}/v2/checkout/orders`,
        paymentData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      const approvalLink = response.data.links.find(
        (link) => link.rel === "approve"
      )?.href;

      return {
        transactionId: response.data.id,
        paymentUrl: approvalLink,
        gatewayTransactionId: response.data.id,
        rawResponse: response.data,
      };
    } catch (error) {
      console.error(
        "❌ PayPal Payment Error:",
        error.response?.data || error.message
      );
      throw new Error("Error initializing PayPal payment. Please try again.");
    }
  }

  /**
   * Capture PayPal payment after user approval
   * @param {string} orderId - PayPal Order ID
   * @returns {object} Capture result with transaction details
   */
  static async capturePayment(orderId) {
    try {
      const accessToken = await this.getAccessToken();

      const response = await axios.post(
        `${PAYPAL_BASE_URL}/v2/checkout/orders/${orderId}/capture`,
        {},
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );

      return {
        success: response.data.status === "COMPLETED",
        captureId: response.data.purchase_units[0]?.payments?.captures[0]?.id,
        amountPaid:
          response.data.purchase_units[0]?.payments?.captures[0]?.amount?.value,
        currency:
          response.data.purchase_units[0]?.payments?.captures[0]?.amount
            ?.currency_code,
        rawResponse: response.data,
      };
    } catch (error) {
      console.error(
        "❌ PayPal Capture Error:",
        error.response?.data || error.message
      );
      throw new Error("Error capturing PayPal payment.");
    }
  }

  /**
   * Verify PayPal payment transaction
   * @param {string} transactionId - PayPal Order ID
   * @returns {object} Payment verification result
   */
  static async verifyPayment(transactionId) {
    try {
      const accessToken = await this.getAccessToken();

      const response = await axios.get(
        `${PAYPAL_BASE_URL}/v2/checkout/orders/${transactionId}`,
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );

      return {
        success: response.data.status === "COMPLETED",
        rawResponse: response.data,
      };
    } catch (error) {
      console.error(
        "❌ PayPal Verification Error:",
        error.response?.data || error.message
      );
      throw new Error("Error verifying PayPal payment.");
    }
  }

  /**
   * Process a PayPal refund
   * @param {string} captureId - PayPal Capture ID
   * @param {number} amount - Refund amount
   * @param {string} currency - Currency of the refund
   * @returns {object} Refund result
   */
  static async processRefund(captureId, amount, currency) {
    try {
      const accessToken = await this.getAccessToken();

      const refundData = {
        amount: {
          value: amount.toFixed(2),
          currency_code: currency,
        },
      };

      const response = await axios.post(
        `${PAYPAL_BASE_URL}/v2/payments/captures/${captureId}/refund`,
        refundData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      return {
        success: response.data.status === "COMPLETED",
        rawResponse: response.data,
      };
    } catch (error) {
      console.error(
        "❌ PayPal Refund Error:",
        error.response?.data || error.message
      );
      throw new Error("Error processing PayPal refund.");
    }
  }

  /**
   * Verifies the authenticity of a PayPal webhook request.
   *
   * @param {Object} req - The request object containing raw body and headers.
   * @returns {boolean} True if the webhook is valid, false otherwise.
   */
  static verifyWebhook(req) {
    try {
      const signature = req.headers["paypal-transmission-sig"];
      if (!signature) return false;

      const expectedHash = crypto
        .createHmac("sha256", PAYPAL_WEBHOOK_SECRET)
        .update(JSON.stringify(req.body))
        .digest("hex");

      return signature === expectedHash;
    } catch (error) {
      console.error("❌ PayPal Webhook Verification Error:", error.message);
      return false;
    }
  }
}

export default PayPalService;

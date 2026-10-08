import Stripe from "stripe";
import dotenv from "dotenv";

dotenv.config();
const stripeClient = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2023-10-16", // Ensure up-to-date API version
});

class StripeService {
  /**
   * Creates a Stripe checkout session for payment processing.
   *
   * @param {number} amount - Amount to charge (in base currency units).
   * @param {string} currency - Currency code (e.g., USD, EUR).
   * @param {string} userId - User ID (if logged in).
   * @param {string} guestEmail - Guest email (if applicable).
   * @param {string} cartId - Cart identifier for tracking.
   * @returns {Object} Transaction details including the checkout URL.
   */
  static async createPaymentSession(
    amount,
    currency,
    userId,
    guestEmail,
    cartId
  ) {
    try {
      const session = await stripeClient.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: [
          {
            price_data: {
              currency: currency.toLowerCase(),
              product_data: { name: "Order Payment" },
              unit_amount: Math.round(amount * 100), // Convert to cents
            },
            quantity: 1,
          },
        ],
        mode: "payment",
        success_url: `${process.env.FRONTEND_URL}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.FRONTEND_URL}/payment-failed`,
        metadata: { userId, cartId, guestEmail },
      });

      return {
        transactionId: session.id,
        paymentUrl: session.url,
        gatewayTransactionId: session.id,
        rawResponse: session,
      };
    } catch (error) {
      console.error("❌ Stripe Payment Error:", error);
      throw new Error("Error initiating Stripe payment.");
    }
  }

  /**
   * Verifies a Stripe payment intent after transaction completion.
   *
   * @param {string} transactionId - The Stripe session ID to verify.
   * @returns {Object} Verification result with payment status.
   */
  static async verifyPayment(transactionId) {
    try {
      const session =
        await stripeClient.checkout.sessions.retrieve(transactionId);

      return {
        success: session.payment_status === "paid",
        paymentIntentId: session.payment_intent,
        gatewayTransactionId: session.id,
        rawResponse: session,
      };
    } catch (error) {
      console.error("❌ Stripe Verification Error:", error);
      throw new Error("Error verifying Stripe payment.");
    }
  }

  /**
   * Processes a refund for a Stripe transaction.
   *
   * @param {string} paymentIntentId - The Stripe payment intent ID.
   * @param {number} amount - Refund amount (optional for partial refunds).
   * @returns {Object} Refund status.
   */
  static async processRefund(paymentIntentId, amount = null) {
    try {
      const refundData = { payment_intent: paymentIntentId };
      if (amount) {
        refundData.amount = Math.round(amount * 100); // Convert to cents
      }

      const refund = await stripeClient.refunds.create(refundData);

      return {
        success: refund.status === "succeeded",
        refundId: refund.id,
        rawResponse: refund,
      };
    } catch (error) {
      console.error("❌ Stripe Refund Error:", error);
      throw new Error("Refund processing failed.");
    }
  }

  /**
   * Validates Stripe webhook signature and returns the event payload.
   *
   * @param {Object} req - The request object containing raw body and headers.
   * @returns {Object|null} The validated Stripe event or null if verification fails.
   */
  static verifyWebhook(req) {
    const signature = req.headers["stripe-signature"];
    try {
      return stripeClient.webhooks.constructEvent(
        req.rawBody,
        signature,
        process.env.STRIPE_WEBHOOK_SECRET
      );
    } catch (error) {
      console.error("❌ Stripe Webhook Verification Error:", error.message);
      return null;
    }
  }
}

export default StripeService;

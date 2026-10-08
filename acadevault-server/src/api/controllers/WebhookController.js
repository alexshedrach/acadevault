import {
  PAYMENT_STATUS,
  PAYMENT_GATEWAYS,
} from "../../constants/enums.js";
import AppError from "../../utils/HandleAppErrors.js";
import Payment from "../models/PaymentModel.js";


// import { PAYMENT_STATUS } from "../../../../shared/constants/enums,js";
// import AppError from "../../utils/HandleAppErrors.js";
// import Payment from "../models/PaymentModel.js";

class WebhookController {
  /**
   * Main entry point for handling payment webhooks from all providers.
   */
  static async handlePaymentWebhook(req, res) {
    const webhookEvent = req.body;

    try {
      // Identify the payment gateway based on request headers or event data.
      const gateway = WebhookController.identifyGateway(req, webhookEvent);
      if (!gateway) throw new AppError("Unknown payment gateway", 400);

      console.log(`Processing ${gateway} webhook event...`);

      // Process the webhook event
      await WebhookController.processGatewayWebhook(gateway, webhookEvent);

      // Send a 200 response to acknowledge receipt of the webhook
      return res.status(200).json({ success: true });
    } catch (error) {
      console.error("Webhook processing error: ", error);
      return res.status(500).json({
        success: false,
        message: error.message || "Webhook handling failed.",
      });
    }
  }

  /**
   * Determines the payment gateway based on request headers or payload.
   */
  static identifyGateway(req, webhookEvent) {
    if (req.headers["stripe-signature"]) return PAYMENT_GATEWAYS.STRIPE;
    if (webhookEvent.event_type?.startsWith("PAYMENT."))
      return PAYMENT_GATEWAYS.PAYPAL;
    if (webhookEvent.event === "charge.success")
      return PAYMENT_GATEWAYS.PAYSTACK;
    if (webhookEvent.data?.status) return PAYMENT_GATEWAYS.FLUTTERWAVE;
    return null;
  }

  /**
   * Processes the webhook event based on the payment gateway.
   */
  static async processGatewayWebhook(gateway, event) {
    const transactionId = WebhookController.extractTransactionId(
      gateway,
      event
    );
    const paymentStatus = WebhookController.extractPaymentStatus(
      gateway,
      event
    );
    const gatewayResponse = event;

    // Retrieve payment record from DB
    const payment = await Payment.findOne({
      gatewayTransactionId: transactionId,
    });
    if (!payment) throw new AppError("Payment record not found.", 404);

    // Update payment status in DB
    payment.paymentStatus = paymentStatus
      ? PAYMENT_STATUS.SUCCESS
      : PAYMENT_STATUS.FAILED;
    payment.gatewayResponse = gatewayResponse;

    await payment.save();
  }

  /**
   * Extracts transaction ID from webhook data based on gateway.
   */
  static extractTransactionId(gateway, event) {
    switch (gateway) {
      case PAYMENT_GATEWAYS.STRIPE:
        return event.data.object.id;
      case PAYMENT_GATEWAYS.PAYPAL:
        return event.resource.id;
      case PAYMENT_GATEWAYS.PAYSTACK:
        return event.data.transaction_id;
      case PAYMENT_GATEWAYS.FLUTTERWAVE:
        return event.data.tx_ref;
      default:
        throw new AppError("Unsupported payment gateway.", 400);
    }
  }

  /**
   * Determines if the payment was successful based on webhook data.
   */
  static extractPaymentStatus(gateway, event) {
    switch (gateway) {
      case PAYMENT_GATEWAYS.STRIPE:
        return event.data.object.payment_status === "paid";
      case PAYMENT_GATEWAYS.PAYPAL:
        return event.resource.state === "COMPLETED";
      case PAYMENT_GATEWAYS.PAYSTACK:
        return event.data.status === "success";
      case PAYMENT_GATEWAYS.FLUTTERWAVE:
        return event.data.status === "successful";
      default:
        throw new AppError("Unsupported payment gateway.", 400);
    }
  }
}

export default WebhookController;

// class WebhookController {
//   /**
//    * Webhook handler to process incoming payment updates from different payment gateways.
//    */
//   static async handlePaymentWebhook(req, res) {
//     const webhookEvent = req.body;

//     try {
//       // Handle Stripe Webhook
//       if (webhookEvent.type === "checkout.session.completed") {
//         await WebhookController.handleStripeWebhook(webhookEvent);
//       }
//       // Handle PayPal Webhook (example event type)
//       else if (webhookEvent.event_type === "PAYMENT.SALE.COMPLETED") {
//         await WebhookController.handlePayPalWebhook(webhookEvent);
//       }
//       // Handle PayStack Webhook
//       else if (webhookEvent.event === "charge.success") {
//         await WebhookController.handlePaystackWebhook(webhookEvent);
//       }
//       // Handle Flutterwave Webhook
//       else if (webhookEvent.data.status === "successful") {
//         await WebhookController.handleFlutterwaveWebhook(webhookEvent);
//       } else {
//         throw new AppError("Unsupported payment gateway or event type.", 400);
//       }

//       // Respond with 200 OK to acknowledge receipt of webhook
//       return res.status(200).json({ success: true });
//     } catch (error) {
//       console.error("Webhook processing error: ", error);
//       // Handle errors appropriately and respond
//       return res.status(500).json({
//         success: false,
//         message: "Webhook handling failed.",
//       });
//     }
//   }

//   /**
//    * Handle Stripe Webhook events.
//    *
//    * @param {Object} stripeEvent The Stripe webhook event.
//    */
//   static async handleStripeWebhook(stripeEvent) {
//     const session = stripeEvent.data.object; // The session object
//     const paymentIntentId = session.payment_intent;
//     const paymentStatus = session.payment_status;
//     const gatewayTransactionId = session.id;

//     const payment = await Payment.findOne({ gatewayTransactionId });
//     if (!payment) {
//       throw new AppError(
//         "Payment not found for the provided transaction ID.",
//         404
//       );
//     }

//     if (paymentStatus === "paid") {
//       await Payment.findByIdAndUpdate(payment._id, {
//         paymentStatus: PAYMENT_STATUS.SUCCESS,
//         amountPaid: session.amount_total / 100, // Assuming amount is in cents
//         currency: session.currency.toUpperCase(),
//         gatewayResponse: stripeEvent.data.object,
//       });
//     } else {
//       await Payment.findByIdAndUpdate(payment._id, {
//         paymentStatus: PAYMENT_STATUS.FAILED,
//       });
//     }
//   }

//   /**
//    * Handle PayPal Webhook events.
//    *
//    * @param {Object} paypalEvent The PayPal webhook event.
//    */
//   static async handlePayPalWebhook(paypalEvent) {
//     const transactionId = paypalEvent.resource.id;
//     const paymentStatus = paypalEvent.resource.state;
//     const gatewayTransactionId = transactionId;

//     const payment = await Payment.findOne({ gatewayTransactionId });
//     if (!payment) {
//       throw new AppError(
//         "Payment not found for the provided transaction ID.",
//         404
//       );
//     }

//     if (paymentStatus === "COMPLETED") {
//       await Payment.findByIdAndUpdate(payment._id, {
//         paymentStatus: PAYMENT_STATUS.SUCCESS,
//         gatewayResponse: paypalEvent.resource,
//       });
//     } else {
//       await Payment.findByIdAndUpdate(payment._id, {
//         paymentStatus: PAYMENT_STATUS.FAILED,
//       });
//     }
//   }

//   /**
//    * Handle Paystack Webhook events.
//    *
//    * @param {Object} paystackEvent The Paystack webhook event.
//    */
//   static async handlePaystackWebhook(paystackEvent) {
//     const paymentTransactionId = paystackEvent.data.transaction_id;
//     const paymentStatus = paystackEvent.data.status;
//     const gatewayTransactionId = paymentTransactionId;

//     const payment = await Payment.findOne({ gatewayTransactionId });
//     if (!payment) {
//       throw new AppError(
//         "Payment not found for the provided transaction ID.",
//         404
//       );
//     }

//     if (paymentStatus === "success") {
//       await Payment.findByIdAndUpdate(payment._id, {
//         paymentStatus: PAYMENT_STATUS.SUCCESS,
//         gatewayResponse: paystackEvent.data,
//       });
//     } else {
//       await Payment.findByIdAndUpdate(payment._id, {
//         paymentStatus: PAYMENT_STATUS.FAILED,
//       });
//     }
//   }

//   /**
//    * Handle Flutterwave Webhook events.
//    *
//    * @param {Object} flutterwaveEvent The Flutterwave webhook event.
//    */
//   static async handleFlutterwaveWebhook(flutterwaveEvent) {
//     const paymentTransactionId = flutterwaveEvent.data.tx_ref;
//     const paymentStatus = flutterwaveEvent.data.status;
//     const gatewayTransactionId = flutterwaveEvent.data.tx_ref;

//     const payment = await Payment.findOne({ gatewayTransactionId });
//     if (!payment) {
//       throw new AppError(
//         "Payment not found for the provided transaction ID.",
//         404
//       );
//     }

//     if (paymentStatus === "successful") {
//       await Payment.findByIdAndUpdate(payment._id, {
//         paymentStatus: PAYMENT_STATUS.SUCCESS,
//         gatewayResponse: flutterwaveEvent.data,
//       });
//     } else {
//       await Payment.findByIdAndUpdate(payment._id, {
//         paymentStatus: PAYMENT_STATUS.FAILED,
//       });
//     }
//   }
// }

// export default WebhookController;

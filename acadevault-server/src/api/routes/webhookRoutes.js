// routes/webhookRoutes.js

import express from "express";
import WebhookController from "../controllers/webhookController.js";


const router = express.Router();

/**
 * Webhook endpoint for receiving payment status updates from gateways.
 * Handles payment events such as successful payments, failed payments, etc.
 */
router.post("/payment/webhook", WebhookController.handlePaymentWebhook);

export default router;

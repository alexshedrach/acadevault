import express from 'express';
import { checkPaymentStatus, handleWebhook, verifyPaymentCallback } from '../controllers/PaymentController.js';

const router = express.Router();

const injectGateway = (gateway) => (req, res, next) => {
  req.params.gateway = gateway;
  next();
};

router.post(
  '/webhook/paystack',
  express.raw({ type: '*/*' }),
  injectGateway('paystack'),
  handleWebhook
);

router.post(
  '/webhook/:gateway',
  express.json(), // For Flutterwave or Stripe JSON webhooks
  handleWebhook
);

router.get('/callback', verifyPaymentCallback); // GET /payment/callback
router.get('/redirect', checkPaymentStatus);     // GET /api/payment/status

export const paymentRoutes = router;

import express from 'express';
import {
  cancelCheckout,
  completeCheckout,
  initiateCheckout,
  selectPaymentGateway,
} from '../controllers/CheckoutController.js';
import { maybeProtectRoutes } from '../middlewares/maybeProtectRoutes.js';

// Express Router Initialization
const router = express.Router();

// Optionally protecting routes that needs authentication
router.use(maybeProtectRoutes);

router.route('/select-gateway').post(selectPaymentGateway);

router.route('/initiate').post(initiateCheckout);

router.route('/complete').post(completeCheckout);

router.route('/cancel').post(cancelCheckout);

// Exporting the Router
export const checkoutRoutes = router;

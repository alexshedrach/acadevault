import express from 'express';
import {
  createOrder,
  getOrderById,
  updateOrderStatus,
  cancelOrder,
} from '../controllers/OrderController.js';
import { USER_ROLES } from '../../constants/enums.js';
import { protectRoutes } from '../middlewares/authMiddleware.js';
import { optionalAuth } from '../middlewares/maybeProtectRoutes.js';

const router = express.Router();

// Public (guest) or authenticated
router.route('/').post(optionalAuth, createOrder);

router.route('/:orderId').get(optionalAuth, getOrderById);

router.route('/:orderId/cancel').post(optionalAuth, cancelOrder);

// Authenticated and Admin Routes.
router.use(protectRoutes, USER_ROLES.ADMIN);

router.route('/:orderId/status').patch(updateOrderStatus); // Admin only

export const orderRoutes = router;

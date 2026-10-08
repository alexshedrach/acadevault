import express from 'express';
import {
  createPrice,
  deactivatePrices,
  getEffectivePrice,
  listPrices,
  createPromoPrice,
  deactivatePriceById,
  checkPromoActive,
  getPromoStatus,
  getPriceRange,
} from '../controllers/PriceController.js';
import { protectRoutes, restrictTo } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Protected routes for managing prices
router.route('/').post(protectRoutes, createPrice); // Create a price (role-based validation inside)

router.route('/current-price').get(getEffectivePrice); // Public access — Get current effective price
router.route('/price-range').get(getPriceRange);

router.route('/lists').get(protectRoutes, listPrices); // List all active prices for a material

router.route('/promo').post(protectRoutes, createPromoPrice); // Create a promotional price

router.get('/materials/:materialId/promo-status', getPromoStatus);

router
  .route('/deactivate/:priceId')
  .patch(protectRoutes, restrictTo('Admin', 'Seller'), deactivatePriceById); // Deactivate specific price

router.route('/promo-status').get(checkPromoActive); // Check if promotional price is active (public)

router
  .route('/deactivate')
  .post(protectRoutes, restrictTo('Admin'), deactivatePrices); // Bulk deactivate prices by materialId + currency

export const priceRouter = router;

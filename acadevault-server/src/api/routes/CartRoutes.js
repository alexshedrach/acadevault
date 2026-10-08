import express from 'express';
import {
  addItemToCart,
  applyDiscount,
  getCartItems,
  getCartSummary,
  mergeGuestCart,
  removeItemFromCart,
  updateItemQuantity,
} from '../controllers/CartController.js';
import { maybeProtectRoutes } from '../middlewares/maybeProtectRoutes.js';

const router = express.Router();

// Optionally protecting routes that needs authentication
router.use(maybeProtectRoutes);

// Public and protected routes for cart management
router.route('/').get(getCartItems).post(addItemToCart); // Add an item to the cart (public access for guests)

// Route for updating the quantity of an item in the cart
router.route('/items/:materialId').patch(updateItemQuantity).delete(removeItemFromCart);

router.route('/merge').post(mergeGuestCart);

// Route for retrieving cart summary
router.route('/summary').get(getCartSummary);

// Route for applying a discount code
router.route('/apply-discount').post(applyDiscount);

// Route for checkout initiation
// router
//   .route("/initiate-checkout")
//   .post(protectRoutes, initiateCheckoutController);

// Route for completing checkout
// router.route("/checkout").post(protectRoutes, completeCheckout);

export const cartRouter = router;

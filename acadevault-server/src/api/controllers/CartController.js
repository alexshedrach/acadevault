import mongoose from 'mongoose';
import { formatCartForClient } from '../../services/cart/CartSerializer.js';
import cartService from '../../services/cart/cartServiceFactory.js';
import DiscountService from '../../services/discount/DiscountService.js';
import { catchAsyncErrors } from '../../utils/catchAsyncErrors.js';
import { generateGuestEmail } from '../../utils/generators.js';
import AppError from '../../utils/HandleAppErrors.js';
import { logger } from '../../utils/logger.js';
import AcademicMaterial from '../models/AcademicMaterialModel.js';
import {
  addItemSchema,
  getOptionalShopIdSchema,
  mergeGuestCartSchema,
  updateItemQuantitySchema,
} from '../validations/cartValidation.js';
import { applyDiscountSchema } from '../validations/discountValidator.js';
// ─── Helpers ─────────────────────────────────────────────────────────────

/**
 * Ensure a string is a valid Mongo ObjectId.
 */
function assertObjectId(id, name) {
  if (!mongoose.isValidObjectId(id)) {
    throw new AppError(`Invalid ${name} format.`, 400);
  }
}

/**
 * Determine identity: logged‑in user or guestEmail cookie.
 * If neither exists, issue a new guestEmail cookie.
 */
function resolveIdentity(req, res) {
  const userId = req.user?.id || null;
  let guestEmail = req.cookies?.guestEmail || null;

  if (!userId && !guestEmail) {
    guestEmail = `guest_${Date.now()}@acadevault.local`;
    res.cookie('guestEmail', guestEmail, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Lax',
    });
  }

  return { userId, guestEmail };
}

// ─── GET /api/cart/items ──────────────────────────────────────────────────
export const getCartItems = catchAsyncErrors(async (req, res) => {
  // 1️⃣ Optional shopId filter
  const { shopId } = req.query;
  if (shopId) assertObjectId(shopId, 'shopId');

  // 2️⃣ Resolve who this is for
  const { userId, guestEmail } = resolveIdentity(req, res);

  // 3️⃣ Fetch the cart without populating material (we use snapshots)
  const cart = await cartService.getActiveCart(
    { userId, guestEmail, guestCartId: req.cookies?.guestCartId },
    { populateDetails: true } // still want coupons & address
  );

  // 4️⃣ If no cart or no items, return empty structure
  if (!cart || !Array.isArray(cart.items) || cart.items.length === 0) {
    return res.status(200).json({
      status: 'success',
      data: {
        cartId: cart?._id || null,
        items: [],
        totalCount: 0,
        totals: {
          subTotal: '0.00',
          discountTotal: '0.00',
          taxTotal: '0.00',
          shippingFee: '0.00',
          grandTotal: '0.00',
        },
      },
    });
  }

  // 5️⃣ If shopId was passed, filter items & recompute totals
  let displayCart = cart;
  if (shopId) {
    displayCart = cart.toObject(); // shallow clone
    displayCart.items = cart.items.filter((it) => it.materialSnapshot._id.toString() === shopId);
    displayCart.status = CART_STATUS.ACTIVE; // keep status
    // Recompute totals for this subset
    await cartService.recomputeCartTotalsForSubset(displayCart);
  }

  // 6️⃣ Format for client
  const formatted = formatCartForClient(displayCart);
  return res.status(200).json({ status: 'success', data: formatted });
});

// ─── POST /api/cart/items ─────────────────────────────────────────────────
export const addItemToCart = catchAsyncErrors(async (req, res) => {
  // 1️⃣ Validate body at the Joi/schema layer
  const { shopId, materialId, quantity } = req.body;
  if (!shopId || !materialId) {
    throw new AppError('shopId and materialId are both required.', 400);
  }
  assertObjectId(shopId, 'shopId');
  assertObjectId(materialId, 'materialId');
  if (quantity == null || quantity < 1) {
    throw new AppError('Quantity must be at least 1.', 400);
  }

  // 2️⃣ Who is calling?
  const { userId, guestEmail } = resolveIdentity(req, res);
  const currency = req.headers['x-currency'] || 'NGN';
  const region = req.headers['x-region'] || null;

  // 4️⃣ Delegate to service
  const cart = await cartService.addItemToCart({
    userId,
    guestEmail,
    shopId,
    materialId,
    quantity,
    currency,
    region,
  });

  // 5️⃣ Format & return the fresh cart state
  const formatted = formatCartForClient(cart);
  return res.status(200).json({ status: 'success', data: formatted });
});

// ─── PATCH /api/cart/items/:materialId ───────────────────────────────
export const updateItemQuantity = catchAsyncErrors(async (req, res) => {
  const { materialId } = req.params;
  const { cartId, quantity } = req.body;

  // Validate IDs & payload
  if (!mongoose.isValidObjectId(materialId)) {
    throw new AppError('Invalid materialId format.', 400);
  }
  if (!mongoose.isValidObjectId(cartId)) {
    throw new AppError('Invalid cartId format.', 400);
  }
  if (!Number.isInteger(quantity) || quantity < 0) {
    throw new AppError('Quantity must be an integer ≥ 0.', 400);
  }

  // Resolve identity
  const { userId, guestEmail } = resolveIdentity(req, res);

  // Delegate
  const updatedCart = await cartService.updateCartItemQuantity({
    userId,
    guestEmail,
    cartId,
    materialId,
    newQuantity: quantity,
  });

  // Format & return
  const formatted = formatCartForClient(updatedCart);
  res.status(200).json({ status: 'success', data: formatted });
});

// ─── DELETE /api/cart/items/:materialId ─────────────────────────────
export const removeItemFromCart = catchAsyncErrors(async (req, res) => {
  const { materialId } = req.params;
  const { cartId } = req.body;

  if (!mongoose.isValidObjectId(materialId)) {
    throw new AppError('Invalid materialId format.', 400);
  }
  if (!mongoose.isValidObjectId(cartId)) {
    throw new AppError('Invalid cartId format.', 400);
  }

  const { userId, guestEmail } = resolveIdentity(req, res);
  const updatedCart = await cartService.removeCartItem({
    userId,
    guestEmail,
    cartId,
    materialId,
  });

  const formatted = formatCartForClient(updatedCart);
  res.status(200).json({ status: 'success', data: formatted });
});

/**
 * POST /api/cart/merge
 * Merges a guest cart into a user's cart upon login.
 * @param {Object} req - Express request object with body { guestEmail }
 * @param {Object} res - Express response object
 * @returns {Object} JSON response with the merged cart
 * @throws {AppError} If user is not authenticated or guestEmail is invalid
 */
export const mergeGuestCart = catchAsyncErrors(async (req, res) => {
  // Validate input
  const { error, value } = mergeGuestCartSchema.validate(req.body);
  if (error) throw new AppError(error.message, 400);

  const { guestEmail } = value;
  const userId = req.user?.id;

  if (!userId) throw new AppError('Authentication required', 401);

  // Perform merge
  const mergedCart = await cartService.mergeGuestCart({ guestEmail, userId });

  // Clear guestEmail cookie
  res.clearCookie('guestEmail');

  logger.info(`Merged guest cart into user cart`, {
    userId,
    guestEmail,
    cartId: mergedCart._id,
  });

  res.status(200).json({
    status: 'success',
    data: mergedCart,
  });
});

/**
 * GET /api/cart/summary
 * Returns the currently active cart with full summary:
 * items, totals, discounts, currency, etc.
 *
 * Supports both authenticated and guest users.
 */
export const getCartSummary = catchAsyncErrors(async (req, res) => {
  const userId = req.user?.id || null;
  const guestEmail = req.cookies?.guestEmail || null;
  // const shopId = req.query.shopId;

  // 1️⃣ Validate identity
  if (!userId && !guestEmail) {
    throw new AppError('User or guest identity is required.', 400);
  }

  // 2️⃣ Validate shopId
  // if (!shopId || !shopId.match(/^[0-9a-fA-F]{24}$/)) {
  //   throw new AppError("shopId is required and must be a valid ObjectId.", 400);
  // }

  // 3️⃣ Pricing context
  const currency = req.headers['x-currency'] || 'NGN';
  const region = req.headers['x-region'] || null;

  // 4️⃣ Delegate to service with shopId
  const summary = await cartService.getCartSummary({
    userId,
    guestEmail,
    // shopId,
    currency,
    region,
  });

  logger.info('Cart summary retrieved', {
    userId,
    guestEmail,
    // shopId,
    cartId: summary?.cartId,
  });

  return res.status(200).json({ status: 'success', data: summary });
});

// Controller: Apply a discount coupon to the current cart
export const applyDiscount = catchAsyncErrors(async (req, res, next) => {
  // 1. Validate incoming request body
  const { error, value } = applyDiscountSchema.validate(req.body);
  if (error) throw new AppError(error.message, 400);

  // const discountCode = value.discountCode;
  const discountCode = value.discountCode.trim().toUpperCase();
  console.log(discountCode);

  // 2. Identify user context (either registered or guest)
  const userId = req.user?.id || null;
  const guestEmail = req.cookies?.guestEmail || null;

  let cart;

  // 3. Attempt to fetch active cart based on user type
  if (userId) {
    cart = await cartService.getActiveCart({ userId });
  } else if (guestEmail) {
    cart = await cartService.getActiveCart({ guestEmail });
  }

  // 4. Ensure a valid, non-empty cart exists before applying coupon
  if (!cart || cart.items.length === 0) {
    throw new AppError('Cannot apply coupon to an empty cart.', 400);
  }

  let updatedCartDoc;

  // 5. Attempt to apply the discount via DiscountService
  try {
    const { cart: savedCart /*, discountAmount, message*/ } = await DiscountService.applyDiscount({
      cartId: cart._id.toString(),
      discountCode,
    });
    updatedCartDoc = savedCart;
  } catch (err) {
    // 6. Log failure and rethrow error for global handler
    logger.warn(`Coupon application failed: ${err.message}`, {
      cartId: cart._id.toString(),
      discountCode,
      userId,
      guestEmail,
    });
    throw err;
  }

  // 7. Respond with updated cart pricing details
  res.status(200).json({
    status: 'success',
    data: {
      cartId: updatedCartDoc._id,
      subtotal: parseFloat(updatedCartDoc.subtotal.toString()),
      totalDiscount: parseFloat(updatedCartDoc.totalDiscount),
      taxes: parseFloat(updatedCartDoc.taxes.toString()),
      shippingFee: parseFloat(updatedCartDoc.shippingFee.toString()),
      total: parseFloat(updatedCartDoc.totalWithShipping),
      appliedCoupons: updatedCartDoc.appliedCoupons,
    },
  });
});

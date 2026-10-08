import { formatCartForClient } from '../../services/cart/CartSerializer.js';
import CheckoutService from '../../services/checkout/CheckoutService.js';
import { catchAsyncErrors } from '../../utils/catchAsyncErrors.js';
import AppError from '../../utils/HandleAppErrors.js';
import { logger } from '../../utils/logger.js';

/**
 * @desc Select a payment gateway and method for the cart
 * @route POST /api/payment/select-gateway
 * @access Public or Private
 */
export const selectPaymentGateway = catchAsyncErrors(async (req, res) => {
  const {
    cartId,
    paymentGateway,
    paymentMethod = null,
    guestEmail,
    guestFullName,
    guestPhoneNumber,
  } = req.body;
  const userId = req.user?.id || null;

  if (!cartId || !paymentGateway) {
    throw new AppError('Missing cartId or paymentGateway', 400);
  }

  const result = await CheckoutService.selectPaymentGateway({
    cartId,
    userId,
    paymentGateway,
    paymentMethod,
    isGuest: !userId,
    guestEmail,
    guestFullName,
    guestPhoneNumber,
  });

  logger.info('Payment gateway selection updated', {
    cartId,
    userId: userId || 'guest',
    gateway: paymentGateway,
    method: result.cart.paymentMethod,
  });

  res.status(200).json({
    status: 'success',
    message: 'Payment gateway selected successfully',
    data: {
      cart: result.cart,
      availableMethods: result.availableMethods,
    },
  });
});

/**
 * @desc Initiate the checkout process
 * @route POST /api/payment/initiate
 * @access Public or Private (guest or logged in)
 */
export const initiateCheckout = catchAsyncErrors(async (req, res) => {
  const { cartId, idempotencyKey = null } = req.body;
  const userId = req.user?.id || null;

  if (!cartId) {
    throw new AppError('cartId is required', 400);
  }

  // 🔒 Never trust isGuest from client — determine it securely here
  const isGuest = !userId;

  const result = await CheckoutService.initiateCheckout({
    cartId,
    userId,
    isGuest,
    idempotencyKey,
  });

  logger.info('Checkout initiated', {
    cartId,
    userId: userId || 'guest',
    orderId: result?.order?._id,
    transactionRef: result?.paymentInfo?.transactionRef,
  });

  res.status(200).json({
    status: 'success',
    message: 'Checkout initiated',
    data: result,
  });
});

/**
 * @desc Complete checkout after payment is successful
 * @route POST /api/payment/complete
 * @access Public or Private (guests or users)
 */
export const completeCheckout = catchAsyncErrors(async (req, res) => {
  const { cartId, transactionRef } = req.body;
  const userId = req.user?.id || null;
  const isGuest = !userId;

  if (!cartId || !transactionRef) {
    throw new AppError('cartId and transactionRef are required', 400);
  }

  const result = await CheckoutService.completeCheckout({
    cartId,
    userId,
    isGuest,
    transactionRef,
  });

  logger.info('Checkout completed successfully', {
    cartId,
    userId: userId || 'guest',
    transactionRef,
    orderId: result?.order?._id,
  });

  return res.status(200).json({
    status: 'success',
    message: 'Checkout completed successfully',
    data: {
      cart: result.cart,
      order: result.order,
    },
  });
});

/**
 * @desc Cancel an in-progress checkout
 * @route POST /api/payment/cancel
 * @access Public or Private (guests or users)
 */
export const cancelCheckout = catchAsyncErrors(async (req, res) => {
  const { cartId } = req.body;
  const userId = req.user?.id || null;
  const isGuest = !userId;

  // 1️⃣ Validate required input
  if (!cartId || typeof cartId !== 'string') {
    throw new AppError('Valid cartId is required to cancel checkout', 400);
  }

  // 2️⃣ Attempt to cancel
  const cart = await CheckoutService.cancelCheckout({
    cartId,
    userId,
    isGuest,
  });

  // 3️⃣ Log event
  logger.info('Checkout cancelled', {
    cartId,
    userId: userId || 'guest',
    cartStatus: cart.status,
  });

  // 4️⃣ Return success
  return res.status(200).json({
    status: 'success',
    message: 'Checkout cancelled successfully',
    data: {
      cart,
    },
  });
});

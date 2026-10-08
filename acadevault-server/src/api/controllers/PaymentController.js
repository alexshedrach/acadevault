import mongoose from 'mongoose';
import Cart from '../../api/models/CartModel.js';
import Payment from '../../api/models/PaymentModel.js';
import Transaction from '../../api/models/TransactionModel.js';
import {
  CART_STATUS,
  ORDER_STATUS,
  PAYMENT_GATEWAYS,
  PAYMENT_STATUS,
  TRANSACTION_STATUSES,
} from '../../constants/enums.js';
import { catchAsyncErrors } from '../../utils/catchAsyncErrors.js';
import { toDecimal128 } from '../../utils/numberUtils.js';
import AppError from '../../utils/HandleAppErrors.js';
import { logger } from '../../utils/logger.js';
import CartStockService from '../../services/cart/CartStockService.js';
import OrderService from '../../services/order/OrderService.js';
import PaymentWebhookService from '../../services/payment/webhook/PaymentWebhookService.js';
import PaymentService from '../../services/payment/PaymentService.js';

/**
 * @desc    Receives webhook events from supported gateways (Paystack, Stripe, Flutterwave)
 * @route   POST /api/v2/payment/webhook/:gateway
 * @access  Public
 */
export const handleWebhook = catchAsyncErrors(async (req, res, next) => {
  const { gateway: gatewayParam } = req.params;
  const rawBody = req.body; // Buffer from express.raw()
  const gatewayKey = gatewayParam?.toUpperCase();

  // ─── 1) Validate gateway ───────────────────────────────────────
  if (!Object.prototype.hasOwnProperty.call(PAYMENT_GATEWAYS, gatewayKey)) {
    throw new AppError(`Unsupported payment gateway: ${gatewayParam}`, 400);
  }

  const gatewayName = PAYMENT_GATEWAYS[gatewayKey];

  // ─── 2) Extract signature header ──────────────────────────────
  const signatureHeaderMap = {
    [PAYMENT_GATEWAYS.PAYSTACK]: 'x-paystack-signature',
    [PAYMENT_GATEWAYS.STRIPE]: 'stripe-signature',
    [PAYMENT_GATEWAYS.FLUTTERWAVE]: 'verif-hash',
  };

  const signatureHeader = signatureHeaderMap[gatewayName];
  const signature = req.get(signatureHeader);

  if (!signature) {
    throw new AppError(`Missing signature header: ${signatureHeader}`, 400);
  }

  // ─── 3) Resolve webhook secret from ENV ───────────────────────
  const secretEnvKey = `${gatewayKey}_WEBHOOK_SECRET`;
  const secret = process.env[secretEnvKey];

  if (!secret) {
    throw new AppError(`Webhook secret not configured for ${gatewayName}`, 500);
  }

  // ─── 4) Verify signature & parse payload ──────────────────────
  const { verified: parsedPayload } = await PaymentWebhookService.verifyAndParse({
    gateway: gatewayName,
    rawBody,
    signature,
    secret,
  });

  // ─── 5) Process logic in a DB transaction ─────────────────────
  const result = await PaymentWebhookService.processWebhook({
    gateway: gatewayName,
    body: parsedPayload,
    signature,
    secret,
    rawBody,
  });

  console.log('typeof req.body:', typeof req.body);
  console.log('Is Buffer:', Buffer.isBuffer(req.body));
  console.log('First few bytes of body:', req.body?.subarray?.(0, 20)?.toString());

  // ─── 6) Acknowledge successful receipt ────────────────────────
  logger.info('Webhook successfully handled', {
    gateway: gatewayName,
    result,
  });

  return res.status(200).json({
    status: 'success',
    received: true,
    result,
  });
});

/**
 * @desc Redirect user after gateway callback (client-side)
 * @route GET /payment/callback
 * @access Public
 */
export const verifyPaymentCallback = catchAsyncErrors(async (req, res, next) => {
  const { reference, ref, idempotencyKey } = req.query;
  const transactionRef = reference || ref;
  if (!transactionRef) {
    logger.warn('Missing transaction reference on callback', { query: req.query });
    return res.redirect(`${process.env.CLIENT_BASE_URL}/payment/failed?reason=missing_reference`);
  }

  const payment = await Payment.findOne({ gatewayTransactionId: transactionRef });
  if (!payment) {
    logger.warn('Payment record not found on callback', { transactionRef });
    return res.redirect(`${process.env.CLIENT_BASE_URL}/payment/failed?reason=payment_not_found`);
  }

  // Delegate to service to verify details & build redirect URL
  const redirectUrl = await PaymentService.verifyPaymentCallback({
    transactionRef,
    gatewayKey: payment.paymentGateway,
    idempotencyKey,
  });

  return res.redirect(redirectUrl);
});

/**
 * @desc Poll payment/order status
 * @route GET /api/payment/status
 * @access Public (for client‑side polling)
 */
export const checkPaymentStatus = catchAsyncErrors(async (req, res) => {
  // accept ?ref=… or ?reference=… or ?trxref=…
  const transactionRef = req.query.ref || req.query.reference || req.query.trxref;
  const idempotencyKey = req.query.idempotencyKey;

  if (!transactionRef) {
    throw new AppError('Missing transaction reference', 400);
  }

  // look up the payment and infer its gateway
  const payment = await Payment.findOne({ gatewayTransactionId: transactionRef });
  if (!payment) {
    throw new AppError(`Payment not found for reference: ${transactionRef}`, 404);
  }
  const gatewayKey = payment.paymentGateway;

  // now delegate to the service
  const result = await PaymentService.checkPaymentStatus({
    transactionRef,
    gatewayKey,
    idempotencyKey,
  });

  return res.status(200).json({
    status: 'success',
    data: result,
  });
});

/**
 * @desc Manually mark a payment as successful (admin use only)
 * @route POST /api/admin/payment/manual-verify
 * @access Admin
 */
export const manualVerifyPayment = catchAsyncErrors(async (req, res) => {
  const { transactionId, adminNote = '' } = req.body;
  const adminId = req.user?.id;

  if (!transactionId) throw new AppError('Transaction ID is required', 400);
  if (!adminId) throw new AppError('Admin authentication required', 401);

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // Fetch payment & transaction
    const payment = await Payment.findOne({ transactionId }).populate('orderId').session(session);

    if (!payment) throw new AppError('Payment not found', 404);

    const transaction = await Transaction.findOne({ transactionId: payment.transaction }).session(
      session
    );
    if (!transaction) throw new AppError('Associated transaction not found', 404);

    // Idempotency: skip if already verified
    if (payment.paymentStatus === PAYMENT_STATUS.SUCCESS) {
      logger.warn('Payment already verified', { transactionId, adminId });
      await session.commitTransaction();
      return res.status(200).json({
        status: 'success',
        message: 'Payment already verified',
        data: {
          transactionId: payment.transactionId,
          paymentStatus: payment.paymentStatus,
          orderId: payment.orderId?._id,
        },
      });
    }

    // 1. Update payment
    payment.paymentStatus = PAYMENT_STATUS.SUCCESS;
    payment.manualVerified = true;
    payment.adminNote = adminNote;
    payment.verifiedBy = adminId;
    payment.verifiedAt = new Date();
    await payment.save({ session });

    // 2. Update transaction
    transaction.status = TRANSACTION_STATUSES.COMPLETED;
    transaction.statusHistory.push({
      status: TRANSACTION_STATUSES.COMPLETED,
      changedAt: new Date(),
      changedBy: adminId,
      reason: `Manually verified by admin: ${adminNote || 'No note provided'}`,
    });
    await transaction.save({ session });

    // 3. Update order
    await OrderService.updateOrderStatus(
      {
        orderId: payment.orderId,
        status: ORDER_STATUS.COMPLETED,
        note: `Manually verified by admin: ${adminNote || 'No note provided'}`,
      },
      session
    );

    // 4. Deduct stock for physical items (if any)
    const cart = await Cart.findById(transaction.metadata?.cartId)
      .populate('items.material')
      .session(session);

    if (cart) {
      for (const item of cart.items) {
        if (!item.digitalDownload) {
          const availableQty = item.material.physicalContent?.stockQty || 0;
          if (availableQty < item.quantity) {
            throw new AppError(`Insufficient stock for ${item.material.title}`, 400);
          }
          await CartStockService.deductStock(item.material._id, item.quantity, session);
        }
      }
    }

    // 5. Notify user
    const email =
      payment.guestEmail || (await mongoose.model('User').findById(transaction.user))?.email;
    // if (email) {
    //   await NotificationService.sendOrderConfirmation({
    //     orderId: payment.orderId,
    //     userId: transaction.user,
    //     email,
    //   });
    // } else {
    //   logger.warn('No email found for notification', { transactionId, adminId });
    // }

    await session.commitTransaction();

    logger.info('Manual payment verification complete', {
      transactionId,
      paymentId: payment._id,
      orderId: payment.orderId?._id,
      cartId: transaction.metadata?.cartId,
      adminId,
    });

    res.status(200).json({
      status: 'success',
      message: 'Payment manually verified',
      data: {
        transactionId: payment.transactionId,
        paymentStatus: payment.paymentStatus,
        orderId: payment.orderId?._id,
      },
    });
  } catch (err) {
    await session.abortTransaction();
    logger.error('Manual verification failed', {
      transactionId,
      adminId,
      error: err.message,
      stack: err.stack,
    });
    throw err;
  } finally {
    session.endSession();
  }
});

/**
 * @desc Flag a payment as disputed or reversed (admin use)
 * @route POST /api/admin/payment/flag
 * @access Admin
 */
export const flagPaymentAsDisputed = catchAsyncErrors(async (req, res) => {
  const { transactionId, reason } = req.body;
  const adminId = req.user?.id;

  if (!transactionId || !reason) throw new AppError('Transaction ID and reason are required', 400);
  if (!adminId) throw new AppError('Admin authentication required', 401);

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // Fetch payment & transaction
    const payment = await Payment.findOne({ transactionId }).populate('orderId').session(session);
    if (!payment) throw new AppError('Payment not found', 404);

    const transaction = await Transaction.findOne({ transactionId: payment.transaction }).session(
      session
    );
    if (!transaction) throw new AppError('Associated transaction not found', 404);

    // Idempotency check
    if (payment.isFlagged) {
      logger.warn('Payment already flagged', { transactionId, adminId });
      await session.commitTransaction();
      return res.status(200).json({
        status: 'success',
        message: 'Payment already flagged',
        data: {
          transactionId: payment.transactionId,
          flagReason: payment.flagReason,
          orderId: payment.orderId?._id,
        },
      });
    }

    // 1. Update payment
    payment.isFlagged = true;
    payment.flagReason = reason;
    payment.flaggedBy = adminId;
    payment.flaggedAt = new Date();
    payment.paymentStatus =
      payment.paymentStatus === PAYMENT_STATUS.SUCCESS
        ? PAYMENT_STATUS.REVERSED
        : PAYMENT_STATUS.FAILED;
    await payment.save({ session });

    // 2. Update transaction
    transaction.status = TRANSACTION_STATUSES.FAILED;
    transaction.statusHistory.push({
      status: TRANSACTION_STATUSES.FAILED,
      changedAt: new Date(),
      changedBy: adminId,
      reason: `Flagged as disputed by admin: ${reason}`,
    });
    await transaction.save({ session });

    // 3. Update order
    await OrderService.updateOrderStatus(
      {
        orderId: payment.orderId,
        status: ORDER_STATUS.CANCELED,
        note: `Flagged as disputed by admin: ${reason}`,
      },
      session
    );

    // 4. Restore stock if applicable
    const cart = await Cart.findById(transaction.metadata?.cartId)
      .populate('items.material')
      .session(session);
    if (cart) {
      for (const item of cart.items) {
        if (!item.digitalDownload) {
          await CartStockService.restoreStock(item.material._id, item.quantity, session);
        }
      }
      cart.status = CART_STATUS.ABANDONED;
      cart.abandonedReason = `Payment flagged as disputed: ${reason}`;
      await cart.save({ session });
    }

    // 5. Notify user
    const email =
      payment.guestEmail || (await mongoose.model('User').findById(transaction.user))?.email;
    // if (email) {
    //   await NotificationService.sendDisputeNotification({
    //     orderId: payment.orderId,
    //     userId: transaction.user,
    //     email,
    //     reason,
    //   });
    // } else {
    //   logger.warn('No email found for dispute notification', { transactionId, adminId });
    // }

    await session.commitTransaction();

    logger.warn('Payment flagged as disputed', {
      transactionId,
      paymentId: payment._id,
      orderId: payment.orderId?._id,
      cartId: transaction.metadata?.cartId,
      adminId,
      reason,
    });

    res.status(200).json({
      status: 'success',
      message: 'Payment flagged as disputed',
      data: {
        transactionId: payment.transactionId,
        flagReason: payment.flagReason,
        paymentStatus: payment.paymentStatus,
        orderId: payment.orderId?._id,
      },
    });
  } catch (err) {
    await session.abortTransaction();
    logger.error('Payment flagging failed', {
      transactionId,
      adminId,
      error: err.message,
      stack: err.stack,
    });
    throw err;
  } finally {
    session.endSession();
  }
});

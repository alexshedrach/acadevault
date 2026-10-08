import OrderService from '../../services/order/OrderService.js';
import catchAsyncErrors from '../utils/catchAsync.js';
import AppError from '../utils/HandleAppErrors.js';
import mongoose from 'mongoose';

/**
 * @desc Create an order from a cart
 * @route POST /api/orders
 * @access Public or Private
 */
export const createOrder = catchAsyncErrors(async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { cartId, idempotencyKey } = req.body;
    const userId = req.user?.id || null;
    const isGuest = !userId;
    const email = req.body.email;

    if (!cartId) throw new AppError('Cart ID is required', 400);

    const cart = await OrderService.getCart(cartId, session);

    const order = await OrderService.createOrder(
      {
        cart,
        userId,
        isGuest,
        email,
        idempotencyKey,
      },
      session
    );

    await session.commitTransaction();

    res.status(201).json({
      status: 'success',
      message: 'Order created successfully',
      data: order,
    });
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
});

/**
 * @desc Get a specific order by ID
 * @route GET /api/orders/:orderId
 * @access Public or Private
 */
export const getOrderById = catchAsyncErrors(async (req, res) => {
  const orderId = req.params.orderId;
  const userId = req.user?.id || null;
  const isGuest = !userId;

  const order = await OrderService.getOrder({
    orderId,
    userId,
    isGuest,
  });

  res.status(200).json({
    status: 'success',
    data: order,
  });
});

/**
 * @desc Update the status of an order (Admin)
 * @route PATCH /api/orders/:orderId/status
 * @access Private (Admin)
 */
export const updateOrderStatus = catchAsyncErrors(async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { status, note } = req.body;
    const orderId = req.params.orderId;
    const adminId = req.user?.id;

    const updatedOrder = await OrderService.updateOrderStatus(
      {
        orderId,
        status,
        note,
        adminId,
      },
      session
    );

    await session.commitTransaction();

    res.status(200).json({
      status: 'success',
      message: 'Order status updated successfully',
      data: updatedOrder,
    });
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
});

/**
 * @desc Cancel an order (by user or guest)
 * @route POST /api/orders/:orderId/cancel
 * @access Public or Private
 */
export const cancelOrder = catchAsyncErrors(async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const orderId = req.params.orderId;
    const reason = req.body.reason || 'Cancelled by user';
    const userId = req.user?.id || null;
    const isGuest = !userId;

    const cancelledOrder = await OrderService.cancelOrder(
      {
        orderId,
        userId,
        isGuest,
        reason,
      },
      session
    );

    await session.commitTransaction();

    res.status(200).json({
      status: 'success',
      message: 'Order cancelled successfully',
      data: cancelledOrder,
    });
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
});

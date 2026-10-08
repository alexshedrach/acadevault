import mongoose from 'mongoose';
import Cart from '../../api/models/CartModel.js';
import Order from '../../api/models/OrderModel.js';
import Payment from '../../api/models/PaymentModel.js';
import Transaction from '../../api/models/TransactionModel.js';
import User from '../../api/models/UserModel.js';

import {
  CART_STATUS,
  CURRENCIES,
  DELIVERY_METHODS,
  FULFILLMENT_STATUS,
  ORDER_STATUS,
  PAYMENT_STATUS,
  TRANSACTION_STATUSES,
} from '../../constants/enums.js';

import { generateDownloadUrl, generateTransactionId } from '../../utils/generators.js';
import AppError from '../../utils/HandleAppErrors.js';
import { logger } from '../../utils/logger.js';
import { toDecimal128, Big } from '../../utils/numberUtils.js';
import CartStockService from '../cart/CartStockService.js';
import CartTotalsService from '../cart/CartTotalsService.js';
import CartValidationService from '../cart/CartValidationService.js';

/**
 * OrderService handles creation, update, cancellation, and retrieval of orders.
 * All operations are built to maintain transactional safety and integrity.
 */
class OrderService {
  /**
   * Creates an order for a specific shop's subset of items from the cart.
   * Used in a multi-vendor checkout scenario.
   *
   * @param {Object} params
   * @param {Cart} params.cart - The full cart document
   * @param {String} params.shop - Shop ID this order belongs to
   * @param {Array} params.items - Subset of cart items belonging to this shop
   * @param {String} params.userId
   * @param {Boolean} params.isGuest
   * @param {String} params.email
   * @param {String} params.idempotencyKey
   * @param {mongoose.ClientSession} session
   * @returns {Promise<Order>}
   */
  static async createOrder({ cart, shop, items, user, isGuest, email, idempotencyKey }, session) {
    try {
      if (!cart || !shop || !Array.isArray(items) || items.length === 0) {
        throw new AppError('Cart, shop, and shop-specific items are required', 400);
      }

      if (cart.status !== CART_STATUS.ACTIVE) {
        throw new AppError(`Cart is not active: ${cart.status}`, 400);
      }

      //  derive a proper userId string, or null if guest
      const userId = user ? user.toString() : null;

      await CartValidationService.ensureValidIdentifiers({
        userId,
        guestEmail: cart.guestEmail,
        guestCartId: cart.guestCartId,
        shippingAddress: cart.shippingAddress,
        guestFullName: cart.guestFullName,
        guestPhoneNumber: cart.guestPhoneNumber,
      });

      if (isGuest && !email) {
        throw new AppError('Email is required for guest checkout', 400);
      }

      if (!isGuest && cart.user?.toString() !== userId) {
        throw new AppError('Unauthorized access to cart', 403);
      }

      // 🔁 Idempotency protection per shop
      if (idempotencyKey) {
        const existingOrder = await Order.findOne({
          'metadata.idempotencyKey': idempotencyKey,
          orderStatus: ORDER_STATUS.PENDING,
          shop,
        }).session(session);

        if (existingOrder) {
          logger.info('Returning existing pending order for idempotency', {
            orderId: existingOrder.orderId,
            cartId: cart._id,
            idempotencyKey,
            shop,
          });
          return existingOrder;
        }
      }

      // 💰 Compute shop-level totals
      const { subtotal, taxes, discounts, shippingFee, total } =
        await CartTotalsService.computeShopTotals(items, cart.currency, session);

      const orderItems = items.map((item) => {
        const format = (item.format || item.deliveryFormat || '').toLowerCase();
        const isDigital = item.isDigital ?? format === 'digital';

        if (typeof isDigital !== 'boolean') {
          throw new AppError(`Missing isDigital flag on item: ${item.material}`, 500);
        }

        const calculatedSubtotal = new Big(item.finalPrice).times(item.quantity).toFixed(2);

        return {
          material: item.material._id,
          shop: item.material.shop,
          quantity: item.quantity,
          unitPrice: item.unitPrice,
          taxAmount: item.taxAmount || 0,
          discountAmount: item.discountAmount || 0,
          subtotal: calculatedSubtotal,
          deliveryFormat: format,
          isDigital,
          downloadUrl: isDigital
            ? item.downloadUrl || generateDownloadUrl(item.material._id, cart._id)
            : null,
          downloadExpiry: isDigital ? new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) : null,
          licenseKey: isDigital ? item.licenseKey : null,
          pickupStationId: item.pickupStationId || null,
          fulfillmentStatus: isDigital ? FULFILLMENT_STATUS.DELIVERED : FULFILLMENT_STATUS.PENDING,
        };
      });

      const isAllDigital = orderItems.every((item) => item.isDigital);
      let deliveryMethod = DELIVERY_METHODS.DIGITAL;

      if (!isAllDigital) {
        if (cart.shippingAddress) deliveryMethod = DELIVERY_METHODS.SHIPPING;
        else if (cart.pickupStationId) deliveryMethod = DELIVERY_METHODS.PICKUP;
        else {
          logger.error('Missing delivery method for physical items', {
            cartId: cart._id?.toString(),
            items: orderItems.map((i) => ({
              material: i.material?.toString?.(),
              format: i.format,
              quantity: i.quantity,
            })),
            shippingAddress: cart.shippingAddress,
            pickupStationId: cart.pickupStationId,
          });

          throw new AppError('Physical items require a delivery method', 400);
        }
      }

      const order = new Order({
        shop,
        user: isGuest ? null : userId,
        guestEmail: isGuest ? email : null,
        orderId: generateTransactionId({ prefix: 'ORD-' }),
        items: orderItems,
        appliedCoupons: cart.appliedCoupons || [],
        shippingAddress: cart.shippingAddress || null,
        billingAddress: cart.billingAddress || cart.shippingAddress || null,
        deliveryMethod,
        pickupStationId: cart.pickupStationId || null,
        orderStatus: ORDER_STATUS.PENDING,
        paymentStatus: PAYMENT_STATUS.PENDING,
        subtotal,
        discountAmount: discounts || 0,
        shippingFee: shippingFee || 0,
        taxAmount: taxes || 0,
        grandTotal: total,
        currency: cart.currency,
        storeCurrency: CURRENCIES.NGN,
        exchangeRate: cart.exchangeRate || 1,
        totalInLocalCurrency: toDecimal128(total),
        totalInStoreCurrency: toDecimal128(Big(total).times(cart.exchangeRate || 1)),
        isDigital: isAllDigital,
        isGift: cart.isGift || false,
        metadata: {
          idempotencyKey: idempotencyKey || generateTransactionId({ prefix: 'IDEM-' }),
          cartId: cart._id,
        },
      });

      await order.save({ session });

      logger.info('Shop order created successfully', {
        orderId: order.orderId,
        cartId: cart._id,
        userId,
        shop,
      });

      return order;
    } catch (error) {
      logger.error('Shop order creation failed', {
        cartId: cart?._id,
        user,
        shop,
        idempotencyKey,
        error: error.message,
        stack: error.stack,
      });
      throw error;
    }
  }

  /**
   * Updates the status of an order and synchronizes payment, transaction, stock, and cart status
   *
   * @param {Object} params - { orderId, status, note, adminId }
   * @param {mongoose.ClientSession} session - MongoDB transaction session
   * @returns {Promise<Order>} - The updated order
   */
  static async updateOrderStatus({ orderId, status, note = '', adminId }, session) {
    try {
      if (!Object.values(ORDER_STATUS).includes(status)) {
        throw new AppError(`Invalid order status: ${status}`, 400);
      }

      const order = await Order.findById(orderId).populate('items.material').session(session);

      if (!order) throw new AppError('Order not found', 404);

      if (order.orderStatus === status) {
        logger.info('Idempotent status update: Order already in desired state', {
          orderId,
          status,
        });
        return order;
      }

      const isBackwardStatus =
        [ORDER_STATUS.CANCELED, ORDER_STATUS.COMPLETED].includes(order.orderStatus) &&
        status === ORDER_STATUS.PENDING;

      if (isBackwardStatus) {
        throw new AppError(
          `Cannot revert order status from ${order.orderStatus} to ${status}`,
          400
        );
      }

      // 1️⃣ Record status change
      order.statusHistory.push({
        status,
        changedAt: new Date(),
        reason: note || `Updated to ${status}`,
        changedBy: adminId || null,
      });
      order.orderStatus = status;

      // 2️⃣ Update payment and fulfillment status if final states
      if (status === ORDER_STATUS.COMPLETED) {
        order.paymentStatus = PAYMENT_STATUS.SUCCESS;
        order.fulfilledAt = new Date();
        order.items.forEach((item) => {
          if (!item.isDigital) {
            item.fulfillmentStatus = FULFILLMENT_STATUS.DELIVERED;
            item.estimatedDeliveryDate = new Date(); // You could add business logic here.
          }
        });
      } else if (status === ORDER_STATUS.CANCELED) {
        order.paymentStatus = PAYMENT_STATUS.FAILED;
        order.items.forEach((item) => {
          item.fulfillmentStatus = FULFILLMENT_STATUS.CANCELLED;
        });
      }

      // 3️⃣ Update transaction (if exists)
      const transaction = await Transaction.findById(order.transaction).session(session);
      if (transaction) {
        const txMap = {
          [ORDER_STATUS.COMPLETED]: TRANSACTION_STATUSES.COMPLETED,
          [ORDER_STATUS.CANCELED]: TRANSACTION_STATUSES.FAILED,
          [ORDER_STATUS.PENDING]: TRANSACTION_STATUSES.PENDING,
        };

        const newTxStatus = txMap[status] || TRANSACTION_STATUSES.PENDING;

        if (transaction.status !== newTxStatus) {
          transaction.status = newTxStatus;
          transaction.statusHistory.push({
            status: newTxStatus,
            changedAt: new Date(),
            reason: note,
            changedBy: adminId,
          });
          await transaction.save({ session });
        }
      }

      // 4️⃣ Restore stock if order is canceled
      if (status === ORDER_STATUS.CANCELED && !order.isDigital) {
        const cart = await Cart.findById(order.metadata?.cartId)
          .populate('items.material')
          .session(session);

        if (cart) {
          for (const item of cart.items) {
            if (!item.digitalDownload) {
              await CartStockService.restoreStock(item.material._id, item.quantity, session);
            }
          }
          cart.status = CART_STATUS.ABANDONED;
          cart.abandonedReason = note || 'Order cancelled';
          await cart.save({ session });
        }
      }

      // 5️⃣ Update payment record
      const payment = await Payment.findOne({ orderId: order._id }).session(session);
      if (payment && payment.paymentStatus !== order.paymentStatus) {
        payment.paymentStatus = order.paymentStatus;
        payment.gatewayResponse = {
          ...payment.gatewayResponse,
          status: order.paymentStatus.toLowerCase(),
          updatedAt: new Date(),
        };
        await payment.save({ session });
      }

      // 6️⃣ Save updated order
      await order.save({ session });

      // 7️⃣ Optional notification
      const email = order.guestEmail || (await User.findById(order.user).session(session))?.email;
      // if (email) {
      //   await NotificationService.sendOrderStatusUpdate({
      //     orderId: order._id,
      //     status,
      //     email,
      //     note,
      //   });
      // }

      logger.info('Order status updated successfully', {
        orderId,
        newStatus: status,
        adminId,
      });

      return order;
    } catch (error) {
      logger.error('Order status update failed', {
        orderId,
        status,
        adminId,
        error: error.message,
        stack: error.stack,
      });
      throw error;
    }
  }

  /**
   * Allows user or guest to cancel an order
   * @param {Object} params - { orderId, userId, isGuest, reason }
   * @param {mongoose.ClientSession} session - MongoDB transaction session
   */
  static async cancelOrder({ orderId, userId, isGuest, reason = 'Cancelled by user' }, session) {
    try {
      const order = await Order.findById(orderId).populate('items.material').session(session);
      if (!order) throw new AppError('Order not found', 404);
      if (order.orderStatus === ORDER_STATUS.COMPLETED) {
        throw new AppError('Completed orders cannot be cancelled', 400);
      }
      if (order.orderStatus === ORDER_STATUS.CANCELED) {
        logger.info('Order already cancelled (idempotent)', { orderId, userId });
        return order;
      }

      // === Validate user or guest access ===
      const userDoc = await User.findById(userId).session(session);
      const userEmail = userDoc?.email;

      if (isGuest && order.guestEmail !== userEmail) {
        throw new AppError('Unauthorized: Guest does not match', 403);
      }
      if (!isGuest && order.user?.toString() !== userId) {
        throw new AppError('Unauthorized: User mismatch', 403);
      }

      // === Update order ===
      order.orderStatus = ORDER_STATUS.CANCELED;
      order.paymentStatus = PAYMENT_STATUS.FAILED;
      order.statusHistory.push({
        status: ORDER_STATUS.CANCELED,
        changedAt: new Date(),
        reason,
        changedBy: userId,
      });
      order.items.forEach((item) => {
        item.fulfillmentStatus = 'Cancelled';
      });
      await order.save({ session });

      // === Update transaction ===
      const transaction = await Transaction.findById(order.transaction).session(session);
      if (transaction) {
        transaction.status = TRANSACTION_STATUSES.FAILED;
        transaction.statusHistory.push({
          status: TRANSACTION_STATUSES.FAILED,
          changedAt: new Date(),
          reason,
          changedBy: userId,
        });
        await transaction.save({ session });
      }

      // === Update payment ===
      const payment = await Payment.findOne({ orderId: order._id }).session(session);
      if (payment && payment.paymentStatus !== PAYMENT_STATUS.FAILED) {
        payment.paymentStatus = PAYMENT_STATUS.FAILED;
        payment.gatewayResponse = {
          ...payment.gatewayResponse,
          status: 'cancelled',
          cancelledAt: new Date(),
        };
        await payment.save({ session });
      }

      // === Restore stock if physical ===
      const cart = await Cart.findById(order.metadata?.cartId)
        .populate('items.material')
        .session(session);
      if (cart) {
        for (const item of cart.items) {
          if (!item.digitalDownload) {
            await CartStockService.restoreStock(item.material._id, item.quantity, session);
          }
        }
        cart.status = CART_STATUS.ABANDONED;
        cart.abandonedReason = reason;
        await cart.save({ session });
      }

      // === Send cancellation notification ===
      const email = order.guestEmail || userEmail;
      // if (email) {
      //   await NotificationService.sendOrderCancellation({ orderId: order._id, email, reason });
      // }

      logger.info('Order cancelled successfully', { orderId, userId, reason });
      return order;
    } catch (error) {
      logger.error('Order cancellation failed', { orderId, userId, error: error.message });
      throw error;
    }
  }
  /**
   * Retrieves a specific order by ID and validates access
   * @param {Object} params - { orderId, userId, isGuest }
   */
  static async getOrder({ orderId, userId, isGuest }) {
    try {
      const order = await Order.findById(orderId)
        .populate('user')
        .populate('items.material')
        .populate('shippingAddress')
        .populate('billingAddress')
        .populate('pickupStationId')
        .populate('transaction');

      if (!order) throw new AppError('Order not found', 404);

      const userDoc = await User.findById(userId);
      const email = userDoc?.email;

      if (isGuest && order.guestEmail !== email) {
        throw new AppError('Unauthorized access: guest mismatch', 403);
      }
      if (!isGuest && order.user?.toString() !== userId) {
        throw new AppError('Unauthorized access: user mismatch', 403);
      }

      logger.info('Order retrieved', {
        orderId: order.orderId,
        userId,
        type: isGuest ? 'guest' : 'authenticated',
      });

      return order;
    } catch (error) {
      logger.error('Order retrieval failed', { orderId, userId, error: error.message });
      throw error;
    }
  }
}
export default OrderService;

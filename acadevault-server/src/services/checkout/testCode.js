import mongoose from 'mongoose';
import Cart from '../../api/models/CartModel.js';
import Order from '../../api/models/OrderModel.js';
import Payment from '../../api/models/PaymentModel.js';
import Transaction from '../../api/models/TransactionModel.js';
import User from '../../api/models/UserModel.js';
import {
  CART_STATUS,
  CURRENCIES,
  ORDER_STATUS,
  PAYMENT_GATEWAYS,
  PAYMENT_STATUS,
  TRANSACTION_STATUSES,
  TRANSACTION_TYPES,
} from '../../constants/enums.js';
import { formatMethodLabel } from '../../helper/formatPaymentMethodLabel.js';
import {
  generateDownloadUrl,
  generateIdempotencyKey,
  generateLicenseKey,
  generateTransactionId,
} from '../../utils/generators.js';
import AppError from '../../utils/HandleAppErrors.js';
import { logger } from '../../utils/logger.js';
import CartStockService from '../cart/CartStockService.js';
import CartTotalsService from '../cart/CartTotalsService.js';
import CartValidationService from '../cart/CartValidationService.js';
import OrderService from '../order/OrderService.js';
import PaymentGatewayFactory from '../payment/PaymentGatewayFactory.js';

/**
 * Checkout Service for handling e-commerce checkout process for AcaDeVault
 */
class CheckoutService {
  /**
   * Selects and sets the payment gateway and optional method for the cart
   * @param {Object} params - Parameters including cartId, userId, paymentGateway, paymentMethod, isGuest
   * @returns {Object} Updated cart and available payment methods
   */
  static async selectPaymentGateway({
    cartId,
    userId,
    paymentGateway,
    paymentMethod = null,
    isGuest,
  }) {
    // Validate gateway
    if (!Object.values(PAYMENT_GATEWAYS).includes(paymentGateway)) {
      throw new AppError(`Unsupported payment gateway: ${paymentGateway}`, 400);
    }

    // Load active cart
    const cart = await Cart.findById(cartId).populate({
      path: 'items.material',
      select: '_id title slug summary price deliveryFormat isDigital shop',
    });

    if (!cart || cart.status !== CART_STATUS.ACTIVE) {
      throw new AppError('Cart not found or inactive', 404);
    }

    // Validate guest/user identifiers
    await CartValidationService.ensureValidIdentifiers({
      userId: userId?.toString(),
      guestEmail: cart.guestEmail,
      guestCartId: cart.guestCartId,
      shippingAddress: cart.shippingAddress,
      guestFullName: cart.guestFullName,
      guestPhoneNumber: cart.guestPhoneNumber,
    });

    if (isGuest) {
      if (!cart.guestEmail || !cart.guestFullName || !cart.guestPhoneNumber) {
        throw new AppError('Guest details incomplete for checkout', 400);
      }
    } else if (!cart.user || cart.user.toString() !== userId) {
      throw new AppError('Unauthorized cart access', 403);
    }

    // Validate payment method
    const gateway = PaymentGatewayFactory.getGateway(paymentGateway);
    const supportedMethods = gateway?.getSupportedMethods?.() || [];

    if (!supportedMethods.length) {
      throw new AppError(`No supported methods found for gateway: ${paymentGateway}`, 500);
    }

    const selectedMethod = paymentMethod || supportedMethods[0];
    if (!supportedMethods.includes(selectedMethod)) {
      throw new AppError(`${selectedMethod} is not supported by ${paymentGateway}`, 400);
    }

    // Update cart
    cart.paymentMethod = selectedMethod;
    cart.paymentGateway = paymentGateway;
    await cart.save();

    logger.info('Cart payment selection updated', {
      cartId,
      userId: userId || 'guest',
      paymentGateway,
      paymentMethod: selectedMethod,
    });

    return {
      cart,
      availableMethods: supportedMethods.map((method) => ({
        id: method,
        label: formatMethodLabel(method),
        recommended: method === supportedMethods[0],
      })),
    };
  }

  /**
   * Initiates the checkout process by validating cart, creating order, transaction, and payment intent
   * @param {Object} params - Parameters including cartId, userId, isGuest, idempotencyKey
   * @returns {Object} Cart, order, and payment information
   */
  static async initiateCheckout({ cartId, userId = null, isGuest = false, idempotencyKey = null }) {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      const cart = await Cart.findById(cartId)
        .populate({
          path: 'items.material',
          select: '_id format deliveryFormat title shop',
        })
        .session(session);
      if (!cart || cart.status !== CART_STATUS.ACTIVE) {
        throw new AppError('Cart is either not found or not active', 404);
      }

      // Validate identifiers
      await CartValidationService.ensureValidIdentifiers({
        userId: userId?.toString(),
        guestEmail: cart.guestEmail,
        guestCartId: cart.guestCartId,
        shippingAddress: cart.shippingAddress,
        guestFullName: cart.guestFullName,
        guestPhoneNumber: cart.guestPhoneNumber,
      });

      if (isGuest) {
        if (!cart.guestEmail || !cart.guestFullName || !cart.guestPhoneNumber) {
          throw new AppError('Incomplete guest details for checkout', 400);
        }
      } else if (!cart.user || cart.user.toString() !== userId) {
        throw new AppError('Unauthorized access to cart', 403);
      }

      if (!Object.values(CURRENCIES).includes(cart.currency)) {
        throw new AppError('Invalid or missing cart currency', 400);
      }

      if (!cart.paymentGateway) {
        throw new AppError('Payment gateway not selected', 400);
      }

      // Return pending payment if same idempotencyKey exists
      if (idempotencyKey) {
        const existingPayment = await Payment.findOne({
          'gatewayResponse.idempotencyKey': idempotencyKey,
          paymentStatus: PAYMENT_STATUS.PENDING,
        }).session(session);

        if (existingPayment) {
          const transaction = await Transaction.findById(existingPayment.transaction).session(
            session
          );
          const order = await Order.findById(transaction.order).session(session);

          logger.info('Returning existing payment using idempotency key', {
            cartId,
            transactionId: transaction.transactionId,
            idempotencyKey,
          });

          await session.commitTransaction();
          return { cart, order, paymentInfo: existingPayment.gatewayResponse };
        }
      }

      // Lock cart and re-validate
      cart.locked = true;
      await cart.save({ session });

      await CartStockService.verifyStock(cart, session);
      const totals = await CartTotalsService.computeTotals(cart, session);

      // Create order

      // At the top, after stock/totals are computed:
      const itemsByShop = cart.items.reduce((groups, item) => {
        const shopId = item.material.shop.toString();
        groups[shopId] = groups[shopId] || [];
        groups[shopId].push(item);
        return groups;
      }, {});

      const orders = [];
      for (const [shopId, items] of Object.entries(itemsByShop)) {
        const shopTotals = await CartTotalsService.computeTotalsForItems(items, cart); // you may need a helper
        const order = await OrderService.createOrder(
          {
            cart,
            userId,
            isGuest,
            email,
            shop: shopId,
            items,
            totals: shopTotals,
            idempotencyKey,
          },
          session
        );
        orders.push(order);
      }

      // Create transaction
      const transaction = await new Transaction({
        transactionId: generateTransactionId(),
        user: isGuest ? null : userId,
        guestEmail: isGuest ? cart.guestEmail : null,
        order: order._id,
        shop: cart.shop,
        transactionType: TRANSACTION_TYPES.PAYMENT,
        amount: totals.total,
        currency: cart.currency,
        exchangeRate: cart.exchangeRate,
        status: TRANSACTION_STATUSES.PENDING,
        initiatedBy: isGuest ? 'guest' : 'user',
        statusHistory: [
          { status: TRANSACTION_STATUSES.PENDING, changedAt: new Date(), reason: 'Initiated' },
        ],
      }).save({ session });

      // Generate license keys and download URLs
      for (const item of cart.items) {
        if (item.digitalDownload) {
          item.licenseKey = generateLicenseKey();
          item.downloadUrl = generateDownloadUrl(item.material._id, cart._id);
        }
      }
      await cart.save({ session });

      // Initialize payment via gateway
      const gateway = PaymentGatewayFactory.getGateway(cart.paymentGateway);
      const user = !isGuest ? await User.findById(userId).session(session) : null;
      const email = isGuest ? cart.guestEmail : user?.email;

      if (!email) throw new AppError('Email is required for payment', 400);

      const supportedMethods = gateway.getSupportedMethods?.() || [];
      const selectedMethod = cart.paymentMethod || supportedMethods[0];

      if (!supportedMethods.includes(selectedMethod)) {
        throw new AppError(`${selectedMethod} is not supported by ${cart.paymentGateway}`, 400);
      }

      const newIdempotencyKey =
        idempotencyKey || generateIdempotencyKey(cartId, userId || cart.guestCartId);
      const callbackUrl = `${process.env.CLIENT_BASE_URL}/payment/redirect`;

      const { clientSecret, transactionRef, response } = await gateway.initiate({
        amount: totals.total,
        currency: cart.currency,
        email,
        cartId,
        userId: userId || 'guest',
        orderId: order._id,
        callback_url: callbackUrl,
        paymentMethod: selectedMethod,
        idempotencyKey: newIdempotencyKey,
      });

      // Create payment
      const payment = await new Payment({
        transaction: transaction._id,
        orderId: order._id,
        gatewayTransactionId: transactionRef,
        paymentMethod: selectedMethod,
        paymentGateway: cart.paymentGateway,
        paymentStatus: PAYMENT_STATUS.PENDING,
        amountPaid: totals.total,
        currency: cart.currency,
        source: 'web',
        userId: isGuest ? null : userId,
        guestEmail: isGuest ? cart.guestEmail : null, // ✅ Include this line
        gatewayResponse: {
          authorization_url: clientSecret,
          reference: transactionRef,
          idempotencyKey: newIdempotencyKey,
          raw: response.data,
        },
      }).save({ session });

      // Link payment to transaction
      transaction.payments.push(payment._id);
      await transaction.save({ session });

      // Update cart
      cart.paymentTransactionId = transaction.transactionId;
      cart.status = CART_STATUS.PENDING_CHECKOUT;
      await cart.save({ session });

      await session.commitTransaction();

      logger.info('Checkout initiated successfully', {
        cartId,
        userId: userId || 'guest',
        transactionId: transaction.transactionId,
        paymentId: payment._id,
      });

      return {
        cart,
        order,
        paymentInfo: {
          clientSecret,
          transactionRef,
          idempotencyKey: newIdempotencyKey,
          amount: totals.total,
          currency: cart.currency,
        },
      };
    } catch (error) {
      await session.abortTransaction();
      logger.error('Failed to initiate checkout', {
        cartId,
        userId: userId || 'guest',
        error: error.message,
        stack: error.stack,
      });
      throw error;
    } finally {
      session.endSession();
    }
  }

  /**
   * Completes the checkout process after successful payment confirmation
   * @param {Object} params - Parameters including cartId, userId, isGuest, transactionRef
   * @returns {Object} Completed cart and order
   */
  static async completeCheckout({ cartId, userId = null, isGuest = false, transactionRef }) {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      const cart = await Cart.findById(cartId).populate('items.material').session(session);

      if (!cart) {
        throw new AppError('Cart not found', 404);
      }

      // Return early if cart is already completed (idempotency-safe)
      if (cart.status === CART_STATUS.COMPLETED) {
        const completedOrder = await Order.findById(cart.orderId).session(session);
        logger.info('Checkout already completed - returning existing state', {
          cartId,
          orderId: cart.orderId,
        });
        await session.commitTransaction();
        return { cart, order: completedOrder };
      }

      // Validate access
      await CartValidationService.ensureValidIdentifiers({
        userId: userId?.toString(),
        guestEmail: cart.guestEmail,
        guestCartId: cart.guestCartId,
        shippingAddress: cart.shippingAddress,
        guestFullName: cart.guestFullName,
        guestPhoneNumber: cart.guestPhoneNumber,
      });

      if (isGuest) {
        if (!cart.guestEmail || !cart.guestFullName || !cart.guestPhoneNumber) {
          throw new AppError('Guest details are incomplete', 400);
        }
      } else if (!cart.user || cart.user.toString() !== userId) {
        throw new AppError('Unauthorized cart access', 403);
      }

      // 1️⃣ Find the successful payment by gatewayReference
      const payment = await Payment.findOne({
        gatewayTransactionId: transactionRef,
        paymentStatus: PAYMENT_STATUS.SUCCESS,
      }).session(session);

      if (!payment) {
        throw new AppError('Payment not found or not marked successful', 404);
      }

      // 2️⃣ Use the payment.transaction (ObjectId) to fetch the Transaction
      const transaction = await Transaction.findById(payment.transaction).session(session);

      if (
        !transaction ||
        ![TRANSACTION_STATUSES.PENDING, TRANSACTION_STATUSES.PROCESSING].includes(
          transaction.status
        )
      ) {
        throw new AppError('Valid pending transaction not found', 404);
      }

      // Ensure totals match payment
      const totals = await CartTotalsService.computeTotals(cart, session);
      if (
        parseFloat(payment.amountPaid) !== parseFloat(totals.total) ||
        payment.currency !== cart.currency
      ) {
        throw new AppError('Payment mismatch detected', 400);
      }

      // Deduct stock for physical materials
      for (const item of cart.items) {
        if (!item.digitalDownload) {
          const availableQty = item.material?.physicalContent?.stockQty ?? 0;
          if (availableQty < item.quantity) {
            throw new AppError(`Insufficient stock for: ${item.material.title}`, 400);
          }
          await CartStockService.deductStock(item.material._id, item.quantity, session);
        }
      }

      // Update transaction status
      transaction.status = TRANSACTION_STATUSES.COMPLETED;
      transaction.statusHistory.push({
        status: TRANSACTION_STATUSES.COMPLETED,
        changedAt: new Date(),
        reason: 'Payment confirmed',
      });
      await transaction.save({ session });

      // Update order status
      await OrderService.updateOrderStatus(
        {
          orderId: transaction.order,
          status: ORDER_STATUS.COMPLETED,
          fulfilledAt: new Date(),
          note: 'Auto-completed after successful payment',
        },
        session
      );

      // Update cart
      cart.status = CART_STATUS.COMPLETED;
      cart.locked = false;
      cart.completedAt = new Date();
      cart.orderId = transaction.order;
      await cart.save({ session });

      // Notify user
      const userDoc = !isGuest ? await User.findById(userId).session(session) : null;
      const email = isGuest ? cart.guestEmail : userDoc?.email;

      // if (email) {
      //   await NotificationService.sendOrderConfirmation({
      //     orderId: transaction.order,
      //     userId,
      //     email,
      //   });
      // } else {
      //   logger.warn('No email found for post-checkout notification', { cartId, userId });
      // }

      await session.commitTransaction();

      const completedOrder = await Order.findById(transaction.order).session(session);

      logger.info('Checkout completed successfully', {
        cartId,
        transactionId: transaction.transactionId,
        orderId: transaction.order,
        paymentId: payment._id,
      });

      return { cart, order: completedOrder };
    } catch (error) {
      await session.abortTransaction();
      logger.error('Checkout completion failed', {
        cartId,
        userId: userId || 'guest',
        transactionRef,
        error: error.message,
        stack: error.stack,
      });
      throw error;
    } finally {
      session.endSession();
    }
  }

  /**
   * Cancels the checkout process and updates related records
   * @param {Object} params - Parameters including cartId, userId, isGuest
   * @returns {Object} Updated cart
   */
  static async cancelCheckout({ cartId, userId = null, isGuest = false }) {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      const cart = await Cart.findById(cartId).session(session);
      if (!cart) {
        throw new AppError('Cart not found', 404);
      }

      if (cart.status === CART_STATUS.COMPLETED) {
        throw new AppError('Cannot cancel a completed checkout', 400);
      }

      // Validate access
      await CartValidationService.ensureValidIdentifiers({
        userId: userId?.toString(),
        guestEmail: cart.guestEmail,
        guestCartId: cart.guestCartId,
        shippingAddress: cart.shippingAddress,
        guestFullName: cart.guestFullName,
        guestPhoneNumber: cart.guestPhoneNumber,
      });

      if (isGuest) {
        if (!cart.guestEmail || !cart.guestFullName || !cart.guestPhoneNumber) {
          throw new AppError('Incomplete guest details', 400);
        }
      } else if (!cart.user || cart.user.toString() !== userId) {
        throw new AppError('Unauthorized access to cart', 403);
      }

      // Cancel associated transaction if exists
      const transaction = await Transaction.findOne({
        transactionId: cart.paymentTransactionId,
        status: {
          $in: [TRANSACTION_STATUSES.PENDING, TRANSACTION_STATUSES.PROCESSING],
        },
      }).session(session);

      if (transaction) {
        // Cancel pending payment if found
        const payment = await Payment.findOne({
          transaction: transaction._id,
          paymentStatus: PAYMENT_STATUS.PENDING,
        }).session(session);

        if (payment) {
          payment.paymentStatus = PAYMENT_STATUS.FAILED;
          payment.failureReason = 'Cancelled by user';
          payment.gatewayResponse = {
            ...payment.gatewayResponse,
            status: 'cancelled_by_user',
            cancelledAt: new Date(),
          };
          await payment.save({ session });

          logger.info('Pending payment marked failed', {
            paymentId: payment._id,
            cartId,
          });
        }

        // Cancel the transaction itself
        transaction.status = 'canceled';
        transaction.statusHistory.push({
          status: 'canceled',
          changedAt: new Date(),
          reason: 'Checkout cancelled by user',
        });
        await transaction.save({ session });

        logger.info('Transaction cancelled', {
          transactionId: transaction.transactionId,
          cartId,
        });
      }

      // Update cart
      cart.status = CART_STATUS.ABANDONED;
      cart.abandonedReason = 'Checkout cancelled by user';
      cart.locked = false;
      await cart.save({ session });

      // Cancel order if it was already created
      if (cart.orderId) {
        await OrderService.updateOrderStatus(
          {
            orderId: cart.orderId,
            status: ORDER_STATUS.CANCELED,
            note: 'Checkout cancelled by user',
          },
          session
        );

        logger.info('Order marked as cancelled', {
          orderId: cart.orderId,
          cartId,
        });
      }

      await session.commitTransaction();

      logger.info('Checkout process cancelled', {
        cartId,
        userId: userId || 'guest',
      });

      return cart;
    } catch (error) {
      await session.abortTransaction();
      logger.error('Checkout cancellation failed', {
        cartId,
        userId: userId || 'guest',
        error: error.message,
        stack: error.stack,
      });
      throw error;
    } finally {
      session.endSession();
    }
  }
}

export default CheckoutService;

class CartService {
  /**
   * @param {{ pricingResolver: import("../resolvers/PricingResolver").PricingResolver }} deps
   */
  constructor({ pricingResolver }) {
    if (!pricingResolver) {
      throw new Error('PricingResolver is required.');
    }
    this.pricingResolver = pricingResolver;
  }

  /**
   * Fetch the active cart for a user or guest.
   * @param {{ userId?: string, guestEmail?: string, shopId?: string }} params
   * @returns {Promise<Cart|null>}
   * @throws {AppError} if neither userId nor guestEmail is provided
   */
  async getActiveCart({ userId, guestEmail, shopId = null }) {
    if (!userId && !guestEmail) {
      throw new AppError('Either userId or guestEmail is required', 400);
    }

    const query = {
      status: CART_STATUS.ACTIVE,
      ...(userId
        ? { user: userId }
        : guestEmail
          ? { guestEmail }
          : guestCartId
            ? { _id: guestCartId }
            : {}),
    };
    if (shopId) query.shop = shopId;

    try {
      return await Cart.findOne(query).exec();
    } catch (error) {
      logger.error('Error fetching active cart', {
        userId,
        guestEmail,
        shopId,
        error: error.message,
      });
      throw error;
    }
  }

  /**
   * Create a new cart for a user or guest.
   * @param {{ userId?: string, guestEmail?: string, shopId: string }} params
   * @returns {Promise<Cart>}
   */
  async createCart({ userId, guestEmail, shopId }) {
    const payload = { shop: shopId };
    if (userId) {
      payload.user = userId;
    } else {
      payload.guestEmail = guestEmail;
      payload.guestCartId = generateUUID('GUEST-');
    }

    try {
      return await new Cart(payload).save();
    } catch (error) {
      logger.error('Error creating cart', {
        userId,
        guestEmail,
        shopId,
        error: error.message,
      });
      throw error;
    }
  }

  /**
   * Fetch the active cart or create a new one, after validating identifiers.
   * @param {{ userId?: string, guestEmail?: string, guestCartId?: string, shopId?: string, shippingAddress?: object, guestFullName?: string, guestPhoneNumber?: string }} ctx
   * @returns {Promise<Cart>}
   */
  async findOrCreateCart(ctx) {
    // 1) Validate that we have a user OR guest identity
    CartValidationService.ensureValidIdentifiers(ctx);

    // 2) Try to fetch
    let cart = await this.getActiveCart(ctx);
    // 3) If none, create new
    if (!cart) {
      cart = await this.createCart(ctx);
    }
    return cart;
  }

  /**
   * Add or update a line‑item in the cart.
   * @param {{ userId?: string, guestEmail?: string, shopId: string, material: any, quantity: number, currency: string, region?: string }} params
   * @returns {Promise<Cart>}
   */
  async addItem({ userId, guestEmail, shopId, material, quantity, currency, region }) {
    const isDigital = Boolean(material?.isDigital) || true;
    // 1) Get or create the cart
    const cart = await this.findOrCreateCart({
      userId,
      guestEmail,
      shopId,
      allowGuestFallback: true, // 👈 this enables guest cart creation
    });

    // 2) Resolve unit price via injected resolver
    const unitPrice = await this.pricingResolver.resolveEffectivePrice({
      materialId: material._id.toString(),
      currency,
      region,
    });

    // 3) Upsert the item
    const existing = cart.items.find((i) => i.material.equals(material._id));
    if (existing) {
      existing.quantity += quantity;
    } else {
      cart.items.push({
        material: material._id,
        quantity,
        unitPrice,
        digitalDownload: isDigital,
        ...(isDigital && { licenseKey: generateUUID('LIC-') }),
      });
    }

    // 4) Validate stock, recalc totals, extend expiry
    await CartStockService.verifyStock(cart);
    await CartTotalsService.computeTotals(cart);
    await CartExpiryService.extendExpiry(cart);

    // 5) Persist changes
    return await cart.save();
  }
}

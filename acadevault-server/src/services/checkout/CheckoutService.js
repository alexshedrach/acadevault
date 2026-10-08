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
import cartService from '../cart/cartServiceFactory.js';
import { formatCartForClient } from '../cart/CartSerializer.js';
import { Big, toDecimal128 } from '../../utils/numberUtils.js';
import { validateGuestDetails } from '../../utils/validateGuestDetails.js';

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
    guestEmail,
    guestFullName = null,
    guestPhoneNumber = null,
  }) {
    // ─── 1. Validate requested gateway ─────────────────────────────
    if (!Object.values(PAYMENT_GATEWAYS).includes(paymentGateway)) {
      throw new AppError(`Unsupported payment gateway: ${paymentGateway}`, 400);
    }

    // ─── 2. Load active cart ──────────────────────────────────────
    const cart = await cartService.getActiveCart(
      { userId, guestEmail: null, guestCartId: cartId },
      { populate: false }
    );

    if (!cart || cart.status !== CART_STATUS.ACTIVE) {
      throw new AppError('Cart not found or inactive', 404);
    }

    // ─── 3. Validate ownership ────────────────────────────────────
    await CartValidationService.ensureValidIdentifiers({
      userId: userId?.toString(),
      guestEmail: cart.guestEmail,
      guestCartId: cart.guestCartId,
    });

    if (isGuest) {
      // Inject and validate guest details
      validateGuestDetails({
        email: guestEmail || cart.guestEmail,
        fullName: guestFullName,
        phoneNumber: guestPhoneNumber,
      });

      // Safely inject into cart
      cart.guestEmail = guestEmail?.trim().toLowerCase() || cart.guestEmail;
      if (guestFullName) cart.guestFullName = guestFullName.trim();
      if (guestPhoneNumber) cart.guestPhoneNumber = guestPhoneNumber.trim();
    } else {
      if (!cart.user || cart.user.toString() !== userId) {
        throw new AppError('Unauthorized cart access', 403);
      }
    }

    // ─── 4. Validate method ──────────────────────────────────────
    const gateway = PaymentGatewayFactory.getGateway(paymentGateway);
    const supportedMethods = gateway?.getSupportedMethods?.() || [];

    if (!supportedMethods.length) {
      throw new AppError(`No supported methods found for gateway: ${paymentGateway}`, 500);
    }

    const selectedMethod = paymentMethod || supportedMethods[0];
    if (!supportedMethods.includes(selectedMethod)) {
      throw new AppError(`${selectedMethod} is not supported by ${paymentGateway}`, 400);
    }

    // ─── 5. Save to cart ─────────────────────────────────────────
    cart.paymentMethod = selectedMethod;
    cart.paymentGateway = paymentGateway;

    await CartTotalsService.computeTotals(cart);
    await cart.save();

    logger.info('Cart payment selection updated', {
      cartId,
      userId: userId || 'guest',
      paymentGateway,
      paymentMethod: selectedMethod,
    });

    return {
      cart: formatCartForClient(cart),
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
    let cart;
    try {
      // 1️⃣ Lock & load active cart
      cart = await this._lockAndLoadCart(cartId, session);

      // 2️⃣ Validate identities, guest info, currency & gateway selection
      await this._validateCart(cart, userId, isGuest);

      // 3️⃣ Stock check + compute precise totals as Big
      const totals = await this._verifyStockAndComputeTotals(cart, session);
      const totalBig = Big(totals.total); // explicitly using the correct number
      // console.log(totalBig);

      // 4️⃣ Idempotency: reuse any in‑flight or partial payment
      if (idempotencyKey) {
        const existing = await this._findExistingPayment(idempotencyKey, session);
        if (existing) {
          // fetch associated transaction and orders
          const txn = await Transaction.findById(existing.transaction).session(session);
          const orders = await Order.find({ _id: { $in: txn.orders || [] } }).session(session);
          await session.commitTransaction();
          return { cart, orders, paymentInfo: existing.gatewayResponse };
        }
      }

      // 5️⃣ Create per‑shop Order documents
      const orders = await this._createShopOrders(cart, userId, isGuest, idempotencyKey, session);

      // 6️⃣ Create a master Transaction linking all orders
      const transaction = await this._createMasterTransaction(
        { cart, orders, userId, isGuest, totalBig },
        session
      );

      // 7️⃣ Attach licenseKey & downloadUrl for any digital items
      await this._attachDigitalDownloads(cart, session);

      // 8️⃣ Initiate actual payment with gateway (and record attempt)
      const paymentInfo = await this._initiateGatewayPayment(
        { cart, userId, isGuest, totalBig, orders, idempotencyKey },
        session,
        transaction
      );

      // 9️⃣ Commit all DB changes and return
      await session.commitTransaction();
      return { cart, orders, paymentInfo };
    } catch (err) {
      // 1️⃣ Abort the in‑flight transaction
      await session.abortTransaction();

      // 2️⃣ Rethrow so the controller’s error handler kicks in
      throw err;
    } finally {
      // 3️⃣ Always unlock the cart & end session
      //    If you added lockAcquiredAt, clear that too.
      await mongoose.model('Cart').findByIdAndUpdate(cartId, {
        locked: false,
        ...(this.lockAcquiredAt && { lockAcquiredAt: null }),
      });
      session.endSession();
    }
  }

  // ————————————————————————————————————————————
  //  Private Helpers
  // ————————————————————————————————————————————

  /** Lock cart (prevent concurrent checkouts) & ensure ACTIVE */
  static async _lockAndLoadCart(cartId, session) {
    const fiveMinutesAgo = new Date(Date.now() - 1000 * 60 * 5);

    const cart = await Cart.findOneAndUpdate(
      {
        _id: cartId,
        $or: [{ locked: false }, { lockAcquiredAt: { $lt: fiveMinutesAgo } }],
      },
      {
        locked: true,
        lockAcquiredAt: new Date(),
      },
      { new: true, session }
    ).populate({ path: 'items.material', select: '_id title shop' });

    if (!cart || cart.status !== CART_STATUS.ACTIVE) {
      throw new AppError('Cart not found or inactive', 404);
    }

    return cart;
  }

  /** Validate user/guest identifiers, currency, and that a gateway is set */
  static async _validateCart(cart, userId, isGuest) {
    await CartValidationService.ensureValidIdentifiers({
      userId: userId?.toString(),
      guestEmail: cart.guestEmail,
      guestCartId: cart.guestCartId,
      shippingAddress: cart.shippingAddress,
      guestFullName: cart.guestFullName,
      guestPhoneNumber: cart.guestPhoneNumber,
    });
    if (isGuest && (!cart.guestEmail || !cart.guestFullName || !cart.guestPhoneNumber)) {
      throw new AppError('Incomplete guest details', 400);
    }
    if (!isGuest && (!cart.user || cart.user.toString() !== userId)) {
      throw new AppError('Unauthorized cart access', 403);
    }
    if (!Object.values(CURRENCIES).includes(cart.currency)) {
      throw new AppError('Unsupported cart currency', 400);
    }
    if (!cart.paymentGateway) {
      throw new AppError('Payment gateway not selected', 400);
    }
  }

  /**
   * Check stock availability and compute accurate cart totals.
   * Returns the complete totals object including Big.js instances.
   *
   * @param {mongoose.Document} cart - Cart document to validate and compute
   * @param {mongoose.ClientSession} session - DB session for transactional safety
   * @returns {Promise<Object>} Totals object with Big.js values:
   *   { subtotal, total, totalDiscount, tax, shippingFee, totalWithShipping }
   */
  static async _verifyStockAndComputeTotals(cart, session) {
    await CartStockService.verifyStock(cart, session);
    const totals = await CartTotalsService.computeTotals(cart, session);

    if (!totals || typeof totals.total !== 'number' || isNaN(totals.total) || totals.total < 0) {
      throw new AppError('Invalid totals returned from CartTotalsService', 500);
    }

    return totals;
  }

  /** Group items by shop and call OrderService.createOrder for each */
  /**
   * Creates per-shop orders by splitting the cart items by shop and delegating
   * order creation to OrderService.createOrder, enriched with proper delivery metadata.
   *
   * @param {mongoose.Document} cart - The validated cart document
   * @param {string} userId - Authenticated user ID
   * @param {boolean} isGuest - Whether the buyer is a guest
   * @param {string} idempotencyKey - Idempotency key for safe re-attempts
   * @param {mongoose.ClientSession} session - Optional session for transaction safety
   * @returns {Promise<Array>} - List of created order documents
   */
  static async _createShopOrders(cart, userId, isGuest, idempotencyKey, session) {
    // ─── 1. Check for required delivery info for physical/hybrid items ─────────
    const hasPhysicalItem = cart.items.some((i) =>
      ['physical', 'hybrid'].includes(i.materialSnapshot.deliveryFormat)
    );
    if (hasPhysicalItem && !cart.shippingAddress && !cart.pickupStationId) {
      throw new AppError(
        'Physical items require either a shipping address or pickup station.',
        400
      );
    }

    // ─── 2. Group items by shop via snapshot.shop ────────────────────────────────
    const itemsByShop = cart.items.reduce((groups, item) => {
      // Ensure snapshot carries shop
      const shopId = item.materialSnapshot.shop?.toString();
      if (!shopId) {
        throw new AppError('Missing shop ID in materialSnapshot', 500);
      }

      // Enrich each item record: keep snapshot, but add the delivery flags
      const enriched = {
        ...item.toObject(), // convert if it's a Mongoose subdoc
        isDigital: item.materialSnapshot.isDigital,
        format: item.materialSnapshot.deliveryFormat,
      };

      if (!groups[shopId]) groups[shopId] = [];
      groups[shopId].push(enriched);
      return groups;
    }, {});

    // ─── 3. Create one Order per shop ──────────────────────────────────────────
    const promises = Object.entries(itemsByShop).map(async ([shopId, orderItems]) => {
      // Compute the shop-level totals using your existing method
      const shopTotals = await CartTotalsService.computeShopTotals(
        orderItems,
        cart.currency,
        session
      );

      // Delegate to OrderService, passing shopTotals in the payload
      return OrderService.createOrder(
        {
          shop: shopId,
          items: orderItems,
          cart,
          user: userId,
          isGuest,
          email: isGuest ? cart.guestEmail : null,
          idempotencyKey,
          shopTotals, // { subtotal, discounts, taxes, shippingFee, total }
        },
        session
      );
    });

    return Promise.all(promises);
  }

  /** Private idempotency lookup: include PENDING & CAPTURED_PARTIAL */
  static async _findExistingPayment(idempotencyKey, session) {
    return Payment.findOne({
      'gatewayResponse.idempotencyKey': idempotencyKey,
      paymentStatus: { $in: [PAYMENT_STATUS.PENDING, PAYMENT_STATUS.CAPTURED_PARTIAL] },
    }).session(session);
  }

  /** Create a Transaction linking all shop orders */
  static async _createMasterTransaction({ cart, orders, userId, isGuest, totalBig }, session) {
    const txn = new Transaction({
      transactionId: generateTransactionId({ prefix: 'TXN-' }),
      user: isGuest ? null : userId,
      guestEmail: isGuest ? cart.guestEmail : null,
      orders: orders.map((o) => o._id),
      transactionType: TRANSACTION_TYPES.PAYMENT,
      amount: toDecimal128(totalBig), // store full precision
      currency: cart.currency,
      exchangeRate: cart.exchangeRate,
      status: TRANSACTION_STATUSES.PENDING,
      statusHistory: [
        { status: TRANSACTION_STATUSES.PENDING, changedAt: new Date(), reason: 'Initiated' },
      ],
      initiatedBy: isGuest ? 'guest' : 'user',
    });
    await txn.save({ session });
    return txn;
  }

  /** For digital items: generate licenseKey & downloadUrl */
  static async _attachDigitalDownloads(cart, session) {
    for (const item of cart.items) {
      const materialId = item.material?._id ?? item.materialSnapshot?.id;

      if (item.digitalDownload) {
        item.licenseKey = generateLicenseKey();
        item.downloadUrl = generateDownloadUrl(materialId, cart._id);
      }
    }
    await cart.save({ session });
  }

  /**
   * Record every Payment attempt (failure, partial, or pending)
   */
  static async _recordPaymentAttempt({
    transaction,
    user,
    guestEmail,
    orderIds,
    gatewayTransactionId,
    paymentMethod,
    paymentGateway,
    paymentStatus,
    amountBig,
    currency,
    gatewayResponse,
    session,
  }) {
    if (!orderIds?.length) {
      throw new AppError('Cannot create payment: missing order references', 500);
    }

    const attempt = await Payment.create(
      [
        {
          user,
          guestEmail,
          orders: orderIds, // assuming 1 order per payment
          transaction: transaction._id,
          gatewayTransactionId,
          paymentMethod,
          paymentGateway,
          paymentStatus,
          amountPaid: toDecimal128(amountBig),
          currency,
          gatewayResponse,
        },
      ],
      { session }
    );

    transaction.payments.push(attempt[0]._id);
    await transaction.save({ session });
    return attempt[0];
  }
  /**
   * Initiate the gateway call, record the attempt, and finalize cart status
   */
  static async _initiateGatewayPayment(
    { cart, userId, isGuest, totalBig, orders, idempotencyKey },
    session,
    transaction
  ) {
    // 1️⃣ Pick and validate payment method
    const gateway = PaymentGatewayFactory.getGateway(cart.paymentGateway);
    const supported = gateway.getSupportedMethods?.() || [];
    const method = cart.paymentMethod || supported[0];
    if (!supported.includes(method)) {
      throw new AppError(`${method} is not supported by ${cart.paymentGateway}`, 400);
    }

    // 2️⃣ Resolve email
    const user = isGuest ? null : await User.findById(userId).session(session);
    const email = isGuest ? cart.guestEmail : user?.email;

    if (!email) throw new AppError('Email is required for payment', 400);

    // 3️⃣ Prepare metadata
    const amountInMinor = totalBig.times(100).toFixed(0); // minor units: kobo, cents
    const key =
      idempotencyKey || generateIdempotencyKey(cart._id.toString(), userId || cart.guestCartId);
    const callbackUrl = `${process.env.CLIENT_BASE_URL}/payment/redirect`;

    // 4️⃣ Initiate payment with gateway
    let gatewayResponse;
    try {
      const { clientSecret, transactionRef, response, success } = await gateway.initiate({
        amount: totalBig.toNumber(),
        currency: cart.currency,
        email,
        cartId: cart._id,
        user: userId || 'guest',
        orders: orders.map((o) => o._id),
        callback_url: callbackUrl,
        paymentMethod: method,
        idempotencyKey: key,
      });

      gatewayResponse = response;

      // 5️⃣ Resolve payment status
      const paymentStatus = this._resolvePaymentStatusFromGatewayResponse(success, response);

      // 6️⃣ Record attempt
      await this._recordPaymentAttempt({
        transaction,
        user: isGuest ? undefined : userId,
        guestEmail: isGuest ? cart.guestEmail : undefined,
        orderIds: orders.map((o) => o._id),
        gatewayTransactionId: transactionRef,
        paymentMethod: method,
        paymentGateway: cart.paymentGateway,
        paymentStatus,
        amountBig: totalBig,
        currency: cart.currency,
        gatewayResponse,
        session,
      });

      // 7️⃣ Handle failure
      if (!success) {
        throw new AppError(
          `Payment initiation failed: ${response?.message || 'Gateway error'}`,
          502
        );
      }

      // 8️⃣ Finalize cart state
      await this._finalizeCart(cart, transaction, session);

      return {
        clientSecret,
        transactionRef,
        idempotencyKey: key,
        amount: totalBig.toFixed(2),
        currency: cart.currency,
      };
    } catch (err) {
      logger.error('Gateway payment initiation error', {
        error: err.message,
        gatewayResponse,
      });
      throw err;
    }
  }

  /**
   * Finalize cart status and bind transaction after successful payment initiation
   * @param {mongoose.Document} cart - The cart document
   * @param {mongoose.Document} transaction - The transaction document
   * @param {mongoose.ClientSession} session - Mongoose session for atomic updates
   */
  static async _finalizeCart(cart, transaction, session) {
    cart.paymentTransactionId = transaction.transactionId;
    cart.status = CART_STATUS.PENDING_CHECKOUT;
    cart.locked = false;
    cart.lockAcquiredAt = null;

    // Optional: record timestamp of checkout initiation
    cart.checkoutInitiatedAt = new Date();

    await cart.save({ session });
  }

  /**
   * Resolves a safe and auditable payment status based on gateway success and raw response data
   * @param {boolean} success - Whether the gateway call succeeded
   * @param {Object} response - Gateway response object
   * @returns {string} Resolved PAYMENT_STATUS
   */
  static _resolvePaymentStatusFromGatewayResponse(success, response) {
    if (!success) return PAYMENT_STATUS.FAILED;

    const rawStatus = response?.data?.status?.toLowerCase?.();

    switch (rawStatus) {
      case 'partial':
        return PAYMENT_STATUS.CAPTURED_PARTIAL;
      case 'success':
      case 'pending':
        return PAYMENT_STATUS.PENDING;
      default:
        return PAYMENT_STATUS.UNKNOWN;
    }
  }

  /**
   * Completes the checkout process after verified payment.
   * Ensures order, cart, payment, and inventory records are finalized atomically.
   *
   * @param {Object} params
   * @param {String} params.cartId
   * @param {String} params.transactionRef
   * @param {String} [params.userId]
   * @param {Boolean} [params.isGuest=false]
   * @returns {Object} { cart, order }
   */
  static async completeCheckout({ cartId, transactionRef, userId = null, isGuest = false }) {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      // 🛒 1. Load cart with materials for stock check
      const cart = await Cart.findById(cartId).populate('items.material').session(session);
      if (!cart) throw new AppError('Cart not found', 404);

      // 🧾 2. Idempotent early return
      if (cart.status === CART_STATUS.COMPLETED) {
        const order = await Order.findById(cart.order).session(session);
        logger.info('Checkout already completed (idempotent)', { cartId, transactionRef });

        if (session.inTransaction()) {
          await session.commitTransaction();
        }

        return { cart, order };
      }

      // 🔐 3. Identity + access check
      await CartValidationService.ensureValidIdentifiers({
        userId: userId?.toString(),
        guestEmail: cart.guestEmail,
        guestCartId: cart.guestCartId,
        shippingAddress: cart.shippingAddress,
        guestFullName: cart.guestFullName,
        guestPhoneNumber: cart.guestPhoneNumber,
      });

      if (isGuest && (!cart.guestEmail || !cart.guestFullName || !cart.guestPhoneNumber)) {
        throw new AppError('Guest checkout: missing contact information', 400);
      }

      if (!isGuest) {
        if (!cart.user || cart.user.toString() !== userId) {
          throw new AppError('Unauthorized access to cart', 403);
        }
      }

      // 💳 4. Fetch successful payment by gateway reference
     const payment = await Payment.findOne({
       gatewayTransactionId: transactionRef,
       paymentStatus: {
         $in: [PAYMENT_STATUS.SUCCESS, PAYMENT_STATUS.CAPTURED, PAYMENT_STATUS.CAPTURED_PARTIAL],
       },
     }).session(session);
      if (!payment) {
        throw new AppError('Payment not found or incomplete', 404);
      }

      // 🔗 5. Resolve transaction
      const transaction = await Transaction.findById(payment.transaction).session(session);
      if (!transaction) throw new AppError('Transaction not found', 404);
      if (
        ![TRANSACTION_STATUSES.PENDING, TRANSACTION_STATUSES.PROCESSING].includes(
          transaction.status
        )
      ) {
        throw new AppError('Transaction already finalized or invalid', 409);
      }

      // 🧮 6. Recompute and verify totals for integrity check
      const totals = await CartTotalsService.computeTotals(cart, session);
      const expectedAmount = parseFloat(totals.total).toFixed(2);
      const actualAmount = parseFloat(payment.amountPaid).toFixed(2);

      if (actualAmount !== expectedAmount || payment.currency !== cart.currency) {
        throw new AppError('Payment amount mismatch with cart total', 400);
      }

      // 🏷️ 7. Deduct stock for physical/hybrid items only
      for (const item of cart.items) {
        const isPhysical = !item.digitalDownload;
        const availableQty = item.material?.physicalContent?.stockQty ?? 0;

        if (isPhysical && availableQty < item.quantity) {
          throw new AppError(`Insufficient stock for "${item.material?.title}"`, 400);
        }

        if (isPhysical) {
          await CartStockService.deductStock(item.material._id, item.quantity, session);
        }
      }

      // 🔄 8. Mark transaction as COMPLETED
      transaction.status = TRANSACTION_STATUSES.COMPLETED;
      transaction.statusHistory.push({
        status: TRANSACTION_STATUSES.COMPLETED,
        changedAt: new Date(),
        reason: 'Confirmed via webhook or client callback',
      });
      await transaction.save({ session });

      // 📜 9. Update associated order(s)
      const orderIds = transaction.orders; // Array of order IDs
      await OrderService.updateOrderStatus(
        {
          orderId: orderIds,
          status: ORDER_STATUS.COMPLETED,
          fulfilledAt: new Date(),
          note: 'Completed via verified payment',
        },
        session
      );

      // 🛍️ 10. Finalize cart
      cart.status = CART_STATUS.COMPLETED;
      cart.locked = false;
      cart.completedAt = new Date();
      cart.order = transaction.orders;

      cart.__allowComplete = true; // flag for validation bypass
      await cart.save({ session });

      // 📧 11. Send confirmation (optional)
      const userDoc = !isGuest ? await User.findById(userId).session(session) : null;
      const email = isGuest ? cart.guestEmail : userDoc?.email;

      if (email) {
        // await NotificationService.sendOrderConfirmation({ orderId: transaction.order, userId, email });
        logger.info('📨 Order confirmation scheduled', { email, cartId });
      } else {
        logger.warn('No email for confirmation notice', { cartId, transactionRef });
      }

      // ✅ 12. Commit transaction
      if (session.inTransaction()) {
        await session.commitTransaction();
      }

      const finalizedOrders = await Order.find({ _id: { $in: orderIds } }).session(session);

      logger.info('Checkout finalized', {
        cartId,
        transactionId: transaction.transactionId,
        orderId: finalizedOrders.orderId,
        paymentId: payment._id,
      });

      return { cart, order: finalizedOrders };
    } catch (error) {
      if (session.inTransaction()) {
        await session.abortTransaction();
      }

      logger.error('Checkout finalization failed', {
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
   * Cancels the checkout process and safely rolls back any linked payment/transaction/order
   * @param {Object} params
   * @param {String} params.cartId
   * @param {String} [params.userId]
   * @param {Boolean} [params.isGuest=false]
   * @returns {Object} The updated cart
   */
  static async cancelCheckout({ cartId, userId = null, isGuest = false }) {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      // 1️⃣ Load cart
      const cart = await Cart.findById(cartId).session(session);
      if (!cart) throw new AppError('Cart not found', 404);

      if (cart.status === CART_STATUS.COMPLETED) {
        throw new AppError('Cannot cancel a completed checkout', 400);
      }

      if (cart.status === CART_STATUS.ABANDONED) {
        logger.warn('Cancel ignored: cart already abandoned', { cartId });
        await session.commitTransaction();
        return cart;
      }

      // 2️⃣ Validate ownership
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

      // 3️⃣ Cancel transaction and payment if still in progress
      const transaction = await Transaction.findOne({
        transactionId: cart.paymentTransactionId,
        status: { $in: [TRANSACTION_STATUSES.PENDING, TRANSACTION_STATUSES.PROCESSING] },
      }).session(session);

      if (transaction) {
        const pendingPayment = await Payment.findOne({
          transaction: transaction._id,
          paymentStatus: PAYMENT_STATUS.PENDING,
        }).session(session);

        if (pendingPayment) {
          pendingPayment.paymentStatus = PAYMENT_STATUS.FAILED;
          pendingPayment.failureReason = 'Cancelled by user';
          pendingPayment.gatewayResponse = {
            ...pendingPayment.gatewayResponse,
            status: 'cancelled_by_user',
            cancelledAt: new Date(),
          };
          await pendingPayment.save({ session });

          logger.info('Pending payment marked as failed', {
            paymentId: pendingPayment._id,
            cartId,
          });
        }

        transaction.status = TRANSACTION_STATUSES.CANCELED;
        transaction.statusHistory.push({
          status: TRANSACTION_STATUSES.CANCELED,
          changedAt: new Date(),
          reason: 'Checkout cancelled by user',
        });
        await transaction.save({ session });

        logger.info('Transaction cancelled', {
          transactionId: transaction.transactionId,
          cartId,
        });

        // Optional: cancel all linked orders
        await OrderService.updateOrderStatus(
          {
            orderId: transaction.orders,
            status: ORDER_STATUS.CANCELED,
            note: 'Cancelled by user during checkout',
          },
          session
        );

        logger.info('Orders marked as cancelled', {
          orderIds: transaction.orders,
          cartId,
        });
      }

      // 4️⃣ Mark cart abandoned
      cart.status = CART_STATUS.ABANDONED;
      cart.abandonedReason = 'Cancelled by user';
      cart.locked = false;
      cart.lockAcquiredAt = null;
      await cart.save({ session });

      await session.commitTransaction();

      logger.info('Checkout cancelled successfully', {
        cartId,
        userId: userId || 'guest',
      });

      return cart;
    } catch (err) {
      await session.abortTransaction();
      logger.error('Checkout cancellation failed', {
        cartId,
        userId: userId || 'guest',
        error: err.message,
        stack: err.stack,
      });
      throw err;
    } finally {
      session.endSession();
    }
  }
}

export default CheckoutService;

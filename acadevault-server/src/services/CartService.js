import mongoose from "mongoose";
import AcademicMaterial from "../api/models/AcademicMaterialModel.js";
import Address from "../api/models/AddressModel.js";
import Cart from "../api/models/CartModel.js";
import Order from "../api/models/OrderModel.js";
import Payment from "../api/models/PaymentModel.js";
import Transaction from "../api/models/TransactionModel.js";
import { MAX_CART_ITEMS, MAX_STOCK_LIMIT } from "../config/cartConfig.js";
import {
  CART_STATUS,
  ORDER_STATUS,
  PAYMENT_METHODS,
  PAYMENT_STATUS,
} from "../constants/enums.js";
import { generateDownloadCode } from "../helper/generateDownloadCode.js";
import resolveActiveCart from "../helper/resolveActiveCart.js";
import updateCartTotals from "../helper/updateCartTotals.js";
import AppError from "../utils/HandleAppErrors.js";
import { logger } from "../utils/logger.js";
import taxCalculation from "../utils/taxCalculation.js";
import EmailService from "./EmailService.js";
import FulfillmentService from "./fulfillmentService.js";
import PaymentGateway from "./paymentGateway.js";
import PriceService from "./PriceService.js";
import StockService from "./StockService.js";

const { startSession } = mongoose;

/**
 * Service class for cart-related operations.
 */
class CartService {
  /**
   * Retrieves the active cart for a user or guest, creating one if none exists.
   * @param {Object|null} user - Authenticated user object or null for guest.
   * @param {string|null} [guestCartId=null] - Guest cart ID.
   * @param {string|null} [guestEmail=null] - Guest email.
   * @returns {Promise<Object>} - Active cart with populated items.material.
   * @throws {AppError} - If validation fails or cart retrieval fails.
   */
  static async getActiveCart(
    user = null,
    guestCartId = null,
    guestEmail = null
  ) {
    // Validate inputs
    if (!user && !guestCartId && !guestEmail) {
      throw new AppError("Provide guestCartId or guestEmail, or log in", 401);
    }
    if (guestEmail && !validator.isEmail(guestEmail)) {
      throw new AppError("Invalid guestEmail format", 400);
    }
    if (guestCartId && !validator.isUUID(guestCartId, 4)) {
      throw new AppError("Invalid guestCartId format (must be UUID v4)", 400);
    }

    // Sanitize inputs
    const sanitizedGuestCartId = guestCartId
      ? validator.escape(guestCartId.toString())
      : null;
    const sanitizedGuestEmail = guestEmail
      ? validator.escape(guestEmail.toString())
      : null;

    try {
      // Resolve active cart
      const guestData = user
        ? {}
        : {
            guestCartId: sanitizedGuestCartId,
            guestEmail: sanitizedGuestEmail,
          };
      const cart = await resolveActiveCart(user, guestData);

      // Check for expired guest cart
      if (!user && cart.expiresAt && cart.expiresAt < new Date()) {
        await Cart.deleteOne({ _id: cart._id });
        logger.info(`Deleted expired guest cart: ${cart._id}`, {
          guestCartId: sanitizedGuestCartId,
          guestEmail: sanitizedGuestEmail,
        });
        const newCart = await resolveActiveCart(user, guestData);
        await newCart.populate("items.material");
        return newCart;
      }

      // Populate materials
      await cart.populate("items.material");

      logger.info(`Cart retrieved: ${cart._id}`, {
        userId: user?._id,
        guestCartId: sanitizedGuestCartId,
        guestEmail: sanitizedGuestEmail,
      });

      return cart;
    } catch (err) {
      logger.error(`Failed to retrieve cart: ${err.message}`, {
        userId: user?._id,
        guestCartId: sanitizedGuestCartId,
        guestEmail: sanitizedGuestEmail,
      });
      throw new AppError(
        `Failed to retrieve cart: ${err.message}`,
        err.statusCode || 500
      );
    }
  }

  /**
   * Adds an item to a user or guest cart, updating totals and validating stock.
   * @param {Object|null} user - Authenticated user object or null for guest.
   * @param {string|null} guestCartId - Unique ID for guest cart.
   * @param {string} materialId - ID of the material to add.
   * @param {number} quantity - Quantity to add (positive integer).
   * @returns {Promise<Object>} - Updated cart document with populated items.material.
   * @throws {AppError} - If validation fails, material not found, or stock insufficient.
   */
  static async addItemToCart(user, guestCartId, materialId, quantity) {
    // Validate inputs
    if (!Number.isInteger(quantity) || quantity <= 0) {
      throw new AppError("Quantity must be a positive integer", 400);
    }
    if (!mongoose.Types.ObjectId.isValid(materialId)) {
      throw new AppError("Invalid material ID", 400);
    }
    if (!user && !guestCartId) {
      throw new AppError("Guest cart requires guestCartId", 400);
    }

    const session = await startSession();
    session.startTransaction();

    try {
      // Resolve active cart
      const guestData = user ? {} : { guestCartId };
      const cart = await resolveActiveCart(user, guestData, session);

      // Validate cart size
      if (cart.items.length >= MAX_CART_ITEMS) {
        throw new AppError(`Cart cannot exceed ${MAX_CART_ITEMS} items`, 400);
      }

      // Fetch material
      const material =
        await AcademicMaterial.findById(materialId).session(session);
      if (!material) {
        throw new AppError("Material not found", 404);
      }

      // Validate stock for physical/hybrid items
      const isPhysical = ["physical", "hybrid"].includes(
        material.deliveryFormat
      );
      if (isPhysical && (material.physicalContent?.stockQty ?? 0) < quantity) {
        throw new AppError(
          `Only ${material.physicalContent?.stockQty ?? 0} left in stock`,
          400
        );
      }

      // Fetch price
      const priceInfo = await PriceService.getEffectivePrice(
        material._id,
        material.materialType,
        { currency: cart.currency || "NGN" }
      );
      if (!priceInfo || typeof priceInfo.amount !== "number") {
        throw new AppError(`No valid price for material ${materialId}`, 500);
      }

      const unitPrice = priceInfo.amount;
      const currency = priceInfo.currency || cart.currency || "NGN";

      // Update or add item
      const existingItem = cart.items.find((item) =>
        item.material.equals(materialId)
      );
      if (existingItem) {
        existingItem.quantity = Math.min(
          existingItem.quantity + quantity,
          MAX_STOCK_LIMIT
        );
        existingItem.unitPrice = taxCalculation.toDecimal128(unitPrice);
        existingItem.currency = currency;
        existingItem.taxAmount = taxCalculation.toDecimal128(0); // Reset, updated by updateCartTotals
        existingItem.discountAmount = taxCalculation.toDecimal128(0); // Reset
        existingItem.finalPrice = taxCalculation.toDecimal128(
          parseFloat(existingItem.unitPrice) * existingItem.quantity
        );
        existingItem.digitalDownload = material.deliveryFormat === "digital";
      } else {
        cart.items.push({
          material: materialId,
          quantity: Math.min(quantity, MAX_STOCK_LIMIT),
          unitPrice: taxCalculation.toDecimal128(unitPrice),
          currency,
          taxAmount: taxCalculation.toDecimal128(0),
          discountAmount: taxCalculation.toDecimal128(0),
          finalPrice: taxCalculation.toDecimal128(unitPrice * quantity),
          digitalDownload: material.deliveryFormat === "digital",
        });
      }

      // Recalculate totals
      await updateCartTotals(cart, currency, false);

      // Save cart
      await cart.save({ session });

      // Populate materials for response
      await cart.populate("items.material");

      // Commit transaction
      await session.commitTransaction();
      logger.info(`Added item to cart: ${cart._id}`, {
        userId: user?._id,
        guestCartId,
        materialId,
        quantity,
      });

      return cart;
    } catch (err) {
      await session.abortTransaction();
      logger.error(`Error adding item to cart: ${err.message}`, {
        userId: user?._id,
        guestCartId,
        materialId,
        quantity,
      });
      throw new AppError(err.message, err.statusCode || 500);
    } finally {
      session.endSession();
    }
  }

  /**
   * Merges guest cart items into an authenticated user's cart and cleans up the guest cart.
   * @param {string} userId - ID of the authenticated user.
   * @param {Array<{materialId: string, quantity: number}>} items - Items to sync.
   * @param {string|null} [guestCartId=null] - Guest cart ID to clean up.
   * @param {string|null} [guestEmail=null] - Guest email to clean up.
   * @returns {Promise<Object>} - Updated user cart with populated items.material.
   * @throws {AppError} - If validation fails, material not found, or stock insufficient.
   */
  static async mergeGuestCartToUser(
    userId,
    items,
    guestCartId = null,
    guestEmail = null
  ) {
    // Validate inputs
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      throw new AppError("Invalid user ID", 400);
    }
    if (!Array.isArray(items) || items.length === 0) {
      throw new AppError("No items to sync", 400);
    }

    const session = await startSession();
    session.startTransaction();

    try {
      // Resolve user cart
      const user = { _id: userId };
      const userCart = await resolveActiveCart(user, {}, session);

      // Validate cart size
      if (userCart.items.length + items.length > MAX_CART_ITEMS) {
        throw new AppError(`Cart cannot exceed ${MAX_CART_ITEMS} items`, 400);
      }

      // Process each item
      for (const { materialId, quantity } of items) {
        if (!mongoose.Types.ObjectId.isValid(materialId)) {
          throw new AppError(`Invalid material ID: ${materialId}`, 400);
        }
        if (!Number.isInteger(quantity) || quantity <= 0) {
          throw new AppError(
            `Invalid quantity for material ${materialId}`,
            400
          );
        }

        // Fetch material
        const material =
          await AcademicMaterial.findById(materialId).session(session);
        if (!material) {
          throw new AppError(`Material ${materialId} not found`, 404);
        }

        // Validate stock for physical/hybrid items
        const isPhysical = ["physical", "hybrid"].includes(
          material.deliveryFormat
        );
        if (
          isPhysical &&
          (material.physicalContent?.stockQty ?? 0) < quantity
        ) {
          throw new AppError(
            `Only ${material.physicalContent?.stockQty ?? 0} left in stock for ${material.title}`,
            400
          );
        }

        // Fetch price
        const priceInfo = await PriceService.getEffectivePrice(
          material._id,
          material.materialType,
          { currency: userCart.currency || "NGN" }
        );
        if (!priceInfo || typeof priceInfo.amount !== "number") {
          throw new AppError(`No valid price for material ${materialId}`, 500);
        }

        const unitPrice = priceInfo.amount;
        const currency = priceInfo.currency || userCart.currency || "NGN";

        // Update or add item
        const existingItem = userCart.items.find((item) =>
          item.material.equals(materialId)
        );
        if (existingItem) {
          existingItem.quantity = Math.min(
            existingItem.quantity + quantity,
            MAX_STOCK_LIMIT
          );
          existingItem.unitPrice = taxCalculation.toDecimal128(unitPrice);
          existingItem.currency = currency;
          existingItem.taxAmount = taxCalculation.toDecimal128(0); // Reset, updated by updateCartTotals
          existingItem.discountAmount = taxCalculation.toDecimal128(0); // Reset
          existingItem.finalPrice = taxCalculation.toDecimal128(
            parseFloat(existingItem.unitPrice) * existingItem.quantity
          );
          existingItem.digitalDownload = material.deliveryFormat === "digital";
        } else {
          userCart.items.push({
            material: materialId,
            quantity: Math.min(quantity, MAX_STOCK_LIMIT),
            unitPrice: taxCalculation.toDecimal128(unitPrice),
            currency,
            taxAmount: taxCalculation.toDecimal128(0),
            discountAmount: taxCalculation.toDecimal128(0),
            finalPrice: taxCalculation.toDecimal128(unitPrice * quantity),
            digitalDownload: material.deliveryFormat === "digital",
          });
        }
      }

      // Recalculate totals
      await updateCartTotals(userCart, userCart.currency || "NGN", false);

      // Clean up guest cart
      if (guestCartId || guestEmail) {
        const deleteResult = await Cart.deleteOne({
          $or: [
            ...(guestCartId
              ? [{ guestCartId, status: CART_STATUS.ACTIVE }]
              : []),
            ...(guestEmail ? [{ guestEmail, status: CART_STATUS.ACTIVE }] : []),
          ],
        }).session(session);
        if (deleteResult.deletedCount > 0) {
          logger.info(`Deleted guest cart: ${guestCartId || guestEmail}`, {
            userId,
          });
        }
      }

      // Save and populate
      await userCart.save({ session });
      await userCart.populate("items.material");

      // Commit transaction
      await session.commitTransaction();
      logger.info(`Synced guest cart to user cart: ${userCart._id}`, {
        userId,
        guestCartId,
        guestEmail,
        itemCount: items.length,
      });

      return userCart;
    } catch (err) {
      await session.abortTransaction();
      logger.error(`Failed to sync guest cart: ${err.message}`, {
        userId,
        guestCartId,
        guestEmail,
        items: items.map((item) => ({
          materialId: item.materialId,
          quantity: item.quantity,
        })),
      });
      throw new AppError(err.message, err.statusCode || 500);
    } finally {
      session.endSession();
    }
  }

  /**
   * Removes an item from the cart or reduces its quantity.
   * @param {Object|null} user - Authenticated user or null for guest.
   * @param {string|null} guestEmail - Guest email for identification.
   * @param {string} materialId - ID of the material to remove.
   * @param {number|null} [quantityToRemove=null] - Quantity to remove (null to remove all).
   * @returns {Promise<Object>} - Updated cart or { message } if cart is deleted.
   * @throws {AppError} - If validation fails or item not found.
   */
  static async removeItemFromCart(
    user,
    guestEmail,
    materialId,
    quantityToRemove = null
  ) {
    if (!mongoose.Types.ObjectId.isValid(materialId)) {
      throw new AppError("Invalid material ID", 400);
    }
    if (
      quantityToRemove !== null &&
      (!Number.isInteger(quantityToRemove) || quantityToRemove <= 0)
    ) {
      throw new AppError("Quantity to remove must be a positive integer", 400);
    }
    if (!user && !guestEmail) {
      throw new AppError("Provide guestEmail or log in", 401);
    }
    if (guestEmail && !validator.isEmail(guestEmail)) {
      throw new AppError("Invalid guestEmail format", 400);
    }

    const session = await startSession();
    session.startTransaction();

    try {
      // Retrieve active cart
      const cart = await this.getActiveCart(user, null, guestEmail);
      if (!cart) {
        throw new AppError("No active cart found", 404);
      }

      // Find item in cart
      const itemIndex = cart.items.findIndex((item) =>
        item.material.equals(materialId)
      );
      if (itemIndex === -1) {
        throw new AppError("Item not found in cart", 404);
      }

      const item = cart.items[itemIndex];

      // Remove item or reduce quantity
      if (!quantityToRemove || item.quantity <= quantityToRemove) {
        cart.items.splice(itemIndex, 1); // Remove entire item
      } else {
        item.quantity -= quantityToRemove;
        item.finalPrice = taxCalculation.toDecimal128(
          parseFloat(item.unitPrice) * item.quantity
        );
        item.taxAmount = taxCalculation.toDecimal128(0); // Reset, updated by updateCartTotals
        item.discountAmount = taxCalculation.toDecimal128(0); // Reset
      }

      // Handle empty cart
      if (cart.items.length === 0) {
        await Cart.deleteOne({ _id: cart._id }, { session });
        await session.commitTransaction();
        logger.info(`Deleted empty cart: ${cart._id}`, {
          userId: user?._id,
          guestEmail,
          materialId,
        });
        return { message: "Cart is now empty and has been removed" };
      }

      // Recalculate totals
      await updateCartTotals(cart, cart.currency || "NGN", false);
      await cart.save({ session });

      // Populate materials for response
      await cart.populate("items.material");

      await session.commitTransaction();
      logger.info(`Removed item from cart: ${cart._id}`, {
        userId: user?._id,
        guestEmail,
        materialId,
        quantityToRemove,
      });

      return cart;
    } catch (err) {
      await session.abortTransaction();
      logger.error(`Failed to remove item from cart: ${err.message}`, {
        userId: user?._id,
        guestEmail,
        materialId,
        quantityToRemove,
      });
      throw new AppError(
        `Failed to remove item from cart: ${err.message}`,
        err.statusCode || 500
      );
    } finally {
      session.endSession();
    }
  }

  /**
   * Updates the quantity of an item in the cart.
   * @param {Object|null} user - Authenticated user or null for guest.
   * @param {string|null} guestEmail - Guest email for identification.
   * @param {string} materialId - ID of the material to update.
   * @param {number} quantity - New quantity (positive integer).
   * @returns {Promise<Object>} - Updated cart with populated items.material.
   * @throws {AppError} - If validation fails, item not found, or stock insufficient.
   */
  static async updateItemQuantity(user, guestEmail, materialId, quantity) {
    if (!mongoose.Types.ObjectId.isValid(materialId)) {
      throw new AppError("Invalid material ID", 400);
    }
    if (!Number.isInteger(quantity) || quantity < 1) {
      throw new AppError("Quantity must be at least 1", 400);
    }
    if (!user && !guestEmail) {
      throw new AppError("Provide guestEmail or log in", 401);
    }
    if (guestEmail && !validator.isEmail(guestEmail)) {
      throw new AppError("Invalid guestEmail format", 400);
    }

    const session = await startSession();
    session.startTransaction();

    try {
      // Retrieve active cart
      const cart = await this.getActiveCart(user, null, guestEmail);
      if (!cart) {
        throw new AppError("No active cart found", 404);
      }

      // Find item in cart
      const item = cart.items.find((item) => item.material.equals(materialId));
      if (!item) {
        throw new AppError("Item not found in cart", 404);
      }

      // Fetch material for stock check
      const material =
        await AcademicMaterial.findById(materialId).session(session);
      if (!material) {
        throw new AppError("Material not found", 404);
      }

      // Stock check for physical/hybrid
      const isPhysical = ["physical", "hybrid"].includes(
        material.deliveryFormat
      );
      if (isPhysical && (material.physicalContent?.stockQty ?? 0) < quantity) {
        throw new AppError(
          `Only ${material.physicalContent?.stockQty ?? 0} left in stock`,
          400
        );
      }

      // Update item
      item.quantity = Math.min(quantity, MAX_STOCK_LIMIT);
      item.finalPrice = taxCalculation.toDecimal128(
        parseFloat(item.unitPrice) * item.quantity
      );
      item.taxAmount = taxCalculation.toDecimal128(0); // Reset
      item.discountAmount = taxCalculation.toDecimal128(0); // Reset

      // Recalculate totals
      await updateCartTotals(cart, cart.currency || "NGN", false);

      // Save and populate
      await cart.save({ session });
      await cart.populate("items.material");

      await session.commitTransaction();
      logger.info(`Updated item quantity in cart: ${cart._id}`, {
        userId: user?._id,
        guestEmail,
        materialId,
        quantity,
      });

      return cart;
    } catch (err) {
      await session.abortTransaction();
      logger.error(`Failed to update item quantity: ${err.message}`, {
        userId: user?._id,
        guestEmail,
        materialId,
        quantity,
      });
      throw new AppError(
        `Failed to update item quantity: ${err.message}`,
        err.statusCode || 500
      );
    } finally {
      session.endSession();
    }
  }

  /**
   * Applies a discount code to the cart.
   * @param {Object|null} user - Authenticated user or null for guest.
   * @param {string|null} guestEmail - Guest email for identification.
   * @param {string} discountCode - Discount code to apply.
   * @returns {Promise<Object>} - Updated cart with populated items.material.
   * @throws {AppError} - If validation fails or discount application fails.
   */
  static async applyDiscountCode(user, guestEmail, discountCode) {
    if (!discountCode || typeof discountCode !== "string") {
      throw new AppError("Invalid discount code", 400);
    }
    if (!user && !guestEmail) {
      throw new AppError("Provide guestEmail or log in", 401);
    }
    if (guestEmail && !validator.isEmail(guestEmail)) {
      throw new AppError("Invalid guestEmail format", 400);
    }

    const session = await startSession();
    session.startTransaction();

    try {
      // Retrieve active cart
      const cart = await this.getActiveCart(user, null, guestEmail);
      if (!cart) {
        throw new AppError("No active cart found", 404);
      }

      // Validate discount code
      const subtotal = parseFloat(cart.subtotal || 0);
      const categories = cart.items.map(
        (item) => item.material?.category || "unknown"
      );
      const discountResult = await DiscountService.applyDiscount(
        discountCode,
        user?._id,
        subtotal,
        categories
      );
      if (!discountResult.success) {
        throw new AppError(
          discountResult.message || "Invalid discount code",
          400
        );
      }

      // Apply discount
      cart.discountCode = discountCode;
      cart.discountAmount = taxCalculation.toDecimal128(
        discountResult.discountedTotal
          ? subtotal - discountResult.discountedTotal
          : 0
      );

      // Distribute discounts proportionally
      const totalWeight = cart.items.reduce(
        (sum, item) => sum + parseFloat(item.finalPrice),
        0
      );
      cart.items.forEach((item) => {
        const itemWeight = parseFloat(item.finalPrice) / (totalWeight || 1);
        item.discountAmount = taxCalculation.toDecimal128(
          parseFloat(cart.discountAmount) * itemWeight
        );
        item.finalPrice = taxCalculation.toDecimal128(
          parseFloat(item.unitPrice) * item.quantity -
            parseFloat(item.discountAmount)
        );
      });

      // Recalculate totals
      await updateCartTotals(cart, cart.currency || "NGN", false);

      // Save and populate
      await cart.save({ session });
      await cart.populate("items.material");

      await session.commitTransaction();
      logger.info(`Applied discount code to cart: ${cart._id}`, {
        userId: user?._id,
        guestEmail,
        discountCode,
      });

      return cart;
    } catch (err) {
      await session.abortTransaction();
      logger.error(`Failed to apply discount code: ${err.message}`, {
        userId: user?._id,
        guestEmail,
        discountCode,
      });
      throw new AppError(
        `Failed to apply discount code: ${err.message}`,
        err.statusCode || 500
      );
    } finally {
      session.endSession();
    }
  }

  /**
   * Initiates the checkout process, validating cart and generating a payment session.
   * @param {Object} params - Checkout parameters
   * @param {Object|null} params.user - Authenticated user or null for guest
   * @param {string|null} params.guestEmail - Guest email
   * @param {string|null} params.discountCode - Optional discount code
   * @param {string} params.shippingAddressId - Shipping address ID
   * @param {string} [params.paymentCurrency="NGN"] - Payment currency
   * @param {string} params.gateway - Payment gateway
   * @returns {Promise<Object>} - Payment session details (URL, ID, currency, exchange rate)
   * @throws {AppError} - If validation fails or payment session creation fails
   */
  static async initiateCheckout({
    user,
    guestEmail,
    discountCode,
    shippingAddressId,
    paymentCurrency = "NGN",
    gateway,
  }) {
    if (!user && !guestEmail) {
      throw new AppError("Provide guestEmail or log in", 401);
    }
    if (guestEmail && !validator.isEmail(guestEmail)) {
      throw new AppError("Invalid guestEmail format", 400);
    }
    if (!mongoose.Types.ObjectId.isValid(shippingAddressId)) {
      throw new AppError("Invalid shipping address ID", 400);
    }
    if (!gateway || typeof gateway !== "string") {
      throw new AppError("Invalid payment gateway", 400);
    }

    const session = await startSession();
    session.startTransaction();

    try {
      // Retrieve active cart
      const cart = await this.getActiveCart(user, null, guestEmail);
      if (!cart || cart.items.length === 0) {
        throw new AppError("Cart is empty", 400);
      }

      // Validate shipping address
      const shippingAddress =
        await Address.findById(shippingAddressId).session(session);
      if (!shippingAddress) {
        throw new AppError("Invalid shipping address", 400);
      }
      if (
        user &&
        shippingAddress.ownerType === "User" &&
        shippingAddress.owner.toString() !== user._id.toString()
      ) {
        throw new AppError("This address does not belong to you", 403);
      }
      if (shippingAddress.type !== "shipping") {
        throw new AppError("Selected address is not a shipping address", 400);
      }

      cart.shippingAddress = shippingAddress._id;

      // Apply discount if provided
      if (discountCode) {
        const subtotal = parseFloat(cart.subtotal || 0);
        const categories = cart.items.map(
          (item) => item.material?.category || "unknown"
        );
        const discountResult = await DiscountService.applyDiscount(
          discountCode,
          user?._id,
          subtotal,
          categories
        );
        if (discountResult.success) {
          cart.discountCode = discountCode;
          cart.discountAmount = taxCalculation.toDecimal128(
            discountResult.discountedTotal
              ? subtotal - discountResult.discountedTotal
              : 0
          );
          cart.appliedCoupons = cart.appliedCoupons || [];
          cart.appliedCoupons.push({
            code: discountCode,
            discountValue: cart.discountAmount,
          });
        } else {
          logger.warn(`Discount not applied: ${discountResult.message}`, {
            userId: user?._id,
            guestEmail,
            discountCode,
          });
        }
      }

      // Recalculate totals with checkout flag
      await updateCartTotals(cart, paymentCurrency, true);

      // Mock currency conversion (replace with actual service)
      const exchangeRate =
        paymentCurrency === "NGN"
          ? 1
          : await this.getExchangeRate("NGN", paymentCurrency);
      const totalInLocalCurrency = parseFloat(cart.totalPrice) * exchangeRate;

      // Create payment session
      const paymentSession = await PaymentGateway.createPaymentSession({
        amount: totalInLocalCurrency,
        currency: paymentCurrency,
        userId: user?._id,
        guestEmail,
        cartId: cart._id,
        gateway,
      });

      // Store payment record
      const paymentRecord = await Payment.create(
        [
          {
            userId: user?._id || null,
            guestEmail: guestEmail || null,
            orderId: cart._id, // Temporary, updated in completeCheckout
            transactionId: paymentSession.id,
            paymentMethod: PAYMENT_METHODS.CARD,
            paymentStatus: PAYMENT_STATUS.PENDING,
            amountPaid: taxCalculation.toDecimal128(totalInLocalCurrency),
            currency: paymentCurrency,
            paymentGateway: gateway,
            gatewayTransactionId: paymentSession.id,
            exchangeRate: taxCalculation.toDecimal128(exchangeRate),
            totalAmountInStoreCurrency: cart.totalPrice,
          },
        ],
        { session }
      );

      // Attach payment to cart
      cart.paymentTransactionId = paymentRecord[0]._id;
      cart.currency = paymentCurrency;
      cart.exchangeRate = taxCalculation.toDecimal128(exchangeRate);
      await cart.save({ session });

      await session.commitTransaction();
      logger.info(`Checkout initiated for cart: ${cart._id}`, {
        userId: user?._id,
        guestEmail,
        paymentSessionId: paymentSession.id,
      });

      return {
        paymentUrl: paymentSession.paymentUrl,
        sessionId: paymentSession.id,
        currency: paymentCurrency,
        exchangeRate,
      };
    } catch (err) {
      await session.abortTransaction();
      logger.error(`Failed to initiate checkout: ${err.message}`, {
        userId: user?._id,
        guestEmail,
        shippingAddressId,
        discountCode,
        gateway,
      });
      throw new AppError(
        `Failed to initiate checkout: ${err.message}`,
        err.statusCode || 500
      );
    } finally {
      session.endSession();
    }
  }

  /**
   * Mock exchange rate function (replace with actual service).
   * @param {string} fromCurrency - Source currency.
   * @param {string} toCurrency - Target currency.
   * @returns {Promise<number>} - Exchange rate.
   */
  static async getExchangeRate(fromCurrency, toCurrency) {
    const rates = { NGN: 1, USD: 0.00067, EUR: 0.00062 }; // Mock rates
    return rates[toCurrency] / rates[fromCurrency];
  }

  /**
   * Completes the checkout process after successful payment.
   * @param {Object|null} user - Authenticated user or null for guest.
   * @param {string|null} guestEmail - Guest email.
   * @param {string} paymentTransactionId - Payment transaction ID.
   * @returns {Promise<Object>} - Finalized order.
   * @throws {AppError} - If payment verification or order creation fails.
   */
  static async completeCheckout(user, guestEmail, paymentTransactionId) {
    if (!user && !guestEmail) {
      throw new AppError("Provide guestEmail or log in", 401);
    }
    if (guestEmail && !validator.isEmail(guestEmail)) {
      throw new AppError("Invalid guestEmail format", 400);
    }
    if (!paymentTransactionId || typeof paymentTransactionId !== "string") {
      throw new AppError("Invalid payment transaction ID", 400);
    }

    const session = await startSession();
    session.startTransaction();

    try {
      // Fetch cart
      const cart = await this.getActiveCart(user, null, guestEmail);
      if (!cart) {
        throw new AppError("Cart not found", 404);
      }

      // Verify payment
      const paymentRecord = await Payment.findOne({
        transactionId: paymentTransactionId,
      }).session(session);
      if (!paymentRecord) {
        throw new AppError("Payment record not found", 404);
      }
      const paymentDetails = await PaymentGateway.verifyPayment(
        paymentTransactionId,
        paymentRecord.paymentGateway
      );
      if (!paymentDetails.success) {
        throw new AppError("Payment verification failed", 400);
      }

      // Create order
      const orderId = `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
      const order = await Order.create(
        [
          {
            user: user?._id || null,
            guestEmail,
            orderId,
            items: cart.items.map((item) => ({
              material: item.material._id,
              shop: item.material.shop,
              quantity: item.quantity,
              unitPrice: item.unitPrice,
              subtotal: taxCalculation.toDecimal128(
                parseFloat(item.unitPrice) * item.quantity
              ),
              deliveryFormat: item.material.deliveryFormat,
              downloadUrl: null,
              fulfillmentStatus: "Pending",
            })),
            shippingAddress: cart.shippingAddress,
            billingAddress: cart.shippingAddress, // Assume same for simplicity
            discount: cart.discountCode || null,
            discountAmount: cart.discountAmount,
            orderStatus: ORDER_STATUS.PROCESSING,
            paymentStatus: PAYMENT_STATUS.SUCCESS,
            totalAmount: cart.totalPrice,
            taxAmount: cart.taxes,
            shippingFee: cart.shippingFee,
            grandTotal: cart.totalPrice,
            currency: cart.currency || "NGN",
            isDigital: cart.items.every(
              (item) => item.material.deliveryFormat === "digital"
            ),
            deliveryMethod: cart.items.every(
              (item) => item.material.deliveryFormat === "digital"
            )
              ? "digital"
              : "physical",
            pickupStationId: null,
            isGift: cart.isGift || false,
          },
        ],
        { session }
      );

      // Deduct stock
      for (const item of cart.items) {
        if (item.material.deliveryFormat !== "digital") {
          await StockService.deductStock(
            item.material._id,
            item.quantity,
            session
          );
        }
      }

      // Update payment record
      await Payment.findOneAndUpdate(
        { transactionId: paymentTransactionId },
        {
          orderId: order[0]._id,
          paymentMethod: paymentDetails.method,
          paymentStatus: PAYMENT_STATUS.SUCCESS,
          gatewayResponse: paymentDetails.rawResponse,
        },
        { session, new: true }
      );

      // Create transaction
      const transaction = await Transaction.create(
        [
          {
            user: user?._id || null,
            guestEmail,
            order: order[0]._id,
            shop: cart.items.length === 1 ? cart.items[0].material.shop : null,
            transactionType: "Purchase",
            amount: cart.totalPrice,
            currency: cart.currency || "NGN",
            exchangeRate: cart.exchangeRate || taxCalculation.toDecimal128(1),
            paymentMethod: paymentDetails.method,
            paymentGateway: paymentDetails.gateway,
            gatewayTransactionId: paymentTransactionId,
            paymentIntentId: paymentDetails.intentId || null,
            transactionReference: paymentDetails.reference || null,
            gatewayResponse: paymentDetails.rawResponse,
            status: "Completed",
            paidAt: new Date(),
            description: `Purchase of ${cart.items.length} item(s) via ${paymentDetails.method}`,
          },
        ],
        { session }
      );

      // Link transaction to order
      order[0].transaction = transaction[0]._id;
      await order[0].save({ session });

      // Generate download codes for digital items
      const downloadCodes = [];
      for (const item of cart.items) {
        if (item.material.deliveryFormat === "digital") {
          const downloadCode = await generateDownloadCode(
            user?._id,
            item.material._id
          );
          downloadCodes.push({
            materialTitle: item.material.title,
            code: downloadCode,
            expiration: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
          });
        }
      }

      // Handle fulfillment
      if (order[0].isDigital) {
        if (guestEmail) {
          await EmailService.sendDigitalDownload(guestEmail, downloadCodes);
        }
      } else {
        await FulfillmentService.createShipment(
          order[0]._id,
          order[0].shippingAddress
        );
      }

      // Mark cart as completed
      cart.status = CART_STATUS.COMPLETED;
      await cart.save({ session });

      // Send order confirmation
      await EmailService.sendOrderConfirmation(
        user?._id || guestEmail,
        order[0],
        downloadCodes
      );

      await session.commitTransaction();
      logger.info(`Checkout completed for order: ${order[0]._id}`, {
        userId: user?._id,
        guestEmail,
        paymentTransactionId,
      });

      return order[0];
    } catch (err) {
      await session.abortTransaction();
      logger.error(`Failed to complete checkout: ${err.message}`, {
        userId: user?._id,
        guestEmail,
        paymentTransactionId,
      });
      throw new AppError(
        `Failed to complete checkout: ${err.message}`,
        err.statusCode || 500
      );
    } finally {
      session.endSession();
    }
  }

  /**
   * Retrieves a summary of the active cart.
   * @param {Object|null} user - Authenticated user or null for guest.
   * @param {string|null} guestEmail - Guest email for identification.
   * @returns {Promise<Object|null>} - Cart summary (totalItems, cartTotal, currency) or null.
   * @throws {AppError} - If cart retrieval fails.
   */
  static async getCartSummary(user, guestEmail) {
    if (!user && !guestEmail) {
      throw new AppError("Provide guestEmail or log in", 401);
    }
    if (guestEmail && !validator.isEmail(guestEmail)) {
      throw new AppError("Invalid guestEmail format", 400);
    }

    try {
      const cart = await this.getActiveCart(user, null, guestEmail);
      if (!cart) {
        return null;
      }

      const totalItems = cart.items.reduce(
        (sum, item) => sum + item.quantity,
        0
      );
      const cartTotal = parseFloat(cart.totalPrice || 0);

      logger.info(`Cart summary retrieved: ${cart._id}`, {
        userId: user?._id,
        guestEmail,
        totalItems,
      });

      return {
        totalItems,
        cartTotal,
        currency: cart.currency || "NGN",
      };
    } catch (err) {
      logger.error(`Failed to retrieve cart summary: ${err.message}`, {
        userId: user?._id,
        guestEmail,
      });
      throw new AppError(
        `Failed to retrieve cart summary: ${err.message}`,
        err.statusCode || 500
      );
    }
  }
}

export default CartService;

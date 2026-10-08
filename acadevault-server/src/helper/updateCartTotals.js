import mongoose from "mongoose";
import DiscountService from "../services/discountService.js";
import PriceService from "../services/PriceService.js";
import AppError from "../utils/HandleAppErrors.js";
import { logger } from "../utils/logger.js";
import taxCalculation from "../utils/taxCalculation.js";
import { CART_STATUS } from "../constants/enums.js";

/**
 * Updates cart and item totals, including subtotal, taxes, shipping, and discounts.
 * @param {Object} cart - Mongoose cart document (populated or unpopulated).
 * @param {string} [targetCurrency="NGN"] - Target currency for calculations (default: NGN).
 * @param {boolean} [isCheckout=false] - Whether the recalculation is for checkout.
 * @returns {Promise<Object>} - Updated cart document with recalculated totals.
 * @throws {AppError} - If validation fails or calculations encounter errors.
 */
async function updateCartTotals(
  cart,
  targetCurrency = "NGN",
  isCheckout = false
) {
  try {
    // Validate cart
    if (
      !cart ||
      !cart.items ||
      !Array.isArray(cart.items) ||
      !cart.items.length
    ) {
      throw new AppError("Cart is empty or invalid", 400);
    }

    // Validate shipping address for checkout
    if (isCheckout && !cart.shippingAddress) {
      throw new AppError("Shipping address is required for checkout", 400);
    }

    // Validate cart status
    if (cart.status !== CART_STATUS.ACTIVE && !isCheckout) {
      throw new AppError(
        `Cart must be active for updates (current: ${cart.status})`,
        400
      );
    }

    // Initialize totals
    let subtotal = 0;
    const userCurrency = cart.currency || targetCurrency;

    // Populate materials if not already populated
    if (
      cart.items.some(
        (item) => !item.material || typeof item.material === "string"
      )
    ) {
      await cart.populate("items.material");
    }

    // Update item prices with currency conversion
    for (const item of cart.items) {
      if (!item.material?._id || !item.quantity || item.quantity <= 0) {
        throw new AppError(
          `Invalid item in cart: ${item.material?._id || "unknown"}`,
          400
        );
      }

      // Fetch current price
      const priceInfo = await PriceService.getEffectivePrice(
        item.material._id,
        item.material.materialType,
        { currency: userCurrency }
      );
      if (!priceInfo || typeof priceInfo.amount !== "number") {
        throw new AppError(
          `No valid price for material ${item.material._id}`,
          500
        );
      }

      // Apply exchange rate if currency differs
      const exchangeRate = cart.exchangeRate || 1;
      item.unitPrice = taxCalculation.toDecimal128(
        priceInfo.amount * exchangeRate
      );
      item.currency = userCurrency;
      item.finalPrice = taxCalculation.toDecimal128(
        parseFloat(item.unitPrice) * item.quantity
      );
      subtotal += parseFloat(item.finalPrice);
    }

    // Apply discounts
    let discountAmount = 0;
    if (cart.discountCode) {
      try {
        const discountResult = await DiscountService.applyDiscount(
          cart.discountCode,
          cart.user,
          subtotal,
          cart.items.map((item) => item.material?.category || "unknown")
        );
        discountAmount = discountResult?.discountedTotal
          ? subtotal - discountResult.discountedTotal
          : 0;
        discountAmount = Math.min(discountAmount, subtotal);
      } catch (err) {
        logger.warn(
          `Discount failed for code ${cart.discountCode}: ${err.message}`,
          {
            cartId: cart._id,
          }
        );
        discountAmount = 0;
      }
    }
    discountAmount = parseFloat(discountAmount.toFixed(2));

    // Calculate taxes and shipping
    const materials = cart.items.map((item) => ({
      _id: item.material._id,
      isDigital: item.material.isDigital || false,
      weight: item.material.weight || 0,
      price: parseFloat(item.unitPrice),
      quantity: item.quantity,
    }));

    const { finalTotal, breakdown } = await taxCalculation.calculateFinalTotal(
      subtotal - discountAmount,
      cart.shippingAddress,
      materials,
      userCurrency
    );

    // Update cart totals with Decimal128
    cart.subtotal = taxCalculation.toDecimal128(subtotal);
    cart.discountAmount = taxCalculation.toDecimal128(discountAmount);
    cart.taxes = taxCalculation.toDecimal128(breakdown.taxAmount);
    cart.shippingFee = taxCalculation.toDecimal128(breakdown.shippingFee);
    cart.totalPrice = taxCalculation.toDecimal128(finalTotal);
    cart.currency = userCurrency;

    // Distribute taxes and discounts proportionally
    const totalWeight = cart.items.reduce(
      (sum, item) => sum + parseFloat(item.finalPrice),
      0
    );
    cart.items.forEach((item) => {
      const itemWeight = parseFloat(item.finalPrice) / (totalWeight || 1);
      item.taxAmount = taxCalculation.toDecimal128(
        breakdown.taxAmount * itemWeight
      );
      item.discountAmount = taxCalculation.toDecimal128(
        discountAmount * itemWeight
      );
      item.finalPrice = taxCalculation.toDecimal128(
        parseFloat(item.unitPrice) * item.quantity +
          parseFloat(item.taxAmount) -
          parseFloat(item.discountAmount)
      );
    });

    // Ensure non-negative totals
    if (
      parseFloat(cart.totalPrice) < 0 ||
      parseFloat(cart.subtotal) < 0 ||
      parseFloat(cart.discountAmount) < 0
    ) {
      throw new AppError("Calculated cart totals are invalid", 500);
    }

    // Log successful recalculation
    logger.info(`Cart totals updated: ${cart._id}`, {
      subtotal: parseFloat(cart.subtotal),
      totalPrice: parseFloat(cart.totalPrice),
      currency: cart.currency,
    });

    return cart;
  } catch (err) {
    logger.error(`Cart totals update failed: ${err.message}`, {
      cartId: cart._id,
      items: cart.items?.map((item) => item.material?._id),
    });
    throw new AppError(
      `Cart totals update failed: ${err.message}`,
      err.statusCode || 500
    );
  }
}

export default updateCartTotals;

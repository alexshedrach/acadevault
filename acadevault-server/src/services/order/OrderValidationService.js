import Big from 'big.js';
import mongoose from 'mongoose';
import AppError from '../../utils/HandleAppErrors.js';
import Order from '../../api/models/OrderModel.js';

export default class OrderValidationService {
  /**
   * Validates an order document before saving.
   * @param {mongoose.Document} orderDoc
   */
  static async validate(orderDoc) {
    // 1️⃣ Identity: must have either user or guestEmail (but not both empty)
    if (!orderDoc.user && !orderDoc.guestEmail) {
      throw new AppError('Order must have either a user or a guest email.', 400);
    }

    // 2️⃣ Items: at least one
    if (!Array.isArray(orderDoc.items) || orderDoc.items.length === 0) {
      throw new AppError('Order must contain at least one item.', 400);
    }

    // 3️⃣ Delivery method → address requirements
    const needsShipping = orderDoc.deliveryMethod === 'Shipping';
    if (needsShipping && !orderDoc.shippingAddress) {
      throw new AppError('Shipping address required for physical delivery.', 400);
    }
    if (!needsShipping && orderDoc.shippingAddress) {
      // allow Shipping or Pickup only
      if (orderDoc.deliveryMethod !== 'Pickup') {
        throw new AppError(
          `Delivery method "${orderDoc.deliveryMethod}" must not include a shipping address.`,
          400
        );
      }
    }

    // 4️⃣ Billing address conditionally required
    const requiresBilling = !orderDoc.isDigital; // billing only required for non-digital orders
    if (requiresBilling && !orderDoc.billingAddress) {
      throw new AppError('Billing address is required for non-digital orders.', 400);
    }

    // 5️⃣ Monetary consistency: subtotal + tax + shippingFee - totalDiscount === grandTotal
    const subtotal = Big(orderDoc.subtotal.toString());
    const tax = Big(orderDoc.taxAmount.toString() || 0);
    const shipping = Big(orderDoc.shippingFee.toString() || 0);
    const discount = Big(orderDoc.discountAmount.toString() || 0);
    const computed = subtotal.plus(tax).plus(shipping).minus(discount);
    const grandTotal = Big(orderDoc.grandTotal.toString());

    if (!computed.eq(grandTotal)) {
      throw new AppError(
        `Monetary mismatch: subtotal (${subtotal.toFixed(2)}) + tax (${tax.toFixed(
          2
        )}) + shipping (${shipping.toFixed(2)}) - discount (${discount.toFixed(
          2
        )}) must equal grandTotal (${grandTotal.toFixed(2)}).`,
        400
      );
    }

    // 6️⃣ Currency / exchange
    if (!orderDoc.currency) {
      throw new AppError('Order currency is required.', 400);
    }
    if (!orderDoc.storeCurrency) {
      throw new AppError('Store currency is required.', 400);
    }
    if (orderDoc.exchangeRate <= 0) {
      throw new AppError('Exchange rate must be positive.', 400);
    }

    // 7️⃣ Transaction link exists and is pending or completed
    if (orderDoc.transaction) {
      const Transaction = mongoose.model('Transaction');
      const txExists = await Transaction.exists({ _id: orderDoc.transaction });
      if (!txExists) {
        if (orderDoc.$session()) {
          console.warn('Order validation deferred due to active session.');
        } else {
          throw new AppError('Associated transaction not found.', 404);
        }
      }
    }

    // 8️⃣ Unique orderId
    const exists = await Order.exists({
      orderId: orderDoc.orderId,
      _id: { $ne: orderDoc._id },
    });
    if (exists) {
      throw new AppError(`Duplicate orderId "${orderDoc.orderId}".`, 400);
    }

    return true;
  }
}

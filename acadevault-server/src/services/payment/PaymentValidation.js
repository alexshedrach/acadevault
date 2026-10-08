import mongoose from 'mongoose';
import Order from '../../api/models/OrderModel.js';
import AppError from '../../utils/HandleAppErrors.js';
import Big from 'big.js';
import { PAYMENT_STATUS } from '../../constants/enums.js';

export default async function validatePaymentData(payment) {
  // 1️⃣ Check for duplicate gateway txn ID
  const existing = await mongoose.models.Payment.findOne({
    gatewayTransactionId: payment.gatewayTransactionId,
    _id: { $ne: payment._id },
  });
  if (existing) {
    throw new AppError('Duplicate transaction ID detected.', 400);
  }

  // 2️⃣ Check referenced orders
  if (!payment.orders || !Array.isArray(payment.orders) || !payment.orders.length) {
    throw new AppError('At least one associated order is required.', 400);
  }

  for (const orderId of payment.orders) {
    const orderExists = await Order.exists({ _id: orderId });
    if (!orderExists) {
      if (payment.$session?.()) {
        console.warn(`Deferred order reference validation for order ${orderId}`);
      } else {
        throw new AppError(`Referenced order ${orderId} not found.`, 404);
      }
    }
  }

  // 3️⃣ Validate amount against total of all orders
  if (!payment.$session?.()) {
    let expectedTotal = Big(0);
    for (const orderId of payment.orders) {
      const order = await Order.findById(orderId);
      if (!order) continue;
      expectedTotal = expectedTotal.plus(Big(order.grandTotal || 0));
    }

    const receivedAmount = Big(payment.amountPaid?.toString?.() || 0);
    if (!expectedTotal.round(2).eq(receivedAmount.round(2))) {
      throw new AppError(
        `Payment amount mismatch. Expected ${expectedTotal}, received ${receivedAmount}`,
        400
      );
    }
  }

  // 4️⃣ Guest email must exist
  const isGuest = !payment.user;
  if (payment.isNew && isGuest && !payment.guestEmail) {
    throw new AppError('Guest checkout requires a valid guest email.', 400);
  }

  // 5️⃣ Prevent multiple confirmed payments for same orders
  if (!payment.$session?.()) {
    const duplicate = await mongoose.models.Payment.findOne({
      orders: { $in: payment.orders },
      paymentStatus: { $in: [PAYMENT_STATUS.SUCCESS, PAYMENT_STATUS.COMPLETED] },
      _id: { $ne: payment._id },
    });
    if (duplicate) {
      throw new AppError('One or more orders already have confirmed payments.', 409);
    }
  }

  return true;
}

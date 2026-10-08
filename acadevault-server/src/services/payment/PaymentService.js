import Payment from '../../api/models/PaymentModel.js';
import TransactionModel from '../../api/models/TransactionModel.js';
import { PAYMENT_GATEWAYS } from '../../constants/enums.js';
import AppError from '../../utils/HandleAppErrors.js';
import { logger } from '../../utils/logger.js';
import { toDecimal128 } from '../../utils/numberUtils.js';

const CLIENT_URL = process.env.CLIENT_BASE_URL;

class PaymentService {
  /** 
   * Build the client redirect URL based on payment record state.
   */
  static async verifyPaymentCallback({ transactionRef, gatewayKey, idempotencyKey }) {
    if (!Object.values(PAYMENT_GATEWAYS).includes(gatewayKey)) {
      logger.error('Unsupported gateway in callback', { gatewayKey });
      return `${CLIENT_URL}/payment/failed?reason=unsupported_gateway`;
    }

    const filter = { gatewayTransactionId: transactionRef };
    if (idempotencyKey) filter['gatewayResponse.idempotencyKey'] = idempotencyKey;

    const payment = await Payment.findOne(filter).lean();
    if (!payment) {
      logger.warn('Payment not found in verifyPaymentCallback', { transactionRef });
      return `${CLIENT_URL}/payment/failed?reason=payment_not_found`;
    }

    // Decide final redirect: success vs failure
    const isSuccess = payment.paymentStatus === PAYMENT_STATUS.SUCCESS;
    const path = isSuccess ? '/payment/success' : '/payment/failed';
    const query = `?ref=${transactionRef}&gateway=${gatewayKey}`;
    return `${CLIENT_URL}${path}${query}`;
  }

  /**
   * Return current payment and order status for polling.
   */
  static async checkPaymentStatus({ transactionRef, gatewayKey, idempotencyKey }) {
    if (!Object.values(PAYMENT_GATEWAYS).includes(gatewayKey)) {
      throw new AppError(`Unsupported gateway: ${gatewayKey}`, 400);
    }

    const filter = { gatewayTransactionId: transactionRef };
    if (idempotencyKey) filter['gatewayResponse.idempotencyKey'] = idempotencyKey;

    const payment = await Payment.findOne(filter)
      .populate({ path: 'orders', select: 'orderId status' })
      .lean();
    if (!payment) {
      throw new AppError(`Payment not found for reference: ${transactionRef}`, 404);
    }

    const txn = await TransactionModel.findById(payment.transaction).lean();
    if (!txn) {
      logger.error('Transaction missing for payment', { transactionRef });
    }

    // Build response payload
    return {
      paymentStatus: payment.paymentStatus,
      orderStatuses: payment.orders.map((o) => ({ orderId: o.orderId, status: o.status })),
      amount: payment.amountPaid.toString(),
      currency: payment.currency,
      transactionStatus: txn?.status,
      transactionId: txn?.transactionId,
    };
  }
}

export default PaymentService;

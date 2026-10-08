import axios from 'axios';
import crypto from 'crypto';
import { CURRENCIES, PAYMENT_METHODS, PAYMENT_STATUS } from '../../../constants/enums.js';
import { generateTransactionId } from '../../../utils/generators.js';
import AppError from '../../../utils/HandleAppErrors.js';
import { logger } from '../../../utils/logger.js';

class FlutterwaveGatewayService {
  constructor() {
    this.apiBase = 'https://api.flutterwave.com/v3';
    this.secretKey = process.env.FLUTTERWAVE_SECRET_KEY;

    if (!this.secretKey) {
      throw new AppError('Flutterwave secret key is not configured', 500);
    }

    this.supportedCurrencies = [
      CURRENCIES.NGN,
      CURRENCIES.USD,
      CURRENCIES.GHS,
      CURRENCIES.KES,
      CURRENCIES.ZAR,
      CURRENCIES.TZS,
    ];

    this.supportedMethods = [
      PAYMENT_METHODS.CARD,
      PAYMENT_METHODS.MOBILE_MONEY,
      PAYMENT_METHODS.BANK_TRANSFER,
    ];
  }

  /**
   * Returns supported payment methods
   */
  getSupportedMethods() {
    return this.supportedMethods;
  }

  /**
   * Gateway metadata for UI rendering
   */
  getGatewayMetadata() {
    return {
      name: 'Flutterwave',
      logo: 'https://assets.flutterwave.com/flutterwave-logo.png',
      countries: ['NG', 'GH', 'KE', 'ZA', 'TZ'],
      supports: this.getSupportedMethods(),
      currencies: this.supportedCurrencies,
    };
  }

  /**
   * Initiates a payment with Flutterwave
   */
  async initiate({
    amount,
    currency,
    email,
    cartId,
    userId,
    orderId,
    callback_url,
    paymentMethod,
    idempotencyKey,
  }) {
    if (!this.supportedCurrencies.includes(currency)) {
      throw new AppError(`Flutterwave does not support ${currency}`, 400);
    }

    if (!this.supportedMethods.includes(paymentMethod)) {
      throw new AppError(`Flutterwave does not support ${paymentMethod}`, 400);
    }

    const txRef = generateTransactionId({ prefix: 'FLW-' });

    try {
      const response = await axios.post(
        `${this.apiBase}/payments`,
        {
          tx_ref: txRef,
          amount,
          currency,
          customer: { email },
          redirect_url: callback_url,
          meta: { cartId, userId, orderId, idempotencyKey },
          payment_options: paymentMethod.toLowerCase(),
          customizations: {
            title: 'AcaDeVault Payment',
            description: `Payment for Order #${orderId}`,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${this.secretKey}`,
            'Content-Type': 'application/json',
            'Idempotency-Key': idempotencyKey,
          },
        }
      );

      const data = response.data;

      if (data.status !== 'success') {
        throw new AppError('Flutterwave failed to initialize payment', 502);
      }

      logger.info('Flutterwave payment initialized', {
        cartId,
        orderId,
        txRef,
        idempotencyKey,
      });

      return {
        clientSecret: data.data.link,
        transactionRef: txRef,
        response,
      };
    } catch (error) {
      logger.error('Flutterwave initiation failed', {
        cartId,
        orderId,
        txRef,
        idempotencyKey,
        error: error.response?.data || error.message,
      });

      throw new AppError(`Flutterwave error: ${error.message}`, 500);
    }
  }

  /**
   * Verifies transaction using tx_ref
   */
  async verify(transactionRef) {
    try {
      const response = await axios.get(
        `${this.apiBase}/transactions/verify_by_reference?tx_ref=${transactionRef}`,
        {
          headers: {
            Authorization: `Bearer ${this.secretKey}`,
          },
        }
      );

      const data = response.data;

      if (data.status !== 'success') {
        throw new AppError('Flutterwave verification failed', 400);
      }

      const statusMap = {
        successful: PAYMENT_STATUS.SUCCESS,
        failed: PAYMENT_STATUS.FAILED,
        cancelled: PAYMENT_STATUS.FAILED,
      };

      logger.info('Flutterwave transaction verified', {
        transactionRef,
        status: data.data.status,
      });

      return {
        status: statusMap[data.data.status] || PAYMENT_STATUS.FAILED,
        gatewayResponse: data.data,
      };
    } catch (error) {
      logger.error('Flutterwave verification error', {
        transactionRef,
        error: error.response?.data || error.message,
      });

      throw new AppError(`Flutterwave verification error: ${error.message}`, 400);
    }
  }

  /**
   * Verifies the webhook signature
   */
  static verifyWebhook(payload, signature, secret) {
    const hash = crypto.createHmac('sha256', secret).update(JSON.stringify(payload)).digest('hex');

    const isValid = hash === signature;

    if (!isValid) {
      logger.warn('Invalid Flutterwave webhook signature', { signature, hash });
    }

    return isValid;
  }
}

export default FlutterwaveGatewayService;

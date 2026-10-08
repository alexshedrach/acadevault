import axios from 'axios';
import crypto from 'crypto';
import { PAYMENT_METHODS, PAYMENT_STATUS } from '../../../constants/enums.js';
import { generateTransactionId } from '../../../utils/generators.js';
import AppError from '../../../utils/HandleAppErrors.js';
import { logger } from '../../../utils/logger.js';

export const CURRENCIES = Object.freeze({
  NGN: 'NGN',
  USD: 'USD',
  EUR: 'EUR',
  GBP: 'GBP',
  KES: 'KES',
  GHS: 'GHS',
  ZAR: 'ZAR',
  INR: 'INR',
  JPY: 'JPY',
  CNY: 'CNY',
  AUD: 'AUD',
  CAD: 'CAD',
  SGD: 'SGD',
  AED: 'AED',
  BRL: 'BRL',
  MXN: 'MXN',
});

// Axios instance for Paystack API
const paystackClient = axios.create({
  baseURL: 'https://api.paystack.co',
  headers: {
    Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
    'Content-Type': 'application/json',
  },
});

class PaystackGatewayService {
  constructor() {
    if (!process.env.PAYSTACK_SECRET_KEY) {
      throw new AppError('Paystack secret key is not configured', 500);
    }

    this.supportedCurrencies = [CURRENCIES.NGN];

    this.supportedMethods = [
      PAYMENT_METHODS.CARD,
      PAYMENT_METHODS.BANK_TRANSFER,
      PAYMENT_METHODS.USSD,
      PAYMENT_METHODS.MOBILE_MONEY,
    ];
  }

  /**
   * Returns supported methods for diagnostics and frontend
   */
  getSupportedMethods() {
    return this.supportedMethods;
  }

  /**
   * Provides metadata to be exposed to UI or API consumers
   */
  getGatewayMetadata() {
    return {
      name: 'Paystack',
      logo: 'https://assets.paystack.com/paystack-icon.png',
      countries: ['NG'],
      supports: this.getSupportedMethods(),
      currencies: this.supportedCurrencies,
    };
  }

  /**
   * Initiates a payment with Paystack
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
      throw new AppError(`Paystack does not support currency: ${currency}`, 400);
    }

    if (!this.supportedMethods.includes(paymentMethod)) {
      throw new AppError(`Paystack does not support payment method: ${paymentMethod}`, 400);
    }

    const reference = generateTransactionId({ prefix: 'PSTK-' });

    try {
      const response = await paystackClient.post('/transaction/initialize', {
        email,
        amount: Math.round(amount * 100), // Paystack expects amount in kobo
        currency,
        reference,
        callback_url,
        channels: [paymentMethod.toLowerCase()],
        metadata: {
          cartId,
          userId,
          orderId,
          idempotencyKey,
        },
      });

      if (!response.data.status) {
        throw new AppError('Failed to initialize Paystack transaction', 502);
      }

      logger.info('Paystack payment initialized', {
        reference,
        cartId,
        orderId,
        userId,
        idempotencyKey,
      });

      return {
        success: true, // 👈 important!
        transactionRef: reference,
        clientSecret: response.data.data.authorization_url,
        response: response.data,
      };
    } catch (error) {
      logger.error('Paystack initialization failed', {
        error: error.response?.data || error.message,
        cartId,
        userId,
        orderId,
        reference,
      });

      throw new AppError(
        `Paystack initiation failed: ${error.response?.data?.message || error.message}`,
        500
      );
    }
  }

  /**
   * Verifies transaction status by reference
   */
  async verify(transactionRef) {
    try {
      const response = await paystackClient.get(`/transaction/verify/${transactionRef}`);

      if (!response.data.status) {
        throw new AppError('Paystack verification failed', 400);
      }

      const statusMap = {
        success: PAYMENT_STATUS.SUCCESS,
        failed: PAYMENT_STATUS.FAILED,
        abandoned: PAYMENT_STATUS.FAILED,
      };

      logger.info('Paystack transaction verified', {
        transactionRef,
        status: response.data.data.status,
      });

      return {
        status: statusMap[response.data.data.status] || PAYMENT_STATUS.FAILED,
        gatewayResponse: response.data.data,
      };
    } catch (error) {
      logger.error('Paystack verification error', {
        transactionRef,
        error: error.response?.data || error.message,
      });

      throw new AppError(
        `Paystack verification error: ${error.response?.data?.message || error.message}`,
        400
      );
    }
  }

  /**
   * Verifies a Paystack webhook signature using HMAC SHA-512.
   *
   * @param {Buffer|string} rawBody   – Unparsed request body (Buffer from express.raw)
   * @param {string}       signature – Value of the 'x-paystack-signature' header
   * @param {string}       secret    – Your Paystack webhook secret key
   * @throws {AppError} if verification fails or input is malformed
   * @returns {void}   – Returns silently if valid
   */
  static verifyWebhook(rawBody, signature, secret) {
    // 1) Validate inputs
    if (!secret) {
      logger.error('Paystack webhook secret is missing');
      throw new AppError('Webhook secret not configured', 500);
    }
    if (typeof signature !== 'string' || signature.length === 0) {
      logger.warn('Missing or empty Paystack signature header');
      throw new AppError('Missing signature header', 400);
    }

    // 2) Normalize rawBody to Buffer
    let payloadBuffer;
    if (Buffer.isBuffer(rawBody)) {
      payloadBuffer = rawBody;
    } else if (typeof rawBody === 'string') {
      payloadBuffer = Buffer.from(rawBody, 'utf8');
    } else {
      logger.error('Invalid rawBody type for Paystack verification', { type: typeof rawBody });
      throw new AppError('Invalid webhook payload', 400);
    }

    // 3) Compute HMAC SHA-512
    const hmac = crypto.createHmac('sha512', secret);
    hmac.update(payloadBuffer);
    const expectedSignature = hmac.digest();

    // 4) Decode incoming signature from hex
    let incomingSignature;
    try {
      incomingSignature = Buffer.from(signature, 'hex');
    } catch (err) {
      logger.warn('Malformed Paystack signature header (not hex)', { signature });
      throw new AppError('Invalid signature format', 400);
    }

    // 5) Constant-time comparison
    const isValid =
      incomingSignature.length === expectedSignature.length &&
      crypto.timingSafeEqual(expectedSignature, incomingSignature);

    // 6) Log and error if invalid
    if (!isValid) {
      const bodyHash = crypto.createHash('sha256').update(payloadBuffer).digest('hex');
      logger.warn('Paystack webhook signature mismatch', {
        expected: expectedSignature.toString('hex'),
        received: signature,
        sha256: bodyHash,
      });
      throw new AppError('Invalid webhook signature', 400);
    }

    // If we reach here, signature is valid
    logger.info('Paystack webhook signature verified successfully');
  }
}

export default PaystackGatewayService;

import Stripe from 'stripe';
import { CURRENCIES, PAYMENT_METHODS, PAYMENT_STATUS } from '../../../constants/enums.js';
import { generateTransactionId } from '../../../utils/generators.js';
import AppError from '../../../utils/HandleAppErrors.js';
import { logger } from '../../../utils/logger.js';

const stripeClient = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2024-04-10',
});

class StripeGatewayService {
  constructor() {
    if (!process.env.STRIPE_SECRET_KEY) {
      throw new AppError('Stripe secret key is not configured', 500);
    }

    this.client = stripeClient;

    this.supportedCurrencies = [
      CURRENCIES.USD,
      CURRENCIES.EUR,
      CURRENCIES.GBP,
      CURRENCIES.NGN,
      CURRENCIES.CAD,
    ];

    this.supportedMethods = [PAYMENT_METHODS.CARD, PAYMENT_METHODS.DIGITAL_WALLET];
  }

  /**
   * Returns supported methods for UI
   */
  getSupportedMethods() {
    return this.supportedMethods;
  }

  /**
   * Gateway metadata for client rendering
   */
  getGatewayMetadata() {
    return {
      name: 'Stripe',
      logo: 'https://stripe.com/img/v3/home/brand-icon.png',
      countries: ['US', 'EU', 'GB', 'NG', 'CA'],
      supports: this.getSupportedMethods(),
      currencies: this.supportedCurrencies,
    };
  }

  /**
   * Initiates a Stripe payment intent
   */
  async initiate({
    amount,
    currency,
    email,
    cartId,
    userId,
    orderId,
    paymentMethod,
    callback_url,
    idempotencyKey,
  }) {
    if (!this.supportedCurrencies.includes(currency)) {
      throw new AppError(`Stripe does not support ${currency}`, 400);
    }

    if (!this.supportedMethods.includes(paymentMethod)) {
      throw new AppError(`Stripe does not support ${paymentMethod}`, 400);
    }

    const reference = generateTransactionId({ prefix: 'STR-' });

    try {
      const paymentIntent = await this.client.paymentIntents.create(
        {
          amount: Math.round(amount * 100), // Stripe uses cents
          currency,
          metadata: {
            cartId,
            userId,
            orderId,
            paymentMethod,
            reference,
            idempotencyKey,
          },
          receipt_email: email,
          description: `AcaDeVault Order #${orderId}`,
          return_url: callback_url,
          payment_method_types: [paymentMethod.toLowerCase()],
        },
        {
          idempotencyKey,
        }
      );

      logger.info('Stripe payment initialized', {
        cartId,
        orderId,
        reference,
        paymentIntentId: paymentIntent.id,
        idempotencyKey,
      });

      return {
        clientSecret: paymentIntent.client_secret,
        transactionRef: paymentIntent.id,
        response: { data: paymentIntent },
      };
    } catch (err) {
      logger.error('Stripe initiation failed', {
        cartId,
        orderId,
        reference,
        idempotencyKey,
        error: err.message,
      });

      throw new AppError(`Stripe error: ${err.message}`, 500);
    }
  }

  /**
   * Verifies the status of a Stripe payment intent
   */
  async verify(transactionRef) {
    try {
      const intent = await this.client.paymentIntents.retrieve(transactionRef);

      if (!intent || !intent.status) {
        throw new AppError('Unable to retrieve Stripe transaction', 400);
      }

      const statusMap = {
        succeeded: PAYMENT_STATUS.SUCCESS,
        requires_payment_method: PAYMENT_STATUS.FAILED,
        canceled: PAYMENT_STATUS.FAILED,
      };

      logger.info('Stripe transaction verified', {
        transactionRef,
        status: intent.status,
      });

      return {
        status: statusMap[intent.status] || PAYMENT_STATUS.FAILED,
        gatewayResponse: intent,
      };
    } catch (err) {
      logger.error('Stripe verification failed', {
        transactionRef,
        error: err.message,
      });

      throw new AppError(`Stripe verification error: ${err.message}`, 400);
    }
  }

  /**
   * Verifies a Stripe webhook
   * @param {Buffer} rawBody - Raw payload buffer
   * @param {string} signature - Stripe signature
   * @param {string} secret - Webhook secret
   */
  static verifyWebhook(rawBody, signature, secret) {
    try {
      const event = stripeClient.webhooks.constructEvent(rawBody, signature, secret);
      return event;
    } catch (err) {
      logger.error('Stripe webhook verification failed', {
        error: err.message,
      });
      return null;
    }
  }
}

export default StripeGatewayService;

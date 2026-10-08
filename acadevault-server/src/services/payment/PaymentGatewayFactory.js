import { PAYMENT_GATEWAYS } from '../../constants/enums.js';
import AppError from '../../utils/HandleAppErrors.js';
import PaystackGatewayService from './gateways/PaystackGatewayService.js';
import FlutterwaveGatewayService from './gateways/FlutterwaveGatewayService.js';
import StripeGatewayService from './gateways/StripeGatewayService.js';

// Registry of supported gateway implementations
const gatewayRegistry = {
  [PAYMENT_GATEWAYS.PAYSTACK]: PaystackGatewayService,
  [PAYMENT_GATEWAYS.FLUTTERWAVE]: FlutterwaveGatewayService,
  [PAYMENT_GATEWAYS.STRIPE]: StripeGatewayService,
};

class PaymentGatewayFactory {
  /**
   * Returns an instance of the specified gateway
   * @param {string} gatewayName
   * @returns {object} Gateway instance
   * @throws {AppError} if gateway not supported
   */
  static getGateway(gatewayName) {
    const GatewayClass = gatewayRegistry[gatewayName];
    if (!GatewayClass) {
      throw new AppError(`Unsupported payment gateway: ${gatewayName}`, 400);
    }
    return new GatewayClass();
  }

  /**
   * Returns metadata for all supported gateways
   * @returns {Array<Object>} Array of gateway metadata
   */
  static getSupportedGateways() {
    return Object.entries(gatewayRegistry).map(([key, GatewayClass]) => {
      const gatewayInstance = new GatewayClass();
      return {
        key,
        ...gatewayInstance.getGatewayMetadata(),
      };
    });
  }
}

export default PaymentGatewayFactory;

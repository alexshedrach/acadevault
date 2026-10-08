import { logger } from "../../utils/logger.js";

class CartExpiryService {
  static async extendExpiry(cart, days = 7) {
    try {
      if (cart.isModified("items") || cart.isNew) {
        cart.expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * days);
      }
    } catch (error) {
      logger.error(`Error extending cart expiry: ${error.message}`, {
        cartId: cart._id,
      });
      throw error;
    }
  }
}

export default CartExpiryService;

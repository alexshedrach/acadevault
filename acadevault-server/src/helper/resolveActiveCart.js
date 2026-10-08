import mongoose from "mongoose";
import Cart from "../api/models/CartModel.js";
import { CART_STATUS } from "../constants/enums,js";
import { generateGuestCartId } from "../utils/generateGuestId.js";
import { logger } from "../utils/logger.js";


/**
 * Resolves an active cart for a user or guest, creating one if none exists.
 * @param {Object} [user=null] - User object with _id (for registered users).
 * @param {Object} [guestData={}] - Guest data (guestCartId, guestEmail, etc.).
 * @param {string} [guestData.guestCartId] - Unique ID for guest cart.
 * @param {string} [guestData.guestEmail] - Guest email for identification.
 * @param {string} [guestData.guestFullName] - Guest full name.
 * @param {string} [guestData.guestPhoneNumber] - Guest phone number.
 * @param {string} [guestData.shippingAddress] - Shipping address ID.
 * @param {mongoose.ClientSession} [session=null] - Mongoose transaction session.
 * @returns {Promise<Cart>} - The resolved active cart.
 * @throws {Error} - If cart creation fails or invalid data is provided.
 */
async function resolveActiveCart(user = null, guestData = {}, session = null) {
  const {
    guestCartId,
    guestEmail,
    guestFullName,
    guestPhoneNumber,
    shippingAddress,
  } = guestData;

  // Validate input for guest carts
  if (!user && !guestCartId && !guestEmail) {
    throw new Error("Guest cart requires guestCartId or guestEmail.");
  }

  // Build query for active cart
  const query = user
    ? { user: user._id, status: CART_STATUS.ACTIVE }
    : {
        $or: [
          guestCartId ? { guestCartId } : {},
          guestEmail ? { guestEmail } : {},
        ],
        status: CART_STATUS.ACTIVE,
      };

  try {
    // Look up active cart
    let cart = session
      ? await Cart.findOne(query).session(session)
      : await Cart.findOne(query);

    // Create new cart if none found
    if (!cart) {
      const isValidObjectId = shippingAddress
        ? mongoose.Types.ObjectId.isValid(shippingAddress)
        : false;

      cart = new Cart({
        user: user?._id || null,
        guestCartId: user ? null : guestCartId || generateGuestCartId(), 
        guestEmail: user ? null : guestEmail || null,
        guestFullName: user ? null : guestFullName || null,
        guestPhoneNumber: user ? null : guestPhoneNumber || null,
        shippingAddress: isValidObjectId ? shippingAddress : null,
        status: CART_STATUS.ACTIVE,
        items: [],
        currency: "NGN", // Align with CartSchema default
        expiresAt: user
          ? null
          : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days expiry
      });

      // Save cart with session if provided
      await cart.save({ session });
      logger.info(
        `Created new cart: ${cart._id} for ${user ? `user ${user._id}` : `guest ${cart.guestCartId || cart.guestEmail}`}`
      );
    }

    return cart;
  } catch (error) {
    logger.error(`Failed to resolve active cart: ${error.message}`, {
      userId: user?._id,
      guestData,
    });
    throw new Error(`Cart resolution failed: ${error.message}`);
  }
}

export default resolveActiveCart
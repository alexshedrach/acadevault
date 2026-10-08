import { CART_STATUS } from '../constants/enums.js';
import { isValidEmail } from './commonUtils.js';
import Cart from '../api/models/CartModel.js';
import AppError from './HandleAppErrors.js';
import { validateObjectId } from './validateObjectId.js';

async function getActiveCart(user, guestEmail) {
  const query = { status: CART_STATUS.ACTIVE };

  if (user && user._id) {
    validateObjectId(user._id, 'User');
    query.user = user._id;
  } else if (guestEmail) {
    if (!isValidEmail(guestEmail)) {
      throw new AppError('Invalid guest email format', 400);
    }
    query.guestEmail = guestEmail;
  }

  return await Cart.findOne(query).populate({
    path: 'items.material',
    select: 'title price description stockQty deliveryFormat',
  });
}

export { getActiveCart };

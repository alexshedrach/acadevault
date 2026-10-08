import User from "../api/models/UserModel.js";
import AppError from "../utils/HandleAppErrors.js";


/**
 * 🏦 Apply Store Credit to User's Account
 * @param {String} userId - ID of the user
 * @param {Number} amount - Amount to be credited
 */
async function applyStoreCredit(userId, amount) {
  // Step 1: Find the user
  const user = await User.findById(userId);
  if (!user) {
    throw new AppError("User not found.", 404);
  }

  // Step 2: Add the refunded amount to the user's store credit balance
  user.storeCredit = (user.storeCredit || 0) + amount;

  // Step 3: Save the updated user details
  await user.save();
}

export default applyStoreCredit;

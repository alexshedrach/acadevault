import Order from "../models/Order";
import Review from "../models/Review";
import Cart from "../models/Cart";
import Wishlist from "../models/Wishlist";
import Affiliate from "../models/Affiliate";
import { uploadToCloudinary } from "./cloudinaryHelper";


/**
 * Removes files associated with a user from cloud/local storage.
 * @param {Object} params - Parameters for file removal.
 * @param {string} params.user - ID of the user whose files are to be removed.
 */
export const removeFiles = async ({ user }) => {
  try {
    // Example: Remove files from a cloud storage service (e.g., AWS S3, Firebase)
    await uploadToCloudinary.deleteFiles({ prefix: `users/${user}/` });

    console.log(`Successfully removed files for user with ID ${user}`);
  } catch (error) {
    console.error(`Failed to remove files for user with ID ${user}:`, error.message);
    throw new Error("Failed to remove user files.");
  }
};


/**
 * Cleans up related data when a user is deleted.
 * For example, orders, reviews, or other associated data.
 * @param {string} userId - ID of the user to clean up.
 * @throws {Error} If any cleanup operation fails.
 */
export const cleanUpUserData = async (userId) => {
  try {
    // Remove associated orders
    await Order.deleteMany({ user: userId });

    // Remove associated reviews
    await Review.deleteMany({ user: userId });

    // Remove associated cart
    await Cart.deleteOne({ user: userId });

    // Remove associated wishlist
    await Wishlist.deleteMany({ user: userId });

    // Remove associated affiliate details if the user is an affiliate
    await Affiliate.deleteOne({ user: userId });

    // Optional: If users have uploaded files, remove those from storage
    await removeFiles({ user: userId });

    console.log(
      `Successfully cleaned up related data for user with ID ${userId}`
    );
  } catch (error) {
    console.error(
      `Error during cleanup for user with ID ${userId}:`,
      error.message
    );
    throw new Error("Failed to clean up user-related data.");
  }
};

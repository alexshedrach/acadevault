import { USER_ROLES } from "../constants/enums.js";
import User from "../api/models/UserModel.js";
import ApiFeatures from "../utils/ApiFeatures.js";
import AppError from "../utils/HandleAppErrors.js";
import { logger } from "../utils/logger.js";
let Shop;

class UserService {
  // ---------------------------------------------------------------------
  // ** === User Service to Get all the User from the DB === **
  // ---------------------------------------------------------------------

  static async getAllUsersService(query) {
    const apiFeatures = new ApiFeatures(
      User.find({ isActiveAccount: true }).lean(),
      query
    )
      .filter() // Apply filters
      .search(["name", "email"]) // Enable search functionality
      .sort() // Apply sorting
      .limitFields(); // Limit fields if specified

    await apiFeatures.pagination(10); // Apply pagination with a default perPage value

    const users = await apiFeatures.query; // Execute the query
    return {
      users,
      paginationMetadata: apiFeatures.paginationMetadata, // Return pagination metadata
    };
  }

  /**
   * Fetch user details by ID
   * @param {String} userId - The ID of the user
   * @param {String} requesterRole - Role of the requesting user
   * @returns {Object} - User data and shop details if applicable
   * @throws {AppError} - Throws error if user not found
   */
  static async getUserDetailsByIdService(userId, requesterRole) {
    let query = User.findById(userId)
      .populate({
        path: "wishlist",
        select: "name price",
        options: { strictPopulate: false },
      })
      .populate("followRequests", "name email profilePicture");

    // Admin gets all fields, excluding sensitive database internals
    if (requesterRole === USER_ROLES.ADMIN) {
      query = query.select("-__v");
    } else if (requesterRole === USER_ROLES.SELLER) {
      // Seller gets only insensitive fields
      query = query.select("name email role profilePicture createdAt");
    } else {
      throw new AppError("Unauthorized to access this resource", 403);
    }

    const user = await query.exec();

    if (!user) {
      throw new AppError("User not found", 404);
    }

    let shopDetails = null;

    // If the requested user is a seller, include their shop details
    if (user.role === USER_ROLES.SELLER) {
      shopDetails = await Shop.findOne({ owner: user._id })
        .populate("products")
        .populate({
          path: "reviews",
          select: "rating comment user",
          options: { strictPopulate: false },
        });
    }

    return { user, shopDetails };
  }

  /**
   * Update user details by ID.
   * Only accessible by admins.
   * @param {String} userId - The ID of the user to update.
   * @param {Object} updateData - The new data for the user.
   * @returns {Object} Updated user details.
   */
  static async updateUserService(userId, updateData) {
    try {
      // Prevent changes to restricted fields
      const restrictedFields = [
        "password",
        "emailVerificationToken",
        "refreshToken",
        "role",
      ];
      restrictedFields.forEach((field) => {
        if (field in updateData) delete updateData[field];
      });

      // Find the user and update
      const updatedUser = await User.findByIdAndUpdate(userId, updateData, {
        new: true, // Return the updated document
        runValidators: true, // Ensure schema validation
      });

      if (!updatedUser) {
        throw new AppError("User not found", 404);
      }

      logger.info(`User ${userId} updated successfully.`);
      return updatedUser;
    } catch (error) {
      logger.error(`Error updating user: ${error.message}`);
      throw new AppError(error.message || "Failed to update user", 500);
    }
  }

  /**
   * Verifies the email of a user by their ID.
   * @param {String} userId - The ID of the user to verify.
   * @param {String} adminId - The ID of the admin performing the verification.
   * @returns {Object} - The updated user document.
   */
  static async verifyUserEmailService(userId, adminId) {
    // Fetch user and validate existence
    const user = await User.findById(userId);
    if (!user) throw new AppError("User not found", 404);

    // Prevent re-verification
    if (user.isEmailVerified)
      throw new AppError("User email is already verified", 400);

    // Update email verification status
    user.isEmailVerified = true;
    user.emailVerificationToken = undefined;
    user.emailVerificationTokenExpiry = undefined;

    // Log admin activity
    logger.info(
      `Admin ${adminId} verified email for user ${userId} on ${new Date()}`
    );

    // Save updated user
    await user.save();

    return user;
  }

  // Update User Role
  static async updateUserRole(userId, role) {
    const user = await User.findById(userId);
    if (!user) throw new Error("User not found");
    if (user.role === role) throw new Error("User already has this role");

    user.role = role;
    await user.save();
    return user;
  }

  // Update User Preferences
  static async updateUserPreferences(userId, preferences) {
    const user = await User.findById(userId);
    if (!user) throw new Error("User not found");

    user.preferences = { ...user.preferences, ...preferences };
    await user.save();
    return user;
  }

  // Reset User Login Attempts
  static async resetLoginAttempts(userId) {
    const user = await User.findById(userId);
    if (!user) throw new Error("User not found");

    user.failedLoginAttempts = 0;
    user.accountLockUntil = null;
    await user.save();
    return user;
  }

  // Get User Login History
  static async getUserLoginHistory(userId) {
    const user = await User.findById(userId).select(
      "lastLoginDate lastLoginIP lastLoginDevice"
    );
    if (!user) throw new Error("User not found");

    return {
      lastLoginDate: user.lastLoginDate,
      lastLoginIP: user.lastLoginIP,
      lastLoginDevice: user.lastLoginDevice,
    };
  }

  // DELETE User (Soft delete)
  static async deleteUserService(userId) {
    try {
      const user = await User.softDelete(userId);
      return user;
    } catch (error) {
      // Log error for debugging
      logger.error(`Error during soft delete: ${error.message}`);
      throw error;
    }
  }
  /**
   * Deletes a user account and optionally performs cleanup tasks.
   * @param {string} userId - ID of the user to be deleted.
   * @returns {Object} Deleted user data.
   * @throws {AppError} If user not found or deletion fails.
   */
  static async deleteUserAccount(userId) {
    // Check if the user exists
    const user = await User.findById(userId);
    if (!user) {
      throw new AppError("User not found", 404);
    }

    // Perform any necessary cleanup tasks (e.g., removing associated data)
    // try {
    //   await cleanUpUserData(userId); // A utility function to handle related data
    // } catch (error) {
    //   console.error("Error during user cleanup:", error.message);
    //   throw new AppError(
    //     "Failed to clean up related user data. Please try again later.",
    //     500
    //   );
    // }

    // Remove the user
    try {
      await user.remove(); // Remove the user document
    } catch (error) {
      console.error("Error during user deletion:", error.message);
      throw new AppError(
        "Failed to delete the user account. Please try again later.",
        500
      );
    }

    return user; // Return deleted user details for audit/logging purposes
  }

  // RESTORE User
  static async restoreUserService(userId) {
    try {
      logger.info(`Searching for user with ID: ${userId}`);

      // const user = await User.findById(userId);
      const user = await User.findById(userId).setOptions({
        includeDeleted: true,
        includeInactive: true,
      });

      if (!user || user.length === 0) {
        logger.warn(`User with ID ${userId} not found in the database`);
        throw new AppError("User not found", 404);
      }

      if (!user.deletedDate) {
        logger.info(`User with ID ${userId} is not soft-deleted`);
        throw new AppError("User is not deleted", 400);
      }

      // Restore user
      user.deletedDate = null;
      user.isActiveAccount = true;
      await user.save();

      logger.info(`User with ID ${userId} successfully restored`);
      return user;
    } catch (error) {
      logger.error(`Error restoring user with ID ${userId}: ${error.message}`);
      throw error;
    }
  }
  // BAN User
  static async banUserService(userId) {
    try {
      const user = await User.findById(userId);
      if (!user) throw new Error("User not found");

      user.isSuspended = true;
      await user.save();

      return user;
    } catch (error) {
      throw new Error(`Error banning user: ${error.message}`);
    }
  }

  // UNBAN User
  static async unbanUserService(userId) {
    try {
      const user = await User.findById(userId);
      if (!user) throw new Error("User not found");
      if (!user.isSuspended) throw new Error("User is not suspended");

      user.isSuspended = false;
      await user.save();

      return user;
    } catch (error) {
      throw new Error(`Error unbanning user: ${error.message}`);
    }
  }

  // Toggle user suspension status
  static async toggleSuspension(userId) {
    try {
      // Find user by ID
      const user = await User.findById(userId);
      if (!user) throw new Error("User not found");

      // Toggle the suspension status
      const newStatus = await user.toggleSuspension();

      // Log the change
      console.log(`User ID: ${userId}, New Suspension Status: ${newStatus}`);

      return { userId, newSuspensionStatus: newStatus };
    } catch (error) {
      console.error(`Error toggling suspension: ${error.message}`);
      throw new Error(`Error toggling user suspension: ${error.message}`);
    }
  }

  // Get active users by role (Service Layer)
  static async getActiveUsersByRole(role) {
    try {
      // Fetch active users
      const activeUsers = await User.findActiveUsersByRole(role);

      if (!activeUsers.length) {
        throw new AppError(`No active users found for role: ${role}`, 404);
      }

      return activeUsers;
    } catch (error) {
      throw new AppError(`Error fetching active users: ${error.message}`, 500);
    }
  }

  // Lock user account
  static async lockAccount(email) {
    try {
      const user = await User.findOne({ email });
      if (!user) throw new Error("User not found");
      if (user.isAccountLocked()) throw new Error("Account is already locked");

      user.accountLockUntil = Date.now() + 30 * 60 * 1000; // Lock for 30 minutes
      await user.save();
    } catch (error) {
      throw new Error(`Error locking account: ${error.message}`);
    }
  }

  static async addInterest(userId, category) {
    if (!userId || !category) {
      throw new AppError("User ID and category are required.", 400);
    }

    const user = await User.findById(userId);
    if (!user) {
      throw new AppError("User not found.", 404);
    }

    const result = await user.addInterest(category);
    if (!result.success) {
      throw new AppError(result.message, 400);
    }

    return {
      message: result.message,
      interestCategories: user.interestCategories,
    };
  }

  static async removeInterest(userId, category) {
    if (!userId || !category) {
      throw new AppError("User ID and category are required.", 400);
    }

    const user = await User.findById(userId);
    if (!user) {
      throw new AppError("User not found.", 404);
    }

    const result = await user.removeInterest(category);
    if (!result.success) {
      throw new AppError(result.message, 400);
    }

    return {
      message: result.message,
      interestCategories: user.interestCategories,
    };
  }

  static async getInterests(userId) {
    if (!userId) {
      throw new AppError("User ID is required.", 400);
    }

    const user = await User.findById(userId);
    if (!user) {
      throw new AppError("User not found.", 404);
    }

    return user.interestCategories;
  }

  static async clearInterests(userId) {
    if (!userId) {
      throw new AppError("User ID is required.", 400);
    }

    const user = await User.findById(userId);
    if (!user) {
      throw new AppError("User not found.", 404);
    }

    user.interestCategories = [];
    await user.save();

    return { message: "All interests cleared successfully." };
  }

  static async checkInterest(userId, category) {
    if (!userId || !category) {
      throw new AppError("User ID and category are required.", 400);
    }

    const user = await User.findById(userId);
    if (!user) {
      throw new AppError("User not found.", 404);
    }

    const exists = user.interestCategories.includes(
      category.trim().toLowerCase()
    );
    return exists;
  }

  /**
   * Get follow suggestions based on shared interests.
   * @param {string} userId - ID of the user.
   * @param {number} limit - Number of suggestions to fetch.
   * @returns {Promise<Array>} - List of suggested users.
   */
  static async getFollowSuggestions(userId, limit = 5) {
    const user = await User.findById(userId);
    if (!user) throw new AppError("User not found", 404);

    const suggestions = await User.getFollowSuggestions(userId, limit);
    return suggestions;
  }

  static async updatePrivacySettings(userId, isPrivate) {
    if (!userId) {
      throw new AppError("User ID is required.", 400);
    }

    const user = await User.findByIdAndUpdate(
      userId,
      { isPrivate },
      { new: true, runValidators: true }
    );

    if (!user) {
      throw new AppError("User not found.", 404);
    }

    return user;
  }
}

export default UserService;

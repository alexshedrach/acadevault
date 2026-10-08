import UserService from "../../services/userService.js";
import { catchAsyncErrors } from "../../utils/catchAsyncErrors.js";
import AppError from "../../utils/HandleAppErrors.js";
import { logger } from "../../utils/logger.js";
import { validateObjectId } from "../../utils/validateObjectId.js";
import { validateSort } from "../../utils/validateSort.js";

export const getAllUsers = catchAsyncErrors(async (req, res, next) => {
  try {
    // Validate the `sort` parameter
    if (req.query.sort) {
      validateSort(req.query.sort);
    }

    const { users, paginationMetadata } = await UserService.getAllUsersService(
      req.query
    );

    if (!users || users.length === 0) {
      return next(
        new AppError("No users found with the specified criteria.", 404)
      );
    }

    res.status(200).json({
      status: "success",
      results: users.length,
      pagination: paginationMetadata,
      data: { users },
    });
  } catch (error) {
    return next(new AppError(error.message, 400));
  }
});

/**
 * Controller to get user details by ID
 * @route GET /api/v2/users/:userId
 * @access Protected (Admin, Seller)
 */
export const getUserById = catchAsyncErrors(async (req, res, next) => {
  const { userId } = req.params;
  const { role } = req.user;

  // Validate input
  if (!userId) {
    return next(new AppError("User ID is required", 400));
  }

  validateObjectId(userId, "User");

  // Fetch user details and shop details if applicable
  const { user, shopDetails } = await UserService.getUserDetailsByIdService(
    userId,
    role
  );

  res.status(200).json({
    status: "success",
    data: {
      user,
      shopDetails: shopDetails || null, // Include shop details only if applicable
    },
  });
});

/**
 * Controller to get user details.
 * @route GET /api/v2/users/:id
 * @access Restricted by role
 */
export const updateUserDetails = catchAsyncErrors(async (req, res, next) => {
  const { userId } = req.params; // User ID
  const updateData = req.body; // Data to update

  // Validate input
  if (!userId) {
    return next(new AppError("User ID is required", 400));
  }

  validateObjectId(userId, "User");

  const updatedUser = await UserService.updateUserService(userId, updateData);

  res.status(200).json({
    status: "success",
    data: {
      user: updatedUser,
    },
  });
});

/**
 * Admin endpoint to verify a user's email.
 * @route PATCH /api/v1/admin/users/:id/verify-email
 */
export const verifyUserEmail = catchAsyncErrors(async (req, res, next) => {
  const { userId } = req.params;
  const adminId = req.user.id;

  // Validate input
  if (!userId) {
    return next(new AppError("User ID is required", 400));
  }

  validateObjectId(userId, "User");

  const updatedUser = await UserService.verifyUserEmailService(userId, adminId);

  // Log the successful verification
  logger.info(`User ${userId} email verified by admin ${adminId}`);

  res.status(200).json({
    status: "success",
    message: "User email verified successfully",
    data: updatedUser,
  });
});

// Update User Role
export const updateUserRole = catchAsyncErrors(async (req, res, next) => {
  const { userId } = req.params;
  const { role } = req.body;

  validateObjectId(userId, "User"); // Custom function to validate ObjectId

  if (!role) return next(new AppError("Role is required", 400)); // Example: validate against a USER_ROLES array

  const user = await UserService.updateUserRole(userId, role);
  logger.info(`Admin updated role of user ${userId} to ${role}`);
  res.status(200).json({
    status: "success",
    message: `User role updated to ${role}`,
    data: { user },
  });
});

// Update User Preferences
export const updateUserPreferences = catchAsyncErrors(
  async (req, res, next) => {
    const { userId } = req.params;
    const { preferences } = req.body;

    validateObjectId(userId, "User");

    if (!preferences || typeof preferences !== "object") {
      return next(new AppError("Invalid preferences data.", 400));
    }

    const user = await UserService.updateUserPreferences(userId, preferences);
    logger.info(`Admin updated preferences for user ${userId}`);
    res.status(200).json({
      status: "success",
      message: "User preferences updated successfully",
      data: { user },
    });
  }
);

// Reset User Login Attempts
export const resetUserLoginAttempts = catchAsyncErrors(async (req, res) => {
  const { userId } = req.params;

  validateObjectId(userId, "User");

  const user = await UserService.resetLoginAttempts(userId);
  logger.info(`Admin reset login attempts for user ${userId}`);
  res.status(200).json({
    status: "success",
    message: "Login attempts reset successfully",
    data: { user },
  });
});

// Get User Login History
export const getUserLoginHistory = catchAsyncErrors(async (req, res) => {
  const { userId } = req.params;

  validateObjectId(userId, "User");

  const loginHistory = await UserService.getUserLoginHistory(userId);
  res.status(200).json({
    status: "success",
    message: "Login history retrieved successfully",
    data: { loginHistory },
  });
});

// DELETE a user (Soft delete)
export const deleteUser = catchAsyncErrors(async (req, res, next) => {
  const { userId } = req.params;

  // Validate input
  if (!userId) {
    return next(new AppError("User ID is required", 400));
  }

  validateObjectId(userId, "User");

  try {
    const result = await UserService.deleteUserService(userId);
    res.status(200).json({
      status: "success",
      message: "User successfully soft-deleted",
      data: { user: result },
    });
  } catch (error) {
    if (error.message === "User not found") {
      return next(new AppError("User not found", 404));
    }

    if (error.message === "User already soft-deleted") {
      return next(new AppError("User is already soft-deleted", 400));
    }

    next(error); // Handle unexpected errors
  }
});

/**
 * Controller to handle user account deletion.
 * @route DELETE /api/v2/users/:id
 * @access Admin or Account Owner
 */
export const deleteUserAccount = catchAsyncErrors(async (req, res, next) => {
  const { id: userId } = req.params;
  const { role: requesterRole, id: requesterId } = req.user;

  // Validate userId as a valid MongoDB ObjectId
  validateObjectId(userId, "User");

  // Ensure only Admin or Account Owner can delete
  if (requesterRole !== "Admin" && requesterId !== userId) {
    return next(
      new AppError("You do not have permission to delete this account.", 403)
    );
  }

  // Delete the user account
  const deletedUser = await UserService.deleteUserAccount(userId);

  res.status(200).json({
    status: "success",
    message: `User account with ID ${userId} has been deleted successfully.`,
    data: { deletedUser },
  });
});

// ---------------------------------------------------
// Restore User
// ---------------------------------------------------
export const restoreUser = catchAsyncErrors(async (req, res, next) => {
  const { userId } = req.params;

  // Validate input
  if (!userId) {
    return next(new AppError("User ID is required", 400));
  }

  try {
    validateObjectId(userId, "User");
    logger.info(`Restoring user with ID: ${userId}`);

    const restoredUser = await UserService.restoreUserService(userId);

    res.status(200).json({
      status: "success",
      message: "User successfully restored",
      data: { user: restoredUser },
    });
  } catch (error) {
    if (error instanceof AppError) {
      return next(error); // Expected errors like validation or not found
    }

    logger.error(`Unexpected error restoring user: ${error.message}`);
    next(
      new AppError("An unexpected error occurred. Please try again later.", 500)
    );
  }
});

// ---------------------------------------------------
// Ban User
// ---------------------------------------------------
export const banUser = catchAsyncErrors(async (req, res, next) => {
  const { userId } = req.params;
  // Validate input
  if (!userId) {
    return next(new AppError("User ID is required", 400));
  }

  validateObjectId(userId, "User");

  const result = await UserService.banUserService(userId);
  if (!result) return next(new AppError("User not found", 404));

  res.status(200).json({
    status: "success",
    message: "User successfully banned",
    data: { user: result },
  });
});

// ---------------------------------------------------
// Unban User
// ---------------------------------------------------
export const unbanUser = catchAsyncErrors(async (req, res, next) => {
  const { userId } = req.params;
  // Validate input
  if (!userId) {
    return next(new AppError("User ID is required", 400));
  }

  validateObjectId(userId, "User");

  const result = await UserService.unbanUserService(userId);
  if (!result) return next(new AppError("User not found or not banned", 404));

  res.status(200).json({
    status: "success",
    message: "User successfully unbanned",
    data: { user: result },
  });
});

// ---------------------------------------------------
// Toggle Suspension
// ---------------------------------------------------
// Toggle User Suspension Status
export const toggleUserSuspension = catchAsyncErrors(async (req, res, next) => {
  const { userId } = req.params;

  // Validate input
  if (!userId) {
    return next(new AppError("User ID is required", 400));
  }

  validateObjectId(userId, "User");

  // Toggle suspension and get the new status
  const { userId: id, newSuspensionStatus } = await UserService.toggleSuspension(userId);

  // Respond with the updated status
  res.status(200).json({
    status: "success",
    message: `User suspension status updated to ${newSuspensionStatus ? "suspended" : "active"}`,
    data: { userId: id, isSuspended: newSuspensionStatus },
  });
});


// ---------------------------------------------------
// Get Active Users by Role
// ---------------------------------------------------
export const getActiveUsersByRole = catchAsyncErrors(async (req, res, next) => {
  const { role } = req.params;

  // Validate input
  if (!role) {
    return next(new AppError("Role is required", 400));
  }

  const activeUsers = await UserService.getActiveUsersByRole(role);

  res.status(200).json({
    status: "success",
    message: "Active users retrieved successfully",
    data: { activeUsers },
  });
});

// ---------------------------------------------------
// Lock Account
// ---------------------------------------------------
export const lockUserAccount = catchAsyncErrors(async (req, res) => {
  const { email } = req.body;
  await UserService.lockAccount(email);
  res.status(200).json({
    status: "success",
    message: "User account locked successfully",
  });
});

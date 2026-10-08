import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import User from '../api/models/UserModel.js';
import AppError from '../utils/HandleAppErrors.js';
import { logger } from '../utils/logger.js';
import {
  checkExistingUser,
  createUser,
  generateVerificationToken,
} from '../utils/userUtils.js';
import { validatePassword } from '../utils/validatePassword.js';
import Email from '../utils/emailUtils.js';
import useragent from 'express-useragent';

class AuthService {
  // ---------------------------------------------------------------------
  // ** === Sign up a new user and sending a verification token. === **
  // ---------------------------------------------------------------------

  static async signupUser(userData) {
    const { name, email, password, confirmPassword } = userData;

    // Validate input
    if (!name || !email || !password || !confirmPassword) {
      throw new AppError(
        'All fields (name, email, password, confirmPassword) are required.',
        400,
      );
    }

    if (password !== confirmPassword) {
      throw new AppError('Passwords do not match.', 400);
    }

    // Validate password
    const validationResult = await validatePassword(password, { name, email });

    if (!validationResult.valid) {
      throw new AppError(
        `Invalid password: ${validationResult.errors.join(' ')}`,
        400,
      );
    }

    // Check if email is already registered
    await checkExistingUser(email);

    // // Generate referral code
    // const referralCode = crypto.randomBytes(6).toString("hex");

    // Create user
    const user = await createUser({ name, email, password, confirmPassword });

    // Generate verification token
    const verificationToken = await generateVerificationToken(user);
    console.log('Token:', verificationToken);

    return { user, verificationToken };
  }

  // -----------------------------------------------------------------
  // ** == Activate a user's account using a verification token. == **
  // -----------------------------------------------------------------

  static async activateAccountService(token) {
    if (!token) {
      throw new AppError('Activation token is required.', 422);
    }

    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');
    logger.debug(`Received Token: ${token}`);
    logger.debug(`Hashed Token: ${hashedToken}`);

    const user = await User.findOne({
      emailVerificationToken: hashedToken,
      emailVerificationTokenExpiry: { $gt: Date.now() },
    });

    if (!user) {
      logger.warn('Invalid or expired activation token.');
      throw new AppError('Invalid or expired activation token.', 404);
    }

    user.isEmailVerified = true;
    user.emailVerificationToken = undefined;
    user.emailVerificationTokenExpiry = undefined;

    await user.save({ validateBeforeSave: false });

    logger.info(`Account activated for user: ${user.email}`);

    return {
      id: user._id,
      name: user.name,
      email: user.email,
      isEmailVerified: user.isEmailVerified,
    };
  }

  // -----------------------------------------------------------------
  // ** == Login Into Users Account and Send Access Tokens == **
  // -----------------------------------------------------------------
  static async loginUserService(userData, clientInfo) {
    const { email, password } = userData;

    // Fetch user and include sensitive fields
    const user = await User.findOne({ email }).select(
      '+password +loginAttempts +accountLockedUntil',
    );

    if (!user) {
      throw new AppError('Incorrect email or password', 401);
    }

    // Handle account lock
    if (user.isAccountLocked() && user.accountLockedUntil > Date.now()) {
      throw new AppError(
        `Your account is locked until ${new Date(user.accountLockedUntil).toLocaleString()}.`,
        423,
      );
    }

    // Check if password is correct
    const isPasswordCorrect = await user.correctPassword(
      password,
      user.password,
    );
    if (!isPasswordCorrect) {
      await user.incrementLoginAttempts();

      if (user.isAccountLocked()) {
        throw new AppError(
          `Your account is locked until ${new Date(user.accountLockedUntil).toLocaleString()}.`,
          423,
        );
      }

      throw new AppError('Incorrect email or password', 401);
    }

    // Reset login attempts
    await user.resetLoginAttempts();

    // Ensure account is active
    if (!user.isActiveAccount) {
      throw new AppError(
        'Your account is inactive. Please contact support.',
        403,
      );
    }

    // Ensure email is verified
    if (!user.isEmailVerified) {
      throw new AppError('Please verify your email to login.', 403);
    }

    // Update last login timestamp and log client info
    user.lastLoginDate = Date.now();
    user.lastLoginIP = clientInfo.ip || 'Unknown';
    user.lastLoginDevice =
      useragent.parse(clientInfo.device).platform || 'Unknown';

    await user.save({ validateBeforeSave: false });

    // Generate tokens
    const accessToken = user.getJWTAccessToken();
    const refreshToken = user.getJWTRefreshToken();

    return {
      user,
      accessToken,
      refreshToken,
    };
  }

  // -----------------------------------------------------------------
  // ** == Sends User Refresh Token with New Access Token == **
  // -----------------------------------------------------------------
  static async refreshTokenService(refreshTokenFromCookie) {
    try {
      // 1. Verify the refresh token
      let decoded;
      try {
        decoded = jwt.verify(
          refreshTokenFromCookie,
          process.env.JWT_REFRESH_TOKEN_SECRET,
        );
      } catch (error) {
        throw AppError.unauthorized(
          `Invalid or expired refresh token: ${error.message}`,
        );
      }

      // 2. Find the user by ID from the decoded token
      const user = await User.findById(decoded.id).select('+refreshToken');
      if (!user) {
        throw AppError.notFound('User not found.');
      }

      // 3. Check if the stored refresh token matches the provided token
      if (!user.refreshToken || user.refreshToken !== refreshTokenFromCookie) {
        throw AppError.forbidden('Invalid refresh token.');
      }

      // 4. Rotate refresh token for security
      const newRefreshToken = user.getJWTRefreshToken();
      user.refreshToken = newRefreshToken;
      await user.save({ validateBeforeSave: false });

      // 5. Generate new access token
      const accessToken = user.getJWTAccessToken();

      // 6. Return tokens and user details
      return { accessToken, newRefreshToken, user };
    } catch (error) {
      throw new AppError(`Error refreshing token: ${error.message}`, 500);
    }
  }

  // -----------------------------------------------------------------
  // ** == Log User Out and Clear the Tokens from the Cookies == **
  // -----------------------------------------------------------------

  static async logoutService(refreshToken) {
    try {
      // Step 1: Verify the refresh token
      const decodedToken = jwt.verify(
        refreshToken,
        process.env.JWT_REFRESH_TOKEN_SECRET,
      );

      // Step 2: Find the user by ID
      const user = await User.findById(decodedToken.id).select('+refreshToken');
      if (!user) {
        throw AppError.notFound('User not found.');
      }

      // Step 3: Check if the user account is active and not locked
      if (!user.isActiveAccount || user.isAccountLocked()) {
        throw AppError.forbidden(
          'User account is inactive or locked. Please contact support.',
        );
      }

      // Step 4: Validate the refresh token
      if (user.refreshToken !== refreshToken) {
        throw AppError.unauthorized(
          'Refresh token does not match our records.',
        );
      }

      // Step 5: Revoke the refresh token
      user.refreshToken = null;
      await user.save({ validateBeforeSave: false });

      // Optional: Log the logout activity (e.g., for auditing or analytics)
      logger.info(
        `User ${user.id} logged out successfully at ${new Date().toISOString()}`,
      );

      return user;
    } catch (error) {
      // Handle specific JWT errors more gracefully
      if (error.name === 'TokenExpiredError') {
        throw AppError.unauthorized('Refresh token has expired.');
      } else if (error.name === 'JsonWebTokenError') {
        throw AppError.unauthorized('Invalid refresh token.');
      }
      throw error; // Re-throw any other unexpected errors
    }
  }

  // -----------------------------------------------------------
  // ** ====== Handles the forgot password process. ======  **
  // -----------------------------------------------------------

  static async handleForgotPassword(email, protocol, host) {
    // 1. Validate user existence
    const user = await User.findOne({ email });
    if (!user) {
      throw AppError.notFound('No user found with that email address.');
    }

    // 2. Generate password reset token
    const resetToken = crypto.randomBytes(32).toString('hex');
    const hashedToken = crypto
      .createHash('sha256')
      .update(resetToken)
      .digest('hex');

    user.passwordResetToken = hashedToken;
    user.passwordResetTokenExpiry = Date.now() + 10 * 60 * 1000; // Token valid for 10 minutes
    await user.save({ validateBeforeSave: false });

    // 3. Construct reset URL
    // const resetURL = `${protocol}://${host}/api/v2/users/auth/password/reset/${resetToken}`;

    const frontendUrl = process.env.FRONTEND_URL || `${protocol}://${host}`;
    const resetURL = `${frontendUrl}/reset-password/${encodeURIComponent(resetToken)}`;

    // console.log(resetToken);
    // 4. Send email with reset URL
    try {
      const emailInstance = new Email(user, resetURL);
      await emailInstance.sendPasswordReset();
      return { message: 'Password reset token sent to email!' };
    } catch (error) {
      logger.error(error);
      // Cleanup if email sending fails
      user.passwordResetToken = undefined;
      user.passwordResetTokenExpiry = undefined;
      await user.save({ validateBeforeSave: false });
      throw AppError.internalServerError(
        'Error sending the email. Try again later.',
      );
    }
  }

  // -----------------------------------------------------------
  // ** ====== Handles the reset password process. ======  **
  // -----------------------------------------------------------

  static async handleResetPassword(token, password) {
    // 1. Hash the token and find the user
    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');
    const user = await User.findOne({
      passwordResetToken: hashedToken,
      passwordResetTokenExpiry: { $gt: Date.now() }, // Ensure token is not expired
    });

    // 2. Validate user and token
    if (!user) {
      throw AppError.conflict('Token is invalid or has expired.');
    }

    // 4. Check if the account is locked
    if (user.isAccountLocked()) {
      throw AppError.forbidden(
        'Your account is locked due to multiple failed login attempts. Please contact support.',
      );
    }

    // 5. Update the password
    user.password = password;
    user.passwordResetToken = undefined; // Clear reset token
    user.passwordResetTokenExpiry = undefined; // Clear token expiration

    await user.save();

    return { user };
  }

  // -----------------------------------------------------------
  // ** ===  Updates a user's password after validation. ===  **
  // -----------------------------------------------------------

  static async updatePasswordService(user, oldPassword, newPassword) {
    // Use the model's method to update the password
    try {
      await user.updatePassword(oldPassword, newPassword);
      return user;
    } catch (error) {
      throw AppError.unauthorized(error.message || 'Password update failed.');
    }
  }

  // -------------------------------------------------------------------
  // ** Retrieves a user's details, excluding sensitive information. **
  // --------------------------------------------------------------------

  static async getUserDetails(userId) {
    const user = await User.findById(userId).select(
      '-password -refreshToken -deletedDate',
    );

    if (!user || user.deletedDate) {
      throw AppError.notFound('User not found or has been deleted.');
    }

    return user;
  }

  // -------------------------------------------------------------------
  // ** ========= Updates user profile with provided fields. ======= **
  // --------------------------------------------------------------------
  static async updateUserProfileService(userId, updatedData) {
    // Find the user
    const user = await User.findById(userId);
    if (!user) {
      throw new AppError('User not found.', 404);
    }

    // Update the profile using the method from the User schema
    const updatedUser = await user.updateProfile(updatedData);

    // Return the updated user object (exclude sensitive fields if needed)
    return {
      name: updatedUser.name,
      email: updatedUser.email,
      bio: updatedUser.bio,
      profilePicture: updatedUser.profilePicture,
      preferences: updatedUser.preferences,
    };
  }

  // -------------------------------------------------------------------
  // ** === Retrieves the account status for a given user ID. === **
  // --------------------------------------------------------------------

  static async getAccountStatusService(userId) {
    const user = await User.findById(userId);
    if (!user) {
      throw new AppError('User not found.', 404);
    }

    const isLocked = user.isAccountLocked();

    return {
      isLocked,
      unlockTime: isLocked
        ? new Date(user.accountLockedUntil).toLocaleString()
        : null,
      loginAttempts: user.loginAttempts,
      role: user.role,
    };
  }

  // -------------------------------------------------------------------
  // ** === Soft deletes a user by marking them inactive  === **
  // --------------------------------------------------------------------

  static async deleteAccountService(userId) {
    const user = await User.softDelete(userId);
    if (!user) {
      throw new AppError('User not found.', 404);
    }
  }
}
export default AuthService;

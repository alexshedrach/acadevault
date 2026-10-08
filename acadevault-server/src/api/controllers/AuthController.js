import AuthService from '../../services/authService.js';
import Email from '../../utils/emailUtils.js';
import { catchAsyncErrors } from '../../utils/catchAsyncErrors.js';
import { logger } from '../../utils/logger.js';
import { sendResponse } from '../../utils/sendResponse.js';
import {
  generateVerificationToken,
  sendTokens,
} from '../../utils/userUtils.js';
import AppError from '../../utils/HandleAppErrors.js';
import User from '../models/UserModel.js';
import filterObject from '../../utils/filterObject.js';
import { validatePassword } from '../../utils/validatePassword.js';
import NotificationService from '../../services/notification/NotificationService.js';
import { NOTIFICATION_CHANNELS } from '../../constants/notificationEnums.js';

// --------------------------------------------------------------
// ** ============ User Signup Controller =============== **
// --------------------------------------------------------------

export const signup = catchAsyncErrors(async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;

  // Use the AuthService to handle signup logic
  const { user, verificationToken } = await AuthService.signupUser({
    name,
    email,
    password,
    confirmPassword,
  });

  // Construct verification URL
  // const verificationUrl = `${req.protocol}://${req.get('host')}/api/v2/users/auth/activate-account?token=${encodeURIComponent(verificationToken)}`;

  // Use the FRONTEND_URL environment variable if set, otherwise fall back to using the request's host.
  const frontendUrl =
    process.env.FRONTEND_URL || `${req.protocol}://${req.get('host')}`;
  const verificationUrl = `${frontendUrl}/activate-account/${encodeURIComponent(
    verificationToken,
  )}`;

  // Send the welcome email
  // const emailInstance = new Email(user, verificationUrl);
  // await emailInstance.sendWelcome();

  await NotificationService.sendNotification({
    recipient: user._id,
    type: 'welcome', // tells EmailClient to use `welcome.hbs` template
    title: '🎉 Welcome to AcaDeVault!',
    message: `Hi ${user.name}, verify your account.`,
    channel: NOTIFICATION_CHANNELS.EMAIL,
    action: verificationUrl,
  });


  // Log the successful signup
  logger.info(`New user signed up: ${user.email}`);

  // Send response
  sendResponse(
    res,
    201,
    'User registered successfully. Please check your email to verify your account.',
    {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    },
  );
});

// --------------------------------------------------------------------
// ** ============= Controller for account activation =========== **
// --------------------------------------------------------------------

export const activateAccount = catchAsyncErrors(async (req, res) => {
  const { token } = req.query;

  const user = await AuthService.activateAccountService(token);

  // Send the confirmation email
  const emailInstance = new Email(user);
  await emailInstance.sendAccountActivated();

  res.status(200).json({
    status: 'success',
    message: 'Account activated successfully!',
    data: { user },
  });
});

export const resendActivationEmail = catchAsyncErrors(async (req, res) => {
  const { email } = req.body;

  if (!email) {
    throw new AppError('Email is required.', 400);
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw new AppError('User not found.', 404);
  }

  if (user.isEmailVerified) {
    throw new AppError('Account already activated.', 400);
  }

  const verificationToken = await generateVerificationToken(user);
  const frontendUrl =
    process.env.FRONTEND_URL || `${req.protocol}://${req.get('host')}`;
  const verificationUrl = `${frontendUrl}/activate-account/${encodeURIComponent(verificationToken)}`;

  const emailInstance = new Email(user, verificationUrl);
  await emailInstance.sendWelcome();

  logger.info(`Resent activation email to: ${user.email}`);

  return sendResponse(res, 200, 'Activation email resent successfully.');
});

// --------------------------------------------------------------------
// ** Login controller that handles user login logic via request. **
// --------------------------------------------------------------------

export const login = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError('Email and password are required.', 400));
  }

  // Client info for logging
  // Extract client information
  const clientInfo = {
    ip:
      req.ip || req.headers['x-forwarded-for'] || req.connection.remoteAddress,
    device: req.headers['user-agent'],
  };

  const { user } = await AuthService.loginUserService(
    { email, password },
    clientInfo,
  );

  // Send tokens using the utility
  sendTokens(user, 200, res, 'User logged in successfully.');
});

// --------------------------------------------------------------------
// ** Refesh Token controller that handles Geting of Refesh Token **
// --------------------------------------------------------------------

export const refreshToken = catchAsyncErrors(async (req, res, next) => {
  // const { refreshToken: refreshTokenFromCookie } = req.cookies;
  const refreshTokenFromCookie =
    req.cookies.refreshToken || req.body.refreshToken;

  // 1. Validate presence of refresh token
  if (!refreshTokenFromCookie) {
    return next(new AppError('No refresh token provided.', 403));
  }

  try {
    // 2. Process the refresh token
    const { user } = await AuthService.refreshTokenService(
      refreshTokenFromCookie,
    );

    // 3. Send new tokens to the client
    sendTokens(user, 200, res, 'Token refreshed successfully');
  } catch (error) {
    next(error);
  }
});

// -----------------------------------------------------------
// ** ====== Logout controller function ======  **
// -----------------------------------------------------------

export const logout = catchAsyncErrors(async (req, res, next) => {
  const { refreshToken } = req.cookies;

  // Step 1: Check for the presence of a refresh token
  if (!refreshToken) {
    return next(
      AppError.validationError('Refresh token is required for logout.'),
    );
  }

  // Step 2: Call the logout service to handle the business logic
  try {
    await AuthService.logoutService(refreshToken);
  } catch (err) {
    // Handle cases where the token is already invalid or the user is not found
    if (err.message.includes('Invalid') || err.message.includes('expired')) {
      logger.warn('Attempted logout with invalid/expired token.');
    }
    // Continue clearing cookies even if service throws an error
  }

  // Step 3: Clear cookies (both refreshToken and any other session-related cookies)
  res.clearCookie('refreshToken', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'Strict' : 'Lax',
  });
  res.clearCookie('jwt', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'Strict' : 'Lax',
  });

  // Step 4: Send success response
  res.status(200).json({
    status: 'success',
    message: 'You have successfully logged out. All session cookies cleared.',
  });
});

// -----------------------------------------------------------
// ** ====== FORGOT PASSWORD CONTROLLER  ======  **
// -----------------------------------------------------------

export const forgotPassword = catchAsyncErrors(async (req, res, next) => {
  const { email } = req.body;

  // Validate email input
  if (!email) {
    return next(AppError.validationError('Email is required.'));
  }

  const protocol = req.protocol;
  const host = req.get('host');

  // Call the service layer to handle logic
  const result = await AuthService.handleForgotPassword(email, protocol, host);

  // Send success response
  res.status(200).json({
    status: 'success',
    message: result.message,
  });
});

// -----------------------------------------------------------
// ** ====== RESET PASSWORD CONTROLLER ======  **
// -----------------------------------------------------------

export const resetPassword = catchAsyncErrors(async (req, res, next) => {
  const { token } = req.params;
  const { password, confirmPassword } = req.body;

  // Validate password
  const validationResult = await validatePassword(password);

  if (!validationResult.valid) {
    return next(
      new AppError(
        `Invalid password: ${validationResult.errors.join(' ')}`,
        400,
      ),
    );
  }

  // 1. Validate input passwords
  if (!password || !confirmPassword) {
    return next(
      AppError.validationError('Please provide and confirm your new password.'),
    );
  }
  if (password !== confirmPassword) {
    return next(AppError.validationError('Passwords do not match.'));
  }

  // Delegate the logic to the service layer
  const { user } = await AuthService.handleResetPassword(
    token,
    password,
    confirmPassword,
  );

  sendTokens(user, 200, res, 'Password has been reset successfully!');
});

// ----------------------------------------------------------------
// ** ====== UPDATE LOGGED IN USER PASSWORD CONTROLLER ======  **
// ----------------------------------------------------------------

export const updatePassword = catchAsyncErrors(async (req, res, next) => {
  const { oldPassword, newPassword, confirmPassword } = req.body;

  const { name, email } = req.user;

  // 1. Validate request body
  if (!oldPassword || !newPassword || !confirmPassword) {
    return next(
      AppError.validationError(
        'Please provide old password, new password, and confirm password.',
      ),
    );
  }

  // Validate password
  const validationResult = await validatePassword(newPassword, { name, email });

  if (!validationResult.valid) {
    return next(
      new AppError(
        `Invalid password: ${validationResult.errors.join(' ')}`,
        400,
      ),
    );
  }

  if (newPassword !== confirmPassword) {
    return next(
      AppError.validationError(
        'New password and confirm password do not match.',
      ),
    );
  }

  if (newPassword.length < 8) {
    return next(
      AppError.validationError(
        'New password must be at least 8 characters long.',
      ),
    );
  }

  // 2. Retrieve the authenticated user
  const user = await User.findById(req.user.id).select('+password');
  if (!user) {
    return next(AppError.notFound('User not found.'));
  }

  // 3. Update the password using the service
  await AuthService.updatePasswordService(user, oldPassword, newPassword);

  // 4. Optionally issue new tokens
  sendTokens(user, 200, res, 'Password updated successfully.');
});

// ----------------------------------------------------------------
// ** ====== CONTROLLER TO UPDATE LOGGED IN USER DATA ======  **
// ----------------------------------------------------------------
export const updateProfile = catchAsyncErrors(async (req, res) => {
  // Allowed fields for updating
  const allowedFields = [
    'name',
    'email',
    'bio',
    'profilePicture',
    'preferences',
  ];

  // Filter the request body to include only allowed fields
  const filteredData = filterObject(req.body, allowedFields);

  // Call the service to update the user's profile
  const updatedUser = await AuthService.updateUserProfileService(
    req.user.id,
    filteredData,
  );

  // Send success response
  res.status(200).json({
    status: 'success',
    message: 'Profile updated successfully.',
    data: {
      user: updatedUser,
    },
  });
});

// ----------------------------------------------------------------
// ** ====== CONTROLLER TO UPDATE OR UPLOAD USER PHOTO ======  **
// ----------------------------------------------------------------

// ----------------------------------------------------------------
// ** ====== CONTROLLER TO USER ACCOUNT STATIS ======  **
// ----------------------------------------------------------------

export const getAccountStatus = catchAsyncErrors(async (req, res) => {
  const statusData = await AuthService.getAccountStatusService(req.user.id);

  res.status(200).json({
    status: 'success',
    data: statusData,
  });
});

// ----------------------------------------------------------------
// ** ====== CONTROLLER TO GET LOGGED IN USER DETAILS ======  **
// ----------------------------------------------------------------

// Get User Details Controller
export const getUserDetails = catchAsyncErrors(async (req, res, next) => {
  // Ensure the user is authenticated
  if (!req.user) {
    return next(
      AppError.unauthorized('You must be logged in to view your details.'),
    );
  }

  // Retrieve user details using the service
  const user = await AuthService.getUserDetails(req.user.id);

  res.status(200).json({
    status: 'success',
    data: {
      id: user._id,
      name: user.name,
      email: user.email,
      phoneNumber: user.phoneNumber,
      profilePicture: user.profilePicture,
      role: user.role,
      preferences: user.preferences,
      referralCode: user.referralCode,
      isActiveAccount: user.isActiveAccount,
      isEmailVerified: user.isEmailVerified,
      lastLoginDate: user.lastLoginDate,
      failedLoginAttempts: user.failedLoginAttempts,
      walletBalance: user.walletBalance,
    },
  });
});

// ----------------------------------------------------------------
// ** ====== CONTROLLER TO DELETE LOGGED IN USER ======  **
// ----------------------------------------------------------------

export const deleteAccount = catchAsyncErrors(async (req, res) => {
  await AuthService.deleteAccountService(req.user.id);

  res.status(204).json({
    status: 'success',
    message: 'Account deleted successfully.',
  });
});

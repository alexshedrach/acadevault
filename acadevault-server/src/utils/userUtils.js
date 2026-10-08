import jwt from "jsonwebtoken";
import User from "../api/models/UserModel.js";
import AppError from "./HandleAppErrors.js";

/**
 * Check if a user with the given email already exists.
 * @param {string} email - The email to check.
 * @throws {AppError} If the email is already registered.
 */
export const checkExistingUser = async (email) => {
  const user = await User.findOne({ email });
  if (user)
    throw new AppError("The provided email is already registered.", 409);
};

/**
 * Create a new user with the provided data.
 * @param {Object} data - The user data for creation.
 * @returns {Object} The created user.
 */
export const createUser = async (data) => {
  return await User.create(data);
};

/**
 * Generate an account verification token for the user.
 * @param {Object} user - The user instance.
 * @returns {string} The generated verification token.
 */
export const generateVerificationToken = async (user) => {
  const verificationToken = user.createAccountVerificationToken();
  await user.save({ validateBeforeSave: false });
  return verificationToken;
};


/**
 * Helper function to send tokens securely to the client.
 * @param {Object} user - The authenticated user object.
 * @param {Number} statusCode - HTTP status code to use in the response.
 * @param {Object} res - Express response object.
 * @param {String} message - Success message (default: "Authentication successful").
 */
export const sendTokens = async (
  user,
  statusCode,
  res,
  message = "Authentication successful"
) => {
  try {
    // Generate Access and Refresh Tokens
    const accessToken = user.getJWTAccessToken();
    const refreshToken = user.getJWTRefreshToken();

    // Rotate and persist the Refresh Token in the database
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    // Define secure cookie options
    const cookieOptions = (maxAge) => ({
      httpOnly: true, // Prevent client-side access to cookies
      secure: process.env.NODE_ENV === "production", // Use HTTPS in production
      sameSite: "Strict", // Mitigate CSRF attacks
      maxAge,
    });

    // Define cookie expiry durations
    const accessTokenMaxAge =
      Number(process.env.JWT_ACCESS_COOKIE_EXPIRES_IN) * 60 * 1000 ||
      15 * 60 * 1000; // Default: 15 minutes
    const refreshTokenMaxAge =
      Number(process.env.JWT_REFRESH_COOKIE_EXPIRES_IN) * 60 * 1000 ||
      7 * 24 * 60 * 60 * 1000; // Default: 7 days

    // Set Access Token cookie
    res.cookie("accessToken", accessToken, cookieOptions(accessTokenMaxAge));

    // Set Refresh Token cookie
    res.cookie("refreshToken", refreshToken, cookieOptions(refreshTokenMaxAge));

    // Respond with tokens and sanitized user data
    res.status(statusCode).json({
      status: "success",
      message,
      tokens: {
        accessToken,
        refreshToken,
      },
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        profilePicture: user.profilePicture,
        role: user.role,
        createdAt: user.createdAt,
        lastLoginDate: user.lastLoginDate,
        lastLoginIP: user.lastLoginIP,
        lastLoginDevice: user.lastLoginDevice,
      },
    });
  } catch (error) {
    console.error("Error in sendTokens:", error.message);
    res.status(500).json({
      status: "error",
      message: "An error occurred while setting authentication cookies.",
    });
  }
};


/**
 * Verifies a JWT token and returns the decoded payload.
 * @param {string} token - The JWT token to verify.
 * @param {string} secret - The secret key used to verify the token.
 * @param {object} [options={}] - Optional verification options (e.g., issuer, audience).
 * @returns {Promise<object>} - The decoded token payload.
 * @throws {AppError} - If the token verification fails.
 */
export const verifyToken = async (token, secret, options = {}) => {
  if (!token) {
    throw new AppError("Token is missing. Authorization failed.", 401);
  }

  const defaultOptions = {
    issuer: process.env.JWT_ISSUER,
    audience: process.env.JWT_ACCESS_AUDIENCE,
    ...options,
  };

  try {
    return jwt.verify(token, secret, defaultOptions);
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      throw new AppError("Token has expired. Please log in again.", 401);
    }
    if (err.name === "JsonWebTokenError") {
      throw new AppError("Invalid token. Authorization failed.", 401);
    }
    if (err.name === "NotBeforeError") {
      throw new AppError("Token is not valid yet. Please try later.", 401);
    }

    console.error(`Unexpected token verification error: ${err.message}`);
    throw new AppError("Token verification failed. Try again later.", 500);
  }
};


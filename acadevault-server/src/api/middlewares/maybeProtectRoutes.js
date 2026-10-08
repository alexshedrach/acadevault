import User from '../models/UserModel.js';
import { verifyToken } from '../../utils/userUtils.js';
import { logger } from '../../utils/logger.js';

/**
 * Middleware to optionally authenticate requests.
 * If a valid access token is present, attaches the authenticated user to req.user.
 * Otherwise, allows the request to proceed as a guest.
 */
export const maybeProtectRoutes = async (req, res, next) => {
  let token;

  try {
    // 1. Try Authorization header
    if (req.headers.authorization?.startsWith('Bearer ')) {
      token = req.headers.authorization.split(' ')[1];
    }

    // 2. Fallback to accessToken cookie
    else if (req.cookies?.accessToken) {
      token = req.cookies.accessToken;
    }

    // 3. Fallback to token in query string
    else if (req.query?.token) {
      token = req.query.token;
    }

    // 4. No token present – treat as guest
    if (!token) {
      return next();
    }

    // 5. Attempt token verification
    const decoded = await verifyToken(token, process.env.JWT_ACCESS_TOKEN_SECRET);

    const currentUser = await User.findById(decoded.id).select(
      '+role +isActiveAccount +isEmailVerified'
    );

    // 6. Invalidate inactive, non-existent, or unverified users
    if (!currentUser || !currentUser.isActiveAccount || !currentUser.isEmailVerified) {
      return next();
    }

    // 7. Invalidate if password changed after token was issued
    if (currentUser.hasPasswordChangedAfter(decoded.iat)) {
      return next();
    }

    // 8. Attach user for downstream access
    req.user = currentUser;
  } catch (error) {
    logger.warn('Optional authentication failed', {
      error: error.message,
      route: req.originalUrl,
      ip: req.ip,
    });

    // Don't throw, continue as guest
    return next();
  }

  next();
};

// Optional alias for semantic clarity
export const optionalAuth = maybeProtectRoutes;

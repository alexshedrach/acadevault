import User from "../models/UserModel.js";
import AppError from "../../utils/HandleAppErrors.js";
import { catchAsyncErrors } from "../../utils/catchAsyncErrors.js";
import { verifyToken } from "../../utils/userUtils.js";

// Protects routes by ensuring the user is authenticated and authorized

export const protectRoutes = catchAsyncErrors(async (req, res, next) => {
  let token;

  // 1) Try Authorization header
  if (req.headers.authorization?.startsWith('Bearer ')) {
    token = req.headers.authorization.split(' ')[1];

    // 2) Fallback: accessToken HTTP‑only cookie
  } else if (req.cookies?.accessToken) {
    token = req.cookies.accessToken;

    // 3) Final fallback: token in query params
  } else if (req.query.token) {
    token = req.query.token;
  }

  if (!token) {
    return next(
      new AppError(
        'Access denied. Please log in to access this resource.',
        401,
      ),
    );
  }

  // Verify with ACCESS token secret
  const decoded = await verifyToken(token, process.env.JWT_ACCESS_TOKEN_SECRET);

  // Attach user
  const currentUser = await User.findById(decoded.id).select(
    '+role +isActiveAccount +isEmailVerified',
  );

  if (!currentUser || !currentUser.isActiveAccount) {
    return next(new AppError('User not found or inactive.', 403));
  }
  if (!currentUser.isEmailVerified) {
    return next(
      new AppError('Email not verified. Please verify to proceed.', 403),
    );
  }
  if (currentUser.hasPasswordChangedAfter(decoded.iat)) {
    return next(
      new AppError('Password changed recently. Please log in again.', 401),
    );
  }

  req.user = currentUser;
  next();
});

// export const protectRoutes = catchAsyncErrors(async (req, res, next) => {
//   let token;

//   // Check if Authorization header exists and starts with "Bearer"
//   if (req.headers.authorization?.startsWith("Bearer")) {
//     token = req.headers.authorization.split(" ")[1]; // Extract the token from the Authorization header
//   }
//   // Fallback to check for refreshToken in cookies if Authorization header is not available
//   else if (req.cookies.refreshToken) {
//     token = req.cookies.refreshToken; // Extract the token from cookies
//   }
//   // Fallback to check for token in query parameters if neither of the above are found
//   else if (req.query.token) {
//     token = req.query.token; // Extract the token from the query parameter
//   }

//   // If no token is found, deny access and return an error response
//   if (!token) {
//     return next(
//       new AppError("Access denied! Please log in to access this resource.", 401)
//     );
//   }

//   // Verify the token using the secret key (JWT_ACCESS_TOKEN_SECRET)
//   const decoded = await verifyToken(token, process.env.JWT_ACCESS_TOKEN_SECRET);

//   // Find the user associated with the decoded token
//   const currentUser = await User.findById(decoded.id).select(
//     "+role +isActiveAccount +isEmailVerified" // Include additional fields: role, isActiveAccount, and isEmailVerified
//   );

//   // If the user doesn't exist or the account is inactive, deny access with an error
//   if (!currentUser || !currentUser.isActiveAccount) {
//     return next(new AppError("User is not authorized.", 403));
//   }

//   // If the user's email is not verified, deny access with an error
//   if (!currentUser.isEmailVerified) {
//     return next(new AppError("Please verify your email to proceed.", 403));
//   }

//   // If the user's password has been changed after the token was issued, force re-login
//   if (currentUser.hasPasswordChangedAfter(decoded.iat)) {
//     return next(
//       new AppError("Your password has been changed. Please log in again.", 401)
//     );
//   }

//   // Attach the current user to the request object for use in other parts of the app
//   req.user = currentUser;

//   // Move to the next middleware or route handler
//   next();
// });

/**
 * Middleware to restrict access to specific roles.
 * This function is used to protect routes by allowing only users with certain roles to access them.
 * @param {...string} roles - Allowed roles for this route. The function accepts multiple roles as arguments.
 */
export const restrictTo = (...roles) => {
  return (req, res, next) => {
    try {
      // Ensure the user's role exists on the request object.
      // This assumes that the user has already been authenticated and attached to the `req.user` object
      if (!req.user || !req.user.role) {
        // If no user or role is found, deny access and return an error response.
        return next(new AppError("User role not found. Access denied.", 403));
      }

      // Check if the user's role is included in the allowed roles.
      // The `roles` parameter is an array, and we check if the user's role exists in that array.
      if (!roles.includes(req.user.role)) {
        // If the user's role is not allowed, deny access and return an error message specifying the role.
        return next(
          new AppError(
            `Access denied. Your role '${req.user.role}' does not have permission to access this resource.`,
            403
          )
        );
      }

      // If the user's role is allowed, move to the next middleware or route handler.
      next();
    } catch (error) {
      // If any unexpected errors occur during the process, pass them to the error handler.
      next(error);
    }
  };
};

// export const protectRoutes = catchAsyncErrors(async (req, res, next) => {
//   let token;

//   // 1. Extract the token from headers, cookies, or custom headers
//   if (req.headers.authorization?.startsWith("Bearer")) {
//     token = req.headers.authorization.split(" ")[1];
//   } else if (req.cookies.jwt) {
//     token = req.cookies.jwt;
//   } else if (req.headers["x-auth-token"]) {
//     token = req.headers["x-auth-token"];
//   }

//   if (!token) {
//     console.error("No token provided in request.");
//     return next(
//       new AppError("Access denied! Please log in to access this resource.", 401)
//     );
//   }

//   try {
//     // 2. Verify the JWT token
//     const decoded = await verifyToken(
//       token,
//       process.env.JWT_ACCESS_TOKEN_SECRET
//     );

//     // 3. Fetch the user from the database
//     const currentUser = await User.findById(decoded.id).select(
//       "+role +isActiveAccount +isEmailVerified"
//     );

//     if (!currentUser) {
//       console.error("User not found in the database.");
//       return next(
//         new AppError(
//           "The user associated with this token no longer exists.",
//           401
//         )
//       );
//     }

//     // 4. Check if the user's account is active
//     if (!currentUser.isActiveAccount) {
//       return next(
//         new AppError("Your account is inactive. Please contact support.", 403)
//       );
//     }

//     // 5. Check if the user's email is verified
//     if (!currentUser.isEmailVerified) {
//       return next(
//         new AppError(
//           "Your email is not verified. Please verify it to proceed.",
//           403
//         )
//       );
//     }

//     // 6. Check if the password has been changed after the token was issued
//     if (currentUser.hasPasswordChangedAfter(decoded.iat)) {
//       return next(
//         new AppError(
//           "Your password has been changed recently. Please log in again.",
//           401
//         )
//       );
//     }

//     // 7. Attach the user to the request object
//     req.user = currentUser;
//     res.locals.user = currentUser; // Useful for templates

//     next();
//   } catch (err) {
//     console.error("Token verification error:", err);

//     if (err.name === "TokenExpiredError") {
//       return next(
//         new AppError("Your session has expired. Please log in again.", 401)
//       );
//     }

//     if (err.name === "JsonWebTokenError") {
//       return next(new AppError("Invalid token. Please log in again.", 401));
//     }

//     return next(new AppError("Authentication failed. Please try again.", 401));
//   }
// });

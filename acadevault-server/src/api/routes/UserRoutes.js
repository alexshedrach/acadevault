import express from 'express';

import * as authController from '../controllers/AuthController.js';
import * as userController from '../controllers/UserController.js';

import { protectRoutes, restrictTo } from '../middlewares/authMiddleware.js';
import { uploadSingleImage } from '../middlewares/multerMiddleware.js';
import { uploadProfilePicture } from '../controllers/uploadController.js';
import { processImage } from '../middlewares/imageProcessing.js';
import { USER_ROLES } from '../../constants/enums.js';

// Initalizing the Express Router
const router = express.Router();

/////////////////////////////////////////////////////////////////////////
// Users/Auth Public Routes
router.route('/auth/signup').post(authController.signup);
router.route('/auth/activate-account').get(authController.activateAccount);
router
  .route('/auth/resend-activation')
  .post(authController.resendActivationEmail);

router.route('/auth/login').post(authController.login);
router.route('/auth/refresh-token').post(authController.refreshToken);
router.route('/auth/logout').post(authController.logout);
router.route('/auth/password/forgot').post(authController.forgotPassword);
router.route('/auth/password/reset/:token').patch(authController.resetPassword);

// Middleware: Protecting All Routes
router.use(protectRoutes);

/////////////////////////////////////////////////////////////////////////
// Users/Auth Protected Routes
router.route('/auth/update/password').patch(authController.updatePassword);
router.route('/auth/account/me').get(authController.getUserDetails);
router.route('/auth/update/profile').put(authController.updateProfile);
router.route('/auth/account/status').get(authController.getAccountStatus);
router.route('/auth/account/delete').delete(authController.deleteAccount);
router.post(
  '/upload/photo',
  uploadSingleImage,
  processImage(),
  uploadProfilePicture,
);

// Users Shared Routes
router
  .route('/details/:userId')
  .get(
    restrictTo(USER_ROLES.ADMIN, USER_ROLES.SELLER),
    userController.getUserById,
  );

// Middleware: Ensure the user is logged in and has an admin role
router.use(restrictTo(USER_ROLES.ADMIN));

router.route('/').get(userController.getAllUsers);
router.route('/update/details/:userId').patch(userController.updateUserDetails);
router.route('/verify-email/:userId').patch(userController.verifyUserEmail);
router.route('/update/role/:userId').patch(userController.updateUserRole);
router.route('/login-history/:userId').get(userController.getUserLoginHistory);
router.route('/delete/:userId').delete(userController.deleteUser);
router.route('/restore/:userId').patch(userController.restoreUser);
router.route('/ban/:userId').patch(userController.banUser);
router.route('/unban/:userId').patch(userController.unbanUser);
router.route('/suspend/:userId').patch(userController.toggleUserSuspension);
router.route('/active/:role').get(userController.getActiveUsersByRole);
router.route('/lock-account').post(userController.lockUserAccount);
router
  .route('/update/preferences/:userId')
  .patch(userController.updateUserPreferences);
router
  .route('/reset-login-attempts/:userId')
  .patch(userController.resetUserLoginAttempts);
router
  .route('/delete/account/:userId')
  .delete(userController.deleteUserAccount);

/////////////////////////////////////////////////////////////////////////
//// Exporting the Router
export const userRouter = router;

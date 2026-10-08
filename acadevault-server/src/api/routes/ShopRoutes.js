import express from 'express';
import {
  createSellerAndShopController,
  deleteBankAccount,
  getAllSellerShops,
  getAllShops,
  getPrimaryBankAccount,
  getShopDetailsController,
  getTopSellers,
  initiateShopRegistrationController,
  setPrimaryBankAccount,
  submitDocumentsController,
  updateShopController,
  updateShopProfileController,
  uploadShopMediaController,
  uploadVerificationDocumentController,
  verifyOtpForShopController,
  verifyShopDocumentsController,
} from '../controllers/ShopController.js';
import { protectRoutes, restrictTo } from '../middlewares/authMiddleware.js';
import { USER_ROLES } from '../../constants/enums.js';
import {
  uploadShopMedia,
  uploadShopVerifyDocument,
} from '../middlewares/multerMiddleware.js';
import { processImage } from '../middlewares/imageProcessing.js';
import { maybeProtectRoutes } from '../middlewares/maybeProtectRoutes.js';

const router = express.Router();

// Public Routes (no authentication)
router.route('/').get(getAllShops);
// router.route("/:shopId/public").get(getPublicShopDetail);
router.route('/top-sellers').get(getTopSellers);
router.route('/:shopId/upload/media').post(
  uploadShopMedia, // Multer middleware to handle file uploads
  processImage(), // Process uploaded files for "logo and banner" preset
  uploadShopMediaController, // Consolidated handler for uploading media
);

// 👇 Public or Authenticated access — both supported!
router.get('/:shopId', maybeProtectRoutes, getShopDetailsController);

// Middleware: Protecting All Routes
router.use(protectRoutes);

// Role-based shop details Route
// router.route("/:shopId").get(getShopDetail);

// Routes for Shop Registration
router.route('/register/initiate').post(initiateShopRegistrationController);
router.route('/register/verify-otp').post(verifyOtpForShopController);
router.route('/update/shop/profile').patch(updateShopProfileController);
router
  .route('/:shopId/upload-document')
  .post(uploadShopVerifyDocument, uploadVerificationDocumentController);
router.route('/:shopId/submit-documents').post(submitDocumentsController);

// Seller/Shop Specific Routes
router
  .route('/seller/shops')
  .get(restrictTo(USER_ROLES.SELLER, USER_ROLES.ADMIN), getAllSellerShops);

router
  .route('/:shopId/primary-bank-account')
  .get(restrictTo(USER_ROLES.SELLER, USER_ROLES.ADMIN), getPrimaryBankAccount);
router
  .route('/:shopId/set-primary-bank-account')
  .patch(
    restrictTo(USER_ROLES.SELLER, USER_ROLES.ADMIN),
    setPrimaryBankAccount,
  );
router
  .route('/:shopId/bank-accounts/:bankDetailsId')
  .delete(restrictTo(USER_ROLES.SELLER, USER_ROLES.ADMIN), deleteBankAccount);

// Middleware: Ensure the user is logged in and has an admin role
router.use(restrictTo(USER_ROLES.ADMIN));

router.route('/admin/verify-documents').post(verifyShopDocumentsController);
router.route('/admin/create-seller-shop').post(createSellerAndShopController);
router.route('/admin/:shopId/update/details').put(updateShopController);

/////////////////////////////////////////////////////////////////////////
//// Exporting the Router

export const shopRouter = router;

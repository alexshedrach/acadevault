import AddressService from '../../services/addressService.js';
import BankDetailsService from '../../services/bankDetailService.js';
import ShopService from '../../services/shopService.js';
import { catchAsyncErrors } from '../../utils/catchAsyncErrors.js';
import AppError from '../../utils/HandleAppErrors.js';
import { logger } from '../../utils/logger.js';
import Address from '../models/AddressModel.js';
import BankDetails from '../models/BankDetails.js';
import Shop from '../models/ShopModel.js';
import { uploadMedia } from './uploadController.js';

// Controller: Initiate Shop Registration (Step 1)
export const initiateShopRegistrationController = catchAsyncErrors(
  async (req, res, next) => {
    const {
      businessName,
      shopType,
      contactInfo,
      description,
      privacyPolicyAccepted,
    } = req.body;
    const userId = req.user?.id;

    if (!userId) {
      return next(new AppError('User authentication required.', 401));
    }

    // Validate input
    if (!businessName || !shopType || !contactInfo || !privacyPolicyAccepted) {
      return next(new AppError('Missing required fields.', 400));
    }

    // Register shop and generate OTP
    const { shop, otp } = await ShopService.initiateShopRegistration(userId, {
      businessName,
      shopType,
      contactInfo,
      description,
      privacyPolicyAccepted,
    });

    // For production: abstract the OTP sending logic
    logger.info(`OTP for phone verification: ${otp}`);

    res.status(201).json({
      success: true,
      message:
        'Shop registration initiated. OTP sent to phone for verification.',
      shopId: shop._id,
    });
  },
);

// Verify Shop Phone Number
export const verifyOtpForShopController = catchAsyncErrors(
  async (req, res, next) => {
    const { shopId, otp } = req.body;

    if (!shopId || !otp)
      return next(new AppError('Shop ID and OTP are required.', 400));

    const result = await ShopService.verifyOtpForShop(shopId, otp);

    res.status(200).json(result);
  },
);

// Update Shop Profile (After OTP Verification)
export const updateShopProfileController = catchAsyncErrors(
  async (req, res, next) => {
    const {
      shopId,
      address,
      bankDetails,
      contactInfo,
      shopDetails,
      workingHours,
    } = req.body;
    const userId = req.user?.id;

    // ✅ Ensure User is Authenticated
    if (!userId) {
      return next(new AppError('User authentication required.', 401));
    }

    // ✅ Ensure Shop ID is Provided
    if (!shopId) {
      return next(new AppError('Shop ID is required.', 400));
    }

    try {
      // ✅ Step 1: Delegate Update Logic to Service Layer
      const updatedShop = await ShopService.updateShopProfile(shopId, userId, {
        bankDetails,
        contactInfo,
        shopDetails,
        workingHours, // 🔥 Now supports working hours update
      });

      // ✅ Step 2: Handle Address Update Separately
      if (address) {
        const existingAddress = await Address.findOne({
          owner: shopId,
          ownerType: 'Shop',
        });

        if (existingAddress) {
          // 🔹 Update existing address
          await Address.findByIdAndUpdate(existingAddress._id, address, {
            new: true,
          });
        } else {
          // 🔹 Create a new address linked to the shop
          await Address.create({
            ...address,
            owner: shopId,
            ownerType: 'Shop',
            isPrimary: true,
          });
        }
      }

      // ✅ Step 3: Respond with Updated Shop Data
      res.status(200).json({
        success: true,
        message: 'Shop profile updated successfully.',
        data: updatedShop,
      });
    } catch (error) {
      next(error);
    }
  },
);

/**
 * @desc    Upload verification document for shop
 * @route   POST /api/shops/:shopId/upload-document
 * @access  Private (Only shop owner)
 */
export const uploadVerificationDocumentController = catchAsyncErrors(
  async (req, res, next) => {
    const { id: userId } = req.user; // Authenticated user ID
    const { shopId } = req.params; // Shop ID from route params
    const { documentType, metadata } = req.body; // Document type and metadata from request body
    const file = req.file; // Uploaded file

    // Validate required fields
    if (!shopId || !documentType || !file) {
      return next(
        new AppError('Shop ID, document type, and file are required.', 400),
      );
    }

    // Call the ShopService to handle the document upload
    const result = await ShopService.uploadDocument(
      userId,
      shopId,
      file,
      documentType,
      metadata,
    );

    // Respond with success message
    res.status(201).json({
      success: true,
      message: result.message,
      document: result.document,
    });
  },
);

// / Submit documents for verification
export const submitDocumentsController = catchAsyncErrors(
  async (req, res, next) => {
    const { id: userId } = req.user;
    const { shopId } = req.params;

    // Validation: Ensure the IDs are valid
    if (!shopId || !userId) {
      return next(new AppError('Missing user ID or Shop request ID.', 400));
    }

    const result = await ShopService.submitDocuments(userId, shopId);

    res.status(200).json({
      success: true,
      message: result.message,
      shop: result.shop,
    });
  },
);

// Admin verification of documents
export const verifyShopDocumentsController = catchAsyncErrors(
  async (req, res, next) => {
    const { id: adminId } = req.user; // `req.user` contains authenticated admin details
    const { shopId, documentStatusUpdates } = req.body;

    // Validate required fields
    if (!shopId || !documentStatusUpdates) {
      return next(
        new AppError('shopId and documentStatusUpdates are required.', 400),
      );
    }

    // Call service to handle document verification
    const result = await ShopService.adminVerifyDocuments(
      adminId,
      shopId,
      documentStatusUpdates,
    );

    res.status(200).json({
      success: true,
      message: result.message,
      shop: {
        id: result.shop._id,
        name: result.shop.businessName,
        isVerified: result.shop.isVerified,
        status: result.shop.status,
        isActive: result.shop.isActive,
      },
      verificationDocument: result.verificationDocument,
    });
  },
);

// Admin Endpoint to create a seller and associated shop
export const createSellerAndShopController = catchAsyncErrors(
  async (req, res, next) => {
    const { sellerDetails, shopDetails } = req.body;

    if (!sellerDetails || !shopDetails) {
      return next(
        new AppError(
          'Seller details, shop details, and address details are required.',
          400,
        ),
      );
    }

    try {
      // Delegate the creation logic to the AdminService
      const result = await ShopService.createSellerAndShop(
        sellerDetails,
        shopDetails,
      );
      console.log(result);

      res.status(201).json({
        success: true,
        message: 'Seller and shop created successfully. Verification required.',
        seller: result.seller,
        shop: result.shop,
      });
    } catch (error) {
      return next(error);
    }
  },
);

// Controller to Upload Shop Logo and Banner Files
export const uploadShopMediaController = catchAsyncErrors(
  async (req, res, next) => {
    try {
      const { files } = req; // Uploaded files (logo and/or banner)

      const { shopId } = req.params; // Get shop ID from URL params

      // Validate input
      if (!files?.logo && !files?.banner) {
        return next(new AppError('No logo or banner file uploaded.', 400));
      }

      const updates = {}; // To store upload results for response

      // Handle logo upload if provided
      if (files.logo) {
        const result = await uploadMedia({
          model: Shop,
          documentId: shopId,
          fieldName: 'logo',
          file: files.logo[0], // Multer stores files as arrays, hence [0]
        });
        updates.logo = result.media;
      }

      // Handle banner upload if provided
      if (files.banner) {
        const result = await uploadMedia({
          model: Shop,
          documentId: shopId,
          fieldName: 'banner',
          file: files.banner[0], // Multer stores files as arrays, hence [0]
        });
        updates.banner = result.media;
      }

      // Send response
      res.status(201).json({
        message: 'Shop media uploaded successfully.',
        files: updates,
      });
    } catch (error) {
      logger.error('Error uploading shop media:', error.message);
      next(new AppError(`Internal server error: ${error.message}`, 500));
    }
  },
);

// Controller: Get All Shops with enhanced details (bank details, contact info, etc.)
export const getAllShops = catchAsyncErrors(async (req, res, next) => {
  const queryString = req.query;

  try {
    const { shops, paginationMetadata } =
      await ShopService.getAllShops(queryString);

    res.status(200).json({
      success: true,
      count: shops.length,
      pagination: paginationMetadata,
      data: shops,
    });
  } catch (error) {
    next(error);
  }
});

// //////////////////////////////////////////////////////////////////////
//  === Fetch all shops associated with a particular user ===

export const getAllSellerShops = catchAsyncErrors(async (req, res, next) => {
  const { user } = req;

  // Ensure the user is a Seller
  if (user.role !== 'Seller') {
    return next(
      new AppError('You are not authorized to view this resource.', 403),
    );
  }

  // Get the shops for the seller
  const responseData = await ShopService.getAllSellerShops(user);

  res.status(200).json({
    status: 'success',
    data: responseData,
    meta: {
      requestTime: new Date().toISOString(),
      role: user?.role,
    },
  });
});

// //////////////////////////////////////////////////////////////////////
// === Get a single shop by ID ===

/**
 * @desc Get Public Shop Details (No Authentication Required)
 * @route GET /api/shops/:shopId/public
 * @access Public
 */
// export const getPublicShopDetail = catchAsyncErrors(async (req, res, next) => {
//   const { shopId } = req.params;

//   if (!shopId) {
//     return next(new AppError('Missing Shop request ID.', 400));
//   }

//   const shop = await ShopService.getPublicShopDetails(shopId);

//   res.status(200).json({
//     status: 'success',
//     data: shop,
//   });
// });

/**
 * @desc Get Shop Details (Authenticated or Public)
 * @route GET /api/shops/:shopId
 * @access Public or Role-Based
 */
export const getShopDetailsController = catchAsyncErrors(async (req, res, next) => {
  const { shopId } = req.params;
  const user = req.user || null;

    if (!shopId) {
      return next(new AppError('Missing Shop request ID.', 400));
    }

  const shop = await ShopService.getUnifiedShopDetails(shopId, user, req.query);

  res.status(200).json({
    status: 'success',
    data: shop,
  });
});


/**
 * @desc Get Role-Based Shop Details (Requires Authentication)
 * @route GET /api/shops/:shopId
 * @access Role-Based (Buyer, Seller, Admin)
 */
// export const getShopDetail = catchAsyncErrors(async (req, res, next) => {
//   const { shopId } = req.params;
//   const user = req.user; // Authenticated user

//   if (!shopId) {
//     return next(new AppError('Missing Shop request ID.', 400));
//   }

//   const shop = await ShopService.getShopDetailsById(shopId, user);

//   res.status(200).json({
//     status: 'success',
//     data: shop,
//   });
// });

// //////////////////////////////////////////////////////////////////////
// === Get top sellers based on sales and average ratings ===

export const getTopSellers = catchAsyncErrors(async (req, res) => {
  // Fetch top sellers based on sales volume and average ratings
  const topSellers = await ShopService.getTopSellers();

  res.status(200).json({
    status: 'success',
    results: topSellers.length,
    data: topSellers,
    meta: {
      requestTime: new Date().toISOString(),
    },
  });
});

// Admin endpoint to update shop details
export const updateShopController = catchAsyncErrors(async (req, res, next) => {
  const { shopId } = req.params; // Shop ID from URL
  const updateData = req.body; // Data from request body
  const currentUser = req.user; // Current authenticated user

  // Ensure authentication and admin role
  if (!currentUser || currentUser.role !== 'Admin') {
    return next(
      new AppError('You do not have permission to update this shop.', 403),
    );
  }

  try {
    // Delegate update logic to the service
    const updatedShop = await ShopService.updateShopDetails(
      shopId,
      updateData,
      currentUser,
    );

    // Return success response
    res.status(200).json({
      status: 'success',
      message: 'Shop details updated successfully.',
      data: updatedShop,
    });
  } catch (error) {
    next(error);
  }
});

// Admin Endpoint for Bank Details
// {
//   "bankName": "Bank of Example",
//   "accountNumber": "123456789",
//   "accountName": "Gadget Empire Ltd",
//   "branch": "Main Street Branch",
//   "ifscCode": "BOEX123456",
//   "swiftCode": "BOEXUS123",
//   "currency": "USD"
// }

export const updateBankDetails = catchAsyncErrors(async (req, res, next) => {
  const { shopId } = req.params; // Shop ID from the URL
  const bankDetails = req.body; // Bank details from the request body
  const currentUser = req.user; // Authenticated user

  try {
    // Delegate update logic to the service
    const updatedBankDetails = await BankDetailsService.updateBankDetails(
      shopId,
      bankDetails,
      currentUser,
    );

    // Return success response
    res.status(200).json({
      status: 'success',
      message: 'Bank details updated successfully.',
      data: updatedBankDetails,
    });
  } catch (error) {
    next(error);
  }
});

// This endpoint uses the above service to update shop addresses.
// {
//   "type": "physical",
//   "addressLine1": "123 Main Street",
//   "addressLine2": "Suite 400",
//   "city": "Example City",
//   "state": "Example State",
//   "postalCode": "12345",
//   "country": "USA",
//   "phoneNumber": "+1234567890",
//   "enableGeocoding": true
// }

export const updateShopAddress = catchAsyncErrors(async (req, res, next) => {
  const { shopId } = req.params; // Shop ID from the URL
  const addressData = req.body; // Address details from the request body
  const currentUser = req.user; // Authenticated admin user

  try {
    const updatedAddress = await AddressService.updateShopAddress(
      shopId,
      addressData,
      currentUser,
    );

    res.status(200).json({
      status: 'success',
      message: 'Address updated successfully.',
      data: updatedAddress,
    });
  } catch (error) {
    next(error);
  }
});

// API Route Example: GET /api/v1/shops/:shopId/primary-bank-account
export const getPrimaryBankAccount = catchAsyncErrors(
  async (req, res, next) => {
    const shop = await Shop.findById(req.params.shopId);
    if (!shop) {
      return next(new AppError('Shop not found', 404));
    }

    // Get the primary bank account
    const primaryAccount = await shop.getPrimaryBankAccount();
    res.status(200).json({
      status: 'success',
      data: primaryAccount,
    });
  },
);

// API Route Example: PATCH /api/v1/shops/:shopId/set-primary-bank-account
export const setPrimaryBankAccount = catchAsyncErrors(
  async (req, res, next) => {
    const shop = await Shop.findById(req.params.shopId);
    if (!shop) {
      return next(new AppError('Shop not found', 404));
    }

    const { bankDetailsId } = req.body;

    // Set the primary bank account
    const updatedAccount = await shop.setPrimaryBankAccount(bankDetailsId);

    res.status(200).json({
      status: 'success',
      data: updatedAccount,
    });
  },
);

export const deleteBankAccount = catchAsyncErrors(async (req, res, next) => {
  const { shopId, bankDetailsId } = req.body;

  // Check if the account is the primary account
  const shop = await Shop.findById(shopId);
  const primaryAccount = await shop.getPrimaryBankAccount();

  if (primaryAccount._id.toString() === bankDetailsId) {
    return next(
      new AppError(
        'Cannot delete the primary bank account. Please set another account as primary first.',
        400,
      ),
    );
  }

  // Delete the bank account
  await BankDetails.findByIdAndDelete(bankDetailsId);
  res.status(200).json({
    status: 'success',
    message: 'Bank account deleted successfully.',
  });
});

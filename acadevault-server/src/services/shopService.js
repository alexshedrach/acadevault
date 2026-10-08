import bcrypt from "bcryptjs";
import Address from "../api/models/AddressModel.js";
import BankDetails from "../api/models/BankDetails.js";
import AppError from "../utils/HandleAppErrors.js";
import User from "../api/models/UserModel.js";
import Shop from "../api/models/ShopModel.js";
import VerificationDocument from "../api/models/VerificationDocumentModel.js";
import { SHOP_STATUSES } from "../constants/enums.js";
import ApiFeatures from "../utils/ApiFeatures.js";
import filterObject from "../utils/filterObject.js";
import { logger } from "../utils/logger.js";
import handleImageField from "../utils/handleImageField.js";
import {
  getAdminSpecificDetails,
  getBuyerSpecificDetails,
  getSellerSpecificDetails,
} from "../helper/shopDetailHelper.js";
import { uploadShopDocumentHelper } from "../api/controllers/uploadController.js";
import { notifyAdmin } from "../utils/notifyAdmin.js";
import EmailService from "./EmailService.js";
import {
  validateSingleImageField,
  validateSocialMediaLinks,
} from "../utils/validationUtils.js";
import mongoose from "mongoose";
import AcademicMaterialService from "./academicMaterialService.js";

export default class ShopService {
  /**
   * Step 1: Initiate Shop Registration
   * Creates a shop with basic details and sets an OTP for phone verification.
   */
  static async initiateShopRegistration(userId, shopData) {
    const {
      businessName,
      shopType,
      contactInfo,
      description,
      privacyPolicyAccepted,
    } = shopData;

    // Ensure user exists
    const userExists = await User.exists({ _id: userId });
    if (!userExists) {
      throw new AppError("User with the specified ID does not exist.", 400);
    }

    // Create a new shop with minimal details
    const shop = await Shop.create({
      owner: userId,
      businessName,
      shopType,
      contactInfo,
      description,
      privacyPolicyAccepted,
      status: SHOP_STATUSES.PENDING,
    });

    // Generate and send OTP
    const otp = await shop.generatePhoneOtp();
    console.log(otp);
    await shop.save(); // Save the shop with the OTP

    // Notify the seller about shop registration initiation and OTP via Email
    await EmailService.sendShopRegistrationInitiation(shop, otp);

    // // 🔔 Real-time Notification (Seller)
    // await sendNotification(userId, {
    //   title: "Shop Registration Initiated",
    //   message: `Your shop registration has started. Please verify your phone with OTP: ${otp}`,
    //   type: "info",
    // });

    // Return the OTP for debugging or sending via SMS (this should be abstracted in production)
    return { shop, otp };
  }

  // 1️⃣ Step: Verify OTP (Separate API)
  static async verifyOtpForShop(shopId, otp) {
    const shop = await Shop.findById(shopId);
    if (!shop) throw new AppError("Shop not found.", 404);

    const { phoneOtp, phoneOtpExpiration, isPhoneVerified } = shop.contactInfo;

    // ✅ Ensure OTP exists and is not already verified
    if (!phoneOtp) {
      throw new AppError("OTP not found. Please request a new one.", 400);
    }
    if (isPhoneVerified) {
      throw new AppError("Phone number is already verified.", 400);
    }

    // ✅ Convert expiration time to timestamp and compare
    const expirationTime = new Date(phoneOtpExpiration).getTime();
    const currentTime = Date.now();

    console.log("🔍 OTP Expiration:", expirationTime);
    console.log("⏳ Current Time:", currentTime);

    if (!phoneOtpExpiration || expirationTime < currentTime) {
      throw new AppError("OTP has expired. Request a new one.", 400);
    }

    // ✅ Prevent brute-force attacks (limit OTP attempts)
    if (shop.otpAttempts >= 5) {
      throw new AppError("Too many failed attempts. Try again later.", 429);
    }

    // ✅ Verify OTP (compare hashed OTP)
    const isMatch = await bcrypt.compare(otp, phoneOtp);
    if (!isMatch) {
      shop.otpAttempts += 1;
      await shop.save();
      throw new AppError("Invalid OTP. Please try again.", 400);
    }

    // ✅ Mark phone as verified and clear OTP fields
    shop.contactInfo.isPhoneVerified = true;
    shop.contactInfo.phoneOtp = undefined;
    shop.contactInfo.phoneOtpExpiration = undefined;
    shop.otpAttempts = 0; // Reset attempts after success

    await shop.save();

    return { success: true, message: "OTP verified successfully!" };
  }

  // 🏪 2️⃣ Step: Update Shop Profile (After OTP Verification)
  static async updateShopProfile(
    shopId,
    userId,
    { address, bankDetails, contactInfo, shopDetails, workingHours }
  ) {
    // ✅ 1️⃣ Ensure Shop Exists and User Owns It
    const shop = await Shop.findOne({ _id: shopId, owner: userId });
    if (!shop) {
      throw new AppError("Shop not found or unauthorized access.", 404);
    }

    // ✅ 2️⃣ Ensure OTP is Verified Before Updating Profile
    if (!shop.contactInfo.isPhoneVerified) {
      throw new AppError(
        "Phone verification required before updating profile.",
        403
      );
    }

    // ✅ 3️⃣ Start Transaction to Prevent Data Corruption
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      // ✅ 4️⃣ Update Shop Details
      if (shopDetails) {
        const { businessName, description, banner, logo } = shopDetails;
        if (businessName) shop.businessName = businessName;
        if (description) shop.description = description;

        // Ensure only one of `public_id` or `url` is used for images
        if (banner) validateSingleImageField(banner);
        if (logo) validateSingleImageField(logo);

        shop.banner = banner || shop.banner;
        shop.logo = logo || shop.logo;
      }

      // ✅ 5️⃣ Update Address (Embedded)
      if (address) {
        shop.address = { ...shop.address, ...address };
      }

      // ✅ 6️⃣ Update Bank Details (Separate Collection)
      if (bankDetails) {
        const existingBankDetails = await BankDetails.findOne({
          shop: shopId,
        }).session(session);
        if (existingBankDetails) {
          Object.assign(existingBankDetails, bankDetails);
          await existingBankDetails.save({ session });
        } else {
          const newBankDetails = await BankDetails.create(
            [{ ...bankDetails, shop: shopId }],
            { session }
          );
          shop.bankDetails = newBankDetails[0]._id;
        }
      }

      // ✅ 7️⃣ Update Contact Information
      if (contactInfo) {
        const { phone, email, whatsapp, socialMediaLinks } = contactInfo;

        if (phone) shop.contactInfo.phone = phone;
        if (email) shop.contactInfo.email = email;
        if (whatsapp) shop.contactInfo.whatsapp = whatsapp;

        // Validate social media links
        if (socialMediaLinks) validateSocialMediaLinks(socialMediaLinks);
        shop.contactInfo.socialMediaLinks =
          socialMediaLinks || shop.contactInfo.socialMediaLinks;
      }

      // ✅ 8️⃣ Update Working Hours (Embedded)
      if (workingHours) {
        shop.workingHours = workingHours;
      }

      // ✅ 9️⃣ Save Shop & Commit Transaction
      await shop.save({ session });
      await session.commitTransaction();

      return shop;
    } catch (err) {
      await session.abortTransaction();
      throw new AppError("Transaction failed: " + err.message, 500);
    } finally {
      session.endSession();
    }
  }

  /**
   * Upload and Save Verification Document
   */
  static async uploadDocument(
    userId,
    shopId,
    file,
    documentType,
    metadata = {}
  ) {
    if (!file) {
      throw new AppError("No document file uploaded.", 400);
    }

    // Verify shop ownership before proceeding
    const shop = await Shop.findOne({ _id: shopId, owner: userId });
    if (!shop) {
      throw new AppError("Shop not found or access denied.", 404);
    }

    // Utilize the helper function to handle file upload and document management
    const result = await uploadShopDocumentHelper(
      shopId,
      userId,
      file,
      documentType,
      metadata
    );

    return result;
  }

  static async submitDocuments(userId, shopId) {
    // Fetch the shop and ensure ownership
    const shop = await Shop.findOne({ _id: shopId, owner: userId }).populate(
      "owner"
    );
    if (!shop) throw new AppError("Shop not found or access denied.", 404);

    // Fetch verification document
    const verificationDocument = await VerificationDocument.findOne({
      shop: shopId,
    });
    // console.log("Found verification document:", verificationDocument);

    if (!verificationDocument) {
      throw new AppError("No verification documents found for this shop.", 400);
    }

    // Validate required document types
    const requiredTypes = ["businessDocument", "identityProof", "addressProof"];
    const missingDocs = requiredTypes.filter(
      (type) => !verificationDocument[type]?.url
    );

    if (missingDocs.length > 0) {
      throw new AppError(
        `Missing required documents: ${missingDocs.join(", ")}`,
        400
      );
    }

    // Link verification document to shop
    if (!shop.verificationDocuments.includes(verificationDocument._id)) {
      shop.verificationDocuments.push(verificationDocument._id);
      await shop.save();
    }

    // Update shop status
    shop.status = SHOP_STATUSES.SUBMITTED;
    await shop.save();

    // Notify admin
    await notifyAdmin(
      "adminDocumentSubmission",
      `📄 Shop "${shop.businessName}" Has Submitted Verification Documents for Review`,
      {
        businessName: shop.businessName,
        firstName: shop.owner?.name,
        shopId: shop._id.toString(),
        platformUrl: "https://yourplatform.com",
        supportUrl: "https://yourplatform.com/support",
      }
    );

    return {
      success: true,
      message: "Documents submitted successfully for review.",
      shop,
    };
  }

  // Admin verifies the document and activate or reject the shop
  static async adminVerifyDocuments(adminId, shopId, documentStatusUpdates) {
    // Check admin privileges
    const admin = await User.findById(adminId);
    if (!admin || admin.role !== "Admin") {
      throw new AppError("Unauthorized. Admin access required.", 403);
    }

    // Fetch the shop's verification document
    const verificationDocument = await VerificationDocument.findOne({
      shop: shopId,
    });
    if (!verificationDocument) {
      throw new AppError(
        "Verification document not found for the specified shop.",
        404
      );
    }

    // Update the status of each document type
    Object.entries(documentStatusUpdates).forEach(([docType, status]) => {
      if (!["approved", "rejected"].includes(status)) {
        throw new AppError(`Invalid status for document type: ${docType}`, 400);
      }
      if (verificationDocument[docType]) {
        verificationDocument[docType].status = status;
      }
    });

    await verificationDocument.save();

    // Check if all document types are approved
    const allApproved = [
      "businessDocument",
      "identityProof",
      "addressProof",
    ].every((type) => verificationDocument[type]?.status === "approved");

    const shop = await Shop.findById(shopId);
    if (!shop) {
      throw new AppError("Shop not found.", 404);
    }

    if (allApproved) {
      const user = await User.findById(shop.owner);

      // Update shop and user details
      shop.isVerified = true;
      shop.status = SHOP_STATUSES.ACTIVE;
      shop.isActive = true;
      await shop.save();

      user.role = "Seller";
      await user.save();

      // Send confirmation email
      // Notify the shop owner about shop verification
      await EmailService.sendShopVerificationConfirmation(shopId);

      return {
        success: true,
        message: "All documents approved. Shop activated.",
        shop,
        verificationDocument,
      };
    }

    // Real-time Notification for Admin
    // await sendNotification(admin._id.toString(), {
    //   title: `Pending Documents for Shop "${shop.businessName}"`,
    //   message: `Shop "${shop.businessName}" documents have been reviewed. Some are still pending approval.`,
    //   type: "info",
    // });

    // Notify Admin about pending documents
    await notifyAdmin(
      "adminPendingDocuments",
      `📄 Shop "${shop.businessName}" Documents Have Been Reviewed - Some Pending Approval`,
      {
        businessName: shop.businessName,
        firstName: admin.firstName,
        shopId: shop._id.toString(),
      }
    );

    return {
      success: true,
      message: "Documents reviewed. Some are still pending.",
      shop,
      verificationDocument,
    };
  }

  // A Service for Admin to Create Shop For A User
  static async createSellerAndShop(sellerDetails, shopDetails) {
    const { name, email, password, confirmPassword } = sellerDetails;
    const { businessName, description, shopType } = shopDetails;

    // 1. Check if the user or shop already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new AppError("A user with this email already exists.", 400);
    }

    const existingShop = await Shop.findOne({ businessName });
    if (existingShop) {
      throw new AppError("A shop with this business name already exists.", 400);
    }

    // 2. Create Seller (User)
    const newUser = await User.create({
      name,
      email,
      password, // Ensure password is hashed in the User schema
      confirmPassword,
      role: "Seller",
      isEmailVerified: true,
    });

    // 3. Create Shop
    const newShop = await Shop.create({
      owner: newUser._id,
      businessName,
      description,
      shopType,
      status: SHOP_STATUSES.PENDING,
      isVerified: false,
      privacyPolicyAccepted: true,
    });

    // 4. Create Address

    // 5. Send Notification Email to Seller
    //   const message = `
    //   Dear ${name},

    //   Your shop, "${businessName}", has been successfully created.
    //   Please complete the verification process to activate your shop.

    //   Regards,
    //   Admin Team
    // `;
    //   await sendEmail({
    //     email,
    //     subject: "Shop Created Successfully",
    //     message,
    //   });

    // 6. Return Result
    return {
      seller: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
      },
      shop: {
        id: newShop._id,
        businessName: newShop.businessName,
        status: newShop.status,
      },
    };
  }

  // A Service for Admin to Update Shop Details
  static async updateShopDetails(shopId, updateData, currentUser) {
    // Fetch the shop by ID
    const shop = await Shop.findById(shopId);

    if (!shop) {
      throw new AppError("Shop not found.", 404);
    }

    // Ensure the user has admin privileges
    if (currentUser.role !== "Admin") {
      throw new AppError("Only admins can update shop details.", 403);
    }

    // Filter update data to include only allowed fields
    const allowedAdminFields = [
      "businessName",
      "description",
      "status",
      "isVerified",
      "banner",
      "logo",
      "shopType",
      "returnPolicy",
      "shippingPolicy",
      "workingHours",
      "adsPurchased",
    ];
    updateData = filterObject(updateData, allowedAdminFields);

    // Prevent updating owner or other sensitive fields
    if (updateData.owner) {
      throw new AppError("Admins cannot change the shop owner.", 403);
    }

    // Dynamically handle banner and logo fields
    if (updateData.banner) {
      updateData.banner = handleImageField(updateData.banner);
    }

    if (updateData.logo) {
      updateData.logo = handleImageField(updateData.logo);
    }

    // Merge the filtered updates into the shop document
    Object.assign(shop, updateData);

    // Track the admin performing the update
    shop.lastUpdatedBy = currentUser._id;

    // Save changes to the database
    await shop.save();

    // Log the update action (for audit)
    logger.info(`Admin ${currentUser.id} updated shop ${shopId}`, {
      adminId: currentUser.id,
      shopId,
      updatedFields: Object.keys(updateData),
    });

    return shop;
  }

  // Method to fetch all shops with enhanced details
  static async getAllShops(queryString) {
    const query = Shop.find({ isVerified: true, isActive: true })
      .select([
        "businessName",
        "description",
        "shopType",
        "contactInfo.phone",
        "contactInfo.email",
        "contactInfo.whatsapp",
        "contactInfo.socialMediaLinks",
        "workingHours",
      ])
      .populate("logo banner", "fileUrl")
      .populate("owner", "name profilePicture")
      .lean();

    const apiFeatures = new ApiFeatures(query, queryString)
      .search(["businessName"])
      .filter()
      .sort("-createdAt")
      .limitFields();

    await apiFeatures.pagination(10);

    const shops = (await apiFeatures.query).map((shop) => ({
      ...shop,
      id: shop._id.toString(),
    }));

    if (!shops.length) {
      throw new AppError("No shops found.", 404);
    }

    const shopIds = shops.map((shop) => shop.id);

    const addresses = await Address.find({
      owner: { $in: shopIds },
      ownerType: "Shop",
    }).select(
      "type addressLine1 city state postalCode country isPrimary phoneNumber owner ownerType"
    );

    const enrichedShops = shops.map((shop) => {
      const matchedAddresses = addresses.filter((addr) => {
        return (
          addr.ownerType === "Shop" &&
          addr.owner?.toString() === shop._id?.toString()
        );
      });

      return {
        ...shop,
        addresses: matchedAddresses,
      };
    });

    return {
      shops: enrichedShops,
      paginationMetadata: apiFeatures.paginationMetadata,
    };
  }

  static async getAllSellerShops(user) {
    // Determine if the user is an admin
    const isAdmin = user.role === "Admin";

    // Query filter: Admins see all shops; Sellers see only their own shops
    const queryFilter = isAdmin ? {} : { owner: user._id };

    // Fetch shops based on the user's role
    const shops = await Shop.find(queryFilter)
      .populate({
        path: "materials",
        select: "title price description stock isPublished ratings",
        match: user?.role === "Seller" ? { isPublished: true } : {}, // Sellers only see published materials
      })
      .populate("logo banner", "fileUrl") // Populate shop logos and banners
      .lean(); // Convert to plain JavaScript objects

    // If no shops are found, throw an error
    if (!shops || shops.length === 0) {
      throw new AppError("No shops found.", 404);
    }

    // Extract shop IDs for address lookup
    const shopIds = shops.map((shop) => shop._id);

    // Fetch addresses for the retrieved shops
    const addresses = await Address.find({
      owner: { $in: shopIds },
      ownerType: "Shop", // Only fetch addresses for shops
    })
      .select(
        "type addressLine1 city state postalCode country isPrimary phoneNumber owner"
      ) // Select relevant fields
      .lean();

    // Map addresses to their corresponding shops
    const enrichedShops = shops.map((shop) => {
      // Filter addresses belonging to the current shop
      const shopAddresses = addresses.filter(
        (addr) => addr.owner?.toString() === shop._id.toString()
      );

      if (isAdmin) {
        // Admin gets detailed shop information, including sensitive data
        return {
          ...shop,
          owner: shop.owner, // Include owner details
          verificationDocuments: shop.verificationDocuments, // Attach verification docs
          bankDetails: shop.bankDetails, // Include bank details
          financials: {
            totalRevenue: shop.totalRevenue, // Total shop revenue
            availableBalance: shop.availableBalance, // Available balance
            returnRate: shop.returnRate, // Return rate percentage
          },
          adsPurchased: shop.adsPurchased, // List of purchased ads
          verification: {
            isVerified: shop.isVerified, // Verification status
            status: shop.status, // Verification status details
          },
          addresses: shopAddresses, // Attach address data
        };
      } else {
        // Sellers only get relevant shop details
        return {
          ...shop,
          contactInfo: shop.contactInfo, // Shop contact information
          workingHours: shop.workingHours, // Shop working hours
          financials: {
            totalRevenue: shop.totalRevenue, // Total revenue
            availableBalance: shop.availableBalance, // Available balance
          },
          verification: {
            isVerified: shop.isVerified, // Verification status
            status: shop.status, // Verification status details
          },
          addresses: shopAddresses, // Attach address data
        };
      }
    });

    // Return the enriched list of shops
    return enrichedShops;
  }

  static async getUnifiedShopDetails(shopId, user = null, query = {}) {
    if (!shopId) throw new AppError("Shop ID is required", 400);

    // Fetch base shop info
    const shop = await Shop.findById(shopId)
      .populate("calculatedFollowerCount")
      .populate("logo banner", "fileUrl")
      .populate("owner", "name email profilePicture role bio");

    if (!shop) throw new AppError("No shop found with this ID", 404);

    // Determine role for filtering
    const role = user?.role || "Public";
    const userId = user?.id || null;

    // Pull in filtered materials (published for public, conditional for roles)
    const { materials, metadata } =
      await AcademicMaterialService.getMaterialsByShop({
        shopId,
        query,
        userRole: role,
        userId,
      });

    // Base shop info
    const contactInfo = shop.getContactInfo?.();
    const workingHours = shop.getWorkingHours?.();
    const sellerDetails = await shop.getSellerDetails?.();

    const response = {
      shop: {
        id: shop._id,
        name: shop.businessName,
        description: shop.description,
        logo: shop.logo?.fileUrl || null,
        banner: shop.banner?.fileUrl || null,
        contactInfo,
        workingHours,
        storedFollowerCount: shop.followerCount,
        realTimeFollowerCount: shop.calculatedFollowerCount,
        totalMaterials: materials.length,
        // materials,
        // metadata,
      },
      owner: {
        id: shop.owner?._id,
        name: shop.owner?.name,
        profilePicture: shop.owner?.profilePicture || null,
      },
    };

    // Role-based enrichment
    if (user) {
      switch (role) {
        case "User":
          response.shop = {
            ...response.shop,
            returnPolicy: shop.returnPolicy,
            shippingPolicy: shop.shippingPolicy,
            ...(await getBuyerSpecificDetails(shop)),
          };
          break;

        case "Seller":
          response.shop = {
            ...response.shop,
            totalSales: shop.totalSales,
            itemsSold: shop.itemsSold,
            returnRate: shop.returnRate,
            availableBalance: shop.availableBalance,
            totalRevenue: shop.totalRevenue,
            isVerified: shop.isVerified,
            isActive: shop.isActive,
            sellerDetails,
            ...(await getSellerSpecificDetails(shop)),
          };
          break;

        case "Admin":
          response.shop = {
            ...response.shop,
            totalSales: shop.totalSales,
            totalRevenue: shop.totalRevenue,
            returnRate: shop.returnRate,
            isVerified: shop.isVerified,
            isActive: shop.isActive,
            status: shop.status,
            verificationDocuments: shop.verificationDocuments,
            primaryBankDetails: sellerDetails?.primaryBankDetails,
            lastUpdatedBy: shop.lastUpdatedBy,
            ...(await getAdminSpecificDetails(shop)),
          };
          break;
      }
    }

    return response;
  }

  /**
   * Fetch public shop details (no authentication required).
   */
  // static async getPublicShopDetails(shopId, query = {}) {
  //   if (!shopId) throw new AppError('Shop ID is required', 400);

  //   // Fetch shop with enriched details
  //   const shop = await Shop.findById(shopId)
  //     .populate('calculatedFollowerCount')
  //     .populate('logo banner', 'fileUrl')
  //     .populate('owner', 'name profilePicture');

  //   if (!shop) throw new AppError('No shop found with this ID', 404);

  //   // Pull in filtered, paginated materials (reuse logic)
  //   const { materials, metadata } =
  //     await AcademicMaterialService.getMaterialsByShop({
  //       shopId,
  //       query,
  //       userRole: 'Public', // Treat as public view
  //       userId: null,
  //     });

  //   const contactInfo = shop.getContactInfo?.();
  //   const workingHours = shop.getWorkingHours?.();

  //   return {
  //     shop: {
  //       id: shop._id,
  //       name: shop.businessName,
  //       description: shop.description,
  //       logo: shop.logo?.fileUrl || null,
  //       banner: shop.banner?.fileUrl || null,
  //       contactInfo,
  //       workingHours,
  //       storedFollowerCount: shop.followerCount,
  //       realTimeFollowerCount: shop.calculatedFollowerCount,
  //       totalMaterials: materials.length,
  //       materials,
  //       metadata,
  //     },
  //     owner: {
  //       id: shop.owner?._id,
  //       name: shop.owner?.name,
  //       profilePicture: shop.owner?.profilePicture || null,
  //     },
  //   };
  // }

  // static async getPublicShopDetailsById(shopId) {
  //   const shop = await Shop.findById(shopId)
  //     .populate("calculatedFollowerCount")
  //     .populate({
  //       path: "materials",
  //       select:
  //         "title slug summary description price discount thumbnail rating numReviews categories publisher publicationDate deliveryFormat materialType isPublished",
  //       match: { isPublished: true }, // Only published materials are shown
  //     })
  //     .populate("logo banner", "fileUrl")
  //     .populate("owner", "name profilePicture");

  //   if (!shop) throw new AppError("No shop found with this ID", 404);

  //   // Fetch contact info from the embedded document
  //   const contactInfo = shop.getContactInfo();

  //   // Fetch working hours from the embedded document
  //   const workingHours = shop.getWorkingHours();

  //   return {
  //     shop: {
  //       id: shop._id,
  //       name: shop.businessName,
  //       description: shop.description,
  //       materials: shop.materials,
  //       logo: shop.logo?.fileUrl || null,
  //       banner: shop.banner?.fileUrl || null,
  //       contactInfo,
  //       workingHours,
  //       storedFollowerCount: shop.followerCount,
  //       realTimeFollowerCount: shop.calculatedFollowerCount,
  //     },
  //     owner: {
  //       id: shop.owner?._id,
  //       name: shop.owner?.name,
  //       profilePicture: shop.owner?.profilePicture || null,
  //     },
  //   };
  // }

  /**
   * Fetch role-based shop details (requires authentication).
   */
  // static async getShopDetailsById(shopId, user) {
  //   const shop = await Shop.findById(shopId)
  //     .populate({
  //       path: 'materials',
  //       select:
  //         'title slug price discount rating numReviews categories isPublished',
  //       match: user?.role !== 'Admin' ? { isPublished: true } : {},
  //     })
  //     .populate('logo banner', 'fileUrl')
  //     .populate('owner', 'name email profilePicture role');

  //   if (!shop) throw new AppError('No shop found with this ID', 404);

  //   const [contactInfo, workingHours, sellerDetails] = await Promise.all([
  //     shop.getContactInfo(),
  //     shop.getWorkingHours(),
  //     shop.getSellerDetails(),
  //   ]);

  //   const responseData = {
  //     shop: {
  //       id: shop._id,
  //       name: shop.businessName,
  //       description: shop.description,
  //       materials: shop.materials,
  //       logo: shop.logo?.fileUrl || null,
  //       banner: shop.banner?.fileUrl || null,
  //       contactInfo,
  //       workingHours,
  //     },
  //     owner: {
  //       id: shop.owner?._id,
  //       name: shop.owner?.name,
  //       profilePicture: shop.owner?.profilePicture || null,
  //     },
  //   };

  //   // Role-based filtering
  //   switch (user?.role) {
  //     case 'User':
  //       responseData.shop = {
  //         ...responseData.shop,
  //         totalMaterials: shop.totalMaterials,
  //         returnPolicy: shop.returnPolicy,
  //         shippingPolicy: shop.shippingPolicy,
  //         ...(await getBuyerSpecificDetails(shop)),
  //       };
  //       break;

  //     case 'Seller':
  //       responseData.shop = {
  //         ...responseData.shop,
  //         totalSales: shop.totalSales,
  //         itemsSold: shop.itemsSold,
  //         returnRate: shop.returnRate,
  //         availableBalance: shop.availableBalance,
  //         totalRevenue: shop.totalRevenue,
  //         isVerified: shop.isVerified,
  //         isActive: shop.isActive,
  //         sellerDetails,
  //         ...(await getSellerSpecificDetails(shop)),
  //       };
  //       break;

  //     case 'Admin':
  //       responseData.shop = {
  //         ...responseData.shop,
  //         totalSales: shop.totalSales,
  //         totalRevenue: shop.totalRevenue,
  //         returnRate: shop.returnRate,
  //         isVerified: shop.isVerified,
  //         isActive: shop.isActive,
  //         status: shop.status,
  //         verificationDocuments: shop.verificationDocuments,
  //         primaryBankDetails: sellerDetails.primaryBankDetails,
  //         lastUpdatedBy: shop.lastUpdatedBy,
  //         ...(await getAdminSpecificDetails(shop)),
  //       };
  //       break;
  //   }

  //   return responseData;
  // }

  // Service to Get top sellers based on sales volume and average rating
  static async getTopSellers() {
    const shops = await Shop.find()
      .populate({
        path: "materials",
        select: "salesCount",
      })
      .populate("owner", "name email profilePicture role bio"); // ⬅ removed `.lean()`

    if (!shops || shops.length === 0) {
      throw new AppError("No shops found in the system.", 404);
    }

    const shopPerformance = await Promise.all(
      shops.map(async (shop) => {
        const metrics = await shop.getShopPerformanceMetrics(); // now it works
        return {
          shopId: shop._id,
          shopName: shop.businessName,
          owner: {
            id: shop.owner?._id,
            name: shop.owner?.name,
            email: shop.owner?.email,
            profilePicture: shop.owner?.profilePicture,
            role: shop.owner?.role,
            bio: shop.owner?.bio,
          },
          totalSales: metrics.totalSales,
          totalTransactions: metrics.totalTransactions,
          followerCount: metrics.followerCount,
          affiliateSalesCount: metrics.affiliateSalesCount,
          averageRating: metrics.averageRating,
        };
      })
    );

    const sortedShops = shopPerformance
      .sort(
        (a, b) =>
          b.totalSales - a.totalSales || b.averageRating - a.averageRating
      )
      .slice(0, 10);

    return sortedShops;
  }
}

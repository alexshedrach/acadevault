import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { WorkingHours } from "./WorkingHoursModel.js";
import { ContactInfo } from "./ContactInfoModel.js";
import { SHOP_STATUSES, SHOP_TYPES } from '../../constants/enums.js';
import AppError from "../../utils/HandleAppErrors.js";
import { logger } from "../../utils/logger.js";
import ApiFeatures from "../../utils/ApiFeatures.js";
import BankDetails from "./BankDetails.js";
import calculateCommission from "../../utils/calculateCommission.js";
import { generateOTP } from "../../utils/commonUtils.js";
import { formatPhoneNumber } from "../../utils/phoneUtils.js";
import Follow from "./FollowModel.js";
import Transaction from "./TransactionModel.js";
import Affiliate from "./AffiliateModel.js";
import Review from "./ReviewModel.js";

// Schema setup
const { Schema, model } = mongoose;
const { ObjectId } = Schema;

// Shop Schema Definition
const shopSchema = new Schema(
  {
    // Ownership and Basic Details
    owner: {
      type: ObjectId,
      ref: "User",
      required: true,
      index: true, // Index for faster lookups
    },
    businessName: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      minlength: [3, "Shop name must be at least 3 characters long"],
      maxlength: [50, "Shop name cannot be longer than 50 characters"],
    },
    description: {
      type: String,
      minlength: [10, "Description must be at least 10 characters long"],
      maxlength: [500, "Description cannot exceed 500 characters"],
      trim: true,
    },
    // Contact Information
    // // Embedded contactInfo schema
    contactInfo: {
      type: ContactInfo,
      default: {
        phone: null,
        email: null,
        whatsapp: null,
        socialMediaLinks: [],
      },
    },
    // // Status and Verification
    status: {
      type: String,
      enum: Object.values(SHOP_STATUSES),
      default: SHOP_STATUSES.PENDING,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: false,
    },
    verificationDocuments: {
      type: [ObjectId],
      ref: "VerificationDocument",
    },
    // Shop Appearance (logo, banner)
    logo: {
      type: ObjectId,
      ref: "File", // Assuming the file is stored in the 'File' collection
    },
    banner: {
      type: ObjectId,
      ref: "File", // Same as above
    },

    shopType: {
      type: String,
      enum: {
        values: Object.values(SHOP_TYPES),
        message: "{VALUE} is not a valid shop type.",
      },
      required: [true, "Shop type is required."],
    },
    // Financial Details
    availableBalance: {
      type: Number,
      default: 0.0,
      min: [0, "Available balance cannot be negative"],
    },
    totalRevenue: {
      type: Number,
      default: 0,
    },
    // Shop Policies (return, shipping)
    returnPolicy: {
      type: String,
      maxlength: [2000, "Return policy cannot exceed 2000 characters"],
    },
    shippingPolicy: {
      type: String,
      maxlength: [2000, "Shipping policy cannot exceed 2000 characters"],
    },
    // Performance Metrics (sales, items sold, etc.)
    totalSales: {
      type: Number,
      default: 0,
      min: [0, "Total sales cannot be negative"],
    },
    itemsSold: {
      type: Number,
      default: 0,
    },
    returnRate: {
      type: Number,
      default: 0,
    },
    // Products (number of products)
    totalMaterials: {
      type: Number,
      default: 0,
    },

    followerCount: {
      type: Number,
      default: 0,
    },

    // Shop Operational Data (working hours, last active)
    workingHours: {
      type: [WorkingHours],
      validate: {
        validator: function (v) {
          const days = v.map((item) => item.day);
          return new Set(days).size === days.length;
        },
        message: "Duplicate days found in working hours.",
      },
    }, // Embedded workingHours schema
    lastActive: {
      type: Date,
      default: Date.now,
    },
    // Advertisements (ads purchased)
    adsPurchased: {
      type: [ObjectId],
      ref: "Advertisement",
    },
    privacyPolicyAccepted: {
      type: Boolean,
      required: [true, "Privacy policy acceptance is mandatory."],
      validate: {
        validator: (value) => value === true,
        message: "Privacy policy must be accepted.",
      },
      default: false,
    },
    lastUpdatedBy: {
      type: ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true, // Automatically manage createdAt and updatedAt
    toJSON: { virtuals: true }, // Include virtual fields in JSON response
    toObject: { virtuals: true },
  }
);

// Indexes for performance (scalability)
shopSchema.index({ status: 1, owner: 1 });
shopSchema.index({ businessName: 1, isActive: 1 });
shopSchema.index({ "location.coordinates": "2dsphere" }); // Geospatial index for location search

// Virtual Fields
// Link Transactions
shopSchema.virtual("transactions", {
  ref: "Transaction",
  localField: "_id",
  foreignField: "shop",
});

// Link Materials
shopSchema.virtual("materials", {
  ref: "AcademicMaterial",
  localField: "_id",
  foreignField: "shop",
});

// Link affiliate sales
shopSchema.virtual("affiliateSales", {
  ref: "Affiliate",
  localField: "_id",
  foreignField: "shop",
});

// Bank details for the shop (could be linked to another model like 'BankDetails')
shopSchema.virtual("bankDetails", {
  ref: "BankDetails", // Reference the BankDetails model
  localField: "_id", // Field in the Shop model
  foreignField: "shop", // Field in the BankDetails model
  justOne: false, // If you expect multiple bank details
});

shopSchema.virtual("ownerDetails", {
  ref: "User",
  localField: "owner",
  foreignField: "_id",
  justOne: true,
});

// Virtual field to count followers from the Follow Model
shopSchema.virtual("calculatedFollowerCount", {
  ref: "Follow",
  localField: "_id",
  foreignField: "following",
  count: true, // Only get the count
  match: { followingType: "Shop", status: "Accepted" }, // Match accepted relationships
});

// Ratings virtual field (computes average rating from reviews)
shopSchema.virtual("ratings").get(async function () {
  const Review = mongoose.model("Review");
  const reviews = await Review.find({ shop: this._id });
  const totalRatings = reviews.length;
  const averageRating =
    totalRatings > 0
      ? reviews.reduce((sum, r) => sum + r.rating, 0) / totalRatings
      : 0;
  return { totalRatings, averageRating };
});

/**
 * Middleware
 */

shopSchema.pre("save", async function (next) {
  // trim strings before saving
  if (this.isModified("businessName")) {
    this.businessName = this.businessName.trim();
  }

  // Throw error if privacy policy isn't accepted
  if (!this.privacyPolicyAccepted) {
    return next(new AppError("Privacy policy must be accepted.", 400));
  }

  next();
});

// Middleware to clean up related data after shop deletion
shopSchema.post("remove", async function (doc, next) {
  try {
    const Follow = mongoose.model("Follow");
    const Transaction = mongoose.model("Transaction");
    const AcademicMaterial = mongoose.model("AcademicMaterial");
    const AffiliateSale = mongoose.model("Affiliate");
    const Review = mongoose.model("Review");
    const Advertisement = mongoose.model("Advertisement");

    // Remove followers related to this shop
    await Follow.deleteMany({ following: doc._id, followingType: "Shop" });

    // Remove transactions related to this shop
    await Transaction.deleteMany({ shop: doc._id });

    // Remove academic materials associated with this shop
    await AcademicMaterial.deleteMany({ shop: doc._id });

    // Remove affiliate sales linked to this shop
    await AffiliateSale.deleteMany({ shop: doc._id });

    // Remove reviews associated with this shop
    await Review.deleteMany({ shop: doc._id });

    // Remove advertisements purchased by this shop
    await Advertisement.deleteMany({ shop: doc._id });

    // Remove any bank details tied to this shop
    await BankDetails.deleteMany({ shop: doc._id });

    logger.log(`All related data for Shop ${doc._id} has been deleted.`);
    next();
  } catch (error) {
    // Log error and pass to the global error handler
    logger.error("Error during related data cleanup:", error);

    const appError = new AppError(
      `Failed to delete related data for shop ID: ${doc._id}`,
      500,
      true,
      "Data Cleanup",
      { shopId: doc._id, error: error.message }
    );

    next(appError);
  }
});

/**
 * Instance Methods
 */

// Generate and set phone OTP
shopSchema.methods.generatePhoneOtp = async function () {
  const otp = generateOTP(); // Generate a 6-digit OTP
  const salt = await bcrypt.genSalt(10);
  const hashedOtp = await bcrypt.hash(otp, salt);

  this.contactInfo.phoneOtp = hashedOtp;
  this.contactInfo.phoneOtpExpiration = Date.now() + 20 * 60 * 1000; // OTP valid for 5 minutes

  return otp; // Return plaintext OTP for sending via SMS
};

// Verify phone OTP
shopSchema.methods.verifyPhoneOtp = async function (otp) {
  if (Date.now() > this.contactInfo.phoneOtpExpiration) {
    throw AppError.validationError("OTP has expired.");
  }

  const isMatch = await bcrypt.compare(otp, this.contactInfo.phoneOtp);
  if (!isMatch) {
    throw AppError.validationError("Invalid OTP. Please try again.");
  }

  this.contactInfo.isPhoneVerified = true;
  this.contactInfo.phoneOtp = undefined; // Clear OTP after successful verification
  this.contactInfo.phoneOtpExpiration = undefined;

  await this.save(); // Save the changes
};

shopSchema.methods.deactivate = async function () {
  if (!this.isActive) {
    throw AppError.conflict("The shop is already deactivated.");
  }

  this.isActive = false;

  await this.save();
  logger.log(`Shop with ID ${this._id} has been deactivated.`);
};

// Method to get the seller's details (including bank details, contact info, etc.)
shopSchema.methods.getSellerDetails = async function () {
  try {
    // Get the owner's details (assuming the User model exists and is linked to shop)
    const ownerDetails = await mongoose.models.User.findById(this.owner);

    if (!ownerDetails) {
      throw new AppError("Shop owner not found.", 404);
    }

    // Fetch the primary bank details for the shop
    const primaryBankDetails = await mongoose.models.BankDetails.findOne({
      shop: this._id,
      isPrimary: true,
    });

    // Get the shop's contact info
    const contactInfo = this.contactInfo;

    return {
      ownerDetails,
      primaryBankDetails,
      contactInfo,
    };
  } catch (error) {
    logger.error(`Error getting seller details for shop ${this._id}:`, error);
    throw new AppError("Error fetching seller details.", 500);
  }
};

shopSchema.methods.markAllDaysClosed = function () {
  this.workingHours.forEach((item) => {
    item.isClosed = true;
    item.open = "00:00";
    item.close = "00:00";
  });
};

// Method to get contact information
shopSchema.methods.getContactInfo = function () {
  if (!this.contactInfo) {
    return {
      phone: "Not provided",
      email: "Not provided",
      whatsapp: "No whatsapp provided",
    };
  }

  const { phone, email, whatsapp, socialMediaLinks } = this.contactInfo;

  return {
    phone: phone ? formatPhoneNumber(phone) : "Not provided",
    email: email || "Not provided",
    whatsapp: whatsapp ? formatPhoneNumber(whatsapp) : "Not provided",
    socialMediaLinks: socialMediaLinks || [],
  };
};

shopSchema.methods.getWorkingHours = function () {
  if (!this.workingHours || this.workingHours.length === 0) {
    return [
      {
        day: "No hours available",
        open: "N/A",
        close: "N/A",
      },
    ];
  }

  return this.workingHours.map(({ day, open, close, isClosed }) => ({
    day: day || "Unknown day",
    open: isClosed ? "Closed" : open || "N/A",
    close: isClosed ? "Closed" : close || "N/A",
  }));
};

// Method to get the primary bank account
shopSchema.methods.getPrimaryBankAccount = async function () {
  const primaryAccount = await BankDetails.findOne({
    shop: this._id,
    isPrimary: true,
  });
  if (!primaryAccount) {
    throw new Error("No primary bank account found for this shop.");
  }
  return primaryAccount;
};

// Method to set a bank account as primary
shopSchema.methods.setPrimaryBankAccount = async function (bankDetailsId) {
  // Unset existing primary accounts for this shop
  await BankDetails.updateMany(
    { shop: this._id, isPrimary: true },
    { isPrimary: false }
  );

  // Set the specified account as primary
  const updatedAccount = await BankDetails.findOneAndUpdate(
    { _id: bankDetailsId, shop: this._id },
    { isPrimary: true },
    { new: true }
  );

  if (!updatedAccount) {
    throw new Error(
      "Failed to set primary bank account. Ensure the account exists and belongs to this shop."
    );
  }

  return updatedAccount;
};

// Handling the business logic of recording sales and updating the financial status of the shop
shopSchema.methods.recordEarnings = async function (saleAmount) {
  if (saleAmount <= 0) {
    throw new Error("Sale amount must be positive.");
  }

  const commissionRate = 0.1; // Example: 10% commission
  const commission = calculateCommission(saleAmount, commissionRate);
  const earnings = saleAmount - commission;

  this.totalSales += saleAmount;
  this.availableBalance += earnings;

  await this.save();

  await mongoose.model("Transaction").create({
    shop: this._id,
    type: "sale",
    amount: saleAmount,
    earnings,
    commission,
    status: "completed",
    date: new Date(),
  });

  // await this.notifySeller(
  //   `You earned ${earnings} from a sale. Total sales: ${this.totalSales}, Available balance: ${this.availableBalance}.`
  // );
};

// Method to calculate the total sales for the shop
shopSchema.methods.calculateTotalSales = async function () {
  try {
    const totalSales = await Transaction.aggregate([
      {
        $match: { shop: this._id, status: "completed" }, // Only completed transactions
      },
      {
        $group: {
          _id: null,
          totalSales: { $sum: "$amount" }, // Sum of all completed transaction amounts
        },
      },
    ]);

    return totalSales.length > 0 ? totalSales[0].totalSales : 0;
  } catch (error) {
    logger.error(`Error calculating total sales for shop ${this._id}:`, error);
    throw new AppError("Error calculating total sales.", 500);
  }
};

// Method to get all transactions for a specific shop
// Retrieving and managing transaction data, including historical records.
shopSchema.methods.getTransactions = async function (queryString = {}) {
  try {
    const query = Transaction.find({ shop: this._id });

    // Ensure queryString is always an object
    const apiFeatures = new ApiFeatures(query, queryString || {})
      .search(["status", "amount", "paymentMethod"]) // Now safe
      .filter()
      .sort()
      .limitFields();

    await apiFeatures.pagination(10);

    const transactions = await apiFeatures.query;

    // if (!transactions || transactions.length === 0) {
    //   throw new AppError("No transactions found for the shop.", 404);
    // }
    // ✅ Return an empty array instead of throwing an error
    return {
      transactions: transactions || [],
      paginationMetadata: apiFeatures.paginationMetadata,
    };
  } catch (error) {
    logger.error(error);
    throw new AppError(
      "Error fetching transactions.",
      500,
      true,
      "Transaction"
    );
  }
};

// Method to get shop performance metrics (Total Sales, Number of Transactions, Follower Count, Average Rating)
shopSchema.methods.getShopPerformanceMetrics = async function () {
  try {
    // Calculate Total Sales
    const totalSales = await this.calculateTotalSales();

    // Get the number of transactions (completed)
    const totalTransactions = await Transaction.countDocuments({
      shop: this._id,
      status: "completed",
    });

    // Get follower count
    const followerCount = await Follow.countDocuments({
      following: this._id,
      followingType: "Shop",
      status: "Accepted",
    });

    // Get the number of affiliate sales
    const affiliateSalesCount = await Affiliate.countDocuments({
      shop: this._id,
      status: "completed", // assuming affiliate sales have a status field
    });

    // Get the average rating from reviews (virtual field from the Review model)
    const reviews = await Review.find({ shop: this._id });
    const totalReviews = reviews.length;
    let averageRating = 0;

    if (totalReviews > 0) {
      const totalRating = reviews.reduce(
        (acc, review) => acc + review.rating,
        0
      );
      averageRating = totalRating / totalReviews;
    }

    return {
      totalSales,
      totalTransactions,
      followerCount,
      affiliateSalesCount,
      averageRating,
    };
  } catch (error) {
    logger.error(
      `Error getting performance metrics for shop ${this._id}:`,
      error
    );
    throw new AppError("Error fetching shop performance metrics.", 500);
  }
};

/**
 * Static Methods
 */
// Fetch all active shops
shopSchema.statics.getActiveShops = async function (query = {}, options = {}) {
  const apiFeatures = new ApiFeatures(
    this.find({ isActive: true, ...query }),
    options
  )
    .filter()
    .sort()
    .limitFields()
    .pagination(options.perPage || 10);

  return {
    shops: await apiFeatures.query.lean(),
    pagination: apiFeatures.paginationMetadata,
  };
};

shopSchema.statics.getShopsByTotalRevenue = async function (
  minRevenue,
  maxRevenue
) {
  return this.aggregate([
    { $match: { totalRevenue: { $gte: minRevenue, $lte: maxRevenue } } },
    { $project: { businessName: 1, totalRevenue: 1, status: 1 } },
    { $sort: { totalRevenue: -1 } },
  ]);
};

// Search shops by name or description
shopSchema.statics.searchShops = async function (query, options = {}) {
  const apiFeatures = new ApiFeatures(this.find(), query)
    .search(["businessName", "description"]) // Apply search to `businessName` and `description`
    .filter() // Apply any additional filters (e.g., by `status`, `location`, etc.)
    .sort() // Apply sorting based on `sort` parameter
    .limitFields(); // Apply field limiting (optional)

  // Pagination applied within ApiFeatures
  await apiFeatures.pagination(options.perPage || 10);

  return {
    shops: await apiFeatures.query.lean(), // Returning the results as plain objects for performance
    pagination: apiFeatures.paginationMetadata,
  };
};

// Get active shops
shopSchema.statics.getActiveShops = async function (options = {}) {
  const apiFeatures = new ApiFeatures(this.find({ isActive: true }), options)
    .filter() // Apply any filters, for example, by `status` or `owner`
    .sort() // Sorting logic
    .limitFields(); // Field limiting based on `fields` query param

  // Apply pagination
  await apiFeatures.pagination(options.perPage || 10);

  return {
    shops: await apiFeatures.query.lean(), // Lean to return plain JavaScript objects
    pagination: apiFeatures.paginationMetadata,
  };
};

// Get top shops based on follower count
shopSchema.statics.getTopShops = async function (
  criteria = "followers",
  limit = 10
) {
  try {
    // Validate limit
    if (typeof limit !== "number" || limit <= 0) {
      throw AppError.validationError("Limit must be a positive number.");
    }

    // Define aggregation pipeline
    const pipeline = [];

    if (criteria === "followers") {
      pipeline.push(
        // Match only accepted follows of type "Shop"
        {
          $match: {
            followingType: "Shop",
            status: "Accepted",
          },
        },
        // Group by shop ID and count followers
        {
          $group: {
            _id: "$following",
            count: { $sum: 1 },
          },
        },
        // Sort shops by follower count in descending order
        { $sort: { count: -1 } },
        // Limit the results to the specified number
        { $limit: limit }
      );
    } else if (criteria === "ratings") {
      pipeline.push(
        // Group reviews by shop ID
        {
          $group: {
            _id: "$shop",
            count: { $sum: 1 },
            avgRating: { $avg: "$rating" },
          },
        },
        // Sort by average rating and then by total ratings count
        { $sort: { avgRating: -1, count: -1 } },
        // Limit the results to the specified number
        { $limit: limit }
      );
    } else {
      throw AppError.validationError(
        `Invalid criteria "${criteria}". Use "followers" or "ratings".`
      );
    }

    // Join shop details into the pipeline
    pipeline.push(
      {
        $lookup: {
          from: "shops", // Join with the shops collection
          localField: "_id",
          foreignField: "_id",
          as: "shopDetails",
        },
      },
      { $unwind: "$shopDetails" }, // Unwind the resulting shopDetails array
      {
        $project: {
          _id: "$shopDetails._id",
          businessName: "$shopDetails.businessName",
          logo: "$shopDetails.logo",
          description: "$shopDetails.description",
          count: 1,
          avgRating: 1,
        },
      }
    );

    // Determine the collection to query
    const collectionName = criteria === "followers" ? "Follow" : "Review";

    // Execute the aggregation pipeline
    const results = await mongoose.model(collectionName).aggregate(pipeline);

    return results;
  } catch (error) {
    logger.error("Error fetching top shops:", error);
    throw AppError.internalServerError(
      "Could not fetch top shops. Please try again later."
    );
  }
};

const Shop = model("Shop", shopSchema);
export default Shop;

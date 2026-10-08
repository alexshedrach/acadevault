import crypto from "crypto";
import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import {
  ACCOUNT_STATUSES,
  INTEREST_CATEGORIES,
  USER_ROLES,
} from '../../constants/enums.js';
import { logger } from "../../utils/logger.js";
import AppError from "../../utils/HandleAppErrors.js";
import { generateRandomToken } from "../../utils/commonUtils.js";

const { Schema, model } = mongoose;
const { ObjectId } = Schema;

// Define the user schema with improved fields and structure
const userSchema = new Schema(
  {
    // Basic user details
    name: {
      type: String,
      required: [true, "A user must have a name"],
      trim: true,
      minlength: [2, "Name must be at least 2 characters long"],
    },
    email: {
      type: String,
      required: [true, "Please provide a valid email address"],
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, "Email provided is not valid"],
    },
    password: {
      type: String,
      required: [true, "A user must have a password"],
      minlength: [8, "Password must be at least 8 characters long"],
      select: false, // Exclude password field from queries by default
    },
    confirmPassword: {
      type: String,
      select: false,
      required: [true, "Please confirm your password"],
      validate: {
        validator: function (value) {
          return value === this.password; // Ensure passwords match
        },
        message: "Passwords do not match",
      },
    },

    profilePicture: {
      public_id: {
        type: String,
        default: "default_profile_pic_id",
      },
      url: {
        type: String,
        default: "https://example.com/default-profile-picture.png",
      },
      type: {
        type: String,
        default: "image/png",
      },
    },

    role: {
      type: String,
      enum: USER_ROLES,
      default: "User",
    },

    // Interests and social settings
    interestCategories: {
      type: [String],
      enum: INTEREST_CATEGORIES,
      default: [],
    },
    isPrivate: {
      type: Boolean,
      default: true, // Default to private account
    },

    followRequests: [
      {
        type: ObjectId,
        ref: "User",
      },
    ],
    followerCount: {
      type: Number,
      default: 0,
    },
    followingCount: {
      type: Number,
      default: 0,
    },
    bio: {
      type: String,
      maxlength: [200, "Bio cannot exceed 200 characters"],
    },
    socketId: {
      type: String,
      default: null,
    },

    // Account status and activity
    accountStatus: {
      type: String,
      enum: ACCOUNT_STATUSES,
      default: "Offline",
    },
    isActiveAccount: {
      type: Boolean,
      default: true,
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    isSuspended: {
      type: Boolean,
      default: false,
    },

    // Financial information
    walletBalance: {
      type: Number,
      default: 0,
    },

    // Security tokens and timestamps
    emailVerificationToken: String,
    emailVerificationTokenExpiry: Date,
    passwordResetToken: String,
    passwordResetTokenExpiry: Date,
    passwordChangedDate: Date,
    refreshToken: {
      type: String,
      select: false,
    },

    // Social logins
    socialLogins: {
      googleId: {
        type: String,
        default: null,
      },
      facebookId: {
        type: String,
        default: null,
      },
      linkedinId: {
        type: String,
        default: null,
      },
    },

    // Account activity
    lastLoginDate: {
      type: Date,
    },
    lastLoginIP: {
      type: String,
      default: "Unknown",
    },
    lastLoginDevice: {
      type: String,
      default: "Unknown",
    },
    failedLoginAttempts: {
      type: Number,
      default: 0,
    },
    accountLockUntil: {
      type: Date,
    },

    // Preferences
    preferences: {
      preferredLanguage: {
        type: String,
        default: "en",
      },
      preferredCurrency: {
        type: String,
        default: "USD",
      },
      isNotificationsEnabled: {
        type: Boolean,
        default: true,
      },
    },
    subscriptionStatus: {
      type: String,
      enum: ["active", "inactive", "expired"],
      default: "inactive", // Default subscription status
    },

    // Relationships
    referredBy: {
      type: ObjectId,
      ref: "User",
    },
    associatedOrders: [
      {
        type: ObjectId,
        ref: "Order",
      },
    ],

    // Soft delete
    deletedDate: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true, // Automatically manage createdAt and updatedAt fields
    toJSON: { virtuals: true }, // Include virtual fields in JSON responses
    toObject: { virtuals: true },
  }
);

// -------------------------------------------------------
// === Indexing for Improved Query Performance === //
// -------------------------------------------------------

userSchema.index({ role: 1 }); // Role-based index for efficient filtering
userSchema.index({ accountStatus: 1, isSuspended: 1 }); // Compound index for account management
userSchema.index({ name: 1 }); // Text index for searching by name

// ----------------------------------------
// ** /// === Virtual Properties  === /// **
// -----------------------------------------

// Virtual for full activity status
userSchema.virtual("isOnline").get(function () {
  return this.accountStatus === "Online";
});

// Virtual field to populate the shop(s) owned by this user
userSchema.virtual("shopDetails", {
  ref: "Shop",
  localField: "_id",
  foreignField: "owner",
});

// Fetching the List of Entities the User Is Following
userSchema.virtual("following", {
  ref: "Follow",
  localField: "_id",
  foreignField: "follower",
  justOne: false,
  options: { select: "following followingType" }, // Fetch necessary fields
});

// Fetching the List of Followers
userSchema.virtual("followers", {
  ref: "Follow",
  localField: "_id",
  foreignField: "following",
  justOne: false,
  match: { followingType: "User" }, // Ensure filtering for user-type followers
  options: { select: "follower" }, // Include only follower field
});

// Fetching Contacts from Conversations
// userSchema
//   .virtual("contacts", {
//     ref: "Conversation",
//     localField: "_id",
//     foreignField: "participants", // Reference the participants array
//     justOne: false,
//     options: { select: "participants isActive", sort: { updatedAt: -1 } }, // Fetch sorted active conversations
//   })
//   .get(function (conversations) {
//     const contactIds = new Set();
//     conversations.forEach((conversation) => {
//       if (conversation.isActive) {
//         conversation.participants.forEach((participant) => {
//           if (participant.toString() !== this._id.toString()) {
//             contactIds.add(participant.toString());
//           }
//         });
//       }
//     });
//     return Array.from(contactIds); // Return unique contact IDs
//   });

// ----------------------------------------
// ** /// === Middlewares  === /// **
// -----------------------------------------

// Encrypt the password before saving it to the database
userSchema.pre("save", async function (next) {
  // Only hash if password is modified
  if (!this.isModified("password")) return next();
  // Hash the password with salt
  const salt = await bcrypt.genSalt(12);
  this.password = await bcrypt.hash(this.password, salt);
  // Do not save confirmPassword in the database
  this.confirmPassword = undefined;

  next();
});

// Update passwordChangedDate when password is updated
userSchema.pre("save", function (next) {
  if (!this.isModified("password") || this.isNew) return next();
  // Slight delay for token issuance
  this.passwordChangedDate = Date.now() - 1000;
  next();
});

// Auto-populate `followRequests` with user data for read operations
userSchema.pre(/^find/, function (next) {
  this.populate("followRequests", "name email profilePicture");
  next();
});

// Pre-Save Middleware: Handle Socket ID Changes
userSchema.pre("save", function (next) {
  if (this.isModified("socketId")) {
    logger.info(`Socket ID for user ${this.name} updated to: ${this.socketId}`);
  }
  next();
});

// Pre-Remove Middleware: Soft Delete User Conversations
userSchema.post("findOneAndDelete", async function (doc, next) {
  if (!doc) {
    return next(new Error("User document not found for deletion."));
  }

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const Conversation = mongoose.model("Conversation");

    // Soft delete conversations where the user is the only participant
    await Conversation.updateMany(
      { participants: [doc._id] },
      { $set: { isActive: false, archivedAt: new Date() } },
      { session }
    );

    // Remove the user from conversations with multiple participants
    await Conversation.updateMany(
      { participants: doc._id },
      { $pull: { participants: doc._id } },
      { session }
    );

    await session.commitTransaction();
    session.endSession();
    next();
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    console.error("Error during user removal:", error);
    next(error);
  }
});

// Pre-Delete Hook for Soft Deletion
userSchema.pre("findOneAndDelete", async function (next) {
  const doc = await this.model.findOne(this.getQuery());
  if (doc) {
    doc.deletedDate = new Date(); // Mark as deleted
    doc.isActiveAccount = false; // Mark as inactive
    await doc.save();
  }
  next();
});

// Filter Middleware for Queries
// Use your existing middleware to exclude these users by default.
userSchema.pre(/^find/, function (next) {
  const options = this.getOptions() || {};

  // Default: Exclude soft-deleted users unless `includeDeleted` is set
  if (!options.includeDeleted) {
    this.where({ deletedDate: null });
  }

  // Default: Exclude inactive users unless `includeInactive` is set
  if (!options.includeInactive) {
    this.where({ isActiveAccount: true });
  }

  next();
});

// Pre-Save Middleware: Update updatedAt Timestamp
userSchema.pre("save", function (next) {
  // Update only for existing
  if (!this.isNew) this.updatedAt = Date.now();
  next();
});

// ----------------------------------------
// ** /// === Instance Methods === /// **
// -----------------------------------------

// Check if the provided password matches the stored password
userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

// Check if the token was issued after the password was changed
userSchema.methods.hasPasswordChangedAfter = function (JWTTimeStamp) {
  if (this.passwordChangedDate) {
    const changedTimeStamp = parseInt(
      this.passwordChangedDate.getTime() / 1000,
      10
    );
    return JWTTimeStamp < changedTimeStamp; // True if password changed after token issued
  }
  return false; // Password has not been changed
};

// Generate password reset token
userSchema.methods.createPasswordResetToken = function () {
  const resetToken = generateRandomToken();

  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  // Token expires in 10 minutes
  this.passwordResetTokenExpiry = Date.now() + 10 * 60 * 1000;

  // Return the plain token to the user
  return resetToken;
};

// Generate Account Verification Token
userSchema.methods.createAccountVerificationToken = function () {
  const verificationToken = generateRandomToken();
  this.emailVerificationToken = crypto
    .createHash("sha256")
    .update(verificationToken)
    .digest("hex");
  this.emailVerificationTokenExpiry = Date.now() + 10 * 60 * 1000; // 10 minutes
  return verificationToken; // Return plain token
};

// Update User Password
userSchema.methods.updatePassword = async function (oldPassword, newPassword) {
  // Check if the old password matches
  if (!(await this.correctPassword(oldPassword, this.password))) {
    throw new Error("Incorrect old password.");
  }

  // Hash the new password before saving
  this.password = await bcrypt.hash(newPassword, 12);

  // Update metadata
  this.passwordChangedAt = Date.now();
  this.failedLoginAttempts = 0; // Reset failed attempts
  this.accountLockUntil = null; // Unlock the account if locked
  await this.save();
};

// Increment Login Attempts
userSchema.methods.incrementLoginAttempts = async function () {
  const LOGIN_ATTEMPT_LIMIT =
    parseInt(process.env.LOGIN_ATTEMPT_LIMIT, 10) || 5;
  const ACCOUNT_LOCK_DURATION =
    parseInt(process.env.ACCOUNT_LOCK_DURATION, 10) || 30 * 60 * 1000; // Default to 30 minutes

  try {
    // Increment failed login attempts
    this.failedLoginAttempts = (this.failedLoginAttempts || 0) + 1;

    // Lock the account if the limit is exceeded
    if (this.failedLoginAttempts >= LOGIN_ATTEMPT_LIMIT) {
      const lockUntil = new Date(Date.now() + ACCOUNT_LOCK_DURATION);
      this.accountLockUntil = lockUntil;
      console.info(
        `User ${this._id} account locked until ${lockUntil.toLocaleString()}`
      );
    }

    // Save the user document
    await this.save();
  } catch (error) {
    logger.error(
      `Error incrementing login attempts for user ${this._id}: ${error.message}`
    );
    throw new Error("Failed to update login attempts. Please try again.");
  }
};

// Reset Login Attempts
userSchema.methods.resetLoginAttempts = async function () {
  try {
    this.failedLoginAttempts = 0;
    this.accountLockUntil = null;

    // Set default profile picture if missing
    if (!this.profilePicture || !this.profilePicture.type) {
      this.profilePicture = {
        type: "image",
        url: "https://example.com/default-avatar.jpg",
        public_id: "default_public_id",
      };
    }

    await this.save();
    logger.info(`Login attempts reset for user ${this._id}`);
  } catch (error) {
    logger.error(
      `Error resetting login attempts for user ${this._id}: ${error.message}`
    );
    throw new Error("Failed to reset login attempts. Please try again.");
  }
};

// Check if Account is Locked
userSchema.methods.isAccountLocked = function () {
  if (!this.accountLockUntil) return false;

  const isLocked = Date.now() < new Date(this.accountLockUntil);

  if (!isLocked) {
    // Reset login attempts if lock has expired
    this.failedLoginAttempts = 0;
    this.accountLockUntil = undefined;
    console.info(`Account lock expired for user ${this._id}. Resetting state.`);
  } else {
    console.info(
      `Account lock status for user ${this._id}: Locked until ${new Date(
        this.accountLockUntil
      ).toLocaleString()}`
    );
  }

  return isLocked;
};

// Method to generate JWT Access Token
userSchema.methods.getJWTAccessToken = function () {
  try {
    return jwt.sign(
      { id: this._id, name: this.name, role: this.role },
      process.env.JWT_ACCESS_TOKEN_SECRET,
      {
        expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRES_IN || "15m",
        issuer: process.env.JWT_ISSUER,
        audience: process.env.JWT_ACCESS_AUDIENCE,
      }
    );
  } catch (error) {
    throw new Error("Error generating access token: " + error.message);
  }
};

// Method to generate JWT Refresh Token
userSchema.methods.getJWTRefreshToken = function () {
  try {
    return jwt.sign(
      { id: this._id, name: this.name, role: this.role },
      process.env.JWT_REFRESH_TOKEN_SECRET,
      {
        expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRES_IN || "7d",
        issuer: process.env.JWT_ISSUER,
        audience: process.env.JWT_REFRESH_AUDIENCE,
      }
    );
  } catch (error) {
    throw new Error("Error generating refresh token: " + error.message);
  }
};

// Toggle the suspension status of the user.
userSchema.methods.toggleSuspension = async function () {
  try {
    // Flip the suspension status
    this.isSuspended = !this.isSuspended;

    // Save the updated document
    await this.save();

    // Log for debugging
    console.log(`User suspension status toggled to: ${this.isSuspended}`);

    return this.isSuspended;
  } catch (error) {
    throw new Error(`Error toggling suspension: ${error.message}`);
  }
};

// Update the user's profile with the provided data.
// Validates and updates only the fields present in the `updatedData` object.
userSchema.methods.updateProfile = async function (updatedData) {
  // Validate and update name if provided
  if (updatedData.name) {
    if (updatedData.name.length < 3 || updatedData.name.length > 50) {
      throw new AppError("Name must be between 3 and 50 characters.", 400);
    }
    this.name = updatedData.name.trim();
  }

  // Validate and update email if provided
  if (updatedData.email) {
    if (!validator.isEmail(updatedData.email)) {
      throw new AppError("Invalid email format.", 400);
    }
    this.email = updatedData.email.toLowerCase();
  }

  // Validate and update bio if provided
  if (updatedData.bio) {
    if (updatedData.bio.length > 200) {
      throw new AppError("Bio cannot exceed 200 characters.", 400);
    }
    this.bio = updatedData.bio.trim();
  }

  // Update profile picture if provided
  if (updatedData.profilePicture) {
    if (
      !updatedData.profilePicture.url ||
      !updatedData.profilePicture.public_id
    ) {
      throw new AppError(
        "Profile picture must include a valid URL and public_id.",
        400
      );
    }
    this.profilePicture = updatedData.profilePicture;
  }

  // Update preferences
  if (updatedData.preferences) {
    const { preferredLanguage, preferredCurrency, isNotificationsEnabled } =
      updatedData.preferences;

    if (preferredLanguage)
      this.preferences.preferredLanguage = preferredLanguage;
    if (preferredCurrency)
      this.preferences.preferredCurrency = preferredCurrency;
    if (typeof isNotificationsEnabled === "boolean") {
      this.preferences.isNotificationsEnabled = isNotificationsEnabled;
    }
  }

  // Save the updated profile to the database
  await this.save();

  // Return the updated user object
  return this;
};

// Add an interest category to the user's interestCategories array
userSchema.methods.addInterest = async function (category, session = null) {
  if (!category || typeof category !== "string") {
    throw new Error("Invalid input: 'category' must be a non-empty string.");
  }

  // Normalize input (e.g., trim whitespace and convert to lowercase)
  category = category.trim().toLowerCase();

  // Start a session if one is not already provided
  const transactionSession = session || (await mongoose.startSession());
  try {
    if (!session) transactionSession.startTransaction();

    // Check if the category already exists in the array
    if (this.interestCategories.includes(category)) {
      return {
        success: false,
        message: "Category is already in the interest list.",
      };
    }

    // Use $addToSet for atomic addition
    const result = await this.updateOne(
      { $addToSet: { interestCategories: category } },
      { session: transactionSession }
    );

    if (result.modifiedCount > 0) {
      // Commit the transaction if a new session was created
      if (!session) await transactionSession.commitTransaction();

      return { success: true, message: "Category added successfully." };
    } else {
      throw new Error("Failed to add the category. No changes were made.");
    }
  } catch (error) {
    // Abort the transaction in case of an error
    if (!session) await transactionSession.abortTransaction();
    console.error("Error adding interest category:", error);
    throw new Error("An error occurred while adding the interest category.");
  } finally {
    // End the session if one was created here
    if (!session) transactionSession.endSession();
  }
};

// Remove an interest category from the user's interestCategories array
userSchema.methods.removeInterest = async function (category, session = null) {
  if (!category || typeof category !== "string") {
    throw new Error("Invalid input: 'category' must be a non-empty string.");
  }

  // Normalize input (e.g., trim whitespace and convert to lowercase)
  category = category.trim().toLowerCase();

  // Start a session if one is not already provided
  const transactionSession = session || (await mongoose.startSession());
  try {
    if (!session) transactionSession.startTransaction();

    // Check if the category exists in the array
    if (!this.interestCategories.includes(category)) {
      return {
        success: false,
        message: "Category not found in the interest list.",
      };
    }

    // Use $pull for atomic removal
    const result = await this.updateOne(
      { $pull: { interestCategories: category } },
      { session: transactionSession }
    );

    if (result.modifiedCount > 0) {
      // Commit the transaction if a new session was created
      if (!session) await transactionSession.commitTransaction();

      return { success: true, message: "Category removed successfully." };
    } else {
      throw new Error("Failed to remove the category. No changes were made.");
    }
  } catch (error) {
    // Abort the transaction in case of an error
    if (!session) await transactionSession.abortTransaction();
    console.error("Error removing interest category:", error);
    throw new Error("An error occurred while removing the interest category.");
  } finally {
    // End the session if one was created here
    if (!session) transactionSession.endSession();
  }
};

// ----------------------------------------
// ** /// === Statics Methods === /// **
// -----------------------------------------

// Find active users by role (Schema Static Method)
userSchema.statics.findActiveUsersByRole = async function (role) {
  return this.find({ role, isActiveAccount: true, deletedDate: null }); // Ensure soft-deleted users are excluded
};

// Lock an account after repeated failed login attempts
userSchema.statics.lockAccount = async function (email) {
  const accountLockDuration = 30 * 60 * 1000; // 30 minutes
  return this.findOneAndUpdate(
    { email },
    { accountLockUntil: Date.now() + accountLockDuration }
  );
};

// Soft delete user
userSchema.statics.softDelete = async function (userId) {
  const user = await this.findById(userId);
  if (!user) {
    throw new Error("User not found");
  }

  if (user.deletedDate) {
    throw new Error("User already soft-deleted");
  }

  return this.findByIdAndUpdate(
    userId,
    {
      deletedDate: Date.now(),
      isActiveAccount: false,
    },
    { new: true } // Return the updated document
  );
};

/**
 * Get follow suggestions for a user based on mutual interests.
 * Suggest users who share at least one interest category with the current user,
 * excluding the user's current followings and their own account.
 */
userSchema.statics.getFollowSuggestions = async function (userId, limit = 5) {
  // Fetch the user's details along with their interests and existing followings
  const user = await this.findById(userId)
    .populate("interestCategories", "_id name")
    .lean();

  if (!user) {
    throw new Error("User not found");
  }

  const userInterests = user.interestCategories.map((interest) => interest._id);

  // If the user has no interests, return an empty array
  if (!userInterests.length) return [];

  // Fetch follow suggestions based on shared interests
  const suggestions = await this.aggregate([
    {
      $match: {
        $and: [
          { _id: { $ne: user._id } }, // Exclude the user themselves
          { _id: { $nin: user.following || [] } }, // Exclude users already followed
          { interestCategories: { $in: userInterests } }, // Match users with shared interests
          { isActiveAccount: true }, // Only include active accounts
          { deletedDate: { $eq: null } }, // Exclude soft-deleted accounts
        ],
      },
    },
    {
      $lookup: {
        from: "follows", // Reference the Follow collection
        localField: "_id", // User's ID
        foreignField: "following", // Following field in Follow collection
        as: "followStatus", // Output as followStatus
      },
    },
    {
      $match: {
        "followStatus.follower": { $ne: userId }, // Exclude users already followed
      },
    },
    {
      $addFields: {
        sharedInterestCount: {
          $size: {
            $setIntersection: ["$interestCategories", userInterests],
          },
        },
      },
    },
    {
      $sort: { sharedInterestCount: -1 }, // Sort by the number of shared interests (descending)
    },
    {
      $limit: limit, // Limit the number of suggestions
    },
    {
      $project: {
        name: 1,
        email: 1,
        profilePicture: 1,
        sharedInterestCount: 1,
        interestCategories: 1,
      },
    },
  ]);

  return suggestions;
};

// -------------------------------------------------------
// === Exporting Model ===
// -------------------------------------------------------
const User = model("User", userSchema);
export default User;

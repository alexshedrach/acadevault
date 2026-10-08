import { body } from "express-validator";

export const userValidationRules = {
  // Validation for user registration
  register: [
    body("name")
      .trim()
      .notEmpty()
      .withMessage("Name is required.")
      .isLength({ min: 2, max: 50 })
      .withMessage("Name must be between 2 and 50 characters.")
      .matches(/^[a-zA-Z\s]+$/)
      .withMessage("Name can only contain letters and spaces."),

    body("email")
      .trim()
      .notEmpty()
      .withMessage("Email is required.")
      .isEmail()
      .withMessage("Invalid email address.")
      .normalizeEmail(),

    body("password")
      .notEmpty()
      .withMessage("Password is required.")
      .isLength({ min: 8 })
      .withMessage("Password must be at least 8 characters long.")
      .matches(/[A-Z]/)
      .withMessage("Password must contain at least one uppercase letter.")
      .matches(/[a-z]/)
      .withMessage("Password must contain at least one lowercase letter.")
      .matches(/\d/)
      .withMessage("Password must contain at least one number.")
      .matches(/[@$!%*?&]/)
      .withMessage(
        "Password must contain at least one special character (@$!%*?&)."
      ),

    body("confirmPassword")
      .notEmpty()
      .withMessage("Confirm Password is required.")
      .custom((value, { req }) => value === req.body.password)
      .withMessage("Passwords do not match."),

    body("interestCategories")
      .isArray({ min: 1 })
      .withMessage("At least one interest category is required.")
      .custom((categories) => {
        const allowedCategories = [
          "Technology",
          "Art",
          "Music",
          "Sports",
          "Education",
        ];
        return categories.every((category) =>
          allowedCategories.includes(category)
        );
      })
      .withMessage("Invalid interest categories provided."),
  ],

  // Validation for user login
  login: [
    body("email")
      .trim()
      .notEmpty()
      .withMessage("Email is required.")
      .isEmail()
      .withMessage("Invalid email address.")
      .normalizeEmail(),

    body("password")
      .notEmpty()
      .withMessage("Password is required.")
      .isLength({ min: 8 })
      .withMessage("Password must be at least 8 characters long."),
  ],

  // Validation for updating user profile
  updateProfile: [
    body("name")
      .optional()
      .trim()
      .isLength({ min: 2, max: 50 })
      .withMessage("Name must be between 2 and 50 characters.")
      .matches(/^[a-zA-Z\s]+$/)
      .withMessage("Name can only contain letters and spaces."),

    body("email")
      .optional()
      .trim()
      .isEmail()
      .withMessage("Invalid email address.")
      .normalizeEmail(),

    body("interestCategories")
      .optional()
      .isArray({ min: 1 })
      .withMessage("At least one interest category is required.")
      .custom((categories) => {
        const allowedCategories = [
          "Technology",
          "Art",
          "Music",
          "Sports",
          "Education",
        ];
        return categories.every((category) =>
          allowedCategories.includes(category)
        );
      })
      .withMessage("Invalid interest categories provided."),

    body("password")
      .optional()
      .isLength({ min: 8 })
      .withMessage("Password must be at least 8 characters long.")
      .matches(/[A-Z]/)
      .withMessage("Password must contain at least one uppercase letter.")
      .matches(/[a-z]/)
      .withMessage("Password must contain at least one lowercase letter.")
      .matches(/\d/)
      .withMessage("Password must contain at least one number.")
      .matches(/[@$!%*?&]/)
      .withMessage(
        "Password must contain at least one special character (@$!%*?&)."
      ),
  ],

  // Validation for follow/unfollow actions
  followUser: [
    body("userId")
      .notEmpty()
      .withMessage("User ID is required.")
      .isMongoId()
      .withMessage("Invalid User ID."),
  ],
};

// // Define validation for user registration
// const userValidationSchema = Joi.object({
//   name: Joi.string().min(2).max(50).required().messages({
//     "string.base": "Name must be a string",
//     "string.min": "Name must be at least 2 characters long",
//     "string.max": "Name must not exceed 50 characters",
//     "any.required": "A user must have a name",
//   }),

//   email: Joi.string().email().lowercase().required().messages({
//     "string.base": "Email must be a string",
//     "string.email": "Please provide a valid email address",
//     "any.required": "Please provide an email address",
//   }),

//   password: Joi.string().min(8).required().messages({
//     "string.base": "Password must be a string",
//     "string.min": "Password must be at least 8 characters long",
//     "any.required": "A user must have a password",
//   }),

//   confirmPassword: Joi.string().valid(Joi.ref("password")).required().messages({
//     "any.only": "Passwords must match",
//     "any.required": "Please confirm your password",
//   }),

//   profilePicture: Joi.string().allow("", null).max(255).messages({
//     "string.base": "Profile picture URL must be a string",
//     "string.max": "Profile picture URL must not exceed 255 characters",
//   }),

//   role: Joi.string()
//     .valid(...USER_ROLES)
//     .default("User")
//     .messages({
//       "string.base": "Role must be a string",
//       "any.only": `Role must be one of the following: ${USER_ROLES.join(", ")}`,
//     }),

//   interestCategories: Joi.array()
//     .items(Joi.string().valid(...INTEREST_CATEGORIES))
//     .default([])
//     .messages({
//       "array.base": "Interest categories must be an array",
//       "array.includes": "Invalid category in interest list",
//     }),

//   isPrivate: Joi.boolean().default(false).messages({
//     "boolean.base": "isPrivate must be a boolean",
//   }),

//   bio: Joi.string().max(200).allow("", null).messages({
//     "string.base": "Bio must be a string",
//     "string.max": "Bio must not exceed 200 characters",
//   }),

//   accountStatus: Joi.string()
//     .valid(...ACCOUNT_STATUSES)
//     .default("Offline")
//     .messages({
//       "string.base": "Account status must be a string",
//       "any.only": `Account status must be one of the following: ${ACCOUNT_STATUSES.join(", ")}`,
//     }),

//   isActiveAccount: Joi.boolean().default(true).messages({
//     "boolean.base": "isActiveAccount must be a boolean",
//   }),

//   isEmailVerified: Joi.boolean().default(false).messages({
//     "boolean.base": "isEmailVerified must be a boolean",
//   }),

//   isPhoneNumberVerified: Joi.boolean().default(false).messages({
//     "boolean.base": "isPhoneNumberVerified must be a boolean",
//   }),

//   isSuspended: Joi.boolean().default(false).messages({
//     "boolean.base": "isSuspended must be a boolean",
//   }),

//   lastLoginDate: Joi.date().allow(null).messages({
//     "date.base": "lastLoginDate must be a valid date",
//   }),

//   failedLoginAttempts: Joi.number().integer().default(0).messages({
//     "number.base": "failedLoginAttempts must be a number",
//   }),

//   accountLockUntil: Joi.date().allow(null).messages({
//     "date.base": "accountLockUntil must be a valid date",
//   }),

//   // Seller and financial information
//   sellerProfile: Joi.string().allow(null, ""),
//   walletBalance: Joi.number().default(0).messages({
//     "number.base": "walletBalance must be a number",
//   }),

//   // Security tokens
//   emailVerificationToken: Joi.string().allow(null, ""),
//   emailVerificationTokenExpiry: Joi.date().allow(null).messages({
//     "date.base": "emailVerificationTokenExpiry must be a valid date",
//   }),
//   passwordResetToken: Joi.string().allow(null, ""),
//   passwordResetTokenExpiry: Joi.date().allow(null).messages({
//     "date.base": "passwordResetTokenExpiry must be a valid date",
//   }),

//   refreshToken: Joi.string().allow(null, ""),

//   // Social logins
//   socialLogins: Joi.object({
//     googleId: Joi.string().allow(null, ""),
//     facebookId: Joi.string().allow(null, ""),
//     linkedinId: Joi.string().allow(null, ""),
//   }),

//   preferences: Joi.object({
//     preferredLanguage: Joi.string().default("en"),
//     preferredCurrency: Joi.string().default("USD"),
//     isNotificationsEnabled: Joi.boolean().default(true),
//   }),

//   referredBy: Joi.string().allow(null, ""),
//   associatedOrders: Joi.array()
//     .items(Joi.string().regex(regex.objectId))
//     .allow(null),

//   deletedDate: Joi.date().allow(null),
// });

// // Export the validation schema for use in other parts of the application
// export default userValidationSchema;

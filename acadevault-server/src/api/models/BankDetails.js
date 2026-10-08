import mongoose from "mongoose";
import { CURRENCIES } from '../../constants/enums.js';
import AppError from "../../utils/HandleAppErrors.js";

const { Schema, model } = mongoose;
const { ObjectId } = Schema;

const isoCountries = ["US", "CA", "NG", "GB", "DE"]; // Example list

const bankDetailsSchema = new Schema({
  shop: {
    type: ObjectId,
    ref: "Shop",
    required: true,
  },
  accountName: {
    type: String,
    required: true,
  },
  accountNumber: {
    type: String,
    required: true,
    validate: {
      validator: (v) => /^\d{10,20}$/.test(v), // Adjust pattern as needed
      message: "Account number must be between 10 and 20 digits.",
    },
  },
  bankName: {
    type: String,
    required: true,
  },
  swiftCode: {
    type: String,
    trim: true,
    validate: {
      validator: (v) => !v || /^[A-Z0-9]{8,11}$/.test(v), // SWIFT/BIC format
      message: "SWIFT code must be 8 or 11 characters long.",
    },
  }, // For international transactions
  routingNumber: {
    type: String,
    trim: true,
  }, // For ACH transfers in the US
  country: {
    type: String,
    required: true,
    validate: {
      validator: (v) => isoCountries.includes(v),
      message: "Invalid country code.",
    },
  }, // Country of the bank
  currency: {
    type: String,
    required: true,
    enum: Object.values(CURRENCIES), // Extend as needed
    message: "Unsupported currency type.",
  },
  withdrawMethod: {
    type: String,
    enum: ["Bank Transfer", "PayPal", "Mobile Money", "Cheque"],
    required: true,
    message: "Invalid withdraw method.",
  },
  isPrimary: {
    type: Boolean,
    default: false,
  }, // Indicate default account for withdrawals

  paypalEmail: {
    type: String,
    validate: {
      validator: (v) =>
        !v || /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(v), // Simple regex for email validation
      message: "Invalid PayPal email.",
    },
  },
  mobileMoneyNumber: {
    type: String,
    validate: {
      validator: (v) => !v || /^\+?\d{10,15}$/.test(v), // Validating for mobile money phone numbers
      message: "Invalid mobile money number.",
    },
  },
});

// Add timestamps for automatic `createdAt` and `updatedAt` tracking
bankDetailsSchema.set("timestamps", true);

// Indexing to optimize queries (e.g., find by shop or accountNumber)
bankDetailsSchema.index({ shop: 1, accountNumber: 1 }, { unique: true });

// Ensure only one isPrimary account per shop.
bankDetailsSchema.pre("save", async function (next) {
  if (this.isPrimary) {
    const existingPrimary = await this.constructor.findOne({
      shop: this.shop,
      isPrimary: true,
      _id: { $ne: this._id }, // Exclude the current document
    });
    if (existingPrimary) {
      throw new AppError("Only one primary account is allowed per shop.", 400);
    }
  }
  next();
});

// Add cascading deletion middleware to remove bank details when a shop is deleted.
bankDetailsSchema.pre("remove", async function (next) {
  await this.model("Shop").updateOne(
    { _id: this.shop },
    { $pull: { bankDetails: this._id } }
  );
  next();
});

const BankDetails = model("BankDetails", bankDetailsSchema);
export default BankDetails;

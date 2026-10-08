import mongoose from "mongoose";
import axios from "axios";

import AppError from "../../utils/HandleAppErrors.js";
import { geocodeAddress } from "../../helper/geocodeAddress.js";
import { logger } from "../../utils/logger.js";

const { Schema } = mongoose;

const addressSchema = new Schema(
  {
    ownerType: {
      type: String,
      enum: ["User", "Shop"], // Only allow these values
      required: [true, "Owner type is required"],
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "Owner ID is required"],
      validate: {
        validator: async function (value) {
          // Determine the model to query based on ownerType
          const modelName = this.ownerType === "User" ? "User" : "Shop";

          // Check if a document with the given ID exists in the respective collection
          const exists = await mongoose.models[modelName].exists({
            _id: value,
          });
          return !!exists; // Return true if the owner exists, false otherwise
        },
        message: "Owner with the specified ID does not exist",
      },
    },

    // Address Type: Physical, Shipping, Billing
    type: {
      type: String,
      enum: ["physical", "shipping", "billing"],
      required: [true, "Address type is required"],
    },

    // Basic Address Information
    addressLine1: {
      type: String,
      trim: true,
      required: [true, "Address line 1 is required"],
      minlength: [5, "Address line 1 must be at least 5 characters long"],
    },
    addressLine2: {
      type: String,
      trim: true,
    },
    city: {
      type: String,
      required: [true, "City is required"],
      trim: true,
    },
    state: {
      type: String,
      trim: true,
    },
    postalCode: {
      type: String,
      trim: true,
      validate: {
        validator: function (v) {
          return !v || /^[A-Za-z0-9\s-]+$/.test(v);
        },
        message: "Invalid postal code format",
      },
    },
    country: {
      type: String,
      required: [true, "Country is required"],
      validate: {
        validator: function (v) {
          return /^[A-Za-z\s]+$/.test(v); // Only alphabets and spaces
        },
        message: "Invalid country name",
      },
    },

    // Geospatial Information
    location: {
      type: {
        type: String,
        enum: ["Point"],
        default: "Point",
      },
      coordinates: {
        type: [Number], // [longitude, latitude]
        index: "2dsphere",
      },
    },

    // Phone Number (Optional)
    phoneNumber: {
      type: String,
      validate: {
        validator: function (v) {
          return !v || /^\+?[1-9]\d{1,14}$/.test(v);
        },
        message: "Invalid phone number format",
      },
    },

    // Address Settings
    isPrimary: {
      type: Boolean,
      default: false,
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    enableGeocoding: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

/// === Indexes === ///
addressSchema.index({ owner: 1, ownerType: 1, isPrimary: 1 });
addressSchema.index({ location: "2dsphere" });

/// === Middleware === ///

// Ensure only one primary address per type and owner
addressSchema.pre("save", async function (next) {
  if (this.isPrimary) {
    await mongoose.models.Address.updateMany(
      {
        owner: this.owner,
        ownerType: this.ownerType,
        type: this.type,
        _id: { $ne: this._id },
      },
      { isPrimary: false }
    );
  } else {
    const primaryExists = await mongoose.models.Address.exists({
      owner: this.owner,
      ownerType: this.ownerType,
      type: this.type,
      isPrimary: true,
    });
    if (!primaryExists) {
      this.isPrimary = true; // Automatically set as primary if no other primary exists
    }
  }
  next();
});

// Automatically geocode the address before saving
addressSchema.pre("save", async function (next) {
  if (
    this.enableGeocoding &&
    (this.isModified("addressLine1") ||
      this.isModified("addressLine2") ||
      this.isModified("city") ||
      this.isModified("state") ||
      this.isModified("postalCode") ||
      this.isModified("country"))
  ) {
    try {
      const fullAddress = `${this.addressLine1}, ${this.addressLine2 || ""}, ${
        this.city
      }, ${this.state || ""}, ${this.postalCode || ""}, ${this.country}`
        .replace(/\s+/g, " ")
        .trim();

      const location = await geocodeAddress(fullAddress);
      this.location = {
        type: "Point",
        coordinates: [location.lng, location.lat],
      };
    } catch (error) {
      throw new AppError(
        `Geocoding Error: ${error.message}`,
        500,
        true,
        "Geocoding"
      );
    }
  }
  next();
});

/// === Virtuals === ///

// Generate full address
addressSchema.virtual("fullAddress").get(function () {
  const parts = [
    this.addressLine1,
    this.addressLine2,
    this.city,
    this.state,
    this.postalCode,
    this.country,
  ];
  return parts.filter(Boolean).join(", ").trim() || "Incomplete Address";
});


// Masked Phone Number
addressSchema.virtual("maskedPhoneNumber").get(function () {
  if (!this.phoneNumber) return undefined;

  const phone = this.phoneNumber.trim(); // Ensure no leading/trailing spaces
  const visibleDigits = phone.slice(-4); // Last 4 digits
  const countryCode = phone.startsWith("+") ? phone.split(" ")[0] : ""; // Extract country code

  // Calculate the length of the masked part safely
  const maskedLength = Math.max(
    0,
    phone.length - visibleDigits.length - countryCode.length
  );
  const maskedPart = "*".repeat(maskedLength);

  // Return the masked phone number
  return `${countryCode} ${maskedPart}${visibleDigits}`;
});



/// === Instance Methods === ///

// Mark this address as the primary address
addressSchema.methods.markAsPrimary = async function () {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // Ensure the address is not soft-deleted or invalid
    if (!this.isActive) {
      throw new Error("Cannot mark an inactive address as primary.");
    }

    await mongoose.models.Address.updateMany(
      {
        owner: this.owner,
        ownerType: this.ownerType,
        type: this.type,
        _id: { $ne: this._id },
      },
      { isPrimary: false },
      { session }
    );

    this.isPrimary = true;
    await this.save({ session });

    await session.commitTransaction();
    return this;
  } catch (error) {
    await session.abortTransaction();
    logger.error("Error marking address as primary:", error.message);
    throw error;
  } finally {
    session.endSession();
  }
};


/// === Static Methods === ///

// Get the primary address for a user (or any owner) by type
addressSchema.statics.getPrimaryAddress = async function (
  ownerId,
  type,
  createIfMissing = false
) {
  if (!ownerId || !type) {
    throw AppError.validationError("Owner ID and Address type are required.");
  }

  const primaryAddress = await this.findOne({
    owner: ownerId,
    type,
    isPrimary: true,
  });

  if (!primaryAddress && createIfMissing) {
    // Optionally create a default primary address
    const newPrimary = await this.create({
      owner: ownerId,
      type,
      addressLine1: "Default Address Line 1",
      city: "Default City",
      country: "Default Country",
      isPrimary: true,
    });
    return newPrimary;
  }

  if (!primaryAddress) {
    throw AppError.notFound(
      `No primary ${type} address found for owner ${ownerId}.`
    );
  }

  return primaryAddress;
};


// Check if an address is a duplicate
addressSchema.statics.isDuplicate = async function (userId, address) {
  const normalizedAddressLine1 = address.addressLine1.trim().toLowerCase();
  const normalizedCity = address.city.trim().toLowerCase();
  const normalizedState = address.state?.trim().toLowerCase();

  const existingAddress = await this.findOne({
    owner: userId,
    addressLine1: normalizedAddressLine1,
    city: normalizedCity,
    state: normalizedState,
    postalCode: address.postalCode,
    country: address.country,
    type: address.type,
  });

  return !!existingAddress;
};


// Get suggestions from Google Places API
addressSchema.statics.getSuggestions = async function (query, region = null) {
  try {
    const params = {
      input: query,
      key: process.env.GOOGLE_MAPS_API_KEY,
    };
    if (region) {
      params.region = region; // Add optional region-based filtering
    }

    const response = await axios.get(process.env.GOOGLE_PLACES_API_URL, {
      params,
    });

    if (response.data.status !== "OK") {
      throw new AppError("Failed to fetch address suggestions.", 400);
    }

    return response.data.predictions.map((p) => ({
      description: p.description,
      placeId: p.place_id,
    }));
  } catch (error) {
    throw new AppError(error.message, 500, true, "Address Suggestions");
  }
};

// Reverse geocode coordinates into an address
addressSchema.statics.reverseGeocode = async function (longitude, latitude) {
  try {
    const response = await axios.get(process.env.GOOGLE_MAPS_API_URL, {
      params: {
        latlng: `${latitude},${longitude}`,
        key: process.env.GOOGLE_MAPS_API_KEY,
      },
    });

    const { results, status } = response.data;

    if (status !== "OK" || results.length === 0) {
      throw new Error("Reverse geocoding failed. Unable to retrieve address.");
    }

    return results[0].formatted_address;
  } catch (error) {
    throw new Error(error.message);
  }
};

/// === Export the Model === ///
const Address = mongoose.model("Address", addressSchema);
export default Address;

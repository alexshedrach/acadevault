import { isValidPhoneNumber } from "libphonenumber-js"; 
import Address from "../models/AddressModel.js";
import BankDetails from "../models/BankDetails.js";

/**
 * Validates the seller application payload to ensure it meets the business logic requirements.
 * Throws an error if validation fails.
 */

export const validateShopDetails = async (shopData) => {
  const {
    businessName,
    description,
    shopType,
    contactInfo,
    operatingHours,
    privacyPolicyAccepted,
    shopId,
  } = shopData;

  const errors = [];

  // Validate shop name
  if (
    !businessName ||
    typeof businessName !== "string" ||
    businessName.length < 3
  ) {
    errors.push("Shop name must be a string with at least 3 characters.");
  }

  // Validate description
  if (
    !description ||
    typeof description !== "string" ||
    description.length < 10
  ) {
    errors.push("Description must be a string with at least 10 characters.");
  }

  // Validate shop type
  const validShopTypes = ["retail", "service", "online", "other"];
  if (!shopType || !validShopTypes.includes(shopType)) {
    errors.push(`Shop type must be one of: ${validShopTypes.join(", ")}.`);
  }

  // Validate contact info
  if (!contactInfo?.phone || !isValidPhoneNumber(contactInfo.phone)) {
    errors.push("A valid phone number is required in contactInfo.");
  }

  // Validate operating hours
  if (
    !operatingHours?.open ||
    !operatingHours?.close ||
    typeof operatingHours.open !== "string" ||
    typeof operatingHours.close !== "string"
  ) {
    errors.push("Operating hours must include valid 'open' and 'close' times.");
  }

  // Check if Address exists for the Shop
  const addressExists = await Address.exists({ shop: shopId });
  if (!addressExists) {
    errors.push(
      "Address must be created and associated with the shop before registration."
    );
  }

  // Check if BankDetails exist for the Shop
  const bankDetailsExist = await BankDetails.exists({ shop: shopId });
  if (!bankDetailsExist) {
    errors.push(
      "Bank details must be created and associated with the shop before registration."
    );
  }

  // Privacy Policy acceptance
 if (!privacyPolicyAccepted) {
   errors.push("You must accept the privacy policy");
 }

  return errors;
};

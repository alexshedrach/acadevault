import BankDetails from "../api/models/BankDetails.js";
import Shop from "../api/models/ShopModel.js";
import AppError from "../utils/HandleAppErrors.js";
import { logger } from "../utils/logger.js";


class BankDetailsService {
    // Service for Updating Bank Details
  static async updateBankDetails(shopId, bankDetails, currentUser) {
    // Ensure the user has admin privileges
    if (currentUser.role !== "Admin") {
      throw new AppError("Only admins can update bank details.", 403);
    }

    // Validate the shop exists
    const shop = await Shop.findById(shopId);
    if (!shop) {
      throw new AppError("Shop not found.", 404);
    }

    // Check if the bank details already exist for the shop
    let existingBankDetails = await BankDetails.findOne({ shop: shopId });

    if (existingBankDetails) {
      // Update existing bank details
      Object.assign(existingBankDetails, bankDetails);
      await existingBankDetails.save();
    } else {
      // Create new bank details if none exist
      existingBankDetails = await BankDetails.create({
        ...bankDetails,
        shop: shopId,
      });
    }

    // Log the update action (optional)
    logger.info(
      `Admin ${currentUser.id} updated bank details for shop ${shopId}.`
    );

    return existingBankDetails;
  }
}
export default BankDetailsService;

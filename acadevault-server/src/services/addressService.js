import mongoose from 'mongoose';
import AppError from '../utils/HandleAppErrors.js';
import Address from '../api/models/AddressModel.js';
import { logger } from '../utils/logger.js';

// A service layer can handle the logic of updating or adding an address for a shop. This ensures reusability and maintainability.
class AddressService {
  static async updateShopAddress(shopId, addressData, currentUser) {
    // Ensure the user has admin privileges
    if (currentUser.role !== 'Admin') {
      throw new AppError('Only admins can manage addresses.', 403);
    }

    // Validate that the shop exists
    const shopExists = await mongoose.models.Shop.exists({ _id: shopId });
    if (!shopExists) {
      throw new AppError('Shop not found.', 404);
    }

    // Check if the address is a duplicate
    const isDuplicate = await Address.isDuplicate(shopId, addressData);
    if (isDuplicate) {
      throw new AppError('Duplicate address found for this shop.', 400);
    }

    // Find the existing address of the same type, if any
    let existingAddress = await Address.findOne({
      owner: shopId,
      ownerType: 'Shop',
      type: addressData.type,
    });

    if (existingAddress) {
      // Update the existing address
      Object.assign(existingAddress, addressData);
      await existingAddress.save();
    } else {
      // Create a new address for the shop
      existingAddress = await Address.create({
        ...addressData,
        owner: shopId,
        ownerType: 'Shop',
      });
    }

    // Log the admin action (optional)
    logger.info(`Admin ${currentUser.id} updated address for shop ${shopId}.`);

    return existingAddress;
  }
}

export default AddressService;

import AcademicMaterial from "../api/models/AcademicMaterialModel.js";
import AppError from "./HandleAppErrors.js";

export const validateCartItems = async (cartItems) => {
  for (const item of cartItems) {
    const material = await AcademicMaterial.findById(item.material);

    if (!material) {
      throw new AppError(`Material not found: '${item.material}'`, 404);
    }

    // **Check stock for physical or hybrid materials**
    const isPhysicalOrHybrid =
      material.deliveryFormat === "physical" ||
      material.deliveryFormat === "hybrid";
    if (isPhysicalOrHybrid) {
      // Assuming stock is managed in the 'physicalContent' field
      if (
        !material.physicalContent ||
        material.physicalContent.stockQty < item.quantity
      ) {
        throw new AppError(
          `Material '${material.title || "Unknown"}' is out of stock.`,
          400
        );
      }
    }

    // **No stock check needed for digital materials**
    // For digital content, no need to check stock, since it's available for download
    // If other validation rules are needed for digital content (e.g., licenses, delivery), those can be added here
  }
};

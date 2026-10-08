import AcademicMaterial from "../api/models/AcademicMaterialModel.js";
import { logger } from "../utils/logger.js";

export default class StockService {
  /**
   * ✅ Check if stock is sufficient for a given material
   * @param {String} materialId - The ID of the academic material
   * @param {Number} requiredQuantity - The quantity requested
   * @returns {Boolean} - True if there is enough stock, else false
   */
  static async checkStock(materialId, requiredQuantity) {
    const material = await AcademicMaterial.findById(materialId);
    if (!material) throw new Error("Material not found");

    return material.physicalContent.stockQty >= requiredQuantity;
  }

  /**
   * ✅ Deduct stock after a purchase or order confirmation
   * @param {String} materialId - The ID of the academic material
   * @param {Number} quantitySold - The quantity to deduct from stock
   * @returns {Promise<Number>} - Updated stock quantity
   */
  static async deductStock(materialId, quantitySold) {
    const material = await AcademicMaterial.findById(materialId);
    if (!material) throw new Error("Material not found");

    if (material.physicalContent.stockQty < quantitySold) {
      throw new Error(
        `Not enough stock to deduct ${quantitySold} for material ${material.title}`
      );
    }

    material.physicalContent.stockQty -= quantitySold;
    await material.save();

    // Notify for low stock (if stock falls below threshold)
    if (
      material.physicalContent.stockQty <
      material.physicalContent.lowStockThreshold
    ) {
      this.notifyLowStock(material);
    }

    return material.physicalContent.stockQty;
  }

  /**
   * ✅ Add stock to the material inventory (useful for restocking)
   * @param {String} materialId - The ID of the academic material
   * @param {Number} quantity - The quantity to add to the stock
   * @returns {Promise<Number>} - Updated stock quantity
   */
  static async addStock(materialId, quantity) {
    if (quantity <= 0)
      throw new Error("Quantity to add must be greater than zero");

    const material = await AcademicMaterial.findById(materialId);
    if (!material) throw new Error("Material not found");

    material.physicalContent.stockQty += quantity;
    await material.save();

    return material.physicalContent.stockQty;
  }

  /**
   * ✅ Notify stakeholders about low stock levels
   * @param {Object} material - The academic material object
   * @returns {Promise<void>}
   */
  static async notifyLowStock(material) {
    // Simulating a notification mechanism (could integrate with email/SMS services)
    logger.warn(
      `⚠️ Low stock alert: Material "${material.title}" has only ${material.physicalContent.stockQty} left in stock. Please restock soon.`
    );
    // Send email or notification to admin/warehouse team here
  }

  /**
   * ✅ Automatically restock materials if below the minimum threshold
   * @param {String} materialId - The ID of the academic material
   * @param {Number} restockAmount - The amount to restock
   * @returns {Promise<Number>} - Updated stock quantity
   */
  static async autoRestock(materialId, restockAmount) {
    const material = await AcademicMaterial.findById(materialId);
    if (!material) throw new Error("Material not found");

    if (
      material.physicalContent.stockQty >=
      material.physicalContent.lowStockThreshold
    ) {
      return material.physicalContent.stockQty; // No restock needed
    }

    material.physicalContent.stockQty += restockAmount;
    await material.save();

    logger.info(
      `✅ Auto-restock completed: Material "${material.title}" restocked by ${restockAmount}. New stock: ${material.physicalContent.stockQty}`
    );

    return material.physicalContent.stockQty;
  }

  /**
   * ✅ Get stock levels for all materials
   * @returns {Promise<Array>} - List of materials with their current stock
   */
  static async getAllStocks() {
    const materials = await AcademicMaterial.find(
      {},
      "title physicalContent.stockQty"
    );
    return materials.map((material) => ({
      materialId: material._id,
      title: material.title,
      stockQty: material.physicalContent.stockQty,
    }));
  }

  /**
   * ✅ Generate a stock report (useful for admins)
   * @returns {Promise<Object>} - Summary of stock levels
   */
  static async generateStockReport() {
    const materials = await AcademicMaterial.find({}, "title physicalContent");
    const totalStock = materials.reduce(
      (sum, material) => sum + material.physicalContent.stockQty,
      0
    );
    const lowStockMaterials = materials.filter(
      (material) =>
        material.physicalContent.stockQty <
        material.physicalContent.lowStockThreshold
    );

    return {
      totalMaterials: materials.length,
      totalStock,
      lowStockMaterials: lowStockMaterials.map((m) => ({
        materialId: m._id,
        title: m.title,
        stockQty: m.physicalContent.stockQty,
      })),
    };
  }

  /**
   * ✅ Validate stock levels during bulk operations
   * @param {Array} cartItems - List of cart items with materialId and quantity
   * @returns {Promise<Object>} - Validation result with success and failure details
   */
  static async validateStockLevels(cartItems) {
    const result = {
      validItems: [],
      invalidItems: [],
    };

    for (const item of cartItems) {
      const material = await AcademicMaterial.findById(item.materialId);
      if (!material) {
        result.invalidItems.push({
          materialId: item.materialId,
          reason: "Material not found",
        });
        continue;
      }

      if (material.physicalContent.stockQty < item.quantity) {
        result.invalidItems.push({
          materialId: item.materialId,
          title: material.title,
          availableStock: material.physicalContent.stockQty,
          requiredQuantity: item.quantity,
        });
      } else {
        result.validItems.push({
          materialId: item.materialId,
          title: material.title,
          availableStock: material.physicalContent.stockQty,
          requiredQuantity: item.quantity,
        });
      }
    }

    return result;
  }
}

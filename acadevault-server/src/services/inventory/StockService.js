import mongoose from "mongoose";
import { logger } from "../../utils/logger.js";
import AppError from "../../utils/HandleAppErrors.js";

export default class StockService {
  static async checkStock(materialId, requiredQuantity) {
    const material = await mongoose
      .model("AcademicMaterial")
      .findById(materialId);
    if (!material) throw new AppError("Material not found.", 404);
    return material.physicalContent.stockQty >= requiredQuantity;
  }

  static async deductStock(materialId, quantitySold, session = null) {
    const material = await mongoose
      .model("AcademicMaterial")
      .findById(materialId)
      .session(session);
    if (!material) throw new AppError("Material not found.", 404);

    if (material.physicalContent.stockQty < quantitySold) {
      throw new AppError(
        `Not enough stock to deduct ${quantitySold} for material ${material.title}.`,
        400
      );
    }

    material.physicalContent.stockQty -= quantitySold;
    await material.save({ session });

    if (
      material.physicalContent.stockQty <
      material.physicalContent.lowStockThreshold
    ) {
      await this.notifyLowStock(material);
    }

    return material.physicalContent.stockQty;
  }

  static async addStock(materialId, quantity) {
    if (quantity <= 0)
      throw new AppError("Quantity to add must be greater than zero.", 400);

    const material = await mongoose
      .model("AcademicMaterial")
      .findById(materialId);
    if (!material) throw new AppError("Material not found.", 404);

    material.physicalContent.stockQty += quantity;
    await material.save();

    return material.physicalContent.stockQty;
  }

  static async notifyLowStock(material) {
    logger.warn(
      `⚠️ Low stock alert: Material "${material.title}" has only ${material.physicalContent.stockQty} left.`
    );
  }

  static async autoRestock(materialId, restockAmount) {
    const material = await mongoose
      .model("AcademicMaterial")
      .findById(materialId);
    if (!material) throw new AppError("Material not found.", 404);

    if (
      material.physicalContent.stockQty >=
      material.physicalContent.lowStockThreshold
    ) {
      return material.physicalContent.stockQty;
    }

    material.physicalContent.stockQty += restockAmount;
    await material.save();

    logger.info(
      `✅ Auto-restock completed: Material "${material.title}" restocked by ${restockAmount}.`
    );

    return material.physicalContent.stockQty;
  }

  static async getAllStocks() {
    const materials = await mongoose
      .model("AcademicMaterial")
      .find({}, "title physicalContent.stockQty");
    return materials.map((material) => ({
      materialId: material._id,
      title: material.title,
      stockQty: material.physicalContent.stockQty,
    }));
  }

  static async generateStockReport() {
    const materials = await mongoose
      .model("AcademicMaterial")
      .find({}, "title physicalContent");
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

  static async validateStockLevels(cartItems) {
    const result = { validItems: [], invalidItems: [] };
    for (const item of cartItems) {
      const material = await mongoose
        .model("AcademicMaterial")
        .findById(item.materialId);
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

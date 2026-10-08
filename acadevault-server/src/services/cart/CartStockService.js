import AcademicMaterial from '../../api/models/AcademicMaterialModel.js';
import { logger } from '../../utils/logger.js';
import AppError from '../../utils/HandleAppErrors.js';

class CartStockService {
  /**
   * ✅ Deduct stock from a physical academic material (transaction/session-safe)
   * - Validates material existence and available quantity
   * - Deducts stock inside an active transaction session
   * - Logs and optionally notifies if stock drops below threshold
   *
   * @param {String|ObjectId} materialId - ID of the academic material
   * @param {Number} quantity - Quantity to deduct
   * @param {mongoose.ClientSession} session - Mongoose transaction session
   * @returns {Promise<Number>} - New stock quantity
   */
  static async deductStock(materialId, quantity, session) {
    if (!session) throw new Error('Transaction session required for stock deduction');

    const material = await AcademicMaterial.findById(materialId).session(session);

    if (!material) {
      throw new AppError(`Material with ID ${materialId} not found`, 404);
    }

    const stock = material.physicalContent?.stockQty ?? 0;

    if (stock < quantity) {
      throw new AppError(
        `Insufficient stock for "${material.title}". Available: ${stock}, Requested: ${quantity}`,
        400
      );
    }

    material.physicalContent.stockQty -= quantity;

    await material.save({ session });

    // Notify on low stock
    const lowThreshold = material.physicalContent?.lowStockThreshold ?? 0;
    if (material.physicalContent.stockQty < lowThreshold) {
      logger.warn(
        `⚠️ Low stock alert for "${material.title}": ${material.physicalContent.stockQty} remaining.`
      );
      // Optionally trigger NotificationService here
    }

    logger.info(
      `✅ Stock deducted for "${material.title}". Remaining: ${material.physicalContent.stockQty}`
    );
    return material.physicalContent.stockQty;
  }

  /**
   * ✅ Existing method: Verify stock for all physical items in cart
   */
  static async verifyStock(cart, session = null) {
    try {
      const materialIds = cart.items.map((item) => {
        const mat = item.material;
        return mat && mat._id ? mat._id.toString() : mat.toString();
      });

      const query = AcademicMaterial.find({ _id: { $in: materialIds } }).select(
        'isDigital deliveryFormat physicalContent.stockQty title'
      );
      if (session) query.session(session);

      const materials = await query.lean();
      const materialMap = new Map(materials.map((m) => [m._id.toString(), m]));

      for (const item of cart.items) {
        const matId = item.material?._id?.toString() || item.material?.toString();
        const material = materialMap.get(matId);
        if (!material) {
          throw new AppError(`Material not found for item ID "${matId}"`, 400);
        }

        const isDigital = material.deliveryFormat === 'digital' || material.isDigital;
        if (isDigital) continue;

        const available = material.physicalContent?.stockQty ?? 0;
        if (available < item.quantity) {
          throw new AppError(
            `Insufficient stock for "${material.title}". Available: ${available}`,
            400
          );
        }
      }
    } catch (error) {
      logger.error(`Stock verification failed: ${error.message}`, {
        cartId: cart._id?.toString(),
      });
      throw error;
    }
  }
}

export default CartStockService;

// import mongoose from "mongoose";
// import { logger } from "../../utils/logger.js";
// import AppError from "../../utils/HandleAppErrors.js";

// class CartStockService {
//   /**
//    * Validates stock for all physical items in the cart.
//    * - Skips digital materials entirely.
//    * - Works whether `item.material` is an ObjectId or a populated doc.
//    *
//    * @param {Cart} cart - Mongoose Cart document with `items`.
//    * @throws {AppError} on missing material or insufficient stock.
//    */

//   static async verifyStock(cart, session = null) {
//     try {
//       const materialIds = cart.items.map((item) => {
//         const mat = item.material;
//         return mat && mat._id ? mat._id.toString() : mat.toString();
//       });

//       const query = mongoose
//         .model('AcademicMaterial')
//         .find({ _id: { $in: materialIds } })
//         .select('isDigital deliveryFormat physicalContent.stockQty title');

//       if (session) query.session(session);

//       const materials = await query.lean();
//       const materialMap = new Map(materials.map((m) => [m._id.toString(), m]));

//       for (const item of cart.items) {
//         const matId =
//           item.material && item.material._id
//             ? item.material._id.toString()
//             : item.material.toString();

//         const material = materialMap.get(matId);
//         if (!material) {
//           throw new AppError(`Material not found for item ID "${matId}"`, 400);
//         }

//         const isDigital = material.deliveryFormat === 'digital' || material.isDigital;
//         if (isDigital) continue;

//         const available = material.physicalContent?.stockQty ?? 0;
//         if (available < item.quantity) {
//           throw new AppError(
//             `Insufficient stock for "${material.title}". Available: ${available}`,
//             400
//           );
//         }
//       }
//     } catch (error) {
//       logger.error(`Stock verification failed: ${error.message}`, {
//         cartId: cart._id?.toString(),
//       });
//       throw error;
//     }
//   }

// }

// export default CartStockService;

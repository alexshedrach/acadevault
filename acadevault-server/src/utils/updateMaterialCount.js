// utils/updateMaterialCounts.js
import mongoose from 'mongoose';
import Category from '../api/models/CategoryModel.js';
import AppError from './HandleAppErrors.js';
import { logger } from './logger.js';

async function getAllParentCategoryIds(categoryIds) {
  const visited = new Set();
  const queue = [...categoryIds];

  while (queue.length) {
    const id = queue.shift();
    if (!mongoose.Types.ObjectId.isValid(id) || visited.has(id)) continue;

    visited.add(id);
    const cat = await Category.findById(id).select("parentCategory").lean();
    if (cat?.parentCategory && !visited.has(String(cat.parentCategory))) {
      queue.push(String(cat.parentCategory));
    }
  }

  return Array.from(visited);
}


/**
 * Update material counts across all related category fields.
 * Only applies if material is published.
 * @param {object} materialDoc - Full AcademicMaterial doc.
 * @param {number} change - +1 (increment) or -1 (decrement)
 */
export async function updateMaterialCounts(materialDoc, change) {
  if (!materialDoc || typeof materialDoc !== 'object') {
    throw new AppError('Material document is required', 400);
  }
  if (typeof change !== 'number' || !Number.isInteger(change)) {
    throw new AppError('Change must be +1 or -1', 400);
  }

  // Only apply to published materials
  if (materialDoc.status !== 'published') {
    logger.info(
      `Skipping material count update (status = ${materialDoc.status})`,
    );
    return;
  }

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const categoryIdSet = new Set();

    // Add all categories
    if (Array.isArray(materialDoc.categories)) {
      materialDoc.categories.forEach((id) => {
        if (mongoose.Types.ObjectId.isValid(id)) categoryIdSet.add(String(id));
      });
    }

    // Add department
    if (mongoose.Types.ObjectId.isValid(materialDoc.department)) {
      categoryIdSet.add(String(materialDoc.department));
    }

    // Add materialType if it's used as a category
    // if (mongoose.Types.ObjectId.isValid(materialDoc.materialType)) {
    //   categoryIdSet.add(String(materialDoc.materialType));
    // }
    if (materialDoc.materialType) {
      const materialTypes = Array.isArray(materialDoc.materialType)
        ? materialDoc.materialType
        : [materialDoc.materialType];

      await Category.updateMany(
        {
          categoryType: 'Material Type',
          materialTypes: { $in: materialTypes },
        },
        { $inc: { materialCount: change } },
        { session },
      );
    }


    // Fetch parent categories
    // const categories = await Category.find({
    //   _id: { $in: Array.from(categoryIdSet) },
    // }).select('_id parentCategory');

    // categories.forEach((cat) => {
    //   if (mongoose.Types.ObjectId.isValid(cat.parentCategory)) {
    //     categoryIdSet.add(String(cat.parentCategory));
    //   }
    // });
    const allCategoryIds = await getAllParentCategoryIds([...categoryIdSet]);

    if (allCategoryIds.size === 0) {
      logger.warn("No valid category IDs found to update counts");
      await session.abortTransaction();
      session.endSession();
      return;
    }

    // Bulk update
    const result = await Category.updateMany(
      { _id: { $in: Array.from(categoryIdSet) } },
      { $inc: { materialCount: change } },
      { session },
    );

    await session.commitTransaction();
    session.endSession();

    logger.info(
      `Material counts updated for ${categoryIdSet.size} categories. Change: ${change}. Matched: ${result.matchedCount}, Modified: ${result.modifiedCount}`,
    );
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    logger.error('Error updating material counts:', error);
    throw new AppError(`Material count update failed: ${error.message}`, 500);
  }
}

// import mongoose from "mongoose";
// import Category from "../api/models/CategoryModel.js";
// import AppError from "./HandleAppErrors.js";
// import { logger } from "./logger.js";

// /**
//  * Utility function to update material count on the category.
//  * @param {string} categoryId - The ID of the category whose material count needs to be updated.
//  * @param {number} change - The change in material count (1 for adding, -1 for removing).
//  */
// export async function updateMaterialCount(categoryId, change) {
//   const session = await mongoose.startSession();
//   session.startTransaction();

//   try {
//     // Validate inputs
//     if (!categoryId) {
//       throw new AppError("Category ID is required", 400);
//     }

//     if (!mongoose.Types.ObjectId.isValid(categoryId)) {
//       throw new AppError("Invalid Category ID", 400);
//     }

//     if (typeof change !== "number" || !Number.isInteger(change)) {
//       throw new AppError("Change must be an integer", 400);
//     }

//     // Find and update the category material count
//     const updatedCategory = await Category.findByIdAndUpdate(
//       categoryId,
//       { $inc: { materialCount: change } }, // Increment or decrement the material count
//       { new: true, session } // Ensure the update happens within the transaction
//     );

//     if (!updatedCategory) {
//       throw new AppError("Category not found", 404);
//     }

//     // Commit the transaction
//     await session.commitTransaction();
//     session.endSession();

//     // Log successful update
//     logger.info(
//       `Category ${updatedCategory.name} material count updated. New count: ${updatedCategory.materialCount}`
//     );
//   } catch (error) {
//     // Rollback transaction if something fails
//     await session.abortTransaction();
//     session.endSession();

//     // Log the error and throw a detailed AppError
//     logger.error("Error updating material count:", error.message);
//     throw new AppError(`Error updating material count: ${error.message}`, 500);
//   }
// }

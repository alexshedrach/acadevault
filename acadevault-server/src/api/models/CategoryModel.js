import mongoose from "mongoose";
import { MediaField } from "./mediaFieldSchema.js";
import AppError from "../../utils/HandleAppErrors.js";
import { validateCategoryData } from "../validations/validateCategory.js";
import { CATEGORY_TYPES } from "../../constants/enums.js";
import { generateUniqueSlug } from "../../helper/generateUniqueSlug.js";
import { logger } from "../../utils/logger.js";
import {
  assignDefaultMaterialTypes,
  getAllMaterialTypes,
  validateMaterialTypes,
} from "../../utils/validateMaterialTypes.js";
import computeMaterialCountForCategory from "../../utils/computeMaterialCountForCategory.js";

// Schema setup
const { Schema, model } = mongoose;
const { ObjectId } = Schema;

// Category Schema Definition
const CategorySchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Category name is required"],
      trim: true,
      unique: true,
      maxlength: [100, "Category name cannot exceed 100 characters"],
    },
    // Description for the category (optional)
    description: {
      type: String,
      trim: true,
      maxlength: [500, "Description cannot exceed 500 characters"],
    },
    parentCategory: {
      type: ObjectId,
      ref: "Category", // Reference to itself for hierarchical structure
      default: null, // Root categories won't have a parent
    },
    slug: {
      type: String,
      unique: true, // Ensure a URL-friendly version of the category
      lowercase: true,
      // required: true,
    },
    // Type of category (e.g., Academic Discipline, Material Type, etc.)
    categoryType: {
      type: String,
      required: [true, "Category type is required"],
      enum: CATEGORY_TYPES,
    },

    image: MediaField, // Embedded media field for image,

    materialTypes: {
      type: [
        {
          type: String,
          enum: getAllMaterialTypes(),
        },
      ],
      default: function () {
        return assignDefaultMaterialTypes.call(this);
      },
      validate: {
        validator: validateMaterialTypes,
        message:
          "At least one material type is required for Material Type and Department categories.",
      },
    },

    materialCount: {
      type: Number,
      default: 0, // Default value if no materials exist
    },

    active: {
      type: Boolean,
      default: true, // Controls whether the category is visible to users
    },
    sortOrder: {
      type: Number,
      default: 0, // Sort order for displaying categories in UI
      required: true,
    },
    createdBy: {
      type: ObjectId,
      ref: "User", // Admin or system who created the category
      required: true,
    },
    updatedBy: {
      type: ObjectId,
      ref: "User", // Admin or system who last updated the category
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// ======= Indexing =======

// Add text index for better search performance
CategorySchema.index({ name: "text", description: "text" });
CategorySchema.index({ categoryType: 1, active: 1 });

// ======= Virtual Fields =======

// Virtual to get subcategories linked to this category
CategorySchema.virtual("subcategories", {
  ref: "Category",
  localField: "_id",
  foreignField: "parentCategory",
  options: { match: { active: true } },
});

// Virtual to get academic materials directly
CategorySchema.virtual("materials", {
  ref: "AcademicMaterial",
  localField: "_id",
  foreignField: "categories",
  options: { match: { isPublished: true } },
});

// ======= Middleware =======

/**
 * Generate a slug for a category before saving.
 * Ensures unique slugs by checking existing records.
 */

// CategorySchema.pre('save', async function (next) {
//   try {
//     // Ensure slug generation only happens if `name` field is being set or changed
//     if (this.name) {
//       const slug = await generateUniqueSlug(this.constructor, this.name); // `this.constructor` gives access to the model
//       this.slug = slug;
//     }
//     next();
//   } catch (error) {
//     next(error);
//   }
// });

// // Pre-findOneAndUpdate middleware for update operation
// CategorySchema.pre('findOneAndUpdate', async function (next) {
//   try {
//     const update = this.getUpdate(); // Get the update document

//     // Only generate slug if the name is part of the update
//     if (update.name) {
//       const slug = await generateUniqueSlug(this.model, update.name); // `this.model` gives access to the model
//       update.slug = slug;
//     }
//     next();
//   } catch (error) {
//     next(error);
//   }
// });

// Slug should only be generated if the name changes
CategorySchema.pre("save", async function (next) {
  if (this.isModified("name")) {
    this.slug = await generateUniqueSlug(this.constructor, this.name);
  }
  next();
});

CategorySchema.pre("findOneAndUpdate", async function (next) {
  const update = this.getUpdate();
  if (update?.name) {
    update.slug = await generateUniqueSlug(this.model, update.name);
  }
  next();
});

// Prevent Duplicate Parent-Child Cycles: Ensure a category cannot be set as its own parent or create circular relationships.
CategorySchema.pre("save", async function (next) {
  try {
    if (this.parentCategory) {
      const parent = await model("Category").findById(this.parentCategory);
      if (!parent) {
        return next(new AppError("Parent category does not exist.", 404));
      }
      if (this._id && this.parentCategory.equals(this._id)) {
        return next(new AppError("A category cannot be its own parent.", 400));
      }
    }
    next();
  } catch (error) {
    next(error); // Pass error to the next middleware (error handler)
  }
});

// Middleware to update materialCount on save/remove
// CategorySchema.pre('save', async function (next) {
//   if (!this.isModified('categories')) return next(); // Skip if categories aren't modified

//   try {
//     const count = await AcademicMaterial.countDocuments({
//       categories: this._id,
//     });
//     this.set('materialCount', count); // Efficiently update only if needed
//   } catch (error) {
//     return next(error);
//   }

//   next();
// });

// Optimized materialCount update in post-save & post-remove
CategorySchema.post(["save", "remove"], async function () {
  const materialCount = await computeMaterialCountForCategory(this);
  await this.model("Category").updateOne(
    { _id: this._id },
    { $set: { materialCount } }
  );
});

// Middleware to prevent deletion of categories with subcategories
CategorySchema.pre("remove", async function (next) {
  try {
    const hasSubcategories = await this.hasSubcategories();
    if (hasSubcategories) {
      return next(
        new AppError("Cannot delete category with existing subcategories.", 400)
      );
    }
    next();
  } catch (error) {
    next(error);
  }
});

// ======= Static Methods =======

// Recursive function to fetch all subcategories
CategorySchema.statics.getAllSubcategoryIds = async function (categoryId) {
  try {
    const categories = await this.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(categoryId) } }, // Match the parent category
      {
        $graphLookup: {
          from: "categories",
          startWith: "$_id",
          connectFromField: "_id",
          connectToField: "parentCategory",
          as: "subcategories",
        },
      },
      { $project: { "subcategories._id": 1 } }, // Only include subcategory IDs
    ]);

    return categories[0]?.subcategories.map((sub) => sub._id) || [];
  } catch (error) {
    logger.error("Error in getAllSubcategoryIds:", error);
    throw new AppError("Failed to retrieve subcategories.", 500);
  }
};

// Delete a category and handle reassignment or cascading delete of subcategories.
// CategorySchema.statics.deleteCategory = async function (
//   categoryId,
//   cascadeDelete = true,
// ) {
//   try {
//     const category = await this.findById(categoryId);

//     if (!category) {
//       throw new AppError('Category not found', 404);
//     }

//     if (cascadeDelete) {
//       // Log category deletion before deleting
//       logger.info(
//         `Cascade deleting category: ${category.name} and its subcategories`,
//       );

//       // Delete all subcategories recursively
//       const subcategories = await this.getAllSubcategoryIds(categoryId);
//       const subcategoryIds = subcategories.map((cat) => cat._id);
//       await this.deleteMany({ _id: { $in: subcategoryIds } });
//     } else {
//       // Reassign subcategories to the parent of the deleted category
//       await this.updateMany(
//         { parentCategory: categoryId },
//         { parentCategory: category.parentCategory },
//       );
//     }

//     // Delete the category itself
//     await this.findByIdAndDelete(categoryId);
//   } catch (error) {
//     logger.error('Error in Deleting Category:', error);
//     throw new AppError('Error occurred while deleting the category.', 500);
//   }
// };

// Optimized category deletion with `$graphLookup`
CategorySchema.statics.deleteCategory = async function (
  categoryId,
  cascadeDelete = true
) {
  const category = await this.findById(categoryId);
  if (!category) throw new AppError("Category not found", 404);

  const subcategories = await this.aggregate([
    { $match: { _id: new mongoose.Types.ObjectId(categoryId) } },
    {
      $graphLookup: {
        from: "categories",
        startWith: "$_id",
        connectFromField: "_id",
        connectToField: "parentCategory",
        as: "subcategories",
      },
    },
    { $project: { "subcategories._id": 1 } },
  ]);

  const subcategoryIds =
    subcategories[0]?.subcategories.map((sub) => sub._id) || [];

  if (cascadeDelete) {
    await this.deleteMany({ _id: { $in: subcategoryIds } });
  } else {
    await this.updateMany(
      { parentCategory: categoryId },
      { parentCategory: category.parentCategory }
    );
  }

  await this.findByIdAndDelete(categoryId);
};

// method getAnalytics to the Category model:
CategorySchema.statics.getAnalytics = async function (categoryId) {
  try {
    // Check if the category exists
    const categoryExists = await this.findById(categoryId);
    if (!categoryExists) return null;

    // Perform aggregation for category analytics
    const analytics = await this.aggregate([
      {
        $match: { _id: categoryExists._id }, // Match the specific category
      },
      {
        $lookup: {
          from: "academicMaterials", // Collection to join with
          localField: "_id", // Local field in Category
          foreignField: "category", // Foreign field in AcademicMaterial
          as: "materials", // Alias for joined data
        },
      },
      {
        $project: {
          name: 1, // Include category name
          description: 1, // Include category description
          categoryType: 1, // Include category type
          materialCount: { $size: "$materials" }, // Count of materials
        },
      },
    ]);

    // Return the first item in analytics array or null if empty
    return analytics[0] || null;
  } catch (error) {
    logger.error("Error in getting category Analytics:", error);
    throw new AppError("Failed to retrieve category analytics.", 500);
  }
};

// Bulk create categories with parent-child relationships.
// Bulk create categories with parent-child relationships.
CategorySchema.statics.bulkCreate = async function (categories) {
  if (!Array.isArray(categories) || categories.length === 0) {
    throw new AppError(
      "Invalid input: categories must be a non-empty array.",
      400
    );
  }

  try {
    const bulkOperations = [];
    const parentCategoryMap = new Map(); // Cache parent categories for efficiency

    // Collect unique parentCategory IDs for batch fetching
    const parentIds = [
      ...new Set(
        categories
          .filter((category) => category.parentCategory)
          .map((category) => category.parentCategory)
      ),
    ];

    if (parentIds.length > 0) {
      const parentCategories = await this.find({
        _id: { $in: parentIds },
      }).select("_id");
      parentCategories.forEach((parent) => {
        parentCategoryMap.set(parent._id.toString(), parent._id);
      });
    }

    // First pass: Validate input and prepare bulk operations
    for (const category of categories) {
      const {
        name,
        description,
        categoryType,
        materialTypes,
        parentCategory,
        sortOrder,
        createdBy,
      } = category;

      // Valide category Data
      validateCategoryData(category);

      const slug = await generateUniqueSlug(this, category.name);

      // Resolve parent category ID
      const parentCategoryId = parentCategory
        ? parentCategoryMap.get(parentCategory) || null
        : null;

      if (parentCategory && !parentCategoryId) {
        throw new AppError(
          `Parent category with ID '${parentCategory}' does not exist for category '${name}'.`,
          404
        );
      }

      // Prepare operation for bulk insertion
      bulkOperations.push({
        name,
        description: description || "",
        categoryType,
        materialTypes,
        slug,
        parentCategory: parentCategoryId,
        sortOrder: sortOrder || 0,
        createdBy,
      });
    }

    // Perform bulk insert
    const createdCategories = await this.insertMany(bulkOperations);

    return createdCategories;
  } catch (error) {
    console.log(error);
    logger.error(
      "Error during bulk category creation:",
      error.message,
      error.stack
    );
    throw new AppError("Error occurred during bulk category creation.", 500);
  }
};

// ======= Instance Methods =======

// Check if the category has any subcategories.
CategorySchema.methods.hasSubcategories = async function () {
  const count = await this.model("Category")
    .countDocuments({
      parentCategory: this._id,
    })
    .lean(); // `.lean()` makes the query more efficient for read operations
  return count > 0;
};

// Get Full Path of a Category: Retrieve the full hierarchy path of a category (e.g., Books > Science > Physics).
CategorySchema.methods.getFullPath = async function () {
  try {
    const path = await this.constructor.aggregate([
      {
        $match: { _id: this._id },
      },
      {
        $graphLookup: {
          from: "categories",
          startWith: "$parentCategory",
          connectFromField: "_id",
          connectToField: "parentCategory",
          as: "path",
          depthField: "level",
        },
      },
      {
        $project: {
          path: { $reverseArray: "$path.name" }, // Reverse for correct order
        },
      },
    ]);
    return path[0]?.path?.join(" > ") || this.name;
  } catch (error) {
    logger.error("Error in Getting Category Full Path:", error);
    throw new AppError("Failed to retrieve category path.", 500);
  }
};
/// Export Model ///
const Category = model("Category", CategorySchema);

export default Category;

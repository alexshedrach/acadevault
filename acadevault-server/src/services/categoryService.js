import mongoose from "mongoose";
import AcademicMaterial from "../api/models/AcademicMaterialModel.js";
import Category from "../api/models/CategoryModel.js";
import { validateCategoryData } from "../api/validations/validateCategory.js";
import { ACADEMIC_LEVELS } from "../constants/enums.js";
import { getDegreesByLevel } from "../helper/getDegreesByLevel.js";
import ApiFeatures from "../utils/ApiFeatures.js";
import AppError from "../utils/HandleAppErrors.js";
import { validateObjectId } from "../utils/validateObjectId.js";

class CategoryService {
  /**
   * Get the parent category ID, if applicable.
   * @param {string} parentCategory - Parent category ID.
   * @returns {string|null} - Valid parent category ID or null.
   */
  static async getParentCategoryId(parentCategory) {
    if (!parentCategory) return null;

    const parentCategoryDoc = await Category.findById(parentCategory);
    if (!parentCategoryDoc) {
      throw new AppError("Parent category does not exist", 404);
    }

    return parentCategoryDoc._id;
  }

  /**
   * Create a new category.
   * @param {Object} categoryData - Data for the new category.
   * @returns {Object} - Newly created category.
   */
  static async createCategory(categoryData) {
    const {
      name,
      description,
      parentCategory,
      materialTypes,
      categoryType,
      sortOrder,
      active,
      createdBy,
    } = categoryData;

    // Validate input data
    validateCategoryData({ name, categoryType, materialTypes });

    // Validate parent category
    const parentCategoryId = await this.getParentCategoryId(parentCategory);

    // Create the category
    return await Category.create({
      name,
      description,
      parentCategory: parentCategoryId,
      materialTypes,
      categoryType,
      sortOrder: sortOrder || 0,
      active: active ?? true,
      createdBy,
      updatedBy: createdBy,
    });
  }

  // Update the category
  static async updateCategoryService(categoryId, categoryData) {
    const {
      name,
      description,
      parentCategory,
      categoryType,
      sortOrder,
      materialTypes,
    } = categoryData;

    // Validate input data
    // validateCategoryData({ name, categoryType, materialTypes });

    // Validate parent category
    const parentCategoryId = await this.getParentCategoryId(parentCategory);

    // Prevent setting a category as its own parent
    if (categoryId === parentCategory) {
      throw new AppError("A category cannot be its own parent.", 400);
    }

    // Update the category document
    const category = await Category.findByIdAndUpdate(
      categoryId,
      {
        name,
        description,
        parentCategory: parentCategoryId,
        categoryType,
        sortOrder,
        materialTypes,
        updatedBy: categoryData.updatedBy, // Assuming the request has updatedBy
      },
      { new: true, runValidators: true }
    );

    if (!category) {
      throw new AppError("Category not found", 404);
    }
    return category;
  }

  /**
   * Update the sort order for multiple categories
   * @param {Array} categories - Array of category objects with id and sortOrder
   */
  static async updateSortOrder(categories) {
    const updates = categories.map(({ id, sortOrder }) => {
      return Category.findByIdAndUpdate(id, { sortOrder }, { new: true });
    });

    // Execute all the updates simultaneously
    const updatedCategories = await Promise.all(updates);

    // Check if any category failed to update
    if (updatedCategories.some((category) => !category)) {
      throw new AppError(
        "One or more categories not found or failed to update",
        404
      );
    }

    return updatedCategories;
  }

  /**
   * Get all categories with pagination, filtering, sorting, and searching.
   * @param {Object} queryParams - The query parameters from the request.
   * @param {Number} page - The page number.
   * @param {Number} limit - The number of items per page.
   * @returns {Object} - The categories and pagination metadata.
   */
  static async getAllCategoriesService(queryParams) {
    // Ensure `limit` is correctly extracted and defaults to 10
    const limit = queryParams.limit ? parseInt(queryParams.limit, 10) : 10;

    // Initialize query features with the `Category` model and query parameters
    const features = new ApiFeatures(
      Category.find().populate("parentCategory", "name slug"),
      queryParams
    )
      .filter()
      .search(["name", "description"])
      .sort()
      .limitFields();

    // Apply pagination with dynamic page and limit
    await features.pagination(limit);

    // Execute the query to get categories
    const categories = await features.query;

    if (!categories.length) {
      return {
        categories: [],
        paginationMetadata: { ...features.paginationMetadata, totalResults: 0 },
        message:
          "No categories available at the moment. Please check back later.", // Add a message here
      };
    }

    return { categories, paginationMetadata: features.paginationMetadata };
  }

  /**
   * Get all parent categories (those without a parent).
   * @param {Object} queryParams - The query parameters from the request.
   * @param {Number} page - The page number for pagination.
   * @param {Number} limit - The number of items per page.
   * @returns {Object} - The parent categories and pagination metadata.
   */
  static async getParentCategoriesService(queryParams) {
    const apiFeatures = new ApiFeatures(Category.find(), queryParams)
      .filter()
      .sort()
      .limitFields();

    // ✅ Ensure we only get parent categories after filtering
    apiFeatures.query = apiFeatures.query.find({ parentCategory: null });

    // ✅ Apply pagination correctly
    await apiFeatures.pagination();

    const parentCategories = await apiFeatures.query;

    if (!parentCategories.length) {
      return {
        parentCategories: [],
        message: "No parent categories found! Please check back later.", // Message for the user
        paginationMetadata: {
          ...apiFeatures.paginationMetadata,
          totalResults: 0,
        },
      };
    }

    return {
      parentCategories,
      paginationMetadata: apiFeatures.paginationMetadata,
    };
  }

  /**
   * Get all subcategories recursively based on the parent category ID.
   * @param {String} parentId - The parent category ID.
   * @param {Object} queryParams - The query parameters from the request.
   * @param {Number} page - The page number for pagination.
   * @param {Number} limit - The number of items per page.
   * @returns {Object} - The subcategories and pagination metadata.
   */
  static async getSubcategoriesService(parentCategoryId, queryParams) {
    // Ensure the parent category exists
    const parentCategory = await Category.findById(parentCategoryId);
    if (!parentCategory) {
      throw new AppError(
        "Parent category not found! Please check back later.",
        404
      );
    }

    // Fetch all subcategory IDs recursively
    const subcategoryIds =
      await Category.getAllSubcategoryIds(parentCategoryId);
    if (!subcategoryIds.length) {
      return { subcategories: [], paginationMetadata: {} };
    }

    // Query to fetch subcategories using IDs
    const query = Category.find({ _id: { $in: subcategoryIds }, active: true });

    // Apply query features (filtering, sorting, etc.)
    const apiFeatures = new ApiFeatures(query, queryParams)
      .filter()
      .search(["name", "description"]) // Allow search on name and description
      .sort()
      .limitFields();

    // Apply pagination
    await apiFeatures.pagination();

    const subcategories = await apiFeatures.query;

    if (!subcategories.length) {
      return {
        subcategories: [],
        message: "No sub-categories found! Please check back later.", // Message for the user
        paginationMetadata: {
          ...apiFeatures.paginationMetadata,
          totalResults: 0,
        },
      };
    }

    return {
      subcategories,
      paginationMetadata: apiFeatures.paginationMetadata,
    };
  }

  static async getCategoryByIdService(categoryIdOrSlug, queryString) {
    let categoryDoc;

    // 🔍 Step 1: Find category by ID or fallback to slug
    const isObjectId = mongoose.Types.ObjectId.isValid(categoryIdOrSlug);
    if (isObjectId) {
      categoryDoc = await Category.findById(categoryIdOrSlug);
    }
    if (!categoryDoc) {
      categoryDoc = await Category.findOne({ slug: categoryIdOrSlug });
    }

    if (!categoryDoc) {
      throw new AppError("Category not found", 404);
    }

    // 🔄 Step 2: Fetch category with subcategories and parent
    const subcategoriesQuery = Category.findById(categoryDoc._id)
      .populate("parentCategory", "name slug")
      .populate({
        path: "subcategories",
        select: "name slug",
        match: { active: true },
      });

    const subcategoriesFeatures = new ApiFeatures(
      subcategoriesQuery,
      queryString
    );
    await subcategoriesFeatures.pagination();
    const category = await subcategoriesFeatures.query.lean({ virtuals: true });

    // 🧠 Step 3: Prepare filter for counting related materials
    const baseFilter = {
      isPublished: true,
      isDeleted: false,
    };

    switch (category.categoryType) {
      case "Material Type":
        baseFilter.materialType = category.name;
        break;

      case "Department":
        baseFilter.department = category._id;
        break;

      default:
        baseFilter.categories = { $in: [category._id] };
        break;
    }

    // 🧮 Step 4: Fetch statistics
    const materialIds = await AcademicMaterial.find(baseFilter).select("_id");
    const ids = materialIds.map((m) => m._id);

    const stats = await AcademicMaterial.aggregate([
      { $match: { _id: { $in: ids } } },
      {
        $group: {
          _id: null,
          totalViews: { $sum: "$analytics.viewsCount" },
          totalDownloads: { $sum: "$analytics.downloadsCount" },
          totalRating: { $sum: "$rating" },
          countRating: {
            $sum: {
              $cond: [{ $ifNull: ["$rating", false] }, 1, 0],
            },
          },
        },
      },
    ]);

    const {
      totalViews = 0,
      totalDownloads = 0,
      totalRating = 0,
      countRating = 0,
    } = stats[0] || {};

    const averageRating = countRating ? totalRating / countRating : null;

    // 🕒 Step 5: Count new materials in last 30 days
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const newMaterialsCount = await AcademicMaterial.countDocuments({
      ...baseFilter,
      createdAt: { $gte: thirtyDaysAgo },
    });

    const totalMaterials = ids.length;

    // ✅ Step 6: Return final structured response
    return {
      id: category._id,
      name: category.name,
      description: category.description,
      categoryType: category.categoryType,
      sortOrder: category.sortOrder,
      slug: category.slug,
      parent: category.parentCategory || null,
      subcategories: category.subcategories || [],
      totalMaterials,
      totalViews,
      totalDownloads,
      averageRating,
      newMaterialsCount,
      createdAt: category.createdAt,
      updatedAt: category.updatedAt,
      subcategoriesMeta: subcategoriesFeatures.paginationMetadata,
    };
  }

  /**
   * Bulk delete categories, optionally with cascading deletion.
   * @param {Array} ids - Array of category IDs to delete
   * @param {boolean} cascadeDelete - Whether to perform cascading delete
   */
  static async bulkDeleteCategories(categoryIds, cascadeDelete = false) {
    console.log(categoryIds);

    // Validate that all categories exist
    const categories = await Category.find({ _id: { $in: categoryIds } });

    if (categories.length !== categoryIds.length) {
      throw new AppError("Some categories not found", 404);
    }

    // Perform cascading delete for each category if necessary
    if (cascadeDelete) {
      for (const category of categories) {
        await this.deleteCategory(category._id, true);
      }
    } else {
      // Delete categories without cascading
      await Category.deleteMany({ _id: { $in: categoryIds } });
    }
  }

  /**
   * Fetch academic levels along with their respective degrees
   * @returns {Array} - List of academic levels mapped with their degrees
   */
  static async getAllAcademicLevelsWithDegreesService() {
    return Object.values(ACADEMIC_LEVELS).map((level) => ({
      level,
      degrees: getDegreesByLevel(level),
    }));
  }

  /**
   * Fetch all departments (subcategories with categoryType: "Department").
   * @param {Object} queryParams - Query parameters for filtering, sorting, and pagination.
   */
  static async getDepartmentsService(queryParams) {
    // Fetch departments directly without filtering by parentCategoryId
    const query = Category.find({ categoryType: "Department", active: true });

    // Apply query features (filtering, sorting, etc.)
    const apiFeatures = new ApiFeatures(query, queryParams)
      .filter()
      .search(["name", "description"]) // Allow search on name and description
      .sort()
      .limitFields();

    // Apply pagination
    await apiFeatures.pagination();

    const departments = await apiFeatures.query;

    if (!departments.length) {
      return {
        departments: [],
        message: "No Department categories found. Please check back later.", // Message for the user
        paginationMetadata: {
          ...apiFeatures.paginationMetadata,
          totalResults: 0,
        },
      };
    }

    return {
      departments,
      paginationMetadata: apiFeatures.paginationMetadata,
    };
  }

  static async getRelatedDepartmentsService(departmentId, queryParams) {
    // 1. Fetch the current department
    const currentDepartment = await Category.findOne({
      _id: departmentId,
      categoryType: "Department",
      active: true,
    });

    if (!currentDepartment) {
      throw new Error("The specified department was not found or is inactive.");
    }

    // 2. Query siblings (related departments) under the same parent
    const query = Category.find({
      parentCategory: currentDepartment.parentCategory, // siblings
      _id: { $ne: departmentId }, // exclude current department
      categoryType: "Department",
      active: true,
    });

    // 3. Apply filters, sorting, pagination
    const apiFeatures = new ApiFeatures(query, queryParams)
      .filter()
      .search(["name", "description"])
      .sort()
      .limitFields();

    await apiFeatures.pagination();

    const relatedDepartments = await apiFeatures.query;

    if (!relatedDepartments.length) {
      return {
        relatedDepartments: [],
        message: "No related departments found.",
        paginationMetadata: {
          ...apiFeatures.paginationMetadata,
          totalResults: 0,
        },
      };
    }

    return {
      relatedDepartments,
      message: "Related departments retrieved successfully.",
      paginationMetadata: apiFeatures.paginationMetadata,
    };
  }

  /**
   * Fetch departments that contain materials for the selected material type.
   * @param {string} materialType - The material type to filter departments by.
   * @param {object} queryString - Query parameters for sorting, pagination, etc.
   * @returns {Promise<object>} - Departments with pagination metadata.
   */
  static async getDepartmentsByMaterialType(materialType, queryString) {
    // Get all departments that have the selected material type
    const departmentsWithMaterials = await Category.aggregate([
      {
        $match: {
          categoryType: "Department",
          materialTypes: materialType, // Ensure material type is in the array
        },
      },
      {
        $lookup: {
          from: "academicmaterials", // Collection name for academic materials
          localField: "_id",
          foreignField: "department", // Assuming academic materials reference department
          as: "materials",
        },
      },
      {
        $match: {
          "materials.0": { $exists: true }, // Ensure at least one material exists
        },
      },
      {
        $project: {
          _id: 1,
          name: 1,
          slug: 1,
          description: 1,
          materialCount: { $size: "$materials" },
        },
      },
    ]);

    if (!departmentsWithMaterials || departmentsWithMaterials.length === 0) {
      throw new AppError(
        "No departments found with materials for this type.",
        404
      );
    }

    // Apply sorting, limiting, and pagination
    const query = Category.find({
      _id: { $in: departmentsWithMaterials.map((dept) => dept._id) },
    });

    const apiFeatures = new ApiFeatures(query, queryString)
      .sort()
      .limitFields()
      .pagination();

    const departments = await apiFeatures.query;

    return {
      departments,
      paginationMetadata: apiFeatures.paginationMetadata,
    };
  }
}

export default CategoryService;

import { getDegreesByLevel } from '../../helper/getDegreesByLevel.js';
import CategoryService from '../../services/categoryService.js';
import { catchAsyncErrors } from '../../utils/catchAsyncErrors.js';
import AppError from '../../utils/HandleAppErrors.js';
import { logger } from '../../utils/logger.js';
import { validateObjectId } from '../../utils/validateObjectId.js';
import Category from '../models/CategoryModel.js';

/**
 * @desc Create a new category
 * @route POST /api/v1/categories
 * @access Private (Admin)
 */
export const createCategoryController = catchAsyncErrors(async (req, res) => {
  const {
    name,
    description,
    parentCategory,
    categoryType,
    materialTypes,
    sortOrder,
    active,
  } = req.body;

  // Prepare data for the service layer
  const categoryData = {
    name,
    description,
    parentCategory,
    categoryType,
    materialTypes,
    sortOrder,
    active: active ?? true,
    createdBy: req.user.id, // Assume req.user contains the authenticated user's data
  };

  // Create the category using the service layer
  const category = await CategoryService.createCategory(categoryData);

  // Respond with success
  res.status(201).json({
    status: 'success',
    message: 'Category created successfully',
    data: category,
  });
});

// Controller to update a category
export const updateCategory = catchAsyncErrors(async (req, res) => {
  const { categoryId } = req.params; // Get the category ID from the URL parameter
  const {
    name,
    description,
    parentCategory,
    categoryType,
    sortOrder,
    materialTypes,
  } = req.body;

  // Prepare data for the service layer
  const categoryData = {
    name,
    description,
    parentCategory,
    categoryType,
    sortOrder,
    materialTypes,
    updatedBy: req.user.id,
  };
  // Call the service to update the category
  const category = await CategoryService.updateCategoryService(
    categoryId,
    categoryData,
  );

  // Send the response with the updated category data
  res.status(200).json({
    status: 'success',
    data: category,
  });
});

// Controller for updating category sort order
export const updateSortOrder = catchAsyncErrors(async (req, res, next) => {
  const { categories } = req.body;

  // Validate the input: it should be an array and contain at least one category
  if (!Array.isArray(categories) || categories.length === 0) {
    return next(new AppError('Invalid or empty categories input', 400));
  }

  // Validate each category's structure (id and sortOrder)
  for (const category of categories) {
    if (!category.id || typeof category.sortOrder === 'undefined') {
      return next(
        new AppError("Each category must have an 'id' and 'sortOrder'", 400),
      );
    }
    console.log(category);

    // Ensure the category ID is a valid ObjectId
    validateObjectId(category.id, 'Category');

    // Ensure sortOrder is a valid integer
    if (!Number.isInteger(category.sortOrder)) {
      return next(
        new AppError('Invalid sortOrder value. It must be an integer.', 400),
      );
    }
  }

  // Use the service layer to handle the bulk update
  await CategoryService.updateSortOrder(categories);

  res.status(200).json({
    status: 'success',
    message: 'Sort order updated successfully',
  });
});

/**
 * @desc Bulk create categories with parent-child relationships
 * @route POST /api/v1/categories/bulk
 * @access Private (Admin)
 */
export const bulkCreateCategories = catchAsyncErrors(async (req, res, next) => {
  const { categories } = req.body;

  // Validate input
  if (!categories || !Array.isArray(categories) || categories.length === 0) {
    return next(
      new AppError('Please provide a valid array of categories.', 400),
    );
  }

  // Add createdBy field to each category before inserting
  const categoriesWithMetadata = categories.map((category) => ({
    ...category,
    createdBy: req.user.id, // Assuming req.user contains the logged-in admin user
  }));

  // Call the static method directly from the Category model
  const createdCategories = await Category.bulkCreate(categoriesWithMetadata);
  console.log(createdCategories);

  // Respond with success
  res.status(201).json({
    status: 'success',
    results: createdCategories.length,
    data: { categories: createdCategories },
  });
});

/**
 * @desc Get all categories with pagination, filtering, sorting, and searching.
 * @route GET /api/v1/categories
 * @access Public
 */
export const getAllCategories = catchAsyncErrors(async (req, res) => {
  const { categories, paginationMetadata } =
    await CategoryService.getAllCategoriesService(req.query);

  res.status(200).json({
    status: 'success',
    results: categories.length,
    pagination: paginationMetadata,
    data: { categories },
  });
});

/**
 * @desc Get all parent categories (categories without a parent).
 * @route GET /api/v1/categories/parent
 * @access Public
 */
export const getParentCategories = catchAsyncErrors(async (req, res, next) => {
  try {
    const { parentCategories, paginationMetadata } =
      await CategoryService.getParentCategoriesService(req.query);

    res.status(200).json({
      status: 'success',
      results: parentCategories.length,
      pagination: paginationMetadata,
      data: { categories: parentCategories }, // ✅ Correct structure
    });
  } catch (error) {
    return next(error);
  }
});

/**
 * @desc Get all subcategories for a given parent category ID.
 * @route GET /api/v1/categories/:id/subcategories
 * @access Public
 */
export const getSubcategories = catchAsyncErrors(async (req, res) => {
  const { parentCategoryId } = req.params;

  // Validate the parent category ID
  validateObjectId(parentCategoryId, 'Category');

  // Fetch subcategories from the service
  const { subcategories, paginationMetadata } =
    await CategoryService.getSubcategoriesService(parentCategoryId, req.query);

  // Respond with the results
  res.status(200).json({
    status: 'success',
    results: subcategories.length,
    pagination: paginationMetadata,
    data: { subcategories },
  });
});



/**
 * Controller for getting category by ID with paginated subcategories and materials.
 * @route GET /api/v1/categories/:id
 * @access Public
 */
export const getCategoryById = catchAsyncErrors(async (req, res) => {
  const { categoryId } = req.params;
  const queryString = req.query;

  const category = await CategoryService.getCategoryByIdService(
    categoryId,
    queryString,
  );

  res.status(200).json({
    status: 'success',
    data: category,
  });
});

/**
 * Soft delete a category.
 * @route PATCH /api/v1/categories/:id/soft-delete
 * @access Admin
 */
export const softDeleteCategory = catchAsyncErrors(async (req, res, next) => {
  const categoryId = req.params.id;

  // Validate ObjectId for the category being updated
  validateObjectId(categoryId, 'Category');

  const category = await Category.findByIdAndUpdate(
    categoryId,
    { isActive: false }, // Soft delete by updating the 'isActive' flag
    { new: true },
  );

  if (!category) {
    return next(new AppError('Category not found', 404));
  }

  res.status(200).json({
    status: 'success',
    message: 'Category soft-deleted successfully',
    data: category,
  });
});

/**
 * Delete a category by ID, with optional cascading deletion.
 * @route DELETE /api/v1/categories/:id
 * @access Admin
 */
export const deleteCategory = catchAsyncErrors(async (req, res, next) => {
  const categoryId = req.params.id;
  const cascadeDelete = req.query.cascade === 'true';

  // Validate ObjectId for the category being deleted
  validateObjectId(categoryId, 'Category');

  const category = await Category.findById(categoryId);

  if (!category) {
    return next(new AppError('Category not found', 404));
  }

  // Perform the deletion (handles cascading internally)
  await Category.deleteCategory(categoryId, cascadeDelete);

  res.status(204).json({
    status: 'success',
    message: 'Category deleted successfully',
  });
});

/**
 * Bulk delete categories.
 * @route DELETE /api/v1/categories/bulk-delete
 * @access Admin
 */
export const bulkDeleteCategories = catchAsyncErrors(async (req, res, next) => {
  const { categoryIds, cascade } = req.body;

  logger.info('categoryIds');

  // Validate the input format
  if (!Array.isArray(categoryIds) || categoryIds.length === 0) {
    return next(new AppError('Invalid or empty category Ids array', 400));
  }

  // Validate all category categoryIds in the array
  // for (const id of categoryIds) {
  //  validateObjectId(id, "Category");
  // }

  // Call the service to perform bulk deletion
  await CategoryService.bulkDeleteCategories(categoryIds, cascade);

  res.status(204).json({
    status: 'success',
    message: 'Categories deleted successfully',
  });
});

/**
 * @desc Get degrees by academic level
 * @route GET /api/v1/degrees/:level
 * @access Public
 */
export const getDegreesByLevelController = catchAsyncErrors(
  async (req, res) => {
    const { level } = req.params;

    // Fetch degrees using service layer
    const degrees = getDegreesByLevel(level);

    res.status(200).json({
      status: 'success',
      level,
      results: degrees.length,
      data: { degrees },
    });
  },
);

/**
 * @desc Get all academic levels with their respective degrees
 * @route GET /api/v1/academic-levels
 * @access Public
 */
export const getAllAcademicLevelsWithDegrees = catchAsyncErrors(
  async (req, res) => {
    // Fetch academic levels with degrees using service layer
    const academicLevels =
      await CategoryService.getAllAcademicLevelsWithDegreesService();

    res.status(200).json({
      status: 'success',
      results: academicLevels.length,
      data: { academicLevels },
    });
  },
);


/**
 * @desc Get all departments (subcategories with categoryType: "Department").
 * @route GET /api/v1/departments
 * @access Public
 */
export const getDepartments = catchAsyncErrors(async (req, res) => {
  const { departments, paginationMetadata } =
    await CategoryService.getDepartmentsService(req.query);

  res.status(200).json({
    status: "success",
    results: departments.length,
    pagination: paginationMetadata,
    data: { departments },
  });
});

/**
 * @desc Get related departments based on current department's parent.
 * @route GET /api/v1/departments/:departmentId/related
 * @access Public
 */
export const getRelatedDepartments = catchAsyncErrors(async (req, res) => {
  const { departmentId } = req.params;

  const { relatedDepartments, paginationMetadata, message } =
    await CategoryService.getRelatedDepartmentsService(departmentId, req.query);

  res.status(200).json({
    status: "success",
    message,
    results: relatedDepartments.length,
    pagination: paginationMetadata,
    data: { relatedDepartments },
  });
});


/**
 * Controller to fetch departments with materials for a selected material type.
 */
export const getDepartmentsByMaterialTypeController = catchAsyncErrors(
  async (req, res) => {
    const { materialType } = req.query;

    if (!materialType) {
      return res.status(400).json({
        status: 'fail',
        message: 'Material type is required.',
      });
    }

    // Fetch departments with materials for the given material type
    const { departments, paginationMetadata } =
      await CategoryService.getDepartmentsByMaterialType(
        materialType,
        req.query,
      );

    res.status(200).json({
      status: 'success',
      pagination: paginationMetadata,
      data: departments,
    });
  },
);

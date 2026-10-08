import express from 'express';
import {
  bulkCreateCategories,
  createCategoryController,
  deleteCategory,
  getAllAcademicLevelsWithDegrees,
  getAllCategories,
  getCategoryById,
  getDegreesByLevelController,
  getDepartments,
  getDepartmentsByMaterialTypeController,
  getParentCategories,
  getRelatedDepartments,
  getSubcategories,
  updateCategory,
  updateSortOrder,
} from '../controllers/CategoryController.js';
import { protectRoutes, restrictTo } from '../middlewares/authMiddleware.js';
import { USER_ROLES } from '../../constants/enums.js';
import { checkConnection } from '../middlewares/dbMiddleware.js';

const router = express.Router();
// Public Routes
router.route('/').get(getAllCategories);
// Public API to fetch departments by material type
router.route('/departments').get(getDepartments);
router
.route('/materials/departments')
.get(getDepartmentsByMaterialTypeController);
// Route for fetching parent categories
router.route('/parent').get(getParentCategories);
// Route for fetching subcategories by parent ID
router.route('/:parentCategoryId/subcategories').get(getSubcategories);
router.route('/:categoryId').get(getCategoryById);
router.get('/degrees/:level', getDegreesByLevelController);
router.route("/departments/:departmentId/related").get(getRelatedDepartments);
router.get(
  '/academic/levels',
  checkConnection,
  getAllAcademicLevelsWithDegrees,
);

// Middleware: Protecting All Routes
router.use(protectRoutes);

// Middleware: Ensure the user is logged in and has an admin role
router.use(restrictTo(USER_ROLES.ADMIN));

// Route for creating a category
router.route('/').post(createCategoryController);
// Bulk create categories - only accessible by admin
router.route('/create/bulk').post(bulkCreateCategories);
router.route('/sort-order').patch(updateSortOrder);
router.route('/bulk/delete').delete(bulkCreateCategories);
router.route('/update/:categoryId').patch(updateCategory);
router.route('/delete/:id').delete(deleteCategory);

export const categoryRouter = router;

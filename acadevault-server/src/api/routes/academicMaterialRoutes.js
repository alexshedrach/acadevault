import express from "express";
import * as AcademicMaterialController from "../controllers/AcademicMaterialController.js";
import { protectRoutes, restrictTo } from "../middlewares/authMiddleware.js";
import { USER_ROLES } from "../../constants/enums.js";
import { uploadMaterials } from "../middlewares/multerMiddleware.js";
import { checkConnection } from "../middlewares/dbMiddleware.js";
import { maybeProtectRoutes } from "../middlewares/maybeProtectRoutes.js";

const router = express.Router();

// 📌 Public Route: Anyone can access, but authentication is optional
router
  .route("/")
  .get(
    checkConnection,
    AcademicMaterialController.getAcademicMaterialsController
  );
  
  router.route("/popular-tags").get(AcademicMaterialController.getPopularTags);

router
  .route("/level-degre")
  .get(AcademicMaterialController.getMaterialsByLevelAndDegree);
router
  .route("/:materialId")
  .get(AcademicMaterialController.getMaterialDetailsController);
router
  .route("/category/:categorySlug/materials")
  .get(AcademicMaterialController.getMaterialsByCategoryController);
router
  .route("/:materialId/related")
  .get(AcademicMaterialController.getRelatedMaterialsController);
router
  .route("/:materialId/preview")
  .get(AcademicMaterialController.getMaterialPreview);

router.route("/shop/:shopId/materials").get(
  maybeProtectRoutes, // optional token-based auth
  AcademicMaterialController.getMaterialsByShopController
);

// Middleware: Protecting All Routes
router.use(protectRoutes);

// Endpoint to create an academic material
router
  .route("/")
  .post(
    restrictTo(USER_ROLES.SELLER, USER_ROLES.ADMIN),
    AcademicMaterialController.createAcademicMaterial
  );
// Upload File for Academic Material
router
  .route("/upload/:materialId")
  .post(
    restrictTo(USER_ROLES.SELLER, USER_ROLES.ADMIN),
    uploadMaterials,
    AcademicMaterialController.uploadMaterialFileController
  );

// Submit material for review
router
  .route("/submit/:materialId")
  .post(
    restrictTo(USER_ROLES.SELLER, USER_ROLES.ADMIN),
    AcademicMaterialController.submitForReviewController
  );

// Resubmit rejected material
router
  .route("/resubmit/:materialId")
  .put(
    restrictTo(USER_ROLES.SELLER, USER_ROLES.ADMIN),
    AcademicMaterialController.resubmitMaterialController
  );

// Update academic material (Only creator can update)
router
  .route("/:materialId")
  .patch(
    restrictTo(USER_ROLES.SELLER, USER_ROLES.ADMIN),
    AcademicMaterialController.updateAcademicMaterial
  );
// Soft delete academic material
router
  .route("/:materialId")
  .delete(
    restrictTo(USER_ROLES.SELLER, USER_ROLES.ADMIN),
    AcademicMaterialController.deleteAcademicMaterial
  );
// Restore soft deleted academic material
router
  .route("/:materialId/restore")
  .patch(
    restrictTo(USER_ROLES.SELLER, USER_ROLES.ADMIN),
    AcademicMaterialController.restoreAcademicMaterial
  );

// Bulk soft delete materials
router
  .route("/bulk-delete")
  .delete(
    restrictTo(USER_ROLES.SELLER, USER_ROLES.ADMIN),
    AcademicMaterialController.bulkDeleteAcademicMaterials
  );

// Bulk restore materials
router
  .route("/bulk-restore")
  .patch(
    restrictTo(USER_ROLES.SELLER, USER_ROLES.ADMIN),
    AcademicMaterialController.bulkRestoreAcademicMaterials
  );

// router
//   .route('/shop/:shopId/materials')
//   .get(
//     restrictTo(USER_ROLES.SELLER, USER_ROLES.ADMIN),
//     AcademicMaterialController.getMaterialsByShopController,
//   );

// Restore a deleted material
router
  .route("/restore/:id")
  .patch(AcademicMaterialController.restoreMaterialController);

// Middleware: Ensure the user is logged in and has an admin role
router.use(restrictTo(USER_ROLES.ADMIN));

// Get materials pending review
router
  .route("/admin/review")
  .get(AcademicMaterialController.getPendingReviewMaterialsController);

// Approve material
router
  .route("/approve/:materialId")
  .put(AcademicMaterialController.approveMaterialController);

// Reject material
router
  .route("/reject/:materialId")
  .put(AcademicMaterialController.rejectMaterialController);

// Route to resolve a correction made by the admin (when the seller updates material)
router
  .route("/resolve/:materialId/:correctionId")
  .put(AcademicMaterialController.resolveCorrectionController);

// Route to confirm the resolution of a correction by the admin
router
  .route("/confirm-resolution/:materialId/:correctionId")
  .put(AcademicMaterialController.confirmResolutionController);

// Admin Restore: Restore any deleted material (beyond 30 days)
router
  .route("/admin/restore/:id")
  .patch(AcademicMaterialController.adminRestoreMaterialController);
// Admin Permanent Delete: Permanently delete any deleted academic material
router
  .route("/admin/delete/:id")
  .delete(AcademicMaterialController.adminPermanentDeleteMaterialController);

// Protect routes and restrict access to admins
router
  .route("/:materialId/review")
  .patch(AcademicMaterialController.reviewPendingChanges);

router
  .route("/exchange-rates")
  .get(AcademicMaterialController.getExchangeRates);

// ========== Export Route ================= //
export const academicMaterialRouter = router;

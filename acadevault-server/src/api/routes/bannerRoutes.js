import express from "express";
import {
  createBanner,
  getBanners,
  updateBanner,
  deleteBanner,
} from "../controllers/bannerController.js";
import { protectRoutes, restrictTo } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Admin only routes
router
  .route("/")
  .get(getBanners)
  .post(protectRoutes, restrictTo("Admin"), createBanner);

router
  .route("/:id")
  .put(protectRoutes, restrictTo("Admin"), updateBanner)
  .delete(protectRoutes, restrictTo("Admin"), deleteBanner);

export default router;

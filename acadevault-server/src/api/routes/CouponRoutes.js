import express from "express";
import { protectRoutes, restrictTo } from "../middlewares/authMiddleware.js";
import { USER_ROLES } from "../../constants/enums.js";
import {
  createDiscount,
  getDiscounts,
} from "../controllers/CouponControllers.js";

const router = express.Router();

// Public route for discount validation

// // router.post("/validate", validateDiscountCode);

// // Middleware: Protecting All Routes and Restricts to Admin
router.use(protectRoutes, restrictTo(USER_ROLES.ADMIN));

router.route("/").post(createDiscount).get(getDiscounts);

// // router.post("/bulk").post(bulkCreateDiscounts);
// // router.patch("/:id", updateDiscount);
// // router.delete("/:id", deleteDiscount);
// // router.get("/", getDiscounts);
// // router.get("/:id/analytics", getDiscountAnalytics);

export const couponRouter = router;

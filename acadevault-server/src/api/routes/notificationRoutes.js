import express from "express";
import {
  getAllNotificationController,
  markNotificationAsReadController,
} from "../controllers/NotificationController.js";

const router = express.Router();

// Fetch all notifications for a user (unread or all)
router.get("/notifications/:userId", getAllNotificationController);

// Mark a notification as read
router.put(
  "/notifications/read/:notificationId",
  markNotificationAsReadController
);

export const notificationRouter = router;

import {
  getNotificationsService,
  markNotificationAsReadService,
} from '../../services/notificationService.js';
import { catchAsyncErrors } from '../../utils/catchAsyncErrors.js';

// Fetch all notifications for a user (unread or all)
export const getAllNotificationController = catchAsyncErrors(
  async (req, res, next) => {
    try {
      const { userId } = req.params;
      const { isRead } = req.query;

      const notifications = await getNotificationsService(
        userId,
        isRead === 'true',
      );

      res.status(200).json({
        success: true,
        notifications,
      });
    } catch (error) {
      next(error);
    }
  },
);

// Mark a notification as read
export const markNotificationAsReadController = catchAsyncErrors(
  async (req, res, next) => {
    try {
      const { notificationId } = req.params;

      const result = await markNotificationAsReadService(notificationId);

      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  },
);

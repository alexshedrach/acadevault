import Notification from "../api/models/NotificationModel.js";
import AppError from "../utils/HandleAppErrors.js";

// import emailService from "./EmailService.js";

class NotificationService {
  static async sendRefundConfirmation(userEmail, refundId) {
    const subject = "Your Refund Has Been Processed";
    const content = `Your refund request (ID: ${refundId}) has been successfully processed.`;
    // await emailService.sendEmail(userEmail, subject, content);
  }

  static async sendAdminRefundNotification(adminId, refundId) {
    const subject = "Refund Request Processed";
    const content = `Admin ID: ${adminId} has processed refund ID: ${refundId}.`;
    // await emailService.sendAdminNotification(adminId, subject, content);
  }
}

export default NotificationService;


/**
 * Function to create a custom notification
 */
export const createCustomNotification = async (userId, type, title, message, priority = "medium", action = null) => {
  try {
    const notification = new Notification({
      recipient: userId,
      type,
      title,
      message,
      priority,
      action,
    });

    await notification.save();
    return notification;
  } catch (error) {
    console.error("Error creating custom notification:", error);
    throw error;
  }
};


/**
 * Fetches all notifications for a user.
 */
export const getNotificationsService = async (userId, isRead = false) => {
  const notifications = await Notification.find({ recipient: userId, isRead })
    .sort({ createdAt: -1 }) // Sort by latest
    .exec();

  return notifications;
};

/**
 * Marks a notification as read.
 */
export const markNotificationAsReadService = async (notificationId) => {
  const notification = await Notification.findById(notificationId);

  if (!notification) throw new AppError("Notification not found.", 404);

  notification.isRead = true;
  await notification.save();

  return { success: true, message: "Notification marked as read." };
};

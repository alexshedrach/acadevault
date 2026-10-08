import Notification from '../../api/models/NotificationModel.js';
import { NOTIFICATION_CHANNELS, NOTIFICATION_STATUSES } from '../../constants/notificationEnums.js';
import { logger } from '../../utils/logger.js';
import EmailNotificationService from './channels/EmailNotificationService.js';
import InAppNotificationService from './channels/InAppNotificationService.js';
// import PushNotificationService from './channels/PushNotificationService.js';
import SmsNotificationService from './channels/SmsNotificationService.js';

// Map channels to their respective handler classes
const CHANNEL_HANDLERS = {
  [NOTIFICATION_CHANNELS.EMAIL]: EmailNotificationService,
  [NOTIFICATION_CHANNELS.IN_APP]: InAppNotificationService,
  [NOTIFICATION_CHANNELS.SMS]: SmsNotificationService,
  // [NOTIFICATION_CHANNELS.PUSH]: PushNotificationService,
};

/**
 * NotificationService is the central façade for dispatching notifications.
 * It persists notifications, delegates to the appropriate channel handler,
 * and logs delivery attempts/status updates.
 */
class NotificationService {
  /**
   * Send a notification via the specified channel.
   * @param {Object} params
   * @param {ObjectId} [params.recipient] - Mongoose User ID for registered users
   * @param {String} [params.guestEmail] - Email for guest recipients
   * @param {String} params.type - Notification type (enum)
   * @param {String} params.title - Notification title (or email subject)
   * @param {String} params.message - Notification body or message text
   * @param {String} params.channel - Channel enum (email, in-app, sms, push)
   * @param {Object} [params.metadata] - Additional structured data
   * @param {String} [params.action] - Optional URL or CTA
   * @param {String} [params.priority='medium'] - Priority enum
   * @returns {Promise<Notification>} - The saved Notification document
   */
  static async sendNotification({
    recipient = null,
    guestEmail = null,
    type,
    title,
    message,
    channel,
    metadata = {},
    action = null,
    priority = 'medium',
  }) {
    let notificationDoc;

    try {
      // Persist the initial notification record in the DB
      notificationDoc = await Notification.create({
        recipient,
        guestEmail,
        type,
        title,
        message,
        channel,
        metadata,
        action,
        priority,
      });
      const notifId = notificationDoc._id;

      // Delegate sending to the channel-specific handler
      const HandlerClass = CHANNEL_HANDLERS[channel];
      if (!HandlerClass || typeof HandlerClass.send !== 'function') {
        throw new Error(`Unsupported or unimplemented channel: ${channel}`);
      }

      const result = await HandlerClass.send(notificationDoc);

      // Log a successful delivery attempt
      await this.logDeliveryAttempt(notifId, {
        status: 'success',
        provider: result?.provider || channel,
        responseCode: result?.responseCode || null,
      });

      // Update notification status to 'sent'
      await Notification.updateOne({ _id: notifId }, { status: NOTIFICATION_STATUSES.SENT });

      return notificationDoc;
    } catch (error) {
      logger.error('Notification dispatch failed', {
        recipient,
        guestEmail,
        type,
        channel,
        error: error.message,
      });

      // If we have a persisted notification, log the failure
      if (notificationDoc?._id) {
        await this.logDeliveryAttempt(notificationDoc._id, {
          status: 'failed',
          error: error.message,
          provider: channel,
        });
        await Notification.updateOne(
          { _id: notificationDoc._id },
          { status: NOTIFICATION_STATUSES.FAILED }
        );
      }

      // Rethrow so callers can handle upstream
      throw error;
    }
  }

  /**
   * Record a delivery attempt for auditing and retry purposes.
   * @param {ObjectId} notificationId
   * @param {Object} details
   * @param {String} details.status - 'success' or 'failed'
   * @param {String} [details.provider] - The channel or provider used
   * @param {String} [details.responseCode] - e.g. HTTP status code or message ID
   * @param {String} [details.error] - Error message if failed
   * @returns {Promise<void>}
   */
  static async logDeliveryAttempt(
    notificationId,
    { status, error = null, provider = null, responseCode = null }
  ) {
    await Notification.updateOne(
      { _id: notificationId },
      {
        $push: {
          deliveryAttempts: {
            status,
            error,
            provider,
            responseCode,
            attemptAt: new Date(),
          },
        },
      }
    );
  }

  /**
   * Retrieves paginated notifications for a user, with optional filters.
   *
   * @param {string} userId - The ID of the user
   * @param {Object} options - Filtering and pagination options
   * @param {number} [options.page=1] - Page number for pagination
   * @param {number} [options.limit=20] - Number of items per page
   * @param {boolean|null} [options.read=null] - Filter by read status (true, false, or null for all)
   * @param {string|null} [options.channel=null] - Filter by specific channel (e.g., 'email', 'in-app')
   * @returns {Promise<Object>} - Paginated list of notifications
   */
  static async getUserNotifications(userId, { page = 1, limit = 20, read = null, channel = null }) {
    try {
      const filter = { recipient: userId };

      if (read === true) filter.readAt = { $ne: null };
      if (read === false) filter.readAt = null;
      if (channel) filter.channel = channel;

      const notifications = await Notification.find(filter)
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit);

      const total = await Notification.countDocuments(filter);

      return {
        success: true,
        data: {
          notifications,
          pagination: { total, page, limit },
        },
      };
    } catch (error) {
      logger.error('❌ Failed to fetch user notifications:', error);
      throw new AppError('Error fetching notifications', 500);
    }
  }

  /**
   * Creates and dispatches admin-triggered notifications to multiple users.
   * Supports multiple channels and templated payloads.
   *
   * @param {Object} payload - Notification config
   * @param {string[]} payload.recipients - Array of user IDs
   * @param {string} payload.title - Notification title
   * @param {string} payload.message - Notification message body
   * @param {string} [payload.type='info'] - Notification type (info, success, etc.)
   * @param {string[]} [payload.channels=['in-app']] - Channels to send on
   * @param {Object} [payload.metadata={}] - Additional metadata
   * @param {string|null} [payload.action=null] - Optional CTA/action URL
   * @param {string} [payload.priority='medium'] - Notification priority
   * @param {string|null} [payload.templateName=null] - Optional template name
   * @param {Object} [payload.templateData={}] - Template variables
   * @returns {Promise<Object[]>} - Array of send results per channel
   */
  static async createAdminNotification({
    recipients = [],
    title,
    message,
    type = 'info',
    channels = [NOTIFICATION_CHANNELS.IN_APP],
    metadata = {},
    action = null,
    priority = 'medium',
    templateName = null,
    templateData = {},
  }) {
    const results = [];

    try {
      for (const userId of recipients) {
        for (const channel of channels) {
          const notification = {
            recipient: userId,
            title,
            message,
            type,
            channel,
            metadata,
            action,
            priority,
            ...(templateName ? { templateName, templateData } : {}),
          };

          const result = await NotificationService.sendNotification(notification);
          results.push(result);
        }
      }

      return results;
    } catch (error) {
      logger.error('❌ Failed to create admin notifications:', error);
      throw new AppError('Error creating admin notifications', 500);
    }
  }

  /**
   * Marks a single notification as read for a specific user.
   * Validates ownership and existence.
   *
   * @param {string} notificationId - ID of the notification to mark
   * @param {string} userId - ID of the user marking it
   * @returns {Promise<Object>} - Result object with status
   */
  static async markAsRead(notificationId, userId) {
    try {
      const result = await Notification.updateOne(
        { _id: notificationId, recipient: userId, readAt: null },
        { $set: { readAt: new Date(), isRead: true } }
      );

      if (result.modifiedCount === 0) {
        throw new AppError('Notification not found or already read', 404);
      }

      return { success: true, message: 'Notification marked as read' };
    } catch (error) {
      logger.error('❌ Error marking notification as read:', error);
      throw new AppError(error.message || 'Internal error marking notification', 500);
    }
  }

  /**
   * Marks all unread notifications for a user as read.
   *
   * @param {string} userId - ID of the user whose notifications to update
   * @returns {Promise<Object>} - Result object with updated count
   */
  static async markAllAsRead(userId) {
    try {
      const result = await Notification.updateMany(
        { recipient: userId, readAt: null },
        { $set: { readAt: new Date(), isRead: true } }
      );

      return {
        success: true,
        message: `${result.modifiedCount} notifications marked as read`,
        count: result.modifiedCount,
      };
    } catch (error) {
      logger.error('❌ Error marking all notifications as read:', error);
      throw new AppError(error.message || 'Internal error marking notifications', 500);
    }
  }

  /**
   * Returns summary statistics about sent and failed notifications.
   *
   * @returns {Promise<Object>} - Total sent and failed counts
   */
  static async getStats() {
    try {
      const [totalSent, totalFailed] = await Promise.all([
        Notification.countDocuments({ status: NOTIFICATION_STATUSES.SENT }),
        Notification.countDocuments({ status: NOTIFICATION_STATUSES.FAILED }),
      ]);

      return { totalSent, totalFailed };
    } catch (error) {
      logger.error('❌ Failed to get notification stats:', error);
      throw new Error('Error retrieving notification statistics');
    }
  }

  /**
   * Retries failed notifications that haven't exceeded the attempt limit.
   *
   * @param {number} [limit=20] - Maximum number of failed notifications to retry
   * @returns {Promise<Object>} - Retry summary
   */
  static async retryFailedNotifications(limit = 20) {
    try {
      const failedNotifications = await Notification.find({
        status: NOTIFICATION_STATUSES.FAILED,
        'deliveryAttempts.2': { $exists: false }, // Retry max 3 times
      }).limit(limit);

      let retried = 0;
      let successful = 0;
      let failed = 0;

      for (const notification of failedNotifications) {
        retried++;
        try {
          await NotificationService.sendNotification({
            ...notification.toObject(),
            channel: notification.channel, // explicitly specify channel
            retry: true,
          });
          successful++;
        } catch (err) {
          failed++;
          logger.warn(`⚠️ Retry failed for notification ${notification._id}:`, err.message);
        }
      }

      logger.info(
        `🔁 Retried ${retried} failed notifications: ${successful} succeeded, ${failed} failed again.`
      );

      return {
        retried,
        successful,
        failed,
      };
    } catch (error) {
      logger.error('❌ Error retrying failed notifications:', error);
      throw new Error('Retry process failed');
    }
  }
}

export default NotificationService;

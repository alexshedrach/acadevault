import {
  NOTIFICATION_CHANNELS,
  NOTIFICATION_STATUSES,
} from '../../../constants/notificationEnums.js';
import AppError from '../../../utils/HandleAppErrors.js';
import { logger } from '../../../utils/logger.js';
import TemplateRenderer from '../TemplateRenderer.js';
import SocketNotificationService from './SocketNotificationService.js';

/**
 * InAppNotificationService
 * - Renders and delivers in-app notifications (HTML/text) via Socket.IO and DB.
 * - Templates come from /src/templates/in-app/*.html(.hbs)
 */
class InAppNotificationService {
  /**
   * Sends in-app notification: render, emit via Socket.IO, update DB.
   * @param {Object} notification - Mongoose Notification document
   * @returns {Promise<{ provider: string, responseCode: string }>}
   */
  static async send(notification) {
    try {
      const templateName = notification.templateName || notification.type;
      const context = {
        firstName: notification.metadata?.firstName || 'User',
        ...notification.metadata,
      };

      if (!notification.message) {
        try {
          notification.message = await TemplateRenderer.render(templateName, context, 'in-app', [
            'html.hbs',
            'html',
            'txt',
          ]);
        } catch (renderErr) {
          logger.warn('InAppNotificationService: Template fallback triggered', {
            templateName,
            error: renderErr.message,
          });

          notification.message =
            notification.message || notification.title || 'You have a notification';
        }
      }

      notification.status = NOTIFICATION_STATUSES.SENT;
      notification.deliveryAttempts.push({
        status: 'success',
        provider: 'socket',
      });

      await notification.save();
      await SocketNotificationService.sendToUser(notification);

      return {
        provider: NOTIFICATION_CHANNELS.IN_APP,
        responseCode: '200',
      };
    } catch (err) {
      logger.error('❌ InAppNotificationService failed', {
        id: notification._id,
        type: notification.type,
        error: err.message,
      });

      try {
        notification.status = NOTIFICATION_STATUSES.FAILED;
        notification.deliveryAttempts.push({
          status: 'failed',
          provider: 'socket',
          error: err.message,
        });
        await notification.save();
      } catch (saveErr) {
        logger.error('Failed to update notification status to FAILED', {
          id: notification._id,
          error: saveErr.message,
        });
      }

      throw new AppError('Failed to send in-app notification', 500);
    }
  }
}

export default InAppNotificationService;

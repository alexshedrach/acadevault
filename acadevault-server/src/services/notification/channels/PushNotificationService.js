import admin from 'firebase-admin';
import { NOTIFICATION_STATUSES } from '../../../constants/notificationEnums.js';
import AppError from '../../../utils/HandleAppErrors.js';
import { logger } from '../../../utils/logger.js';
import TemplateRenderer from '../../../utils/TemplateRenderer.js';

class PushNotificationService {
  /**
   * Sends a push notification via Firebase Cloud Messaging
   * @param {Object} notification - Mongoose notification document
   * @returns {Object} - Result with provider and status
   */
  static async send(notification) {
    const token = notification.metadata?.fcmToken;

    if (!token || typeof token !== 'string') {
      throw new AppError('Push notification requires a valid FCM token in metadata.', 400);
    }

    try {
      // Render push payload as JSON string and parse
      const payloadJson = await TemplateRenderer.render(
        notification.templateName,
        notification.templateData || {},
        'push',
        ['json', 'hbs']
      );

      let payload;
      try {
        payload = JSON.parse(payloadJson);
      } catch (parseErr) {
        throw new AppError(
          `Invalid JSON template output for push payload: ${parseErr.message}`,
          500
        );
      }

      const response = await admin.messaging().sendToDevice(token, payload);

      notification.status = NOTIFICATION_STATUSES.SENT;
      notification.deliveryAttempts.push({
        status: 'success',
        provider: 'fcm',
        responseCode: response.successCount > 0 ? 'OK' : 'PARTIAL',
      });

      await notification.save();

      logger.info('📲 Push notification sent', {
        token,
        notificationId: notification._id,
        successCount: response.successCount,
        failureCount: response.failureCount,
      });

      return {
        provider: 'fcm',
        responseCode: response.successCount > 0 ? 'OK' : 'PARTIAL',
      };
    } catch (err) {
      notification.status = NOTIFICATION_STATUSES.FAILED;
      notification.deliveryAttempts.push({
        status: 'failed',
        error: err.message,
        provider: 'fcm',
      });

      await notification.save();

      logger.error('❌ Push notification failed', {
        token,
        error: err.message,
        notificationId: notification._id,
      });

      throw new AppError(`Push delivery failed: ${err.message}`, 500);
    }
  }
}

export default PushNotificationService;

// /**
//  * PushNotificationService.js
//  * Handles push notifications via Firebase Cloud Messaging.
//  */
// import admin from 'firebase-admin';
// import TemplateRenderer from '../TemplateRenderer.js';
// import { logger } from '../../../utils/logger.js';
// import AppError from '../../../utils/HandleAppErrors.js';

// export class PushNotificationService {
//   /**
//    * Send push notification to a device token.
//    * Renders payload (JSON) and delivers via FCM.
//    * @param {Object} notification - Notification doc
//    * @returns {Promise<{ provider: string, responseCode: string }>}
//    */
//   static async send(notification) {
//     try {
//       const token = notification.metadata.fcmToken;
//       if (!token) throw new AppError('FCM token missing', 400);

//       // Render push payload as JSON string
//       const payloadJson = await TemplateRenderer.render(
//         notification.templateName,
//         notification.templateData || {},
//         'push',
//         ['json', 'hbs']
//       );
//       const payload = JSON.parse(payloadJson);

//       // Send via Firebase Admin SDK
//       const response = await admin.messaging().sendToDevice(token, payload);
//       logger.info('Push notification sent', { token, response });
//       return { provider: 'fcm', responseCode: 'OK' };
//     } catch (err) {
//       logger.error('PushNotificationService.send failed', {
//         id: notification._id,
//         error: err.message,
//       });
//       throw new AppError(`Push delivery failed: ${err.message}`, 500);
//     }
//   }
// }

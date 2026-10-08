import { NOTIFICATION_STATUSES } from '../../../constants/notificationEnums.js';
import SmsClient from '../SmsClient.js';
import AppError from '../../../utils/HandleAppErrors.js';
import { logger } from '../../../utils/logger.js';
import TemplateRenderer from '../TemplateRenderer.js';

class SmsNotificationService {
  /**
   * Sends an SMS notification using the configured provider
   * @param {Object} notification - Mongoose notification document
   * @returns {Object} - Response with provider and status
   */
  static async send(notification) {
    const phone = notification.metadata?.phoneNumber;
    if (!phone) {
      throw new AppError('SMS requires recipient phoneNumber in metadata.', 400);
    }

    try {
      // Render the SMS template as plain text
      const message = await TemplateRenderer.render(
        notification.templateName,
        notification.templateData || {},
        'sms', // folder
        ['txt', 'hbs'] // fallback formats
      );

      const smsClient = new SmsClient(phone);
      const result = await smsClient.send(message);

      notification.status = NOTIFICATION_STATUSES.SENT;
      notification.deliveryAttempts.push({
        status: 'success',
        provider: result.provider,
        responseCode: result.responseCode || null,
      });

      await notification.save();
      logger.info('📲 SMS sent successfully', {
        to: phone,
        provider: result.provider,
        notificationId: notification._id,
      });

      return {
        provider: result.provider,
        responseCode: result.responseCode || null,
      };
    } catch (err) {
      notification.status = NOTIFICATION_STATUSES.FAILED;
      notification.deliveryAttempts.push({
        status: 'failed',
        error: err.message,
        provider: process.env.SMS_PROVIDER || 'unknown',
      });

      await notification.save();
      logger.error('❌ SMS notification failed', {
        phone,
        error: err.message,
        notificationId: notification._id,
      });

      throw new AppError(`SMS delivery failed: ${err.message}`, 500);
    }
  }
}

export default SmsNotificationService;

// /**
//  * SmsNotificationService.js
//  * Handles SMS notifications via Twilio.
//  */
// import twilio from 'twilio';
// import TemplateRenderer from '@/utils/TemplateRenderer.js';
// import { logger } from '@/utils/logger.js';
// import AppError from '@/utils/HandleAppErrors.js';

// export class SmsNotificationService {
//   /**
//    * Send SMS notification using Twilio.
//    * Renders text template and sends to user's phone.
//    * @param {Object} notification - Notification doc
//    * @returns {Promise<{ provider: string, responseCode: string }>}
//    */
//   static async send(notification) {
//     try {
//       // Determine recipient number (assumes notification.metadata.phone)
//       const toNumber = notification.metadata.phone;
//       if (!toNumber) throw new AppError('Recipient phone number missing', 400);

//       // Render SMS body
//       const body = await TemplateRenderer.render(
//         notification.templateName,
//         notification.templateData || {},
//         'sms',
//         ['txt', 'hbs']
//       );

//       // Initialize Twilio client
//       const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);
//       const msg = await client.messages.create({
//         body,
//         from: process.env.TWILIO_PHONE_NUMBER,
//         to: toNumber,
//       });

//       logger.info('SMS sent', { sid: msg.sid, to: toNumber });
//       return { provider: 'twilio', responseCode: msg.status };
//     } catch (err) {
//       logger.error('SmsNotificationService.send failed', {
//         id: notification._id,
//         error: err.message,
//       });
//       throw new AppError(`SMS delivery failed: ${err.message}`, 500);
//     }
//   }
// }

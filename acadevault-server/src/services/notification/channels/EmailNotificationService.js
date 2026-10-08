import EmailClient from '../EmailClient.js';
import AppError from '../../../utils/HandleAppErrors.js';
import { logger } from '../../../utils/logger.js';

/**
 * Channel handler for email notifications.
 * Constructs recipient context, delegates to EmailClient,
 * and returns delivery metadata for logging.
 */
class EmailNotificationService {
  /**
   * Send an email notification based on a Notification document.
   * @param {Object} notification - Mongoose document of Notification
   * @param {Object} notification.guestEmail - Email address for guests
   * @param {Object} notification.recipient - Populated User object with email & name (optional)
   * @param {String} notification.action - Optional CTA URL
   * @param {String} notification.type - Template name to use
   * @param {String} notification.title - Email subject line
   * @param {String} notification.message - Body text to include in template
   * @returns {Promise<{ provider: string, responseCode: string }>} delivery metadata
   */
  static async send(notification) {
    // Build recipient info (guest vs user)
    const recipientEmail = notification.guestEmail || notification.recipient?.email;
    const recipientName = notification.recipient?.name || 'User';

    // Instantiate the email client with recipient and optional action URL
    const emailClient = new EmailClient(
      { email: recipientEmail, name: recipientName },
      notification.action
    );

    try {
      // Use notification.type as template name
      await emailClient.send(notification.type, notification.title, {
        title: notification.title,
        message: notification.message,
        url: notification.action,
        firstName: recipientName.split(' ')[0],
        fullName: recipientName,
        logoUrl: `${process.env.FRONTEND_URL}/assets/logo.png`,
        supportPageUrl: `${process.env.FRONTEND_URL}/support`,
        appName: 'AcaDeVault', // <- add this
        facebookUrl: 'https://facebook.com/yourpage', // <- add socials
        twitterUrl: 'https://twitter.com/yourhandle',
        linkedinUrl: 'https://linkedin.com/company/yourcompany',
      });

      // Return minimal metadata for logging
      return {
        provider: process.env.NODE_ENV === 'production' ? 'mailgun' : 'mailtrap',
        responseCode: '200',
      };
    } catch (error) {
      // Log detailed context for debugging
      logger.error('Email notification failed', {
        notificationId: notification._id,
        to: recipientEmail,
        template: notification.type,
        subject: notification.title,
        error: error.message,
      });

      // Wrap and rethrow for upstream handling
      throw new AppError(
        `Email delivery failed for notification ${notification._id}: ${error.message}`,
        500
      );
    }
  }
}

export default EmailNotificationService;

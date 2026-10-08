import Notification from '../../api/models/NotificationModel.js';
import { NOTIFICATION_CHANNELS, NOTIFICATION_TYPES } from '../../constants/notificationEnums.js';
import AppError from '../../utils/HandleAppErrors.js';

export default class NotificationValidationService {
  /**
   * Validates the recipient for a notification based on its channel.
   * @param {Object} notification - Mongoose notification document
   * @param {string} notification.channel - Notification channel (e.g., EMAIL, IN_APP)
   * @param {ObjectId} [notification.recipient] - Mongoose User ID for registered users
   * @param {string} [notification.guestEmail] - Email for guest recipients
   * @throws {AppError} If recipient or guestEmail is invalid for the channel
   */
  static validateRecipient(notification) {
    const { channel, recipient, guestEmail } = notification;

    if (channel === NOTIFICATION_CHANNELS.EMAIL && guestEmail) {
      if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(guestEmail)) {
        throw new AppError('Invalid guestEmail format.', 400);
      }
    }

    if (channel === NOTIFICATION_CHANNELS.EMAIL) {
      if (notification.title.length > 998) {
        throw new AppError('Email subject exceeds 998 characters.', 400);
      }
      if (notification.message.length > 10000) {
        throw new AppError('Email message exceeds 10,000 characters.', 400);
      }
    }

    switch (channel) {
      case NOTIFICATION_CHANNELS.EMAIL:
        if (!recipient && !guestEmail) {
          throw new AppError(
            'Email notifications require either a registered user or a guestEmail.',
            400
          );
        }
        break;

      case NOTIFICATION_CHANNELS.IN_APP:
      case NOTIFICATION_CHANNELS.PUSH:
        if (!recipient) {
          throw new AppError(`${channel} notifications require a valid user recipient.`, 400);
        }
        break;

      case NOTIFICATION_CHANNELS.SMS:
        if (!recipient && !guestEmail) {
          throw new AppError(
            'SMS notifications require either a registered user or a guestEmail.',
            400
          );
        }
        break;

      case NOTIFICATION_CHANNELS.SYSTEM:
        // system messages have no recipient constraints
        break;

      default:
        throw new AppError(`Unsupported notification channel: ${channel}`, 400);
    }
  }

  /**
   * Ensure channel-specific required fields (e.g. actionUrl for certain types).
   */
  static validateChannelRequirements(notification) {
    const { channel, action, type } = notification;

    // Example: ensure certain types include an action URL
    const typesRequiringAction = [
      NOTIFICATION_TYPES.ORDER_CONFIRMATION,
      NOTIFICATION_TYPES.REFUND_CONFIRMATION,
      NOTIFICATION_TYPES.MATERIAL_UPDATE,
      NOTIFICATION_TYPES.NEW_COMMENT,
    ];

    if (typesRequiringAction.includes(type) && !action) {
      throw new AppError(`Notification of type '${type}' requires a valid action URL.`, 400);
    }

    // In-app notifications should not have action URLs longer than 2048 chars
    if (channel === NOTIFICATION_CHANNELS.IN_APP && action) {
      if (typeof action !== 'string' || action.length > 2048) {
        throw new AppError('In-app notification action URLs must be under 2048 characters.', 400);
      }
    }

    // No extra constraints for other channels at this time
  }

  /**
   * Validate the shape and values of deliveryAttempts entries.
   */
  static validateDeliveryAttempts(notification) {
    const { deliveryAttempts } = notification;
    if (!Array.isArray(deliveryAttempts)) return;

    deliveryAttempts.forEach((attempt, idx) => {
      const { attemptAt, status, provider, responseCode, error } = attempt;

      if (!(attemptAt instanceof Date)) {
        throw new AppError(`DeliveryAttempt #${idx} must have a valid attemptAt Date.`, 400);
      }

      if (!['success', 'failed'].includes(status)) {
        throw new AppError(`DeliveryAttempt #${idx} has invalid status '${status}'.`, 400);
      }

      if (provider && typeof provider !== 'string') {
        throw new AppError(`DeliveryAttempt #${idx} provider must be a string.`, 400);
      }

      if (responseCode && typeof responseCode !== 'string') {
        throw new AppError(`DeliveryAttempt #${idx} responseCode must be a string.`, 400);
      }

      if (error && typeof error !== 'string') {
        throw new AppError(`DeliveryAttempt #${idx} error message must be a string.`, 400);
      }
    });
  }

  static async validateRateLimit(notification) {
    const { recipient, guestEmail, channel } = notification;
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
    const recentCount = await Notification.countDocuments({
      $or: [{ recipient }, { guestEmail }],
      channel,
      createdAt: { $gte: oneHourAgo },
    });
    if (recentCount > (process.env.MAX_NOTIFICATIONS_PER_HOUR || 10)) {
      throw new AppError(`Rate limit exceeded for ${channel} notifications.`, 429);
    }
  }
}

// import { NOTIFICATION_CHANNELS } from '../../constants/notificationEnums.js';
// import AppError from '../../utils/HandleAppErrors.js';

// class NotificationValidationService {
//   /**
//    * Validates that either recipient or guestEmail is present, but not both.
//    * For system-wide notifications, allow both to be null.
//    */
//   static validateRecipient(notification) {
//     const { recipient, guestEmail } = notification;

//     if (recipient && guestEmail) {
//       throw new AppError('Notification cannot have both recipient and guestEmail.', 400);
//     }

//     if (!recipient && !guestEmail && notification.channel !== NOTIFICATION_CHANNELS.SYSTEM) {
//       throw new AppError(
//         'Notification must have a recipient or guestEmail unless system-wide.',
//         400
//       );
//     }
//   }

//   /**
//    * Ensures only valid transitions and delivery attempts
//    */
//   static validateDeliveryAttempts(notification) {
//     if (!Array.isArray(notification.deliveryAttempts)) return;

//     for (const attempt of notification.deliveryAttempts) {
//       if (!['success', 'failed'].includes(attempt.status)) {
//         throw new AppError(`Invalid delivery attempt status: ${attempt.status}`, 400);
//       }
//     }
//   }

//   /**
//    * Enforce required fields for some channels
//    */
//   static validateChannelRequirements(notification) {
//     const { channel, guestEmail, recipient } = notification;

//     if (channel === NOTIFICATION_CHANNELS.EMAIL && !guestEmail && !recipient) {
//       throw new AppError('Email notifications require a guestEmail or a user recipient.', 400);
//     }

//     if (channel === NOTIFICATION_CHANNELS.SMS && !guestEmail && !recipient) {
//       throw new AppError('SMS notifications require a guestEmail or a user recipient.', 400);
//     }
//   }
// }

// export default NotificationValidationService;

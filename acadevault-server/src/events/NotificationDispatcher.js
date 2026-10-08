import EventEmitter from 'events';
import NotificationBuilder from '../utils/NotificationBuilder.js';
import { logger } from '../utils/logger.js';
import { NOTIFICATION_CHANNELS, NOTIFICATION_TYPES } from '../constants/notificationEnums.js';
import NotificationService from '../services/notification/NotificationService.js';

/**
 * Central event bus for firing domain events that trigger notifications.
 * Example usage elsewhere in your app:
 *    dispatcher.emit('order.created', { userId, order });
 *
 * Listeners translate domain events into notification payloads via NotificationBuilder
 * and dispatch channel-specific notifications via NotificationService.
 */

class NotificationDispatcher extends EventEmitter {
  constructor() {
    super();
    this.registerListeners();
  }

  registerListeners() {
    this.on('user.accountActivated', async ({ user }) =>
      this._dispatchSafely(() =>
        new NotificationBuilder()
          .forUser(user)
          .useChannels([NOTIFICATION_CHANNELS.EMAIL, NOTIFICATION_CHANNELS.IN_APP])
          .withType(NOTIFICATION_TYPES.SUCCESS)
          .withTitle('🎉 Account Activated')
          .withMessage(`Welcome ${user.name}, your account is now active.`)
          .withAction('/dashboard')
          .withTemplate('accountActivated', { name: user.name })
          .build()
      )
    );

    this.on('order.created', async ({ user, order }) =>
      this._dispatchSafely(() =>
        new NotificationBuilder()
          .forUser(user)
          .useChannels([
            NOTIFICATION_CHANNELS.EMAIL,
            NOTIFICATION_CHANNELS.IN_APP,
            NOTIFICATION_CHANNELS.SMS,
          ])
          .withType(NOTIFICATION_TYPES.ORDER_CONFIRMATION)
          .withTitle(`📦 Order #${order.orderId} Confirmed`)
          .withMessage(`Hi ${user.name}, your order ${order.orderId} has been confirmed.`)
          .withAction(`/orders/${order.orderId}`)
          .withTemplate('orderConfirmation', {
            orderId: order.orderId,
            total: order.grandTotal,
            items: order.items,
          })
          .withMetadata({ orderId: order.orderId })
          .build()
      )
    );

    this.on('order.statusUpdated', async ({ user, order, newStatus }) =>
      this._dispatchSafely(() =>
        new NotificationBuilder()
          .forUser(user)
          .useChannels([
            NOTIFICATION_CHANNELS.EMAIL,
            NOTIFICATION_CHANNELS.SMS,
            NOTIFICATION_CHANNELS.IN_APP,
          ])
          .withType(NOTIFICATION_TYPES.ORDER_STATUS_UPDATE)
          .withTitle(`📢 Order Status: ${newStatus}`)
          .withMessage(`Your order (${order.orderId}) status has been updated to "${newStatus}".`)
          .withAction(`/orders/${order._id}`)
          .withTemplate('orderStatusUpdate', {
            orderId: order.orderId,
            newStatus,
            grandTotal: order.grandTotal,
          })
          .withMetadata({ orderId: order._id, newStatus })
          .build()
      )
    );

    this.on('order.cancelled', async ({ user, order }) =>
      this._dispatchSafely(() =>
        new NotificationBuilder()
          .forUser(user)
          .useChannels([
            NOTIFICATION_CHANNELS.EMAIL,
            NOTIFICATION_CHANNELS.SMS,
            NOTIFICATION_CHANNELS.IN_APP,
          ])
          .withType(NOTIFICATION_TYPES.ORDER_CANCELLED)
          .withTitle('❌ Order Cancelled')
          .withMessage(`Your order (${order.orderId}) has been cancelled.`)
          .withAction(`/orders/${order._id}`)
          .withTemplate('orderCancelled', {
            orderId: order.orderId,
            currency: order.currency,
            grandTotal: order.grandTotal,
            supportEmail: process.env.SUPPORT_EMAIL,
          })
          .withMetadata({ orderId: order._id })
          .build()
      )
    );

    this.on('payment.confirmed', async ({ user, payment, order }) =>
      this._dispatchSafely(() =>
        new NotificationBuilder()
          .forUser(user)
          .useChannels([
            NOTIFICATION_CHANNELS.EMAIL,
            NOTIFICATION_CHANNELS.SMS,
            NOTIFICATION_CHANNELS.IN_APP,
          ])
          .withType(NOTIFICATION_TYPES.PAYMENT_CONFIRMATION)
          .withTitle('✅ Payment Confirmed')
          .withMessage(`Payment for order (${order.orderId}) has been confirmed.`)
          .withAction(`/orders/${order._id}`)
          .withTemplate('paymentConfirmation', {
            amount: payment.amountPaid,
            currency: payment.currency,
            orderId: order.orderId,
            isDigital: order.isDigital,
          })
          .withMetadata({ paymentId: payment._id, orderId: order._id })
          .build()
      )
    );

    this.on('material.approved', async ({ creator, material }) =>
      this._dispatchSafely(() =>
        new NotificationBuilder()
          .forUser(creator)
          .useChannels([
            NOTIFICATION_CHANNELS.IN_APP,
            NOTIFICATION_CHANNELS.EMAIL,
            NOTIFICATION_CHANNELS.PUSH,
          ])
          .withType(NOTIFICATION_TYPES.MATERIAL_APPROVAL)
          .withTitle(`✅ Material Approved`)
          .withMessage(`Your material "${material.title}" is now live.`)
          .withAction(`/materials/${material._id}`)
          .withTemplate('materialApproved', {
            materialTitle: material.title,
            materialUrl: `/materials/${material._id}`,
          })
          .withMetadata({ materialId: material._id })
          .build()
      )
    );

    this.on('refund.processed', async ({ user, refund }) =>
      this._dispatch(() =>
        new NotificationBuilder()
          .forUser(user)
          .useChannels([NOTIFICATION_CHANNELS.EMAIL, NOTIFICATION_CHANNELS.PUSH])
          .withType(NOTIFICATION_TYPES.REFUND_CONFIRMATION)
          .withTitle('💸 Refund Processed')
          .withMessage(`Refund of ₦${refund.amount} has been processed.`)
          .withAction(`/orders/${refund.orderId}`)
          .withTemplate('refundConfirmation', {
            amount: refund.amount,
            refundDate: refund.processedAt,
            reason: refund.reason,
          })
          .withMetadata({ refundId: refund._id })
          .build()
      )
    );

    this.on('affiliate.payoutReady', async ({ user, payout }) =>
      this._dispatch(() =>
        new NotificationBuilder()
          .forUser(user)
          .useChannels([
            NOTIFICATION_CHANNELS.SMS,
            NOTIFICATION_CHANNELS.IN_APP,
            NOTIFICATION_CHANNELS.EMAIL,
          ])
          .withType(NOTIFICATION_TYPES.AFFILIATE_COMMISSION)
          .withTitle('💰 Payout Ready')
          .withMessage(`Hi ${user.name}, your ₦${payout.amount} payout is now ready.`)
          .withTemplate('affiliateCommission', {
            amount: payout.amount,
            date: payout.readyAt,
          })
          .withMetadata({ payoutId: payout._id })
          .build()
      )
    );
  }

  async _dispatchSafely(buildFn) {
    try {
      const notification = buildFn();
      await this._dispatchToChannels(notification);
    } catch (err) {
      logger.error('🚨 Notification dispatch failed', err);
    }
  }

  async _dispatchToChannels(payload) {
    for (const channel of payload.channels) {
      try {
        await NotificationService.sendNotification({
          ...payload,
          channel,
        });
      } catch (err) {
        logger.error(`⚠️ ${channel} channel failed for ${payload.type}`, err);
      }
    }
  }
}

const dispatcher = new NotificationDispatcher();
export default dispatcher;

// class NotificationDispatcher extends EventEmitter {
//   constructor() {
//     super();
//     this.registerListeners();
//   }

//   /**
//    * Register all domain event listeners.
//    */
//   registerListeners() {
//     // Order created -> send notifications on all configured channels
//     this.on('order.created', async ({ userId, order }) => {
//       try {
//         const built = NotificationBuilder.orderCreated({ userId, order });
//         await this._dispatchToChannels(userId, built);
//       } catch (err) {
//         logger.error('Failed to dispatch order.created notification', err);
//       }
//     });

//     // Refund processed -> send notifications on all configured channels
//     this.on('refund.processed', async ({ userId, refund }) => {
//       try {
//         const built = NotificationBuilder.refundProcessed({ userId, refund });
//         await this._dispatchToChannels(userId, built);
//       } catch (err) {
//         logger.error('Failed to dispatch refund.processed notification', err);
//       }
//     });

//     // Material approved -> notify creator
//     this.on('material.approved', async ({ creatorId, material }) => {
//       try {
//         const built = NotificationBuilder.materialApproval({ creatorId, material });
//         await this._dispatchToChannels(creatorId, built);
//       } catch (err) {
//         logger.error('Failed to dispatch material.approved notification', err);
//       }
//     });

//     // Add more event listeners here, e.g. new_comment, user_action, etc.
//   }

//   /**
//    * Internal helper to send a built notification across multiple channels.
//    * @param {string} recipientId - Mongoose user ID
//    * @param {Object} built - Payload from NotificationBuilder
//    */
//   async _dispatchToChannels(recipientId, built) {
//     const {
//       channels,
//       type,
//       title,
//       message,
//       templateName,
//       templateData,
//       actionUrl,
//       priority,
//       metadata,
//     } = built;
//     for (const channel of channels) {
//       try {
//         await NotificationService.sendNotification({
//           recipient: recipientId,
//           channel,
//           type,
//           title,
//           message,
//           action: actionUrl,
//           metadata,
//           priority,
//           // Pass template info for email/SMS as metadata
//           ...(templateName ? { templateName, templateData } : {}),
//         });
//       } catch (err) {
//         logger.error(`Failed on channel '${channel}' for notification type '${type}'`, err);
//       }
//     }
//   }
// }

// // Export a singleton dispatcher instance
// const dispatcher = new NotificationDispatcher();
// export default dispatcher;

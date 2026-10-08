import { NOTIFICATION_PRIORITIES, NOTIFICATION_TYPES } from '../constants/notificationEnums.js';

/**
 * Fluent builder for crafting consistent notification payloads.
 * Supports user or guest, multiple channels, template metadata, and action URLs.
 */
export default class NotificationBuilder {
  constructor() {
    this.payload = {
      type: NOTIFICATION_TYPES.INFO,
      title: '',
      message: '',
      priority: NOTIFICATION_PRIORITIES.MEDIUM,
      metadata: {},
      channels: [],
    };
  }
  /** Recipient: Registered user */
  forUser(user) {
    this.payload.recipient = user._id || user.id;
    this.payload.metadata.firstName = user.name?.split(' ')[0] || 'User';
    this.payload.metadata.userEmail = user.email;
    return this;
  }

  /** Recipient: Guest user (for one-time alerts) */
  forGuest(email, name = 'Guest') {
    this.payload.guestEmail = email;
    this.payload.metadata.firstName = name;
    return this;
  }

  /** Set delivery channels: email, in-app, sms, push, socket */
  useChannels(channels = []) {
    this.payload.channels = Array.from(new Set(channels));
    return this;
  }

  /** Notification type: info, success, material_approved, order_confirmation */
  withType(type) {
    this.payload.type = type;
    return this;
  }

  /** Title for email, in-app, and push */
  withTitle(title) {
    this.payload.title = title;
    return this;
  }

  /** General message or fallback description */
  withMessage(message) {
    this.payload.message = message;
    return this;
  }

  /** Priority: low, medium, high (used by queues, push importance, etc.) */
  withPriority(priority) {
    this.payload.priority = priority;
    return this;
  }

  /** Action URL: button CTA for emails, in-app, push */
  withAction(url) {
    this.payload.action = url;
    return this;
  }

  /** Arbitrary metadata (orderId, refundId, material info, etc.) */
  withMetadata(meta = {}) {
    this.payload.metadata = { ...this.payload.metadata, ...meta };
    return this;
  }

  /** For templated content rendering (Handlebars/etc.) */
  withTemplate(name, data = {}) {
    this.payload.templateName = name;
    this.payload.templateData = data;
    return this;
  }

  /** Custom SMS fallback content (e.g., plain-text order status) */
  withSmsText(smsText) {
    this.payload.smsText = smsText;
    return this;
  }

  /** Push notification override: title & data payload */
  withPushPayload(pushTitle, pushData = {}) {
    this.payload.pushTitle = pushTitle;
    this.payload.pushData = pushData;
    return this;
  }

  /** Final build step */
  build() {
    const { recipient, guestEmail, channels } = this.payload;

    if (!recipient && !guestEmail) {
      throw new Error('Notification must target a user or guest email');
    }

    if (!channels || channels.length === 0) {
      throw new Error('Notification must include at least one channel');
    }

    if (!this.payload.title && !this.payload.templateName) {
      throw new Error('Notification must include a title or template');
    }

    return { ...this.payload };
  }
}

// import {
//   NOTIFICATION_CHANNELS,
//   NOTIFICATION_PRIORITIES,
//   NOTIFICATION_TYPES,
// } from '../constants/notificationEnums.js';
// import config from '../config.js';

// /**
//  * NotificationBuilder constructs consistent payloads for different notification types.
//  * Each method returns an object describing channel, type, title, message, templateName,
//  * templateData, actionUrl, priority, and any extra metadata.
//  */
// export default class NotificationBuilder {
//   /**
//    * Build payload for order confirmation.
//    * @param {Object} params
//    * @param {String} params.userId
//    * @param {Object} params.order - Order document or DTO
//    * @returns {Object}
//    */
//   static orderCreated({ userId, order }) {
//     const actionUrl = `${config.frontendUrl}/orders/${order.orderId}`;
//     return {
//       channels: [NOTIFICATION_CHANNELS.EMAIL, NOTIFICATION_CHANNELS.IN_APP],
//       type: NOTIFICATION_TYPES.ORDER_CONFIRMATION,
//       title: `Order #${order.orderId} Confirmed`,
//       message: `Hi ${order.customerName}, your order has been confirmed!`,
//       templateName: 'orderConfirmation',
//       templateData: {
//         orderId: order.orderId,
//         items: order.items.map((i) => ({
//           title: i.material.title,
//           quantity: i.quantity,
//           price: i.unitPrice.toFixed(2),
//           subtotal: i.subtotal.toFixed(2),
//         })),
//         grandTotal: order.grandTotal.toFixed(2),
//         currency: order.currency,
//         orderDate: order.createdAt.toISOString(),
//       },
//       actionUrl,
//       priority: NOTIFICATION_PRIORITIES.MEDIUM,
//       metadata: { orderId: order.orderId },
//     };
//   }

//   /**
//    * Build payload for refund processed notification.
//    */
//   static refundProcessed({ userId, refund }) {
//     const actionUrl = `${config.frontendUrl}/orders/${refund.orderId}/refunds/${refund.refundId}`;
//     return {
//       channels: [NOTIFICATION_CHANNELS.EMAIL, NOTIFICATION_CHANNELS.IN_APP],
//       type: NOTIFICATION_TYPES.REFUND_CONFIRMATION,
//       title: `Refund #${refund.refundId} Processed`,
//       message: `Your refund of ${refund.currency} ${refund.amount.toFixed(2)} has been processed.`,
//       templateName: 'refundConfirmation',
//       templateData: {
//         orderId: refund.orderId,
//         refundId: refund.refundId,
//         amount: refund.amount.toFixed(2),
//         currency: refund.currency,
//         refundDate: refund.processedAt.toISOString(),
//         reason: refund.reason,
//       },
//       actionUrl,
//       priority: NOTIFICATION_PRIORITIES.HIGH,
//       metadata: { refundId: refund.refundId },
//     };
//   }

//   /**
//    * Build payload for material approval notification.
//    */
//   static materialApproval({ creatorId, material }) {
//     const actionUrl = `${config.frontendUrl}/materials/${material._id}`;
//     return {
//       channels: [NOTIFICATION_CHANNELS.EMAIL, NOTIFICATION_CHANNELS.IN_APP],
//       type: NOTIFICATION_TYPES.MATERIAL_APPROVAL,
//       title: `Your material "${material.title}" is Live`,
//       message: `Congratulations! Your material '${material.title}' has been approved and is now live.`,
//       templateName: 'materialApproved',
//       templateData: {
//         materialTitle: material.title,
//         materialId: material._id,
//         platformUrl: config.frontendUrl,
//       },
//       actionUrl,
//       priority: NOTIFICATION_PRIORITIES.MEDIUM,
//       metadata: { materialId: material._id },
//     };
//   }

//   /**
//    * Build payload for arbitrary custom notification.
//    * @param {Object} params
//    * @param {String[]} params.channels
//    * @param {String} params.type
//    * @param {String} params.title
//    * @param {String} params.message
//    * @param {String} [params.templateName]
//    * @param {Object} [params.templateData]
//    * @param {String} [params.actionUrl]
//    * @param {String} [params.priority]
//    * @param {Object} [params.metadata]
//    * @returns {Object}
//    */
//   static custom({
//     channels,
//     type,
//     title,
//     message,
//     templateName = null,
//     templateData = {},
//     actionUrl = null,
//     priority = NOTIFICATION_PRIORITIES.MEDIUM,
//     metadata = {},
//   }) {
//     return {
//       channels,
//       type,
//       title,
//       message,
//       templateName,
//       templateData,
//       actionUrl,
//       priority,
//       metadata,
//     };
//   }

//   // TODO: Add more builders (newComment, userAction, affiliateCommission, etc.)
// }

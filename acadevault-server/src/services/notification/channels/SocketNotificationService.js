import Notification from '../../../api/models/NotificationModel.js';
import { logger } from '../../../utils/logger.js';

/**
 * SocketNotificationService
 * - Emits to user rooms under `/notifications` namespace.
 * - Persists to DB if user is offline.
 */
class SocketNotificationService {
  static connectedUsers = new Map();

  /**
   * Registers a user's socket connection.
   * Called during 'register' socket event.
   */
  static registerUser(userId, socketId) {
    const sockets = this.connectedUsers.get(userId) || [];
    this.connectedUsers.set(userId, [...sockets, socketId]);
    logger.info(`✅ User registered: ${userId} on socket ${socketId}`);
  }

  /**
   * Cleans up socket on disconnect.
   */
  static removeSocket(socketId) {
    for (const [userId, sockets] of this.connectedUsers.entries()) {
      if (sockets.includes(socketId)) {
        const remaining = sockets.filter((id) => id !== socketId);
        if (remaining.length === 0) this.connectedUsers.delete(userId);
        else this.connectedUsers.set(userId, remaining);
        logger.info(`❌ Socket ${socketId} removed from user ${userId}`);
        break;
      }
    }
  }

  /**
   * Emits a notification to a specific user.
   * Falls back to DB if user is offline.
   */
  static async sendToUser(notification) {
    const userId = notification.recipient?.toString();
    if (!userId) throw new Error('Notification.recipient is required');

    const room = `user:${userId}`;
    const socketIds = this.connectedUsers.get(userId);
    const payload = {
      id: notification._id.toString(),
      type: notification.type,
      title: notification.title,
      message: notification.message,
      action: notification.action || null,
      metadata: notification.metadata || {},
      createdAt: notification.createdAt,
    };

    const namespace = global.io?.of?.('/notifications');

    if (socketIds?.length && namespace) {
      socketIds.forEach((socketId) => {
        namespace.to(socketId).emit('notification', payload);
      });
      logger.info(`📨 Notification sent to ${userId} via sockets`, { userId, socketIds });
      return { provider: 'socket', responseCode: 'OK' };
    } else {
      // Persist for offline delivery
      await new Notification(notification).save();
      logger.info(`💾 Notification persisted for offline user ${userId}`);
      return { provider: 'fallback-db', responseCode: 'SAVED' };
    }
  }

  /**
   * Emit notification to an entire room
   */
  static sendToRoom(room, payload) {
    global.io.of('/notifications').to(room).emit('notification', payload);
    logger.info(`📢 Notification broadcasted to room: ${room}`);
    return { provider: 'socket', responseCode: 'ROOM' };
  }
}

export default SocketNotificationService;

// import { logger } from '../../../utils/logger.js';

// /**
//  * SocketNotificationService
//  * - Emits in-app notifications via Socket.IO.
//  * - Assumes `global.io` is initialized and attached in server bootstrap.
//  */
// class SocketNotificationService {
//   /**
//    * Emit a notification to the user's socket room.
//    * @param {Object} notification - Notification document
//    * @returns {Promise<{ provider: string, responseCode: string }>}
//    */
//   static async send(notification) {
//     try {
//       if (!global.io) {
//         throw new Error('Socket.IO server (global.io) not initialized');
//       }

//       if (!notification.recipient) {
//         throw new Error('Notification.recipient is required for in-app delivery');
//       }

//       const userId = notification.recipient.toString();
//       const room = `user:${userId}`;

//       const payload = {
//         id: notification._id.toString(),
//         type: notification.type,
//         title: notification.title,
//         message: notification.message,
//         action: notification.action || null,
//         metadata: notification.metadata || {},
//         createdAt: notification.createdAt,
//       };

//       global.io.to(room).emit('notification', payload);

//       logger.info('📨 Socket notification emitted', {
//         userId,
//         notificationId: payload.id,
//         room,
//       });

//       return { provider: 'socket', responseCode: 'OK' };
//     } catch (err) {
//       logger.error('❌ SocketNotificationService.send failed', {
//         notificationId: notification._id,
//         error: err.message,
//       });
//       throw err;
//     }
//   }
// }

// export default SocketNotificationService;

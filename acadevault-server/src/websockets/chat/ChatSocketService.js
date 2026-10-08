import { logger } from '../../utils/logger.js';

// In-memory store of connected chat users (userId -> socketId[])
const chatUsers = new Map();

/**
 * Sets up the /chat namespace for real-time chat.
 * @param {import('socket.io').Server} io - Socket.IO server instance
 */
const setupChatSocket = (io) => {
  const nsp = io.of('/chat');

  nsp.on('connection', (socket) => {
    logger.info(`🟢 [chat] Socket connected: ${socket.id}`);

    // Register a user to enable targeted messaging
    socket.on('register', ({ userId }) => {
      if (!userId) return logger.warn('❌ Chat registration missing userId');
      const sockets = chatUsers.get(userId) || [];
      chatUsers.set(userId, [...sockets, socket.id]);

      logger.info(`💬 User registered in chat: ${userId}`);
    });

    // Join a chat room (e.g., room: chat:orderId or chat:user:userId)
    socket.on('joinRoom', (room) => {
      if (!room) return;
      socket.join(room);
      logger.info(`👥 Socket ${socket.id} joined chat room: ${room}`);
    });

    // Receive a message and broadcast to room (can be persisted upstream)
    socket.on('sendMessage', ({ room, message, senderId, metadata = {} }) => {
      if (!room || !message) return logger.warn('❗ sendMessage missing room or message');
      const payload = {
        senderId,
        message,
        metadata,
        sentAt: new Date(),
      };

      nsp.to(room).emit('message', payload);
      logger.info(`📤 Message sent to chat room ${room}`, { senderId });
    });

    // Disconnect cleanup
    socket.on('disconnect', () => {
      for (const [userId, sockets] of chatUsers.entries()) {
        if (sockets.includes(socket.id)) {
          const filtered = sockets.filter((id) => id !== socket.id);
          if (filtered.length === 0) chatUsers.delete(userId);
          else chatUsers.set(userId, filtered);

          logger.info(`🔌 Chat user ${userId} disconnected`);
          break;
        }
      }
    });

    // Handle socket-level errors
    socket.on('error', (err) => {
      logger.error(`❌ Chat socket error (${socket.id}): ${err.message}`);
    });
  });

  return nsp;
};

export const sendDirectChatMessage = (userId, payload) => {
  const socketIds = chatUsers.get(userId);
  if (!socketIds?.length) {
    logger.warn(`📭 No active socket for user ${userId}, message not delivered`);
    return;
  }

  socketIds.forEach((socketId) => {
    global.io.of('/chat').to(socketId).emit('message', payload);
  });

  logger.info(`📨 Direct chat message sent to user ${userId}`);
};

export const sendChatRoomMessage = (room, payload) => {
  global.io.of('/chat').to(room).emit('message', payload);
  logger.info(`📢 Chat message broadcasted to room ${room}`);
};

export default setupChatSocket;

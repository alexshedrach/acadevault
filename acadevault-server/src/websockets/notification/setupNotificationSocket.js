import SocketNotificationService from '../../services/notification/channels/SocketNotificationService.js';
import { logger } from '../../utils/logger.js';

/**
 * Mounts the /notifications namespace.
 */
const setupNotificationSocket = (io) => {
  const nsp = io.of('/notifications');

  nsp.on('connection', (socket) => {
    logger.info(`🔌 [notifications] Connected: ${socket.id}`);

    socket.on('register', ({ userId }) => {
      if (!userId) return;
      SocketNotificationService.registerUser(userId, socket.id);
    });

    socket.on('joinRoom', (room) => {
      socket.join(room);
      logger.info(`🔔 Socket ${socket.id} joined ${room}`);
    });

    socket.on('disconnect', () => {
      SocketNotificationService.removeSocket(socket.id);
    });

    socket.on('error', (err) => {
      logger.error(`💥 Socket error (${socket.id}): ${err.message}`);
    });
  });

  return nsp;
};

export default setupNotificationSocket;

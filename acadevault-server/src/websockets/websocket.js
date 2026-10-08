import { Server } from "socket.io";
import { logger } from "../utils/logger.js";
import Notification from "../api/models/NotificationModel.js";

// Store connected users globally
const connectedUsers = new Map();

const setupWebSocket = (server) => {
  // Initialize Socket.IO with CORS configuration
  const io = new Server(server, {
    cors: {
      origin: process.env.CLIENT_ORIGIN || "*", // Specify the origin in production
      methods: ["GET", "POST", "PUT", "DELETE"],
    },
  });

  // Redis setup for scaling
  // const pubClient = createClient({ url: process.env.REDIS_URL });
  // const subClient = pubClient.duplicate();
  // pubClient.connect();
  // subClient.connect();
  // io.adapter(createAdapter(pubClient, subClient));

  global.io = io; // Make io globally accessible

  // Socket.IO connection handling
  io.on("connection", (socket) => {
    logger.info(`✅ New WebSocket connection: ${socket.id}`);

    // Register user with their userId and role
    socket.on("register", (userData) => {
      if (!userData || !userData.userId || !userData.role) {
        logger.warn(
          `❌ Invalid user registration data from socket: ${socket.id}`
        );
        return;
      }

      const existingConnections = connectedUsers.get(userData.userId) || [];
      connectedUsers.set(userData.userId, [...existingConnections, socket.id]);

      logger.info(`👤 User Registered: ${userData.userId} (${userData.role})`);
    });

    // Join a specific room (e.g., user room, seller room, admin room)
    socket.on("joinRoom", (room) => {
      socket.join(room);
      logger.info(`🔔 User ${socket.id} joined room: ${room}`);
    });

    // Disconnect handling
    socket.on("disconnect", () => {
      for (const [userId, socketIds] of connectedUsers.entries()) {
        if (socketIds.includes(socket.id)) {
          connectedUsers.set(
            userId,
            socketIds.filter((id) => id !== socket.id)
          );
          if (connectedUsers.get(userId).length === 0) {
            connectedUsers.delete(userId);
          }
          logger.info(`❌ User Disconnected: ${userId}`);
          break;
        }
      }
    });

    // Handle WebSocket errors
    socket.on("error", (err) => {
      logger.error(`❌ WebSocket error on socket ${socket.id}: ${err.message}`);
    });
  });

  // Handle server-level WebSocket errors
  io.on("error", (err) => {
    logger.error(`❌ WebSocket server error: ${err.message}`);
  });

  return io;
};

// Send notification to a specific user
export const sendNotification = async (userId, notification) => {
  const socketIds = connectedUsers.get(userId);
  if (socketIds && socketIds.length > 0) {
    socketIds.forEach((socketId) => {
      global.io.to(socketId).emit("notification", notification);
    });
    logger.info(`📩 Notification sent to user ${userId}`);
  } else {
    // Persist notification for offline users
    const newNotification = new Notification({
      recipient: userId,
      title: notification.title,
      message: notification.message,
      type: notification.type,
      priority: notification.priority,
      action: notification.action,
    });

    await newNotification.save();

    logger.info(`💾 Notification saved for offline user ${userId}`);
  }
};

// Send notification to a specific room
export const sendRoomNotification = (room, notification) => {
  global.io.to(room).emit("notification", notification);
  logger.info(`📩 Notification sent to room: ${room}`);
};

export default setupWebSocket;

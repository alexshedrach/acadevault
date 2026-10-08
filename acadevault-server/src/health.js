import mongoose from 'mongoose';
import { redisClient } from './config/redis.js';

export const healthCheck = (io) => (req, res) => {
  res.status(200).json({
    uptime: process.uptime(),
    status: 'ok',
    services: {
      database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
      redis: redisClient.isOpen ? 'connected' : 'disconnected',
      websocketClients: io.engine.clientsCount,
    },
    timestamp: new Date().toISOString(),
  });
};

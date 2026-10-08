import { createClient } from 'redis';
import { logger } from '../utils/logger.js';

const redisClient = createClient({ url: process.env.REDIS_URL || 'redis://localhost:6379' });
const redisSubscriber = redisClient.duplicate();

export async function connectRedis() {
  try {
    await Promise.all([redisClient.connect(), redisSubscriber.connect()]);
    logger.info('✅ Redis connected');
  } catch (error) {
    logger.error('❌ Redis connection failed:', error);
    process.exit(1);
  }
}

export { redisClient, redisSubscriber };

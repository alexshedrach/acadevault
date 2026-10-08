
import { Queue } from 'bullmq';
import { redisConnection } from './redisClient.js'; 

export const thumbnailQueue = new Queue('thumbnail-generation', {
  connection: redisConnection,
});

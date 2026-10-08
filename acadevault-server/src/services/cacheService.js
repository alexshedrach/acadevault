import redis from "redis";
import { promisify } from "util";

// Create a Redis client and connect
const client = redis.createClient({
  host: process.env.REDIS_HOST, // Use your Redis host if it's remote
  port: process.env.REDIS_PORT, // Use your Redis port
});

// Promisify the Redis client methods to work with async/await
const getAsync = promisify(client.get).bind(client);
const setAsync = promisify(client.set).bind(client);

// Cache Ranking - Save ranking score to Redis
export const cacheRanking = async (materialId, rankScore) => {
  await setAsync(`material:${materialId}:rank`, rankScore, "EX", 3600); // Cache expires in 1 hour
};

// Get Cached Ranking - Fetch ranking score from Redis
export const getCachedRanking = async (materialId) => {
  const cachedRank = await getAsync(`material:${materialId}:rank`);
  return cachedRank ? parseFloat(cachedRank) : null; // Return null if not found
};

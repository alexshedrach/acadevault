import cron from "node-cron";
import Shop from "../api/models/ShopModel.js";
import { validateFollowerCount } from "../utils/validateFollowerCount.js";
import { logger } from "../utils/logger.js";

const validateAllFollowerCounts = async () => {
  const pageSize = 100; // Process in batches
  let page = 0;

  while (true) {
    const shops = await Shop.find({})
      .skip(page * pageSize)
      .limit(pageSize);

    if (!shops.length) break;

    for (const shop of shops) {
      try {
        await validateFollowerCount(shop._id);
      } catch (error) {
        logger.error(
          `❌ Error validating follower count for Shop (${shop._id}): ${error.message}`
        );
      }
    }

    page++;
  }
};

// Schedule the cron job
export const scheduleFollowerValidationJob = () => {
  cron.schedule("0 0 * * *", async () => {
    logger.info("🔄 Cron Job Triggered: Validating follower counts...");
    await validateAllFollowerCounts();
    logger.info("✅ Follower count validation completed.");
  });

  logger.info("✅ Cron job for follower count validation scheduled.");
};

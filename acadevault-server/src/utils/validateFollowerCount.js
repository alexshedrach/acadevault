import Follow from "../api/models/FollowModel.js";
import Shop from "../api/models/ShopModel.js";
import { logger } from "./logger.js";

export const validateFollowerCount = async (shopId) => {
  try {
    const actualFollowerCount = await Follow.countDocuments({
      following: shopId,
      followingType: "Shop",
      status: "Accepted",
    });

    const shop = await Shop.findById(shopId);

    if (!shop) {
      logger.warn(`⚠️ Shop (${shopId}) not found.`);
      return;
    }

    if (shop.followerCount !== actualFollowerCount) {
      await Shop.findByIdAndUpdate(shopId, {
        followerCount: actualFollowerCount,
      });
      logger.info(
        `✅ Updated follower count for Shop (${shopId}): ${actualFollowerCount}`
      );
    } else {
      logger.info(`✅ Follower count for Shop (${shopId}) is accurate.`);
    }
  } catch (error) {
    logger.error(
      `❌ Error updating follower count for Shop (${shopId}): ${error.message}`
    );
  }
};

import { FOLLOW_STATUSES } from '../constants/enums.js';
import Follow from "../api/models/FollowModel.js";
import User from "../api/models/UserModel.js";
import AppError from "../utils/HandleAppErrors.js";
import { logger } from "../utils/logger.js";
import { validateObjectId } from "../utils/validateObjectId.js";

export default class FollowService {
  /**
   * Handle follow or unfollow requests for entities.
   * @param {String} followerId - ID of the user following.
   * @param {String} targetId - ID of the entity being followed.
   * @param {String} targetType - Type of the entity being followed.
   * @returns {Object} - Response with success status and message.
   */
  static async handleFollowEntity(followerId, targetId, targetType = "User") {
    const validTypes = ["User", "Shop"];
    if (!validTypes.includes(targetType)) {
      throw new Error("Invalid target type for follow request.");
    }

    try {
      // Handle follow logic
      const result = await Follow.handleFollowRequest(
        followerId,
        targetId,
        targetType
      );

      // Check for a reciprocal follow document
      const reciprocalFollow = await Follow.findOne({
        follower: targetId,
        following: followerId,
        followingType: targetType,
        status: FOLLOW_STATUSES.ACCEPTED,
      });

      if (reciprocalFollow) {
        // Update both documents to reflect mutuality
        const currentFollow = await Follow.findOne({
          follower: followerId,
          following: targetId,
          followingType: targetType,
          status: FOLLOW_STATUSES.ACCEPTED,
        });

        if (currentFollow) {
          currentFollow.isMutual = true;
          reciprocalFollow.isMutual = true;

          await Promise.all([currentFollow.save(), reciprocalFollow.save()]);
        }
      }

      return result;
    } catch (error) {
      console.error("Error in handleFollowEntity:", error.message);
      throw new Error("Failed to handle follow/unfollow operation.");
    }
  }

  static async acceptFollowRequest({ currentUserId, requesterId }) {
    validateObjectId(currentUserId, "User");
    validateObjectId(requesterId, "Follow");

    const result = await Follow.acceptFollowRequest({
      currentUserId,
      requesterId,
    });

    // Check for mutual follow relationship
    const currentFollow = await Follow.findOne({
      follower: requesterId,
      following: currentUserId,
      status: FOLLOW_STATUSES.ACCEPTED,
    });

    const reciprocalFollow = await Follow.findOne({
      follower: currentUserId,
      following: requesterId,
      status: FOLLOW_STATUSES.ACCEPTED,
    });

    if (currentFollow && reciprocalFollow) {
      currentFollow.isMutual = true;
      reciprocalFollow.isMutual = true;

      await Promise.all([currentFollow.save(), reciprocalFollow.save()]);
    }

    return result;
  }

  static async unfollowEntityService({ followerId, targetId, targetType }) {
    try {
      // Log the unfollow request
      logger.info(
        `User ${followerId} is attempting to unfollow ${targetType} with ID ${targetId}`
      );

      // Check if the user is actively following the target
      const isFollowing = await Follow.isFollowing(
        followerId,
        targetId,
        targetType
      );
      if (!isFollowing) {
        throw new AppError(
          "You are not following this entity or the follow is inactive.",
          400
        );
      }

      // Unfollow the target entity
      const result = await Follow.unfollowUserEntity(
        followerId,
        targetId,
        targetType
      );

      // Log successful unfollow
      logger.info(
        `User ${followerId} successfully unfollowed ${targetType} with ID ${targetId}`
      );

      return result;
    } catch (error) {
      logger.error(`Failed to unfollow: ${error.message}`);
      throw new AppError(
        error.message || "Failed to unfollow the target entity.",
        500
      );
    }
  }
  static async rejectFollowService({ currentUserId, requesterId }) {
    try {
      // Call the model method to reject the follow request
      const result = await Follow.handleFollowRequestRejection({
        currentUserId,
        requesterId,
      });

      return result;
    } catch (error) {
      throw new AppError(
        error.message || "Failed to reject follow request.",
        500
      );
    }
  }
  /**
   * Toggle the block status of a follower for a specific entity.
   */
  static async toggleBlockStatus(followerId, entityId, entityType) {
    // Call the model's toggleBlock method directly
    const updatedFollow = await Follow.toggleBlock(
      followerId,
      entityId,
      entityType
    );

    if (!updatedFollow) {
      throw new AppError("Follow relationship not found.", 404);
    }

    return updatedFollow;
  }

  /**
   * Fetches followers of a user
   *
   * @param {string} userId - The user whose followers are being fetched.
   * @param {Object} queryString - Query parameters for pagination, sorting, etc.
   * @returns {Object} - Contains followers and pagination metadata.
   * @throws {AppError} - Throws error if userId is invalid or any other issues occur.
   */
  static async getFollowers(userId, queryString = {}) {
    try {
      if (!userId) {
        throw new AppError("User ID is required to fetch followers", 400);
      }

      // Use the Follow model to get followers
      const followersData = await Follow.getFollowers(userId, queryString);
      return followersData;
    } catch (error) {
      logger.error("Failed to fetch followers", error); // Log the error with details
      throw new AppError(
        error.message || "An error occurred while fetching followers.",
        500
      );
    }
  }
  /**
   * Fetches followings of a user
   *
   * @param {string} userId - The user whose followers are being fetched.
   * @param {Object} queryString - Query parameters for pagination, sorting, etc.
   * @returns {Object} - Contains followers and pagination metadata.
   * @throws {AppError} - Throws error if userId is invalid or any other issues occur.
   */
  static async getFollowings(userId, queryString = {}) {
    try {
      if (!userId) {
        throw new AppError("User ID is required to fetch following", 400);
      }

      // Use the Follow model to get followers
      const followingsData = await Follow.getFollowings(userId, queryString);
      return followingsData;
    } catch (error) {
      logger.error("Failed to fetch followings", error); // Log the error with details
      throw new AppError(
        error.message || "An error occurred while fetching following.",
        500
      );
    }
  }

  /**
   * Remove a follower relationship.
   */
  static async removeFollower(userId, followerId) {
    const user = await User.findById(userId);
    const follower = await User.findById(followerId);

    if (!user || !follower) {
      throw new AppError("User or follower not found.", 404);
    }

    await Follow.deleteOne({ follower: followerId, following: userId });

    return { message: "Follower removed successfully." };
  }

  /**
   * Force a follow relationship between two users.
   */
  static async forceFollow(followerId, followingId) {
    const follower = await User.findById(followerId);
    const following = await User.findById(followingId);

    if (!follower || !following) {
      throw new AppError("Follower or following user not found.", 404);
    }

    const existingFollow = await Follow.findOne({
      follower: followerId,
      following: followingId,
    });

    if (!existingFollow) {
      await Follow.create({ follower: followerId, following: followingId });
    }

    return { message: "Follow relationship created successfully." };
  }

  /**
   * Fetches the follower count for a user.
   *
   * @param {string} userId - The user whose follower count is being fetched.
   * @returns {number} - The number of followers.
   * @throws {AppError} - Throws error if unable to fetch follower count.
   */
  static async getFollowerCount(userId) {
    try {
      const count = await Follow.getFollowerCount(userId);
      return count;
    } catch (error) {
      logger.error("Failed to fetch follower count", error); // Log error
      throw new AppError(
        error.message || "An error occurred while fetching follower count.",
        500
      );
    }
  }

  /**
   * Fetches mutual followers based on user interests.
   *
   * @param {string} userId - The user whose mutual followers are being fetched.
   * @param {Object} queryString - Query parameters for pagination, sorting, etc.
   * @returns {Object} - Contains mutual followers and pagination metadata.
   * @throws {AppError} - Throws error if an issue occurs while fetching mutual followers.
   */
  static async getMutualFollowersAndCount(userId, queryString) {
    try {
      const mutualFollowersData = await Follow.getMutualFollowsAndCount(
        userId,
        queryString
      );
      return mutualFollowersData;
    } catch (error) {
      logger.error("Failed to fetch mutual followers", error); // Log error
      throw new AppError(
        error.message || "An error occurred while fetching mutual followers.",
        500
      );
    }
  }

  /**
   * Retrieves the following count for a specific user.
   *
   * @param {string} userId - The ID of the user.
   * @returns {number} - The number of users the user is following.
   * @throws {AppError} - If unable to retrieve the count.
   */
  static async getFollowingCountService(userId) {
    try {
      const count = await Follow.getFollowingCount(userId);

      if (count === null) {
        throw new AppError("Could not retrieve following count.", 500);
      }

      return count;
    } catch (error) {
      logger.error(`Error fetching following count for user: ${userId}`, error);
      throw new AppError(
        error.message || "Error fetching following count.",
        500
      );
    }
  }

  /**
   * Retrieves the details of the follow relationship between two users.
   *
   * @param {string} followerId - The ID of the follower.
   * @param {string} followingId - The ID of the following user.
   * @param {string} followingType - The type of following (default is "User").
   * @returns {Object} - Follow relationship details.
   * @throws {AppError} - If no active follow relationship is found.
   */
  static async getFollowRelationshipDetails(
    followerId,
    followingId,
    followingType = "User"
  ) {
    try {
      const follow = await Follow.findOne({
        follower: followerId,
        following: followingId,
        followingType: followingType,
        status: { $in: ["Accepted", "Mutual"] },
      }).populate("follower following");

      if (!follow) {
        throw new AppError("No active follow relationship found.", 404);
      }

      return follow;
    } catch (error) {
      logger.error(
        `Error fetching follow relationship between ${followerId} and ${followingId}`,
        error
      );
      throw new AppError(
        error.message || "Error fetching follow relationship details.",
        500
      );
    }
  }

  /**
   * Marks a follow relationship as mutual.
   *
   * @param {string} followId - The ID of the follow relationship.
   * @returns {Object} - Updated follow relationship with a mutual status.
   * @throws {AppError} - If the follow relationship is not found.
   */
  static async markFollowMutual(followId) {
    try {
      const follow = await Follow.findById(followId);

      if (!follow) {
        throw new AppError("Follow relationship not found.", 404);
      }

      const result = await follow.markMutual();
      return result;
    } catch (error) {
      logger.error(
        `Error marking follow as mutual for followId: ${followId}`,
        error
      );
      throw new AppError(
        error.message || "Error marking follow relationship as mutual.",
        500
      );
    }
  }

  /**
   * Get all pending follow requests for a specific entity (user or shop).
   *
   * @param {string} entityId - The entity's ID (user or shop).
   * @param {string} entityType - The entity type (either 'User' or 'Shop').
   * @param {Object} queryString - Query parameters for pagination, sorting, etc.
   * @returns {Object} - Object containing pending follow requests and pagination details.
   */
  static async getPendingFollowRequests(entityId, entityType, queryString) {
    try {
      const { pendingRequests, pagination } = await Follow.getPendingRequests(
        entityId,
        entityType,
        queryString
      );
      return { pendingRequests, pagination };
    } catch (error) {
      throw new AppError(error.message, error.statusCode || 500);
    }
  }

  /**
   * Get the most followed entities (User or Shop) with additional details.
   *
   * @param {string} targetType - Target entity type ('User' or 'Shop').
   * @param {Object} queryString - Query parameters for pagination, sorting, etc.
   * @returns {Object} - Object containing most followed entities with additional details.
   */
  static async getMostFollowedEntities(targetType, queryString) {
    try {
      const mostFollowedEntities = await Follow.getMostFollowedEntity(
        targetType,
        queryString
      );
      return mostFollowedEntities;
    } catch (error) {
      throw new AppError(error.message, error.statusCode || 500);
    }
  }

  /**
   * Get follower analytics for a specific target type (User or Shop).
   *
   * @param {string} targetType - Target entity type ('User' or 'Shop').
   * @param {Object} queryString - Query parameters for pagination, sorting, etc.
   * @returns {Object} - Object containing follower analytics data.
   */
  static async getFollowAnalytics(type, queryString) {
    try {
      const { analytics, pagination } = await Follow.getFollowAnalytics(
        type,
        queryString
      );
      return { analytics, pagination };
    } catch (error) {
      throw new AppError(error.message, error.statusCode || 500);
    }
  }

  static async listBlockedRelationships(entityId) {
    const blockedRelationships = await Follow.find({
      following: entityId,
      isBlocked: true,
    }).populate("follower", "name email profileImage");

    if (!blockedRelationships.length) {
      throw new AppError("No blocked relationships found for the entity.", 404);
    }

    return blockedRelationships;
  }

  static async unblockRelationship(followId) {
    const follow = await Follow.findById(followId);

    if (!follow) {
      throw new AppError("Follow relationship not found.", 404);
    }

    if (!follow.isBlocked) {
      throw new AppError("This relationship is not currently blocked.", 400);
    }

    follow.isBlocked = false;
    await follow.save();

    return {
      success: true,
      message: "Follow relationship has been unblocked.",
      follow,
    };
  }

  static async getBlockStatus(followId) {
    const follow = await Follow.findById(followId);

    if (!follow) {
      throw new AppError("Follow relationship not found.", 404);
    }

    return { isBlocked: follow.isBlocked };
  }

  static async getBlockAnalytics() {
    const analytics = await Follow.aggregate([
      { $match: { isBlocked: true } },
      { $group: { _id: "$followingType", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ]);

    if (!analytics.length) {
      throw new AppError("No block analytics data found.", 404);
    }

    return analytics;
  }
}

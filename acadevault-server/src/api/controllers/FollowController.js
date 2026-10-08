import { VALID_ENTITY_TYPES } from '../../constants/enums.js';
import FollowService from "../../services/followService.js";
import UserService from "../../services/userService.js";
import { catchAsyncErrors } from "../../utils/catchAsyncErrors.js";
import AppError from "../../utils/HandleAppErrors.js";
import { validateObjectId } from "../../utils/validateObjectId.js";
import Follow from "../models/FollowModel.js";

/**
 * Standardized response for controllers.
 */
// const sendResponse = (res, success, message, statusCode = 200) => {
//   res.status(statusCode).json({ success, message });
// };

/**
 * Follow or unfollow entity (User/Shop/Group) Controller
 * @route POST /api/follow
 * @access Private
 */
export const followEntityController = catchAsyncErrors(async (req, res) => {
  const { targetId, targetType } = req.body;
  const followerId = req.user.id;

  const result = await FollowService.handleFollowEntity(
    followerId,
    targetId,
    targetType
  );

  res.status(200).json(result);
});

export const acceptFollowRequest = catchAsyncErrors(async (req, res) => {
  const { requesterId } = req.params;
  const currentUserId = req.user.id;

  const result = await FollowService.acceptFollowRequest({
    currentUserId,
    requesterId,
  });

  res.status(200).json(result);
});

export const unfollowEntityRequest = catchAsyncErrors(
  async (req, res, next) => {
    const { targetId, targetType } = req.params;
    const { id: userId } = req.user;

    try {
      // Validate the targetType to ensure it's a valid string
      if (!["user", "shop"].includes(targetType.toLowerCase())) {
        throw new AppError(
          'Invalid target type specified. Allowed types are "user" and "shop".',
          400
        );
      }

      // Call the service to perform the unfollow action
      const result = await FollowService.unfollowEntityService({
        followerId: userId,
        targetId: targetId,
        targetType: targetType.charAt(0).toUpperCase() + targetType.slice(1), // Ensure correct capitalization (User, Shop)
      });

      // Return success response
      res.status(200).json(result);
    } catch (error) {
      next(error); // Pass error to the error-handling middleware
    }
  }
);

export const rejectFollowRequest = catchAsyncErrors(async (req, res, next) => {
  const { followId } = req.params; // The ID of the follow request to reject
  const { id: userId } = req.user; // The ID of the current user (authenticated)

  // Validation: Ensure the IDs are valid
  if (!followId || !userId) {
    return next(new AppError("Missing user ID or follow request ID.", 400));
  }

  try {
    // Call the service to reject the follow request
    const result = await FollowService.rejectFollowService({
      currentUserId: userId,
      requesterId: followId,
    });

    // Return success response
    res.status(200).json(result);
  } catch (error) {
    // Pass the error to the error handling middleware
    next(error); // Automatically calls next(error) if error is thrown
  }
});

/**
 * Handles the request to fetch followers of a user.
 */
export const getFollowers = catchAsyncErrors(async (req, res) => {
  const { userId } = req.params;
  const queryString = req.query;

  const followersData = await FollowService.getFollowers(userId, queryString);
  res.status(200).json({
    success: true,
    data: followersData.followers,
    pagination: followersData.pagination,
  });
});

/**
 * Handles the request to fetch followers of a user.
 */
export const getFollowing = catchAsyncErrors(async (req, res) => {
  const { userId } = req.params;
  const queryString = req.query;

  const followingsData = await FollowService.getFollowings(userId, queryString);
  res.status(200).json({
    success: true,
    data: followingsData.followings,
    pagination: followingsData.pagination,
  });
});

/**
 * Controller: Remove a follower.
 */
export const removeFollower = catchAsyncErrors(async (req, res) => {
  const { userId, followerId } = req.body;

  const result = await FollowService.removeFollower(userId, followerId);

  res.status(200).json({
    status: "success",
    data: result,
  });
});

/**
 * Controller: Force follow relationship.
 */
export const forceFollow = catchAsyncErrors(async (req, res) => {
  const { followerId, followingId } = req.body;

  const result = await FollowService.forceFollow(followerId, followingId);

  res.status(200).json({
    status: "success",
    data: result,
  });
});

/**
 * Handles the request to fetch follower count for a user.
 */
export const getFollowerCount = catchAsyncErrors(async (req, res) => {
  const { userId } = req.params;

  const count = await FollowService.getFollowerCount(userId);
  res.status(200).json({
    success: true,
    data: { followerCount: count },
  });
});

/**
 * Handles the request to fetch mutual followers based on user interests.
 */
export const getMutualFollowers = catchAsyncErrors(async (req, res) => {
  const { userId } = req.params;
  const queryString = req.query;

  const mutualFollowersData = await FollowService.getMutualFollowersAndCount(
    userId,
    queryString
  );
  res.status(200).json({
    success: true,
    data: mutualFollowersData.mutualFollows,
    pagination: mutualFollowersData.pagination,
    count: mutualFollowersData.count,
  });
});

/**
 * Toggle the block status of a follower for a specific entity.
 */
export const toggleBlockStatus = catchAsyncErrors(async (req, res, next) => {
  const { followerId, entityId, entityType } = req.body;

  // Validate input
  if (!Follow.schema.obj.followingType.enum.includes(entityType)) {
    return next(
      new AppError(
        `Invalid entity type. Allowed types: ${Follow.schema.obj.followingType.enum.join(", ")}`,
        400
      )
    );
  }

  if (!followerId || !entityId) {
    return next(new AppError("Follower ID and Entity ID are required.", 400));
  }

  const result = await FollowService.toggleBlockStatus(
    followerId,
    entityId,
    entityType
  );

  res.status(200).json({
    status: "success",
    message: `Follower block status successfully toggled.`,
    data: result,
  });
});

/**
 * Handler to get the following count for a user.
 */
export const getFollowingCount = catchAsyncErrors(async (req, res, next) => {
  const { userId } = req.params; // Extract userId from route params

  // Validate the userId
  if (!userId) {
    return next(new AppError("User ID is required.", 400));
  }

  const followingCount = await FollowService.getFollowingCountService(userId);

  res.status(200).json({
    success: true,
    data: followingCount,
  });
});

/**
 * Handler to get the follow relationship details between two users.
 */
export const getFollowRelationshipDetails = catchAsyncErrors(
  async (req, res, next) => {
    const { followerId, followingId, followingType } = req.params; // Extract from params

    // Validate the parameters
    if (!followerId || !followingId) {
      return next(
        new AppError("Follower and following IDs are required.", 400)
      );
    }

    const followDetails = await FollowService.getFollowRelationshipDetails(
      followerId,
      followingId,
      followingType
    );
    res.status(200).json({
      success: true,
      data: followDetails,
    });
  }
);

/**
 * Handler to mark a follow relationship as mutual.
 */
export const markFollowMutual = catchAsyncErrors(async (req, res, next) => {
  const { followId } = req.params; // Extract followId from params

  // Validate the followId
  if (!followId) {
    return next(new AppError("Follow ID is required.", 400));
  }

  const result = await FollowService.markFollowMutual(followId);

  res.status(200).json({
    success: true,
    message: result.message,
  });
});

// Route to get pending follow requests for a specific entity
export const getPendingRequests = catchAsyncErrors(async (req, res, next) => {
  const { entityId, entityType } = req.params;
  const queryString = req.query;

  // Validate entity type
  if (!VALID_ENTITY_TYPES.includes(entityType)) {
    return next(new AppError(`Invalid entity type: ${entityType}`, 400));
  }

  // Fetch pending requests
  const { pendingRequests, pagination } =
    await FollowService.getPendingRequests(entityId, entityType, queryString);

  res.status(200).json({
    status: "success",
    data: {
      pendingRequests,
      pagination,
    },
  });
});

// Route to get the most followed entities
export const getMostFollowedEntity = catchAsyncErrors(
  async (req, res, next) => {
    const { targetType } = req.params;
    const queryString = req.query;

    // Validate target type
    if (!VALID_ENTITY_TYPES.includes(targetType)) {
      return next(new AppError(`Invalid target type: ${targetType}`, 400));
    }

    // Fetch most followed entities
    const mostFollowedEntities = await FollowService.getMostFollowedEntity(
      targetType,
      queryString
    );

    res.status(200).json({
      status: "success",
      data: mostFollowedEntities,
    });
  }
);

// Route to get follower analytics
export const getFollowAnalytics = catchAsyncErrors(async (req, res, next) => {
  const { type } = req.params;
  const queryString = req.query;

  // Validate type
  if (!VALID_ENTITY_TYPES.includes(type)) {
    return next(new AppError(`Invalid follow type: ${type}`, 400));
  }

  // Fetch follow analytics
  const { analytics, pagination } = await FollowService.getFollowAnalytics(
    type,
    queryString
  );

  res.status(200).json({
    status: "success",
    data: {
      analytics,
      pagination,
    },
  });
});

export const addInterest = catchAsyncErrors(async (req, res, next) => {
  const { userId } = req.params;
  const { category } = req.body;

  // Validate input
  if (!userId) {
    return next(new AppError("User ID is required", 400));
  }

  validateObjectId(userId, "User");

  const result = await UserService.addInterest(userId, category);

  res.status(200).json({
    status: "success",
    message: result.message,
    data: { interestCategories: result.interestCategories },
  });
});

export const removeInterest = catchAsyncErrors(async (req, res, next) => {
  const { userId } = req.params;
  const { category } = req.body;

  // Validate input
  if (!userId) {
    return next(new AppError("User ID is required", 400));
  }

  validateObjectId(userId, "User");

  const result = await UserService.removeInterest(userId, category);

  res.status(200).json({
    status: "success",
    message: result.message,
    data: { interestCategories: result.interestCategories },
  });
});

export const getInterests = catchAsyncErrors(async (req, res, next) => {
  const { userId } = req.params;

  // Validate input
  if (!userId) {
    return next(new AppError("User ID is required", 400));
  }

  validateObjectId(userId, "User");

  const interests = await UserService.getInterests(userId);

  res.status(200).json({
    status: "success",
    data: { interests },
  });
});

export const clearInterests = catchAsyncErrors(async (req, res, next) => {
  const { userId } = req.params;

  // Validate input
  if (!userId) {
    return next(new AppError("User ID is required", 400));
  }

  validateObjectId(userId, "User");

  const result = await UserService.clearInterests(userId);

  res.status(200).json({
    status: "success",
    message: result.message,
  });
});

export const checkInterest = catchAsyncErrors(async (req, res, next) => {
  const { userId } = req.params;
  const { category } = req.body;

  // Validate input
  if (!userId) {
    return next(new AppError("User ID is required", 400));
  }

  validateObjectId(userId, "User");

  const exists = await UserService.checkInterest(userId, category);

  res.status(200).json({
    status: "success",
    data: { exists },
  });
});

/**
 * Fetch follow suggestions for a user.
 */
export const getFollowSuggestions = catchAsyncErrors(async (req, res, next) => {
  const { userId } = req.params;
  const { limit } = req.query;

  // Validate input
  if (!userId) {
    return next(new AppError("User ID is required", 400));
  }

  validateObjectId(userId, "User");

  const suggestions = await UserService.getFollowSuggestions(
    userId,
    parseInt(limit, 10) || 5
  );

  res.status(200).json({
    status: "success",
    data: { suggestions },
  });
});

/**
 * Update user privacy settings.
 */
export const updatePrivacySettings = catchAsyncErrors(
  async (req, res, next) => {
    const { userId } = req.params;
    const { isPrivate } = req.body;

    // Validate input
    if (!userId) {
      return next(new AppError("User ID is required", 400));
    }

    validateObjectId(userId, "User");

    const updatedUser = await UserService.updatePrivacySettings(
      userId,
      isPrivate
    );

    res.status(200).json({
      status: "success",
      data: { user: updatedUser },
    });
  }
);

export const listBlocked = catchAsyncErrors(async (req, res, next) => {
  const { entityId } = req.params;

  // Validation: Ensure the IDs are valid
  if (!entityId) {
    return next(new AppError("Missing Entity ID.", 400));
  }

  const blockedRelationships =
    await FollowService.listBlockedRelationships(entityId);

  res.status(200).json({
    status: "success",
    data: blockedRelationships,
  });
});

export const unblockByAdmin = catchAsyncErrors(async (req, res, next) => {
  const { followId } = req.params;

  // Validation: Ensure the IDs are valid
  if (!followId) {
    return next(new AppError("Missing Follow ID.", 400));
  }

  const result = await FollowService.unblockRelationship(followId);

  res.status(200).json({
    status: "success",
    data: result,
  });
});

export const getBlockStatusById = catchAsyncErrors(async (req, res, next) => {
  const { followId } = req.params;

  // Validation: Ensure the IDs are valid
  if (!followId) {
    return next(new AppError("Missing Follow ID.", 400));
  }

  const blockStatus = await FollowService.getBlockStatus(followId);

  res.status(200).json({
    status: "success",
    data: blockStatus,
  });
});

export const blockAnalytics = catchAsyncErrors(async (req, res) => {
  const analytics = await FollowService.getBlockAnalytics();

  res.status(200).json({
    status: "success",
    data: analytics,
  });
});

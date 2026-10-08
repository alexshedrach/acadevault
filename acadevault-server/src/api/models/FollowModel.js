import mongoose from "mongoose";
import { logger } from "../../utils/logger.js";
import AppError from "../../utils/HandleAppErrors.js";
import { FOLLOW_STATUSES, VALID_ENTITY_TYPES } from '../../constants/enums.js';
import { updateFollowCounts } from "../../helper/updateFollowCounts.js";
import ApiFeatures from "../../utils/ApiFeatures.js";
import { validateObjectId } from "../../utils/validateObjectId.js";

const { Schema, model } = mongoose;
const { ObjectId } = Schema;

// Define the Follow Schema
const followSchema = new Schema(
  {
    // The user initiating the follow
    follower: {
      type: ObjectId,
      ref: "User", // Reference to the User model
      required: [true, "Follower is required"], // Validation rule
    },
    // The entity being followed (User or Shop)
    following: {
      type: ObjectId,
      required: [true, "Following entity is required"], // Validation rule
      refPath: "followingType", // Dynamic reference to "User" or "Shop"
    },
    // Type of the entity being followed (dynamic relationship)
    followingType: {
      type: String,
      enum: VALID_ENTITY_TYPES, // Restrict to defined constants: "User", "Shop"
      required: true, // Validation rule
      default: "User", // Default for user-to-user follows
    },
    // Current status of the follow relationship
    status: {
      type: String,
      enum: FOLLOW_STATUSES, // E.g., "pending", "accepted", "blocked", "unfollowed"
      default: "Pending", // Default status for new follow relationships
    },
    // Indicates if the relationship is blocked
    isBlocked: {
      type: Boolean,
      default: false, // Default is not blocked
    },
    // Indicates if the follow is mutual
    isMutual: {
      type: Boolean,
      default: false, // Default is not mutual
    },
  },
  {
    timestamps: true, // Automatically include createdAt and updatedAt fields
    toJSON: { virtuals: true }, // Ensure virtual fields are included in JSON
    toObject: { virtuals: true }, // Ensure virtual fields are included in objects
  }
);

// -------------------------------------------------------
// === Indexing for Improved Query Performance ===
// -------------------------------------------------------
followSchema.index({ follower: 1, following: 1 }, { unique: true });
followSchema.index({ followingType: 1, status: 1 });

// -------------------------------------------------------
// === Virtual Properties ===
// -------------------------------------------------------
followSchema.virtual("isFollowing").get(function () {
  return this.status === "Accepted";
});

// -------------------------------------------------------
// === Middlewares ===
// -------------------------------------------------------

// Populate referenced user or shop data on queries
followSchema.pre(/^find/, function (next) {
  this.populate({
    path: "follower",
    select: "name email role", // Select only necessary fields for performance
  }).populate({
    path: "following",
    select: "name shopName type", // Select essential details based on the type
  });

  next();
});

// Validate that a user cannot follow themselves
followSchema.pre("save", async function (next) {
  // Prevent self-follow
  if (this.follower.equals(this.following)) {
    return next(new AppError("You cannot follow yourself.", 400));
  }
  next();
});

// Pre-remove middleware to update follow counts and mutual status
followSchema.pre("findOneAndDelete", async function (next) {
  try {
    const doc = await this.model.findOne(this.getFilter()); // Access the document being deleted

    if (doc && doc.followingType === "User") {
      const User = mongoose.model("User");
      await Promise.all([
        User.findByIdAndUpdate(doc.following, { $inc: { followerCount: -1 } }),
        User.findByIdAndUpdate(doc.follower, { $inc: { followingCount: -1 } }),
      ]);
    }

    // Handle mutual follow removal
    if (doc) {
      const reverseFollow = await doc.constructor.findOne({
        follower: doc.following,
        following: doc.follower,
        followingType: doc.followingType,
      });

      if (reverseFollow) {
        reverseFollow.isMutual = false; // Update mutual status
        await reverseFollow.save();
      }
    }

    next();
  } catch (error) {
    logger.error(`Error in pre-remove middleware: ${error.message}`, {
      stack: error.stack,
    });
    next(error);
  }
});

// -------------------------------------------------------
// === Instance Methods ===
// -------------------------------------------------------
followSchema.statics.handleFollowRequest = async function (
  followerId,
  targetId,
  targetType = "User",
  session = null
) {
  const TargetModel = mongoose.models[targetType];
  let transactionSession = session;

  try {
    // Validate Object IDs
    validateObjectId(followerId, "followerId");
    validateObjectId(targetId, "targetId");

    if (!["User", "Shop", "Group"].includes(targetType)) {
      throw new AppError(`Invalid targetType: ${targetType}`, 400);
    }

    if (!session) {
      transactionSession = await mongoose.startSession();
      transactionSession.startTransaction();
    }

    // Validate target existence
    const targetEntity =
      await TargetModel.findById(targetId).session(transactionSession);
    if (!targetEntity) throw new AppError(`${targetType} not found.`, 404);

    // Check for existing follow relationship
    const existingFollow = await this.findOne({
      follower: followerId,
      following: targetId,
      followingType: targetType,
    }).session(transactionSession);

    if (existingFollow) {
      if (!existingFollow.isBlocked) {
        return {
          success: false,
          message:
            existingFollow.status === FOLLOW_STATUSES.PENDING
              ? "Follow request already sent."
              : "You are already following this entity.",
        };
      } else {
        throw new AppError("Follow is blocked by the target user.", 403);
      }
    }

    // Handle private user follow request
    if (targetType === "User" && targetEntity.isPrivate) {
      if (!targetEntity.followRequests.includes(followerId)) {
        targetEntity.followRequests.push(followerId);
        await targetEntity.save({ session: transactionSession });
      }

      // Create a pending follow request
      await this.create(
        [
          {
            follower: followerId,
            following: targetId,
            followingType: targetType,
            status: FOLLOW_STATUSES.PENDING,
          },
        ],
        { session: transactionSession }
      );

      if (!session) await transactionSession.commitTransaction();
      return { success: true, message: "Follow request sent to private user." };
    }

    // Handle public entity follow
    await this.create(
      [
        {
          follower: followerId,
          following: targetId,
          followingType: targetType,
          status: FOLLOW_STATUSES.ACCEPTED,
        },
      ],
      { session: transactionSession }
    );

    await updateFollowCounts(
      followerId,
      targetId,
      targetType,
      true,
      transactionSession
    );

    if (!session) await transactionSession.commitTransaction();
    return { success: true, message: "You are now following this entity." };
  } catch (error) {
    if (transactionSession) await transactionSession.abortTransaction();
    throw new AppError(
      error.message || "Failed to process follow request.",
      500
    );
  } finally {
    if (transactionSession && !session) transactionSession.endSession();
  }
};

followSchema.statics.markMutual = async function (
  followerId,
  targetId,
  session
) {
  try {
    // Find reciprocal follow
    const reciprocalFollow = await this.findOne({
      follower: targetId,
      following: followerId,
      status: FOLLOW_STATUSES.ACCEPTED,
    }).session(session);

    if (!reciprocalFollow) {
      return {
        success: false,
        message: "Reciprocal follow relationship not found.",
      };
    }

    // Update mutual status for both relationships
    const result = await this.updateMany(
      {
        $or: [
          { follower: followerId, following: targetId },
          { follower: targetId, following: followerId },
        ],
        status: FOLLOW_STATUSES.ACCEPTED,
      },
      { isMutual: true },
      { session }
    );

    return {
      success: true,
      message: "Mutual follow relationship established.",
      updatedCount: result.modifiedCount,
    };
  } catch (error) {
    throw new AppError(
      error.message || "Failed to mark mutual follow relationship.",
      500
    );
  }
};

followSchema.statics.acceptFollowRequest = async function ({
  currentUserId,
  requesterId,
  session = null,
}) {
  const User = mongoose.models.User;
  const transactionSession = session || (await mongoose.startSession());

  try {
    if (!session) transactionSession.startTransaction();

    // Fetch the current user and validate existence
    const currentUser =
      await User.findById(currentUserId).session(transactionSession);
    if (!currentUser) {
      throw new AppError("Current user not found.", 404);
    }

    // Remove the follower from followRequests in the user's document
    const followRequestIndex = currentUser.followRequests.findIndex(
      (request) => request._id.toString() === requesterId.toString()
    );
    if (followRequestIndex === -1) {
      throw new AppError("No follow request from this user.", 400);
    }
    currentUser.followRequests.splice(followRequestIndex, 1);
    await currentUser.save({ session: transactionSession });

    // Update the follow request to accepted
    // const followRequest = await this.findOneAndUpdate(
    //   {
    //     follower: requesterId,
    //     following: currentUserId,
    //     status: FOLLOW_STATUSES.PENDING,
    //   },
    //   { status: FOLLOW_STATUSES.ACCEPTED },
    //   { new: true, session: transactionSession }
    // );

    // if (!followRequest) {
    //   throw new AppError("Follow request not found or already accepted.", 404);
    // }
    // Find the existing follow request (one-directional)
    const followRequest = await this.findOne({
      follower: requesterId,
      following: currentUserId,
      status: FOLLOW_STATUSES.PENDING,
    }).session(transactionSession);

    if (!followRequest) {
      throw new AppError("Follow request not found or already accepted.", 404);
    }

    // Accept the follow request
    followRequest.status = FOLLOW_STATUSES.ACCEPTED;

    // Check and handle mutual relationships
    // const reciprocalFollow = await this.findOneAndUpdate(
    //   {
    //     follower: currentUserId,
    //     following: requesterId,
    //     status: FOLLOW_STATUSES.ACCEPTED,
    //   },
    //   { isMutual: true },
    //   { new: true, session: transactionSession }
    // );

    // if (reciprocalFollow) {
    //   followRequest.isMutual = true;
    //   await followRequest.save({ session: transactionSession });
    // }
    // Check if the reciprocal follow already exists
    const reciprocalFollow = await this.findOne({
      follower: currentUserId,
      following: requesterId,
      status: FOLLOW_STATUSES.ACCEPTED,
    }).session(transactionSession);

    if (reciprocalFollow) {
      // Mark both directions as mutual
      followRequest.isMutual = true;
      reciprocalFollow.isMutual = true;
      await reciprocalFollow.save({ session: transactionSession });
    }

    await followRequest.save({ session: transactionSession });

    // Update follower and following counts
    await updateFollowCounts(
      requesterId, // follower ID
      currentUserId, // target ID
      "User", // target type
      true, // increment counts
      transactionSession // use the session
    );

    if (!session) await transactionSession.commitTransaction();
    return { success: true, message: "Follow request accepted." };
  } catch (error) {
    if (transactionSession) await transactionSession.abortTransaction();
    throw new AppError(
      error.message || "Failed to accept follow request.",
      500
    );
  } finally {
    if (!session) transactionSession.endSession();
  }
};

// Handle unfollow logic for Users, Shops, or other entities
followSchema.statics.unfollowUserEntity = async function (
  followerId,
  targetId,
  targetType,
  session = null
) {
  let transactionSession;

  try {
    transactionSession = session || (await mongoose.startSession());
    if (!session) transactionSession.startTransaction();

    const follow = await this.findOne({
      follower: followerId,
      following: targetId,
      followingType: targetType,
      status: FOLLOW_STATUSES.ACCEPTED,
    }).session(transactionSession);

    if (!follow) {
      throw new AppError("Follow relationship not found or is inactive.", 404);
    }

    // Remove the follow relationship
    await follow.deleteOne({ session: transactionSession });

    // Update follow counts
    await updateFollowCounts(
      followerId,
      targetId,
      targetType,
      false,
      transactionSession
    );

    if (!session) await transactionSession.commitTransaction();

    return {
      success: true,
      message: `You have unfollowed this ${targetType.toLowerCase()}.`,
    };
  } catch (error) {
    if (transactionSession) await transactionSession.abortTransaction();
    throw new AppError(
      error.message || "An error occurred while unfollowing the entity.",
      500
    );
  } finally {
    if (transactionSession && !session) transactionSession.endSession();
  }
};

//   Rejects a follow request by removing it from the followRequests list.
followSchema.statics.handleFollowRequestRejection = async function ({
  currentUserId,
  requesterId,
  session = null,
}) {
  const User = mongoose.models.User; // Reference the User model
  let transactionSession; // Declare transactionSession at the top

  try {
    // Start a session if not provided
    transactionSession = session || (await mongoose.startSession());
    if (!session) transactionSession.startTransaction();

    // Fetch the current user document
    const currentUser =
      await User.findById(currentUserId).session(transactionSession);
    if (!currentUser) {
      throw new AppError("Current user not found.", 404);
    }

    // Check if the requester is in the followRequests list
    const followRequestIndex = currentUser.followRequests.find(
      (request) => request._id.toString() === requesterId.toString()
    );
    if (!followRequestIndex) {
      throw new AppError("No follow request from this user.", 400);
    }
    // Remove the requester from followRequests explicitly
    currentUser.followRequests.splice(followRequestIndex, 1);
    await currentUser.save({ session: transactionSession });

    // Save the updated user document
    await currentUser.save({ session: transactionSession });

    // Commit the transaction if it was started here
    if (!session) await transactionSession.commitTransaction();

    return { success: true, message: "Follow request rejected." };
  } catch (error) {
    // Rollback transaction in case of errors
    if (transactionSession) await transactionSession.abortTransaction();
    throw new AppError(error.message || "Error rejecting follow request.", 500);
  } finally {
    // End session if started here
    if (transactionSession && !session) transactionSession.endSession();
  }
};

//  * Toggles the block status of a follow relationship.
followSchema.methods.toggleBlock = async function (session = null) {
  let transactionSession;

  try {
    transactionSession = session || (await mongoose.startSession());
    if (!session) transactionSession.startTransaction();

    // Validate if the follow relationship is active
    if (!this.status || this.status === "INACTIVE") {
      throw new AppError(
        "Cannot toggle block status for an inactive follow relationship.",
        400
      );
    }

    // Toggle the block status
    const previousStatus = this.isBlocked;
    this.isBlocked = !this.isBlocked;

    // Save the updated document within the session
    await this.save({ session: transactionSession });

    // Commit the transaction if initiated here
    if (!session) await transactionSession.commitTransaction();

    // Emit a notification/event (e.g., WebSocket, Kafka, or another system)
    // Example: EventEmitter.emit('followBlockToggled', { followId: this._id, isBlocked: this.isBlocked });

    // Return a meaningful response
    return {
      success: true,
      isBlocked: this.isBlocked,
      message: this.isBlocked
        ? "The follow relationship has been blocked."
        : "The follow relationship has been unblocked.",
      previousStatus,
    };
  } catch (error) {
    if (transactionSession) await transactionSession.abortTransaction();
    console.error("Error toggling block status:", error);
    throw new AppError("Failed to toggle block status. Please try again.", 500);
  } finally {
    if (transactionSession && !session) transactionSession.endSession();
  }
};

// -------------------------------------------------------
// === Static Methods ===
// -------------------------------------------------------
//  * Checks if a user is actively following another user or shop.
//  * Active follow statuses include "accepted" or "mutual".
followSchema.statics.isFollowing = async function (followerId, targetId, type) {
  const follow = await this.findOne({
    follower: followerId,
    following: targetId,
    followingType: type,
    status: { $in: [FOLLOW_STATUSES.ACCEPTED, FOLLOW_STATUSES.MUTUAL] },
  });

  return !!follow; // Return true if follow exists
};

//  * Fetch the list of followers for a user with additional options.
followSchema.statics.getFollowers = async function (userId, queryString = {}) {
  if (!userId) throw new Error("User ID is required to fetch followers");

  const pipeline = [
    {
      $match: {
        following: mongoose.Types.ObjectId(userId),
        status: "Accepted",
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "follower",
        foreignField: "_id",
        as: "followerDetails",
      },
    },
    {
      $unwind: "$followerDetails",
    },
    {
      $project: {
        _id: 0,
        follower: "$followerDetails",
      },
    },
  ];

  const query = this.aggregate(pipeline);

  // Apply ApiFeatures for dynamic query handling
  const apiFeatures = new ApiFeatures(query, queryString)
    .sort()
    .pagination()
    .limitFields();

  // Fetch the paginated and processed results
  const followers = await apiFeatures.query;
  return {
    followers,
    pagination: apiFeatures.paginationMetadata,
  };
};

//  * Fetch the list of users a specific user is following with additional options.
followSchema.statics.getFollowing = async function (userId, queryString = {}) {
  if (!userId) throw new Error("User ID is required to fetch following users");

  const pipeline = [
    {
      $match: {
        follower: mongoose.Types.ObjectId(userId),
        status: "Accepted",
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "following",
        foreignField: "_id",
        as: "followingDetails",
      },
    },
    {
      $unwind: "$followingDetails",
    },
    {
      $project: {
        _id: 0,
        following: "$followingDetails",
      },
    },
  ];

  const query = this.aggregate(pipeline);

  // Apply ApiFeatures for dynamic query handling
  const apiFeatures = new ApiFeatures(query, queryString)
    .sort()
    .pagination()
    .limitFields();

  // Fetch the paginated and processed results
  const following = await apiFeatures.query;
  return {
    following,
    pagination: apiFeatures.paginationMetadata,
  };
};

/// Get Follower Count for a User
followSchema.statics.getFollowerCount = async function (userId) {
  try {
    const count = await this.countDocuments({ following: userId }).exec();
    return count;
  } catch (error) {
    console.error(`Error getting follower count for user ${userId}:`, error);
    throw new Error("Could not retrieve follower count");
  }
};

// Get Following Count for a User
followSchema.statics.getFollowingCount = async function (userId) {
  try {
    const count = await this.countDocuments({ follower: userId }).exec();
    return count;
  } catch (error) {
    console.error(`Error getting following count for user ${userId}:`, error);
    throw new Error("Could not retrieve following count");
  }
};

//  Method to Get Mutual Follows and the Count.
followSchema.statics.getMutualFollowsAndCount = async function (
  userId,
  queryString
) {
  const User = mongoose.model("User");
  // Validate userId
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    throw new AppError("Invalid user ID.", 400);
  }
  // Fetch user details to retrieve their interests
  const user = await User.findById(userId).select("interestCategories");
  if (!user) {
    throw new AppError("User not found.", 404);
  }

  const userInterests = user.interestCategories || [];

  // Aggregation pipeline to find mutual follows and count them.
  const pipeline = [
    {
      $match: {
        $or: [{ follower: userId }, { following: userId }],
        status: FOLLOW_STATUSES.ACCEPTED,
        isBlocked: false,
      },
    },
    {
      $lookup: {
        from: "follows",
        localField: "follower",
        foreignField: "following",
        as: "mutual",
      },
    },
    {
      $unwind: "$mutual",
    },
    {
      $match: {
        $or: [{ "mutual.follower": userId }, { "mutual.following": userId }],
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "mutual.follower",
        foreignField: "_id",
        as: "mutualFollowerDetails",
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "mutual.following",
        foreignField: "_id",
        as: "mutualFollowingDetails",
      },
    },
    {
      $match: {
        $or: [
          {
            "mutualFollowerDetails.interestCategories": {
              $in: userInterests,
            },
          },
          {
            "mutualFollowingDetails.interestCategories": {
              $in: userInterests,
            },
          },
        ],
      },
    },
  ];

  // Initialize the query with the pipeline
  const query = this.aggregate(pipeline);

  // Apply ApiFeatures
  const apiFeatures = new ApiFeatures(query, queryString).sort().limitFields();

  // Apply pagination and fetch the results
  const paginatedResults = await apiFeatures.pagination().query;
  const count = apiFeatures.paginationMetadata.totalResults;

  return {
    mutualFollows: paginatedResults,
    count,
    pagination: apiFeatures.paginationMetadata,
  };
};

//////////////////////////////////////////////////////////////////////
//  Method to  Retrieve all pending follow requests for a specific Entity.
followSchema.statics.getPendingRequests = async function (
  entityId,
  entityType,
  queryString
) {
  if (!VALID_ENTITY_TYPES.includes(entityType)) {
    throw new AppError(
      `Invalid entity type. Allowed types: ${VALID_ENTITY_TYPES.join(", ")}`,
      400
    );
  }

  if (!mongoose.Types.ObjectId.isValid(entityId)) {
    throw new AppError("Invalid entity ID provided.", 400);
  }

  // Query for pending follow requests
  const pipeline = [
    {
      $match: {
        following: mongoose.Types.ObjectId(entityId),
        followingType: entityType,
        status: "pending",
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "follower",
        foreignField: "_id",
        as: "followerDetails",
      },
    },
    {
      $unwind: "$followerDetails",
    },
    {
      $project: {
        follower: 1,
        following: 1,
        followingType: 1,
        status: 1,
        "followerDetails.name": 1,
        "followerDetails.email": 1,
        "followerDetails.profileImage": 1,
      },
    },
  ];

  const query = this.aggregate(pipeline);

  const apiFeatures = new ApiFeatures(query, queryString).sort().limitFields();

  const paginatedResults = await apiFeatures.pagination().query;

  return {
    pendingRequests: paginatedResults,
    pagination: apiFeatures.paginationMetadata,
  };
};
//////////////////////////////////////////////////////////////////////
// etrieve the most followed entities (Users or Shops) with additional details.
followSchema.statics.getMostFollowedEntity = async function (
  targetType,
  queryString
) {
  // Validate the input targetType
  if (!VALID_ENTITY_TYPES.includes(targetType)) {
    throw new AppError(
      `Invalid target type. Allowed types: ${VALID_ENTITY_TYPES.join(", ")}`,
      400
    );
  }
  const targetModel = mongoose.models[targetType];

  const pipeline = [
    {
      $match: {
        followingType: targetType,
        status: "accepted",
      },
    },
    {
      $group: {
        _id: "$following",
        count: { $sum: 1 },
      },
    },
    {
      $sort: { count: -1 },
    },
  ];

  const query = this.aggregate(pipeline);

  const apiFeatures = new ApiFeatures(query, queryString).sort();

  const paginatedResults = await apiFeatures.pagination().query;

  const detailedResults = await targetModel
    .find({
      _id: { $in: paginatedResults.map((item) => item._id) },
    })
    .select(
      targetType === "User"
        ? "name email profileImage"
        : "shopName banner description"
    );

  return paginatedResults.map((item) => ({
    id: item._id,
    followerCount: item.count,
    details:
      detailedResults.find((detail) => detail._id.equals(item._id)) || null,
  }));
};

///////////////////////////////////////////////////////////////////////////
//  Get follower analytics for a specific target type (e.g., User or Shop).
followSchema.statics.getFollowAnalytics = async function (type, queryString) {
  // Validate the input 'type'
  if (!VALID_ENTITY_TYPES.includes(type)) {
    throw new AppError(
      "Invalid follow type. Allowed types are 'User' or 'Shop'.",
      400
    );
  }

  const pipeline = [
    {
      $match: {
        followingType: type,
        status: "accepted",
      },
    },
    {
      $group: {
        _id: "$following",
        count: { $sum: 1 },
      },
    },
    {
      $sort: { count: -1 },
    },
  ];

  const query = this.aggregate(pipeline);

  const apiFeatures = new ApiFeatures(query, queryString).sort();

  const paginatedResults = await apiFeatures.pagination().query;

  const model = mongoose.models[type];

  const detailedAnalytics = await Promise.all(
    paginatedResults.map(async (item) => {
      const entityDetails = await model
        .findById(item._id)
        .select(
          type === "User"
            ? "name email profileImage"
            : "shopName banner description"
        );
      return { ...item, details: entityDetails };
    })
  );

  return {
    analytics: detailedAnalytics,
    pagination: apiFeatures.paginationMetadata,
  };
};

// -------------------------------------------------------
// === Exporting Model ===
// -------------------------------------------------------
const Follow = model("Follow", followSchema);

export default Follow;

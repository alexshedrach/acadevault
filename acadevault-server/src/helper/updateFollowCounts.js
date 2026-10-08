import mongoose from "mongoose";
import AppError from "../utils/HandleAppErrors.js";

export async function updateFollowCounts(
  followerId,
  targetId,
  targetType,
  increment,
  session = null
) {
  const incrementValue = increment ? 1 : -1;

  const modelMappings = {
    User: mongoose.models.User,
    Shop: mongoose.models.Shop,
  };

  if (!modelMappings[targetType]) {
    throw new AppError(`Target type "${targetType}" is not supported.`, 400);
  }

  if (
    !mongoose.Types.ObjectId.isValid(followerId) ||
    !mongoose.Types.ObjectId.isValid(targetId)
  ) {
    throw new AppError("Invalid follower or target ID provided.", 400);
  }

  try {
    const TargetModel = modelMappings[targetType];
    const sessionOptions = session ? { session, new: true } : { new: true };

    const [followerUpdate, targetUpdate] = await Promise.all([
      mongoose.models.User.findByIdAndUpdate(
        followerId,
        { $inc: { followingCount: incrementValue } },
        sessionOptions
      ),
      TargetModel.findByIdAndUpdate(
        targetId,
        { $inc: { followerCount: incrementValue } },
        sessionOptions
      ),
    ]);

    if (!followerUpdate || !targetUpdate) {
      throw new AppError("Follower or Target entity not found.", 404);
    }

    if (session) {
      await session.commitTransaction();
    }

    return { follower: followerUpdate, target: targetUpdate };
  } catch (error) {
    if (session) await session.abortTransaction();
    throw new AppError(error.message || "Failed to update follow counts.", 500);
  }
}

// /**
//  * Update follow counts for the follower and the followed entity.
//  * @param {String} followerId - ID of the user following.
//  * @param {String} targetId - ID of the entity being followed.
//  * @param {String} targetType - Type of the target entity (e.g., 'User', 'Shop').
//  * @param {Boolean} increment - Whether to increment or decrement the count.
//  * @param {Object} session - (Optional) Mongoose transaction session.
//  * @returns {Object} - Returns the updated follower and target documents.
//  */
// export async function updateFollowCounts(
//   followerId,
//   targetId,
//   targetType,
//   increment,
//   session = null
// ) {
//   const incrementValue = increment ? 1 : -1;

//   // Define model mappings for different target types
//   const modelMappings = {
//     User: mongoose.models.User,
//     Shop: mongoose.models.Shop,
//     // Add more entity types here if needed
//   };

//   // Validate targetType
//   if (!modelMappings[targetType]) {
//     throw new AppError(`Target type "${targetType}" is not supported.`, 400);
//   }

//   // Validate ObjectIds
//   if (!mongoose.Types.ObjectId.isValid(followerId)) {
//     throw new AppError("Invalid follower ID provided.", 400);
//   }
//   if (!mongoose.Types.ObjectId.isValid(targetId)) {
//     throw new AppError("Invalid target ID provided.", 400);
//   }

//   try {
//     const TargetModel = modelMappings[targetType];

//     // Run updates within a transaction if session is provided
//     const [followerUpdate, targetUpdate] = await Promise.all([
//       mongoose.models.User.findByIdAndUpdate(
//         followerId,
//         { $inc: { followingCount: incrementValue } },
//         { session, new: true }
//       ),
//       TargetModel.findByIdAndUpdate(
//         targetId,
//         { $inc: { followerCount: incrementValue } },
//         { session, new: true }
//       ),
//     ]);

//     // Validate updates
//     if (!followerUpdate) {
//       throw new AppError(`User with ID ${followerId} not found.`, 404);
//     }
//     if (!targetUpdate) {
//       throw new AppError(`${targetType} with ID ${targetId} not found.`, 404);
//     }

//     console.log(
//       `Follow counts updated: Follower [${followerId}] -> Target [${targetId}]`
//     );

//     return { follower: followerUpdate, target: targetUpdate };
//   } catch (error) {
//     console.error(
//       `Error updating follow counts (Follower: ${followerId}, Target: ${targetId}, Type: ${targetType}):`,
//       error.message
//     );
//     throw new AppError(error.message || "Failed to update follow counts.", 500);
//   }
// }

// import mongoose from "mongoose";

// /**
//  * Update follow counts for the follower and the followed entity.
//  * @param {String} followerId - ID of the user following.
//  * @param {String} targetId - ID of the entity being followed.
//  * @param {String} targetType - Type of the target entity.
//  * @param {Boolean} increment - Whether to increment or decrement the count.
//  */
// export async function updateFollowCounts(
//   followerId,
//   targetId,
//   targetType,
//   increment
// ) {
//   const incrementValue = increment ? 1 : -1;

//   try {
//     // Validate the target entity exists
//     const TargetModel =
//       targetType === "User" ? mongoose.models.User : mongoose.models.Shop;
//     const targetEntity = await TargetModel.findById(targetId);
//     if (!targetEntity) {
//       throw new Error(`${targetType} not found for follow count update.`);
//     }

//     // Update follower count for the target entity
//     await TargetModel.findByIdAndUpdate(targetId, {
//       $inc: { followerCount: incrementValue },
//     });

//     // Update following count for the follower
//     const user = await mongoose.models.User.findById(followerId);
//     if (!user) {
//       throw new Error("Follower user not found for follow count update.");
//     }

//     await mongoose.models.User.findByIdAndUpdate(followerId, {
//       $inc: { followingCount: incrementValue },
//     });

//     console.log(
//       `Follow counts updated: Follower [${followerId}], Target [${targetId}]`
//     );
//   } catch (error) {
//     console.error("Error updating follow counts:", error.message);
//     throw new Error("Failed to update follow counts.");
//   }
// }

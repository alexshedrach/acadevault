import mongoose from "mongoose";
import AppError from "../../utils/HandleAppErrors.js";
import { FOLLOW_STATUSES } from '../../constants/enums.js';
import { validateObjectId } from "../../utils/validateObjectId.js";
import { handleTransaction } from "../../utils/withTransaction.js";
import { logger } from "../../utils/logger.js";

const { Schema, model } = mongoose;
const { ObjectId } = Schema;

const followRequestSchema = new Schema(
  {
    // The user who sent the follow request
    requester: {
      type: ObjectId,
      ref: "User",
      required: true,
    },

    // The user who is receiving the follow request
    recipient: {
      type: ObjectId,
      ref: "User",
      required: true,
    },

    // Timestamp when the request was sent
    createdAt: {
      type: Date,
      default: Date.now,
    },

    // Status of the request (pending, accepted, rejected)
    status: {
      type: String,
      enum: FOLLOW_STATUSES, // E.g., "pending", "accepted", "blocked", "unfollowed"
      default: "Pending", // Default status for new follow relationships
    },
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt fields
  }
);

// Add indexes for performance
followRequestSchema.index({ requester: 1, recipient: 1 }, { unique: true });

// Follow Request Logic
followRequestSchema.statics.createRequest = async function (
  requesterId,
  recipientId,
  session = null
) {
  validateObjectId(requesterId, "Requester ID");
  validateObjectId(recipientId, "Recipient ID");

  if (requesterId === recipientId) {
    throw new AppError("Cannot send a follow request to yourself.", 400);
  }

  await handleTransaction(session, async (txnSession) => {
    const existingRequest = await this.findOne({
      requester: requesterId,
      recipient: recipientId,
    }).session(txnSession);

    if (existingRequest) {
      throw new AppError("Follow request already exists.", 400);
    }

    const recipient =
      await mongoose.models.User.findById(recipientId).session(txnSession);
    if (!recipient) throw new AppError("Recipient user not found.", 404);

    if (recipient.blockedUsers?.includes(requesterId)) {
      throw new AppError("You are blocked by this user.", 403);
    }

    const followRequest = await this.create(
      [{ requester: requesterId, recipient: recipientId }],
      { session: txnSession }
    );

    console.log(followRequest);

    // Add the follow request ID to the recipient's followRequests field
    recipient.followRequests.push(followRequest[0]._id); // Use followRequest[0]._id instead of followRequest._id
    await recipient.save({ session: txnSession });

    // Optional: Log or send notification
    logger.info(`Follow request sent from ${requesterId} to ${recipientId}`);
  });
};


followRequestSchema.statics.respondToRequest = async function (
  recipientId,
  requesterId,
  accept,
  session = null
) {
  validateObjectId(recipientId, "Recipient ID");
  validateObjectId(requesterId, "Requester ID");

  if (recipientId === requesterId) {
    throw new AppError("Invalid operation.", 400);
  }

  await handleTransaction(session, async (txnSession) => {
    const request = await this.findOneAndDelete({
      requester: requesterId,
      recipient: recipientId,
    }).session(txnSession);

    if (!request) {
      throw new AppError("No follow request found to respond to.", 404);
    }

    if (accept) {
      const Follow = mongoose.models.Follow;
      const follow = await Follow.findOne({
        follower: requesterId,
        following: recipientId,
      }).session(txnSession);

      if (!follow) {
        await Follow.create(
          [
            {
              follower: requesterId,
              following: recipientId,
              status: FOLLOW_STATUSES.ACCEPTED,
            },
          ],
          { session: txnSession }
        );
      } else if (follow.status !== FOLLOW_STATUSES.ACCEPTED) {
        follow.status = FOLLOW_STATUSES.ACCEPTED;
        await follow.save({ session: txnSession });
      }

      // Check for mutual follow
      const reciprocalFollow = await Follow.findOne({
        follower: recipientId,
        following: requesterId,
        status: FOLLOW_STATUSES.ACCEPTED,
      }).session(txnSession);

      if (reciprocalFollow) {
        await Follow.updateMany(
          {
            _id: { $in: [follow._id, reciprocalFollow._id] },
          },
          { $set: { isMutual: true } },
          { session: txnSession }
        );
      }
    }
  });
};


// Follow Logic
// followSchema.statics.followUser = async function (
//   followerId,
//   targetId,
//   session = null
// ) {
//   validateObjectId(followerId, "Follower ID");
//   validateObjectId(targetId, "Target ID");

//   if (followerId === targetId) {
//     throw new AppError("You cannot follow yourself.", 400);
//   }

//   await handleTransaction(session, async (txnSession) => {
//     const FollowRequest = mongoose.models.FollowRequest;

//     const existingFollow = await this.findOne({
//       follower: followerId,
//       following: targetId,
//     }).session(txnSession);

//     if (existingFollow) {
//       if (existingFollow.status === FOLLOW_STATUSES.BLOCKED) {
//         throw new AppError("You are blocked by this user.", 403);
//       }
//       throw new AppError("Already following this user.", 400);
//     }

//     const targetUser = await mongoose.models.User.findById(targetId).session(txnSession);
//     if (!targetUser) throw new AppError("Target user not found.", 404);

//     if (targetUser.blockedUsers?.includes(followerId)) {
//       throw new AppError("You are blocked by this user.", 403);
//     }

//     if (targetUser.isPrivate) {
//       await FollowRequest.createRequest(followerId, targetId, txnSession);
//       return { success: true, message: "Follow request sent." };
//     }

//     // Public user: Create follow record
//     await this.create([{ follower: followerId, following: targetId }], {
//       session: txnSession,
//     });

//     await updateFollowCounts(followerId, targetId, "User", true, txnSession);
//   });
// };

// Register the schema as a model
const FollowRequest = model("FollowRequest", followRequestSchema);

export default FollowRequest;

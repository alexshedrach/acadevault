import express from "express";

import * as followController from "../controllers/FollowController.js";

import { protectRoutes, restrictTo } from "../middlewares/authMiddleware.js";
import { USER_ROLES } from '../../constants/enums.js';

// Initalizing the Express Router
const router = express.Router();

// Middleware: Protecting All Routes
router.use(protectRoutes);

/////////////////////////////////////////////////////////////////////////
// Users Following Routes

router.route("/").post(followController.followEntityController);
router.route("/accept/:requesterId").put(followController.acceptFollowRequest);
router
  .route("/unfollow/:targetType/:targetId")
  .put(followController.unfollowEntityRequest);
router.route("/reject/:followId").put(followController.rejectFollowRequest);
router
  .route("/:userId/follow-suggestions")
  .get(followController.getFollowSuggestions);

// Update account privacy settings
router
  .route("/:userId/privacy")
  .patch(
    restrictTo(USER_ROLES.USER, USER_ROLES.SELLER, USER_ROLES.AFFILIATE),
    followController.updatePrivacySettings
  );
router.route("/toggle-block").post(followController.toggleBlockStatus);
// Route to fetch followers of a user
router.route("/followers/:userId").get(followController.getFollowers);
router.route("/following/:userId").get(followController.getFollowing); // Get users followed by a user
router.route("/remove-follower").post(followController.removeFollower); // Remove a follower
router.route("/force-follow").post(followController.forceFollow); // Force follow relationship

// Route to fetch follower count for a user
router.route("/followers/count/:userId").get(followController.getFollowerCount);

// Route to fetch mutual followers of a user
router
  .route("/followers/mutual/:userId")
  .get(followController.getMutualFollowers);
// Route to get Following Count for a User
router.route("/:userId/followingCount").get(followController.getFollowingCount);

// Route to get Follow Relationship Details
router
  .route("/:followerId/:followingId/:followingType/details")
  .get(followController.getFollowRelationshipDetails);

// Route to mark a Follow Relationship as Mutual
router.route("/:followId/markMutual").patch(followController.markFollowMutual);
// Route to get all pending follow requests for a specific entity
router
  .route("/pending/:entityId/:entityType")
  .get(followController.getPendingRequests);

// Route to get the most followed entities (Users or Shops)
router
  .route("/most-followed/:targetType")
  .get(followController.getMostFollowedEntity);

// Route to get follower analytics (User or Shop)
router.route("/analytics/:type").get(followController.getFollowAnalytics);

router.route("/blocked/:entityId").get(followController.listBlocked); // List blocked relationships
router.route("/admin/unblock/:followId").post(followController.unblockByAdmin); // Admin unblock
router
  .route("/:followId/block-status")
  .get(followController.getBlockStatusById); // Get block status
router.route("/analytics/blocks").get(followController.blockAnalytics); // Block analytics

router.route("/:userId/interests").post(followController.addInterest);

// Route to remove an interest category
router.route("/:userId/interests").delete(followController.removeInterest);
// Route to get all interest categories
router.route("/:userId/interests").get(followController.getInterests);

// Route to clear all interest categories
router.route("/:userId/interests/all").delete(followController.clearInterests);

// Route to check if a specific interest exists
router.route("/:userId/interests/check").post(followController.checkInterest);

/////////////////////////////////////////////////////////////////////////
//// Exporting the Router
export const followRouter = router;

import mongoose from "mongoose";

// Schema setup
const { Schema, model } = mongoose;
const { ObjectId } = Schema;

// Shop Schema Definition
const VoteSchema = new Schema(
  {
    user: {
      type: ObjectId,
      ref: "User",
      required: true,
    },
    material: {
      type: Schema.Types.ObjectId,
      ref: "AcademicMaterial",
      required: true,
    },
    review: {
      type: ObjectId,
      ref: "Review",
      required: true,
    },
    type: {
      type: String,
      enum: ["up", "down"],
      required: true,
    },
  },
  { timestamps: true }
);

// ReviewSchema.virtual("netVotes").get(function () {
//   return this.upvotes - this.downvotes;
// });

VoteSchema.index({ user: 1, material: 1 }, { unique: true }); // Prevent duplicate votes

VoteSchema.post("save", async function (doc) {
  // Update material votes
  if (doc.material) {
    const votes = await this.constructor.calculateMaterialVotes(doc.material);
    await mongoose.model("AcademicMaterial").findByIdAndUpdate(doc.material, {
      upvotes: votes.up,
      downvotes: votes.down,
    });
  }

  // Update review votes
  if (doc.review) {
    const votes = await this.constructor.calculateReviewVotes(doc.review);
    await mongoose.model("Review").findByIdAndUpdate(doc.review, {
      upvotes: votes.up,
      downvotes: votes.down,
    });
  }
});

VoteSchema.post("remove", async function (doc) {
  // Update material votes
  if (doc.material) {
    const votes = await this.constructor.calculateMaterialVotes(doc.material);
    await mongoose.model("AcademicMaterial").findByIdAndUpdate(doc.material, {
      upvotes: votes.up,
      downvotes: votes.down,
    });
  }

  // Update review votes
  if (doc.review) {
    const votes = await this.constructor.calculateReviewVotes(doc.review);
    await mongoose.model("Review").findByIdAndUpdate(doc.review, {
      upvotes: votes.up,
      downvotes: votes.down,
    });
  }
});

// Calculate vote counts for a specific material
VoteSchema.statics.calculateMaterialVotes = async function (materialId) {
  const result = await this.aggregate([
    { $match: { material: materialId } },
    {
      $group: {
        _id: "$type",
        count: { $sum: 1 },
      },
    },
  ]);

  const votes = result.reduce(
    (acc, { _id, count }) => {
      acc[_id] = count;
      return acc;
    },
    { up: 0, down: 0 }
  );

  return votes;
};

// Calculate vote counts for a specific review
VoteSchema.statics.calculateReviewVotes = async function (reviewId) {
  const result = await this.aggregate([
    { $match: { review: reviewId } },
    {
      $group: {
        _id: "$type",
        count: { $sum: 1 },
      },
    },
  ]);

  const votes = result.reduce(
    (acc, { _id, count }) => {
      acc[_id] = count;
      return acc;
    },
    { up: 0, down: 0 }
  );

  return votes;
};

VoteSchema.statics.getTopVotedMaterials = async function (limit = 10) {
  return await mongoose
    .model("AcademicMaterial")
    .find()
    .sort({ upvotes: -1, downvotes: 1 })
    .limit(limit)
    .exec();
};

VoteSchema.statics.getTopVotedReviews = async function (limit = 10) {
  return await mongoose
    .model("Review")
    .find()
    .sort({ upvotes: -1, downvotes: 1 })
    .limit(limit)
    .exec();
};

const Vote = model("Vote", VoteSchema);
export default Vote;

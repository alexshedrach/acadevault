import mongoose from "mongoose";

// Schema setup
const { Schema, model } = mongoose;
const { ObjectId } = Schema;

// Digital Content Subschema Definition

const downloadCodeSchema = new Schema({
  code: {
    type: String,
    required: true,
    unique: true,
    description: "Unique download code for accessing the digital content.",
  },
  digitalContent: {
    type: ObjectId,
    ref: "DigitalContent",
    required: true,
    description: "Reference to the associated digital content.",
  },
  user: {
    type: ObjectId,
    ref: "User",
    required: true,
    description: "The user who owns this download code.",
  },
  expirationDate: {
    type: Date,
    required: true,
    description: "The date and time when this download code expires.",
  },
  isUsed: {
    type: Boolean,
    default: false,
    description: "Indicates whether this download code has been used.",
  },
  usageCount: {
    type: Number,
    default: 0,
    description: "Tracks how many times this code has been used.",
  },
  usageLimit: {
    type: Number,
    default: 1,
    description:
      "The maximum number of times this code can be used before it becomes invalid.",
  },
});

const DownloadCode = model("DownloadCode", downloadCodeSchema);
export default DownloadCode;

import mongoose from "mongoose";
import { validateURLs } from "../../utils/validateURLs.js";

// Schema setup
const { Schema, model } = mongoose;
const { ObjectId } = Schema;

const documentFieldSchema = new Schema({
  url: {
    type: String,
    validate: {
      validator: validateURLs, // Use the updated function
      message: "Please provide a valid URL for the document",
    },
  },
  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending",
  },
  uploadedAt: {
    type: Date,
    default: Date.now,
  },
});

const shopVerificationDocumentSchema = new Schema({
  shop: {
    type: ObjectId,
    ref: "Shop",
    required: true,
    unique: true, // Ensure one document per shop
  },
  businessDocument: {
    type: documentFieldSchema,
    default: {},
  },
  identityProof: {
    type: documentFieldSchema,
    default: {},
  },
  addressProof: {
    type: documentFieldSchema,
    default: {},
  },
  type: {
    type: String,
    enum: ["cloud", "local"],
    required: true,
  },
});

const VerificationDocument = model(
  "VerificationDocument",
  shopVerificationDocumentSchema
);

export default VerificationDocument;

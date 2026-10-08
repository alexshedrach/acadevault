import mongoose from "mongoose";
import validator from "validator";
import { validateURLs } from "../../utils/validateURLs.js";

const { Schema } = mongoose;

const socialMediaLinksSchema = new mongoose.Schema({
  platform: {
    type: String,
    required: [true, "Social media platform is required."],
    validate: {
      validator: function (value) {
        const ALLOWED_SOCIAL_PLATFORMS = ["facebook", "twitter", "instagram"];
        return ALLOWED_SOCIAL_PLATFORMS.includes(value.toLowerCase());
      },
      message:
        "Invalid social media platform. Allowed values are Facebook, Twitter, and Instagram.",
    },
  },
  url: {
    type: String,
    required: [true, "Social media URL is required."],
    validate: {
      validator: validateURLs,
      message: "Please provide a valid URL.",
    },
  },
});

const contactInfoSchema = new Schema(
  {
    phone: {
      type: String,
      // required: true,
      unique: true,
      validate: {
        validator: (v) => /^\+?[1-9]\d{1,14}$/.test(v), // E.164 format
        message: (props) => `${props.value} is not a valid phone number!`,
      },
    },
    isPhoneVerified: {
      type: Boolean,
      default: false,
    },

    phoneOtp: {
      type: String,
      required: false,
    },
    phoneOtpExpiration: {
      type: Date,
      required: false,
    },
    email: {
      type: String,
      // required: true,
      unique: true,
      validate: [validator.isEmail, "Invalid email address"],
    },
    whatsapp: {
      type: String,
      validate: {
        validator: (v) => /^\+?[1-9]\d{1,14}$/.test(v), // E.164 format
        message: (props) => `${props.value} is not a valid WhatsApp number!`,
      },
    },
    socialMediaLinks: [socialMediaLinksSchema],
  },
  { _id: false }
);

export const ContactInfo = contactInfoSchema;

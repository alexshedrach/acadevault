import mongoose from 'mongoose';
// Schema setup
const { Schema, model } = mongoose;
const { ObjectId } = Schema;

// Notification Schema Definition
const notificationSchema = new Schema(
  {
    recipient: {
      type: ObjectId,
      ref: 'User', // User model to link the notification to a user (admin or seller)
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: [
        'info',
        'success',
        'warning',
        'error',
        'new_comment',
        'material_update',
        'user_action',
        'payment_alert',
        'welcome',
      ], // Added new types
      required: true,
    },
    isRead: {
      type: Boolean,
      default: false, // Flag to track if the notification has been read
    },
    priority: {
      type: String,
      enum: ['low', 'medium', 'high'], // Priority of notification
      default: 'medium',
    },
    action: {
      type: String, // Optional action URL or message
      default: null,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const Notification = model('Notification', notificationSchema);

export default Notification;

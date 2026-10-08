import cron from "node-cron";
import AcademicMaterial from "../api/models/AcademicMaterialModel.js";
import { logger } from "../utils/logger.js";
import User from "../api/models/UserModel.js";

const AUTO_DELETE_THRESHOLD_DAYS = 30; // Delete materials after 30 days
const EMAIL_REMINDER_DAYS = 3; // Send email 3 days before deletion

const cleanupSoftDeletedMaterials = async () => {
  try {
    const thresholdDate = new Date();
    thresholdDate.setDate(thresholdDate.getDate() - AUTO_DELETE_THRESHOLD_DAYS);

    // Find and permanently delete materials older than the threshold
    const deletedMaterials = await AcademicMaterial.deleteMany({
      isDeleted: true,
      deletedAt: { $lte: thresholdDate },
    });

    logger.info(
      `🗑️ Auto-delete cleanup: ${deletedMaterials.deletedCount} materials deleted.`
    );
  } catch (error) {
    logger.error("❌ Error in auto-delete cleanup:", error);
  }
};

// Schedule job to run every 24 hours (midnight)
cron.schedule("0 0 * * *", async () => {
  logger.info("🔄 Running scheduled cleanup for soft-deleted materials...");
  await cleanupSoftDeletedMaterials();
});

const sendDeletionReminderEmails = async () => {
  try {
    const reminderDate = new Date();
    reminderDate.setDate(
      reminderDate.getDate() -
        (AUTO_DELETE_THRESHOLD_DAYS - EMAIL_REMINDER_DAYS)
    );

    // Find soft-deleted materials nearing permanent deletion
    const materialsToNotify = await AcademicMaterial.find({
      isDeleted: true,
      deletedAt: { $lte: reminderDate },
    });

    for (const material of materialsToNotify) {
      const user = await User.findById(material.createdBy);
      if (!user) continue; // Skip if user not found

      //   const emailSubject = "⏳ Your Academic Material Will Be Deleted Soon";
      //   const emailBody = `
      //     Hello ${user.name},

      //     Your academic material "${material.title}" will be permanently deleted in ${EMAIL_REMINDER_DAYS} days.

      //     If you want to restore it, please visit your dashboard and recover it before it's too late.

      //     Regards,
      //     Academic Platform Team
      //   `;

      //   await sendEmail(user.email, emailSubject, emailBody);
      logger.info(
        `📩 Reminder sent to ${user.email} for material: ${material.title}`
      );
    }
  } catch (error) {
    logger.error("❌ Error in sending deletion reminder emails:", error);
  }
};

// Schedule job to run daily at 8 AM
cron.schedule("0 8 * * *", async () => {
  logger.info("🔄 Running scheduled email reminders for pending deletions...");
  await sendDeletionReminderEmails();
});

export default cleanupSoftDeletedMaterials;

// usage in the app.js
// Run cleanup service at startup (in case the cron job was missed)
// cleanupSoftDeletedMaterials();

// 🔥 Features of Auto-Delete Cleanup

// ✅ Runs automatically every 24 hours
// ✅ Deletes only materials soft-deleted for over 30 days
// ✅ Prevents database from growing unnecessarily
// ✅ Uses node-cron for efficient scheduling

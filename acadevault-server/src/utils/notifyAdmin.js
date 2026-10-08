import AdminEmail from "../helper/AdminEmail.js";
import { logger } from "./logger.js";

/**
 * Sends an email notification to the admin.
 * @param {String} templateName - The email template to use.
 * @param {String} subject - The subject of the email.
 * @param {Object} replacements - Dynamic content for the email.
 */
export async function notifyAdmin(templateName, subject, replacements = {}) {
  try {
    const adminEmail = process.env.ADMIN_EMAIL;
    if (!adminEmail) {
      logger.error("Admin email is not set in environment variables.");
      return;
    }

    const adminNotification = new AdminEmail(adminEmail, subject, null);
    await adminNotification.sendToAdmin(templateName, replacements);

    logger.info("Admin notified successfully:", subject);
  } catch (err) {
    logger.error("Error notifying admin:", err.message);
    // You can decide to throw the error or log it silently
  }
}

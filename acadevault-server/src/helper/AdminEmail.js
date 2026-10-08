import nodemailer from "nodemailer";
import { MailtrapTransport } from "mailtrap";
import { convert } from "html-to-text";

import Email from "../utils/emailUtils.js";
import AppError from "../utils/HandleAppErrors.js";

class AdminEmail extends Email {
  constructor(adminEmail, subject, content) {
    super({ email: adminEmail }, null); // Admin doesn't need URL
    this.subject = subject;
    this.content = content;
  }

  /**
   * Send an email to the admin
   * @param {string} templateName - The template file name (without extension)
   * @param {Object} replacements - Dynamic placeholders for the email template
   */
  async sendToAdmin(templateName, replacements = {}) {
    const html = await this.loadHtml(templateName, replacements);
    const text = convert(html);

    try {
      if (process.env.NODE_ENV === "production") {
        this.initMailgun();
        const response = await this.mailgunClient.messages.create(
          this.mailgunDomain,
          {
            from: this.from,
            to: [this.to],
            subject: this.subject,
            text,
            html,
          }
        );
        console.log("Admin email sent via Mailgun:", response);
      } else {
        const transport = nodemailer.createTransport(
          MailtrapTransport({
            token: process.env.MAIL_API_TOKEN,
            testInboxId: process.env.MAILTRAP_INBOX_ID,
          })
        );

        const response = await transport.sendMail({
          from: {
            name: process.env.senderName || "AcadeMate Notifications",
            address: this.from,
          },
          to: this.to,
          subject: this.subject,
          text,
          html,
          category: "Admin Notification",
          sandbox: true,
        });
        console.log("Admin email sent via Mailtrap:", response);
      }
    } catch (err) {
      console.error("Error sending admin email:", err.message);
      if (err.response?.body) {
        console.error("Mailgun error body:", err.response.body);
      }
      throw new AppError(
        "Failed to send admin email. Please try again later.",
        500
      );
    }
  }
}

export default AdminEmail;

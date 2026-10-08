import formData from "form-data";
import Mailgun from "mailgun.js";
import nodemailer from "nodemailer";
import { MailtrapTransport } from "mailtrap";
import { convert } from "html-to-text";
import path from "path";
import fs from "fs/promises";
import AppError from "./HandleAppErrors.js";

class Email {
  constructor(user, url) {
    this.to = user.email;
    this.firstName = user.name ? user.name.split(" ")[0] : "User";
    this.url = url;
    // this.from = `AcadeMate <${process.env.MAILGUN_MAIL_FROM}>`;
    this.from =
      process.env.NODE_ENV === "production"
        ? `AcadeMate <${process.env.MAILGUN_MAIL_FROM}>`
        : `AcadeMate <${process.env.MAIL_FROM}>`;
  }

  /**
   * Initialize Mailgun client
   */
  initMailgun() {
    const { MAILGUN_API_KEY, MAILGUN_DOMAIN } = process.env;

    if (!MAILGUN_API_KEY || !MAILGUN_DOMAIN) {
      console.error("Missing Mailgun configuration.");
      throw new Error("Mailgun API key or domain is not configured.");
    }

    console.log("Initializing Mailgun with domain:", MAILGUN_DOMAIN);

    const mailgun = new Mailgun(formData);
    this.mailgunClient = mailgun.client({
      username: "api",
      key: MAILGUN_API_KEY,
    });
    this.mailgunDomain = MAILGUN_DOMAIN;
  }

  /**
   * Load HTML template from file
   * @param {string} templateName - Template file name (without extension)
   * @param {Object} replacements - Dynamic content to replace placeholders
   * @returns {string} - Processed HTML content
   */

  async loadHtml(templateName, replacements = {}) {
    try {
      const templatePath = path.join(
        path.resolve("src/templates", "emails"),
        `${templateName}.html`
      );
      let html = await fs.readFile(templatePath, "utf-8");
      for (const [key, value] of Object.entries(replacements)) {
        html = html.replace(new RegExp(`{{${key}}}`, "g"), value);
      }
      return html;
    } catch (err) {
      console.error(`Error loading email template: ${err.message}`);
      throw new AppError(`Failed to load email template: ${err.message}`, 500);
    }
  }

  /**
   * Send the email using the appropriate service
   * @param {string} templateName - Template file name or custom raw HTML
   * @param {string} subject - Email subject
   * @param {Object} replacements - Dynamic content for placeholders in email body
   */

  async send(templateName, subject, replacements = {}) {
    const html = await this.loadHtml(templateName, {
      firstName: this.firstName,
      url: this.url,
      ...replacements,
    });
    const text = convert(html);

    try {
      if (process.env.NODE_ENV === "production") {
        this.initMailgun();
        const response = await this.mailgunClient.messages.create(
          this.mailgunDomain,
          {
            from: this.from,
            to: [this.to],
            subject,
            text,
            html,
          }
        );
        console.log("Mailgun response:", response);
      } else {
        const transport = nodemailer.createTransport(
          MailtrapTransport({
            token: process.env.MAIL_API_TOKEN,
            testInboxId: process.env.MAILTRAP_INBOX_ID,
          })
        );

        const response = await transport.sendMail({
          from: {
            name: process.env.senderName || "Mailtrap Test",
            address: this.from,
          },
          to: this.to,
          subject,
          text,
          html,
          category: "Integration Test",
          sandbox: true,
        });
        console.log("Mailtrap response:", response);
      }
    } catch (err) {
      console.error("Error sending email:", err, err.message);
      if (err.response?.body) {
        console.error("Mailgun error body:", err.response.body);
      }
      throw new AppError("Failed to send email. Please try again later.", 500);
    }
  }

  async sendWelcome() {
    await this.send("welcome", "🎉 Welcome to AcadeMate!", {
      message: `We’re thrilled to have you here, ${this.firstName}! Start exploring today.`,
    });
  }

  async sendAccountActivated() {
    await this.send(
      "accountActivated",
      "🎉 Your AcadeMate Account is Activated!",
      {
        message: `Your account is now active, ${this.firstName}! You can start exploring the platform right away.`,
      }
    );
  }

  async sendPasswordReset() {
    await this.send("resetPassword", "🔒 Reset Your Password", {
      message: `Hello ${this.firstName}, click the link below to reset your password. This link is valid for only 10 minutes.`,
    });
  }
}

export default Email;

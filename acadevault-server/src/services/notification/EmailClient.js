import formData from 'form-data';
import Mailgun from 'mailgun.js';
import nodemailer from 'nodemailer';
import { MailtrapTransport } from 'mailtrap';
import { convert } from 'html-to-text';
import sanitizeHtml from 'sanitize-html';
import AppError from '../../utils/HandleAppErrors.js';
import { logger } from '../../utils/logger.js';
import TemplateRenderer from './TemplateRenderer.js';
// import path from 'path';
// import fs from 'fs/promises';

/**
 * EmailClient handles email transport using Mailgun (production) or Mailtrap (development).
 * It leverages TemplateRenderer for advanced templating (HTML, Handlebars, text) with caching.
 */
class EmailClient {
  /**
   * @param {Object} recipient - { email, name }
   * @param {String} url - Optional CTA URL
   */
  constructor(recipient, url = '#') {
    this.to = recipient.email;
    this.firstName = recipient.name?.split(' ')[0] || 'User';
    this.url = url;
    this.from = `AcaDeVault <${
      process.env.NODE_ENV === 'production' ? process.env.MAILGUN_MAIL_FROM : process.env.MAIL_FROM
    }>`;
  }

  /**
   * Initialize the Mailgun client for production environment.
   * Throws if credentials are missing.
   */
  initMailgun() {
    const { MAILGUN_API_KEY, MAILGUN_DOMAIN } = process.env;
    if (!MAILGUN_API_KEY || !MAILGUN_DOMAIN) {
      logger.error('Mailgun init failed: Missing credentials', {
        recipientEmail: this.to,
      });
      throw new AppError('Missing Mailgun credentials', 500);
    }

    const mailgun = new Mailgun(formData);
    this.mailgunClient = mailgun.client({ username: 'api', key: MAILGUN_API_KEY });
    this.mailgunDomain = MAILGUN_DOMAIN;
  }

  /**
   * Render the email template using TemplateRenderer with sanitized inputs.
   * @param {String} templateName - Base filename without extension
   * @param {Object} replacements - Template context
   * @returns {Promise<string>} - Rendered HTML string
   */
  async renderTemplate(templateName, replacements = {}) {
    try {
      // Sanitize string replacements to prevent XSS
      const sanitizedReplacements = Object.fromEntries(
        Object.entries(replacements).map(([key, value]) => [
          key,
          typeof value === 'string' ? sanitizeHtml(value, { allowedTags: [] }) : value,
        ])
      );
      return await TemplateRenderer.render(
        templateName,
        { firstName: this.firstName, url: this.url, ...sanitizedReplacements },
        'emails',
        ['html', 'hbs', 'txt']
      );
    } catch (err) {
      logger.error('TemplateRenderer failed', {
        templateName,
        recipientEmail: this.to,
        error: err.message,
      });
      throw new AppError(`Email template render failed for '${templateName}': ${err.message}`, 500);
    }
  }

  /**
   * Send an email using chosen transport with retry logic.
   * @param {String} templateName
   * @param {String} subject
   * @param {Object} replacements
   */
  async send(templateName, nearSubject, replacements = {}) {
    // Validate subject length (Mailgun limit: 998 characters)
    const subject = nearSubject.length > 998 ? nearSubject.substring(0, 995) + '...' : nearSubject;
    if (subject.length > 998) {
      logger.error('Email subject exceeds maximum length', {
        templateName,
        recipientEmail: this.to,
        subjectLength: subject.length,
      });
      throw new AppError('Email subject exceeds maximum length (998 characters)', 400);
    }

    const html = await this.renderTemplate(templateName, replacements);
    const text = convert(html);

    const MAX_RETRIES = parseInt(process.env.EMAIL_MAX_RETRIES || '3', 10);
    const BASE_DELAY_MS = 1000;
    let attempt = 0;
    let lastError;

    while (attempt <= MAX_RETRIES) {
      try {
        if (process.env.NODE_ENV === 'production') {
          this.initMailgun();
          const response = await this.mailgunClient.messages.create(this.mailgunDomain, {
            from: this.from,
            to: [this.to],
            subject,
            html,
            text,
          });
          logger.info('Mailgun email sent', {
            id: response.id,
            recipientEmail: this.to,
            templateName,
            attempt: attempt + 1,
          });
          return response;
        } else {
          const transporter = nodemailer.createTransport(
            MailtrapTransport({
              token: process.env.MAIL_API_TOKEN,
              testInboxId: process.env.MAILTRAP_INBOX_ID,
            })
          );
          const info = await transporter.sendMail({
            from: this.from,
            to: this.to,
            subject,
            html,
            text,
            headers: { 'X-Debug-Template': templateName },
          });
          logger.debug('Mailtrap email sent', {
            messageId: info.messageId,
            recipientEmail: this.to,
            templateName,
            attempt: attempt + 1,
          });
          return info;
        }
      } catch (err) {
        lastError = err;
        // Check for permanent failures (4xx errors)
        if (err.status && err.status >= 400 && err.status < 500) {
          logger.error('Permanent email failure', {
            recipientEmail: this.to,
            templateName,
            attempt: attempt + 1,
            error: err.message,
          });
          throw new AppError(`Permanent email failure: ${err.message}`, err.status);
        }
        logger.warn('Email send attempt failed', {
          recipientEmail: this.to,
          templateName,
          attempt: attempt + 1,
          error: err.message,
        });
        attempt += 1;
        if (attempt > MAX_RETRIES) break;
        const delay = BASE_DELAY_MS * Math.pow(2, attempt) + Math.random() * 100; // Exponential backoff + jitter
        await new Promise((resolve) => setTimeout(resolve, delay));
      }
    }

    logger.error('All email send attempts failed', {
      recipientEmail: this.to,
      templateName,
      error: lastError.message,
      attempts: MAX_RETRIES + 1,
    });
    throw new AppError('Failed to send email after multiple attempts', 500);
  }

  // === Preset Emails ===

  sendWelcome() {
    return this.send('welcome', '🎉 Welcome to AcaDeVault!', {
      message: `We’re thrilled to have you here, ${this.firstName}!`,
    });
  }

  sendAccountActivated() {
    return this.send('accountActivated', '🎉 Your AcaDeVault Account is Activated!', {
      message: `Hi ${this.firstName}, your account is now active!`,
    });
  }

  sendPasswordReset() {
    return this.send('resetPassword', '🔒 Reset Your Password', {
      message: `Hello ${this.firstName}, click the link below to reset your password.`,
    });
  }
}

export default EmailClient;

// /**
//  * EmailClient handles all email transport logic using Mailgun (prod) or Mailtrap (dev).
//  * It loads HTML templates, converts to text, and sends emails with built-in retries and logging.
//  */
// class EmailClient {
//   /**
//    * @param {Object} recipient - { email, name }
//    * @param {String} url - Optional CTA URL
//    */
//   constructor(recipient, url = '#') {
//     this.to = recipient.email;
//     this.firstName = recipient.name?.split(' ')[0] || 'User';
//     this.url = url;
//     // Choose sender based on environment
//     this.from = `AcaDeVault <${
//       process.env.NODE_ENV === 'production' ? process.env.MAILGUN_MAIL_FROM : process.env.MAIL_FROM
//     }>`;
//     // Cache for compiled templates to avoid repeated file reads
//     this._templateCache = new Map();
//   }

//   /**
//    * Initialize Mailgun client for production.
//    * Throws if credentials are missing.
//    */
//   initMailgun() {
//     const { MAILGUN_API_KEY, MAILGUN_DOMAIN } = process.env;
//     if (!MAILGUN_API_KEY || !MAILGUN_DOMAIN) {
//       logger.error('Mailgun init failed: Missing credentials');
//       throw new AppError('Missing Mailgun credentials', 500);
//     }

//     const mailgun = new Mailgun(formData);
//     this.mailgunClient = mailgun.client({ username: 'api', key: MAILGUN_API_KEY });
//     this.mailgunDomain = MAILGUN_DOMAIN;
//   }

//   /**
//    * Load and cache HTML email templates.
//    * @param {String} templateName - filename without extension
//    * @param {Object} replacements - key-value pairs for placeholders
//    * @returns {String} processed HTML
//    */
//   async loadHtmlTemplate(templateName, replacements = {}) {
//     try {
//       // Use cached template if available
//       if (!this._templateCache.has(templateName)) {
//         const templatePath = path.resolve('src/templates/emails', `${templateName}.html`);
//         const rawHtml = await fs.readFile(templatePath, 'utf-8');
//         this._templateCache.set(templateName, rawHtml);
//       }
//       // Clone to avoid mutating cache
//       let html = this._templateCache.get(templateName);

//       // Replace placeholders
//       for (const [key, value] of Object.entries(replacements)) {
//         const pattern = new RegExp(`{{${key}}}`, 'g');
//         html = html.replace(pattern, value);
//       }

//       return html;
//     } catch (err) {
//       logger.error(`Template load error for '${templateName}':`, err.message);
//       throw new AppError(`Email template load failed: ${err.message}`, 500);
//     }
//   }

//   /**
//    * Send an email using the chosen transport.
//    * Includes retry logic for transient errors.
//    * @param {String} templateName
//    * @param {String} subject
//    * @param {Object} replacements
//    */
//   async send(templateName, subject, replacements = {}) {
//     const html = await this.loadHtmlTemplate(templateName, {
//       firstName: this.firstName,
//       url: this.url,
//       ...replacements,
//     });
//     const text = convert(html);

//     const MAX_RETRIES = 2;
//     let attempt = 0;
//     let lastError;

//     while (attempt <= MAX_RETRIES) {
//       try {
//         if (process.env.NODE_ENV === 'production') {
//           this.initMailgun();
//           const response = await this.mailgunClient.messages.create(this.mailgunDomain, {
//             from: this.from,
//             to: [this.to],
//             subject,
//             html,
//             text,
//           });
//           logger.info('Mailgun email sent', { id: response.id, to: this.to, templateName });
//           return response;
//         } else {
//           const transporter = nodemailer.createTransport(
//             MailtrapTransport({
//               token: process.env.MAIL_API_TOKEN,
//               testInboxId: process.env.MAILTRAP_INBOX_ID,
//             })
//           );
//           const info = await transporter.sendMail({
//             from: this.from,
//             to: this.to,
//             subject,
//             html,
//             text,
//             // tag for debugging
//             headers: { 'X-Debug-Template': templateName },
//           });
//           logger.debug('Mailtrap email sent', {
//             messageId: info.messageId,
//             to: this.to,
//             templateName,
//           });
//           return info;
//         }
//       } catch (err) {
//         lastError = err;
//         logger.warn(`Email send attempt #${attempt + 1} failed`, { error: err.message });
//         attempt += 1;
//         // exponential backoff for retries
//         await new Promise((resolve) => setTimeout(resolve, 1000 * attempt));
//       }
//     }

//     logger.error('All email send attempts failed', {
//       recipient: this.to,
//       templateName,
//       error: lastError.message,
//     });
//     throw new AppError('Failed to send email after multiple attempts', 500);
//   }

//   // === Preset Templated Emails ===

//   async sendWelcome() {
//     return this.send('welcome', '🎉 Welcome to AcaDeVault!', {
//       message: `We’re thrilled to have you here, ${this.firstName}!`,
//     });
//   }

//   async sendAccountActivated() {
//     return this.send('accountActivated', '🎉 Your AcaDeVault Account is Activated!', {
//       message: `Hi ${this.firstName}, your account is now active!`,
//     });
//   }

//   async sendPasswordReset() {
//     return this.send('resetPassword', '🔒 Reset Your Password', {
//       message: `Hello ${this.firstName}, click the link below to reset your password.`,
//     });
//   }
// }

// export default EmailClient;

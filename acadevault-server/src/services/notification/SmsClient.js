import axios from 'axios';
import AppError from '../../utils/HandleAppErrors.js';

class SmsClient {
  constructor(recipientPhone) {
    if (!recipientPhone) {
      throw new AppError('Recipient phone number is required', 400);
    }

    this.to = recipientPhone;
    this.provider = process.env.SMS_PROVIDER || 'termii'; // default
  }

  /**
   * Send SMS using the selected provider
   * @param {String} message
   * @returns {Object} response data
   */
  async send(message) {
    if (!message || typeof message !== 'string') {
      throw new AppError('SMS message content is required', 400);
    }

    switch (this.provider) {
      case 'termii':
        return await this.sendViaTermii(message);
      case 'twilio':
        return await this.sendViaTwilio(message);
      default:
        throw new AppError(`Unsupported SMS provider: ${this.provider}`, 500);
    }
  }

  /**
   * Send SMS via Termii API
   */
  async sendViaTermii(message) {
    const { TERMII_API_KEY, TERMII_SENDER_ID } = process.env;

    if (!TERMII_API_KEY || !TERMII_SENDER_ID) {
      throw new AppError('Termii credentials are missing', 500);
    }

    try {
      const payload = {
        to: this.to,
        from: TERMII_SENDER_ID,
        sms: message,
        type: 'plain',
        channel: 'generic',
        api_key: TERMII_API_KEY,
      };

      const { data } = await axios.post('https://api.ng.termii.com/api/sms/send', payload);
      return {
        provider: 'termii',
        responseCode: data.code || data.message_id,
        raw: data,
      };
    } catch (err) {
      throw new AppError(`Termii SMS failed: ${err.response?.data?.message || err.message}`, 500);
    }
  }

  /**
   * Send SMS via Twilio API
   */
  async sendViaTwilio(message) {
    const { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_PHONE_NUMBER } = process.env;

    if (!TWILIO_ACCOUNT_SID || !TWILIO_AUTH_TOKEN || !TWILIO_PHONE_NUMBER) {
      throw new AppError('Twilio credentials are missing', 500);
    }

    try {
      const url = `https://api.twilio.com/2010-04-01/Accounts/${TWILIO_ACCOUNT_SID}/Messages.json`;
      const params = new URLSearchParams({
        From: TWILIO_PHONE_NUMBER,
        To: this.to,
        Body: message,
      });

      const auth = {
        username: TWILIO_ACCOUNT_SID,
        password: TWILIO_AUTH_TOKEN,
      };

      const { data } = await axios.post(url, params, { auth });
      return {
        provider: 'twilio',
        responseCode: data.sid,
        raw: data,
      };
    } catch (err) {
      throw new AppError(`Twilio SMS failed: ${err.response?.data?.message || err.message}`, 500);
    }
  }
}

export default SmsClient;

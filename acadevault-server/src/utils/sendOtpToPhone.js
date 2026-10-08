import twilio from "twilio";

// Load environment variables
const { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_PHONE_NUMBER } =
  process.env;

const client = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

/**
 * Sends an OTP to the provided phone number using Twilio.
 * @param {string} phoneNumber - The recipient's phone number.
 * @param {string} otp - The OTP to be sent.
 * @returns {Promise<void>}
 */
export const sendOtpToPhone = async (phoneNumber, otp) => {
  try {
    const message = await client.messages.create({
      body: `Your OTP is: ${otp}. It will expire in 5 minutes.`,
      from: TWILIO_PHONE_NUMBER,
      to: phoneNumber,
    });

    console.log("OTP sent:", message.sid);
  } catch (error) {
    console.error("Error sending OTP:", error.message);
    throw new Error("Failed to send OTP. Please try again later.");
  }
};

import dotenv from "dotenv";
import { boolEnv, getEnv } from '../utils/commonUtils.js';

// Load environment variables
dotenv.config();

// Grouped External API Configurations
export const apiConfig = {
  stripe: {
    secretKey: getEnv("STRIPE_SECRET_KEY", ""),
    publishableKey: getEnv("STRIPE_PUBLISHABLE_KEY", ""),
  },
  paypal: {
    clientId: getEnv("PAYPAL_CLIENT_ID", ""),
    clientSecret: getEnv("PAYPAL_CLIENT_SECRET", ""),
    mode: getEnv("PAYPAL_MODE", "sandbox"),
  },
  googleOAuth: {
    enabled: boolEnv("GOOGLE_OAUTH_ENABLED", true),
    clientId: getEnv("GOOGLE_CLIENT_ID", ""),
    clientSecret: getEnv("GOOGLE_CLIENT_SECRET", ""),
    redirectUri: getEnv("GOOGLE_REDIRECT_URI", ""),
  },
  facebookOAuth: {
    enabled: boolEnv("FACEBOOK_OAUTH_ENABLED", true),
    appId: getEnv("FACEBOOK_APP_ID", ""),
    appSecret: getEnv("FACEBOOK_APP_SECRET", ""),
    redirectUri: getEnv("FACEBOOK_REDIRECT_URI", ""),
  },
  emailServices: {
    sendGrid: {
      apiKey: getEnv("SENDGRID_API_KEY", ""),
      fromEmail: getEnv("SENDGRID_FROM_EMAIL", "noreply@academate.com"),
      fromName: getEnv("SENDGRID_FROM_NAME", "AcadeMate"),
    },
    mailgun: {
      apiKey: getEnv("MAILGUN_API_KEY", ""),
      domain: getEnv("MAILGUN_DOMAIN", ""),
      fromEmail: getEnv("MAILGUN_FROM_EMAIL", "noreply@academate.com"),
    },
  },
  storage: {
    cloudinary: {
      enabled: boolEnv("CLOUDINARY_ENABLED", true),
      cloudName: getEnv("CLOUDINARY_CLOUD_NAME", ""),
      apiKey: getEnv("CLOUDINARY_API_KEY", ""),
      apiSecret: getEnv("CLOUDINARY_API_SECRET", ""),
    },
    awsS3: {
      enabled: boolEnv("AWS_S3_ENABLED", false),
      accessKeyId: getEnv("AWS_ACCESS_KEY_ID", ""),
      secretAccessKey: getEnv("AWS_SECRET_ACCESS_KEY", ""),
      region: getEnv("AWS_REGION", "us-east-1"),
      bucketName: getEnv("AWS_S3_BUCKET", ""),
    },
  },
  analytics: {
    trackingProvider: getEnv("TRACKING_PROVIDER", "Google Analytics"),
    trackingId: getEnv("GA_TRACKING_ID", "UA-XXXXX-Y"),
    enableEventTracking: boolEnv("ENABLE_EVENT_TRACKING", true),
  },
  rateLimit: {
    maxRequests: Number(getEnv("MAX_REQUESTS_PER_MINUTE", 1000)),
    windowMs: Number(getEnv("WINDOW_DURATION", 60)) * 1000,
  },
};

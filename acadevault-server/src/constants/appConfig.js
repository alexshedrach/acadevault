import { boolEnv, getEnv } from "../utils/commonUtils.js";

// Optimized App Configurations
export const appConfig = {
  APP_NAME: "AcadeVault",
  BASE_URL: getEnv("BASE_URL", "https://acadevault.com"),
  APP_DESCRIPTION:
    "A comprehensive platform for managing and purchasing academic materials, bridging the gap between knowledge providers and knowledge seekers.",
  SUPPORT: {
    email: getEnv("SUPPORT_EMAIL", "support@acadevault.com"),
    phone: getEnv("SUPPORT_PHONE", "+1-800-ACADE-VAULT"),
  },
  DISPLAY: {
    itemsPerPage: Number(getEnv("ITEMS_PER_PAGE", 10)),
    currency: getEnv("DEFAULT_CURRENCY", "USD"),
    currencySymbol: getEnv("CURRENCY_SYMBOL", "$"),
    timezone: getEnv("TIMEZONE", "UTC"),
    defaultLanguage: getEnv("DEFAULT_LANGUAGE", "en-US"),
  },
  UPLOAD: {
    maxSizeMB: Number(getEnv("MAX_UPLOAD_SIZE_MB", 50)),
    allowedFileTypes: getEnv(
      "ALLOWED_FILE_TYPES",
      ".pdf,.docx,.xlsx,.pptx,.epub"
    ).split(","),
  },
  PAYMENT_GATEWAYS: [
    { name: "Stripe", active: boolEnv("STRIPE_ENABLED", true) },
    { name: "PayPal", active: boolEnv("PAYPAL_ENABLED", true) },
    { name: "Razorpay", active: boolEnv("RAZORPAY_ENABLED", false) },
  ],
  SUBSCRIPTION_PLANS: [
    {
      name: "Basic",
      price: 9.99,
      features: ["Standard visibility for materials", "Basic analytics"],
    },
    {
      name: "Premium",
      price: 29.99,
      features: [
        "Featured listing",
        "Advanced analytics",
        "Priority support",
        "Material promotion tools",
      ],
    },
    {
      name: "Enterprise",
      price: 99.99,
      features: [
        "Unlimited featured listings",
        "Advanced marketing tools",
        "Custom analytics and reports",
        "Dedicated account manager",
      ],
    },
  ],
  TAX: {
    rate: Number(getEnv("TAX_RATE", 0.08)),
    enableCalculation: boolEnv("ENABLE_TAX_CALCULATION", true),
  },
  NOTIFICATIONS: {
    email: boolEnv("EMAIL_NOTIFICATIONS", true),
    push: boolEnv("PUSH_NOTIFICATIONS", true),
    sms: boolEnv("SMS_NOTIFICATIONS", true),
  },
  SECURITY: {
    password: {
      minLength: Number(getEnv("PASSWORD_MIN_LENGTH", 8)),
      complexity: {
        requireUppercase: boolEnv("PASSWORD_REQUIRE_UPPERCASE", true),
        requireLowercase: boolEnv("PASSWORD_REQUIRE_LOWERCASE", true),
        requireNumbers: boolEnv("PASSWORD_REQUIRE_NUMBERS", true),
        requireSpecialCharacters: boolEnv("PASSWORD_REQUIRE_SPECIAL", true),
      },
    },
    accountLock: {
      threshold: Number(getEnv("ACCOUNT_LOCK_THRESHOLD", 5)),
      durationMinutes: Number(getEnv("ACCOUNT_LOCK_DURATION", 15)),
    },
    twoFactorAuth: boolEnv("TWO_FACTOR_AUTH_ENABLED", true),
  },
  CONTENT_SECURITY: {
    enableCSP: boolEnv("ENABLE_CSP", true),
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "https://www.gstatic.com"],
      objectSrc: ["'none'"],
      upgradeInsecureRequests: true,
    },
  },
};

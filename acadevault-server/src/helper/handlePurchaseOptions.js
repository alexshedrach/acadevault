import AppError from "../utils/HandleAppErrors.js";

// Handle platform details, setting defaults if necessary
const handlePlatformDetails = (platformDetails) => {
  return {
    platformFee: platformDetails?.platformFee || 0,
    affiliateCommission: platformDetails?.affiliateCommission || 0,
    regionAvailability: platformDetails?.regionAvailability || ["Global"],
    deliveryOptions: platformDetails?.deliveryOptions || ["Digital"],
    estimatedDeliveryTime: platformDetails?.estimatedDeliveryTime || "",
    integrationStatus: platformDetails?.integrationStatus || "Active",
    platformSupportContact: {
      email: platformDetails?.platformSupportContact?.email || "",
      phone: platformDetails?.platformSupportContact?.phone || "",
    },
    apiIntegration: {
      apiKey: platformDetails?.apiIntegration?.apiKey || "",
      apiEndpoint: platformDetails?.apiIntegration?.apiEndpoint || "",
      lastSyncDate: platformDetails?.apiIntegration?.lastSyncDate || null,
    },
  };
};
// Handle analytics, setting defaults if necessary
const handleAnalytics = (analytics) => {
  return {
    salesCount: analytics?.salesCount || 0,
    viewsCount: analytics?.viewsCount || 0,
    conversionRate: analytics?.conversionRate || 0,
  };
};

// Handle and validate purchase options (affiliate links)
export const handlePurchaseOptions = (purchaseOptions) => {
  return purchaseOptions.map((option) => {
    if (
      !option.platform ||
      !option.purchaseLink ||
      !option.price ||
      !option.currency
    ) {
      throw new AppError(
        "Each purchase option must include platform, purchaseLink, price, and currency.",
        400
      );
    }

    // Validate URL format
    if (!/^(ftp|http|https):\/\/[^ "]+$/.test(option.purchaseLink)) {
      throw new AppError("Invalid purchase link URL format.", 400);
    }

    return {
      platform: option.platform,
      purchaseLink: option.purchaseLink,
      price: option.price,
      currency: option.currency,
      platformDetails: handlePlatformDetails(option.platformDetails),
      analytics: handleAnalytics(option.analytics),
    };
  });
};

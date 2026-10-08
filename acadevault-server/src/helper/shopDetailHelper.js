import DiscountCoupon from "../api/models/DiscountCouponModel.js";
import Review from "../api/models/ReviewModel.js";
import AppError from "../utils/HandleAppErrors.js";

// Buyer-specific data enrichment
export const getBuyerSpecificDetails = async (shop) => {
  const discountCoupons = await DiscountCoupon.find(
    { shop: shop._id, isActive: true },
    "code discount expiryDate"
  ).lean();

  const shopRating =
    shop.reviews?.length > 0
      ? shop.reviews.reduce((sum, review) => sum + review.rating, 0) /
        shop.reviews.length
      : 0;

  return {
    reviews: shop.reviews || [],
    discountCoupons,
    shopRating: parseFloat(shopRating.toFixed(2)), // Round to 2 decimal places
  };
};

// Seller-specific data enrichment
export const getSellerSpecificDetails = async (shop) => {
  // await shop.populate("materials", "title salesCount price isPublished");

  const performanceMetrics = await shop.getShopPerformanceMetrics();

  const flaggedReviews = await Review.find(
    { shop: shop._id, isFlagged: true },
    "reviewer comment rating"
  ).lean();

  const enrichedMaterials = shop.materials.map((material) => ({
    ...material,
    salesCount: material.salesCount || 0,
  }));

  return {
    materials: enrichedMaterials,
    performanceMetrics,
    flaggedReviews,
    salesTotal: enrichedMaterials.reduce(
      (total, material) => total + material.salesCount,
      0
    ),
  };
};

// Admin-specific data enrichment
export const getAdminSpecificDetails = async (shop) => {
  if (!shop || !shop._id) {
    throw new AppError("Invalid shop ID.", 400);
  }

  const transactions = await shop.getTransactions();

  return {
    transactions: transactions.transactions || [], // ✅ Ensure it's always an array
    complianceStatus: shop.complianceStatus || "Compliant",
    metadata: {
      createdAt: shop.createdAt,
      updatedAt: shop.updatedAt,
    },
  };
};

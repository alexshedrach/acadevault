import Cart from "../api/models/CartModel.js";
import DiscountCoupon from "../api/models/DiscountCouponModel.js";
import AppError from "../utils/HandleAppErrors.js";

class DiscountService {
  /**
   * Validates a discount code based on eligibility, expiration, usage, and restrictions.
   *
   * @param {String} discountCode - Discount code to validate.
   * @param {String} userId - User ID applying the discount.
   * @param {Number} cartTotal - Total amount before discount.
   * @param {Array} cartItems - Array of cart items, each with productId and categoryId.
   * @returns {Object} - Object containing validity, discount amount, and message.
   */
  static async validateDiscount(
    discountCode,
    userId,
    cartTotal,
    cartItems = []
  ) {
    if (!discountCode) {
      return {
        valid: false,
        discountAmount: 0,
        message: "No discount code provided.",
      };
    }

    const discount = await DiscountCoupon.findOne({
      code: discountCode,
      status: "Active",
    });

    if (!discount) {
      return {
        valid: false,
        discountAmount: 0,
        message: "Invalid or inactive discount code.",
      };
    }

    const now = new Date();

    // Check validity period
    if (discount.validFrom > now) {
      return {
        valid: false,
        discountAmount: 0,
        message: "Discount code is not yet active.",
      };
    }

    if (discount.validUntil < now) {
      return {
        valid: false,
        discountAmount: 0,
        message: "Discount code has expired.",
      };
    }

    // Check redemption limits
    if (
      discount.maxRedemptions !== null &&
      discount.redeemedCount >= discount.maxRedemptions
    ) {
      return {
        valid: false,
        discountAmount: 0,
        message: "Discount code usage limit reached.",
      };
    }

    // Check per-user limit
    const userRedemptionCount = await Cart.countDocuments({
      userId,
      discountCode,
    });

    if (userRedemptionCount >= discount.perUserLimit) {
      return {
        valid: false,
        discountAmount: 0,
        message: "You have reached the usage limit for this discount.",
      };
    }

    // Check minimum order amount
    if (discount.minOrderAmount && cartTotal < discount.minOrderAmount) {
      return {
        valid: false,
        discountAmount: 0,
        message: `Minimum order value to apply this coupon is ${discount.minOrderAmount}.`,
      };
    }

    // Check scope and applicability
    if (discount.scope === "Specific" && discount.applicableToModel) {
      const applicableIds = discount.applicableTo.map((id) => id.toString());
      const isApplicable = cartItems.some((item) => {
        if (discount.applicableToModel === "AcademicMaterial") {
          return applicableIds.includes(item.productId.toString());
        }
        if (discount.applicableToModel === "Category") {
          return applicableIds.includes(item.categoryId.toString());
        }
        return false; // For other models like Shop
      });

      if (!isApplicable) {
        return {
          valid: false,
          discountAmount: 0,
          message: "Discount is not applicable to items in your cart.",
        };
      }
    }

    // Calculate discount
    let discountAmount =
      discount.discountType === "Percentage"
        ? (cartTotal * discount.discountValue) / 100
        : discount.discountValue;

    if (discount.maxDiscountAmount) {
      discountAmount = Math.min(discountAmount, discount.maxDiscountAmount);
    }

    discountAmount = Math.min(discountAmount, cartTotal);

    return {
      valid: true,
      discountAmount,
      message: "Discount applied successfully.",
      discount,
    };
  }

  /**
   * Applies a valid discount code to a user's cart.
   *
   * @param {String} userId - The user applying the discount.
   * @param {String} discountCode - The discount code entered.
   * @returns {Object} - Updated cart summary.
   */
  static async applyDiscount(userId, discountCode) {
    if (!discountCode) {
      throw new AppError("Please provide a discount code.", 400);
    }

    // Retrieve user's cart
    const cart = await Cart.findOne({ userId }).populate("items.product");
    if (!cart || cart.items.length === 0) {
      throw new AppError("Your cart is empty.", 400);
    }

    const cartTotal = cart.subtotal;
    const cartItems = cart.items.map((item) => ({
      productId: item.product._id,
      categoryId: item.product.categoryId,
    }));

    // Validate discount
    const validationResult = await this.validateDiscount(
      discountCode,
      userId,
      cartTotal,
      cartItems
    );

    if (!validationResult.valid) {
      throw new AppError(validationResult.message, 400);
    }

    const { discountAmount, discount } = validationResult;

    // Update cart totals
    cart.discountCode = discount.code;
    cart.discountAmount = discountAmount;
    cart.total = cart.subtotal - discountAmount + cart.tax;

    // Save updated cart
    await cart.save();

    // Update redeemed count for the discount
    discount.redeemedCount += 1;
    await discount.save();

    return {
      success: true,
      message: `Discount applied successfully! You saved ${discountAmount.toFixed(2)}.`,
      updatedTotal: cart.total,
    };
  }
}

export default DiscountService;

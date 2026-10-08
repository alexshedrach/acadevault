import mongoose from 'mongoose';
import AppError from '../../utils/HandleAppErrors.js';
import { logger } from '../../utils/logger.js';
import { generateUniqueCode } from '../../utils/generators.js';

const DiscountCoupon = mongoose.model('DiscountCoupon');
const CouponUsage = mongoose.model('CouponUsage');

class AdminDiscountService {
  /**
   * Create a new discount coupon
   */
  static async createDiscount(adminId, payload) {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      // 1️⃣ Generate or normalize coupon code
      const code = payload.code || (await generateUniqueCode('DISC', 8));

      // 2️⃣ Manual validation for category-targeting logic
      if (
        payload.scope === 'Category-wide Discount' &&
        payload.applicableToModel === 'AcademicMaterial'
      ) {
        if (!Array.isArray(payload.applicableTo) || payload.applicableTo.length === 0) {
          throw new AppError(
            'For category-wide discounts, "applicableTo" must include one or more Category IDs.',
            400
          );
        }
      }

      const coupon = new DiscountCoupon({
        ...payload,
        code: code.toUpperCase(),
        createdBy: adminId,
      });

      // 3️⃣ Full schema-level validation
      await coupon.validate();

      // 4️⃣ Save under session
      await coupon.save({ session });
      await session.commitTransaction();

      logger.info(`Discount coupon created: ${coupon.code}`, { adminId });
      return coupon;
    } catch (err) {
      await session.abortTransaction();
      logger.error(`Failed to create discount: ${err.message}`, { adminId });
      throw new AppError(err.message, 400);
    } finally {
      session.endSession();
    }
  }

  /**
   * Bulk-create coupons (great for campaigns or vouchers)
   */
  static async bulkCreateDiscounts(adminId, { count, prefix = 'DISC', ...baseData }) {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      const coupons = [];

      for (let i = 0; i < count; i++) {
        const code = await generateUniqueCode(prefix, 8);
        coupons.push(
          new DiscountCoupon({
            ...baseData,
            code: code.toUpperCase(),
            createdBy: adminId,
          })
        );
      }

      await DiscountCoupon.insertMany(coupons, { session });

      await session.commitTransaction();
      logger.info(`Bulk-created ${count} discount coupons`, { adminId });
      return coupons;
    } catch (err) {
      await session.abortTransaction();
      logger.error(`Failed bulk create: ${err.message}`, { adminId });
      throw new AppError(err.message, 400);
    } finally {
      session.endSession();
    }
  }

  /**
   * Update an existing coupon
   */
  static async updateDiscount(discountId, updateData, adminId) {
    const coupon = await DiscountCoupon.findById(discountId);
    if (!coupon) throw new AppError('Discount not found', 404);

    if (['Expired', 'Disabled'].includes(coupon.status)) {
      throw new AppError('Cannot update expired or disabled discounts', 400);
    }

    Object.assign(coupon, updateData);
    await coupon.validate();
    await coupon.save();

    logger.info(`Discount coupon updated: ${coupon.code}`, { adminId });
    return coupon;
  }

  /**
   * Disable or soft-delete coupon
   */
  static async deleteDiscount(discountId, adminId) {
    const coupon = await DiscountCoupon.findById(discountId);
    if (!coupon) throw new AppError('Discount not found', 404);

    coupon.status = 'Disabled';
    await coupon.save();

    logger.info(`Discount coupon disabled: ${coupon.code}`, { adminId });
    return coupon;
  }

  /**
   * Get all discounts with filters
   */
  static async getDiscounts({ status, scope, campaignName, targetAudience, page = 1, limit = 20 }) {
    const query = {};

    if (status) query.status = status;
    if (scope) query.scope = scope;
    if (campaignName) query.campaignName = { $regex: campaignName, $options: 'i' };
    if (targetAudience) query.targetAudience = targetAudience;

    const discounts = await DiscountCoupon.find(query)
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ createdAt: -1 })
      .populate('createdBy', 'name email')
      .lean();

    const total = await DiscountCoupon.countDocuments(query);

    return { discounts, total, page, limit };
  }

  /**
   * Retrieve a single discount coupon by ID or code
   * @param {string} identifier - Coupon ID or code
   * @param {string} [by='id'] - Lookup field ('id' or 'code')
   * @returns {Object} Discount coupon document
   * @throws {AppError} If coupon is not found
   */
  static async getDiscountDetail(identifier, by = 'id') {
    try {
      const query = by === 'code' ? { code: identifier.toUpperCase() } : { _id: identifier };
      const discount = await DiscountCoupon.findOne(query).lean();
      if (!discount) {
        throw new AppError(`Discount coupon not found with ${by}: ${identifier}`, 404);
      }
      logger.info(`Retrieved discount coupon: ${discount.code}`, {
        identifier,
        by,
      });
      return discount;
    } catch (err) {
      logger.error(`Failed to retrieve discount: ${err.message}`, {
        identifier,
        by,
      });
      throw err instanceof AppError ? err : new AppError(err.message, 400);
    }
  }

  /**
   * Return usage analytics for a given coupon
   */
  static async getDiscountAnalytics(discountId) {
    const coupon = await DiscountCoupon.findById(discountId).lean();
    if (!coupon) throw new AppError('Discount not found', 404);

    const usageStats = await CouponUsage.aggregate([
      { $match: { coupon: coupon._id } },
      {
        $group: {
          _id: null,
          totalRedemptions: { $sum: 1 },
          totalDiscountGiven: { $sum: '$discountAmount' },
          uniqueUsers: { $addToSet: '$user' },
          uniqueGuests: { $addToSet: '$guestEmail' },
        },
      },
    ]);

    const analytics = usageStats[0] || {
      totalRedemptions: 0,
      totalDiscountGiven: 0,
      uniqueUsers: [],
      uniqueGuests: [],
    };

    return {
      discount: coupon,
      totalRedemptions: analytics.totalRedemptions,
      totalDiscountGiven: parseFloat(analytics.totalDiscountGiven.toFixed(2)),
      uniqueUserCount: (analytics.uniqueUsers?.length || 0) + (analytics.uniqueGuests?.length || 0),
    };
  }
}

export default AdminDiscountService;

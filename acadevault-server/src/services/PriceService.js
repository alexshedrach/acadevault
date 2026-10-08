import mongoose from 'mongoose';
import { resolvePrice, validateVendorPrice } from '../utils/priceUtils.js';
import AppError from '../utils/HandleAppErrors.js';

const Price = mongoose.model('Price');

class PriceService {
  static async getEffectivePrice(
    materialId,
    materialType = null,
    context = {},
  ) {
    const { currency, region = null, date = new Date() } = context;

    if (!materialId && !materialType) {
      throw new Error(
        'At least one of materialId or materialType is required.',
      );
    }

    if (!currency) {
      throw new Error('Currency is required to resolve effective price.');
    }

    return await resolvePrice({
      materialId,
      materialType,
      currency,
      region,
      date,
    });
  }

  static async getAllActivePrices({
    materialId,
    materialType,
    currency,
    region,
    includeInactive = false,
  }) {
    const query = {};

    if (materialId) {
      query.material = materialId;
    }

    if (materialType) {
      query.materialType = materialType;
    }

    if (currency) {
      query.currency = currency;
    }

    if (region) {
      query.region = { $in: [region, null] };
    }

    if (!includeInactive) {
      const now = new Date();
      query.isActive = true;
      query.$and = [
        { $or: [{ effectiveFrom: null }, { effectiveFrom: { $lte: now } }] },
        { $or: [{ effectiveTo: null }, { effectiveTo: { $gte: now } }] },
      ];
    }

    return await Price.find(query).sort({ priority: -1, updatedAt: -1 }).lean();
  }

  static async isPromoActive({
    materialId,
    currency = 'NGN',
    region = null,
    date = new Date(),
  }) {
    if (!materialId) throw new Error('materialId is required.');

    return await Price.exists({
      material: materialId,
      currency,
      region: { $in: [region, null] },
      type: 'promotional',
      isActive: true,
      $and: [
        {
          $or: [{ effectiveFrom: null }, { effectiveFrom: { $lte: date } }],
        },
        {
          $or: [{ effectiveTo: null }, { effectiveTo: { $gte: date } }],
        },
      ],
    });
  }

  static async createPriceEntry(
    data,
    materialTypeDefaults = [],
    userRole = 'Seller',
  ) {
    if (data.type === 'base' && userRole !== 'Admin') {
      // throw new Error('Only admins can create base prices.');
      throw new AppError('Only admins can create base prices.', 400);
    }

    if (data.type === 'vendor' && userRole !== 'Seller') {
      validateVendorPrice({
        vendorPrice: data.amount,
        materialTypeDefaults,
        currency: data.currency,
      });
    }

    // 🧠 Add conflict detection logic here
    const conflicting = await Price.findOne({
      material: data.material || null,
      materialType: data.materialType || null,
      currency: data.currency,
      region: data.region || null,
      type: data.type,
      isActive: true,
      $or: [
        {
          effectiveFrom: { $lte: data.effectiveTo || new Date('9999-12-31') },
          effectiveTo: { $gte: data.effectiveFrom || new Date('0000-01-01') },
        },
        {
          effectiveFrom: null,
          effectiveTo: null,
        },
      ],
    });

    if (conflicting) {
      throw new AppError(
        `Conflicting active ${data.type} price already exists for this context.`,
        409,
      );
    }

    const price = new Price(data);
    await price.validate();
    return await price.save();
  }

  static async deactivatePrices(materialId, currency) {
    return await Price.updateMany(
      { material: materialId, currency, isActive: true },
      { $set: { isActive: false } },
    );
  }
}

export default PriceService;

import { MATERIAL_TYPE_KEY_MAP } from '../../constants/enums.js';
import getMaterialTypeDefaults from '../../helper/getMaterialTypeDefaults.js';
import PriceService from '../../services/PriceService.js';
import { catchAsyncErrors } from '../../utils/catchAsyncErrors.js';
import AppError from '../../utils/HandleAppErrors.js';
import { formatResolvedPrice, getOriginalPrice } from '../../utils/priceUtils.js';
import AcademicMaterial from '../models/AcademicMaterialModel.js';
import Price from '../models/PriceModel.js';

export const createPrice = catchAsyncErrors(async (req, res, next) => {
  const { role, _id: userId } = req.user;
  const data = { ...req.body }; // Avoid mutating req.body directly

  let normalizedTypeKey = null;
  let materialTypeDefaults = [];

  // Derive materialType if only material ID is given
  if (!data.materialType && data.material) {
    const material = await AcademicMaterial.findById(data.material).lean();
    if (!material) {
      return next(new AppError('Material not found.', 404));
    }

    if (!material.materialType) {
      return next(
        new AppError('Material is missing a defined materialType.', 400),
      );
    }

    data.materialType = material.materialType;
  }

  // Normalize and validate materialType if present
  if (data.materialType) {
    const humanType = data.materialType.trim();
    normalizedTypeKey = MATERIAL_TYPE_KEY_MAP[humanType];

    if (!normalizedTypeKey) {
      return next(
        new AppError(`Invalid material type "${humanType}" provided.`, 400),
      );
    }

    materialTypeDefaults = getMaterialTypeDefaults(normalizedTypeKey);
    data.materialType = humanType;
  }

  // Store creator info
  data.createdBy = userId;

  // Sanitize payload for schema constraint:
  // Only one of material or materialType must exist
  if (data.material && data.materialType) {
    // MaterialType was only needed for validation context
    delete data.materialType;
  }

  const price = await PriceService.createPriceEntry(
    data,
    materialTypeDefaults,
    role,
  );

  res.status(201).json({
    success: true,
    message: 'Price created successfully',
    data: price,
  });
});



export const deactivatePrices = catchAsyncErrors(async (req, res, next) => {
  const { materialId, currency } = req.body;

  if (!materialId && currency)
    return next('Vaid Material ID and Currency are Required', 400);

  const updated = await PriceService.deactivatePrices(materialId, currency);

  res.status(200).json({
    success: true,
    message: 'Prices deactivated',
    data: updated,
  });
});

// Deactivate Specific Price (by ID)
// More precise control for deactivating single price entries.
export const deactivatePriceById = catchAsyncErrors(async (req, res, next) => {
  const { priceId } = req.params;

  if (!priceId) return next(new AppError('Price ID is required', 400));

  const price = await Price.findById(priceId);
  if (!price) return next(new AppError('Price not found', 404));

  price.isActive = false;
  await price.save();

  res.status(200).json({
    success: true,
    message: 'Price deactivated successfully',
    data: price,
  });
});

// 1. Get Effective Price for Display or Checkout
// // This fetches the correct price based on priority, currency, and optionally region.
export const getEffectivePrice = catchAsyncErrors(async (req, res, next) => {
  const { materialId, materialType, currency, region } = req.query;

  if ((!materialId && !materialType) || !currency) {
    return next(new AppError('Material ID or Type + currency required', 400));
  }

  // Step 1: Get the raw resolved price (e.g., promo, vendor, etc.)
  const rawPrice = await PriceService.getEffectivePrice(
    materialId,
    materialType,
    { currency, region },
  );

  if (!rawPrice) {
    return res.status(200).json({
      success: true,
      message: 'No price found for this material/context.',
      data: null,
    });
  }

  // Step 2: Try to find original/base price for discount comparison
  const allCandidates = await PriceService.getAllActivePrices({
    materialId,
    materialType,
    currency,
    region,
    includeInactive: false,
  });

  const original = getOriginalPrice(allCandidates, rawPrice, true);

  // Step 3: Enrich the resolved price object with original info
  if (original && rawPrice.amount < original.amount) {
    rawPrice.discountApplied = true;
    rawPrice.originalPrice = {
      amount: original.amount,
      currency: original.currency,
    };
  }

  // Step 4: Format using your utility (DRY)
  const formatted = formatResolvedPrice(rawPrice);

  // Step 5: Add marketing fields if discount exists
  if (formatted.discountApplied) {
    formatted.discountPercent = Math.round(
      ((formatted.originalAmount - formatted.amount) /
        formatted.originalAmount) *
        100,
    );
  } else {
    formatted.discountPercent = null;
  }

  res.status(200).json({
    success: true,
    message: 'Effective price retrieved',
    data: formatted,
  });
});

export const getPriceRange = catchAsyncErrors(async (req, res, next) => {
  const { materialType, currency, region } = req.query;

  if (!materialType || !currency) {
    return next(new AppError('Material type and currency are required.', 400));
  }

  const allPrices = await PriceService.getAllActivePrices({
    materialType,
    currency,
    region,
    includeInactive: false,
  });

  if (!allPrices.length) {
    return res.status(200).json({
      success: true,
      message: 'No prices found for given filters.',
      data: {
        minPrice: 0,
        maxPrice: 10000,
      },
    });
  }

  const amounts = allPrices.map((price) => price.amount);
  const minPrice = Math.min(...amounts);
  const maxPrice = Math.max(...amounts);

  res.status(200).json({
    success: true,
    message: 'Price range retrieved successfully.',
    data: {
      minPrice,
      maxPrice,
    },
  });
});

// export const getEffectivePrice = catchAsyncErrors(async (req, res, next) => {
//   const { materialId, materialType, currency, region } = req.query;

//   if ((!materialId && !materialType) || !currency) {
//     return next(
//       new AppError(
//         'Either materialId or materialType is required, and currency is required.',
//         400,
//       ),
//     );
//   }

//   const price = await PriceService.getEffectivePrice(materialId, materialType, {
//     currency,
//     region,
//   });

//   res.status(200).json({
//     success: true,
//     message: 'Effective price retrieved',
//     data: price,
//   });
// });


// List All Prices for a Material
// Useful for admin/vendor dashboards to view price history or conflicts.
export const listPrices = catchAsyncErrors(async (req, res, next) => {
  const { materialId } = req.params;
  const { currency, region, includeInactive = false, materialType } = req.query;

  if (!materialId && !materialType) {
    return next(
      new AppError('Either materialId or materialType is required', 400),
    );
  }

  const prices = await PriceService.getAllActivePrices({
    materialId,
    materialType,
    currency,
    region,
    includeInactive: includeInactive === 'true',
  });

  res.status(200).json({
    success: true,
    message: 'Prices fetched successfully',
    data: prices,
  });
});

// Create Promotional Price (Admin/Vendor Only)
// Promotional prices have the highest priority and can override others temporarily.
export const createPromoPrice = catchAsyncErrors(async (req, res, next) => {
  const { role, _id: userId } = req.user;
  const data = req.body;

  data.type = 'promotional';
  data.createdBy = userId;

  // Ensure a valid materialType is provided
  if (!data.materialType || !MATERIAL_TYPE_KEY_MAP[data.materialType]) {
    return next(new AppError('Invalid or missing material type.', 400));
  }

  // Defensive check for amount and currency
  if (typeof data.amount !== 'number' || !data.currency) {
    return next(new AppError('Amount and currency are required.', 400));
  }

  // Optional: Ensure material OR materialType exists for context
  if (!data.material && !data.materialType) {
    return next(
      new AppError(
        'Either material ID or material type must be provided.',
        400,
      ),
    );
  }

  // Fetch min/max limits for the type & currency
  const materialTypeDefaults = getMaterialTypeDefaults(data.materialType);
  const currencyDefaults = materialTypeDefaults.find(
    (def) => def.currency === data.currency,
  );

  if (!currencyDefaults) {
    return next(
      new AppError(
        `Currency "${data.currency}" not supported for this type.`,
        400,
      ),
    );
  }

  // Enforce min/max boundaries
  if (
    currencyDefaults.minLimit !== null &&
    data.amount < currencyDefaults.minLimit
  ) {
    return next(
      new AppError(
        `Amount is below minimum (${currencyDefaults.minLimit} ${data.currency})`,
        400,
      ),
    );
  }

  if (
    currencyDefaults.maxLimit !== null &&
    data.amount > currencyDefaults.maxLimit
  ) {
    return next(
      new AppError(
        `Amount exceeds maximum (${currencyDefaults.maxLimit} ${data.currency})`,
        400,
      ),
    );
  }

  const price = await PriceService.createPriceEntry(
    data,
    materialTypeDefaults,
    role,
  );

  res.status(201).json({
    success: true,
    message: 'Promotional price created successfully.',
    data: price,
  });
});


// Check if Promo Is Active (for frontend or marketing features)
export const checkPromoActive = catchAsyncErrors(async (req, res, next) => {
  const { materialId, currency } = req.query;

  // Validate required query parameters
  if (!materialId || !currency) {
    return next(new AppError('Material ID and Currency are required', 400));
  }

  try {
    // Check if promo is active for the given materialId and currency
    const isActive = await PriceService.isPromoActive(materialId, currency);

    res.status(200).json({
      success: true,
      message: `Promo is ${isActive ? 'active' : 'not active'}`,
      data: { isActive },
    });
  } catch (err) {
    console.log(err)
    return next(new AppError('Error checking promotional status', 500));
  }
});



export const getPromoStatus = catchAsyncErrors(async (req, res, next) => {
  const { materialId } = req.params;
  const { currency = 'NGN', region = null } = req.query;

  if (!materialId) return next(new AppError('Material ID is required.', 400));

  const isActive = await PriceService.isPromoActive({
    materialId,
    currency,
    region,
  });

  res.status(200).json({
    success: true,
    message: 'Promotional status fetched',
    data: { isPromoActive: isActive },
  });
});

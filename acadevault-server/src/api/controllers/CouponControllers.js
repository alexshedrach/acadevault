import AdminDiscountService from "../../services/discount/DiscountAdminService.js";
import { catchAsyncErrors } from "../../utils/catchAsyncErrors.js";
import AppError from "../../utils/HandleAppErrors.js";
import {
  createDiscountSchema,
  updateDiscountSchema,
  validateDiscountSchema,
} from "../validations/discountValidator.js";

/**
 * POST /api/admin/discounts
 * Creates a new discount coupon.
 * @param {Object} req - Express request object with body containing discount details
 * @param {Object} res - Express response object
 * @returns {Object} JSON response with the created discount
 */
export const createDiscount = catchAsyncErrors(async (req, res) => {
  const { error, value } = createDiscountSchema.validate(req.body);
  if (error) throw new AppError(error.message, 400);
  const discount = await AdminDiscountService.createDiscount(
    req.user.id,
    value
  );
  res.status(201).json({ status: "success", data: discount });
});

/**
 * POST /api/admin/discounts/bulk
 * Creates multiple discount coupons in bulk.
 * @param {Object} req - Express request object with body containing count, prefix, and discount details
 * @param {Object} res - Express response object
 * @returns {Object} JSON response with the created discounts
 */
export const bulkCreateDiscounts = catchAsyncErrors(async (req, res) => {
  const { error, value } = createDiscountSchema
    .fork(["code"], (schema) => schema.optional())
    .append({
      count: Joi.number().min(1).max(1000).required(),
      prefix: Joi.string().optional(),
    })
    .validate(req.body);
  if (error) throw new AppError(error.message, 400);
  const discounts = await AdminDiscountService.bulkCreateDiscounts(
    req.user.id,
    value
  );
  res.status(201).json({ status: "success", data: discounts });
});

/**
 * GET /api/admin/discounts/:id
 * Retrieves details of a single discount coupon by ID or code.
 * @param {Object} req - Express request object with params (id) and optional query (by=code)
 * @param {Object} res - Express response object
 * @returns {Object} JSON response with the discount coupon details
 */
export const getDiscountDetails = catchAsyncErrors(async (req, res) => {
  const { error, value } = getDiscountSchema.validate({
    id: req.params.id,
    by: req.query.by,
  });
  if (error) throw new AppError(error.message, 400);

  const discount = await AdminDiscountService.getDiscount(value.id, value.by);
  res.status(200).json({ status: "success", data: discount });
});

/**
 * GET /api/admin/discounts
 * Retrieves a paginated list of discounts with optional filters.
 * @param {Object} req - Express request object with query parameters
 * @param {Object} res - Express response object
 * @returns {Object} JSON response with the list of discounts
 */
export const getDiscounts = catchAsyncErrors(async (req, res) => {
  const { status, scope, campaignName, page, limit } = req.query;
  const result = await AdminDiscountService.getDiscounts({
    status,
    scope,
    campaignName,
    page: parseInt(page) || 1,
    limit: parseInt(limit) || 20,
  });
  res.status(200).json({ status: "success", data: result });
});

// /**
//  * PATCH /api/admin/discounts/:id
//  * Updates an existing discount coupon.
//  * @param {Object} req - Express request object with body containing updated discount details
//  * @param {Object} res - Express response object
//  * @returns {Object} JSON response with the updated discount
//  */
// export const updateDiscount = catchAsyncErrors(async (req, res) => {
//   const { error, value } = updateDiscountSchema.validate(req.body);
//   if (error) throw new AppError(error.message, 400);
//   const discount = await AdminDiscountService.updateDiscount(
//     req.params.id,
//     value,
//     req.user.id
//   );
//   res.status(200).json({ status: "success", data: discount });
// });

// /**
//  * DELETE /api/admin/discounts/:id
//  * Disables an existing discount coupon.
//  * @param {Object} req - Express request object
//  * @param {Object} res - Express response object
//  * @returns {Object} JSON response with the disabled discount
//  */
// export const deleteDiscount = catchAsyncErrors(async (req, res) => {
//   const discount = await AdminDiscountService.deleteDiscount(
//     req.params.id,
//     req.user.id
//   );
//   res.status(200).json({ status: "success", data: discount });
// });

// /**
//  * GET /api/admin/discounts/:id/analytics
//  * Retrieves analytics for a specific discount.
//  * @param {Object} req - Express request object
//  * @param {Object} res - Express response object
//  * @returns {Object} JSON response with discount analytics
//  */
// export const getDiscountAnalytics = catchAsyncErrors(async (req, res) => {
//   const analytics = await AdminDiscountService.getDiscountAnalytics(
//     req.params.id
//   );
//   res.status(200).json({ status: "success", data: analytics });
// });

// /**
//  * POST /api/discounts/validate
//  * Validates a discount code without applying it.
//  * @param {Object} req - Express request object with body { discountCode }
//  * @param {Object} res - Express response object
//  * @returns {Object} JSON response with validation result
//  */
// export const validateDiscountCode = catchAsyncErrors(async (req, res) => {
//   const { error, value } = validateDiscountSchema.validate(req.body);
//   if (error) throw new AppError(error.message, 400);
//   const result = await DiscountService.validateDiscountCode(
//     value.discountCode,
//     req.user?.id,
//     req.cookies.guestEmail,
//     req.body.guestCartId
//   );
//   res.status(200).json({ status: "success", data: result });
// });

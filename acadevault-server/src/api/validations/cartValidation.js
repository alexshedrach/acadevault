import Joi from "joi";

// // Validation schema for GET /api/cart?shopId=...
// export const getCartSchema = Joi.object({
//   shopId: Joi.string().hex().length(24).required().messages({
//     "string.hex": "shopId must be a valid ObjectId.",
//     "string.length": "shopId must be 24 characters long.",
//     "any.required": "shopId is required.",
//   }),
// });
export const getOptionalShopIdSchema = Joi.object({
  shopId: Joi.string().hex().length(24).optional().messages({
    "string.hex": "shopId must be a valid ObjectId.",
    "string.length": "shopId must be 24 characters long.",
  }),
});

// Validation schema for POST /api/cart/items
export const addItemSchema = Joi.object({
  shopId: Joi.string().hex().length(24).required().messages({
    "string.hex": "shopId must be a valid ObjectId.",
    "string.length": "shopId must be 24 characters long.",
    "any.required": "shopId is required.",
  }),
  materialId: Joi.string().hex().length(24).required().messages({
    "string.hex": "materialId must be a valid ObjectId.",
    "string.length": "materialId must be 24 characters long.",
    "any.required": "materialId is required.",
  }),
  quantity: Joi.number().integer().positive().max(100).required().messages({
    "number.base": "quantity must be a number.",
    "number.integer": "quantity must be an integer.",
    "number.positive": "quantity must be positive.",
    "number.max": "quantity cannot exceed 100.",
    "any.required": "quantity is required.",
  }),
});

// Validation schema for PATCH /api/cart/items/:materialId
export const updateItemQuantitySchema = Joi.object({
  quantity: Joi.number().integer().min(0).max(100).required().messages({
    "number.base": "quantity must be a number.",
    "number.integer": "quantity must be an integer.",
    "number.min": "quantity cannot be negative.",
    "number.max": "quantity cannot exceed 100.",
    "any.required": "quantity is required.",
  }),
  cartId: Joi.string().hex().length(24).required().messages({
    "string.hex": "cartId must be a valid ObjectId.",
    "string.length": "cartId must be 24 characters long.",
    "any.required": "cartId is required.",
  }),
});

// Validation schema for POST /api/cart/discount
export const applyDiscountSchema = Joi.object({
  cartId: Joi.string().hex().length(24).required().messages({
    "string.hex": "cartId must be a valid ObjectId.",
    "string.length": "cartId must be 24 characters long.",
    "any.required": "cartId is required.",
  }),
  discountCode: Joi.string()
    .trim()
    .alphanum()
    .min(3)
    .max(20)
    .required()
    .messages({
      "string.alphanum": "discountCode must be alphanumeric.",
      "string.min": "discountCode must be at least 3 characters.",
      "string.max": "discountCode cannot exceed 20 characters.",
      "any.required": "discountCode is required.",
    }),
});

// Validation schema for POST /api/cart/merge
export const mergeGuestCartSchema = Joi.object({
  guestEmail: Joi.string().email().required().messages({
    "string.email": "guestEmail must be a valid email address.",
    "any.required": "guestEmail is required.",
  }),
});

// Validation schema for POST /api/cart/checkout
export const checkoutSchema = Joi.object({
  cartId: Joi.string().hex().length(24).required().messages({
    "string.hex": "cartId must be a valid ObjectId.",
    "string.length": "cartId must be 24 characters long.",
    "any.required": "cartId is required.",
  }),
});

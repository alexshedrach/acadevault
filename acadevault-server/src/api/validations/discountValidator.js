import Joi from "joi";
import {
  DISCOUNT_SCOPES,
  DISCOUNT_TYPES,
  TARGET_AUDIENCES,
} from "../../constants/enums.js";

export const createDiscountSchema = Joi.object({
  code: Joi.string().uppercase().trim().optional(),
  discountType: Joi.string()
    .valid(...Object.values(DISCOUNT_TYPES))
    .required(),
  discountValue: Joi.number().positive().required(),
  maxDiscountAmount: Joi.number().positive().optional(),
  minOrderAmount: Joi.number().min(0).optional(),
  scope: Joi.string()
    .valid(...Object.values(DISCOUNT_SCOPES))
    .required(),
  applicableTo: Joi.array().items(Joi.string().hex().length(24)).optional(),
  applicableToModel: Joi.string()
    .valid("AcademicMaterial", "Shop", "Category")
    .optional(),
  isStackable: Joi.boolean().optional(),
  maxRedemptions: Joi.number().positive().optional(),
  perUserLimit: Joi.number().positive().default(1),
  validFrom: Joi.date().required(),
  validUntil: Joi.date().greater(Joi.ref("validFrom")).required(),
  campaignName: Joi.string().trim().optional(),
  targetAudience: Joi.string()
    .valid(...Object.values(TARGET_AUDIENCES))
    .default("All"),
});

export const updateDiscountSchema = createDiscountSchema.fork(
  Object.keys(createDiscountSchema.describe().keys),
  (schema) => schema.optional()
);

export const validateDiscountSchema = Joi.object({
  discountCode: Joi.string().uppercase().trim().required(),
  guestCartId: Joi.string().hex().length(24).optional(),
});

export const applyDiscountSchema = Joi.object({
  discountCode: Joi.string()
    .trim()
    .uppercase()
    .min(3)
    .max(20)
    .required()
    .messages({
      "string.empty": "discountCode cannot be empty",
      "any.required": "discountCode is required",
    }),
});

import mongoose from 'mongoose';
import { CURRENCIES, MATERIAL_TYPE_KEY_MAP } from '../../constants/enums.js';

const { Schema } = mongoose;

const PRICE_TYPE_PRIORITY = {
  promotional: 4,
  vendor: 3,
  regional: 2,
  base: 1,
};

const PriceSchema = new Schema({
  material: {
    type: Schema.Types.ObjectId,
    ref: 'AcademicMaterial',
    default: null,
    index: true,
  },
  materialType: {
    type: String,
    enum: Object.keys(MATERIAL_TYPE_KEY_MAP),
    default: null,
    index: true,
  },
  vendor: {
    type: Schema.Types.ObjectId,
    ref: 'Shop',
    default: null,
    index: true,
  },
  currency: {
    type: String,
    required: true,
    enum: CURRENCIES,
    index: true,
  },
  amount: {
    type: Number,
    required: true,
    min: [0, 'Price cannot be negative'],
  },
  region: {
    type: String,
    default: null,
    minlength: 2,
    maxlength: 2,
    uppercase: true,
    index: true,
  },
  type: {
    type: String,
    enum: ['base', 'vendor', 'regional', 'promotional'],
    default: 'base',
  },
  effectiveFrom: {
    type: Date,
    default: null,
  },
  effectiveTo: {
    type: Date,
    default: null,
  },
  isActive: {
    type: Boolean,
    default: true,
    index: true,
  },
  priority: {
    type: Number,
    default: 0, // used in secondary sort
    index: true,
  },
  minLimit: Number,
  maxLimit: Number,
  notes: {
    type: String,
    default: '',
    trim: true,
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  updatedBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    default: null,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

PriceSchema.pre('validate', function (next) {
  if (!this.material && !this.materialType) {
    return next(
      new Error('Either "material" or "materialType" must be specified.'),
    );
  }

  // Allow both for promo if you really need it
  if (
    this.material &&
    this.materialType &&
    !['promotional'].includes(this.type)
  ) {
    return next(
      new Error(
        'Only one of "material" or "materialType" should be specified.',
      ),
    );
  }

  if (this.type === 'vendor') {
    if (
      (this.minLimit != null && this.amount < this.minLimit) ||
      (this.maxLimit != null && this.amount > this.maxLimit)
    ) {
      return next(
        new Error(
          `Vendor price must be between ${this.minLimit} and ${this.maxLimit}`,
        ),
      );
    }
  }

  next();
});

PriceSchema.path('effectiveTo').validate(function (value) {
  return !(this.effectiveFrom && value && value <= this.effectiveFrom);
}, 'effectiveTo must be greater than effectiveFrom.');

PriceSchema.pre('save', function (next) {
  this.updatedAt = new Date();
  next();
});

PriceSchema.methods.isCurrentlyEffective = function () {
  const now = new Date();
  return (
    this.isActive &&
    (!this.effectiveFrom || this.effectiveFrom <= now) &&
    (!this.effectiveTo || this.effectiveTo >= now)
  );
};

PriceSchema.virtual('typePriority').get(function () {
  return PRICE_TYPE_PRIORITY[this.type] || 0;
});

// Optimized compound index
PriceSchema.index(
  { material: 1, currency: 1, region: 1, type: 1, materialType: 1 },
  { unique: true, partialFilterExpression: { isActive: true } },
);


const Price = mongoose.models.Price || mongoose.model('Price', PriceSchema);
export default Price;

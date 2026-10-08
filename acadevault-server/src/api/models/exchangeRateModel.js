import mongoose from 'mongoose';
import { CURRENCIES } from '../../constants/enums.js';

const exchangeRateSchema = new mongoose.Schema(
  {
    base: {
      type: String,
      required: true,
      uppercase: true,
      enum: Object.values(CURRENCIES), 
    },
    rates: {
      type: Map,
      of: Number,
      required: true,
    },
    provider: {
      type: String,
      default: 'ExchangeRate-API',
    },
    lastUpdated: {
      type: Date,
      default: Date.now,
    },
    expiresIn: {
      type: Number, // e.g. in seconds or hours
      default: 86400, // 24 hours
    },
  },
  {
    timestamps: true,
  },
);

// Ensure one record per base currency
exchangeRateSchema.index({ base: 1 }, { unique: true });

const ExchangeRate = mongoose.model('ExchangeRate', exchangeRateSchema);

export default ExchangeRate;

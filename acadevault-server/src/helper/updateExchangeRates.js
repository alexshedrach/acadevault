import axios from 'axios';
import dotenv from 'dotenv';
import ExchangeRate from '../models/exchangeRateModel.js';
import { CURRENCIES as SUPPORTED_CURRENCIES } from '../constants/enums.js';

dotenv.config();

const API_KEY = process.env.EXCHANGE_RATE_API_KEY;
const BASE_CURRENCY = 'USD';

const updateExchangeRates = async () => {
  try {
    if (!API_KEY) {
      throw new Error('Missing EXCHANGE_RATE_API_KEY in environment variables');
    }

    console.log(`🔄 Fetching exchange rates for base: ${BASE_CURRENCY}...`);

    const { data } = await axios.get(
      `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/${BASE_CURRENCY}`,
    );

    if (data.result !== 'success') {
      throw new Error(
        `Exchange rate API error: ${data['error-type'] || 'Unknown error'}`,
      );
    }

    const newRates = {};
    SUPPORTED_CURRENCIES.forEach((currency) => {
      if (data.conversion_rates[currency]) {
        newRates[currency] = data.conversion_rates[currency];
      } else {
        console.warn(`⚠️ Missing rate for currency: ${currency}`);
      }
    });

    const updated = await ExchangeRate.findOneAndUpdate(
      { base: BASE_CURRENCY },
      {
        base: BASE_CURRENCY,
        rates: newRates,
        provider: 'ExchangeRate-API',
        lastUpdated: new Date(),
        expiresIn: 86400, // 24 hours
      },
      { upsert: true, new: true, runValidators: true },
    );

    console.log(
      `✅ Exchange rates updated successfully at ${new Date().toLocaleString()}`,
    );
    return updated;
  } catch (error) {
    console.error('❌ Failed to update exchange rates:', error.message);
    throw error;
  }
};

// Only run if invoked directly
if (require.main === module) {
  import('../config/db.js') // or wherever your DB connect file is
    .then(() => updateExchangeRates())
    .then(() => process.exit(0))
    .catch(() => process.exit(1));
}

export default updateExchangeRates;

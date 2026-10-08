import Big from 'big.js';
import mongoose from 'mongoose';

export function toDecimal128(value) {
  try {
    if (typeof value === 'object' && !(value instanceof Big)) {
      throw new Error(`Expected numeric or Big, received object: ${JSON.stringify(value)}`);
    }

    const big = value instanceof Big ? value : Big(value);
    return mongoose.Types.Decimal128.fromString(big.toFixed(2));
  } catch (err) {
    throw new Error(`[toDecimal128] Invalid Big.js conversion: ${value} — ${err.message}`);
  }
}



export { Big };

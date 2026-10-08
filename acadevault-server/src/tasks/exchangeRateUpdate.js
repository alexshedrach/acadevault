import cron from 'node-cron';
import updateExchangeRates from '../helper/updateExchangeRates.js';

cron.schedule('0 0 * * *', () => {
  updateExchangeRates();
});

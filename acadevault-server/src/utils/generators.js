import { v4 as uuidv4 } from 'uuid';
import { randomUUID, randomBytes, createHash } from 'crypto';
import mongoose from 'mongoose';
import { logger } from './logger.js';

/**
 * Generates an idempotency key for payment or checkout operations
 * @param {string} cartId - Cart ID
 * @param {string} [userId] - User ID (optional for guest)
 * @returns {string} Idempotency key
 */
export function generateIdempotencyKey(cartId, userId) {
  try {
    const base = `${cartId}-${userId || 'guest'}-${Date.now()}`;
    const key = createHash('sha256').update(base).digest('hex');
    logger.info('Idempotency key generated', { cartId, userId });
    return key;
  } catch (error) {
    logger.error('Failed to generate idempotency key', {
      cartId,
      userId,
      error: error.message,
    });
    throw new Error(`Idempotency key generation failed: ${error.message}`);
  }
}

/**
 * Generates a secure, time-limited download URL for digital content
 * @param {string} materialId - Material ID
 * @param {string} cartId - Cart ID
 * @returns {string} Download URL
 */
export function generateDownloadUrl(materialId, cartId) {
  try {
    const token = uuidv4();
    const expiry = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(); // 30 days expiry
    const baseUrl = process.env.BASE_URL || 'https://example.com';
    const downloadUrl = `${baseUrl}/download/${materialId}?cart=${cartId}&token=${token}&expires=${encodeURIComponent(expiry)}`;
    logger.info('Download URL generated', { materialId, cartId });
    return downloadUrl;
  } catch (error) {
    logger.error('Failed to generate download URL', {
      materialId,
      cartId,
      error: error.message,
    });
    throw new Error(`Download URL generation failed: ${error.message}`);
  }
}

/**
 * Securely generates a UUID v4 for guest cart or other identifiers.
 *
 * @param {Object} [options]
 * @param {string} [options.prefix]   – Optional string to prefix the UUID (e.g. 'GUEST-').
 * @returns {string} The generated UUID, e.g. '3fa85f64-5717-4562-b3fc-2c963f66afa6'
 */
export function generateUUID({ prefix = '' } = {}) {
  return `${prefix}${randomUUID()}`;
}

export function generateGuestEmail() {
  return `guest-${uuidv4()}@anonymous.com`;
}

/**
 * Generates a unique transaction ID suitable for logs, payment gateways, and tracking.
 * Combines a timestamp and a cryptographically secure random hex suffix.
 *
 * Example Output:
 *   TXN-1720718294521-A1B2C3D4
 *
 * @param {Object} [options]
 * @param {string} [options.prefix='TXN-']      - Optional prefix (e.g. 'TXN-', 'ORD-')
 * @param {number} [options.randomBytes=4]      - Number of random bytes for suffix (default: 4 => 8 hex characters)
 * @returns {string}
 */
export function generateTransactionId({ prefix = 'TXN-', randomBytes: n = 4 } = {}) {
  const timestamp = Date.now(); // Milliseconds since epoch
  const suffix = randomBytes(n).toString('hex').toUpperCase(); // Secure random part
  return `${prefix}${timestamp}-${suffix}`;
}

/**
 * Generates a license key for digital materials.
 * Format: [PREFIX][YYYYMMDD]-[secure-random]
 *
 * @param {Object} [options]
 * @param {string} [options.prefix]   – e.g. 'LIC-'
 * @param {number} [options.randomBytes=6] – Number of random bytes for suffix
 * @returns {string} e.g. 'LIC-20250708-4F3A2E1B9C'
 */
export function generateLicenseKey({ prefix = 'LIC-', randomBytes: n = 6 } = {}) {
  const datePart = new Date().toISOString().slice(0, 10).replace(/-/g, '');
  const suffix = randomBytes(n).toString('hex').toUpperCase();
  return `${prefix}${datePart}-${suffix}`;
}

/**
 * Generates a short alphanumeric token (URL-safe) — useful for referral codes, share tokens, etc.
 *
 * @param {Object} [options]
 * @param {number} [options.length=8] – Number of characters in the token
 * @returns {string} e.g. 'aZ4k9Xb2'
 */
export function generateShortToken({ length = 8 } = {}) {
  // randomBytes ceil(length * 3/4) to get enough base64 chars, then trim non-alphanum
  const bytes = randomBytes(Math.ceil((length * 3) / 4));
  return bytes
    .toString('base64')
    .replace(/[^A-Za-z0-9]/g, '')
    .slice(0, length);
}

export const generateUniqueCode = async (prefix = '', length = 8) => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const maxAttempts = 10;
  let attempts = 0;

  while (attempts < maxAttempts) {
    const randomString = Array.from({ length }, () =>
      characters.charAt(Math.floor(Math.random() * characters.length))
    ).join('');
    const code = `${prefix}${randomString}`.toUpperCase();
    const exists = await mongoose.model('DiscountCoupon').findOne({ code });
    if (!exists) return code;
    attempts++;
  }

  throw new Error('Failed to generate unique code after maximum attempts.');
};

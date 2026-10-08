import { v4 as uuidv4 } from "uuid";

/**
 * Generates a secure guest cart ID
 * @returns {String} - UUID v4
 */
export const generateGuestCartId = () => uuidv4();

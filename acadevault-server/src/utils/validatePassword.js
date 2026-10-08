import zxcvbn from "zxcvbn";
import {
  checkPasswordBlacklist,
  extractEmailParts,
  extractNameParts,
} from "../helper/passwordHelper.js";

// Password validation function
export async function validatePassword(
  password,
  { name = "", email = "", role = "User" } = {}
) {
  const errors = [];
  const MIN_LENGTH = role === "Admin" ? 12 : 8; // Stronger rules for admins
  const MAX_LENGTH = 64;

  // Convert password to lowercase for case-insensitive matching
  const lowerPassword = password.toLowerCase();

  // Extract sensitive parts from the user's name and email
  const sensitiveParts = [
    ...extractNameParts(name),
    ...extractEmailParts(email),
  ];

  // Check for exact matches of sensitive parts
  for (const part of sensitiveParts) {
    if (part && lowerPassword.includes(part)) {
      errors.push(
        `Password must not include parts of your name or email, such as "${part}".`
      );
      break; // Stop at the first match
    }
  }

  // Length validation
  if (password.length < MIN_LENGTH || password.length > MAX_LENGTH) {
    errors.push(
      `Password must be between ${MIN_LENGTH} and ${MAX_LENGTH} characters long.`
    );
  }

  // Complexity checks
  if (!/[A-Z]/.test(password))
    errors.push("Password must contain at least one uppercase letter.");
  if (!/[a-z]/.test(password))
    errors.push("Password must contain at least one lowercase letter.");
  if (!/[0-9]/.test(password))
    errors.push("Password must contain at least one digit.");
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password))
    errors.push("Password must contain at least one special character.");
  if (/\s/.test(password)) errors.push("Password must not contain spaces.");

  // Avoid user-specific patterns
  const userPatterns = [name.toLowerCase(), email.toLowerCase().split("@")[0]];
  for (const pattern of userPatterns) {
    if (pattern && password.toLowerCase().includes(pattern)) {
      errors.push("Password must not include your name or email.");
      break;
    }
  }

  // Blacklist check
  if (await checkPasswordBlacklist(password)) {
    errors.push(
      "This password has been compromised in a previous data breach. Please choose another one."
    );
  }

  // Strength assessment using zxcvbn
  const strengthResult = zxcvbn(password);
  if (strengthResult.score < 3) {
    errors.push(
      "Password is too weak. Avoid using common words, predictable patterns, or sequences."
    );
  }

  // Optional: Add dynamic hints for improving strength
  const suggestions = strengthResult.feedback.suggestions || [];

  return {
    valid: errors.length === 0,
    errors,
    suggestions,
  };
}

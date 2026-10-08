import axios from "axios";
import crypto from "crypto"; // Node.js built-in crypto module

// Helper function: Split the name into meaningful parts
export const extractNameParts = (name) => {
  return name
    .toLowerCase()
    .split(/[\s.-]+/) // Split on spaces, dots, or hyphens
    .filter((part) => part.length > 2); // Ignore very short parts (e.g., initials)
};

// Helper function: Split the email into meaningful parts
export const extractEmailParts = (email) => {
  const [username] = email.toLowerCase().split("@");
  return username.split(/[\s.-]+/).filter((part) => part.length > 2);
};

// List of breached password APIs (e.g., haveibeenpwned)
export const checkPasswordBlacklist = async (password) => {
  try {
    // Use Node.js built-in crypto module to hash the password with SHA-1
    const sha1Password = crypto
      .createHash("sha1")
      .update(password)
      .digest("hex")
      .toUpperCase();
    const hashPrefix = sha1Password.slice(0, 5);
    const hashSuffix = sha1Password.slice(5);

    const response = await axios.get(
      `https://api.pwnedpasswords.com/range/${hashPrefix}`
    );
    return response.data.includes(hashSuffix);
  } catch (error) {
    console.error("Error checking password against blacklist:", error);
    return false; // Default to safe when API fails
  }
};

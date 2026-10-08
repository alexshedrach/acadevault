import axios from "axios";
import NodeCache from "node-cache";
import AppError from "../utils/HandleAppErrors.js";

// Initialize cache for geocoding results
const geocodingCache = new NodeCache({ stdTTL: 3600, checkperiod: 600 }); // Cache TTL: 1 hour

// Centralized Geocoding Utilities
export const geocodeAddress = async (fullAddress) => {
  const cachedResult = geocodingCache.get(fullAddress);
  if (cachedResult) {
    return cachedResult;
  }

  const response = await axios.get(process.env.GOOGLE_MAPS_API_URL, {
    params: {
      address: fullAddress,
      key: process.env.GOOGLE_MAPS_API_KEY,
    },
  });

  if (response.data.status !== "OK" || response.data.results.length === 0) {
    throw new AppError(
      "Geocoding failed: Invalid or ambiguous address.",
      400,
      true,
      "Geocoding"
    );
  }

  const location = response.data.results[0].geometry.location;
  geocodingCache.set(fullAddress, location); // Cache the result
  return location;
};

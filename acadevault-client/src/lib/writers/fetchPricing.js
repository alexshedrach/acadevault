import { pricingData } from "@/data/pricingData";

// In-memory cache for pricing data
let pricingCache = null;

// In-memory cache for writers data
let writersCache = null;

export const fetcher = async (url) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`, {
    headers: { "Content-Type": "application/json" },
    cache: "no-store", // Prevent browser caching for fresh data
  });
  if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
  return response.json();
};

export const fetchPricing = async (category) => {
  // Check if data is cached and return it for the specific category
  if (pricingCache && pricingCache[category]) return pricingCache[category];

  try {
    // Determine if running in development or production
    const isDev = process.env.NODE_ENV === "development";
    let response;

    if (!isDev && process.env.NEXT_PUBLIC_API_URL) {
      // Fetch from real API in production
      response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/pricing?category=${category}`,
        {
          headers: { "Content-Type": "application/json" },
          cache: "no-store", // Prevent browser caching for fresh data
        }
      );
      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);
    } else {
      // Mock API response in development
      await new Promise((resolve) => setTimeout(resolve, 500)); // Simulate API delay
      response = {
        ok: true,
        json: () => Promise.resolve(pricingData[category] || []),
      };
    }

    const data = await response.json();
    if (!Array.isArray(data))
      throw new Error("Invalid data format: expected array");

    // Cache the result
    pricingCache = { ...pricingCache, [category]: data };
    return data;
  } catch (error) {
    console.error(
      `Error fetching pricing for category ${category}:`,
      error.message
    );
    // Fallback to static pricing data in case of failure
    pricingCache = { ...pricingCache, [category]: pricingData[category] || [] };
    return pricingData[category] || [];
  }
};

// Optional: Clear pricing cache for testing or when data needs refresh
export const clearPricingCache = () => {
  pricingCache = null;
};

// Optional: Clear writers cache for testing or when data needs refresh
export const clearCache = () => {
  writersCache = null;
};


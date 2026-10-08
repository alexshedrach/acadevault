import { writersData } from "@/data/writersData";

// In-memory cache to avoid repeated fetches in development
let cache = null;

export const fetchWriters = async () => {
  // Check if data is cached and return it to avoid redundant fetches
  if (cache) return cache;

  try {
    // Determine if running in development or production
    const isDev = process.env.NODE_ENV === "development";
    let response;

    if (!isDev && process.env.NEXT_PUBLIC_API_URL) {
      // Fetch from real API in production
      response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/writers`, {
        headers: { "Content-Type": "application/json" },
        cache: "no-store", // Prevent browser caching for fresh data
      });
      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);
    } else {
      // Mock API response in development
      await new Promise((resolve) => setTimeout(resolve, 500)); // Simulate API delay
      response = { ok: true, json: () => Promise.resolve(writersData) };
    }

    const data = await response.json();
    if (!Array.isArray(data))
      throw new Error("Invalid data format: expected array");

    // Cache the result
    cache = data;
    return data;
  } catch (error) {
    console.error("Error fetching writers:", error.message);
    // Fallback to mock data in case of failure
    cache = writersData;
    return writersData;
  }
};

// Optional: Clear cache for testing or when data needs refresh
export const clearCache = () => {
  cache = null;
};

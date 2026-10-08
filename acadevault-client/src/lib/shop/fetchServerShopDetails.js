// ✅ Server Fetch for Shop Details
import { cache } from "react";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL?.replace(/\/+$/, "");
const API_PREFIX = "/api/v2/shops";

export const fetchServerShopDetails = cache(
  async (shopId, queryString = "") => {
    if (!shopId || typeof shopId !== "string") {
      console.warn(
        "[fetchServerShopDetails] called with invalid shopId:",
        shopId
      );
      return null;
    }

    try {
      const url = `${BASE_URL}${API_PREFIX}/${encodeURIComponent(shopId)}${
        queryString ? `?${queryString}` : ""
      }`;

      const res = await fetch(url, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        next: { revalidate: 300 }, // ISR every 5 minutes
      });

      if (res.status === 404) return null;

      if (!res.ok) {
        const text = await res.text();
        console.error(
          `[fetchServerShopDetails] fetch error: ${res.status}`,
          text
        );
        return null;
      }

      const payload = await res.json();
      return payload.data || null;
    } catch (error) {
      console.error("[fetchServerShopDetails] network error:", error);
      return null;
    }
  }
);

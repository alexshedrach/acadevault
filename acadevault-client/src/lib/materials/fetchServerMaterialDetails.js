import { cache } from "react";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL?.replace(/\/+$/, "");
const API_PREFIX = "/api/v2/academic-materials";

export const fetchServerMaterialDetails = cache(async (slug) => {
  if (!slug || typeof slug !== "string") {
    console.warn("[getMaterialDetailsBySlug] called with invalid slug:", slug);
    return null;
  }

  try {
    const url = `${BASE_URL}${API_PREFIX}/${encodeURIComponent(slug)}`;
    const res = await fetch(url, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      // Next.js ISR: revalidate every 5 minutes
      next: { revalidate: 300 },
    });

    if (res.status === 404) {
      return null;
    }

    if (!res.ok) {
      const text = await res.text();
      console.error(
        `[getMaterialDetailsBySlug] fetch error: ${res.status}`,
        text
      );
      return null;
    }

    const payload = await res.json();
    return payload.data || null;
  } catch (error) {
    console.error("[getMaterialDetailsBySlug] network error:", error);
    return null;
  }
});

import {
  buildMaterialUrl,
  transformMaterialResponse,
} from "@/features/materials/materialQueryHelpers";

export async function fetchServerMaterialsByCategory(params = {}) {
  try {
    // 1. build a safe URL fragment (e.g. "/api/v2/academic-materials/category/math/materials?page=2&limit=10")
    const fragment = buildMaterialUrl(params);

    // 2. prefix with our public API base (NEXT_PUBLIC_API_URL)
    const url = `${process.env.NEXT_PUBLIC_API_URL}${fragment}`;

    const res = await fetch(url, {
      cache: "no-store", // for SSR, always fetch fresh
      credentials: "include", // if you need cookies/auth
    });

    if (!res.ok) {
      // e.g. 404, 500
      console.error("SSR: non-OK response", res.status);
      return null;
    }

    const json = await res.json();
    return transformMaterialResponse(json, params);
  } catch (err) {
    console.error("SSR Material Fetch Failed:", err);
    return null;
  }
}

import {
  buildMaterialUrl,
  transformMaterialResponse,
} from "@/features/materials/materialQueryHelpers";

/**
 * fetchAllMaterials(params = {})
 *
 * - params can include:
 *     page, limit, sort, search, isFeatured, isTrending, etc.
 * - Returns: { materials: Array, pagination: { totalPages, currentPage, totalResults } }
 */
export async function fetchAllMaterials(params = {}) {
  try {
    // 1) Build the URL fragment, e.g.:
    //    "/api/v2/academic-materials?isFeatured=true&limit=8"
    const fragment = buildMaterialUrl(params);

    // 2) Prefix with public API base
    const url = `${process.env.NEXT_PUBLIC_API_URL}${fragment}`;

    const res = await fetch(url, {
      cache: "no-store", // no-store or force-cache depending on your strategy
      credentials: "include", // if you need cookies/auth
    });

    if (!res.ok) {
      console.error("SSR: fetchAllMaterials non-OK status", res.status);
      return null;
    }

    const json = await res.json();
    return transformMaterialResponse(json, params);
  } catch (err) {
    console.error("SSR: fetchAllMaterials failed:", err);
    return null;
  }
}

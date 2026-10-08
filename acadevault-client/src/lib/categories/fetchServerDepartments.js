import {
  buildDepartmentUrl,
  transformDepartmentResponse,
} from "@/features/category/categoryQueryHelpers";

export async function fetchServerDepartments(params = {}) {
  try {
    const urlFragment = buildDepartmentUrl(params);
    const url = `${process.env.NEXT_PUBLIC_API_URL}${urlFragment}`;

    const res = await fetch(url, {
      cache: "no-store",
      credentials: "include",
    });

    if (!res.ok) {
      console.error("SSR department fetch failed:", res.status);
      return null;
    }

    const json = await res.json();
    return transformDepartmentResponse(json, params);
  } catch (err) {
    console.error("SSR Error:", err);
    return null;
  }
}

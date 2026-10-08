export async function fetchCategoryDetailBySlug(slug) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v2/categories/${slug}`;

  try {
    const res = await fetch(url, {
      cache: "no-store",
      credentials: "include",
    });

    if (!res.ok) return null;

    const json = await res.json();
    return json?.data || null;
  } catch (err) {
    console.error("Failed to fetch category detail by slug:", err);
    return null;
  }
}

export async function getEffectivePrice({
  materialId,
  materialType,
  currency,
  region,
}) {
  const params = new URLSearchParams({
    materialId,
    materialType,
    currency,
  });

  if (region) params.append("region", region);

  try {
    const res = await fetch(
      `${
        process.env.NEXT_PUBLIC_API_URL
      }/api/v2/prices/current-price?${params.toString()}`
    );
    const json = await res.json();
    return json?.data ?? null;
  } catch (err) {
    console.error("Error fetching effective price:", err);
    return null;
  }
}

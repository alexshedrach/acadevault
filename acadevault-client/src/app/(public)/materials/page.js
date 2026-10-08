import { generatePageMetadata } from "@/utils/generatePageMetadata";
import AllMaterials from "./components/AllMaterials";

export const metadata = generatePageMetadata({
  title: "Browse Academic Materials",
  description:
    "Discover top-quality academic materials, notes, study guides, and resources across subjects. Filter by course, topic, rating, or tags.",
  slug: "materials",
  image: "https://acadevault.com/images/materials-browse-og.jpg",
});

/**
 * AllMaterialsPage (Server Component)
 *
 * - We await `searchParams` per Next.js 14 requirement (“Sync Dynamic APIs”).
 * - We only pass plain‐string filters (no Symbols or undefined) to the client.
 * - We do NOT fetch “all materials” on the server here by default; instead,
 *   we let the client component handle RTK Query (which will hydrate from cache
 *   if you set up next-redux-wrapper).
 */
export default async function AllMaterialsPage({ searchParams }) {
  // 1) Await the incoming searchParams object (Next.js 14+):
  const incomingParams = await searchParams; // e.g. { keyword: "math", page: "2", sortBy: "rating-desc" }

  // 2) Clean them—only keep string values that are not empty.
  const cleanedParams = {};
  for (const [key, value] of Object.entries(incomingParams)) {
    if (typeof value === "string" && value.trim() !== "") {
      cleanedParams[key] = value;
    }
  }

  // 3) Render the Client component, passing along initial filters:
  return <AllMaterials initialSearchParams={cleanedParams} />;
}

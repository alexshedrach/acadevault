import { generatePageMetadata } from "@/lib/metadata/generatePageMetadata";
import ClientMaterials from "./components/ClientMaterials";
import { fetchServerMaterialsByCategory } from "@/lib/materials/fetchMaterialsByCategory";
import Navbar from "@/components/header/Navbar";

/**
 * Next.js 14+: we can declare generateMetadata directly in page.js.
 */
export async function generateMetadata({ params }) {
  // 1. Await the params object
  const { slug: rawSlug } = await params; // e.g. "computer-science"
  const decoded = decodeURIComponent(rawSlug).replace(/-/g, " "); // "computer science"

  // 2. Compose a page‐specific title & description
  const pageTitle = `${decoded} Materials`;
  const pageDescription = `Browse all academic materials under “${decoded}” on AcadeVault.`;

  // 3. Compute a slug‐based URL path (matching your routing structure).
  //    For example, if the page lives at /materials/category/computer-science, pass that in:
  const urlSlug = `materials/category/${encodeURIComponent(rawSlug)}`;

  // 4. Delegate to your reusable helper:
  return generatePageMetadata({
    title: pageTitle,
    description: pageDescription,
    slug: urlSlug,
    // image: optional override if you have a category‐specific OG image
  });
}

// --------------- Server Component ---------------

/**
 * CategoryPage:
 *   - 1) await both params & searchParams
 *   - 2) decode categorySlug
 *   - 3) build an object of only string|number searchParams
 *   - 4) call fetchServerMaterialsByCategory({ categorySlug, ...cleanedParams })
 */
export default async function CategoryPage({ params, searchParams }) {
  // 1. Must await them per Next.js 14 “Sync Dynamic APIs” rule:
  const { slug: rawSlug } = await params; // rawSlug is e.g. "computer-science"
  const categorySlug = decodeURIComponent(rawSlug);

  // 2. await the searchParams object
  const incoming = await searchParams; // e.g. { page: "2", limit: "10" }

  // 3. Build a “plain” object of only string|number from incoming searchParams:
  const cleanedParams = {};
  for (const [key, value] of Object.entries(incoming)) {
    if (typeof value === "string" && value.trim() !== "") {
      // if it represents an integer, you might parseInt here
      // e.g. cleanedParams.page = parseInt(value, 10)
      // but for now, just pass as string—our RTK Query builder can coerce it.
      cleanedParams[key] = value;
    }
  }

  // 4. Fetch initial data on the server:
  const initialData = await fetchServerMaterialsByCategory({
    categorySlug,
    ...cleanedParams,
  });

  // If no data or empty list, we can show a “not found” or “no results” block
  if (
    !initialData ||
    Array.isArray(initialData.materials) === false ||
    initialData.materials.length === 0
  ) {
    return (
      <div className="text-center py-20">
        <p className="text-lg font-medium">
          No materials found in the “{categorySlug.replace(/-/g, " ")}”
          category.
        </p>
      </div>
    );
  }

  // 5. Render the page with a server-rendered <h1>, then hydrate <ClientMaterials>
  return (
    <>
      <Navbar showSearch={true} showCategories={true} />

      <ClientMaterials
        initialData={initialData}
        categorySlug={categorySlug}
        initialSearchParams={cleanedParams}
      />
    </>
  );
}

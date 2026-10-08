import { notFound } from "next/navigation";
import ShopDetailClient from "./components/ShopDetailClient";
import { fetchServerShopDetails } from "@/lib/shop/fetchServerShopDetails";
import { generatePageMetadata } from "@/lib/metadata/generatePageMetadata";
import Navbar from "@/components/header/Navbar";

// ✅ Server-side Metadata
export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const { shopId: rawShopId } = resolvedParams;

  const shopId = decodeURIComponent(rawShopId);

  if (!shopId || typeof shopId !== "string") {
    return { title: "Shop Not Found", description: "Vendor shop not found." };
  }

  const shopData = await fetchServerShopDetails(shopId);

  if (!shopData?.shop?.id) {
    return { title: "Shop Not Found", description: "Vendor shop not found." };
  }

  return generatePageMetadata({
    title: `${shopData.shop.name} • AcadeVault Shop`,
    description:
      shopData.shop.description ||
      `Browse products from ${shopData.shop.name}.`,
    slug: `shops/${encodeURIComponent(shopId)}`,
    image:
      shopData.shop.banner || `/og/shops/${encodeURIComponent(shopId)}.png`,
  });
}

// ✅ Page Handler
export default async function ShopDetailPage({ params, searchParams }) {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;

  const { shopId: rawShopId } = resolvedParams;
  const shopId = decodeURIComponent(rawShopId);

  const queryString = resolvedSearchParams.toString();

  const shopData = await fetchServerShopDetails(shopId, queryString);

  if (!shopData?.shop?.id) notFound();

  // server‑side fetch of FAQs (build or SSR)
  // const faqs = await fetchFAQs("shop", shopId);

  return (
    <>
      <Navbar showSearch showCategories />
      <ShopDetailClient initialData={shopData} shopId={shopId} />
    </>
  );
}

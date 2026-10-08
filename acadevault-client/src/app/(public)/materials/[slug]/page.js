// File: src/app/material/[slug]/page.js

import { notFound } from "next/navigation";
import { generatePageMetadata } from "@/utils/generatePageMetadata";
import { fetchServerMaterialDetails } from "@/lib/materials/fetchServerMaterialDetails";
import Navbar from "@/components/header/Navbar";
import MaterialDetailClient from "./components/MaterialDetailClient";

/**
 * generateMetadata()
 *
 * Next.js 14+ requires awaiting params for sync dynamic APIs.
 */
export async function generateMetadata({ params }) {
  // 1. Await params
  const { slug: rawSlug } = await params;

  // 2. Validate
  if (!rawSlug || typeof rawSlug !== "string") {
    return {
      title: "Material Not Found | AcadeVault",
      description: "This academic material could not be found.",
    };
  }

  // 3. Fetch minimal data for head tags
  const material = await fetchServerMaterialDetails(rawSlug);
  if (!material) {
    return {
      title: "Material Not Found | AcadeVault",
      description: "This academic material could not be found.",
    };
  }

  // 4. Build metadata
  const {
    title,
    author = "Unknown Author",
    description: desc = "",
    category,
  } = material;
  const categoryName = category?.name || "Uncategorized";

  return generatePageMetadata({
    title: `${title} | ${categoryName} Material by ${author} | AcadeVault`,
    description:
      desc.slice(0, 160) ||
      `Download "${title}" – an academic resource for ${categoryName} students on AcadeVault.`,
    slug: `material/${encodeURIComponent(rawSlug)}`,
    image:
      material.ogImage ||
      `https://acadevault.com/og/materials/${encodeURIComponent(rawSlug)}.png`,
  });
}

/**
 * MaterialDetailPage()
 *
 * Follows Next.js 14 sync dynamic API conventions: await params.
 */
export default async function MaterialDetailPage({ params }) {
  // 1. Await params
  const { slug: rawSlug } = await params;

  // 2. Decode slug
  const slug = decodeURIComponent(rawSlug);

  // 3. Fetch full material data
  const material = await fetchServerMaterialDetails(slug);

  // 4. 404 if not found
  if (!material) {
    notFound();
  }

  // 5. Render
  return (
    <>
      <Navbar showSearch={true} showCategories={true} />
      <MaterialDetailClient initialData={material} slug={slug} />
    </>
  );
}

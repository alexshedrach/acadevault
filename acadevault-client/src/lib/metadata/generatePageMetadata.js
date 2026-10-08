// -------------------------------------------------
// lib/metadata/generatePageMetadata.js
// -------------------------------------------------
import { baseMetadata } from "./baseMetadata";

export function generatePageMetadata({
  title,
  description,
  slug,
  image = "https://acadevault.com/og-image.jpg",
}) {
  const url = `https://acadevault.com/${slug}`;

  return {
    // 1. Spread in all the “base” fields first
    ...baseMetadata,

    // 2. Override title + description
    title: `${title}`,
    description,

    openGraph: {
      ...baseMetadata.openGraph,
      title,
      description,
      url,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: `${title} Image`,
        },
      ],
    },

    twitter: {
      ...baseMetadata.twitter,
      title,
      description,
      images: [image],
    },
  };
}

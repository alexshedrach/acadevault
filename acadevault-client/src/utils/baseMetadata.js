export const baseMetadata = {
  metadataBase: new URL("https://acadevault.com"),
  title: {
    default: "AcadeVault | Digital Academic Marketplace",
    template: "%s | AcadeVault",
  },
  description:
    "A professional platform for academic materials, courses, and more.",
  keywords: ["academic materials", "research", "courses", "digital books"],
  authors: [
    {
      name: "Alexdegreat Computer Tech & Solutions",
      url: "https://acadevault.com",
    },
  ],
  creator: "Alexdegreat",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://acadevault.com",
    siteName: "AcadeVault",
    title: "AcadeVault - Buy & Sell Academic Materials",
    description: "A professional platform for digital academic materials.",
    images: [
      {
        url: "https://acadevault.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "AcadeVault Hero Image",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@acadevault",
    creator: "@alexdegreat",
    title: "AcadeVault - Digital Academic Marketplace",
    description: "Find and sell academic materials with ease.",
    images: ["https://acadevault.com/twitter-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      maxSnippet: -1,
      maxImagePreview: "large",
      maxVideoPreview: -1,
    },
  },
};

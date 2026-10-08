export const getImageUrl = (thumbnailPath) => {
  const fallbackPath = "/images/acadevault-hero-img-1.png";

  // Absolute URLs are returned as-is
  if (
    thumbnailPath?.startsWith("http://") ||
    thumbnailPath?.startsWith("https://")
  ) {
    return thumbnailPath;
  }

  // Fallback if no path provided
  if (!thumbnailPath) {
    return fallbackPath;
  }

  // Relative path to backend-hosted image
  return `${process.env.NEXT_PUBLIC_API_URL}/${thumbnailPath.replace(
    /^\/+/,
    ""
  )}`;
};

export const getFileUrl = (path) => {
  const fallbackPath = "/files/preview-not-available.txt";

  if (!path) return fallbackPath;

  // Return absolute URLs as-is
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }

  // Normalize and build full backend URL
  return `${process.env.NEXT_PUBLIC_API_URL}/${path.replace(/^\/+/, "")}`;
};

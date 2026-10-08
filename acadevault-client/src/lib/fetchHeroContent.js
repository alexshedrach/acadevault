import { unstable_cache } from "next/cache";

// Define fallback content directly to ensure availability
const AffiliateHerofallbackContent = {
  headline: [
    "Join Our Affiliate Program",
    "Earn with Acadevault",
    "Promote Academic Success",
  ],
  subheadline:
    "Earn up to 15% commissions by promoting Acadevault’s academic resources to your audience.",
  cta: {
    primary: "Become an Affiliate",
    secondary: "Learn More",
  },
  stats: [
    { label: "Affiliates", value: 5000 },
    { label: "Commissions Paid", value: 250000, prefix: "$" },
    { label: "Countries", value: 50 },
  ],
  testimonials: [
    {
      quote: "Acadevault’s affiliate program doubled my revenue!",
      author: "Jane Doe",
      role: "Education Blogger",
      avatar: "/images/avatars/jd.jpg",
    },
    {
      quote: "The dashboard is intuitive, payouts are reliable.",
      author: "John Smith",
      role: "Academic Influencer",
      avatar: "/images/avatars/js.jpg",
    },
  ],
  video: "/videos/affiliate-bg.mp4",
  language: "en",
};

export const fetchHeroContent = async (locale = "en") => {
  const cachedFetch = unstable_cache(
    async () => {
      try {
        const response = await fetch(`/api/hero-content?locale=${locale}`, {
          headers: { "Accept-Language": locale },
          next: { revalidate: 3600 },
        });
        if (!response.ok) {
          throw new Error(`API request failed with status ${response.status}`);
        }
        const data = await response.json();
        return data;
      } catch (error) {
        console.error(`API error for locale ${locale}:`, error.message);

        // Retry logic
        for (let attempt = 1; attempt <= 3; attempt++) {
          try {
            console.log(`Retry attempt ${attempt} for locale ${locale}`);
            const retryResponse = await fetch(
              `/api/hero-content?locale=${locale}`,
              {
                headers: { "Accept-Language": locale },
              }
            );
            if (retryResponse.ok) {
              const data = await retryResponse.json();
              return data;
            }
          } catch (retryError) {
            console.error(`Retry ${attempt} failed:`, retryError.message);
            if (attempt === 3) {
              console.warn("All retries failed, returning fallback data");
              // Mock analytics tracking
              console.log("Analytics event: fetch_hero_content_failed", {
                locale,
                error: retryError.message,
                timestamp: new Date().toISOString(),
              });
              return AffiliateHerofallbackContent;
            }
          }
        }
        // This line should be unreachable due to the return in the loop
        console.warn("Returning fallback data after retries");
        return AffiliateHerofallbackContent;
      }
    },
    [`hero-content-${locale}`],
    { revalidate: 3600 }
  );

  return cachedFetch();
};

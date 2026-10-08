import TrustedByInstitutions from "@/components/common/TrustedByInstitutions";
import { fetchAllMaterials } from "@/lib/materials/fetchAllMaterials";
import { generatePageMetadata } from "@/utils/generatePageMetadata";
import AcadeVaultGoalsSection from "./components/AcadeVaultGoalsSection";
import AcadeVaultPricingSection from "./components/AcadeVaultPricingSection";
import FeaturedMaterialsSection from "./components/FeaturedMaterialsSection";
import FeaturesSection from "./components/FeaturesSection";
import HeroSection from "./components/HeroSection";
import HireWriterSection from "./components/HireWriterSection";
import NewReleasesSection from "./components/NewReleasesSection";
import TrendingMaterialsSection from "./components/TrendingMaterialsSection";
import CallToActionSection from "./components/CallToActionSection";
import ContactSection from "./components/ContactSection";
import TestimonialsSection from "./components/TestimonialsSection";
import ReferralSection from "./components/ReferralSection";
import VendorBenefitsSection from "./components/VendorBenefitsSection";
import LatestBlogPostsSection from "./components/LatestBlogPostsSection";
import FAQSection from "@/components/faq/FAQSection";
import Navbar from "@/components/header/Navbar";

export const metadata = generatePageMetadata({
  title: "AcadeVault • Home",
  description:
    "AcadeVault – Discover, buy, and sell top academic materials. Explore featured notes, trending study guides, and more.",
  slug: "",
  image: "https://acadevault.com/images/home-og.jpg",
});

// If you want ISR (revalidate every 60 seconds), uncomment:
// export const revalidate = 60;

export default async function HomePage() {
  // 1) Fetch “Featured” materials (limit to 8)
  const featuredData = await fetchAllMaterials({
    isFeatured: "false",
    limit: 4,
  });

  // 2) Fetch “Trending” materials (limit to 8)
  const trendingMaterialsData = await fetchAllMaterials({
    limit: 8,
  });

  // 3. Fetch the “Newly Created” materials (limit 6, sorted by createdAt descending)
  const newArrivalsData = await fetchAllMaterials({
    sort: "createdAt",
    order: "desc",
    limit: 8,
  });

  // 4) Top Rated
  const topRatedData = await fetchAllMaterials({
    sort: "-rating",
    limit: 8,
  });

  return (
    <>
      <Navbar showSearch={true} showCategories={false} />

      {/* 1. Above the fold: headline + core value prop */}
      <HeroSection />

      {/* 2. What you can do on AcadeVault (key features) */}
      <FeaturesSection />

      {/* 3. Social proof: who trusts us */}
      <TrustedByInstitutions />

      {/* 4. Explore content: curated & trending */}
      <FeaturedMaterialsSection featuredMaterials={featuredData} />
      <TrendingMaterialsSection trendingMaterials={trendingMaterialsData} />

      {/* 5. Fresh off the press: new releases */}
      <NewReleasesSection newArrivalsMaterials={newArrivalsData} />

      {/* 6. Our mission & impact */}
      <AcadeVaultGoalsSection />

      {/* 7. Why vendors love us */}
      <VendorBenefitsSection />

      {/* 8. Real success stories */}
      <TestimonialsSection />

      {/* 9. Spread the word: referral program */}
      <ReferralSection />

      {/* 10. Pick your plan */}
      <AcadeVaultPricingSection />

      {/* 11. Learn more: latest from our blog */}
      <LatestBlogPostsSection />

      {/* 12. Common questions */}
      <FAQSection />

      {/* 13. Final push → sign up / download CTA */}
      <CallToActionSection />

      {/* 14. Footer‐adjacent: contact & support */}
      <ContactSection />

      <HireWriterSection />
    </>
  );
}

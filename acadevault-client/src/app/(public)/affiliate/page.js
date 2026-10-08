import React from "react";
import dynamic from "next/dynamic";
import { generatePageMetadata } from "@/utils/generatePageMetadata";
import Navbar from "@/components/header/Navbar";
import WhyJoinAffiliateSection from "./components/WhyJoinAffiliateSection";
import AffiliateHowItWorks from "./components/AffiliateHowItWorks";
import AffiliateEarningPotential from "./components/AffiliateEarningPotential";
import AffiliateHeroSection from "./components/AffiliateHeroSection";

// Dynamically import heavier or below-the-fold sections
const FAQ = dynamic(() => import("./components/AffiliateFAQSection"), {
  suspense: true,
});
const CTA = dynamic(() => import("./components/AffiliateCallToActionSection"), {
  suspense: true,
});

export const metadata = generatePageMetadata({
  title: "Affiliate Program",
  description:
    "Join Acadavault’s affiliate program to earn commissions by promoting trusted academic resources to students, researchers, and academics worldwide.",
  slug: "affiliate",
  image: "https://acadevault.com/images/affiliate-og.jpg",
});

export default function AffiliatePage() {
  return (
    <>
      <Navbar showSearch showCategories />

      <>
        {/* 1. Hero */}

        <AffiliateHeroSection />

        {/* 2. Why Join */}
        <WhyJoinAffiliateSection />

        {/* 3. How It Works */}
        <AffiliateHowItWorks />

        {/* 4. Earning Potential */}
        <AffiliateEarningPotential />

        {/* 5. FAQ (lazy-loaded) */}
        <React.Suspense
          fallback={<div className="text-center py-12">Loading FAQs…</div>}
        >
          <FAQ />
        </React.Suspense>

        {/* 6. Final CTA (lazy-loaded) */}
        <React.Suspense fallback={null}>
          <CTA />
        </React.Suspense>
      </>
    </>
  );
}

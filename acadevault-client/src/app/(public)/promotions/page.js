import { metadata } from "./metadata";

import Navbar from "@/components/header/Navbar";
import React from "react";
import DealsHeroSection from "./components/DealsHeroSection";
import ClientPromotions from "./components/ClientPromotions";
import CustomRequestSection from "./components/CustomRequestSection";
import WhyChooseDealsSection from "./components/WhyChooseDealsSection";

export { metadata };

function PromotionsPage() {
  return (
    <>
      <Navbar showSearch showCategories />

      <DealsHeroSection
        dealsData={{
          title: "Exclusive Academic Deals",
          description:
            "Unlock premium academic resources at unbeatable prices. Don’t miss out on limited-time offers!",
          image: "/images/special-deals.jpg",
          stats: {
            totalDeals: 50,
            maxDiscount: 70,
            totalViews: 1200,
          },
        }}
      />
      <ClientPromotions />

      <CustomRequestSection />
      <WhyChooseDealsSection />
    </>
  );
}

export default PromotionsPage;

"use client";

import React from "react";
import { BadgePercent } from "lucide-react";
import Link from "next/link";

function DealsHeroSection({ dealsData = {} }) {
  const title = dealsData?.title || "Exclusive Academic Deals";
  const description =
    dealsData?.description ||
    "Unlock premium academic resources at unbeatable prices. Don’t miss out on limited-time offers!";
  const backgroundImage = dealsData?.image || "/images/deals-banner.jpg";

  const handleCTAClick = (label) => {
    try {
      // Placeholder for analytics tracking function
      trackEvent({
        category: "DealsHero",
        action: "CTA_Click",
        label,
      });
    } catch (error) {
      console.warn("Analytics tracking failed:", error);
    }
  };

  return (
    <section
      className="relative bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white py-24"
      style={{
        backgroundImage: backgroundImage
          ? `url(${backgroundImage})`
          : undefined,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
      role="banner"
      aria-label="Exclusive Deals Hero"
    >
      {/* Overlay for readability */}
      <div
        className="absolute inset-0 bg-gradient-to-r from-blue-800 via-indigo-600/30 to-indigo-800"
        aria-hidden="true"
      />

      <div className="space-y-6 text-left container mx-auto px-6 sm:px-12 md:px-20 max-w-5xl relative z-10">
        {/* Title */}
        <h1 className="text-4xl sm:text-5xl font-bold leading-tight flex items-center gap-3">
          <BadgePercent className="w-10 h-10 text-yellow-400" />
          {title}
        </h1>

        {/* Subtitle */}
        <p className="text-xl sm:text-2xl font-medium max-w-3xl">
          {description}
        </p>

        {/* Stats (if available) */}
        {dealsData?.stats && (
          <div className="flex flex-wrap gap-6 text-sm sm:text-base">
            <span className="flex items-center gap-2">
              <BadgePercent className="w-5 h-5" />
              {dealsData.stats.totalDeals} Active Deals
            </span>
            <span className="flex items-center gap-2">
              <BadgePercent className="w-5 h-5 text-yellow-400" />
              Up to {dealsData.stats.maxDiscount}% Off
            </span>
            <span className="flex items-center gap-2">
              <BadgePercent className="w-5 h-5" />
              {dealsData.stats.totalViews} Views
            </span>
          </div>
        )}

        {/* CTA */}
        <div className="flex flex-wrap gap-4 mt-6">
          <Link
            href="/deals"
            onClick={() => handleCTAClick("Explore Deals")}
            className="inline-flex items-center gap-2 bg-yellow-400 text-blue-600 px-6 py-3 rounded-full font-semibold text-base hover:bg-yellow-500 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Explore exclusive academic deals"
          >
            <BadgePercent className="w-5 h-5" />
            Explore Deals
          </Link>
        </div>
      </div>
    </section>
  );
}

export default DealsHeroSection;

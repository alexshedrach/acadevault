"use client";

import { useId, useMemo } from "react";
import Slider from "@/components/slider/Slider";
import HeroBanner from "./banner/HeroBanner";
import HireExpertsBanner from "./banner/HireExpertsBanner";
import MonetizationBanner from "./banner/MonetizationBanner";
import ReferralRewardsBanner from "./banner/ReferralRewardsBanner";
import AcademicAssistanceBanner from "./banner/AcademicAssistanceBanner";

function useSlides() {
  const idPrefix = useId();

  return useMemo(
    () => [
      { id: `${idPrefix}-hero`, content: <HeroBanner /> },
      { id: `${idPrefix}-hire`, content: <HireExpertsBanner /> },
      { id: `${idPrefix}-monetize`, content: <MonetizationBanner /> },
      { id: `${idPrefix}-referrer`, content: <ReferralRewardsBanner /> },
      { id: `${idPrefix}-assistance`, content: <AcademicAssistanceBanner /> },
    ],
    [idPrefix]
  );
}

export default function HeroSlider() {
  const slides = useSlides();

  return (
    <section
      className="relative z-0 h-full shadow-xl rounded-2xl overflow-hidden"
      aria-label="Homepage Hero Carousel"
      aria-roledescription="carousel"
      aria-live="polite"
    >
      <Slider
        slides={slides}
        interval={7000} // 7 seconds per slide
        transitionDuration={0.6} // seconds
        swipeThreshold={40} // pixels
        showArrows
        showDots
        showPauseToggle
        showProgressBar
        progressPosition="bottom"
        variant="linear" // Supports "radial" too
        autoResumeOnHoverOut // Optional but UX-positive
      />
    </section>
  );
}

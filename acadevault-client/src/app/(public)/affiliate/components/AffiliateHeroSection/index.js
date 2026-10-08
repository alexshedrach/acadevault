"use client";

import React, { useState, useEffect, Suspense } from "react";
import { motion } from "framer-motion";
import { Share2 } from "lucide-react";
import dynamic from "next/dynamic";
import StatsCounter from "./StatsCounter";
import TestimonialCarousel from "./TestimonialCarousel";
import QuickStartForm from "./QuickStartForm";
import Preferences from "./Preferences";
import ProgramModal from "./ProgramModal";
import { PreferencesProvider } from "@/contexts/PreferencesContext";
import { fetchHeroContent } from "@/lib/fetchHeroContent";
import Banner from "@/components/ui/Banner";
import useAnalytics from "@/hooks/useAnalytics";
import AffiliateLinkGenerator from "@/components/MiniApp/AffiliateLinkGenerator";
import PerformanceTracker from "@/components/MiniApp/PerformanceTracker";
import StudyPlanner from "@/components/MiniApp/StudyPlanner";
import ResourceRecommendationQuiz from "@/components/MiniApp/ResourceRecommendationQuiz";

// Lazy-load Typewriter
const Typewriter = dynamic(
  () => import("react-simple-typewriter").then((mod) => mod.Typewriter),
  {
    ssr: false,
  }
);

// Fallback content validation function
const validateContent = (data) => {
  return (
    data &&
    Array.isArray(data.headline) &&
    data.headline.length > 0 &&
    typeof data.subheadline === "string" &&
    data.cta &&
    typeof data.cta.primary === "string" &&
    typeof data.cta.secondary === "string" &&
    Array.isArray(data.stats) &&
    Array.isArray(data.testimonials) &&
    typeof data.video === "string" &&
    typeof data.language === "string"
  );
};

const AffiliateHeroSection = () => {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const { trackEvent } = useAnalytics();

  // Fetch content with enhanced error handling
  useEffect(() => {
    const loadContent = async () => {
      try {
        setLoading(true);
        const data = await fetchHeroContent();

        // Validate the returned data
        if (!validateContent(data)) {
          throw new Error("Invalid content structure returned from API");
        }

        setContent(data);
        trackEvent("hero_content_loaded", {
          language: data.language,
          headline_count: data.headline.length,
          timestamp: new Date().toISOString(),
        });
      } catch (err) {
        console.error("Failed to load hero content:", err.message);
        setError("Failed to load content. Using fallback data.");
        // Set fallback content directly if available
        const fallbackContent = {
          headline: [
            "Join Our Affiliate Program",
            "Earn with Acadevault",
            "Promote Academic Success",
          ],
          subheadline:
            "Earn up to 15% commissions by promoting Acadevault’s academic resources.",
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
              avatar: "/avatars/james.png",
            },
            {
              quote: "The dashboard is intuitive, payouts are reliable.",
              author: "John Smith",
              role: "Academic Influencer",
              avatar: "/avatars/tony.png",
            },
          ],
          video: "/videos/affiliate-bg.mp4",
          language: "en",
        };
        setContent(fallbackContent);
        trackEvent("hero_content_error", {
          error: err.message,
          fallback_used: true,
          timestamp: new Date().toISOString(),
        });
      } finally {
        setLoading(false);
      }
    };
    loadContent();
  }, [trackEvent]);

  if (loading) {
    return (
      <div className="py-20 text-center text-gray-600" role="status">
        Loading...
      </div>
    );
  }

  if (error && !content) {
    return (
      <div className="py-20 text-center text-red-600" role="alert">
        {error}
      </div>
    );
  }

  // Custom header with Typewriter
  const customHeader = (
    <motion.h1
      id="hero-heading"
      className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 flex justify-center items-center gap-2"
    >
      <motion.span
        whileHover={{ rotate: 360, transition: { duration: 0.5 } }}
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <Share2 className="w-10 h-10" />
      </motion.span>
      <Typewriter
        words={content.headline}
        loop={true}
        cursor
        cursorStyle="|"
        typeSpeed={70}
        deleteSpeed={50}
        delaySpeed={2000}
      />
    </motion.h1>
  );

  // Particle animation overlay
  const particleOverlay = (
    <div className="absolute inset-0 pointer-events-none z-0">
      <div className="absolute w-1 h-1 bg-white rounded-full animate-ping opacity-50 top-10 left-20" />
      <div className="absolute w-1 h-1 bg-yellow-400 rounded-full animate-ping opacity-50 top-40 right-30" />
      <div className="absolute w-1 h-1 bg-purple-400 rounded-full animate-ping opacity-50 bottom-20 left-50" />
    </div>
  );

  return (
    <PreferencesProvider>
      <section className="relative">
        <Banner
          subtitle={content.subheadline}
          ctaButtons={[
            {
              label: content.cta.primary,
              href: "/signup/affiliate",
              variant: "primary",
              onClick: () => trackEvent("cta_primary_click"),
            },
            {
              label: content.cta.secondary,
              href: "#",
              variant: "tertiary",
              onClick: () => {
                setShowModal(true);
                trackEvent("cta_secondary_click");
              },
            },
          ]}
          backgroundVideo={content.video}
          backgroundAlt="Affiliate Program Background"
          customHeader={customHeader}
          extraContent={particleOverlay}
          animationType="fade"
          height="auto"
          padding="px-4 py-20"
          buttonLayout="inline"
          locale={content.language}
          className="relative"
        />

        {/* <div className="container mx-auto px-4 pb-6 relative z-10"> */}
        {/* Stats Counter */}
        {/* <Suspense fallback={<div>Loading stats...</div>}>
            <StatsCounter stats={content.stats} />
          </Suspense> */}

        {/* Testimonial Carousel */}
        {/* <Suspense fallback={<div>Loading testimonials...</div>}>
            <TestimonialCarousel testimonials={content.testimonials} />
          </Suspense> */}

        {/* Quick Start Guide CTA */}
        {/* <QuickStartForm onSubmit={() => trackEvent("quick_start_signup")} /> */}

        {/* Affiliate Link Generator */}
        {/* <Suspense fallback={<div>Loading link generator...</div>}>
            <AffiliateLinkGenerator />
          </Suspense> */}

        {/* Performance Tracker */}
        {/* <Suspense fallback={<div>Loading performance tracker...</div>}>
            <PerformanceTracker />
          </Suspense> */}
        {/* <Suspense fallback={<div>Loading Study Planner...</div>}>
            <StudyPlanner />
          </Suspense> */}
        {/* <Suspense
            fallback={<div>Loading Resurce Recommendation Quiz...</div>}
          >
            <ResourceRecommendationQuiz />
          </Suspense> */}
        {/* </div> */}

        {/* Preferences */}
        {/* <Preferences /> */}

        {/* Modal */}
        <ProgramModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          onCtaClick={() => trackEvent("modal_cta_click")}
        />
      </section>
    </PreferencesProvider>
  );
};

export default AffiliateHeroSection;

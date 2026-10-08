"use client";

import { cardVariants, fadeIn } from "@/lib/animations";
import { cn } from "@/utils/cn";
import { motion, useInView } from "framer-motion";
import {
  DollarSign,
  HelpCircle,
  Link as LinkIcon,
  Users,
  PlayCircle,
} from "lucide-react";
import Link from "next/link";
import { Suspense, useCallback, useEffect, useRef, useState } from "react";
import Tilt from "react-parallax-tilt";
import { ProgressStat } from "@/components/MiniApp/ProgressStat";
import { TestimonialsCarousel } from "./TestimonialsCarousel";
import { fetchWhyJoinAffiliateData } from "@/data/fetchAffiliaeData";
import AffiliateLinkGenerator from "@/components/MiniApp/AffiliateLinkGenerator";

const iconMap = {
  DollarSign: <DollarSign className="w-16 h-16 text-blue-600" />,
  Users: <Users className="w-16 h-16 text-blue-600" />,
  LinkIcon: <LinkIcon className="w-16 h-16 text-blue-600" />,
  HelpCircle: <HelpCircle className="w-16 h-16 text-blue-600" />,
};

const gridStyle = {
  gridTemplateAreas: `
    "prefs prefs prefs prefs prefs prefs prefs prefs prefs prefs prefs prefs"
    "heading heading heading heading heading heading heading heading heading heading heading heading"
    "benefits benefits benefits benefits benefits benefits benefits benefits benefits benefits benefits benefits"
    "stats stats stats stats stats stats testimonials testimonials testimonials testimonials testimonials testimonials"
    "video video video video video video video video video video video video"
    "cta cta cta cta cta cta cta cta cta cta cta cta"
  `,
  gridTemplateColumns: "repeat(12, minmax(0, 1fr))",
  gridAutoRows: "auto",
};

export default function WhyJoinAffiliateSection() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [highContrast, setHighContrast] = useState(false);
  const [animationsEnabled, setAnimationsEnabled] = useState(true);

  const sectionRefs = {
    benefits: useRef(null),
    stats: useRef(null),
    testimonials: useRef(null),
    video: useRef(null),
  };

  const inView = {
    benefits: useInView(sectionRefs.benefits, { once: true }),
    stats: useInView(sectionRefs.stats, { once: true }),
    testimonials: useInView(sectionRefs.testimonials, { once: true }),
    video: useInView(sectionRefs.video, { once: true }),
  };

  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      const result = await fetchWhyJoinAffiliateData();
      setData(result);
    } catch (err) {
      console.error(err);
      setError("Failed to load data. Please try again later.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  if (loading) return <div className="text-center py-20">Loading...</div>;
  if (error)
    return <div className="text-center py-20 text-red-600">{error}</div>;
  if (!data)
    return (
      <div className="text-center py-20 text-red-600">No data available.</div>
    );

  return (
    <section
      className={cn(
        "py-20 bg-gradient-to-b from-gray-50 to-blue-50 relative overflow-visible",
        highContrast && "bg-gray-900 text-white"
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid gap-6" style={gridStyle}>
          {/* Preferences */}
          {/* <div style={{ gridArea: "prefs" }} className="flex justify-end gap-3">
            <button
              onClick={() => setHighContrast(!highContrast)}
              className={cn(
                "px-4 py-2 rounded-full bg-gray-100 text-sm font-medium transition-colors",
                highContrast && "bg-gray-600 text-white"
              )}
              aria-label={highContrast ? "Normal mode" : "High contrast mode"}
            >
              {highContrast ? "Normal Mode" : "High Contrast"}
            </button>
            <button
              onClick={() => setAnimationsEnabled(!animationsEnabled)}
              className={cn(
                "px-4 py-2 rounded-full bg-gray-100 text-sm font-medium transition-colors",
                highContrast && "bg-gray-600 text-white"
              )}
              aria-label={
                animationsEnabled ? "Disable animations" : "Enable animations"
              }
            >
              {animationsEnabled ? "Disable Animations" : "Enable Animations"}
            </button>
          </div> */}
          {/* Heading */}
          <motion.div
            style={{ gridArea: "heading" }}
            className="text-center"
            variants={animationsEnabled ? fadeIn : {}}
            initial="hidden"
            animate="visible"
          >
            <Tilt tiltMaxAngleX={10} tiltMaxAngleY={10} tabIndex={0}>
              <h2
                className={cn(
                  "text-3xl md:text-4xl font-bold",
                  highContrast ? "text-white" : "text-gray-900"
                )}
              >
                Why Join AcadeVault’s Affiliate Program?
                <span className="block w-24 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full mx-auto mt-2" />
              </h2>
            </Tilt>
            <p
              className={cn(
                "mt-4 max-w-3xl mx-auto text-base md:text-lg",
                highContrast ? "text-gray-300" : "text-gray-600"
              )}
            >
              Partner with Acadevault to monetize your audience by promoting our
              trusted academic resources to a global market.
            </p>
          </motion.div>

          {/* Benefits */}
          <motion.div
            ref={sectionRefs.benefits}
            style={{ gridArea: "benefits" }}
            variants={animationsEnabled ? fadeIn : {}}
            initial="hidden"
            animate={inView.benefits ? "visible" : "visible"}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {data.benefits.map((b, i) => (
                <motion.div
                  key={b.id}
                  className={cn(
                    "p-6 rounded-lg backdrop-blur-sm bg-white border border-gray-200 shadow-sm",
                    highContrast && "bg-gray-800 border-gray-600 text-white"
                  )}
                  variants={animationsEnabled ? cardVariants : {}}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: i * 0.2 }}
                >
                  <Tilt tiltMaxAngleX={5} tiltMaxAngleY={5} tabIndex={0}>
                    <div className="flex justify-center mb-4">
                      {iconMap[b.iconName] || <span>Icon</span>}
                    </div>
                    <h3 className="text-lg md:text-xl font-semibold text-center mb-2">
                      {b.title}
                    </h3>
                    <p className="text-center text-sm md:text-base">
                      {b.description}
                    </p>
                  </Tilt>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            ref={sectionRefs.stats}
            style={{ gridArea: "stats" }}
            variants={animationsEnabled ? fadeIn : {}}
            initial="hidden"
            animate={inView.stats ? "visible" : "visible"}
          >
            <div className="space-y-6">
              {data.stats.map((s, idx) => (
                <ProgressStat key={idx} {...s} />
              ))}
            </div>
          </motion.div>

          {/* Testimonials */}
          <motion.div
            ref={sectionRefs.testimonials}
            style={{ gridArea: "testimonials" }}
            variants={animationsEnabled ? fadeIn : {}}
            initial="hidden"
            animate={inView.testimonials ? "visible" : "visible"}
            // className="mt-20"
          >
            {/* <TestimonialsCarousel testimonials={data.testimonials} /> */}

            {/* Affiliate Link Generator */}
            <Suspense fallback={<div>Loading link generator...</div>}>
              <AffiliateLinkGenerator />
            </Suspense>
          </motion.div>

          {/* Video + CTA */}
          <motion.div
            style={{ gridArea: "video" }}
            variants={animationsEnabled ? fadeIn : {}}
            initial="hidden"
            animate={inView.video ? "visible" : "visible"}
            className="text-center"
          >
            <h3
              className={cn(
                "text-xl md:text-2xl font-semibold mb-4",
                highContrast ? "text-white" : "text-gray-900"
              )}
            >
              See the Affiliate Program in Action
            </h3>
            <div className="relative max-w-4xl mx-auto rounded-lg overflow-hidden shadow-lg">
              <video
                className="w-full h-48 sm:h-64 md:h-80 lg:h-96 object-cover"
                poster="/images/bg-img-1.jpg"
                controls
                preload="metadata"
                playsInline
                muted
                aria-label="AcadeVault Affiliate Program promotional video"
                tabIndex={0}
              >
                <source
                  src="https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4"
                  type="video/mp4"
                />
                <div className="flex flex-col items-center justify-center h-full bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-300">
                  <PlayCircle className="w-12 h-12 md:w-16 md:h-16" />
                  <span className="mt-2 text-sm md:text-base">
                    Your browser does not support the video tag.
                  </span>
                </div>
              </video>
              <div
                className={cn(
                  "absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 hover:opacity-100 transition-opacity",
                  highContrast && "bg-gray-900"
                )}
                role="button"
                aria-hidden="true"
              >
                <PlayCircle className="w-16 h-16 text-red-500" />
              </div>
            </div>
          </motion.div>

          <motion.div
            style={{ gridArea: "cta" }}
            variants={animationsEnabled ? fadeIn : {}}
            initial="hidden"
            animate="visible"
            className="flex flex-wrap justify-center gap-4 items-center"
          >
            <Link
              href="/affiliate-signup"
              className="px-6 py-3 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 transition-colors text-sm md:text-base"
            >
              Start Earning Today
            </Link>
            <Link
              href="/affiliate-learn-more"
              className="px-6 py-3 bg-gray-200 text-gray-900 rounded-full font-medium hover:bg-gray-300 transition-colors text-sm md:text-base"
            >
              Learn More
            </Link>
          </motion.div>
        </div>

        {/* Mobile CTA */}
        <motion.div
          className="fixed bottom-0 left-0 right-0 bg-white shadow-lg p-4 md:hidden z-50 dark:bg-gray-800"
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Link
            href="/affiliate-signup"
            className="block w-full text-center px-6 py-3 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 transition-colors text-sm"
          >
            Join Now
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

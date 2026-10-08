"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, useInView } from "framer-motion";
import {
  Link as LinkIcon,
  Share2,
  DollarSign,
  Download,
  PlayCircle,
  Calculator,
  BookOpen,
  CheckCircle,
  Star,
} from "lucide-react";
import Link from "next/link";
import Tilt from "react-parallax-tilt";
import { cn } from "@/utils/cn";
import { debounce } from "lodash";
import { Tooltip } from "react-tooltip";
import { Modal } from "@/components/Modal";

// Mock API for affiliate data
const fetchAffiliateData = async () => {
  return {
    steps: [
      {
        id: 1,
        title: "Sign Up",
        description:
          "Join our affiliate program for free and get approved instantly. Start your journey with a user-friendly onboarding process.",
        icon: <LinkIcon className="w-10 h-10 text-blue-600" />,
        tooltip: "Create an account with your email and basic details.",
        subSteps: [
          "Fill out the registration form.",
          "Verify your email address.",
          "Access your affiliate dashboard immediately.",
        ],
        cta: { text: "Start Registration", href: "/affiliate-signup" },
      },
      {
        id: 2,
        title: "Promote AcadeVault",
        description:
          "Share your unique affiliate links through blogs, social media, email campaigns, or videos. Use our high-converting marketing assets.",
        icon: <Share2 className="w-10 h-10 text-blue-600" />,
        tooltip: "Leverage banners, videos, and templates for promotion.",
        subSteps: [
          "Download assets from your dashboard.",
          "Embed links in your content.",
          "Monitor performance with real-time analytics.",
        ],
        cta: { text: "Explore Toolkit", href: "/affiliate-toolkit" },
      },
      {
        id: 3,
        title: "Earn Commissions",
        description:
          "Earn up to 20% commission on every sale with a 30-day cookie window. Receive reliable monthly payouts via PayPal or bank transfer.",
        icon: <DollarSign className="w-10 h-10 text-blue-600" />,
        tooltip: "Track earnings and get paid on time.",
        subSteps: [
          "Track clicks and conversions in real-time.",
          "Get paid monthly with no minimum threshold.",
          "Optimize with advanced strategies.",
        ],
        cta: { text: "View Payout Details", href: "/affiliate-payouts" },
      },
    ],
    tools: [
      {
        id: 1,
        title: "Banner Ads",
        description: "High-quality banners in various sizes for your website.",
        preview: "/previews/banner.jpg",
      },
      {
        id: 2,
        title: "Deep Links",
        description: "Custom links to specific Acadevault products or pages.",
        preview: "/previews/link.jpg",
      },
      {
        id: 3,
        title: "Widgets",
        description: "Interactive widgets to showcase Acadevault resources.",
        preview: "/previews/widget.jpg",
      },
    ],
    guide: {
      url: "/assets/affiliate-guide.pdf",
      title: "AcadeVault Affiliate Guide",
    },
  };
};

// Animation variants
const stepVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.8 } },
};

// Mock analytics tracking
const trackEvent = (event, data) => {
  console.log(`Tracking event: ${event}`, data);
};

// Commission calculator component
const CommissionCalculator = React.memo(({ highContrast }) => {
  const [traffic, setTraffic] = useState(1000);
  const [conversionRate, setConversionRate] = useState(5);
  const [averageSale, setAverageSale] = useState(50);
  const commissionRate = 0.2; // 20%

  const estimatedEarnings = (
    traffic *
    (conversionRate / 100) *
    averageSale *
    commissionRate
  ).toFixed(2);

  const debouncedTrack = debounce((action) => {
    trackEvent(action, {
      traffic,
      conversionRate,
      averageSale,
      estimatedEarnings,
    });
  }, 300);

  return (
    <motion.div
      className={cn(
        "p-6 rounded-lg backdrop-blur-md bg-white/20 border border-gray-200/50 shadow-lg",
        highContrast && "bg-gray-900/80 border-gray-600 text-white"
      )}
      variants={fadeIn}
      initial="hidden"
      animate="visible"
    >
      <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
        <Calculator className="w-6 h-6 text-blue-600" />
        Estimate Your Earnings
      </h3>
      <div className="space-y-4">
        <div>
          <label className="block text-sm text-gray-600" htmlFor="traffic">
            Monthly Traffic
          </label>
          <input
            id="traffic"
            type="number"
            value={traffic}
            onChange={(e) => {
              setTraffic(Number(e.target.value));
              debouncedTrack("updated_traffic_input");
            }}
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-600"
            min="0"
            aria-label="Monthly traffic"
          />
        </div>
        <div>
          <label
            className="block text-sm text-gray-600"
            htmlFor="conversion-rate"
          >
            Conversion Rate (%)
          </label>
          <input
            id="conversion-rate"
            type="number"
            value={conversionRate}
            onChange={(e) => {
              setConversionRate(Number(e.target.value));
              debouncedTrack("updated_conversion_rate_input");
            }}
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-600"
            min="0"
            max="100"
            step="0.1"
            aria-label="Conversion rate"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-600" htmlFor="average-sale">
            Average Sale ($)
          </label>
          <input
            id="average-sale"
            type="number"
            value={averageSale}
            onChange={(e) => {
              setAverageSale(Number(e.target.value));
              debouncedTrack("updated_average_sale_input");
            }}
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-600"
            min="0"
            step="0.01"
            aria-label="Average sale"
          />
        </div>
        <p className="text-lg font-semibold text-blue-600">
          Estimated Monthly Earnings: ${estimatedEarnings}
        </p>
      </div>
    </motion.div>
  );
});

// Tool preview component
const ToolPreview = React.memo(({ tool, highContrast }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      onHoverStart={() =>
        trackEvent("tool_preview_hover", { tool: tool.title })
      }
      className={cn(
        "p-6 rounded-lg backdrop-blur-md bg-white/20 border border-gray-200/50 shadow-lg",
        highContrast && "bg-gray-900/80 border-gray-600 text-white"
      )}
    >
      <Tilt tiltMaxAngleX={5} tiltMaxAngleY={5}>
        <div className="h-32 bg-gray-200 rounded-lg mb-4 flex items-center justify-center">
          <span className="text-gray-500" aria-hidden="true">
            Preview: {tool.title}
          </span>
        </div>
        <h4 className="text-lg font-semibold mb-2">{tool.title}</h4>
        <p className="text-sm text-gray-600">{tool.description}</p>
      </Tilt>
    </motion.div>
  );
});

// Step card component
const StepCard = ({
  step,
  index,
  isInView,
  highContrast,
  animationsEnabled,
  stepsLength,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
    trackEvent("open_step_modal", { step: step.title });
  };

  const closeModal = () => {
    setIsModalOpen(false);
    trackEvent("close_step_modal", { step: step.title });
  };

  return (
    <>
      <motion.div
        className={cn(
          "relative flex items-start space-x-4 p-6 rounded-lg backdrop-blur-md bg-white/20 border border-gray-200/50 shadow-lg hover:shadow-2xl transition-all duration-300",
          highContrast && "bg-gray-900/80 border-gray-600 text-white"
        )}
        variants={animationsEnabled ? stepVariants : null}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        transition={{ delay: index * 0.3 }}
        role="listitem"
        data-tooltip-id={`tooltip-${step.id}`}
        data-tooltip-content={step.tooltip}
      >
        <div className="flex-shrink-0 w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xl font-bold">
          {index + 1}
        </div>
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <div aria-hidden="true">{step.icon}</div>
            <h3 className="text-xl font-semibold">{step.title}</h3>
          </div>
          <p className="text-base text-gray-600">{step.description}</p>
          <button
            onClick={openModal}
            className="mt-4 text-blue-600 hover:underline font-medium"
            aria-label={`Learn more about ${step.title}`}
          >
            Learn More
          </button>
        </div>
        {index < stepsLength - 1 && (
          <motion.div
            className="absolute left-6 top-16 h-12 w-0.5 bg-blue-200"
            initial={{ height: 0 }}
            animate={isInView ? { height: "3rem" } : { height: 0 }}
            transition={{ duration: 0.5, delay: index * 0.3 }}
            aria-hidden="true"
          />
        )}
        <Tooltip id={`tooltip-${step.id}`} className="z-10" />
      </motion.div>

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        closeButton={true}
        title={step.title}
        size="md"
        theme="glass"
        className="max-h-[80vh]"
      >
        <div className="space-y-4">
          <p className="text-gray-600">{step.description}</p>
          <ul className="list-disc pl-5 space-y-2">
            {step.subSteps.map((subStep, i) => (
              <li key={i} className="text-gray-600">
                {subStep}
              </li>
            ))}
          </ul>
          <Link
            href={step.cta.href}
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            onClick={() =>
              trackEvent("cta_click", { step: step.title, cta: step.cta.text })
            }
            aria-label={step.cta.text}
          >
            {step.cta.text}
          </Link>
        </div>
      </Modal>
    </>
  );
};

// Affiliate mega-section
const AffiliatePage = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [highContrast, setHighContrast] = useState(false);
  const [animationsEnabled, setAnimationsEnabled] = useState(true);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // Success stories data
  const stories = [
    {
      quote:
        "I earned $3,000 in commissions promoting AcadeVault to my blog readers!",
      author: "Emeka Okafor, Education Blogger",
      image: "/images/emeka.jpg",
    },
    {
      quote:
        "AcadeVault’s affiliate program is easy to use, and the support team is amazing.",
      author: "Dr. Lisa Chen, Academic Influencer",
      image: "/images/lisa.jpg",
    },
    {
      quote:
        "Promoting AcadeVault helped me generate a steady income stream effortlessly.",
      author: "Sarah Johnson, Study Tips YouTuber",
      image: "/images/sarah.jpg",
    },
    {
      quote:
        "The high-quality materials make it easy to promote AcadeVault to my students.",
      author: "Prof. Ahmed Yusuf, University Lecturer",
      image: "/images/ahmed.jpg",
    },
  ];

  // Fetch affiliate data
  const loadData = useCallback(async () => {
    try {
      setIsLoading(true);
      const result = await fetchAffiliateData();
      setData(result);
      trackEvent("fetch_data_success", {
        sections: ["steps", "tools", "guide"],
      });
    } catch (err) {
      setError("Failed to load data. Please try again later.");
      trackEvent("fetch_data_error", { error: err.message });
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  if (isLoading) {
    return (
      <div className="text-center py-20">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="inline-block w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full"
          aria-label="Loading"
        />
        <p className="mt-2 text-gray-600">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20 text-red-600">
        <p className="mb-4">{error}</p>
        <button
          onClick={loadData}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          aria-label="Retry loading data"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <section
      className={cn(
        "py-20 bg-gradient-to-b from-gray-50 to-blue-50 relative overflow-hidden",
        highContrast && "bg-gray-800 text-white"
      )}
      style={{
        backgroundImage: "url(/images/affiliate-bg-pattern.png)",
        backgroundAttachment: "fixed",
        backgroundSize: "cover",
      }}
    >
      {/* Particle Animation */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute w-1 h-1 bg-blue-400 rounded-full animate-ping opacity-50 top-10 left-20" />
        <div className="absolute w-1 h-1 bg-indigo-400 rounded-full animate-ping opacity-50 top-40 right-30" />
        <div className="absolute w-1 h-1 bg-purple-400 rounded-full animate-ping opacity-50 bottom-20 left-50" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Preferences */}
        <motion.div
          className="flex justify-end gap-3 mb-8"
          variants={animationsEnabled ? fadeIn : null}
          initial="hidden"
          animate="visible"
        >
          <button
            onClick={() => setHighContrast(!highContrast)}
            className={cn(
              "px-4 py-2 rounded-full text-sm font-medium bg-gray-100 hover:bg-gray-200 transition",
              highContrast && "bg-gray-600 text-white hover:bg-gray-700"
            )}
            aria-label="Toggle high contrast mode"
          >
            {highContrast ? "Normal Mode" : "High Contrast"}
          </button>
          <button
            onClick={() => setAnimationsEnabled(!animationsEnabled)}
            className={cn(
              "px-4 py-2 rounded-full text-sm font-medium bg-gray-100 hover:bg-gray-200 transition",
              highContrast && "bg-gray-600 text-white hover:bg-gray-700"
            )}
            aria-label="Toggle animations"
          >
            {animationsEnabled ? "Disable Animations" : "Enable Animations"}
          </button>
        </motion.div>

        {/* Custom Grid Layout */}
        <div className="grid gap-12 lg:gap-16">
          {/* How It Works */}
          <motion.div
            ref={ref}
            className="space-y-8"
            variants={animationsEnabled ? fadeIn : null}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <Tilt tiltMaxAngleX={10} tiltMaxAngleY={10}>
              <h2
                className={cn(
                  "text-4xl md:text-5xl font-bold text-center relative",
                  highContrast ? "text-white" : "text-gray-900"
                )}
                aria-label="How the AcadeVault Affiliate Program Works"
              >
                How It Works
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full mt-2" />
              </h2>
            </Tilt>
            <p
              className={cn(
                "text-lg text-center max-w-3xl mx-auto",
                highContrast ? "text-gray-300" : "text-gray-600"
              )}
            >
              Get started with the AcadeVault affiliate program in three simple
              steps and earn commissions by promoting our academic resources.
            </p>
            <div
              className="space-y-8 max-w-3xl mx-auto"
              role="list"
              aria-describedby="affiliate-steps"
            >
              {data.steps?.length ? (
                data.steps.map((step, index) => (
                  <StepCard
                    key={step.id}
                    step={step}
                    index={index}
                    isInView={isInView}
                    highContrast={highContrast}
                    animationsEnabled={animationsEnabled}
                    stepsLength={data.steps.length}
                  />
                ))
              ) : (
                <p className="text-center text-gray-600">
                  No steps available at this time.
                </p>
              )}
            </div>
            <div className="max-w-3xl mx-auto">
              <CommissionCalculator highContrast={highContrast} />
            </div>
            <div className="text-center mt-8">
              <Link
                href="/affiliate-signup"
                className={cn(
                  "inline-flex items-center px-8 py-4 bg-blue-600 text-white text-lg font-medium rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200",
                  highContrast && "bg-blue-800 hover:bg-blue-900"
                )}
                aria-label="Join the Affiliate Program"
                onClick={() =>
                  trackEvent("how_it_works_cta_click", {
                    source: "how_it_works",
                  })
                }
              >
                Join Now
              </Link>
            </div>
          </motion.div>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-blue-200 to-transparent" />

          {/* Earning Potential */}
          <motion.div
            className="space-y-8"
            variants={animationsEnabled ? fadeIn : null}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <h2
              className={cn(
                "text-4xl font-bold text-center flex items-center justify-center gap-3",
                highContrast ? "text-white" : "text-gray-800"
              )}
            >
              <DollarSign className="w-10 h-10 text-blue-600" />
              Unlock Your Earning Potential
            </h2>
            <p
              className={cn(
                "text-lg text-center max-w-3xl mx-auto",
                highContrast ? "text-gray-300" : "text-gray-600"
              )}
            >
              Join AcadeVault’s affiliate program and earn up to 20% commission
              on every sale. With no cap on earnings, your income potential is
              limitless when you promote our premium academic materials, writer
              services, or subscriptions.
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <motion.div
                className={cn(
                  "p-8 rounded-xl backdrop-blur-md bg-white/20 border border-gray-200/50 shadow-lg hover:shadow-xl transition duration-300",
                  highContrast && "bg-gray-900/80 border-gray-600 text-white"
                )}
                whileHover={{ scale: 1.05 }}
              >
                <h3 className="text-xl font-semibold text-blue-600 mb-4">
                  Commission Structure
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>20% commission on academic material sales</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>15% commission on writer services</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>10% commission on subscriptions</span>
                  </li>
                </ul>
              </motion.div>
              <motion.div
                className={cn(
                  "p-8 rounded-xl backdrop-blur-md bg-white/20 border border-gray-200/50 shadow-lg hover:shadow-xl transition duration-300",
                  highContrast && "bg-gray-900/80 border-gray-600 text-white"
                )}
                whileHover={{ scale: 1.05 }}
              >
                <h3 className="text-xl font-semibold text-blue-600 mb-4">
                  Reliable Payouts
                </h3>
                <p>
                  Get paid monthly via Paystack or Stripe with a minimum payout
                  threshold of $50. Track your earnings in real-time using our
                  transparent affiliate dashboard.
                </p>
              </motion.div>
              <motion.div
                className={cn(
                  "p-8 rounded-xl backdrop-blur-md bg-white/20 border border-gray-200/50 shadow-lg hover:shadow-xl transition duration-300",
                  highContrast && "bg-gray-900/80 border-gray-600 text-white"
                )}
                whileHover={{ scale: 1.05 }}
              >
                <h3 className="text-xl font-semibold text-blue-600 mb-4">
                  Unlimited Earnings
                </h3>
                <p>
                  There’s no limit to your commissions. The more you promote
                  AcadeVault, the more you earn, with high-converting products
                  designed for academic audiences.
                </p>
              </motion.div>
            </div>
            <div className="text-center">
              <Link
                href="/affiliate-signup"
                className={cn(
                  "inline-flex items-center px-8 py-4 bg-blue-600 text-white text-lg font-medium rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200",
                  highContrast && "bg-blue-800 hover:bg-blue-900"
                )}
                aria-label="Start Earning Now"
                onClick={() =>
                  trackEvent("earning_potential_cta_click", {
                    source: "earning_potential",
                  })
                }
              >
                Start Earning Now
              </Link>
            </div>
          </motion.div>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-blue-200 to-transparent" />

          {/* Promotional Tools */}
          <motion.div
            className="space-y-8"
            variants={animationsEnabled ? fadeIn : null}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <h3
              className={cn(
                "text-2xl font-semibold text-center mb-8",
                highContrast ? "text-white" : "text-gray-800"
              )}
            >
              Promotional Tools
            </h3>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
              {data.tools?.length ? (
                data.tools.map((tool) => (
                  <ToolPreview
                    key={tool.id}
                    tool={tool}
                    highContrast={highContrast}
                  />
                ))
              ) : (
                <p className="text-center text-gray-600 col-span-3">
                  No tools available at this time.
                </p>
              )}
            </div>
          </motion.div>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-blue-200 to-transparent" />

          {/* Resources */}
          <motion.div
            className="space-y-8"
            variants={animationsEnabled ? fadeIn : null}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <h2
              className={cn(
                "text-4xl font-bold text-center flex items-center justify-center gap-3",
                highContrast ? "text-white" : "text-gray-800"
              )}
            >
              <BookOpen className="w-10 h-10 text-blue-600" />
              Affiliate Resources
            </h2>
            <p
              className={cn(
                "text-lg text-center max-w-3xl mx-auto",
                highContrast ? "text-gray-300" : "text-gray-600"
              )}
            >
              Kickstart your success with AcadeVault’s comprehensive suite of
              tools and guides, designed to help you effectively promote our
              academic platform.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/help-center/guides/affiliate-start"
                className={cn(
                  "px-8 py-3 rounded-full font-semibold transition duration-300",
                  highContrast
                    ? "bg-blue-800 text-white hover:bg-blue-900"
                    : "bg-blue-600 text-white hover:bg-blue-700"
                )}
                onClick={() =>
                  trackEvent("resource_cta_click", {
                    resource: "affiliate_guide",
                  })
                }
              >
                Affiliate Guide
              </Link>
              <Link
                href="/affiliate/tools"
                className={cn(
                  "px-8 py-3 rounded-full font-semibold transition duration-300",
                  highContrast
                    ? "bg-green-800 text-white hover:bg-green-900"
                    : "bg-green-500 text-white hover:bg-green-600"
                )}
                onClick={() =>
                  trackEvent("resource_cta_click", {
                    resource: "marketing_tools",
                  })
                }
              >
                Marketing Tools
              </Link>
              <Link
                href="/affiliate/banners"
                className={cn(
                  "px-8 py-3 rounded-full font-semibold transition duration-300",
                  highContrast
                    ? "bg-purple-800 text-white hover:bg-purple-900"
                    : "bg-purple-500 text-white hover:bg-purple-600"
                )}
                onClick={() =>
                  trackEvent("resource_cta_click", { resource: "banner_ads" })
                }
              >
                Banner Ads
              </Link>
              <Link
                href="/affiliate/social-media-kit"
                className={cn(
                  "px-8 py-3 rounded-full font-semibold transition duration-300",
                  highContrast
                    ? "bg-orange-800 text-white hover:bg-orange-900"
                    : "bg-orange-500 text-white hover:bg-orange-600"
                )}
                onClick={() =>
                  trackEvent("resource_cta_click", {
                    resource: "social_media_kit",
                  })
                }
              >
                Social Media Kit
              </Link>
              <Link
                href="/affiliate/support"
                className={cn(
                  "px-8 py-3 rounded-full font-semibold transition duration-300",
                  highContrast
                    ? "bg-indigo-800 text-white hover:bg-indigo-900"
                    : "bg-indigo-500 text-white hover:bg-indigo-600"
                )}
                onClick={() =>
                  trackEvent("resource_cta_click", {
                    resource: "support_center",
                  })
                }
              >
                Support Center
              </Link>
            </div>
            <p
              className={cn(
                "text-sm text-center",
                highContrast ? "text-gray-400" : "text-gray-500"
              )}
            >
              Need help? Our dedicated affiliate support team is available 24/7
              to assist you.
            </p>
          </motion.div>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-blue-200 to-transparent" />

          {/* Success Stories */}
          <motion.div
            className="space-y-8"
            variants={animationsEnabled ? fadeIn : null}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <h2
              className={cn(
                "text-4xl font-bold text-center flex items-center justify-center gap-3",
                highContrast ? "text-white" : "text-gray-800"
              )}
            >
              <Star className="w-10 h-10 text-yellow-500" />
              Affiliate Success Stories
            </h2>
            <p
              className={cn(
                "text-lg text-center max-w-3xl mx-auto",
                highContrast ? "text-gray-300" : "text-gray-600"
              )}
            >
              Hear from our affiliates who are thriving with AcadeVault’s
              affiliate program.
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
              {stories.map((story, index) => (
                <motion.div
                  key={index}
                  className={cn(
                    "p-6 rounded-lg backdrop-blur-md bg-white/20 border border-gray-200/50 shadow-lg hover:shadow-xl transition duration-300",
                    highContrast && "bg-gray-900/80 border-gray-600 text-white"
                  )}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="flex items-center mb-4">
                    <img
                      src={story.image}
                      alt={story.author}
                      className="w-12 h-12 rounded-full mr-4 object-cover"
                    />
                    <div>
                      <p className="font-semibold">{story.author}</p>
                    </div>
                  </div>
                  <p className="italic text-sm">“{story.quote}”</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Video Section */}
          <motion.div
            className="space-y-8 text-center"
            variants={animationsEnabled ? fadeIn : null}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <h3
              className={cn(
                "text-2xl font-semibold",
                highContrast ? "text-white" : "text-gray-800"
              )}
            >
              See the Affiliate Program in Action
            </h3>
            <button
              className="relative h-64 md:h-96 max-w-4xl mx-auto bg-gray-200 rounded-lg flex items-center justify-center w-full"
              onClick={() =>
                trackEvent("video_placeholder_click", {
                  section: "how_it_works",
                })
              }
              aria-label="Play affiliate program video"
            >
              <PlayCircle className="w-16 h-16 text-gray-500" />
              <span className="ml-2 text-gray-500">Video Placeholder</span>
            </button>
          </motion.div>

          {/* Download Guide CTA */}
          <motion.div
            className="text-center mt-12"
            variants={animationsEnabled ? fadeIn : null}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {data.guide ? (
              <a
                href={data.guide.url}
                download
                className={cn(
                  "inline-flex items-center px-8 py-4 bg-blue-600 text-white text-lg font-medium rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200",
                  highContrast && "bg-blue-800 hover:bg-blue-900"
                )}
                aria-label="Download the AcadeVault Affiliate Guide"
                onClick={() =>
                  trackEvent("download_guide", { guide: data.guide.title })
                }
              >
                <Download className="w-5 h-5 mr-2" />
                Download Affiliate Guide
              </a>
            ) : (
              <button
                className="inline-flex items-center px-8 py-4 bg-blue-600 text-white text-lg font-medium rounded-full opacity-50 cursor-not-allowed"
                disabled
                aria-label="Loading Affiliate Guide"
              >
                {isLoading ? "Loading..." : "Guide Unavailable"}
              </button>
            )}
          </motion.div>

          {/* Final CTA */}
          <motion.div
            className="text-center mt-8"
            variants={animationsEnabled ? fadeIn : null}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <p
              className={cn(
                "text-lg",
                highContrast ? "text-gray-300" : "text-gray-600"
              )}
            >
              Ready to start?{" "}
              <Link
                href="/affiliate-signup"
                className="text-blue-600 hover:underline font-medium"
                aria-label="Sign up for the AcadeVault Affiliate Program"
                onClick={() =>
                  trackEvent("signup_link_click", { source: "affiliate_page" })
                }
              >
                Join the Affiliate Program Now
              </Link>
            </p>
          </motion.div>

          {/* Sticky CTA for Mobile */}
          <motion.div
            className="fixed bottom-0 left-0 right-0 bg-white shadow-lg p-4 md:hidden z-50"
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Link
              href="/affiliate-signup"
              className="block w-full text-center px-6 py-3 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700"
              aria-label="Join Now from Mobile"
              onClick={() =>
                trackEvent("mobile_cta_click", { source: "affiliate_page" })
              }
            >
              Join Now
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AffiliatePage;

// "use client";

// import { motion } from "framer-motion";
// import { AiOutlineCheckCircle } from "react-icons/ai";

// import { FaGift, FaRocket, FaUserTie, FaCrown } from "react-icons/fa";
// import { HiSparkles } from "react-icons/hi2";

// const benefits = [
//   {
//     icon: <FaUserTie className="text-green-400 text-3xl" />,
//     title: "Seller Referral",
//     desc: "Earn 5% lifetime commission from vendors you refer. Passive revenue for life.",
//   },
//   {
//     icon: <FaGift className="text-yellow-300 text-3xl" />,
//     title: "Buyer Referral",
//     desc: "Receive 10% commission on purchases made by your referred buyers.",
//   },
//   {
//     icon: <HiSparkles className="text-pink-300 text-3xl" />,
//     title: "Bonus Streaks",
//     desc: "Earn multipliers and exclusive bonuses through referral streaks.",
//   },
//   {
//     icon: <FaRocket className="text-purple-300 text-3xl" />,
//     title: "Fast Payouts",
//     desc: "Withdraw commissions via bank or crypto with < 24hr processing.",
//   },
// ];

// const sellerSteps = [
//   "Share your referral code with vendors.",
//   "Vendors register and link to your account automatically.",
//   "Earn 5% on every product they sell, forever.",
//   "Track all vendor performance in real-time on your dashboard.",
//   "Withdraw anytime. Fast payouts within 24 hours.",
// ];

// const buyerSteps = [
//   "Refer buyers using your unique referral code.",
//   "Buyers apply your code at checkout or register through your link.",
//   "Earn 10% on every order they complete.",
//   "No caps, no expiry—earn continuously from all purchases.",
//   "Commissions track instantly. Withdraw with no minimum balance.",
// ];

// export default function TestComponent() {
//   return (
//     <section className="bg-gradient-to-br from-blue-900 via-blue-700 to-blue-800 text-white py-24 px-6 md:px-20 shadow-2xl relative overflow-hidden">
//       {/* Noise Texture */}
//       <div className="absolute inset-0 pointer-events-none">
//         <div className="w-full h-full bg-noise opacity-[0.03] mix-blend-soft-light" />
//       </div>

//       {/* Glow Ball */}
//       <div className="absolute top-0 right-0 w-72 h-72 bg-blue-100 rounded-full blur-3xl opacity-25 animate-pulse pointer-events-none" />

//       {/* Section Header */}
//       <motion.div
//         className="text-center border-b-4 border-yellow-500 inline-block mb-10 pb-2"
//         initial={{ opacity: 0, y: 30 }}
//         whileInView={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.6 }}
//       >
//         <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight">
//           Refer & Earn on <span className="text-blue-400">AcadeVault</span>
//         </h2>
//       </motion.div>

//       {/* Headline */}
//       <h2 className="text-2xl md:text-3xl font-semibold text-center mb-6">
//         Invite Sellers & Buyers — Earn up to{" "}
//         <span className="text-yellow-300">30% Commission</span>
//       </h2>

//       {/* Subtext */}
//       <p className="text-blue-100 text-lg leading-relaxed max-w-3xl mx-auto bg-white/5 backdrop-blur-sm p-6 rounded-lg border border-white/10 shadow-md">
//         Earn passive income by referring vendors, buyers, and academic
//         contributors to AcadeVault. Your network is your financial opportunity.
//       </p>

//       {/* Benefits */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-20 mt-12">
//         {benefits.map((item, idx) => (
//           <ReferralBenefitCard
//             key={idx}
//             icon={item.icon}
//             title={item.title}
//             desc={item.desc}
//           />
//         ))}
//       </div>

//       {/* Referral Steps */}
//       <div className="grid md:grid-cols-2 gap-16 mb-20">
//         <ReferralSteps type="seller" steps={sellerSteps} />
//         <ReferralSteps type="buyer" steps={buyerSteps} />
//       </div>

//       {/* Tiered System */}
//       <ReferralTiers />

//       {/* Leaderboard Preview */}
//       <ReferralLeaderboardPreview />

//       {/* Social Proof */}
//       <ReferralSocialProof />

//       {/* Call To Action */}
//       <ReferralCTA />
//     </section>
//   );
// }

// function ReferralCTA() {
//   return (
//     <div className="text-center mt-20">
//       <a
//         href="/dashboard/referrals"
//         className="inline-block bg-yellow-400 hover:bg-yellow-300 text-blue-900 font-semibold py-3 px-10 rounded-full shadow-lg text-lg transition-all"
//       >
//         Go to Referral Dashboard →
//       </a>
//       <p className="text-sm text-blue-200 mt-3">
//         Manage your codes, track commissions, and withdraw funds with ease.
//       </p>
//     </div>
//   );
// }

// function ReferralTiers() {
//   const tiers = [
//     { level: "Bronze", target: "1-10 referrals", bonus: "5% commission" },
//     { level: "Silver", target: "11-50 referrals", bonus: "7% commission" },
//     { level: "Gold", target: "51-200 referrals", bonus: "10% commission" },
//     {
//       level: "Platinum",
//       target: "200+ referrals",
//       bonus: "15% commission + perks",
//     },
//   ];

//   return (
//     <div className="mt-24 text-center">
//       <h3 className="text-3xl font-bold mb-6">Climb the Referral Tiers</h3>
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
//         {tiers.map((tier, idx) => (
//           <div
//             key={idx}
//             className="bg-white/5 p-6 rounded-xl shadow-lg backdrop-blur-md"
//           >
//             <h4 className="text-xl font-bold text-yellow-300 mb-2">
//               {tier.level}
//             </h4>
//             <p className="text-sm text-blue-100 mb-2">{tier.target}</p>
//             <p className="text-blue-300 font-semibold">{tier.bonus}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// function ReferralLeaderboardPreview() {
//   const topReferrers = [
//     { name: "Jane D.", earnings: "₦150,000" },
//     { name: "Michael O.", earnings: "₦120,000" },
//     { name: "Amaka E.", earnings: "₦100,000" },
//   ];

//   return (
//     <div className="mt-24 text-center">
//       <h3 className="text-3xl font-bold mb-6">Top Referrers This Month</h3>
//       <ul className="max-w-md mx-auto space-y-4">
//         {topReferrers.map((referrer, idx) => (
//           <li
//             key={idx}
//             className="bg-white/10 p-4 rounded-lg flex justify-between items-center text-blue-100"
//           >
//             <span className="font-medium">{referrer.name}</span>
//             <span className="text-yellow-300 font-bold">
//               {referrer.earnings}
//             </span>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// function ReferralSocialProof() {
//   return (
//     <div className="mt-24 text-center">
//       <h3 className="text-3xl font-bold mb-6">
//         Why Referrers Trust AcadeVault
//       </h3>
//       <p className="text-blue-100 max-w-2xl mx-auto mb-10">
//         Join thousands of students, educators, and academic vendors who are
//         already earning steady income through AcadeVault's trusted referral
//         network.
//       </p>
//       <div className="flex justify-center gap-6 flex-wrap">
//         <img src="/images/trust1.png" alt="Trust Badge" className="w-24" />
//         <img src="/images/trust2.png" alt="Trust Badge" className="w-24" />
//         <img src="/images/trust3.png" alt="Trust Badge" className="w-24" />
//       </div>
//     </div>
//   );
// }

// function ReferralSteps({ type, steps }) {
//   const isSeller = type === "seller";

//   return (
//     <div
//       className={`p-8 rounded-2xl shadow-xl ${
//         isSeller
//           ? "bg-white text-gray-800"
//           : "bg-blue-800/40 text-blue-100 backdrop-blur-md"
//       }`}
//     >
//       <h3
//         className={`text-2xl font-bold mb-4 ${
//           isSeller ? "text-blue-900" : "text-yellow-300"
//         }`}
//       >
//         {isSeller ? "Seller Referral" : "Buyer Referral"}
//       </h3>

//       <ul
//         className={
//           isSeller ? "list-decimal list-inside space-y-4" : "space-y-6"
//         }
//       >
//         {steps.map((step, index) => (
//           <li
//             key={index}
//             className={`leading-relaxed ${
//               isSeller ? "text-base" : "flex items-start gap-4 text-sm"
//             }`}
//           >
//             {!isSeller && (
//               <AiOutlineCheckCircle
//                 className="text-yellow-400 mt-1"
//                 size={20}
//               />
//             )}
//             {step}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// function ReferralBenefitCard({ icon, title, desc }) {
//   return (
//     <motion.div
//       whileHover={{ scale: 1.05 }}
//       className="bg-white/5 backdrop-blur-lg p-6 rounded-xl border border-white/10 shadow-md transition-all duration-300"
//     >
//       <div className="mb-4">{icon}</div>
//       <h4 className="font-semibold text-xl mb-2">{title}</h4>
//       <p className="text-sm text-blue-100 leading-relaxed">{desc}</p>
//     </motion.div>
//   );
// }

// "use client";

// import { motion, useScroll, useTransform } from "framer-motion";
// import Image from "next/image";
// import Link from "next/link";
// import { useEffect, useRef, useState } from "react";

// const icons = [
//   "/media/logo1.png",
//   "/media/logo2.png",
//   "/media/logo3.png",
//   "/media/logo4.jpg",
//   "/media/logo5.jpg",
//   "/media/logo1.png",
//   "/media/logo4.jpg",
//   "/media/logo3.png",
// ];

// function TextComponent() {
//   const sectionRef = useRef(null);
//   const { scrollYProgress } = useScroll({
//     target: sectionRef,
//     offset: ["start end", "end start"],
//   });

//   // Parallax effect for background
//   const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

//   // State to control stats card visibility
//   const [showStatsCard, setShowStatsCard] = useState(false);

//   useEffect(() => {
//     // Check local storage to see if card was previously dismissed
//     const isDismissed = localStorage.getItem("statsCardDismissed");
//     if (!isDismissed) {
//       setShowStatsCard(true);
//       // Auto-dismiss after 8 seconds
//       const timer = setTimeout(() => {
//         setShowStatsCard(false);
//       }, 8000);
//       return () => clearTimeout(timer);
//     }
//   }, []);

//   const handleCloseStatsCard = () => {
//     setShowStatsCard(false);
//     // Store dismissal in local storage
//     localStorage.setItem("statsCardDismissed", "true");
//   };

//   return (
//     <section
//       ref={sectionRef}
//       className="relative bg-gradient-to-br from-[#1e3a8a] to-[#60a5fa] py-8 md:py-16 px-6 overflow-hidden"
//     >
//       {/* Particle Background */}
//       <div className="absolute inset-0 pointer-events-none">
//         <div className="absolute inset-0 bg-[url('/media/particle-bg2.jpg')] bg-cover opacity-10 animate-pulse" />
//         <motion.div
//           className="absolute inset-0 bg-gradient-to-t from-transparent to-black/20"
//           style={{ y: backgroundY }}
//         />
//       </div>

//       <div className="max-w-7xl mx-auto grid lg:grid-cols-2 items-center gap-12 relative z-10">
//         {/* Left Text Content */}
//         <motion.div
//           initial={{ opacity: 0, x: -50 }}
//           animate={{ opacity: 1, x: 0 }}
//           transition={{ duration: 0.8, ease: "easeOut" }}
//           className="space-y-4"
//         >
//           <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight">
//             Refer & Earn with{" "}
//             <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#93c5fd] to-[#2563eb]">
//               AcadeVault
//             </span>
//           </h1>
//           <p className="text-lg sm:text-xl text-gray-200 max-w-md leading-relaxed">
//             Share the power of Acadevault with friends, earn generous rewards,
//             and build a community of learners. It’s simple, seamless, and highly
//             rewarding!
//           </p>
//           <div className="flex gap-4">
//             <Link
//               href="/refer"
//               className="inline-block px-8 py-3 bg-[#2563eb] text-white font-semibold rounded-full hover:bg-[#1e40af] transition-all duration-300 shadow-lg hover:shadow-xl"
//             >
//               Start Referring Now
//             </Link>
//             <Link
//               href="/learn-more"
//               className="inline-block px-8 py-3 bg-transparent border-2 border-white text-white font-semibold rounded-full hover:bg-white hover:text-[#2563eb] transition-all duration-300"
//             >
//               Learn More
//             </Link>
//           </div>
//         </motion.div>

//         {/* Right Floating Icons with Hover Effects */}
//         <div className="relative w-full h-[350px]">
//           {icons.map((src, i) => (
//             <motion.div
//               key={i}
//               className="absolute w-16 h-16 sm:w-20 sm:h-20"
//               style={{
//                 top: `${50 + 40 * Math.sin((i / icons.length) * 2 * Math.PI)}%`,
//                 left: `${
//                   50 + 40 * Math.cos((i / icons.length) * 2 * Math.PI)
//                 }%`,
//                 transform: "translate(-50%, -50%)",
//               }}
//               initial={{ opacity: 0, scale: 0.8, rotate: 0 }}
//               animate={{ opacity: 1, scale: 1, rotate: 360 }}
//               transition={{
//                 opacity: { duration: 0.6, delay: i * 0.2 },
//                 scale: { duration: 0.6, delay: i * 0.2 },
//                 rotate: { duration: 20, repeat: Infinity, ease: "linear" },
//               }}
//               whileHover={{
//                 scale: 1.2,
//                 boxShadow: "0 0 15px rgba(255,255,255,0.5)",
//               }}
//             >
//               <Image
//                 src={src}
//                 alt={`App icon ${i + 1}`}
//                 width={80}
//                 height={80}
//                 className="rounded-2xl shadow-lg object-cover"
//                 priority={i < 3}
//               />
//             </motion.div>
//           ))}
//         </div>
//       </div>

//       {/* Enhanced Floating Stats Card */}
//       {showStatsCard && (
//         <motion.div
//           className="fixed inset-0 flex items-center justify-center z-50 p-4 top-50"
//           initial={{ opacity: 0, scale: 0.8 }}
//           animate={{ opacity: 1, scale: 1 }}
//           exit={{ opacity: 0, scale: 0.8 }}
//           transition={{ duration: 0.5, ease: "easeInOut" }}
//         >
//           <div className="relative bg-white/95 backdrop-blur-lg p-8 rounded-2xl shadow-2xl max-w-sm w-full border border-gray-100">
//             {/* Close Button */}
//             <button
//               onClick={handleCloseStatsCard}
//               className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors"
//               aria-label="Close stats card"
//             >
//               <svg
//                 className="w-6 h-6"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//                 xmlns="http://www.w3.org/2000/svg"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M6 18L18 6M6 6l12 12"
//                 />
//               </svg>
//             </button>

//             <h3 className="text-xl font-bold text-gray-900 mb-4">
//               Why Refer AcadeVault?
//             </h3>
//             <ul className="space-y-3 text-gray-700">
//               <li className="flex items-start gap-3">
//                 <span className="text-[#2563eb] text-lg">✔</span>
//                 <span>
//                   <strong>Earn up to $50</strong> for every successful referral.
//                 </span>
//               </li>
//               <li className="flex items-start gap-3">
//                 <span className="text-[#2563eb] text-lg">✔</span>
//                 <span>
//                   <strong>Instant payouts</strong> to your preferred account.
//                 </span>
//               </li>
//               <li className="flex items-start gap-3">
//                 <span className="text-[#2563eb] text-lg">✔</span>
//                 <span>
//                   <strong>Expand your network</strong> with like-minded
//                   learners.
//                 </span>
//               </li>
//               <li className="flex items-start gap-3">
//                 <span className="text-[#2563eb] text-lg">✔</span>
//                 <span>
//                   <strong>Exclusive perks</strong> for top referrers.
//                 </span>
//               </li>
//             </ul>
//             <div className="mt-6">
//               <Link
//                 href="/refer"
//                 className="inline-block w-full text-center px-6 py-3 bg-[#2563eb] text-white font-semibold rounded-full hover:bg-[#1e40af] transition-all duration-300"
//                 onClick={handleCloseStatsCard}
//               >
//                 Refer Now
//               </Link>
//             </div>
//           </div>
//         </motion.div>
//       )}
//     </section>
//   );
// }

// export default TextComponent;

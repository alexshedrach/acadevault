"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useCallback } from "react";

/**
 * Creates an analytics client with support for multiple providers.
 * Uses a singleton pattern to ensure a single instance across the app.
 */
const createAnalyticsClient = () => {
  let initialized = false;

  // Placeholder for real provider SDK (e.g., Google Analytics, Mixpanel)
  const provider = {
    initialize: () => {
      if (initialized) return;
      initialized = true;

      // Example: Initialize Google Analytics
      if (typeof window !== "undefined" && process.env.NEXT_PUBLIC_GA_ID) {
        const script = document.createElement("script");
        script.async = true;
        script.src = `https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`;
        document.head.appendChild(script);

        window.dataLayer = window.dataLayer || [];
        function gtag(...args) {
          window.dataLayer.push(args);
        }
        gtag("js", new Date());
        gtag("config", process.env.NEXT_PUBLIC_GA_ID, {
          page_path: window.location.pathname,
        });
      }

      console.log("[Analytics] Initialized");
    },

    trackPageview: (path) => {
      if (!initialized) provider.initialize();
      // Example: Google Analytics pageview
      if (typeof window !== "undefined" && window.gtag) {
        window.gtag("event", "page_view", { page_path: path });
      }
      console.log(`[Analytics] Pageview: ${path}`);
    },

    trackEvent: (name, props = {}) => {
      if (!initialized) provider.initialize();
      // Example: Google Analytics event
      if (typeof window !== "undefined" && window.gtag) {
        window.gtag("event", name, props);
      }
      console.log(`[Analytics] Event: ${name}`, props);
    },
  };

  return {
    init: provider.initialize,
    trackPageview: provider.trackPageview,
    trackEvent: (name, props = {}) => {
      try {
        provider.trackEvent(name, {
          ...props,
          timestamp: new Date().toISOString(),
        });
      } catch (error) {
        console.error(`[Analytics] Error tracking event ${name}:`, error);
      }
    },
  };
};

// Singleton instance
const analytics = createAnalyticsClient();

/**
 * Custom hook for analytics tracking in a Next.js app.
 * Tracks pageviews on route changes and provides a function to track custom events.
 * @returns {{ trackEvent: (name: string, props?: AnalyticsProps) => void }}
 */
export default function useAnalytics() {
  const router = useRouter();
  const isFirstLoad = useRef(true);

  // Initialize analytics and track initial pageview
  useEffect(() => {
    if (isFirstLoad.current) {
      analytics.init();
      const path = window.location.pathname + window.location.search;
      analytics.trackPageview(path);
      isFirstLoad.current = false;
    }
  }, []);

  // Track pageviews on route changes
  useEffect(() => {
    const handleRouteChange = (url) => {
      // Extract pathname and search params from URL
      const path =
        new URL(url, window.location.origin).pathname +
        new URL(url, window.location.origin).search;
      analytics.trackPageview(path);
    };

    // Use Next.js router events for client-side navigation
    router?.events?.on("routeChangeComplete", handleRouteChange);
    return () => {
      router?.events?.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  // Memoized event tracking function
  const trackEvent = useCallback((name, props = {}) => {
    analytics.trackEvent(name, props);
  }, []);

  return { trackEvent };
}


// Usage Example

// import useAnalytics from "@/hooks/useAnalytics";

// function Component() {
//   const { trackEvent } = useAnalytics();

//   return (
//     <button
//       onClick={() =>
//         trackEvent("Button Clicked", { label: "Subscribe", category: "CTA" })
//       }
//     >
//       Subscribe Now
//     </button>
//   );
// }
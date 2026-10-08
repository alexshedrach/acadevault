"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import AnnouncementBar from "./AnnouncementBar";
import GlobalPromoTickerBar from "./GlobalPromoTickerBar";
import Navbar from "./Navbar";

const Header = () => {
  const [isSticky, setIsSticky] = useState(false);
  const triggerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsSticky(!entry.isIntersecting);
      },
      {
        threshold: 0,
        rootMargin: "-2px 0px 0px 0px", // Slightly larger margin for stability
      }
    );

    const currentTrigger = triggerRef.current;
    if (currentTrigger) {
      observer.observe(currentTrigger);
    }

    return () => {
      if (currentTrigger) observer.unobserve(currentTrigger);
    };
  }, []);

  return (
    <header className="w-full relative z-[999] overflow-visible">
      {/* Announcement */}
      <AnnouncementBar />

      {/* Promo Ticker */}
      <GlobalPromoTickerBar />

      {/* Invisible trigger to detect sticky threshold */}
      <div ref={triggerRef} className="h-1" aria-hidden="true" />

      {/* Navbar with animation */}
      <motion.div
        initial={false}
        animate={{
          y: isSticky ? 0 : 0,
          opacity: isSticky ? 0.98 : 1,
          boxShadow: isSticky
            ? "0 4px 16px rgba(0,0,0,0.1)"
            : "0 1px 2px rgba(0,0,0,0.05)",
          backdropFilter: isSticky ? "blur(12px)" : "none",
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className={`${
          isSticky
            ? "fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-md z-50"
            : "relative bg-white"
        }`}
      >
        {/* <Navbar showSearch={true} showCategories={false} /> */}
      </motion.div>
    </header>
  );
};

export default Header;


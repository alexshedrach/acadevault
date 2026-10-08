"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Tag,
  PhoneCall,
  Gift,
  BookOpen,
  ShoppingCart,
  Star,
} from "lucide-react";
import Link from "next/link";

const AnnouncementBar = () => {
  const announcements = useMemo(
    () => [
      {
        text: "📚 30% OFF all Digital Course Bundles – This Week Only!",
        icon: <Tag size={18} />,
      },
      {
        text: "🎓 Access Verified Academic Materials from Top Tutors!",
        icon: <BookOpen size={18} />,
      },
      {
        text: "🛍️ Buy 2 Notes, Get 1 Free – Academic Deals Inside!",
        icon: <ShoppingCart size={18} />,
      },
      {
        text: "🎁 Refer & Earn — Invite Friends, Get Discounts!",
        icon: <Gift size={18} />,
      },
      {
        text: "⭐ Top-Rated Tutors Available — Learn from the Best!",
        icon: <Star size={18} />,
      },
      {
        text: "📞 Support Line: 0814 687 0361 — We’re Here to Help!",
        icon: <PhoneCall size={18} />,
      },
    ],
    []
  );

  const [index, setIndex] = useState(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setIndex((prev) => (prev + 1) % announcements.length);
    }, 5000);

    return () => clearInterval(intervalRef.current);
  }, [announcements.length]);
  
  return (
    <div
      role="region"
      aria-label="System announcements"
      className="w-full bg-gradient-to-r from-blue-900 to-blue-500 text-white px-4 sm:px-6 py-2 flex flex-col md:flex-row items-center justify-between gap-3 shadow z-50"
    >
      {/* Left: Label */}
      <div className="flex items-center gap-2 text-sm sm:text-base font-semibold tracking-wide uppercase">
        📣 What's New?
      </div>

      {/* Center: Rotating Announcement */}
      <div className="flex-1 flex justify-center relative min-h-[24px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-2 text-sm font-medium"
          >
            {announcements[index].icon}
            <span aria-live="polite">{announcements[index].text}</span>
          </motion.div>
        </AnimatePresence>

        {/* Progress Line */}
        <motion.div
          key={`progress-${index}`}
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 5, ease: "linear" }}
          className="absolute bottom-0 left-0 h-[2px] bg-yellow-400"
        />
      </div>

      {/* Right: CTAs */}
      <div className="flex gap-2 text-xs">
        <Link
          href="/promotions"
          target="_blank"
          className="bg-white text-blue-700 px-3 py-1 rounded font-medium hover:bg-gray-100 transition-colors"
          aria-label="View current promotions"
        >
          View Offers
        </Link>
        <Link
          href="/refer-and-earn"
          target="_blank"
          className="bg-yellow-400 text-black px-3 py-1 rounded font-medium hover:bg-yellow-500 transition-colors"
          aria-label="Refer a friend and earn rewards"
        >
          Refer & Earn
        </Link>
      </div>
    </div>
  );
};

export default AnnouncementBar;

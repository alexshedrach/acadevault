"use client";

import React from "react";
import Link from "next/link";
import { Briefcase } from "lucide-react";
import CurrencySelector from "../common/CurrencySelector";
import CountrySelector from "../common/CountrySelector";

const GlobalPromoTickerBar = () => {
  const message =
    "🎓 Welcome to AcadeVault – Get premium study guides, verified tutors, and academic deals daily. Email support@acadevault.com | 📞 +234-814-687-0361";

  return (
    <div className="bg-gradient-to-r from-slate-100 via-gray-50 to-slate-100 shadow-sm border-b border-gray-200 px-4 py-3 text-sm text-gray-800 flex flex-col sm:flex-row items-center justify-between gap-y-3 sm:gap-y-0">
      {/* Left: Quick Actions */}
      <div className="flex items-center gap-4 flex-wrap">
        <Link
          href="/hire-writer"
          target="_blank"
          className="bg-white border border-yellow-300 px-4 py-2 rounded-md text-yellow-600 font-medium hover:bg-yellow-50 hover:text-orange-500 transition text-base"
        >
          Hire a Top Academic Writer
        </Link>
        <CurrencySelector />
      </div>

      {/* Center: Scrolling Notice */}
      <div className="relative flex-1 mx-4 overflow-hidden whitespace-nowrap min-w-[200px] max-w-full">
        <div className="inline-block animate-marquee [animation-duration:20s] pause-on-hover">
          <span className="text-gray-700">{message}</span>
        </div>
        <div className="absolute top-0 left-0 h-full w-8 bg-gradient-to-r from-slate-100 to-transparent pointer-events-none" />
        <div className="absolute top-0 right-0 h-full w-8 bg-gradient-to-l from-slate-100 to-transparent pointer-events-none" />
      </div>

      {/* Right: Country Selector & CTA */}
      <div className="flex items-center gap-4 flex-wrap">
        <CountrySelector />
        <Link
          href="/vendors"
          target="_blank"
          className="bg-white border border-green-300 px-4 py-2 rounded-md text-blue-500 font-medium hover:text-orange-600 flex items-center gap-2 text-base hover:bg-green-50 transition"
        >
          <Briefcase size={16} />
          <span>Monetize Materials</span>
        </Link>
      </div>
    </div>
  );
};

export default GlobalPromoTickerBar;

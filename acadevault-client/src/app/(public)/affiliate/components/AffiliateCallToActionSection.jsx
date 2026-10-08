"use client";

import { Share2 } from "lucide-react";
import Link from "next/link";

const AffiliateCallToActionSection = () => (
  <section className="py-24 bg-gradient-to-r from-blue-600 via-indigo-700 to-purple-700 text-white relative overflow-hidden">
    {/* Optional Background Accent */}
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_var(--tw-gradient-stops))] from-white/5 via-transparent to-transparent opacity-30 pointer-events-none"></div>

    <div className="container mx-auto px-4 text-center space-y-8 relative z-10">
      <h2 className="text-4xl md:text-5xl font-extrabold flex justify-center items-center gap-3">
        <Share2 className="w-10 h-10" />
        Start Earning with AcadeVault
      </h2>

      <p className="text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
        Join our affiliate program today and start earning commissions by
        sharing AcadeVault with your audience.
      </p>

      <Link
        href="/affiliate/signup"
        className="inline-block bg-yellow-400 text-black px-10 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl hover:bg-yellow-500 transform hover:scale-105 transition-all duration-300"
      >
        Join Now
      </Link>
    </div>
  </section>
);

export default AffiliateCallToActionSection;

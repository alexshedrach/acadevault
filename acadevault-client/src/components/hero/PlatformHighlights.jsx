"use client";
import React from "react";
import Link from "next/link";
import { PhoneCall, Store, BadgePercent, ShieldCheck } from "lucide-react";

const PlatformHighlights = () => {
  return (
    <div className="bg-gray-50 p-2 rounded-2xl shadow flex flex-col justify-between space-y-2">
      {/* Affiliate Program Card */}
      <Link href="/affiliate" aria-label="Affiliate Program">
        <div className="bg-yellow-500 p-3 text-white text-center rounded-xl shadow-md hover:bg-yellow-600 transition-colors duration-300">
          <h3 className="font-bold text-lg uppercase">
            Earn with Affiliate Marketing
          </h3>
          <div className="mt-3 inline-block bg-white text-yellow-600 font-semibold px-4 py-2 hover:bg-yellow-100 transition">
            Join Now
          </div>
        </div>
      </Link>

      {/* Call to Order */}
      <div
        className="bg-white p-2 -mt-5  flex items-start space-x-4 rounded-xl shadow hover:shadow-md transition"
        aria-label="Call Support"
      >
        <div className="bg-orange-100 p-3 rounded-full shrink-0">
          <PhoneCall className="text-orange-500 w-6 h-6" />
        </div>
        <div className="text-sm">
          <p className="text-gray-900 font-semibold">Call to Order</p>
          <p className="text-gray-600">+234-814-687-0361</p>
          <p className="text-gray-600">+234-802-030-6156</p>
        </div>
      </div>

      {/* Sell on AcadeVault */}
      <Link href="/signup/vendors" aria-label="Become a Seller">
        <div className="bg-white p-2 flex items-center space-x-4 rounded-xl shadow hover:shadow-md transition">
          <div className="bg-orange-100 p-3 rounded-full shrink-0">
            <Store className="text-orange-500 w-6 h-6" />
          </div>
          <p className="text-gray-800 font-semibold text-sm">
            Sell on AcadeVault
          </p>
        </div>
      </Link>

      {/* Exclusive Deals */}
      <Link href="/promotions" aria-label="Exclusive Deals">
        <div className="bg-white p-2 flex items-center space-x-4 rounded-xl shadow hover:shadow-md transition">
          <div className="bg-orange-100 p-3 rounded-full shrink-0">
            <BadgePercent className="text-orange-500 w-6 h-6" />
          </div>
          <p className="text-gray-800 font-semibold text-sm">Exclusive Deals</p>
        </div>
      </Link>

      {/* Secure Content */}
      <Link href="/about/security" aria-label="Content Security Information">
        <div className="bg-white p-2 flex items-center space-x-4 rounded-xl shadow hover:shadow-md transition">
          <div className="bg-green-100 p-3 rounded-full shrink-0">
            <ShieldCheck className="text-green-500 w-6 h-6" />
          </div>
          <p className="text-gray-800 font-semibold text-sm">
            Secure & Verified Content
          </p>
        </div>
      </Link>
    </div>
  );
};

export default PlatformHighlights;

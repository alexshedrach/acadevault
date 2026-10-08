"use client";

import {
  FaShieldAlt,
  FaCheckCircle,
  FaUndoAlt,
  FaTruck,
  FaUserClock,
  FaMedal,
  FaStar,
} from "react-icons/fa";
import { PiLightningFill } from "react-icons/pi";

export default function SellerTrustIndicators({ shop }) {
  const {
    isVerified,
    hasRefundPolicy,
    offersShipping,
    sellerSince,
    sellerLevel,
    isTopRated,
    avgResponseTime,
    isOnline,
  } = shop;

  const indicators = [
    {
      label: "Verified Seller",
      condition: isVerified,
      icon: <FaCheckCircle className="text-green-600" />,
    },
    {
      label: "Top Rated Seller",
      condition: isTopRated,
      icon: <FaStar className="text-yellow-500" />,
    },
    {
      label: "Fast Delivery Options",
      condition: offersShipping,
      icon: <FaTruck className="text-orange-500" />,
    },
    {
      label: "Hassle-Free Refunds",
      condition: hasRefundPolicy,
      icon: <FaUndoAlt className="text-blue-600" />,
    },
    {
      label: "Secure Payments",
      condition: true,
      icon: <FaShieldAlt className="text-purple-500" />,
    },
    {
      label: `Seller Since ${new Date(sellerSince).getFullYear()}`,
      condition: sellerSince,
      icon: <FaUserClock className="text-gray-600" />,
    },
    {
      label: sellerLevel || "Standard Seller",
      condition: true,
      icon: <FaMedal className="text-yellow-600" />,
    },
    {
      label: `Avg. Response Time: ${avgResponseTime || "within a day"}`,
      condition: avgResponseTime,
      icon: <PiLightningFill className="text-teal-500" />,
    },
  ];

  const onlineBadge = isOnline ? (
    <span className="inline-flex items-center px-2 py-0.5 text-xs font-semibold bg-green-100 text-green-700 rounded-full">
      🟢 Online
    </span>
  ) : (
    <span className="inline-flex items-center px-2 py-0.5 text-xs font-semibold bg-gray-100 text-gray-600 rounded-full">
      ⚫️ Offline
    </span>
  );

  return (
    <div className="bg-white rounded border shadow-sm p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-md font-semibold text-gray-800">
          Why Shop With Us
        </h3>
        {onlineBadge}
      </div>

      <ul className="space-y-2 text-sm text-gray-700">
        {indicators
          .filter((item) => item.condition)
          .map((item, idx) => (
            <li key={idx} className="flex items-center gap-2">
              {item.icon}
              {item.label}
            </li>
          ))}
      </ul>

      {/* Optional Badges Row (Mobile-Friendly) */}
      <div className="flex flex-wrap gap-2 pt-4 border-t mt-4">
        {isVerified && (
          <span className="badge bg-green-100 text-green-700">✅ Verified</span>
        )}
        {isTopRated && (
          <span className="badge bg-yellow-100 text-yellow-700">
            ⭐ Top Rated
          </span>
        )}
        {hasRefundPolicy && (
          <span className="badge bg-blue-100 text-blue-700">↩️ Refunds</span>
        )}
        {offersShipping && (
          <span className="badge bg-orange-100 text-orange-700">
            🚚 Shipping
          </span>
        )}
      </div>
    </div>
  );
}

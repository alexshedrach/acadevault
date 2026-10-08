"use client";

import React from "react";
import { Users, ShoppingCart, BarChart2, DollarSign } from "lucide-react";
import VendorBenefitCard from "./VendorBenefitCard";

/**
 * Renders two grids of benefit cards:
 *   1) Top three benefits in a three-column layout.
 *   2) Additional two benefits in a two-column layout.
 */
export default function VendorBenefitsGrid() {
  // Top three benefits
  const primaryBenefits = [
    {
      id: "massive-audience",
      icon: <Users className="w-8 h-8 text-white" />,
      title: "Massive Academic Audience",
      points: [
        "✔ Access a worldwide network of students and researchers.",
        "✔ Get instant exposure to thousands of potential buyers.",
        "✔ Build your reputation as a trusted academic vendor.",
      ],
      bgFrom: "from-orange-500",
      bgTo: "to-orange-600",
    },
    {
      id: "zero-costs",
      icon: <ShoppingCart className="w-8 h-8 text-white" />,
      title: "Zero Upfront Costs",
      points: [
        "✔ No listing fees – upload unlimited materials for free.",
        "✔ Earn passive income with every successful sale.",
        "✔ Transparent commissions with no hidden charges.",
      ],
      bgFrom: "from-blue-700",
      bgTo: "to-blue-900",
    },
    {
      id: "dashboard",
      icon: <BarChart2 className="w-8 h-8 text-white" />,
      title: "Full Vendor Dashboard",
      points: [
        "✔ Track sales, revenue, and performance metrics easily.",
        "✔ Manage inventory and customer interactions in real-time.",
        "✔ Insights and analytics to boost your sales strategies.",
      ],
      bgFrom: "from-indigo-600",
      bgTo: "to-indigo-800",
    },
  ];

  // Additional two benefits
  const extraBenefits = [
    {
      id: "secure-payments",
      icon: <DollarSign className="w-8 h-8 text-white" />,
      title: "Secure Payments",
      points: [
        "✔ Get paid securely via multiple withdrawal options.",
        "✔ Real-time earnings tracking and instant payout requests.",
        "✔ Fraud prevention mechanisms ensure safe transactions.",
      ],
      bgFrom: "from-green-500",
      bgTo: "to-green-700",
    },
    {
      id: "marketing",
      icon: <BarChart2 className="w-8 h-8 text-white" />,
      title: "Marketing & Promotions",
      points: [
        "✔ Gain exposure through featured listings and ads.",
        "✔ Leverage social sharing tools to increase visibility.",
        "✔ Benefit from seasonal promotions and special discounts.",
      ],
      bgFrom: "from-purple-600",
      bgTo: "to-purple-800",
    },
  ];

  return (
    <>
      {/* Primary Benefits: three-column grid */}
      <div className="grid gap-10 md:grid-cols-3">
        {primaryBenefits.map((benefit) => (
          <VendorBenefitCard key={benefit.id} benefit={benefit} />
        ))}
      </div>

      {/* Additional Benefits: two-column grid */}
      <div className="grid gap-10 md:grid-cols-2 mt-10">
        {extraBenefits.map((benefit) => (
          <VendorBenefitCard key={benefit.id} benefit={benefit} />
        ))}
      </div>
    </>
  );
}

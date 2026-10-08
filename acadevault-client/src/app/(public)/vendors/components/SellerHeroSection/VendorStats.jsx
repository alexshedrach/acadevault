"use client";

import { BookOpen, Users, DollarSign } from "lucide-react";

// Vendor benefit stats
export default function VendorStats() {
  return (
    <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
      <StatItem
        icon={BookOpen}
        title="1M+ Resources"
        description="Join a vast library of academic materials."
      />
      <StatItem
        icon={Users}
        title="500K+ Users"
        description="Reach a global audience of learners."
      />
      <StatItem
        icon={DollarSign}
        title="Earn Passively"
        description="Monetize your content effortlessly."
      />
    </div>
  );
}

function StatItem({ icon: Icon, title, description }) {
  return (
    <div className="flex flex-col items-center text-center">
      <Icon className="w-10 h-10 text-blue-200 mb-2" />
      <h3 className="text-xl font-bold text-white">{title}</h3>
      <p className="text-gray-300">{description}</p>
    </div>
  );
}

"use client";

import CTASection from "@/components/common/CTASection";
import { BriefcaseBusiness } from "lucide-react";

export default function StartSellAction() {
  return (
    <CTASection
      title="Ready to Monetize Your Materials?"
      subtitle="Join thousands of academics earning passive income on Acadavault. Start your vendor journey today!"
      buttonText="Become a Vendor Now"
      buttonLink="/signup/vendors"
      background="image"
      bgImage="/images/monitize-bg.png"
      variant="primary"
      useParallax={true}
      overlayOpacity={0.7}
      blur={true}
      icon={BriefcaseBusiness}
      showBadge={true}
      badgeImage="/images/student-cap-1.png"
      className="border-y-10 border-white"
      // className="bg-orange-500 text-white hover:bg-orange-600"
    >
      <div className="flex justify-center space-x-3 mt-4">
        <span className="bg-white/20 px-4 py-2 rounded-full text-sm">
          Fast Approval
        </span>
        <span className="bg-white/20 px-4 py-2 rounded-full text-sm">
          Up to 80% Commission
        </span>
      </div>
    </CTASection>
  );
}

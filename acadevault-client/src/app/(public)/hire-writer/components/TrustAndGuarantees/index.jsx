"use client";

import React from "react";
import SectionHeader from "@/components/common/SectionHeader";
import { FloatingBlobs } from "@/components/common/FloatingBlobs";
import { ShieldCheck } from "lucide-react";
import { trustItems } from "@/data/writerTrustData";
import useFloatingBlobAnimation from "@/hooks/useFloatingBlobAnimation";
import TrustGrid from "./TrustGrid";

export default function TrustAndGuarantees() {
  const { blobs } = useFloatingBlobAnimation();

  return (
    <section className="relative py-24 overflow-hidden bg-gradient-to-b from-gray-50 to-white">
      {/* Decorative Blobs */}
      <FloatingBlobs blobs={blobs} />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="Why Students Trust Us"
          description="Our guarantees ensure you get the best academic support secure, original, and always on time."
          icon={<ShieldCheck className="w-8 h-8" />}
          size="xl"
          align="center"
          animate
          className="mb-12"
        />

        {/* Trust Items Grid */}
        <TrustGrid items={trustItems} />
      </div>
    </section>
  );
}

"use client";

import React from "react";
import { FloatingParticles } from "@/components/common/FloatingParticles";
import { CTAButton } from "@/components/common/CTAButton";
import { FloatingBlobs } from "@/components/common/FloatingBlobs";
import BackgroundGraphic from "@/components/common/BackgroundGraphic";
import SectionHeader from "@/components/common/SectionHeader";

/**
 * CallToActionSection
 *
 * The parent section that brings together:
 *  - A dark gradient background
 *  - Floating particles (FloatingParticles)
 *  - SVG wave at bottom (WaveBackground)
 *  - Animated gradient heading (GradientHeading)
 *  - Sub-heading paragraph (SubHeading)
 *  - Glowing CTA button with ripple (CTAButton)
 */
export default function CallToActionSection() {
  const mountainPath =
    "M0,160L80,149.3C160,139,320,117,480,117.3C640,117,800,139,960,165.3C1120,192,1280,224,1360,240L1440,256V0H1360C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0H0Z";

  const mountainPath2 =
    "M0,64L80,69.3C160,75,320,85,480,101.3C640,117,800,139,960,138.7C1120,139,1280,117,1360,106.7L1440,96V320H1360C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320H0Z";

  return (
    <section className="relative w-full py-24 bg-gradient-to-br from-blue-900 to-indigo-900 overflow-hidden">
      {/* 1) Floating background blobs (z-index: 0) */}
      <FloatingBlobs />

      {/* 2) Particle animation in background */}
      <FloatingParticles
        count={20}
        minSize={3}
        maxSize={10}
        color="rgba(255, 255, 255, 0.50)"
        minOpacity={0.1}
        maxOpacity={0.4}
        minDuration={4}
        maxDuration={10}
        variation={true}
      />

      {/* 3) Wave SVG at bottom */}
      <BackgroundGraphic
        position="top"
        height="h-40"
        viewBox="0 0 1440 320"
        paths={[
          {
            d: mountainPath,
            fill: "rgba(255, 255, 255, 0.08)",
          },
        ]}
        wrapperClasses=""
        svgClasses=""
        style={{}}
      />
      <BackgroundGraphic
        position="bottom"
        height="h-40"
        viewBox="0 0 1440 320"
        paths={[
          {
            d: mountainPath2,
            fill: "rgba(255,255,255,0.1)",
          },
        ]}
        wrapperClasses=""
        svgClasses=""
        style={{}}
      />

      {/* 4) Content container centered */}
      <div className="container mx-auto px-6 relative text-center z-10">
        {/*  Main Gradient Heading • Slides up from below + fades in when scrolled
        into view • Continuously animates its gradient background-position */}
        <SectionHeader
          title="Ready to Elevate Your Learning?"
          description={
            /* 
        Subheading Paragraph 
        • Fades in and slides up slightly when scrolled into view
        • Provides descriptive context below the main heading
      */
            <>
              Join{" "}
              <span className="text-orange-500 font-extrabold">AcadeVault</span>{" "}
              today and gain instant access to a vast collection of academic
              materials designed to empower your educational journey.
            </>
          }
          gradient
          animate
          variant="tertiary"
          align="center"
          size="2xl"
          maxWidth="3xl"
        />
        <div className="mt-8">
          <CTAButton />
        </div>
      </div>
    </section>
  );
}

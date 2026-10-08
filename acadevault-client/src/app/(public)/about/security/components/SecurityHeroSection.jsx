import BackgroundGraphic from "@/components/common/BackgroundGraphic";
import OverlayPattern from "@/components/common/OverlayPattern";
import { ShieldCheck } from "lucide-react";
import React from "react";

const SecurityHeroSection = () => (
  <section
    aria-labelledby="securiry-hero-title"
    className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20"
  >
    {/* Background Pattern */}
    {/* Top wave */}
    <BackgroundGraphic
      position="bottom"
      height="h-full"
      paths={[
        {
          d: "M0,160L48,176C96,192,192,224,288,208C384,192,480,128,576,122.7C672,117,768,160,864,160C960,160,1056,117,1152,106.7C1248,96,1344,117,1392,128L1440,138.7L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z",
          fill: "#ffffff",
          opacity: 0.1,
        },
      ]}
      svgClasses="dark:fill-current"
      wrapperClasses="pointer-events-none"
    />

    {/* Overlay Pattern */}
    <OverlayPattern
      patternColor="white"
      dotRadius={2}
      patternSize={40}
      opacity={0.15}
      zIndex="z-10"
    />
    <div className="container mx-auto px-4 text-center">
      <h1 className="text-5xl font-bold mb-4 flex justify-center items-center gap-2">
        <ShieldCheck className="w-10 h-10" />
        Your Security, Our Priority
      </h1>
      <p className="text-xl max-w-2xl mx-auto">
        At Acadavault, we protect your academic materials and data with
        industry-leading security measures, ensuring trust and integrity.
      </p>
    </div>
  </section>
);

export default SecurityHeroSection;

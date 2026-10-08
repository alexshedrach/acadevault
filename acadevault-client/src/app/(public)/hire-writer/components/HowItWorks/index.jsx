"use client";

import HowItWorksGrid from "./HireWriterGrid";
import SectionHeader from "@/components/common/SectionHeader";
import { Users } from "lucide-react";

export default function HowItWorksSection() {
  return (
    <section
      className="relative py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white via-blue-50 to-white overflow-hidden"
      aria-labelledby="how-it-works-heading"
    >
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          title="How to Hire a Writer"
          description="Follow these easy steps to submit your project, make payment, and collaborate with a professional academic writer from start to finish."
          icon={<Users className="w-8 h-8" />}
          align="center"
          size="xl"
          maxWidth="2xl"
          className="mb-12"
        />
        <HowItWorksGrid />
      </div>
    </section>
  );
}

"use client";

import dynamic from "next/dynamic";

// Lazy load non-critical sections
const VerificationProcessSection = dynamic(
  () => import("./VerificationProcessSection"),
  { ssr: false, loading: () => <div>Loading Verification...</div> }
);
const SecurityMeasuresSection = dynamic(
  () => import("./SecurityMeasuresSection"),
  { ssr: false, loading: () => <div>Loading Security Measures...</div> }
);
const ContributorAccountabilitySection = dynamic(
  () => import("./ContributorAccountabilitySection"),
  { ssr: false, loading: () => <div>Loading Contributor Info...</div> }
);
const TrustedByStudentsSection = dynamic(
  () => import("./TrustedByStudentsSection"),
  { ssr: false, loading: () => <div>Loading Testimonials...</div> }
);

export default function ClientDynamicSections() {
  return (
    <>
      <VerificationProcessSection />
      <SecurityMeasuresSection />
      <ContributorAccountabilitySection />
      <TrustedByStudentsSection />
    </>
  );
}

"use client";

import dynamic from "next/dynamic";

const OurMilestonesSection = dynamic(() => import("./OurMilestonesSection"), {
  ssr: false,
  loading: () => <div>Loading milestones...</div>,
});
const OurTeamSection = dynamic(() => import("./OurTeamSection"), {
  ssr: false,
  loading: () => <div>Loading team...</div>,
});
const OurValuesSection = dynamic(() => import("./OurValuesSection"), {
  ssr: false,
  loading: () => <div>Loading values...</div>,
});
const CorePillarsSection = dynamic(() => import("./CorePillarsSection"), {
  ssr: false,
  loading: () => <div>Loading pillars...</div>,
});
const AchievementsSection = dynamic(() => import("./AchievementsSection"), {
  ssr: false,
  loading: () => <div>Loading achievements...</div>,
});
const TestimonialsSection = dynamic(() => import("./TestimonialsSection"), {
  ssr: false,
  loading: () => <div>Loading testimonials...</div>,
});

export default function ClientDynamicSections() {
  return (
    <>
      <OurMilestonesSection />
      <OurTeamSection />
      <OurValuesSection />
      <CorePillarsSection />
      <AchievementsSection />
      <TestimonialsSection />
    </>
  );
}

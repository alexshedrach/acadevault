"use client";

import { PiInfinity, PiPlayCircleBold, PiStarBold } from "react-icons/pi";

const FEATURES = [
  {
    icon: <PiPlayCircleBold className="text-xl md:text-2xl" />,
    title: "Explore thousands of curated academic resources",
    description:
      "From lecture notes to advanced study guides across all levels and disciplines.",
  },
  {
    icon: <PiStarBold className="text-xl md:text-2xl" />,
    title: "Learn from verified academic contributors",
    description:
      "Content rated and reviewed by real learners and subject-matter experts.",
  },
  {
    icon: <PiInfinity className="text-xl md:text-2xl" />,
    title: "Unlimited access. Learn on your terms",
    description:
      "Lifetime access to every purchased material, on any device, anytime.",
  },
];

export default function MaterialsHighlights() {
  return (
    <section className="border-y py-10 md:py-14 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
        {FEATURES.map(({ icon, title, description }, idx) => (
          <div
            key={idx}
            className="flex flex-col items-center text-sm md:text-base"
          >
            <div className="bg-indigo-100 text-indigo-800 rounded-full w-10 h-10 flex items-center justify-center mb-3">
              {icon}
            </div>
            <h3 className="font-semibold text-gray-900 text-base md:text-lg">
              {title}
            </h3>
            <p className="text-gray-600 mt-1 max-w-xs">{description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

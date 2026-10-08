"use client";

import React from "react";
import Link from "next/link";
import { Award, FileSearch, BarChart2, SlidersHorizontal } from "lucide-react";
import Container from "@/components/layout/Container";
import { cn } from "@/utils/cn";
import MyAnalyticsChart from "@/components/analytics/MyAnalyticsChart";

/**
 * AcadeVaultGoalsSection
 *
 * A two‐column “Learning focused on your goals” style section for AcadeVault.
 * Left column: Four feature cards (with icons, titles, descriptions, links).
 * Right column: A placeholder for the AcadeVault analytics/dashboard screenshot.
 *
 * To use:
 *   <AcadeVaultGoalsSection />
 *
 * Replace the <div className="analytics-placeholder"…> with your actual UX component or optimized image.
 */
export default function AcadeVaultGoalsSection() {
  // Feature definitions, each with an icon component, title, description, and link href.
  const features = [
    {
      id: "interactive",
      title: "Interactive Exercises",
      description:
        "Master concepts with embedded quizzes, coding exercises, and hands‐on practice tests designed for deeper understanding.",
      href: "/features/interactive-exercises",
      icon: <FileSearch className="w-6 h-6 text-indigo-600" />,
      highlighted: true, // this one will have the colored border
    },
    {
      id: "certification",
      title: "Certification Prep",
      description:
        "Prepare for industry‐recognized academic certifications by working through real‐world problem sets and earning badges along the way.",
      href: "/features/certification-prep",
      icon: <Award className="w-6 h-6 text-green-600" />,
      highlighted: false,
    },
    {
      id: "analytics",
      title: "Insights & Analytics",
      description:
        "Track your progress with in‐depth performance analytics—see which materials you’ve mastered and where to focus next.",
      href: "/features/analytics-dashboard",
      icon: <BarChart2 className="w-6 h-6 text‐orange-600" />,
      highlighted: false,
    },
    {
      id: "customizable",
      title: "Customizable Content",
      description:
        "Build bespoke learning paths for your team or yourself—combine documents, videos, and quizzes into a single bundle.",
      href: "/features/customizable-bundles",
      icon: <SlidersHorizontal className="w-6 h-6 text‐purple-600" />,
      highlighted: false,
    },
  ];

  const sampleChartData = [
    { month: "Jan 2025", completed: 12 },
    { month: "Feb 2025", completed: 18 },
    { month: "Mar 2025", completed: 25 },
    { month: "Apr 2025", completed: 22 },
    { month: "May 2025", completed: 30 },
    { month: "Jun 2025", completed: 28 },
    { month: "Jul 2025", completed: 35 },
    { month: "Aug 2025", completed: 40 },
  ];

  return (
    <Container as="section" className="bg-white py-16 px-4 sm:px-8 lg:px-16">
      {/* 1. Section Heading */}
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
        Academic Resources Tailored to Your Goals
      </h2>

      {/* 2. Two-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* ────────────────────────────────────── */}
        {/* Left column: Feature Cards */}
        <div className="lg:col-span-5 space-y-6">
          {features.map((feature) => (
            <div
              key={feature.id}
              className={cn(
                "flex items-start space-x-4 rounded-lg border bg-gray-50 hover:shadow-lg transition-shadow duration-200",
                feature.highlighted ? "border-indigo-500" : "border-gray-200"
              )}
            >
              {/* Icon */}
              <div className="p-4">{feature.icon}</div>

              {/* Textual Content */}
              <div className="py-4 pr-4">
                <h3
                  className={cn(
                    "text-lg font-semibold",
                    feature.highlighted ? "text-indigo-600" : "text-gray-900"
                  )}
                >
                  {feature.title}
                </h3>
                <p className="mt-1 text-sm text-gray-600">
                  {feature.description}
                </p>
                <Link
                  href={feature.href}
                  className={cn(
                    "mt-2 inline-flex items-center text-sm font-medium",
                    feature.highlighted
                      ? "text-indigo-600 hover:text-indigo-700"
                      : "text-blue-600 hover:text-blue-700"
                  )}
                >
                  Learn more →{/* visually obvious arrow */}
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* ────────────────────────────────────── */}
        {/* Right column: Analytics / Dashboard Preview */}
        <div className="lg:col-span-7 flex justify-center items-center">
          {/* 
            Replace this div with your actual analytics screenshot or React component.
            For production, consider using next/image for a static screenshot
            or embedding your live dashboard (with dimensions/scroll behavior).
          */}
          {/* <div
            className="analytics-placeholder w-full max-w-md lg:max-w-xl h-[400px]
                       border border-gray-300 rounded-lg overflow-hidden shadow-sm"
            aria-label="AcadeVault Analytics Preview"
          >
            
            <div className="bg-gray-100 w-full h-full flex items-center justify-center">
              <p className="text-gray-500 italic">
                [Analytics Dashboard Preview]
              </p>
            </div>
          </div> */}
          <div
            className="
              w-full max-w-lg
              h-64 sm:h-80 lg:h-96
              border border-gray-300
              rounded-lg
              bg-white
              shadow-sm
              overflow-hidden
            "
            aria-label="Materials Completed Over Time"
          >
            <MyAnalyticsChart data={sampleChartData} />
          </div>
        </div>
      </div>
    </Container>
  );
}

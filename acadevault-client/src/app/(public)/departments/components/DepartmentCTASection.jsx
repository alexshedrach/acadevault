"use client";

import Link from "next/link";
import React from "react";
import { Upload, BookOpen, Users } from "lucide-react";
import { useAuth } from "@/hooks/useAuth"; 
import BackgroundGraphic from "@/components/common/BackgroundGraphic";
import OverlayPattern from "@/components/common/OverlayPattern";

const DepartmentCTASection = ({
  departmentDetail,
  departmentSlug,
  className = "",
  gradient = "from-blue-600 via-indigo-600 to-purple-600",
  title = "Contribute or Explore More",
  description,
  ctaButtons = [],
}) => {
  const { user, isAuthenticated } = useAuth();

  // Default department name and description
  const departmentName =
    departmentDetail?.name ||
    (departmentSlug
      ? departmentSlug
          .replace(/-/g, " ")
          .replace(/\b\w/g, (c) => c.toUpperCase())
      : "Your Department");
  const defaultDescription =
    description ||
    `Share your academic materials or discover resources to boost your research in ${departmentName}.`;

  // Handle CTA click for analytics
  const handleCTAClick = (label) => {
    try {
      trackEvent({
        category: "DepartmentCTA",
        action: "Click",
        label,
      });
    } catch (error) {
      console.warn("Analytics tracking failed:", error);
    }
  };

  // Default CTA buttons with conditional rendering
  const defaultButtons = [
    {
      label: "Upload Material",
      href: "/materials/upload",
      icon: <Upload className="w-5 h-5" />,
      variant: "primary",
      show:
        isAuthenticated && (user?.role === "Seller" || user?.role === "Admin"),
    },
    {
      label: "Browse Materials",
      href: departmentSlug
        ? `/materials?category=${departmentSlug}`
        : "/materials",
      icon: <BookOpen className="w-5 h-5" />,
      variant: "secondary",
      show: true,
    },
    {
      label: "Join Community",
      href: "/community",
      icon: <Users className="w-5 h-5" />,
      variant: "secondary",
      show: true,
    },
  ];

  // Merge default and custom buttons, filter by show condition
  const buttons = [...defaultButtons, ...ctaButtons].filter(
    (button) => button.show
  );

  return (
    <section
      className={`relative overflow-hidden py-16 sm:py-20 bg-gradient-to-r ${gradient} text-white ${className}`}
      aria-label="Call to Action Section"
    >
      {/* Background Graphic */}
      <BackgroundGraphic
        position="bottom"
        height="h-full"
        paths={[
          {
            d: "M0,160L48,176C96,192,192,224,288,208C384,192,480,128,576,122.7C672,117,768,160,864,160C960,160,1056,117,1152,106.7C1248,96,1344,117,1392,128L1440,138.7L1440,320L0,320Z",
            fill: "#ffffff",
            opacity: 0.2,
          },
        ]}
        svgClasses=""
        wrapperClasses="pointer-events-none"
      />

      {/* Overlay Pattern */}
      <OverlayPattern
        patternColor="white"
        dotRadius={2}
        patternSize={40}
        opacity={0.12}
        zIndex="z-10"
      />
      <div className="container mx-auto px-4 sm:px-6 md:px-8 max-w-7xl text-center space-y-6">
        {/* Title */}
        <h2 className="text-3xl sm:text-4xl font-bold leading-tight">
          {title.replace("{department}", departmentName)}
        </h2>

        {/* Description */}
        <p className="text-base sm:text-lg max-w-2xl mx-auto">
          {defaultDescription.replace("{department}", departmentName)}
        </p>

        {/* CTAs */}
        {buttons.length > 0 ? (
          <div className="flex flex-wrap justify-center gap-4">
            {buttons.map((button, index) => (
              <Link
                key={index}
                href={button.href}
                onClick={() => handleCTAClick(button.label)}
                className={`inline-flex items-center gap-2 px-6 sm:px-8 py-3 rounded-full font-semibold text-base transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white ${
                  button.variant === "primary"
                    ? "bg-white text-blue-600 hover:bg-gray-100"
                    : "bg-transparent border-2 border-white text-white hover:bg-white hover:text-blue-600"
                }`}
                aria-label={button.label}
              >
                {button.icon}
                {button.label}
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-base text-gray-200">
            No actions available at the moment.
          </p>
        )}
      </div>
    </section>
  );
};

export default DepartmentCTASection;

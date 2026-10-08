"use client";

import React from "react";
import DepartmentBreadcrumbs from "./DepartmentBreadcrumbs";
import Link from "next/link";
import { BookOpen, Upload } from "lucide-react";

function DepartmentDetailHero({ departmentDetail, departmentSlug }) {
  const departmentName =
    departmentDetail?.name || departmentSlug.replace(/-/g, " ") || "Department";
  const departmentDescription =
    departmentDetail?.description ||
    "Explore high-quality academic resources curated for your department.";
  const parentCategory = departmentDetail?.parent?.name || "Academic Resources";
  const backgroundImage =
    departmentDetail?.image || "/images/departments-banner.jpg";

  const handleCTAClick = (label) => {
    try {
      trackEvent({
        category: "DepartmentHero",
        action: "CTA_Click",
        label,
      });
    } catch (error) {
      console.warn("Analytics tracking failed:", error);
    }
  };

  return (
    <>
      <section
        className="relative bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white py-16"
        style={{
          backgroundImage: backgroundImage
            ? `url(${backgroundImage})`
            : undefined,
          backgroundSize: "cover",
          backgroundPosition: "bottom",
          backgroundRepeat: "no-repeat",
        }}
        role="banner"
        aria-label={`${departmentName} Department Hero`}
      >
        {/* Overlay for readability */}
        <div
          className="absolute inset-0 bg-gradient-to-r from-blue-800 via-indigo-600/30 to-indigo-800"
          aria-hidden="true"
        />

        <div className="space-y-6 text-left container mx-auto px-6 sm:px-12 md:px-20 max-w-5xl relative z-10">
          {/* Title */}
          <h1 className="text-4xl sm:text-5xl font-bold leading-tight flex items-center gap-3">
            <BookOpen className="w-10 h-10" />
            {departmentName} Department
          </h1>

          {/* Subtitle */}
          <p className="text-xl sm:text-2xl font-medium max-w-3xl">
            Discover curated resources for {departmentName} to fuel your
            academic success.
          </p>

          {/* Description */}
          <p className="text-base sm:text-lg text-gray-100 max-w-3xl">
            {departmentDescription}
          </p>

          {/* Stats (if available) */}
          {departmentDetail?.data && (
            <div className="flex flex-wrap gap-6 text-sm sm:text-base">
              <span className="flex items-center gap-2">
                <BookOpen className="w-5 h-5" />
                {departmentDetail.data.totalMaterials} Materials
              </span>
              <span className="flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-400" />
                {departmentDetail.data.averageRating || "N/A"} Rating
              </span>
              <span className="flex items-center gap-2">
                <Download className="w-5 h-5" />
                {departmentDetail.data.totalViews} Views
              </span>
            </div>
          )}

          {/* CTAs */}
          <div className="flex flex-wrap gap-4 mt-6">
            <Link
              href="/materials/upload"
              onClick={() => handleCTAClick("Upload Material")}
              className="inline-flex items-center gap-2 bg-white text-blue-600 px-6 py-3 rounded-full font-semibold text-base hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Upload your academic material"
            >
              <Upload className="w-5 h-5" />
              Upload Your Material
            </Link>
            <Link
              href={`/materials?category=${departmentSlug}`}
              onClick={() => handleCTAClick("Browse Materials")}
              className="inline-flex items-center gap-2 bg-transparent border-2 border-white text-white px-6 py-3 rounded-full font-semibold text-base hover:bg-white hover:text-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label={`Browse materials for ${departmentName}`}
            >
              <BookOpen className="w-5 h-5" />
              Browse Materials
            </Link>
          </div>
        </div>
      </section>
      <DepartmentBreadcrumbs
        departmentDetail={departmentDetail}
        slug={departmentSlug}
        className="max-w-7xl"
        size="md"
      />
    </>
  );
}

export default DepartmentDetailHero;

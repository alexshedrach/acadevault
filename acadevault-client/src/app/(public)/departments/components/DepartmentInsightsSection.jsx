"use client";

import React from "react";
import {
  BarChart2,
  BookOpen,
  Eye,
  Download,
  Star,
  TrendingUp,
} from "lucide-react";
import Link from "next/link";

const DepartmentInsightsSection = ({
  stats,
  className = "",
  departmentSlug,
}) => {
  // Format large numbers (e.g., 1200 -> 1.2K)
  const formatNumber = (num) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + "K";
    }
    return num || 0;
  };

  // Format rating as stars
  const formatRating = (rating) => {
    if (!rating || isNaN(rating)) return "N/A";
    const stars = Math.round(rating);
    return "★".repeat(stars) + "☆".repeat(5 - stars);
  };

  // Handle stat card click for analytics
  const handleStatClick = (metric) => {
    try {
      trackEvent({
        category: "DepartmentInsights",
        action: "Click",
        label: metric,
      });
    } catch (error) {
      console.warn("Analytics tracking failed:", error);
    }
  };

  // Define insight cards with icons and tooltips
  const insights = [
    {
      label: "Materials Available",
      value: formatNumber(stats?.totalMaterials),
      icon: <BookOpen className="w-6 h-6 text-blue-600" />,
      tooltip: "Number of academic materials in this department",
      metric: "Materials",
    },
    {
      label: "Total Views",
      value: formatNumber(stats?.totalViews),
      icon: <Eye className="w-6 h-6 text-green-600" />,
      tooltip: "Total views of materials in this department",
      metric: "Views",
    },
    {
      label: "Total Downloads",
      value: formatNumber(stats?.totalDownloads),
      icon: <Download className="w-6 h-6 text-purple-600" />,
      tooltip: "Total downloads of materials in this department",
      metric: "Downloads",
    },
    {
      label: "Average Rating",
      value: formatRating(stats?.averageRating),
      icon: <Star className="w-6 h-6 text-yellow-500" />,
      tooltip: "Average user rating for materials",
      metric: "Rating",
    },
    {
      label: "New Materials",
      value: formatNumber(stats?.newMaterialsCount),
      icon: <TrendingUp className="w-6 h-6 text-teal-600" />,
      tooltip: "Number of new materials added recently",
      metric: "NewMaterials",
    },
  ];

  return (
    <section
      className={`py-16 bg-gradient-to-b from-gray-50 to-white ${className}`}
      aria-label="Department Insights"
    >
      <div className="container mx-auto px-4 sm:px-6 md:px-8 max-w-7xl space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 flex items-center gap-3">
            <BarChart2 className="w-8 h-8 text-blue-600" />
            Department Insights
          </h2>
          {departmentSlug && (
            <Link
              href={`/materials?category=${departmentSlug}`}
              className="text-blue-600 hover:underline text-base font-semibold"
              onClick={() => handleStatClick("ExploreMaterials")}
              aria-label="Explore all materials in this department"
            >
              Explore All Materials
            </Link>
          )}
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {insights.map((insight, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg p-6 text-center transform hover:scale-105 transition-transform duration-200 cursor-pointer"
              onClick={() => handleStatClick(insight.metric)}
              role="button"
              tabIndex={0}
              aria-label={`View ${insight.label}: ${insight.value}`}
              title={insight.tooltip}
            >
              <div className="flex justify-center mb-4">{insight.icon}</div>
              <p className="text-2xl font-bold text-gray-900">
                {insight.value}
              </p>
              <p className="text-sm text-gray-600 mt-2">{insight.label}</p>
            </div>
          ))}
        </div>

        {/* Fallback for No Data */}
        {!stats && (
          <div className="text-center text-gray-600">
            <p>No insights available for this department.</p>
            {departmentSlug && (
              <Link
                href="/materials/upload"
                className="text-blue-600 hover:underline mt-2 inline-block"
                onClick={() => handleStatClick("UploadMaterial")}
              >
                Be the first to contribute!
              </Link>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default DepartmentInsightsSection;

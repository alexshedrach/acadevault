"use client";

import { Eye, MousePointerClick, ShoppingBag, Star } from "lucide-react";

const AnalyticsDashboard = ({ analytics }) => {
  const {
    views = 0,
    clicks = 0,
    sales = 0,
    averageRating = 0,
  } = analytics || {};

  const metrics = [
    {
      label: "Total Views",
      value: views.toLocaleString(),
      icon: <Eye className="w-5 h-5 text-blue-600" />,
    },
    {
      label: "Clicks",
      value: clicks.toLocaleString(),
      icon: <MousePointerClick className="w-5 h-5 text-indigo-600" />,
    },
    {
      label: "Total Sales",
      value: sales.toLocaleString(),
      icon: <ShoppingBag className="w-5 h-5 text-green-600" />,
    },
    {
      label: "Avg. Rating",
      value: averageRating.toFixed(1),
      icon: <Star className="w-5 h-5 text-yellow-500" />,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {metrics.map((metric) => (
        <div
          key={metric.label}
          className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition"
        >
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-500 font-medium">
              {metric.label}
            </div>
            {metric.icon}
          </div>
          <div className="mt-2 text-2xl font-semibold text-gray-800">
            {metric.value}
          </div>
        </div>
      ))}
    </div>
  );
};

export default AnalyticsDashboard;

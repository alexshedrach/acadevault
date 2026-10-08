"use client";

import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";
import {
  FaChartLine,
  FaDollarSign,
  FaExternalLinkAlt,
  FaUserPlus,
} from "react-icons/fa";

const stats = [
  {
    title: "Total Clicks",
    count: 3021,
    icon: FaExternalLinkAlt,
    href: "/dashboard/affiliate/analytics",
    bg: "bg-blue-100",
  },
  {
    title: "Conversions",
    count: 158,
    icon: FaChartLine,
    href: "/dashboard/affiliate/conversions",
    bg: "bg-green-100",
  },
  {
    title: "Earnings",
    count: "$1,245.00",
    icon: FaDollarSign,
    href: "/dashboard/affiliate/earnings",
    bg: "bg-yellow-100",
  },
  {
    title: "Referrals",
    count: 92,
    icon: FaUserPlus,
    href: "/dashboard/affiliate/referrals",
    bg: "bg-purple-100",
  },
];

const recentEvents = [
  {
    title: "New signup from referral #843",
    date: "2025-05-21",
    type: "Signup",
  },
  {
    title: "Commission earned: $15.00 from conversion",
    date: "2025-05-20",
    type: "Earning",
  },
  {
    title: "Link clicked from Instagram",
    date: "2025-05-19",
    type: "Click",
  },
];

export default function AffiliateDashboard() {
  const { user } = useAuth();

  return (
    <section className="space-y-8">
      {/* Greeting */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Welcome, {user?.name || "Affiliate"} 👋
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mt-1">
          Track your referrals, earnings, and performance in real-time.
        </p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        {stats.map(({ title, count, icon: Icon, href, bg }) => (
          <Link
            key={title}
            href={href}
            className="flex items-center p-4 rounded-lg shadow-sm hover:shadow-md transition bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
          >
            <div
              className={`p-3 rounded-full ${bg} text-gray-800 dark:text-gray-100`}
            >
              <Icon className="text-2xl" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {title}
              </p>
              <p className="text-lg font-semibold text-gray-900 dark:text-white">
                {count}
              </p>
            </div>
          </Link>
        ))}
      </div>

      {/* Recent Events */}
      <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {recentEvents.map((event, index) => (
            <li key={index} className="py-3">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-gray-800 dark:text-gray-100">
                    {event.title}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {event.date}
                  </p>
                </div>
                <span className="text-xs px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
                  {event.type}
                </span>
              </div>
            </li>
          ))}
        </ul>
        <div className="mt-4 text-right">
          <Link
            href="/dashboard/affiliate/activity"
            className="text-sm text-blue-600 hover:underline dark:text-blue-400"
          >
            View all activity →
          </Link>
        </div>
      </div>

      {/* Affiliate Tools Placeholder */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold mb-2">Top Performing Links</h3>
          <p className="text-gray-600 dark:text-gray-400">
            Track which links drive the most traffic and conversions.
          </p>
        </div>

        <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold mb-2">Promotional Assets</h3>
          <p className="text-gray-600 dark:text-gray-400">
            Download banners, templates, and social media kits.
          </p>
        </div>
      </div>
    </section>
  );
}

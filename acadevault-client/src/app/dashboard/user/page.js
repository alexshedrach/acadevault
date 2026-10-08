"use client";

import { FaHeart, FaWallet, FaHistory, FaShoppingBag } from "react-icons/fa";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";

const stats = [
  {
    title: "Orders",
    count: 9,
    icon: FaShoppingBag,
    href: "/dashboard/user/orders",
    bg: "bg-blue-100",
  },
  {
    title: "Wishlist",
    count: 21,
    icon: FaHeart,
    href: "/dashboard/user/wishlist",
    bg: "bg-pink-100",
  },
  {
    title: "Wallet Balance",
    count: "$120.45",
    icon: FaWallet,
    href: "/dashboard/user/wallet",
    bg: "bg-green-100",
  },
  {
    title: "Activity",
    count: "17 actions",
    icon: FaHistory,
    href: "/dashboard/user/activity",
    bg: "bg-purple-100",
  },
];

const recentActivities = [
  {
    action: "Placed Order #ORD-1042",
    date: "2025-05-20",
    status: "Completed",
  },
  {
    action: 'Added "iPhone 15" to wishlist',
    date: "2025-05-18",
    status: "Saved",
  },
  {
    action: 'Viewed product "MacBook Air M3"',
    date: "2025-05-17",
    status: "Viewed",
  },
];

export default function UserDashboard() {
  const { user } = useAuth();

  return (
    <section className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Welcome, {user?.name || "User"} 👋
        </h1>
        <p className="text-gray-600 mt-1">
          Here’s a quick look at your account activity.
        </p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        {stats.map(({ title, count, icon: Icon, href, bg }) => (
          <Link
            key={title}
            href={href}
            className="flex items-center p-4 rounded-lg shadow-sm hover:shadow-md transition bg-white border border-gray-200"
          >
            <div className={`p-3 rounded-full ${bg} text-gray-800`}>
              <Icon className="text-2xl" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-500">{title}</p>
              <p className="text-lg font-semibold text-gray-900">{count}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="p-6 bg-white rounded-lg shadow border border-gray-200">
        <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
        <ul className="divide-y divide-gray-200">
          {recentActivities.map((activity, index) => (
            <li key={index} className="py-3">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-gray-800">{activity.action}</p>
                  <p className="text-sm text-gray-500">{activity.date}</p>
                </div>
                <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-700">
                  {activity.status}
                </span>
              </div>
            </li>
          ))}
        </ul>
        <div className="mt-4 text-right">
          <Link
            href="/dashboard/user/activity"
            className="text-sm text-blue-600 hover:underline"
          >
            View full activity →
          </Link>
        </div>
      </div>

      {/* Widgets */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 bg-white rounded-lg shadow border border-gray-200">
          <h3 className="text-lg font-semibold mb-2">Recommendations</h3>
          <p className="text-gray-600">
            Personalized recommendations based on your browsing history.
          </p>
        </div>

        <div className="p-6 bg-white rounded-lg shadow border border-gray-200">
          <h3 className="text-lg font-semibold mb-2">Upcoming Deliveries</h3>
          <p className="text-gray-600">
            You will be notified about deliveries scheduled this week.
          </p>
        </div>
      </div>
    </section>
  );
}

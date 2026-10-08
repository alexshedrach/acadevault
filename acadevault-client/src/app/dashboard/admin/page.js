"use client";

import {
  FaUsers,
  FaUserShield,
  FaUserTag,
  FaBoxOpen,
  FaMoneyCheckAlt,
  FaChartBar,
  FaClipboardList,
  FaTools,
  FaUndo,
} from "react-icons/fa";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";

const stats = [
  {
    title: "Total Users",
    count: 1243,
    icon: FaUsers,
    href: "/dashboard/admin/users",
    bg: "bg-blue-100",
  },
  {
    title: "Sellers",
    count: 320,
    icon: FaBoxOpen,
    href: "/dashboard/admin/sellers",
    bg: "bg-indigo-100",
  },
  {
    title: "Affiliates",
    count: 97,
    icon: FaUserTag,
    href: "/dashboard/admin/affiliates",
    bg: "bg-pink-100",
  },
  {
    title: "Admins",
    count: 12,
    icon: FaUserShield,
    href: "/dashboard/admin/admins",
    bg: "bg-green-100",
  },
  {
    title: "Reports Filed",
    count: 87,
    icon: FaClipboardList,
    href: "/dashboard/admin/reports",
    bg: "bg-yellow-100",
  },
  {
    title: "Refund Requests",
    count: 23,
    icon: FaUndo,
    href: "/dashboard/admin/refunds",
    bg: "bg-red-100",
  },
  {
    title: "Commission Payouts",
    count: 45,
    icon: FaMoneyCheckAlt,
    href: "/dashboard/admin/commissions",
    bg: "bg-teal-100",
  },
  {
    title: "System Tools",
    count: 5,
    icon: FaTools,
    href: "/dashboard/admin/tools",
    bg: "bg-purple-100",
  },
];

export default function AdminDashboard() {
  const { user } = useAuth();

  return (
    <section className="px-6 space-y-10">
      {/* Page Header */}
      <header className="space-y-1">
        <h1 className="text-3xl font-bold text-gray-900">
          Welcome back, {user?.name || "Admin"}!
        </h1>
        <p className="text-gray-600 text-sm">
          Administrative overview and key metrics.
        </p>
      </header>

      {/* Dashboard Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {stats.map(({ title, count, icon: Icon, href, bg }) => (
          <Link
            key={title}
            href={href}
            className="flex items-center gap-4 p-4 bg-white border border-gray-200 rounded-lg shadow hover:shadow-md transition"
          >
            <div className={`p-3 rounded-full ${bg} text-gray-900`}>
              <Icon className="text-2xl" />
            </div>
            <div>
              <p className="text-sm text-gray-500">{title}</p>
              <p className="text-lg font-semibold text-gray-900">{count}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* Secondary Panels */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <section className="p-6 bg-white border border-gray-200 rounded-lg shadow">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Recent Reports
          </h2>
          <p className="text-sm text-gray-600">
            Coming soon: View latest user-generated reports submitted for
            moderation.
          </p>
        </section>

        <section className="p-6 bg-white border border-gray-200 rounded-lg shadow">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            System Logs
          </h2>
          <p className="text-sm text-gray-600">
            Coming soon: Real-time logs for system events, activities, and login
            attempts.
          </p>
        </section>
      </div>
    </section>
  );
}

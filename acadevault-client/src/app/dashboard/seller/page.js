"use client";

import {
  FaBoxOpen,
  FaDollarSign,
  FaShoppingCart,
  FaChartLine,
} from "react-icons/fa";
import Link from "next/link";
import { useDashboardAuth } from "@/hooks/useDashboardAuth";

const stats = [
  {
    title: "Total Products",
    count: 128,
    icon: FaBoxOpen,
    href: "/dashboard/seller/products",
    bg: "bg-indigo-100",
  },
  {
    title: "Total Sales",
    count: "$23,400",
    icon: FaDollarSign,
    href: "/dashboard/seller/sales",
    bg: "bg-green-100",
  },
  {
    title: "Pending Orders",
    count: 17,
    icon: FaShoppingCart,
    href: "/dashboard/seller/orders",
    bg: "bg-yellow-100",
  },
  {
    title: "Monthly Revenue",
    count: "$3,845",
    icon: FaChartLine,
    href: "/dashboard/seller/analytics",
    bg: "bg-purple-100",
  },
];

const recentOrders = [
  {
    id: "ORD-001",
    customer: "Jane Doe",
    total: "$124.00",
    status: "Processing",
  },
  { id: "ORD-002", customer: "John Smith", total: "$89.00", status: "Shipped" },
  {
    id: "ORD-003",
    customer: "Emma Lee",
    total: "$245.00",
    status: "Delivered",
  },
];

export default function SellerDashboard() {
  const { user } = useDashboardAuth();

  return (
    <section className="space-y-10 px-6 py-8">
      {/* Header */}
      <header className="space-y-1">
        <h1 className="text-3xl font-bold text-gray-900">Seller Dashboard</h1>
        <p className="text-gray-600 text-sm">
          Welcome back,{" "}
          <span className="font-medium">{user?.name || "Seller"}</span>! Here is
          your store overview.
        </p>
      </header>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        {stats.map(({ title, count, icon: Icon, href, bg }) => (
          <Link
            key={title}
            href={href}
            className="flex items-center p-4 rounded-lg shadow bg-white border border-gray-200 hover:shadow-md transition"
          >
            <div className={`p-3 rounded-full ${bg} text-gray-900`}>
              <Icon className="text-2xl" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-500">{title}</p>
              <p className="text-lg font-semibold text-gray-900">{count}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* Recent Orders Table */}
      <div className="p-6 bg-white rounded-lg shadow border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Recent Orders
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-gray-600 border-b">
                <th className="py-2">Order ID</th>
                <th className="py-2">Customer</th>
                <th className="py-2">Total</th>
                <th className="py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order) => (
                <tr key={order.id} className="border-b text-gray-800">
                  <td className="py-2 font-mono">{order.id}</td>
                  <td className="py-2">{order.customer}</td>
                  <td className="py-2">{order.total}</td>
                  <td className="py-2">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        order.status === "Delivered"
                          ? "bg-green-100 text-green-800"
                          : order.status === "Shipped"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-4 text-right">
          <Link
            href="/dashboard/seller/orders"
            className="text-sm text-blue-600 hover:underline"
          >
            View all orders →
          </Link>
        </div>
      </div>

      {/* Future Features */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 bg-white rounded-lg shadow border border-gray-200">
          <h3 className="text-lg font-semibold mb-2 text-gray-900">
            Product Performance
          </h3>
          <p className="text-gray-600">
            Coming soon: Views, conversions, and sales performance charts.
          </p>
        </div>
        <div className="p-6 bg-white rounded-lg shadow border border-gray-200">
          <h3 className="text-lg font-semibold mb-2 text-gray-900">
            Account Notifications
          </h3>
          <p className="text-gray-600">
            Coming soon: Alerts for policy updates, account changes, and support
            tickets.
          </p>
        </div>
      </div>
    </section>
  );
}

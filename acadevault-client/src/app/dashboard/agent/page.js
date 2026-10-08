"use client";

import {
  FaTicketAlt,
  FaCheckCircle,
  FaExclamationTriangle,
  FaComments,
} from "react-icons/fa";
import Link from "next/link";
import { useDashboardAuth } from "@/hooks/useDashboardAuth";

const stats = [
  {
    title: "Open Tickets",
    count: 47,
    icon: FaTicketAlt,
    href: "/dashboard/agent/tickets",
    bg: "bg-orange-100",
  },
  {
    title: "Resolved Today",
    count: 23,
    icon: FaCheckCircle,
    href: "/dashboard/agent/resolved",
    bg: "bg-green-100",
  },
  {
    title: "Flagged Reports",
    count: 5,
    icon: FaExclamationTriangle,
    href: "/dashboard/agent/reports",
    bg: "bg-red-100",
  },
  {
    title: "Active Chats",
    count: 12,
    icon: FaComments,
    href: "/dashboard/agent/chats",
    bg: "bg-blue-100",
  },
];

const recentCases = [
  {
    subject: "Billing issue for Order #29384",
    status: "Open",
    priority: "High",
    date: "2025-05-21",
  },
  {
    subject: "Report review: User #734 flagged content",
    status: "In Review",
    priority: "Medium",
    date: "2025-05-20",
  },
  {
    subject: "Technical bug on mobile checkout",
    status: "Resolved",
    priority: "High",
    date: "2025-05-19",
  },
];

export default function AgentDashboard() {
  const { user } = useDashboardAuth();

  return (
    <section className="space-y-8">
      {/* Greeting */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Hello, {user?.name || "Agent"} 👩‍💻
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mt-1">
          Stay on top of your support responsibilities and user experience.
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

      {/* Recent Cases */}
      <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-semibold mb-4">Recent Case Activity</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-left text-gray-600 dark:text-gray-300">
            <thead className="bg-gray-100 dark:bg-gray-700 text-xs text-gray-700 dark:text-gray-200 uppercase">
              <tr>
                <th className="px-4 py-2">Subject</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2">Priority</th>
                <th className="px-4 py-2">Date</th>
              </tr>
            </thead>
            <tbody>
              {recentCases.map((caseItem, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-200 dark:border-gray-700"
                >
                  <td className="px-4 py-2">{caseItem.subject}</td>
                  <td className="px-4 py-2">{caseItem.status}</td>
                  <td className="px-4 py-2">{caseItem.priority}</td>
                  <td className="px-4 py-2">{caseItem.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Future Enhancements */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow border dark:border-gray-700">
          <h3 className="text-lg font-semibold mb-2">User Satisfaction</h3>
          <p className="text-gray-600 dark:text-gray-400">
            Coming soon: Feedback and satisfaction ratings per support case.
          </p>
        </div>

        <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow border dark:border-gray-700">
          <h3 className="text-lg font-semibold mb-2">Escalation Trends</h3>
          <p className="text-gray-600 dark:text-gray-400">
            Coming soon: See how often and why cases are escalated.
          </p>
        </div>
      </div>
    </section>
  );
}

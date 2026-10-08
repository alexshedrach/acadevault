"use client";

import { useAuth } from "@/hooks/useAuth";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FaBell } from "react-icons/fa";
import { HiOutlineBookOpen, HiOutlineDocumentAdd } from "react-icons/hi";
import Branding from "../header/Branding";
import ThemeToggle from "../ThemeToggle";
import CommandSearchButton from "../ui/CommandSearchButton";

export default function Topbar() {
  const { user, logout } = useAuth();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const isSeller = user?.role === "Seller";
  const isStudent = user?.role === "User" || user?.role === "Affilate";

  return (
    <div className="flex justify-between items-center h-full w-full px-4 sm:px-6 gap-4">
      {/* === Branding === */}
      <Branding />

      {/* === Controls === */}
      <div className="flex items-center gap-4 relative">
        {/* === Quick Actions === */}
        <div className="hidden lg:flex items-center gap-2">
          {isSeller && (
            <>
              <Link
                href="/dashboard/upload"
                className="flex items-center gap-1 text-sm font-medium px-3 py-1.5 rounded-md bg-gradient-to-br from-blue-500 to-purple-500 text-white shadow hover:brightness-110 transition"
              >
                <HiOutlineDocumentAdd className="text-base" />
                Upload
              </Link>
              <Link
                href="/dashboard/analytics"
                className="flex items-center gap-1 text-sm font-medium px-3 py-1.5 rounded-md bg-gradient-to-br from-indigo-500 to-purple-500 text-white shadow hover:brightness-110 transition"
              >
                📊 Analytics
              </Link>
            </>
          )}
          {isStudent && (
            <Link
              href="/dashboard/library"
              className="flex items-center gap-1 text-sm font-medium px-3 py-1.5 rounded-md bg-gradient-to-br from-blue-500 to-purple-500 text-white shadow hover:brightness-110 transition"
            >
              <HiOutlineBookOpen className="text-base" />
              My Library
            </Link>
          )}
        </div>

        {/* === Notifications Dropdown === */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications((prev) => !prev)}
            className="relative text-blue-700 hover:text-yellow-500 transition"
            aria-label="Notifications"
          >
            <FaBell className="text-xl" />
            <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full animate-ping-slow" />
          </button>

          <AnimatePresence>
            {showNotifications && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute right-0 mt-2 w-64 bg-white shadow-lg rounded-md border border-blue-100 z-50"
              >
                <div className="p-3 border-b font-semibold text-blue-900">
                  Notifications
                </div>
                <ul className="max-h-60 overflow-y-auto text-sm text-gray-700">
                  <li className="px-4 py-2 hover:bg-blue-50 cursor-pointer">
                    New user signed up 📥
                  </li>
                  <li className="px-4 py-2 hover:bg-blue-50 cursor-pointer">
                    Document approved ✅
                  </li>
                  <li className="px-4 py-2 hover:bg-blue-50 cursor-pointer">
                    New affiliate referral 💼
                  </li>
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* === Theme Toggle === */}
        <ThemeToggle />

        {/* === Profile Menu === */}
        <div className="relative">
          <button
            onClick={() => setShowProfileMenu((prev) => !prev)}
            className="flex items-center gap-2 rounded-full px-3 py-1.5 bg-white/20 hover:bg-white/30 text-blue-900 transition"
          >
            <div className="relative">
              <Image
                src={user?.avatar || "/avatars/default-avatar.png"}
                alt="User Avatar"
                width={32}
                height={32}
                className="rounded-full object-cover"
              />
              <span className="absolute bottom-0 right-0 block w-2.5 h-2.5 bg-green-500 ring-2 ring-white rounded-full" />
            </div>
            <span className="hidden md:block text-sm font-medium truncate max-w-[120px]">
              {user?.name || "User"}
            </span>
          </button>

          <AnimatePresence>
            {showProfileMenu && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="absolute right-0 mt-2 w-52 bg-white dark:bg-neutral-800 shadow-xl rounded-md py-2 border border-blue-100 dark:border-neutral-700 z-50"
              >
                <Link
                  href="/dashboard/account"
                  className="block px-4 py-2 text-sm text-gray-800 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-neutral-700"
                >
                  Account Settings
                </Link>
                <Link
                  href="/dashboard/security"
                  className="block px-4 py-2 text-sm text-gray-800 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-neutral-700"
                >
                  Security
                </Link>
                {/* Future Role Switcher */}
                {/* <div className="px-4 py-2">
                  <label className="block text-xs text-gray-500 mb-1">Switch Role</label>
                  <select className="w-full border rounded px-2 py-1 text-sm text-gray-700">
                    <option>Seller</option>
                    <option>Affiliate</option>
                  </select>
                </div> */}
                <button
                  onClick={logout}
                  className="w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-neutral-700"
                >
                  Logout
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

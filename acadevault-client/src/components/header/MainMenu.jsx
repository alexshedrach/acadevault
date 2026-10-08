"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import {
  FaUser,
  FaShoppingCart,
  FaHeart,
  FaSignInAlt,
  FaQuestionCircle,
  FaSignOutAlt,
  FaCog,
  FaInfoCircle,
  FaHeadset,
  FaChevronDown,
  FaBell,
} from "react-icons/fa";
import { useAuth } from "@/hooks/useAuth";

export default function MainMenu() {
  const { user, isAuthenticated, logout, isLoading } = useAuth();

  // Build your base path from role:
  const roleSegment = user?.role?.toLowerCase() ?? "user";
  const basePath = `/dashboard/${roleSegment}`;

  const [dropdowns, setDropdowns] = useState({
    profile: false,
    help: false,
    account: false,
  });

  const refs = {
    profile: useRef(null),
    help: useRef(null),
    account: useRef(null),
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      Object.entries(refs).forEach(([key, ref]) => {
        if (ref.current && !ref.current.contains(event.target)) {
          setDropdowns((prev) => ({ ...prev, [key]: false }));
        }
      });
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggle = (key) => {
    setDropdowns((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="flex items-center space-x-6 relative z-[9999]">
      {/* Notifications */}
      <Link
        href="/notifications"
        className="text-gray-700 hover:text-orange-500 transition"
      >
        <FaBell size={20} />
      </Link>

      {/* Cart */}
      <Link
        href="/cart"
        className="flex items-center gap-1 text-gray-700 hover:text-orange-500 transition"
      >
        <FaShoppingCart size={20} />
        <span className="text-sm font-bold">Cart</span>
      </Link>

      {/* Help Dropdown */}
      <div className="relative" ref={refs.help}>
        <button
          onClick={() => toggle("help")}
          aria-haspopup="true"
          aria-expanded={dropdowns.help}
          className="flex items-center text-gray-700 hover:text-orange-500 transition text-sm font-bold space-x-1"
        >
          <FaQuestionCircle size={20} />
          <span>Help</span>
          <FaChevronDown
            className={`transition-transform ${
              dropdowns.help ? "rotate-180" : ""
            }`}
            size={12}
          />
        </button>
        {dropdowns.help && (
          <DropdownMenu>
            <DropdownLink href="/help-center" icon={<FaInfoCircle />}>
              Help Center
            </DropdownLink>
            <DropdownLink href="/contact" icon={<FaHeadset />}>
              Contact Support
            </DropdownLink>
            <DropdownLink href="/faq" icon={<FaQuestionCircle />}>
              FAQs
            </DropdownLink>
          </DropdownMenu>
        )}
      </div>

      {isAuthenticated ? (
        // Authenticated User
        <div className="relative" ref={refs.profile}>
          <button
            onClick={() => toggle("profile")}
            className="flex items-center gap-1 text-gray-700 hover:text-orange-500 transition text-sm font-bold"
          >
            <FaUser size={20} />
            <span>Hi, {user?.name?.split(" ")[0] || "User"}</span>
            <FaChevronDown
              className={`transition-transform ${
                dropdowns.profile ? "rotate-180" : ""
              }`}
              size={12}
            />
          </button>
          {dropdowns.profile && (
            <DropdownMenu>
              <DropdownLink href="/dashboard" icon={<FaUser />}>
                My Dashboard
              </DropdownLink>
              <DropdownLink href="/dashboard/settings" icon={<FaCog />}>
                Settings
              </DropdownLink>
              {/* Only show Orders for roles that have them */}
              {["user", "seller", "affiliate"].includes(roleSegment) && (
                <DropdownLink
                  href={`${basePath}/orders`}
                  icon={<FaShoppingCart />}
                >
                  My Orders
                </DropdownLink>
              )}
              <button
                onClick={logout}
                disabled={isLoading}
                className={`dropdown-item flex items-center w-full px-4 py-2 text-left border-t border-gray-200 hover:bg-gray-100 ${
                  isLoading ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                <FaSignOutAlt className="mr-2" />
                {isLoading ? "Logging out…" : "Logout"}
              </button>
            </DropdownMenu>
          )}
        </div>
      ) : (
        // Guest User
        <div className="relative" ref={refs.account}>
          <button
            onClick={() => toggle("account")}
            className="flex items-center gap-1 text-gray-700 hover:text-orange-500 transition text-sm font-bold"
          >
            <FaUser size={20} />
            <span>Account</span>
            <FaChevronDown
              className={`transition-transform ${
                dropdowns.account ? "rotate-180" : ""
              }`}
              size={12}
            />
          </button>
          {dropdowns.account && (
            <DropdownMenu>
              <Link
                href="/login"
                className="flex items-center justify-center gap-2 bg-orange-500 text-white p-2 rounded-md hover:bg-orange-600"
              >
                <FaSignInAlt /> Login/Signup
              </Link>
              <DropdownLink href="/dashboard" icon={<FaUser />}>
                My Account
              </DropdownLink>
              <DropdownLink
                href="/dashboard/user/orders"
                icon={<FaShoppingCart />}
              >
                Orders
              </DropdownLink>
              <DropdownLink href="/dashboard/user/wishlist" icon={<FaHeart />}>
                Wishlist
              </DropdownLink>
            </DropdownMenu>
          )}
        </div>
      )}
    </div>
  );
}

// --- Component Helpers ---

function DropdownMenu({ children }) {
  return (
    <div className="dropdown absolute right-0 mt-6 w-48 bg-white shadow-lg rounded-md border border-gray-200 z-[9999]">
      {children}
    </div>
  );
}

function DropdownLink({ href, icon, children }) {
  return (
    <Link
      href={href}
      className="dropdown-item flex items-center px-4 py-2 text-gray-800 hover:bg-gray-100 mt-1"
    >
      <span className="mr-2">{icon}</span>
      {children}
    </Link>
  );
}

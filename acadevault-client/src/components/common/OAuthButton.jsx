"use client";

import React from "react";

export default function OAuthButton({ icon, label, onClick }) {
  const handleOAuthClick = () => {
    console.log(`${label} OAuth clicked`);
    if (typeof onClick === "function") {
      onClick();
    } else {
      window.location.href = `/auth/${label.toLowerCase()}`;
    }
  };

  return (
    <button
      type="button"
      onClick={handleOAuthClick}
      aria-label={`Continue with ${label}`}
      className="flex items-center w-full justify-center gap-3 border border-gray-300 rounded-lg py-2 px-4 hover:bg-gray-100 transition text-sm font-medium text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
    >
      {icon}
      <span className="sr-only">Continue with</span> {label}
    </button>
  );
}

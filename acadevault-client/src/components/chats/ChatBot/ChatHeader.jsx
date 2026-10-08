"use client";

import Image from "next/image";
import React from "react";

export default function ChatHeader({
  title = "Chat Assistant",
  avatar = null, // URL or null
  status = "online", // 'online' | 'offline' | 'auto'
  poweredBy = "AI Bot",
}) {
  const map = {
    online: { text: "Online", color: "bg-green-100 text-green-700" },
    offline: { text: "Offline", color: "bg-gray-200 text-gray-500" },
    auto: { text: "Auto‑reply", color: "bg-yellow-100 text-yellow-700" },
  };
  const badge = map[status] || map.auto;

  return (
    <div className="flex items-center justify-between px-6 py-4 bg-indigo-600 text-white">
      <div className="flex items-center gap-3">
        {avatar ? (
          <Image src={avatar} alt="" className="w-8 h-8 rounded-full" />
        ) : (
          <div className="p-2 bg-indigo-500 rounded-full">
            {/* fallback icon */}
          </div>
        )}
        <h2 className="text-lg font-semibold">{title}</h2>
      </div>
      <div className="flex flex-col items-end text-right">
        <span className={`px-2 py-0.5 text-xs rounded ${badge.color}`}>
          ● {badge.text}
        </span>
        <span className="text-xs mt-1">Powered by {poweredBy}</span>
      </div>
    </div>
  );
}

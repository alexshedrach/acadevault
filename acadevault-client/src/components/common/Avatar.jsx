"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/utils/cn";
import { getInitials } from "@/helpers/getInitials";

const sizeMap = {
  sm: 32,
  md: 48,
  lg: 64,
  xl: 96,
};

const statusColorMap = {
  online: "bg-green-500",
  offline: "bg-gray-400",
  away: "bg-yellow-400",
  busy: "bg-red-500",
  default: "bg-gray-300",
};

const statusLabelMap = {
  online: "Online",
  offline: "Offline",
  away: "Away",
  busy: "Busy",
};

export default function Avatar({
  src,
  alt = "User Avatar",
  name = "",
  size = "md",
  status = null, // 'online' | 'offline' | 'busy' | 'away'
  fallback = "",
  className = "",
  unoptimized = false,
  warnOnError = false,
}) {
  const resolvedSize =
    typeof size === "number" ? size : sizeMap[size] || sizeMap.md;
  const [imgSrc, setImgSrc] = useState(src?.trim() || fallback);
  const [showInitials, setShowInitials] = useState(false);

  const handleError = () => {
    if (warnOnError) console.warn("Avatar load failed:", imgSrc);
    if (imgSrc !== fallback) setImgSrc(fallback);
    else setShowInitials(true);
  };

  const statusDotClass = statusColorMap[status] || statusColorMap.default;
  const statusLabel = statusLabelMap[status] || "Unknown";

  const AvatarContent =
    showInitials || !imgSrc ? (
      <div
        className={cn(
          "flex items-center justify-center rounded-full bg-gray-300 text-white font-semibold",
          className
        )}
        style={{
          width: resolvedSize,
          height: resolvedSize,
          fontSize: resolvedSize / 2.4,
        }}
        title={alt}
      >
        {getInitials(name, 2)}
      </div>
    ) : (
      <Image
        src={imgSrc}
        alt={alt}
        width={resolvedSize}
        height={resolvedSize}
        className={cn("rounded-full object-cover border", className)}
        onError={handleError}
        unoptimized={unoptimized || imgSrc?.startsWith("http")}
      />
    );

  return (
    <div
      className="relative inline-block"
      style={{ width: resolvedSize, height: resolvedSize }}
    >
      {AvatarContent}
      {status && (
        <span
          className={cn(
            "absolute bottom-0 right-0 w-3 h-3 rounded-full ring-2 ring-white shadow-sm",
            statusDotClass
          )}
          title={statusLabel}
        />
      )}
    </div>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/utils/cn";
import { useTabsContext } from "./Tabs";

export function TabsList({ children, className = "", variant = "default" }) {
  const listRef = useRef(null);
  const { orientation } = useTabsContext();
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;

    const tabs = list.querySelectorAll("[role=tab]");

    const handleKeyDown = (e) => {
      const index = Array.from(tabs).findIndex(
        (el) => el === document.activeElement
      );
      if (index === -1) return;

      const prev = () => tabs[(index - 1 + tabs.length) % tabs.length]?.focus();
      const next = () => tabs[(index + 1) % tabs.length]?.focus();

      if (["ArrowRight", "ArrowDown"].includes(e.key)) {
        e.preventDefault();
        next();
      }
      if (["ArrowLeft", "ArrowUp"].includes(e.key)) {
        e.preventDefault();
        prev();
      }
    };

    const updateIndicator = () => {
      if (!list) return;

      requestAnimationFrame(() => {
        const active = list.querySelector("[role=tab][data-active='true']");
        if (active) {
          const rect = active.getBoundingClientRect();
          const containerRect = list.getBoundingClientRect();
          const left = rect.left - containerRect.left + list.scrollLeft;

          list.style.setProperty("--underline-x", `${left}px`);
          list.style.setProperty("--underline-width", `${rect.width}px`);
        }
      });
    };

    updateIndicator();

    list.addEventListener("keydown", handleKeyDown);
    window.addEventListener("resize", updateIndicator);

    const observer = new MutationObserver(updateIndicator);
    observer.observe(list, {
      attributes: true,
      childList: true,
      subtree: true,
    });

    return () => {
      list.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("resize", updateIndicator);
      observer.disconnect();
    };
  }, []);

  const baseClasses =
    "relative flex overflow-x-auto scroll-smooth hide-scrollbar";
  const verticalClasses = orientation === "vertical" ? "flex-col" : "";

  const variantClasses = {
    default: cn(
      "gap-2 sm:gap-4 bg-gradient-to-r from-[#b0c8f9] via-white to-[#b0c8f9]",
      "border-b border-gray-300 px-4 sm:px-6 py-6 sticky top-0 backdrop-blur-md shadow-md"
    ),
    shop: cn(
      "gap-2 sm:gap-4 border-b border-gray-200 px-1 sm:px-2 py-2",
      "bg-white"
    ),
    carousel: cn(
      "gap-6 border-b text-lg font-extrabold overflow-x-auto no-scrollbar mb-4",
      "bg-white"
    ),
  };

  const indicatorBaseStyle =
    variant === "carousel"
      ? { ...indicatorStyle, height: "3px", backgroundColor: "#4F46E5" } // Indigo-600
      : { ...indicatorStyle, height: "2px", backgroundColor: "#2563EB" }; // Blue-600

  return (
    <div
      ref={listRef}
      role="tablist"
      className={cn(
        baseClasses,
        verticalClasses,
        variantClasses[variant],
        className
      )}
    >
      <div
        className="absolute bottom-0 transition-all duration-300 ease-out rounded-full"
        style={{
          left: `var(--underline-x)`,
          width: `var(--underline-width)`,
          ...indicatorBaseStyle,
        }}
      />
      {children}
    </div>
  );
}

// ✔️ How to Use the Variants

// 1. Default (Sticky Gradient)
// <TabsList variant="default">
//   {/* Tabs go here */}
// </TabsList>

// 2. ShopTabs Style
// <TabsList variant="shop">
//   {/* Tabs go here */}
// </TabsList>

// 3. CarouselTabs Style
// <TabsList variant="carousel">
//   {/* Tabs go here */}
// </TabsList>

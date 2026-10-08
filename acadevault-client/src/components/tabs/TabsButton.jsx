import clsx from "clsx";
import React, { useEffect } from "react";

const { useTabsContext } = require("./Tabs");

export function TabsButton({ value, children, className = "" }) {
  const { activeTab, setActiveTab, registerTab } = useTabsContext();

  useEffect(() => {
    registerTab(value);
  }, [value]);

  const isActive = activeTab === value;

  return (
    <button
      role="tab"
      data-active={isActive}
      aria-selected={isActive}
      onClick={() => setActiveTab(value)}
      className={clsx(
        "relative px-4 py-2 rounded-full text-base font-medium whitespace-nowrap transition-all duration-200",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2",
        isActive
          ? "bg-blue-600 text-white shadow-md shadow-blue-300/30"
          : "bg-white/30 text-blue-900 hover:bg-white hover:backdrop-blur-sm hover:ring-1 hover:ring-blue-300/50",
        className
      )}
    >
      {children}
    </button>
  );
}

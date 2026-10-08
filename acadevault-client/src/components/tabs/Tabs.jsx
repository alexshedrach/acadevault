"use client";

import { createContext, useContext, useState, useEffect, useRef } from "react";

const TabsContext = createContext();

export function Tabs({
  defaultValue,
  lazy = false,
  children,
  className = "",
  orientation = "horizontal",
}) {
  const [activeTab, setActiveTab] = useState(defaultValue);
  const loadedTabs = useRef(new Set([defaultValue]));

  const registerTab = (value) => {
    loadedTabs.current.add(value);
  };

  const contextValue = {
    activeTab,
    setActiveTab,
    orientation,
    registerTab,
    loadedTabs: loadedTabs.current,
    lazy,
  };

  return (
    <TabsContext.Provider value={contextValue}>
      <div
        className={`tabs flex flex-col ${
          orientation === "vertical" ? "flex-row" : ""
        } ${className}`}
      >
        {children}
      </div>
    </TabsContext.Provider>
  );
}

export function useTabsContext() {
  const context = useContext(TabsContext);
  if (!context) throw new Error("Tabs.* components must be used within <Tabs>");
  return context;
}

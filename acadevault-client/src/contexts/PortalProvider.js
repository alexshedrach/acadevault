"use client";

import { createContext, useState, useContext, useCallback } from "react";
import { createPortal } from "react-dom";

const PortalContext = createContext();

export function PortalProvider({ children }) {
  const [portals, setPortals] = useState([]);

  const openPortal = useCallback((component, key = Date.now()) => {
    setPortals((prev) => [...prev, { key, component }]);
    return key;
  }, []);

  const closePortal = useCallback((key) => {
    setPortals((prev) => prev.filter((p) => p.key !== key));
  }, []);

  return (
    <PortalContext.Provider value={{ openPortal, closePortal }}>
      {children}
      <PortalRoot portals={portals} />
    </PortalContext.Provider>
  );
}

export function usePortal() {
  return useContext(PortalContext);
}

function PortalRoot({ portals }) {
  if (typeof window === "undefined") return null;

  const portalRoot = document.getElementById("__portal-root");
  if (!portalRoot) return null;

  return portals.map(({ key, component }) =>
    createPortal(<div key={key}>{component}</div>, portalRoot)
  );
}

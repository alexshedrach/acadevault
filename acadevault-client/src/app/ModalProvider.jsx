"use client";

import { useEffect, useState } from "react";
import Modal from "react-modal";

export function ModalProvider({ children }) {
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    const rootElement = document.getElementById("__next");
    if (rootElement) {
      Modal.setAppElement(rootElement);
      setInitialized(true);
    }
  }, []);

  if (!initialized) return null; // Avoid rendering modals prematurely

  return <>{children}</>;
}

"use client";

import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { cn } from "@/utils/cn";
import CategoryMenu from "../hero/CategoryMenu";

function CategoryDrawer({ open, onClose }) {
  const drawerRef = useRef(null);
  const startTouch = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    if (open) {
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const handleClickOutside = (e) => {
    if (drawerRef.current && !drawerRef.current.contains(e.target)) {
      onClose();
    }
  };

  const handleTouchStart = (e) => {
    startTouch.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    const end = e.changedTouches[0].clientX;
    if (startTouch.current - end > 80) {
      onClose();
    }
  };

  if (typeof window === "undefined") return null;

  const portalRoot = document.getElementById("__portal-root");
  if (!portalRoot) return null;

  return createPortal(
    <>
      <div
        className={cn(
          "fixed inset-0 bg-black/10 backdrop-blur-sm z-[99] transition-opacity duration-300",
          open
            ? "opacity-100 visible"
            : "opacity-0 invisible pointer-events-none"
        )}
        onClick={handleClickOutside}
        aria-hidden="true"
      />

      <aside
        ref={drawerRef}
        role="dialog"
        aria-modal="true"
        aria-label="Category menu"
        className={cn(
          "fixed left-0 top-40 w-60 shadow-lg rounded-2xl z-[100] bg-white transition-transform duration-300 ease-in-out",
          open ? "translate-x-0" : "-translate-x-full"
        )}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <CategoryMenu />
      </aside>
    </>,
    portalRoot
  );
}

export default CategoryDrawer;

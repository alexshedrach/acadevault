"use client";

import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { MoreVertical } from "lucide-react";
import { cn } from "@/utils/cn";

const ContextMenu = ({
  items = [],
  icon = <MoreVertical className="w-5 h-5" />,
  buttonClassName = "",
  menuClassName = "",
  iconClassName = "",
  align = "right",
  autoClose = true,
}) => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  const toggleMenu = () => setOpen((prev) => !prev);
  const closeMenu = () => setOpen(false);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        closeMenu();
      }
    };
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  const handleItemClick = (action) => {
    if (typeof action === "function") action();
    if (autoClose) closeMenu();
  };

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={toggleMenu}
        className={cn(
          "p-2 rounded-full hover:bg-gray-100 transition",
          buttonClassName
        )}
        aria-haspopup="true"
        aria-expanded={open}
        aria-label="Open Context Menu"
      >
        <span className={cn(iconClassName)}>{icon}</span>
      </button>

      {open && (
        <div
          className={cn(
            "absolute z-[9999] mt-2 w-48 bg-white border border-gray-200 shadow-lg rounded-md focus:outline-none",
            align === "left" ? "left-0" : "right-0",
            menuClassName
          )}
          role="menu"
        >
          {items.map(({ label, icon, onClick, className }, index) => (
            <button
              key={index}
              onClick={() => handleItemClick(onClick)}
              className={cn(
                "w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition",
                className
              )}
              role="menuitem"
            >
              {icon && <span className="w-4 h-4">{icon}</span>}
              {label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

ContextMenu.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      icon: PropTypes.node,
      onClick: PropTypes.func,
      className: PropTypes.string,
    })
  ),
  icon: PropTypes.node,
  buttonClassName: PropTypes.string,
  menuClassName: PropTypes.string,
  iconClassName: PropTypes.string,
  align: PropTypes.oneOf(["left", "right"]),
  autoClose: PropTypes.bool,
};

export default ContextMenu;

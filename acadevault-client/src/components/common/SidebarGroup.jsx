"use client";

import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { FaChevronDown } from "react-icons/fa";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function SidebarGroup({ groupLabel, items, defaultOpen = false }) {
  const pathname = usePathname();

  return (
    <Disclosure defaultOpen={defaultOpen}>
      {({ open }) => (
        <div className="mb-4">
          <DisclosureButton className="w-full px-3 py-2 text-sm font-semibold text-left text-blue-800 bg-blue-100 hover:bg-blue-200 rounded-md flex justify-between items-center">
            <span>{groupLabel}</span>
            <FaChevronDown
              className={`transition-transform duration-200 ${
                open ? "rotate-180" : ""
              }`}
            />
          </DisclosureButton>

          <DisclosurePanel className="mt-1 space-y-1 px-2">
            {items.map(({ label, href, icon: Icon }) => {
              const isExact = pathname === href;
              const isNested = pathname.startsWith(`${href}/`);
              const isActive = isExact || (label !== "Dashboard" && isNested);

              return (
                <Link
                  key={href}
                  href={href}
                  className={`flex items-center gap-2 px-2 py-1.5 text-sm rounded-md transition ${
                    isActive
                      ? "bg-blue-600 text-white shadow"
                      : "text-blue-900 hover:bg-blue-100"
                  }`}
                >
                  <Icon className="text-sm" />
                  <span>{label}</span>
                </Link>
              );
            })}
          </DisclosurePanel>
        </div>
      )}
    </Disclosure>
  );
}

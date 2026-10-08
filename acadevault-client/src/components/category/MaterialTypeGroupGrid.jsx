"use client";
import Link from "next/link";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { useState } from "react";

export default function MaterialTypeGroupGrid({ groups }) {
  const [expandedGroups, setExpandedGroups] = useState({});

  const toggleGroup = (group) => {
    setExpandedGroups((prev) => ({
      ...prev,
      [group]: !prev[group],
    }));
  };

  return (
    <div className="col-span-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {groups.map(({ group, icon, categories }) => {
        const isExpanded = expandedGroups[group];
        const visible = isExpanded ? categories : categories.slice(0, 6);

        return (
          <section
            key={group}
            className="group relative rounded-xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between px-4 pt-4">
              <div className="flex items-center gap-2">
                {icon}
                <h3 className="text-sm font-semibold text-gray-700 tracking-wide uppercase">
                  {group}
                </h3>
              </div>
            </div>

            <ul className="p-4 space-y-2">
              {visible.map((cat) => (
                <li key={cat._id}>
                  <Link
                    href={`/materials/category/${cat.slug}`}
                    className="flex items-center justify-between gap-2 text-sm text-gray-600 hover:text-orange-600 transition-colors"
                  >
                    <span className="truncate">{cat.name}</span>
                    <span className="inline-flex items-center justify-center text-[11px] min-w-[24px] h-5 bg-gray-100 border border-gray-200 rounded-full text-gray-500">
                      {cat.materialCount || 0}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>

            {categories.length > 6 && (
              <div className="px-4 pb-4">
                <button
                  onClick={() => toggleGroup(group)}
                  className="text-sm text-orange-600 hover:underline focus:outline-none flex items-center gap-1"
                >
                  {isExpanded ? (
                    <>
                      Show Less <FaChevronUp size={12} />
                    </>
                  ) : (
                    <>
                      Show More <FaChevronDown size={12} />
                    </>
                  )}
                </button>
              </div>
            )}
          </section>
        );
      })}
    </div>
  );
}

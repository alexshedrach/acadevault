"use client";

import { useMemo } from "react";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { quickLinksGroupData } from "@/data/quickLinksGroupData";
import { cn } from "@/utils/cn";

export default function QuickLinks({
  className = "",
  groupClassName = "",
  groupHeadingClassName = "",
  groups = null, // Array of group keys to render, null for all
  layout = "grid", // "grid" or "list"
  groupOrientation = "vertical", // "vertical" or "horizontal"
  customLinks = [],
}) {
  const { user, isAuthenticated } = useAuth();

  const handleLinkClick = (linkName) => {
    try {
      trackEvent({
        category: "QuickLinks",
        action: "Click",
        label: linkName,
      });
    } catch (error) {
      console.warn("Analytics tracking failed:", error);
    }
    console.log(`${linkName} has been clicked`);
  };

  const linkGroups = useMemo(() => {
    let filteredGroups = quickLinksGroupData;

    if (groups && Array.isArray(groups)) {
      filteredGroups = quickLinksGroupData.filter((group) =>
        groups.includes(group.key)
      );
    }

    if (customLinks.length > 0) {
      filteredGroups = [
        ...filteredGroups,
        {
          title: "Custom Links",
          key: "custom",
          links: customLinks.map((link) => ({
            ...link,
            icon: link.icon || (
              <ExternalLink className="w-5 h-5 text-blue-600" />
            ),
            show: () => true,
          })),
        },
      ];
    }

    return filteredGroups.map((group) => ({
      ...group,
      links: group.links.filter((link) => link.show(user, isAuthenticated)),
    }));
  }, [user, isAuthenticated, groups, customLinks]);

  const getLayoutClasses = (type) => {
    return type === "grid"
      ? "grid grid-cols-1 sm:grid-cols-2 gap-4"
      : "flex flex-col gap-2";
  };

  return (
    <div
      className={cn(
        groupOrientation === "horizontal" ? "flex gap-4" : "space-y-6",
        className
      )}
      role="navigation"
      aria-label="Quick Links Navigation"
    >
      {linkGroups.length === 0 ? (
        <p className="text-gray-600 text-base">No links available.</p>
      ) : (
        linkGroups.map(
          (group, index) =>
            group.links.length > 0 && (
              <div
                key={index}
                className={cn(
                  "flex-1 hover:shadow-md transition",
                  groupClassName
                )}
              >
                <h3
                  className={cn(
                    "text-lg font-semibold text-gray-800  pb-2",
                    groupHeadingClassName
                  )}
                >
                  {group.title}
                </h3>
                <ul className={getLayoutClasses(layout)}>
                  {group.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <Link
                        href={link.href}
                        onClick={() => handleLinkClick(link.label)}
                        className="flex items-center gap-2 text-blue-600 hover:text-blue-800 hover:underline transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded px-1 py-1"
                        aria-label={link.description}
                        title={link.description}
                      >
                        {link.icon}
                        <span>{link.label}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )
        )
      )}
    </div>
  );
}

// Usage
// Footer (All Groups, Grid Layout)
{
  /* <footer className="py-16 bg-gray-100">
  <div className="container mx-auto px-4">
    <QuickLinks className="max-w-4xl mx-auto" layout="grid" />
  </div>
</footer>; */
}

// ======= Sidebar (Specific Groups, List Layout) //=====
{
  /* <aside className="w-64 p-4 bg-white shadow-md">
  <QuickLinks
    groups={["discover", "account"]}
    layout="list"
    groupClassName="bg-white rounded-lg shadow-sm p-4 space-y-4 border"
    groupHeadingClassName=" border-b inline-block"
  />
</aside>; */
}

//======= Custom Links (Footer with Additional Links) //====
// const customLinks = [
//   { href: "/blog", label: "Blog", description: "Read our latest articles" },
//   {
//     href: "/partners",
//     label: "Partners",
//     description: "Our academic partners",
//   },
// ];

// <section className="py-16 bg-gray-100">
//   <div className="container mx-auto px-4">
//     <QuickLinks
//       // className="max-w-4xl mx-auto"
//       // groupClassName="bg-white rounded-lg shadow-sm p-4 space-y-4 border"
//       groupHeadingClassName=" border-b inline-block"
//       layout="list"
//       groupOrientation="horizontal"
//       // groups={["discover", "learn-more"]}
//       customLinks={customLinks}
//     />
//   </div>
// </section>;

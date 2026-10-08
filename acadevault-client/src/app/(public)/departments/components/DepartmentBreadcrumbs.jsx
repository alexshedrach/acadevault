"use client";

import { useMemo } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

const DepartmentBreadcrumbs = ({
  departmentDetail,
  slug,
  className = "",
  separatorColor = "text-gray-400",
  textColor = "text-gray-600",
  activeColor = "text-gray-900",
  hoverColor = "hover:text-blue-600",
  size = "sm",
  ariaLabel = "Department Breadcrumb",
}) => {
  const handleBreadcrumbClick = (label) => {
    try {
      trackEvent({
        category: "Breadcrumbs",
        action: "Click",
        label,
      });
    } catch (error) {
      console.warn("Analytics tracking failed:", error);
    }
  };

  // Capitalize the first letter of each word in a string
  const capitalize = (str) =>
    str
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

  const breadcrumbItems = useMemo(() => {
    const items = [
      {
        label: "Home",
        href: "/",
      },
      {
        label: "Categories",
        href: "#",
      },
      {
        label: "Departments",
        href: "/departments",
      },
    ];

    // Add parent category if available
    if (departmentDetail?.parent?.name && departmentDetail?.parent?.slug) {
      items.push({
        label: capitalize(departmentDetail.parent.name),
        href: `/departments/${departmentDetail.parent.slug}`,
      });
    }

    // Add current department
    const departmentLabel = departmentDetail?.name
      ? capitalize(departmentDetail.name)
      : capitalize(decodeURIComponent(slug).replace(/-/g, " "));
    items.push({
      label: departmentLabel,
      isCurrentPage: true,
    });

    return items;
  }, [departmentDetail, slug]);

  // Determine text size classes
  const textSize =
    size === "sm" ? "text-sm" : size === "lg" ? "text-lg" : "text-base";

  return (
    <div
      className={`mx-auto px-4 sm:px-6 md:px-8 py-4 bg-gray-100 ${className}`}
    >
      <nav aria-label={ariaLabel} className="flex items-center">
        <ol className="flex flex-wrap items-center gap-2">
          {breadcrumbItems.map((item, index) => (
            <li key={index} className="flex items-center gap-2">
              {item.isCurrentPage ? (
                <span
                  className={`${textSize} ${activeColor} font-medium`}
                  aria-current="page"
                >
                  {item.label}
                </span>
              ) : (
                <Link
                  href={item.href}
                  onClick={() => handleBreadcrumbClick(item.label)}
                  className={`${textSize} ${textColor} ${hoverColor} transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded`}
                  aria-label={`Navigate to ${item.label}`}
                >
                  {item.label}
                </Link>
              )}
              {index < breadcrumbItems.length - 1 && (
                <ChevronRight
                  className={`w-4 h-4 ${separatorColor}`}
                  aria-hidden="true"
                />
              )}
            </li>
          ))}
        </ol>
      </nav>
    </div>
  );
};

export default DepartmentBreadcrumbs;

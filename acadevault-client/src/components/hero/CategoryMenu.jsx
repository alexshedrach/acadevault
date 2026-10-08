"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { categories as categoriesData } from "@/data/categoriesData";
import { useCategoryData } from "@/hooks/useCategoryData";
import SubcategoryDropdown from "../category/SubcategoryDropdown";

export default function CategoryMenu() {
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState(null);
  const [hoverTimeout, setHoverTimeout] = useState(null);
  const [expandedState, setExpandedState] = useState({});

  const {
    categories,
    parentCategories,
    lastFetchedSubcategories,
    lastFetchedParentId,
    academicLevels,
    refetchers: { refetchParentCategories, fetchSubcategories, refetchAcademicLevels },
    isLoading,
    isLoadingSub,
  } = useCategoryData({
    queryParams: { categoryType: "Material Type", limit: 20 },
    parentQueryParams: { categoryType: "Academic Discipline", limit: 20 },
    autoFetch: true,
  }); 

  // ─── Helpers ─────────────────────────────────────────
  const hasStaticSubcategories = (category) =>
    category.subCategories && Object.keys(category.subCategories).length > 0;

  // ─── Handle hover on a top-level category
  const handleHover = (category) => {
    clearTimeout(hoverTimeout);

    const qualifies = category.isDynamic || hasStaticSubcategories(category);
    if (!qualifies) return;

    const timeoutId = window.setTimeout(() => {
      setActiveCategory(category);

      if (category.isDynamic) {
        if (category.name === "Academic Disciplines") {
          // ensure parent list is fresh
          refetchParentCategories();
          // optionally prefetch the first parent's subcategories:
          if (parentCategories[0]) {
            fetchSubcategories({ parentId: parentCategories[0]._id });
          }
        } else if (category.name === "Academic Levels") {
          refetchAcademicLevels();
        }
      }
    }, 100);

    setHoverTimeout(timeoutId);
  };

  // ─── Handle click on a top-level category
  const handleClick = useCallback(
    (category) => {
      clearTimeout(hoverTimeout);
      if (category.path && !category.isDynamic) {
        setActiveCategory(null);
        router.push(category.path);
      } else {
        setActiveCategory(category);
        if (category.isDynamic) {
          if (category.name === "Academic Disciplines") {
            refetchParentCategories();
            if (parentCategories[0]) {
              fetchSubcategories({ parentId: parentCategories[0]._id });
            }
          } else if (category.name === "Academic Levels") {
            refetchAcademicLevels();
          }
        }
      }
    },
    [hoverTimeout, router, parentCategories, refetchParentCategories, fetchSubcategories, refetchAcademicLevels]
  );

  const handleMouseLeaveMenu = () => {
    clearTimeout(hoverTimeout);
    setActiveCategory(null);
  };

  const handleMouseOverContainer = (e) => {
    const li = (e.target).closest("li");
    if (li && li.getAttribute("data-has-dropdown") === "false") {
      clearTimeout(hoverTimeout);
      setActiveCategory(null);
    }
  };

  const toggleExpand = (parentId) => {
    setExpandedState((prev) => ({
      ...prev,
      [parentId]: !prev[parentId],
    }));
  };

  // ─── Render ─────────────────────────────────────────
  return (
    <div
      className="relative h-full bg-white rounded-2xl shadow flex"
      onMouseLeave={handleMouseLeaveMenu}
      role="menu"
    >
      {/* Left Panel: Top-Level Categories */}
      <ul
        className="w-full overflow-y-auto text-gray-700"
        onMouseOver={handleMouseOverContainer}
      >
        {categoriesData.map((category) => {
          const qualifies =
            category.isDynamic || hasStaticSubcategories(category);

          return category.path ? (
            <li
              key={category.name}
              className="px-3 py-1"
              data-has-dropdown="false"
            >
              <a href={category.path}>
                <div className="flex items-center space-x-4 hover:bg-gray-100 transition text-sm cursor-pointer">
                  <span className="text-lg">{category.icon}</span>
                  <span>{category.name}</span>
                </div>
              </a>
            </li>
          ) : (
            <li
              key={category.name}
              className="px-2 py-1 space-x-4 cursor-pointer hover:bg-gray-100 transition text-sm flex items-center"
              data-has-dropdown={qualifies ? "true" : "false"}
              onMouseEnter={() => handleHover(category)}
              onClick={() => handleClick(category)}
            >
              <span className="text-lg">{category.icon}</span>
              <span>{category.name}</span>
            </li>
          );
        })}
      </ul>

      {/* Right Panel: Dropdown for Subcategories / Levels */}
      <SubcategoryDropdown
        materialTypeCat={categories}
        activeCategory={activeCategory}
        parentCategories={parentCategories}
        subcategories={
          activeCategory?.name === "Academic Disciplines" && lastFetchedParentId
            ? lastFetchedSubcategories
            : []
        }
        lastFetchedParentId={lastFetchedParentId}
        isLoading={isLoading}
        isLoadingSub={isLoadingSub}
        academicLevels={academicLevels}
        toggleExpand={toggleExpand}
        expandedState={expandedState}
      />
    </div>
  );
}

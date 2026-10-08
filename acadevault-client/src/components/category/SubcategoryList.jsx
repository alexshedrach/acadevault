"use client";

import React, { useState, useEffect, useRef, memo } from "react";
import Link from "next/link";
import { useGetSubcategoriesQuery } from "@/features/category/categoryApi";
import CategorySpinner from "./CategorySpinner";

const SubcategoryList = memo(
  ({
    parentId,
    expanded = false,
    limit = 4,
    className = "",
    emptyMessage = "No subcategories.",
    errorMessage = "Failed to load subcategories.",
  }) => {
    const [debouncedId, setDebouncedId] = useState(parentId);
    const containerRef = useRef(null);

    useEffect(() => {
      const handler = setTimeout(() => setDebouncedId(parentId), 100);
      return () => clearTimeout(handler);
    }, [parentId]);

    useEffect(() => {
      containerRef.current?.scrollTo({ top: 0, behavior: "smooth" });
    }, [debouncedId]);

    const {
      data: { subcategories = [] } = {},
      isLoading,
      error,
      refetch,
    } = useGetSubcategoriesQuery(
      { parentId: debouncedId },
      { skip: !debouncedId }
    );

    const visibleSubs = expanded
      ? subcategories
      : subcategories.slice(0, limit);

    if (isLoading)
      return (
        <div className={`flex justify-center py-4 ${className}`}>
          <CategorySpinner />
        </div>
      );

    if (error)
      return (
        <div className={`py-4 text-center text-sm text-red-500 ${className}`}>
          <p>{errorMessage}</p>
          <button
            onClick={() => refetch()}
            className="mt-2 text-xs text-blue-600 hover:underline"
          >
            Retry
          </button>
        </div>
      );

    if (!subcategories.length)
      return (
        <p className={`py-4 text-center text-sm text-gray-500 ${className}`}>
          {emptyMessage}
        </p>
      );

    return (
      <ul
        ref={containerRef}
        className={`max-h-48 overflow-y-auto space-y-1 ${className}`}
      >
        {visibleSubs.map((sub) => (
          <li
            key={sub._id}
            className="text-sm hover:text-orange-500 transition"
          >
            <Link
              href={`/departments/${sub.slug}`}
              className="flex items-center gap-1"
            >
              <span>📌</span>
              {sub.name}
            </Link>
          </li>
        ))}
      </ul>
    );
  }
);

SubcategoryList.displayName = "SubcategoryList";

export default SubcategoryList;

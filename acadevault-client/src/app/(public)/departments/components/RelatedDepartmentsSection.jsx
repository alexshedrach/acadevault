"use client";

import React from "react";
import Link from "next/link";
import { useRelatedDepartments } from "@/hooks/useRelatedDepartments";
import Loader from "@/components/ui/Loader";
import { truncateText } from "@/helpers/truncateText";

const RelatedDepartmentsSection = ({ currentDepartmentId }) => {
  const { related, loading, error } =
    useRelatedDepartments(currentDepartmentId);

  return (
    <>
      <div className="container mx-auto space-y-2">
        <h2 className="text-xl text-center font-extrabold text-gray-800 mb-6 border-y-2 border-orange-500 inline-block pb-2">
          Related Departments
        </h2>

        {loading && <Loader type="spinner" text="Loading" />}

        {error && (
          <div className="text-red-500 text-sm">
            {error} Please try again later.
          </div>
        )}

        {!loading && !error && related.length === 0 && (
          <div className="text-gray-500 text-sm">
            No related departments found.
          </div>
        )}

        {!loading && related.length > 0 && (
          <div className="grid grid-cols-1 gap-3">
            {related.map((dept) => (
              <Link
                key={dept.slug}
                href={`/departments/${dept.slug}`}
                className="group hover:bg-blue-50 transition flex items-center gap-4 border-b border-gray-200 pb-2"
              >
                <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-xl font-bold group-hover:bg-blue-200 transition">
                  {dept.name.charAt(0)}
                </div>
                <h3 className="text-sm font-semibold text-gray-800 group-hover:text-blue-700">
                  {truncateText(dept.name, 48)}
                </h3>
              </Link>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default RelatedDepartmentsSection;

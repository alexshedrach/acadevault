"use client";

import { useCategoryDetails } from "@/hooks/useCategoryDetails";
import DepartmentDetailHero from "./DepartmentDetailHero";
import SubcategoriesSection from "@/components/category/SubcategoriesSection";
import DepartmentInsightsSection from "./DepartmentInsightsSection";

export default function DepartmentDetail({ departmentSlug, departmentDetail }) {
  // Client-side re-fetch of dynamic stats
  const { category: liveCategory } = useCategoryDetails(departmentSlug);

  // Merge SSR + CSR data: prefer liveCategory fields, fall back to initial
  const category = liveCategory || departmentDetail;
  if (!category) return null;

  return (
    <>
      {/* Breadcrumb / Parent link */}
      <DepartmentDetailHero
        departmentDetail={departmentDetail}
        departmentSlug={departmentSlug}
      />
      <SubcategoriesSection
        subcategories={departmentDetail?.subcategories || []}
      />

      <DepartmentInsightsSection
        stats={departmentDetail}
        departmentSlug={departmentSlug}
      />
    </>
  );
}

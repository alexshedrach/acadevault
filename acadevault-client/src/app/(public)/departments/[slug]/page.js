import Navbar from "@/components/header/Navbar";
import MaterialHelpSection from "@/components/materials/MaterialHelpSection";
import { fetchCategoryDetailBySlug } from "@/lib/categories/fetchCategoryDetailBySlug";
import { fetchServerMaterialsByCategory } from "@/lib/materials/fetchMaterialsByCategory";
import { generatePageMetadata } from "@/lib/metadata/generatePageMetadata";
import CategoryDetail from "../components/DepartmentDetail";
import ClientDepartmentMaterials from "../components/ClientDepartmentMaterials";
import DepartmentCTASection from "../components/DepartmentCTASection";

export async function generateMetadata({ params }) {
  const { slug } = await params; // ✅ await this

  const decoded = decodeURIComponent(slug).replace(/-/g, " ");
  const pageTitle = `${decoded} Department Materials`;
  const pageDescription = `Browse materials published under the “${decoded}” department on AcadeVault.`;
  const urlSlug = `departments/${slug}`;

  return generatePageMetadata({
    title: pageTitle,
    description: pageDescription,
    slug: urlSlug,
  });
}

export default async function DepartmentDetailPage({ params, searchParams }) {
  const { slug } = await params; // ✅ await
  const departmentSlug = decodeURIComponent(slug);

  const incoming = await searchParams; // ✅ await
  const cleanedParams = {};
  for (const [key, value] of Object.entries(incoming || {})) {
    if (typeof value === "string" && value.trim() !== "") {
      cleanedParams[key] = value;
    }
  }

  const initialData = await fetchServerMaterialsByCategory({
    categorySlug: departmentSlug,
    categoryType: "Department",
    ...cleanedParams,
  });

  const initialDepartmentDetailData = await fetchCategoryDetailBySlug(
    departmentSlug
  );

  const noMaterials =
    !initialData ||
    !Array.isArray(initialData.materials) ||
    initialData.materials.length === 0;

  return (
    <>
      <Navbar showSearch showCategories />
      <CategoryDetail
        departmentSlug={departmentSlug}
        noMaterials={noMaterials}
        departmentDetail={initialDepartmentDetailData}
      />

      <ClientDepartmentMaterials
        initialData={initialData}
        departmentSlug={departmentSlug}
        initialSearchParams={cleanedParams}
      />

      {/* <DepartmentCTASection /> */}
      <DepartmentCTASection
        title="Get Involved with {department}"
        description="Join our community or explore resources for {department}."
        gradient="from-blue-900 to-indigo-900"
        // ctaButtons={customButtons}
        departmentSlug="computer-science"
      />

      <MaterialHelpSection />
    </>
  );
}

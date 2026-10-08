import { generatePageMetadata } from "@/lib/metadata/generatePageMetadata";
import Navbar from "@/components/header/Navbar";
import ClientDepartments from "./components/ClientDepartments";
import { fetchServerDepartments } from "@/lib/categories/fetchServerDepartments";

// Generate SEO metadata for the departments page
export async function generateMetadata() {
  return generatePageMetadata({
    title: "Departments - Academic Disciplines",
    description:
      "Browse academic departments and disciplines to find curated resources for your studies on Acadavault.",
    slug: "departments",
  });
}

// Server-side page component
export default async function DepartmentListPage({ searchParams }) {
  // searchParams is now async in server components
  const params = await searchParams;

  // Clean search parameters to remove empty or invalid values
  const cleanedParams = {};
  for (const [key, value] of Object.entries(params)) {
    if (typeof value === "string" && value.trim() !== "") {
      cleanedParams[key] = value;
    }
  }

  // Set default limit to 20 for consistency
  cleanedParams.limit = cleanedParams.limit || 20;
  cleanedParams.page = Number(cleanedParams.page) || 1;

  // Fetch initial data from the server
  const initialData = await fetchServerDepartments(cleanedParams);

  return (
    <>
      <Navbar showCategories showSearch />
      <ClientDepartments
        initialData={initialData}
        initialSearchParams={cleanedParams}
      />
    </>
  );
}
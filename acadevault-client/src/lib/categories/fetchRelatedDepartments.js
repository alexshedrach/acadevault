export async function fetchRelatedDepartments(currentDepartmentId) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v2/categories/departments/${currentDepartmentId}/related`;

  const res = await fetch(url);

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(
      errorData.message || "Failed to fetch related departments."
    );
  }

  const { data } = await res.json();
  return data.relatedDepartments || [];
}

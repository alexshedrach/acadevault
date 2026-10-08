export function buildDepartmentUrl(params = {}) {
  const basePath = "/api/v2/categories/departments";
  const query = new URLSearchParams();

  for (const [key, value] of Object.entries(params)) {
    if (typeof value === "string" || typeof value === "number") {
      query.set(key, value.toString());
    }
  }

  return `${basePath}?${query.toString()}`;
}


export function transformDepartmentResponse(response, params = {}) {
  if (
    response?.status !== "success" ||
    !response?.data?.departments ||
    !Array.isArray(response.data.departments)
  ) {
    return {
      departments: [],
      pagination: {
        page: Number(params.page) || 1,
        limit: Number(params.limit) || 10,
        totalPages: 0,
        totalResults: 0,
      },
    };
  }

  return {
    departments: response.data.departments,
    pagination: response.pagination,
  };
}
export const TAG_TYPES = {
  MATERIAL: "Material",
  MATERIAL_LIST: "MaterialList",
  RelatedMaterials: "RelatedMaterials",
  FeaturedMaterials: "FeaturedMaterials",
  PopularTags: "PopularTags",
};

/**
 * buildMaterialUrl({ categorySlug, shopId, materialId, related, ...queryParams })
 *   - categorySlug?     →  /api/v2/academic-materials/category/[categorySlug]/materials
 *   - shopId?           →  /api/v2/academic-materials/shop/[shopId]/materials
 *   - materialId+related → /api/v2/academic-materials/[materialId]/related
 *   - else              →  /api/v2/academic-materials?…queryParams
 *
 * NOTE: Only string|number values in queryParams. If you pass anything else
 * (e.g. a Symbol), URLSearchParams will blow up. In our page we will ensure
 * `searchParams` is a plain object of strings.
 */
export const buildMaterialUrl = (params = {}) => {
  const {
    categorySlug,
    shopId,
    materialId,
    related,
    // spread all other keys into a new object; these should be plain strings or numbers:
    ...rest
  } = params;

  let base = "/api/v2/academic-materials";

  if (typeof categorySlug === "string") {
    base += `/category/${encodeURIComponent(categorySlug)}/materials`;
  } else if (typeof shopId === "string") {
    base += `/shop/${encodeURIComponent(shopId)}/materials`;
  } else if (typeof materialId === "string" && related) {
    base += `/${encodeURIComponent(materialId)}/related`;
  }

  // Only keep keys whose values are string or number
  const safeQueryEntries = Object.entries(rest).filter(
    ([, value]) => typeof value === "string" || typeof value === "number"
  );
  const queryString = safeQueryEntries.length
    ? `?${new URLSearchParams(Object.fromEntries(safeQueryEntries)).toString()}`
    : "";

  return `${base}${queryString}`;
};

/**
 * transformMaterialResponse(responseJson, arg)
 *  - If arg.related === true → assumes responseJson.data.relatedMaterials, etc.
 *  - Otherwise expects responseJson.data.materials + responseJson.pagination (or metadata)
 */
export const transformMaterialResponse = (response, arg = {}) => {
  // If we're fetching “related” materials:
  if (arg.related) {
    return response.data.relatedMaterials;
  }
  

  // Otherwise:
  const materials = response.data?.materials ?? response.data;
  const pagination = response.pagination ??
    response.metadata ?? {
      totalPages: 1,
      currentPage: 1,
      totalResults: Array.isArray(materials) ? materials.length : 0,
    };

  return { materials, pagination };
};

/**
 * provideMaterialTags: tags for RTK Query invalidation/caching
 */
export const provideMaterialTags = (result, arg) => {
  if (!result) {
    return [{ type: "MaterialList", id: "LIST" }];
  }

  // If this was a “related” fetch:
  if (arg?.related) {
    return [{ type: TAG_TYPES.RelatedMaterials, id: arg.materialId }];
  }

  // If we flagged isFeatured in the arg:
  if (arg?.isFeatured) {
    return [{ type: TAG_TYPES.FeaturedMaterials, id: "LIST" }];
  }

  // Default: tag each individual material + list
  if (Array.isArray(result.materials)) {
    return [
      ...result.materials.map((m) => ({ type: TAG_TYPES.MATERIAL, id: m.id })),
      { type: TAG_TYPES.MATERIAL_LIST, id: "LIST" },
    ];
  }

  return [{ type: TAG_TYPES.MATERIAL_LIST, id: "LIST" }];
};

// export const buildMaterialUrl = (params = {}) => {
//   const { categorySlug, shopId, materialId, related, ...queryParams } = params;

//   let base = "/api/v2/academic-materials";

//   if (categorySlug) {
//     base += `/category/${categorySlug}/materials`;
//   } else if (shopId) {
//     base += `/shop/${shopId}/materials`;
//   } else if (materialId && related) {
//     base += `/${materialId}/related`;
//   }

//   const queryString = new URLSearchParams(queryParams).toString();
//   return `${base}?${queryString}`;
// };

// export const transformMaterialResponse = (response, arg) => {
//   if (arg?.related) {
//     return {
//       relatedMaterials: response.data.relatedMaterials,
//       metadata: {
//         results: response.data.results,
//         status: response.data.status,
//       },
//     };
//   }

//   const materials = response.data?.materials || response.data;
//   const pagination = response.pagination ||
//     response.metadata || {
//       totalPages: 1,
//       currentPage: 1,
//       totalResults: materials.length,
//     };

//   return { materials, pagination };
// };

// export const provideMaterialTags = (result, arg) => {
//   if (arg?.related) {
//     return [{ type: "RelatedMaterials", id: arg.materialId }];
//   }

//   if (arg?.isFeatured) {
//     return [{ type: "FeaturedMaterials", id: "LIST" }];
//   }

//   return result?.materials
//     ? [
//         ...result.materials.map(({ id }) => ({ type: "Material", id })),
//         { type: "MaterialList", id: "LIST" },
//       ]
//     : [{ type: "MaterialList", id: "LIST" }];
// };

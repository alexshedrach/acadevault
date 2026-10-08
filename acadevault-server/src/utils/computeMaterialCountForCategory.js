import AcademicMaterial from "../api/models/AcademicMaterialModel.js";

async function computeMaterialCountForCategory(category) {
  const matchConditions = [
    { categories: category._id },
    { department: category._id },
  ];

  if (
    category.categoryType === "Material Type" &&
    category.materialTypes?.length
  ) {
    matchConditions.push({ materialType: { $in: category.materialTypes } });
  }

  return AcademicMaterial.countDocuments({
    status: "published",
    $or: matchConditions,
  });
}

export default computeMaterialCountForCategory;

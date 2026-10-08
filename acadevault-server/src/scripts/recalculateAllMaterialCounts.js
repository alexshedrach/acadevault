import Category from "../api/models/CategoryModel.js";

// Run this after bulk imports, migrations, or bug fixes.
export async function recalculateAllMaterialCounts() {
  const categories = await Category.find();
  for (const category of categories) {
    const count = await computeMaterialCountForCategory(category);
    await Category.updateOne(
      { _id: category._id },
      { $set: { materialCount: count } }
    );
  }
}

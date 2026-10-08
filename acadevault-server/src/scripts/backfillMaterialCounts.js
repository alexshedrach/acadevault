import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Category from '../api/models/CategoryModel.js';
import AcademicMaterial from '../api/models/AcademicMaterialModel.js';

dotenv.config();

(async function main() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.DB_URI_CLOUD, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Connected to MongoDB');

    // Reset all materialCounts to 0
    await Category.updateMany({}, { $set: { materialCount: 0 } });
    console.log('Reset materialCount to 0 for all categories');

    // Count Map
    const categoryCountMap = new Map();

    function addToMap(categoryId) {
      if (!categoryId) return;
      const id = categoryId.toString();
      categoryCountMap.set(id, (categoryCountMap.get(id) || 0) + 1);
    }

    // Fetch all materials
    const materials = await AcademicMaterial.find().select(
      'categories department materialType',
    );

    for (const material of materials) {
      if (Array.isArray(material.categories)) {
        material.categories.forEach((catId) => addToMap(catId));
      }

      addToMap(material.department);
      addToMap(material.materialType);
    }

    // Load referenced categories to get parentCategory
    const allCategoryIds = Array.from(categoryCountMap.keys());
    const categories = await Category.find({
      _id: { $in: allCategoryIds },
    }).select('_id parentCategory');

    // Include parent categories (1 level up)
    for (const cat of categories) {
      if (cat.parentCategory) {
        addToMap(cat.parentCategory);
      }
    }

    // Update all affected categories
    for (const [catId, count] of categoryCountMap.entries()) {
      await Category.findByIdAndUpdate(catId, {
        $inc: { materialCount: count },
      });
    }

    console.log(
      `Backfill complete. Updated ${categoryCountMap.size} categories.`,
    );
  } catch (err) {
    console.error('Error during backfill:', err);
  } finally {
    await mongoose.disconnect();
    console.log('MongoDB connection closed');
  }
})();

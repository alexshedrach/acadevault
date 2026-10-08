import mongoose from 'mongoose';
import Category from '../api/models/CategoryModel.js';
import AcademicMaterial from '../api/models/AcademicMaterialModel.js';
import { updateMaterialCounts } from '../utils/updateMaterialCount.js';
import dotenv from 'dotenv';

dotenv.config();

async function rebuildAllCounts() {
  await mongoose.connect(process.env.DB_URI_CLOUD);

  // Reset all counts
  await Category.updateMany({}, { materialCount: 0 });

  // Re-add from all published materials
  const materials = await AcademicMaterial.find({ status: 'published' });

  for (const material of materials) {
    await updateMaterialCounts(material, +1);
  }

  console.log(
    `Recalculated counts for ${materials.length} published materials.`,
  );
  process.exit();
}

rebuildAllCounts();

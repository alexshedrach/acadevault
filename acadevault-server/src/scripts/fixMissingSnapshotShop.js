// scripts/fixMissingSnapshotShop.js
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Cart from '../api/models/CartModel.js';
import AcademicMaterial from '../api/models/AcademicMaterialModel.js';

dotenv.config(); // Load env vars

await mongoose.connect(process.env.DB_URI_CLOUD); // ✅ Use your real URI

console.log('Connected to DB. Looking for affected carts...');

const carts = await Cart.find({ 'items.materialSnapshot.shop': { $exists: false } });

console.log(`Found ${carts.length} carts with missing snapshot.shop`);

for (const cart of carts) {
  let changed = false;

  for (const item of cart.items) {
    if (!item.materialSnapshot.shop) {
      const mat = await AcademicMaterial.findById(item.materialSnapshot._id).lean();
      if (mat?.shop) {
        item.materialSnapshot.shop = mat.shop;
        changed = true;
      }
    }
  }

  if (changed) {
    await cart.save();
    console.log(`Fixed cart ${cart._id}`);
  }
}

console.log('✅ Fix complete');
await mongoose.disconnect();
process.exit(0);

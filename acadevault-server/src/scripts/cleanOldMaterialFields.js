import dotenv from 'dotenv';
import mongoose from 'mongoose';
import AcademicMaterial from '../api/models/AcademicMaterialModel.js';

dotenv.config();

async function cleanOldMaterialFields() {
  try {
    await mongoose.connect(process.env.DB_URI_CLOUD);

    // List all the old fields you want to remove
    // const fieldsToDelete = {
    //   discount: '',
    //   currency: '',
    //   // Add more fields as needed
    // };

    // Update all documents at once
    const result = await AcademicMaterial.updateMany(
      {},
      { $unset: { discount: 0, currency: 'USD' } },
    );

    console.log(
      `Updated ${result.modifiedCount} documents. Old fields removed.`,
    );

    const leftovers = await AcademicMaterial.find({
      $or: [{ discount: { $exists: true } }, { currency: { $exists: true } }],
    });

    console.log(`Documents still having old fields: ${leftovers.length}`);
  } catch (err) {
    console.error('Error cleaning old fields:', err);
  } finally {
    mongoose.connection.close();
  }
}

cleanOldMaterialFields();

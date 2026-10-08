import cron from "node-cron";
import AcademicMaterial from "../api/models/AcademicMaterialModel.js";
import { logger } from "../utils/logger.js";

// Periodic task to recalculate rankings
cron.schedule("0 0 * * *", async () => {
  // Run at midnight every day
  try {
    // Fetch all materials
    const materials = await AcademicMaterial.find();

    // Calculate ranking score for each material and update its rank
    for (const material of materials) {
      const rankingScore = AcademicMaterial.calculateRankingScore(material);
      material.rank = rankingScore;
      await material.save();
    }

    logger.log("Material rankings updated successfully.");
  } catch (error) {
    logger.error("Error updating rankings:", error);
  }
});

// import { cacheRanking, getCachedRanking } from "../services/cacheService"; // Import cache service

// // Periodic task to recalculate and cache rankings
// cron.schedule("0 0 * * *", async () => {
//   // This runs every day at midnight
//   try {
//     console.log("Recalculating material rankings and updating cache...");

//     // Fetch all materials
//     const materials = await AcademicMaterial.find();

//     for (let material of materials) {
//       // Calculate the ranking score
//       const rankingScore = AcademicMaterial.calculateRankingScore(material);

//       // Cache the calculated ranking in Redis
//       await cacheRanking(material._id, rankingScore);

//       // Update material rank in DB if needed (optional)
//       material.rank = rankingScore;
//       await material.save();
//     }

//     console.log("Material rankings updated and cached successfully.");
//   } catch (error) {
//     console.error("Error updating rankings:", error);
//   }
// });

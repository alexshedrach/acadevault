// workers/thumbnailWorker.js
import { Worker } from 'bullmq';
import { generateThumbnail } from '../helper/thumbnailGenerator.js';
import AcademicMaterial from '../api/models/AcademicMaterialModel.js';
import { redisConnection } from '../queues/redisClient.js';


const worker = new Worker(
  'thumbnail-generation',
  async (job) => {
    const { materialId, fileUrl, mimeType, fileName } = job.data;

    const thumbnailPath = await generateThumbnail(fileUrl, mimeType, fileName);
    if (!thumbnailPath) return;

    await AcademicMaterial.findByIdAndUpdate(materialId, {
      thumbnail: thumbnailPath,
    });
  },
  { connection: redisConnection },
);

worker.on('completed', (job) => {
  console.log(`✅ Thumbnail generated for job ${job.id}`);
});

worker.on('failed', (job, err) => {
  console.error(`❌ Thumbnail generation failed for job ${job.id}`, err);
});

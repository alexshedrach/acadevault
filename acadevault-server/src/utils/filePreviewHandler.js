import File from '../api/models/FileModel.js';
import { handleMaterialFileUpload } from '../helper/handleMaterialFileUpload.js';
import previewFileGenerator from '../helper/previewFileGenerator.js';

export const handlePreviewFiles = async ({
  files,
  academicMaterial,
  mainFileDoc,
  pageCount,
  session,
  useLocal = process.env.NODE_ENV !== 'production',
}) => {
  let previewFileIds = [];

  // If user uploaded preview files manually
  if (files.previewFiles?.length > 0) {
    // Delete old previews if any exist
    if (academicMaterial.previewFiles?.length > 0) {
      await File.deleteMany(
        { _id: { $in: academicMaterial.previewFiles } },
        { session },
      );
      academicMaterial.previewFiles = [];
    }

    const previewResults = await Promise.allSettled(
      files.previewFiles.map((file) =>
        handleMaterialFileUpload(
          file,
          academicMaterial._id,
          null,
          useLocal,
          'preview',
        ),
      ),
    );

    const validPreviews = previewResults
      .filter(
        (r) =>
          r.status === 'fulfilled' &&
          r.value.fileDetails.validationStatus === 'validated',
      )
      .map((r) => r.value.fileDetails);

    const previewDocs = await File.insertMany(validPreviews, { session });
    previewFileIds = previewDocs.map((f) => f._id);
    academicMaterial.previewFiles = previewFileIds;

    academicMaterial.previewSource = 'manual';
    academicMaterial.previewPageRange = null;
  }
  // If no manual previews, attempt auto-generation
  else if (mainFileDoc && pageCount) {
    const autoPreviews = await previewFileGenerator.generatePreviewFiles(
      mainFileDoc[0].fileUrl,
      pageCount,
      academicMaterial._id,
      useLocal,
    );

    const previewDocs = await File.insertMany(autoPreviews, { session });
    previewFileIds = previewDocs.map((f) => f._id);
    academicMaterial.previewFiles = previewFileIds;

    academicMaterial.previewSource = 'auto-generated';
    academicMaterial.previewPageRange = '1-5'; // or make this dynamic later
  }

  return previewFileIds;
};

// Usage

// After handling and saving the main file

// const previewFileIds = await handlePreviewFiles({
//   files,
//   academicMaterial,
//   mainFileDoc,
//   pageCount,
//   session,
//   useLocal
// });

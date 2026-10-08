import AcademicMaterialService from '../../services/academicMaterialService.js';
import ApiFeatures from '../../utils/ApiFeatures.js';
import { catchAsyncErrors } from '../../utils/catchAsyncErrors.js';
import AppError from '../../utils/HandleAppErrors.js';
import { useLocal } from '../../utils/envUtils.js';
import AcademicMaterial from '../models/AcademicMaterialModel.js';
import { academicMaterialValidationSchema } from '../validations/academicMaterialValidation.js';
import { validateObjectId } from '../../utils/validateObjectId.js';
import { validateUpdatedFields } from '../validations/validateUpdatedFields.js';
import ExchangeRate from '../models/exchangeRateModel.js';

// Controller for creating academic materials
export const createAcademicMaterial = catchAsyncErrors(
  async (req, res, next) => {
    // Extract user and metadata
    const { id: userId } = req.user;
    const body = req.body;

    // Validate input data using Joi
    const { error } = academicMaterialValidationSchema.validate(body, {
      abortEarly: false,
    });

    if (error) {
      const errors = error.details.map((detail) => detail.message);
      return next(new AppError(errors.join(', '), 400));
    }

    // Call the service to create academic material
    const academicMaterial =
      await AcademicMaterialService.createMaterialMetadata(body, userId);

    // Respond with success message and created material data
    res.status(201).json({
      success: true,
      message: 'Academic material created successfully',
      data: academicMaterial,
    });
  },
);

// 4️⃣ Implement Controller for File Upload
// 📌 controllers/academicMaterialController.js
export const uploadMaterialFileController = catchAsyncErrors(
  async (req, res, next) => {
    // Allow at least one of the following: main file, thumbnail, or preview files.
    if (
      !req.files ||
      (!req.files.file &&
        !req.files.thumbnail &&
        !req.files.previewFiles &&
        !req.files.additionalFiles)
    ) {
      return next(
        new AppError(
          'At least one file (main, thumbnail, additional, or preview) is required.',
          400,
        ),
      );
    }

    const { materialId } = req.params; // Material ID from the request
    const userId = req.user.id; // User ID from the logged-in user
    const { file, thumbnail, additionalFiles, previewFiles } = req.files; // Extract file, thumbnail, additionalFiles, and previewFiles

    try {
      const updatedMaterial =
        await AcademicMaterialService.uploadMaterialFileService(
          materialId,
          { file, thumbnail, additionalFiles, previewFiles },
          userId,
          useLocal, // Use local or cloud storage
        );

      // Handle validation errors
      if (updatedMaterial.validationErrors) {
        return res.status(400).json({
          status: 'fail',
          message: 'File validation failed.',
          errors: updatedMaterial.validationErrors,
        });
      }

      // Successful response
      res.status(200).json({
        status: 'success',
        message: 'File uploaded successfully.',
        data: updatedMaterial,
      });
    } catch (error) {
      next(error); // Pass any error to the global error handler
    }
  },
);

/**
 * Controller for submitting material for review.
 *
 * @route POST /api/materials/submit/:materialId
 * @access Authenticated users (authors)
 */
export const submitForReviewController = catchAsyncErrors(
  async (req, res, next) => {
    const { materialId } = req.params;
    const userId = req.user.id;

    // Validate user authentication
    if (!userId) {
      return next(new AppError('User authentication required.', 401));
    }

    if (!materialId) {
      return next(new AppError('Shop ID is required.', 400));
    }

    const updatedMaterial =
      await AcademicMaterialService.submitMaterialForReview(materialId, userId);

    res.status(200).json({
      status: 'success',
      message: 'Material submitted for review successfully.',
      data: { material: updatedMaterial },
    });
  },
);

/**
 * Controller for resubmitting rejected material.
 *
 * @route PUT /api/materials/resubmit/:materialId
 * @access Authenticated users (authors)
 */
export const resubmitMaterialController = catchAsyncErrors(
  async (req, res, next) => {
    const { materialId } = req.params;
    const userId = req.user.id;

    // Validate user authentication
    if (!userId) {
      return next(new AppError('User authentication required.', 401));
    }

    if (!materialId) {
      return next(new AppError('Shop ID is required.', 400));
    }

    const updatedMaterial =
      await AcademicMaterialService.resubmitMaterialForReview(
        materialId,
        userId,
      );

    res.status(200).json({
      status: 'success',
      message: 'Material resubmitted for review successfully.',
      data: { material: updatedMaterial },
    });
  },
);

/**
 * Controller to get all materials pending review.
 *
 * @route GET /api/admin/materials/review
 * @access Admin only
 */

// Controller to get all materials pending review
export const getPendingReviewMaterialsController = catchAsyncErrors(
  async (req, res, next) => {
    const { status } = req.query; // Extract status from query parameters
    if (!status || !['pending_review', 'awaiting-approval'].includes(status)) {
      return next(
        new AppError('Invalid or missing status query parameter.', 400),
      );
    }

    const query = AcademicMaterial.find({ status, includeUnpublished: true }); // Dynamically filter by status
    const features = new ApiFeatures(query, req.query)
      .filter()
      .search(['title', 'description', 'tags']) // Adjust fields for search
      .sort();

    await features.pagination(5); // Default limit: 5
    const materials = await features.query
      .populate('createdBy', 'name email') // Populate creator details
      .populate('categories', 'name'); // Populate category names

    res.status(200).json({
      status: 'success',
      results: materials.length,
      data: { materials },
      pagination: features.paginationMetadata, // Include pagination metadata
    });
  },
);

/**
 * Controller to approve a material.
 *
 * @route PUT /api/admin/materials/approve/:materialId
 * @access Admin only
 */
export const approveMaterialController = catchAsyncErrors(async (req, res) => {
  const { materialId } = req.params;
  const adminId = req.user.id;

  const updatedMaterial = await AcademicMaterialService.approveMaterial(
    materialId,
    adminId,
  );

  res.status(200).json({
    status: 'success',
    message: 'Material approved successfully.',
    data: { material: updatedMaterial },
  });
});

/**
 * Controller to reject a material.
 *
 * @route PUT /api/admin/materials/reject/:materialId
 * @access Admin only
 */
export const rejectMaterialController = catchAsyncErrors(async (req, res) => {
  const { materialId } = req.params;
  const { feedback } = req.body;
  const adminId = req.user.id;

  const updatedMaterial = await AcademicMaterialService.rejectMaterial(
    materialId,
    adminId,
    feedback,
  );

  res.status(200).json({
    status: 'success',
    message: 'Material rejected successfully.',
    data: { material: updatedMaterial },
  });
});

// Controller for resolving a correction made by the admin
export const resolveCorrectionController = catchAsyncErrors(
  async (req, res) => {
    const { materialId, correctionId } = req.params;
    const { sellerResponse } = req.body;

    const updatedMaterial = await AcademicMaterialService.resolveCorrection(
      materialId,
      correctionId,
      sellerResponse,
    );

    res.status(200).json({
      status: 'success',
      message: 'Correction resolved successfully.',
      data: { material: updatedMaterial },
    });
  },
);

// Controller for confirming a correction resolution by the admin
export const confirmResolutionController = catchAsyncErrors(
  async (req, res) => {
    const { materialId, correctionId } = req.params;
    const adminId = req.user.id;

    const updatedMaterial = await AcademicMaterialService.confirmResolution(
      materialId,
      correctionId,
      adminId,
    );

    res.status(200).json({
      status: 'success',
      message: 'Correction confirmed as resolved.',
      data: { material: updatedMaterial },
    });
  },
);

// 2️⃣ Controller Layer
// 📌 controllers/academicMaterialController.js
export const updateAcademicMaterial = catchAsyncErrors(async (req, res) => {
  const { id: userId } = req.user;
  const { materialId } = req.params;
  const updates = req.body;

  // ✅ Selectively validate only the updated fields
  validateUpdatedFields(updates);

  // Call service layer to process the update
  const updateResponse =
    await AcademicMaterialService.updateAcademicMaterialService(
      materialId,
      updates,
      userId,
    );

  res.status(200).json({
    success: true,
    message: updateResponse.message,
    data: updateResponse.data || null,
  });
});

export const reviewPendingChanges = catchAsyncErrors(async (req, res) => {
  const { materialId } = req.params;
  const { action, feedback } = req.body; // 'approve' or 'reject'
  const user = req.user; // Assuming admin ID is available in the request

  const result = await AcademicMaterialService.reviewPendingChangesService(
    materialId,
    action,
    user,
    feedback,
  );

  res.status(200).json({
    success: true,
    message: result.message,
    data: result.updatedMaterial || null, // Return updated material for approval
  });
});

// 3️⃣ Controller Layer
// 📌 To Soft Delete Academic Material
export const deleteAcademicMaterial = catchAsyncErrors(async (req, res) => {
  const { materialId } = req.params;
  const response = await AcademicMaterialService.deleteAcademicMaterialService(
    materialId,
    req.user.id,
  );

  res.status(200).json({
    success: true,
    ...response,
  });
});

export const restoreAcademicMaterial = catchAsyncErrors(async (req, res) => {
  const { materialId } = req.params;
  const response = await AcademicMaterialService.restoreAcademicMaterialService(
    materialId,
    req.user.id,
  );

  res.status(200).json({
    success: true,
    ...response,
  });
});

// 2️⃣ Controller Layer (Bulk Soft Delete & Restore)
// 📌 controllers/academicMaterialController.js
export const bulkDeleteAcademicMaterials = catchAsyncErrors(
  async (req, res) => {
    const { materialIds } = req.body;
    const response =
      await AcademicMaterialService.bulkDeleteAcademicMaterialsService(
        materialIds,
        req.user.id,
      );

    res.status(200).json({
      success: true,
      ...response,
    });
  },
);

export const bulkRestoreAcademicMaterials = catchAsyncErrors(
  async (req, res) => {
    const { materialIds } = req.body;
    const response =
      await AcademicMaterialService.bulkRestoreAcademicMaterialsService(
        materialIds,
        req.user.id,
      );

    res.status(200).json({
      success: true,
      ...response,
    });
  },
);

// 2️⃣ Create Restore Controller
// 📌 controllers/academicMaterialController.js

export const restoreMaterialController = catchAsyncErrors(async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id; // Get user ID from auth middleware

  const restoredMaterial =
    await AcademicMaterialService.restoreAcademicMaterial(id, userId);

  res.status(200).json({
    status: 'success',
    message: 'Academic material restored successfully.',
    data: restoredMaterial,
  });
});

/**
 * Admin Restore - Restore any deleted academic material.
 */
export const adminRestoreMaterialController = catchAsyncErrors(
  async (req, res) => {
    const { id } = req.params;

    const restoredMaterial =
      await AcademicMaterialService.adminRestoreAcademicMaterial(id);

    res.status(200).json({
      status: 'success',
      message: 'Academic material restored successfully by admin.',
      data: restoredMaterial,
    });
  },
);

// 2️⃣ Create Admin Permanent Delete Controller
// 📌 controllers/academicMaterialController.js

/**
 * Admin Permanent Delete - Permanently delete any deleted academic material.
 */
export const adminPermanentDeleteMaterialController = catchAsyncErrors(
  async (req, res) => {
    const { id } = req.params;

    const response =
      await AcademicMaterialService.adminPermanentDeleteAcademicMaterial(id);

    res.status(200).json({
      status: 'success',
      message: response.message,
    });
  },
);

/**
 * Controller to handle material details based on user role.
 */
export const getMaterialDetailsController = async (req, res, next) => {
  try {
    const { materialId } = req.params;

    const materialDetails =
      await AcademicMaterialService.getMaterialDetails(materialId);

    res.status(200).json({
      status: 'success',
      data: materialDetails,
    });
  } catch (error) {
    next(error);
  }
};

// Controller to fetch materials (Public + Role-Based)
export const getAcademicMaterialsController = catchAsyncErrors(
  async (req, res) => {
    // Default userRole to "user" since this is a public endpoint
    const userRole = req.user || 'User';
    const { query } = req;

    const { materials, paginationMetadata } =
      await AcademicMaterialService.getAcademicMaterials(query, userRole);

    res.status(200).json({
      success: true,
      pagination: paginationMetadata,
      data: materials,
    });
  },
);

export const getMaterialsByShopController = catchAsyncErrors(
  async (req, res) => {
    const { shopId } = req.params;
    const { exclude } = req.query;

    const user = req.user || null; // From maybeProtectRoutes
    const userId = user?.id;
    const userRole = user?.role || 'User';

    const { materials, metadata } =
      await AcademicMaterialService.getMaterialsByShop({
        shopId,
        query: req.query,
        user: user ? { id: userId, role: userRole } : null,
        excludeMaterialId: exclude,
      });

    res.status(200).json({
      status: 'success',
      results: materials.length,
      metadata,
      data: materials,
    });
  },
);

export const getMaterialsByCategoryController = catchAsyncErrors(
  async (req, res) => {
    const { categorySlug } = req.params;
    const query = req.query;

    const { materials, pagination } =
      await AcademicMaterialService.getMaterialsByCategories(
        categorySlug,
        query,
      );

    res.status(200).json({
      status: 'success',
      results: materials.length,
      pagination,
      data: materials,
    });
  },
);

/**
 * @desc Get academic materials by level and degree
 * @route GET /api/v1/materials?level=Undergraduate&degree=B.Sc
 * @access Public
 */
export const getMaterialsByLevelAndDegree = catchAsyncErrors(
  async (req, res) => {
    const data =
      await AcademicMaterialService.getMaterialsByLevelAndDegreeService(
        req.query,
        {
          currency: req.query.currency || 'NGN',
          region: req.query.region || null,
          date: new Date(),
        },
      );

    res.status(200).json({
      status: 'success',
      results: data.materials.length,
      data,
    });
  },
);

export const getRelatedMaterialsController = catchAsyncErrors(
  async (req, res, next) => {
    const { materialId } = req.params;

    validateObjectId(materialId, 'AcademicMaterial');

    const material = await AcademicMaterial.findById(materialId);

    if (!material) {
      return next(new AppError('Academic material not found', 404));
    }

    const relatedMaterials = await material.findRelatedMaterials(req.query);

    res.status(200).json({
      status: 'success',
      results: relatedMaterials.length,
      data: {
        relatedMaterials,
      },
    });
  },
);

/**
 * @desc Fetch top 10 most used tags across academic materials
 * @route GET /api/tags/popular
 * @access Public
 */
export const getPopularTags = catchAsyncErrors(async (req, res, next) => {
  const topTags = await AcademicMaterial.aggregate([
    { $match: { isPublished: true, isDeleted: false } },
    { $unwind: "$tags" },
    { $group: { _id: "$tags", count: { $sum: 1 } } },
    { $sort: { count: -1 } },
    { $limit: 10 },
  ]);

  if (!topTags || topTags.length === 0) {
    return next(new AppError("No tags found", 404));
  }

  res.status(200).json({
    status: "success",
    results: topTags.length,
    data: {
      tags: topTags.map((tag) => tag._id),
    },
  });
});

//Preview Endpoint Implementation
export const getMaterialPreview = catchAsyncErrors(async (req, res, next) => {
  const { materialId } = req.params;

  const material = await AcademicMaterial.findById(materialId).populate({
    path: 'previewFiles',
    select: 'fileUrl fileType', // Only fetch relevant preview file details
  });

  if (!material) {
    return next(new AppError('Academic material not found.', 404));
  }

  res.status(200).json({
    success: true,
    data: {
      previewFiles: material.previewFiles,
    },
  });
});

export const getExchangeRates = async (req, res) => {
  const rates = await ExchangeRate.findOne({ base: 'USD' });
  if (!rates) return res.status(404).json({ message: 'Rates not found' });

  res.json({
    base: rates.base,
    rates: Object.fromEntries(rates.rates),
    lastUpdated: rates.lastUpdated,
  });
};

export const searchMaterialsController = catchAsyncErrors(async (req, res) => {
  const { materials, metadata } = await AcademicMaterialService.searchMaterials(
    req.query,
  );

  res.status(200).json({
    status: 'success',
    results: materials.length,
    metadata,
    data: materials,
  });
});

// TODO

// Backend Setup for DOCX to HTML Conversion (Node.js + LibreOffice)

// sudo apt-get install libreoffice
// npm install express multer uuid fs-extra

// routes/convert-docx.js
// const express = require("express");
// const multer = require("multer");
// const fs = require("fs-extra");
// const { v4: uuidv4 } = require("uuid");
// const { exec } = require("child_process");
// const path = require("path");

// const router = express.Router();
// const upload = multer({ dest: "uploads/" });

// router.post("/", upload.single("file"), async (req, res) => {
//   const file = req.file;

//   if (!file || !file.path.endsWith(".docx")) {
//     return res.status(400).json({ error: "Only DOCX files are supported." });
//   }

//   const outDir = `converted/${uuidv4()}`;
//   await fs.ensureDir(outDir);
//   const outputPath = path.join(outDir, `${file.filename}.html`);

//   const command = `libreoffice --headless --convert-to html --outdir ${outDir} ${file.path}`;

//   exec(command, async (err) => {
//     if (err) {
//       console.error(err);
//       return res.status(500).json({ error: "Conversion failed." });
//     }

//     const html = await fs.readFile(outputPath, "utf-8");
//     res.send({ html });
//     await fs.remove(file.path); // Clean up
//     await fs.remove(outDir);
//   });
// });

// app.use('/api/convert-docx', convertDocxRoute);

// 🖥️ Update Your Frontend PreviewRenderer
// Replace the mammoth.js logic with a call to your backend API:

// useEffect(() => {
//   if (type === 'docx') {
//     const formData = new FormData();
//     formData.append('file', new File([file], file.name));

//     fetch('/api/convert-docx', {
//       method: 'POST',
//       body: formData,
//     })
//       .then((res) => res.json())
//       .then(({ html }) => setDocxHtml(html))
//       .catch(() => setDocxHtml('<p>Error loading DOCX preview.</p>'));
//   }
// }, [type, file]);

// help package this backend logic into a microservice or add fallback styling for the converted HTML in your frontend?

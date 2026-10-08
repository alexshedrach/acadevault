import AcademicMaterial from '../api/models/AcademicMaterialModel.js';
import AppError from '../utils/HandleAppErrors.js';
import { generateUniqueSlug } from '../helper/generateUniqueSlug.js';
import Category from '../api/models/CategoryModel.js';
import { handlePurchaseOptions } from '../helper/handlePurchaseOptions.js';
import { handleMaterialFileUpload } from '../helper/handleMaterialFileUpload.js';
import File from '../api/models/FileModel.js';
import ApiFeatures from '../utils/ApiFeatures.js';
import { notifyAdmin } from '../utils/notifyAdmin.js';
import { sendNotification } from '../websockets/websocket.js';
import Shop from '../api/models/ShopModel.js';
import {
  approvePendingChanges,
  generateUpdatedSlug,
  handleDeliveryFormat,
  handlePurchaseType,
  rejectPendingChanges,
} from '../utils/academicMaterialUtils.js';
import { ensureAdmin } from '../utils/roleUtils.js';
import EmailService from './EmailService.js';
import mongoose from 'mongoose';
import { deleteMaterialAssets } from './materialCleanup.js';
import { updateMaterialCounts } from '../utils/updateMaterialCount.js';
import attachMaterialPrices from '../utils/priceUtils.js';

// TO DO
// 📩 Implementing Email Notifications Before Auto-Delete
// ⏳ Implementing Scheduled Auto-Delete for Soft-Deleted Academic Materials
// 🔄 Implementing a Restore Endpoint for Deleted Academic Materials

// Academic Material Services
export default class AcademicMaterialService {
  // A Service to handle academic material metadata creation
  static async createMaterialMetadata(data, userId) {
    // Validate required fields
    if (!data.title) {
      throw new AppError(
        'Title is required for creating academic material.',
        400,
      );
    }
    if (!data.categories || data.categories.length === 0) {
      throw new AppError('At least one category is required.', 400);
    }
    // Check if the categories exist in the database
    const existingCategories = await Category.find({
      _id: { $in: data.categories },
    }).select('_id');

    // If the number of categories found is not equal to the number of categories provided,
    // it means some categories do not exist in the database
    if (existingCategories.length !== data.categories.length) {
      throw new AppError('One or more categories do not exist.', 400);
    }

    // Check if the shopId exists (if provided)
    // Check if shopId exists in the provided data
    if (data.shop) {
      const shop = await Shop.findById(data.shop);
      if (!shop) {
        throw new AppError('The provided shopId does not exist.', 400);
      }
    } else {
      throw new AppError('Shop ID is required to create the material.', 400);
    }

    // Generate slug for the material
    const categoryNames = await Category.find({
      _id: { $in: data.categories },
    }).select('name');

    const baseSlug = `${data.title}-${categoryNames.map((cat) => cat.name).join('-')}`;
    const uniqueSlug = await generateUniqueSlug(AcademicMaterial, baseSlug);

    // Prevent duplicate materials
    const existingMaterial = await AcademicMaterial.findOne({
      slug: uniqueSlug,
    });
    if (existingMaterial) {
      throw new AppError(
        'An academic material with this title already exists.',
        400,
      );
    }

    // Ensure default deliveryFormat is "digital"
    if (!data.deliveryFormat) {
      data.deliveryFormat = 'digital';
    }

    // Validate materialType based on deliveryFormat
    if (!data.materialType) {
      throw new AppError('Material type is required.', 400);
    }

    // Ensure digitalContent and physicalContent exist based on deliveryFormat
    // Handle content fields based on deliveryFormat
    if (data.deliveryFormat === 'digital') {
      data.digitalContent = data.digitalContent || {}; // Ensure digitalContent exists
      data.physicalContent = undefined; // Remove physicalContent for digital-only materials
    } else if (data.deliveryFormat === 'physical') {
      data.physicalContent = data.physicalContent || {}; // Ensure physicalContent exists
      data.digitalContent = undefined; // Remove digitalContent for physical-only materials
    } else if (data.deliveryFormat === 'hybrid') {
      // For hybrid materials, ensure both content fields exist
      data.digitalContent = data.digitalContent || {};
      data.physicalContent = data.physicalContent || {};
    } else {
      // Invalid or unspecified deliveryFormat; remove both fields as fallback
      data.digitalContent = undefined;
      data.physicalContent = undefined;
    }

    // Preserve digitalContent.file if provided
    if (data.digitalContent) {
      data.digitalContent.file = data.digitalContent.file || undefined; // Ensure 'file' remains if present
    } else {
      delete data.digitalContent; // Remove digitalContent entirely if it shouldn't exist
    }

    // Set default thumbnail if not provided
    if (!data.thumbnail) {
      data.thumbnail = null;
    }

    // Final cleanup to remove unnecessary fields
    if (!['digital', 'hybrid'].includes(data.deliveryFormat)) {
      delete data.digitalContent; // Remove digitalContent if not applicable
    }
    if (!['physical', 'hybrid'].includes(data.deliveryFormat)) {
      delete data.physicalContent; // Remove physicalContent if not applicable
    }

    // Validate purchaseType
    if (!data.purchaseType) {
      throw new AppError('Purchase type is required.', 400);
    }
    if (!['direct', 'affiliate'].includes(data.purchaseType)) {
      throw new AppError(
        "Invalid purchase type. Must be 'direct' or 'affiliate'.",
        400,
      );
    }

    // Handle purchaseOptions based on purchaseType
    if (data.purchaseType === 'affiliate') {
      if (!data.purchaseOptions || data.purchaseOptions.length === 0) {
        throw new AppError('Affiliate purchase options must be provided.', 400);
      }
      // Handle purchase options
      data.purchaseOptions = handlePurchaseOptions(data.purchaseOptions);
    } else {
      // If it's direct, remove purchaseOptions
      delete data.purchaseOptions;
    }

    // Ensure the createdBy field is set to the user submitting it
    data.createdBy = userId;

    // 🚨 Exclude review-related fields from creation
    // delete data.reviewProcess;

    // Save the academic material
    const academicMaterial = await AcademicMaterial.create({
      ...data,
      slug: uniqueSlug,
    });

    return academicMaterial;
  }

  // 3️⃣ Implement File Upload Logic in Academic Material Service
  static async uploadMaterialFileService(materialId, files, userId, useLocal) {
    // Fetch material, including unpublished ones
    const academicMaterial = await AcademicMaterial.findOne({
      _id: materialId,
      includeUnpublished: true,
    });
    if (!academicMaterial) throw new AppError('Material not found.', 404);

    // Ensure only the creator can upload files
    if (academicMaterial.createdBy.toString() !== userId.toString()) {
      throw new AppError('Unauthorized access.', 403);
    }

    // Allow uploads only for digital or hybrid materials
    if (!['digital', 'hybrid'].includes(academicMaterial.deliveryFormat)) {
      throw new AppError(
        'Only digital/hybrid formats support file uploads.',
        400,
      );
    }

    const session = await mongoose.startSession();
    let mainFileDoc = null;
    let previewFileIds = [],
      additionalFileIds = [];
    let mainThumbnailPath = null,
      pageCount = null;

    await session.withTransaction(async () => {
      // ========== Main File Handling ==========
      if (files.file?.length > 0) {
        // Delete any existing main file and thumbnail
        await deleteMaterialAssets(academicMaterial, useLocal);

        // Upload new main file (and optional thumbnail)
        const result = await handleMaterialFileUpload(
          files.file[0],
          academicMaterial._id,
          files.thumbnail?.[0] || null,
          useLocal,
          'main',
        );

        // Abort on validation failure
        if (result.fileDetails.validationStatus === 'failed') {
          throw new AppError('Main file validation failed.', 400);
        }

        // Persist main file
        mainFileDoc = await File.create([result.fileDetails], { session });
        pageCount = result.fileDetails.pageCount;
        mainThumbnailPath = result.thumbnailPath;

        // Update academic material digitalContent
        academicMaterial.digitalContent = {
          ...academicMaterial.digitalContent,
          file: mainFileDoc[0]._id,
          fileId: result.fileDetails.fileId,
          fileFormat: result.fileDetails.fileType,
          fileSize: result.fileDetails.fileSize,
          materialType: academicMaterial.materialType,
          pageCount,
        };

        // Save thumbnail if available
        if (mainThumbnailPath) academicMaterial.thumbnail = mainThumbnailPath;
      }

      // ========== Preview Files Handling ==========
      if (files.previewFiles?.length > 0) {
        // Delete old preview files if new ones are uploaded
        if (academicMaterial.previewFiles?.length > 0) {
          await File.deleteMany(
            { _id: { $in: academicMaterial.previewFiles } },
            { session },
          );
          academicMaterial.previewFiles = [];
        }

        // Upload new preview files in parallel
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
          .map((r) => {
            const file = r.value.fileDetails;
            file.isPreview = true; // Mark as preview
            return file;
          });

        const previewDocs = await File.insertMany(validPreviews, { session });
        previewFileIds = previewDocs.map((f) => f._id);
        academicMaterial.previewFiles = previewFileIds;
      }

      // ========== Additional Files Handling ==========
      if (files.additionalFiles?.length > 0) {
        // Delete old additional files if new ones are uploaded
        if (academicMaterial.digitalContent?.additionalFiles?.length > 0) {
          await File.deleteMany(
            { _id: { $in: academicMaterial.digitalContent.additionalFiles } },
            { session },
          );
          academicMaterial.digitalContent.additionalFiles = [];
        }

        // Upload new additional files in parallel
        const additionalResults = await Promise.allSettled(
          files.additionalFiles.map((file) =>
            handleMaterialFileUpload(
              file,
              academicMaterial._id,
              null,
              useLocal,
              'additional',
            ),
          ),
        );

        const validAdds = additionalResults
          .filter(
            (r) =>
              r.status === 'fulfilled' &&
              r.value.fileDetails.validationStatus === 'validated',
          )
          .map((r) => {
            const file = r.value.fileDetails;
            file.isAdditional = true; // Mark as preview
            return file;
          });

        const additionalDocs = await File.insertMany(validAdds, { session });
        additionalFileIds = additionalDocs.map((f) => f._id);
        academicMaterial.digitalContent.additionalFiles = additionalFileIds;
      }

      // Mark all modified paths
      academicMaterial.markModified('digitalContent');
      academicMaterial.markModified('previewFiles');
      academicMaterial.markModified('thumbnail');

      // Save changes
      await academicMaterial.save({ session });
    });

    // Close transaction
    await session.endSession();
    return academicMaterial;
  }

  /**
   * Submits an academic material for admin review.
   * @param {String} materialId - The ID of the material.
   * @param {String} userId - The ID of the seller submitting it.
   */
  static async submitMaterialForReview(materialId, userId) {
    const material = await AcademicMaterial.findOne({
      _id: materialId,
      includeUnpublished: true,
    })
      .populate({
        path: 'shop',
        select: 'businessName contactInfo shopType', // Only select needed shop fields
      })
      .populate({
        path: 'shop.owner', // Populate the shop owner
        select: 'name', // Only select the owner's name
      });

    if (!material) {
      throw new AppError('Academic material not found.', 404);
    }

    if (material.createdBy.toString() !== userId.toString()) {
      throw new AppError('Unauthorized to submit this material.', 403);
    }

    if (material.status !== 'draft') {
      throw new AppError("Material must be in 'draft' status to submit.", 400);
    }

    // Ensure required fields are filled
    const requiredFields = [
      'title',
      'summary',
      'description',
      // 'price',
      'categories',
      'tags',
    ];

    const missingFields = requiredFields.filter((field) => {
      const value = material[field];

      // Allow price = 0, reject undefined or null
      // if (field === 'price') return value === undefined || value === null;

      // For other fields: empty string, null, undefined should trigger validation
      return value === undefined || value === null || value === '';
    });

    if (missingFields.length > 0) {
      throw new AppError(
        `Missing required fields: ${missingFields.join(', ')}`,
        400,
      );
    }

    // Check if categories exist in the database
    const existingCategories = await Category.find({
      _id: { $in: material.categories },
    }).select('_id');

    if (existingCategories.length !== material.categories.length) {
      throw new AppError('One or more categories do not exist.', 400);
    }

    // Check if the shop exists and is valid
    if (!material.shop) {
      throw new AppError('Associated shop not found.', 400);
    }

    const shop = await Shop.findById(material.shop._id);
    if (!shop) {
      throw new AppError('The associated shop does not exist.', 400);
    }

    if (['digital', 'hybrid'].includes(material.deliveryFormat)) {
      if (!material.digitalContent || !material.digitalContent.file) {
        throw new AppError(
          'Digital content must have an uploaded file before submission.',
          400,
        );
      }
    }

    // NEW: For digital/hybrid materials, ensure at least one preview file is provided.
    if (['digital', 'hybrid'].includes(material.deliveryFormat)) {
      if (!material.previewFiles || material.previewFiles.length === 0) {
        throw new AppError(
          'At least one preview file is required for digital/hybrid materials.',
          400,
        );
      }
    }

    // Mark material as "pending review" and record submission timestamp
    material.status = 'pending_review';
    material.submittedAt = new Date();
    await material.save();

    // Retrieve seller's name from the populated shop and owner
    const sellerName = material.shop?.owner?.name || 'A seller';

    // Notify admin about the submission (example notification function)
    await notifyAdmin(
      'adminMaterialReview',
      '📄 New Academic Material Submitted for Review',
      {
        materialTitle: material.title,
        sellerName,
        materialId: material._id.toString(),
      },
    );

    return {
      success: true,
      material,
      message: 'Material submitted for review.',
    };
  }

  /**
   * Resubmits a previously rejected material for review.
   * @param {String} materialId - The ID of the material.
   * @param {String} userId - The ID of the seller resubmitting.
   */
  static async resubmitMaterialForReview(materialId, userId) {
    const material = await AcademicMaterial.findOne({
      _id: materialId,
      includeUnpublished: true,
    });

    if (!material) {
      throw new AppError('Academic material not found.', 404);
    }

    if (material.createdBy.toString() !== userId.toString()) {
      throw new AppError('Unauthorized to resubmit this material.', 403);
    }

    if (material.status !== 'rejected') {
      throw new AppError('Only rejected materials can be resubmitted.', 400);
    }

    // Ensure corrections are present
    if (!material.reviewProcess || material.reviewProcess.length === 0) {
      throw new AppError('Review history is missing.', 400);
    }

    const lastReview =
      material.reviewProcess[material.reviewProcess.length - 1];
    if (!lastReview.feedback || lastReview.feedback.length === 0) {
      throw new AppError('No feedback provided for the last review.', 400);
    }

    const unresolvedCorrections = lastReview.feedback.filter(
      (feedback) => !feedback.isResolved,
    );

    if (unresolvedCorrections.length > 0) {
      throw new AppError(
        'All feedback must be addressed before resubmitting.',
        400,
      );
    }

    // Add new review process entry for resubmission
    material.reviewProcess.push({
      status: 'pending', // Pending review after resubmission
      approvalStage: 'resubmission',
      reviewer: null, // Reviewer will be assigned during the review
      resubmittedAt: new Date(),
    });

    // Update status and increment resubmission count
    material.status = 'pending_review';
    material.submissionDetails = {
      submittedAt: new Date(),
      submissionType: 'resubmission',
      submittedBy: userId,
    };
    material.resubmissionCount = (material.resubmissionCount || 0) + 1;

    await material.save();

    // Retrieve seller's name from the populated shop and owner
    const sellerName = material.shop?.owner?.name || 'A seller';

    // Notify admin about the submission
    await notifyAdmin(
      'adminMaterialResubmission',
      '📄  Academic Material Resubmitted for Review',
      {
        materialTitle: material.title,
        sellerName, // Add seller name if available
        materialId: material._id.toString(),
      },
    );

    return {
      success: true,
      material,
      message: 'Material resubmitted for review.',
    };
  }

  /**
   * Approves an academic material, marking it as "published".
   * @param {String} materialId - The ID of the material.
   * @param {String} adminId - The ID of the admin approving it.
   */
  static async approveMaterial(materialId, adminId) {
    // const material = await AcademicMaterial.findById(materialId);
    const material = await AcademicMaterial.findOne({
      _id: materialId,
      includeUnpublished: true,
    });

    if (!material) {
      throw new AppError('Academic material not found.', 404);
    }

    if (material.status !== 'pending_review') {
      throw new AppError('Only materials pending review can be approved.', 400);
    }

    // Update status and approval info
    material.status = 'published';
    material.isPublished = true;
    material.approvedBy = adminId;
    material.approvedAt = new Date();

    // Add to approval history
    material.approvalHistory.push({
      status: 'approved',
      reviewedBy: adminId,
      reviewedAt: new Date(),
    });

    await material.save();

    // ✅ Now update category material counts
    await updateMaterialCounts(material, +1);

    // Send approval notification email to the creator
    await EmailService.sendMaterialApprovalConfirmation(materialId);

    // 🔔 Real-time Notification (Seller)
    // sendNotification(material.createdBy._id.toString(), {
    //   title: "Material Approved",
    //   message: `Your material "${material.title}" is now published!`,
    //   type: "success",
    // });

    return {
      success: true,
      material,
      message: 'Material approved and published.',
    };
  }

  /**
   * Rejects an academic material, providing feedback to the seller.
   * @param {String} materialId - The ID of the material.
   * @param {String} adminId - The ID of the admin rejecting it.
   * @param {String} reason - The reason for rejection.
   */
  static async rejectMaterial(materialId, adminId, reason) {
    const material = await AcademicMaterial.findById(materialId);

    if (!material) {
      throw new AppError('Academic material not found.', 404);
    }

    if (material.status !== 'pending_review') {
      throw new AppError('Only materials pending review can be rejected.', 400);
    }

    if (!reason || reason.trim().length === 0) {
      throw new AppError('Rejection reason is required.', 400);
    }

    // Mark as rejected
    material.status = 'rejected';
    material.rejectedBy = adminId;
    material.rejectedAt = new Date();

    // Add feedback to corrections
    material.corrections.push({
      correctionText: reason,
      isResolved: false,
      correctedAt: new Date(),
    });

    // Add to approval history
    material.approvalHistory.push({
      status: 'rejected',
      reviewedBy: adminId,
      feedback: reason,
      reviewedAt: new Date(),
    });

    await material.save();

    // Notify creator about rejection
    // sendNotification(
    //   material.createdBy,
    //   `Your material "${material.title}" has been rejected. Feedback: ${feedback}`
    // );
    // 🔔 Real-time Notification (Seller)
    sendNotification(material.createdBy._id.toString(), {
      title: 'Material Rejected',
      message: `Your material "${material.title}" was rejected. Reason: ${reason}`,
      type: 'error',
    });

    return {
      success: true,
      material,
      message: 'Material rejected with feedback.',
    };
  }

  /**
   * Resolve a correction made by the admin.
   * @param {String} materialId - The ID of the material.
   * @param {String} correctionId - The ID of the correction.
   * @param {Object} sellerResponse - The response from the seller.
   */
  static async resolveCorrection(materialId, correctionId, sellerResponse) {
    const material = await AcademicMaterial.findById(materialId);

    if (!material) {
      throw new AppError('Material not found.', 404);
    }

    const correction = material.corrections.id(correctionId);

    if (!correction) {
      throw new AppError('Correction not found.', 404);
    }

    if (correction.isResolved) {
      throw new AppError('This correction is already resolved.', 400);
    }

    // Update correction with seller's response and resolution details
    correction.resolutionNotes = sellerResponse.resolutionNotes || '';
    correction.isResolved = true;
    correction.correctedAt = new Date();

    // Ensure the resubmissionCount is updated
    material.resubmissionCount = (material.resubmissionCount || 0) + 1;

    await material.save();

    return material;
  }

  /**
   * Confirm the resolution of a correction by the admin.
   * @param {String} materialId - The ID of the material.
   * @param {String} correctionId - The ID of the correction.
   * @param {String} adminId - The ID of the admin confirming resolution.
   */
  static async confirmResolution(materialId, correctionId, adminId) {
    const material = await AcademicMaterial.findById(materialId);

    if (!material) {
      throw new AppError('Material not found.', 404);
    }

    const correction = material.corrections.id(correctionId);

    if (!correction) {
      throw new AppError('Correction not found.', 404);
    }

    if (!correction.isResolved) {
      throw new AppError(
        'This correction has not yet been resolved by the seller.',
        400,
      );
    }

    // Admin confirms the resolution
    correction.resolvedAt = new Date();
    correction.resolvedBy = adminId;

    await material.save();

    return material;
  }

  // 1️⃣ Service Layer (Update Academic Material)
  static async updateAcademicMaterialService(materialId, updates, userId) {
    // Fetch only required fields to reduce DB load
    const academicMaterial = await AcademicMaterial.findById(materialId)
      .select('+createdBy +status +pendingChanges')
      .lean();

    if (!academicMaterial) {
      throw new AppError('Academic material not found.', 404);
    }

    // Ensure only the creator can update
    if (academicMaterial.createdBy.toString() !== userId.toString()) {
      throw new AppError(
        'You are not authorized to update this material.',
        403,
      );
    }

    // 🚫 Restrict updates to protected fields
    const restrictedFields = ['reviewProcess', 'status', 'adminNotes'];
    restrictedFields.forEach((field) => delete updates[field]);

    // 🛠 Apply business logic transformations
    updates = handleDeliveryFormat(updates, academicMaterial);
    updates = handlePurchaseType(updates);

    // 🔄 Regenerate slug if title is updated
    if (updates.title && updates.title !== academicMaterial.title) {
      updates.slug = await generateUpdatedSlug(updates, academicMaterial);
    }

    // 🔹 Merge only the updated fields into pendingChanges
    const pendingChanges = { ...academicMaterial.pendingChanges, ...updates };

    // ✅ Save changes without modifying the main document directly
    await AcademicMaterial.findByIdAndUpdate(materialId, {
      pendingChanges,
      updateStatus: 'awaiting-approval',
    });

    return {
      message:
        'Update request submitted. Changes will be reviewed by an admin.',
      data: pendingChanges,
    };
  }

  // 1️⃣ Admin Service Layer (Review Pending Changes)
  static async reviewPendingChangesService(materialId, action, user, feedback) {
    // Fetch material along with creator details
    const academicMaterial = await AcademicMaterial.findById(materialId)
      .select('+createdBy +pendingChanges +status')
      .populate('createdBy', 'email name');

    if (!academicMaterial) {
      throw new AppError('Academic material not found.', 404);
    }

    // ✅ Ensure there are pending changes
    if (
      !academicMaterial.pendingChanges ||
      Object.keys(academicMaterial.pendingChanges).length === 0
    ) {
      throw new AppError(
        'No pending changes to review for this material.',
        400,
      );
    }

    // ✅ Ensure the user is an admin
    await ensureAdmin(user.id);

    // ✅ Validate the action
    if (!['approved', 'rejected'].includes(action)) {
      throw new AppError(
        "Invalid action. Must be 'approved' or 'rejected'.",
        400,
      );
    }

    if (action === 'approved') {
      return await approvePendingChanges(academicMaterial, user);
    } else {
      return await rejectPendingChanges(academicMaterial, user, feedback);
    }
  }

  // Service Layer (Get All Pending Approval Materials)
  static async getPendingApprovalMaterialsService() {
    const pendingMaterials = await AcademicMaterial.find({
      status: 'awaiting-approval',
    })
      .populate('categories', 'name') // Populate category names for better admin visibility
      .populate('createdBy', 'name email'); // Populate creator info for context

    return pendingMaterials;
  }

  // Service to fetch materials based on user role or public access
  static async getAcademicMaterials(queryString) {
    // Step 1: Build base query for published materials
    const baseFilter = { isPublished: true };
    let query = AcademicMaterial.find(baseFilter).select('-__v');

    // Step 2: Append advanced filters
    const filterQuery = await AcademicMaterial.searchAndFilter(queryString);
    query = query
      .find(filterQuery)
      .populate({
        path: 'department',
        select: 'name',
      })
      .populate({
        path: 'shop',
        select: 'businessName shopType',
        populate: {
          path: 'logo',
          select: 'fileUrl',
        },
      });

    // Step 3: Apply advanced query features
    const apiFeatures = new ApiFeatures(query, queryString)
      .sort()
      .limitFields();

    await apiFeatures.pagination();

    const materials = await apiFeatures.query;

    // Step 4: Attach resolved price to each material
    const enrichedMaterials = await attachMaterialPrices(materials, {
      currency: queryString.currency || 'NGN',
      region: queryString.region || null,
      date: new Date(),
    });

    // Step 5: If price filter was present, apply post-fetch filtering
    let finalMaterials = enrichedMaterials;

    if (queryString.price) {
      const [min, max] = queryString.price.split('-').map(Number);

      finalMaterials = enrichedMaterials.filter((mat) => {
        const amt = mat.price?.amount;
        if (amt == null) return false;
        if (!isNaN(min) && !isNaN(max)) return amt >= min && amt <= max;
        if (!isNaN(min)) return amt >= min;
        if (!isNaN(max)) return amt <= max;
        return true;
      });
    }

    // Step 6: Handle "no result" case
    if (!finalMaterials || finalMaterials.length === 0) {
      throw new AppError('No academic materials found.', 404);
    }

    return {
      materials: finalMaterials,
      paginationMetadata: apiFeatures.paginationMetadata,
    };
  }

  static async getMaterialsByShop({ shopId, query, user, excludeMaterialId }) {
    if (!shopId)
      throw new AppError('Shop ID is required to fetch materials.', 400);

    const isSeller = user?.role === 'Seller';
    const userId = user?.id;

    // Base filter
    const baseQuery = { shop: shopId };

    // If seller, show only their own materials
    if (isSeller) baseQuery.createdBy = userId;
    else baseQuery.isPublished = true; // Public or other roles see only published

    // Excluding current material
    if (excludeMaterialId) baseQuery._id = {$ne: excludeMaterialId}

    // Merge search & filters
    const searchFilters = await AcademicMaterial.searchAndFilter(query);
    const finalQuery = { ...baseQuery, ...searchFilters };

    // Build query
    const materialQuery = AcademicMaterial.find(finalQuery);

    // Enhance with API features
    const apiFeatures = new ApiFeatures(materialQuery, query)
      .sort()
      .limitFields();
    const paginationFeatures = await apiFeatures.pagination();

    // Execute & populate
    const materials = await paginationFeatures.query
      .populate({
        path: 'shop',
        select: 'businessName contactInfo shopType',
        populate: { path: 'owner', select: 'name email isOnline' },
      })
      .populate('categories', 'name')
      .populate('department', 'name')
      .exec();

    if (!materials.length) {
      throw new AppError('No academic materials found for this shop', 404);
    }

    // Attach pricing
    const enrichedMaterials = await attachMaterialPrices(materials, query);

    return {
      materials: enrichedMaterials,
      metadata: paginationFeatures.paginationMetadata || {},
    };
  }

  /**
   * Fetch materials by category and its subcategories.
   * @param {string} categoryId - The category ID.
   * @returns {Promise<Object[]>} - A list of academic materials.
   */
  static async getMaterialsByCategories(slug, query, context = {}) {
    try {
      // ── 1) Find the “parent” category by slug
      const category = await Category.findOne({ slug });
      if (!category) {
        throw new AppError("Category not found", 404);
      }
  
      // ── 2) Build array of category IDs: include any active subcategories
      const categoryIds = [category._id];
      const subCategories = await Category.find({
        parentCategory: category._id,
        isDeleted: false,
        active: true,
      }).select("_id");
  
      if (subCategories.length > 0) {
        categoryIds.push(...subCategories.map((c) => c._id));
      }
  
      // ── 3) Base filter always excludes unpublished/deleted materials
      const baseFilter = {
        isPublished: true,
        isDeleted: false,
      };
  
      // ── 4) Allow user to pass additional search/filter fields
      //     (e.g. ?search=term&sort=-createdAt&price=10-50)
      const advancedFilters = await AcademicMaterial.searchAndFilter(query);
  
      // ── 5) Merge category‐based logic into these filters
      switch (category.categoryType) {
        case "Material Type":
          // If categoryType === “Material Type”, we assume materials store
          // their type as the category’s name.
          advancedFilters.materialType = category.name;
          break;
  
        case "Department":
          // If categoryType === “Department”, match materials.department = category._id
          advancedFilters.department = category._id;
          break;
  
        default:
          // Otherwise (Generic, etc.), match any material whose categories array
          // contains category._id (or one of its subcategories)
          advancedFilters.categories = { $in: categoryIds };
          break;
      }
  
      // ── 6) Build the base Mongoose query, with only the fields we need
      const queryBuilder = AcademicMaterial.find({
        ...baseFilter,
        ...advancedFilters,
      })
        .populate("shop") 
        .populate("categories", "name slug") 
        .populate("department", "name slug"); 
  
      // ── 7) Use ApiFeatures to apply sort, select, and pagination
      const apiFeatures = new ApiFeatures(queryBuilder, query)
        .sort()
        .limitFields();
        
      await apiFeatures.pagination();
  
      // ── 8) Actually execute the query
      const rawMaterials = await apiFeatures.query;
  
      // ── 9) If you have a price attachment helper, attach pricing metadata:
      const enrichedMaterials = await attachMaterialPrices(rawMaterials, context);
  
      return {
        materials: enrichedMaterials,
        pagination: apiFeatures.paginationMetadata,
      };
    } catch (err) {
      throw new AppError(
        err.message || "Error fetching academic materials by category slug",
        500
      );
    }
  }
  
  /**
   * Fetch academic materials by academic level and degree
   * @param {string} level - The academic level (e.g., "Undergraduate")
   * @param {string} degree - The academic degree (e.g., "B.Sc")
   * @returns {Array} - List of academic materials
   */
  static async getMaterialsByLevelAndDegreeService(query, context = {}) {
    try {
      // Step 1: Ensure level and degree are provided
      if (!query.academicLevel || !query.academicDegree) {
        throw new AppError('Academic level and degree are required.', 400);
      }

      // Step 2: Use centralized searchAndFilter method
      const filters = await AcademicMaterial.searchAndFilter(query);

      // Step 3: Add base filters
      const baseFilter = {
        isPublished: true,
        isDeleted: false,
        ...filters, // includes level & degree
      };

      // Step 4: Create base query
      const queryBuilder = AcademicMaterial.find(baseFilter)
        .populate('department')
        .populate('categories')
        .populate('shop');

      // Step 5: Apply sorting, limiting, pagination
      const apiFeatures = new ApiFeatures(queryBuilder, query)
        .sort()
        .limitFields();

      await apiFeatures.pagination();

      const rawMaterials = await apiFeatures.query;

      if (!rawMaterials.length) {
        throw new AppError(
          'No academic materials found for the given level and degree.',
          404,
        );
      }

      // Step 6: Enrich prices
      const enrichedMaterials = await attachMaterialPrices(
        rawMaterials,
        context,
      );

      return {
        materials: enrichedMaterials,
        pagination: apiFeatures.paginationMetadata,
      };
    } catch (error) {
      throw new AppError(
        error.message ||
          'Error fetching academic materials by level and degree.',
        500,
      );
    }
  }

  /**
   * Fetch material details based on user role.
   * @param {string} materialId - The ID of the material.
   * @param {object} user - The authenticated user object.
   * @returns {object} - The material details adjusted for the user's role.
   */
  static async getMaterialDetails(materialId, context = {}) {
    try {
      const isObjectId = mongoose.Types.ObjectId.isValid(materialId);

      const query = isObjectId
        ? { $or: [{ _id: materialId }, { slug: materialId }] }
        : { slug: materialId };

      const material = await AcademicMaterial.findOne(query)
        .populate('analytics')
        .populate('categories', 'name')
        .populate('department', 'name')
        .populate('createdBy', 'name email')
        .populate('previewFiles')
        // .populate('relatedMaterials')
        .populate({
          path: 'shop',
          select: 'businessName contactInfo shopType logo',
          populate: { path: 'owner', select: 'name email isOnline' },
        });
      // .populate('shop', 'businessName contactInfo logo owner');
      // .lean() if you're not modifying the document

      if (!material) {
        throw new Error('Academic material not found');
      }

      // Increment views
      await AcademicMaterial.incrementViews(material._id);

      // Attach pricing
      const [enrichedMaterial] = await attachMaterialPrices([material], {
        currency: context.currency || 'NGN',
        region: context.region || null,
        date: context.date || new Date(),
      });

      return enrichedMaterial;
    } catch (error) {
      throw new Error(error.message || 'Error fetching academic material');
    }
  }

  // 🗑️ Implementing Soft Delete for Academic Materials
  // 1️⃣ Update Schema to Support Soft Delete
  // 2️⃣ Service Layer (Soft Delete & Restore)

  // Soft delete material
  static async deleteAcademicMaterialService(materialId, userId) {
    const academicMaterial = await AcademicMaterial.findById(materialId);

    if (!academicMaterial) {
      throw new AppError('Academic material not found.', 404);
    }

    if (academicMaterial.createdBy.toString() !== userId.toString()) {
      throw new AppError(
        'You are not authorized to delete this material.',
        403,
      );
    }

    if (academicMaterial.isDeleted) {
      throw new AppError('Material is already deleted.', 400);
    }

    academicMaterial.isDeleted = true;
    academicMaterial.deletedAt = new Date();
    await academicMaterial.save();

    return { message: 'Academic material soft deleted successfully.' };
  }

  // Restore soft deleted material
  static async restoreAcademicMaterialService(materialId, userId) {
    const academicMaterial = await AcademicMaterial.findById(materialId);

    if (!academicMaterial) {
      throw new AppError('Academic material not found.', 404);
    }

    if (academicMaterial.createdBy.toString() !== userId.toString()) {
      throw new AppError(
        'You are not authorized to restore this material.',
        403,
      );
    }

    if (!academicMaterial.isDeleted) {
      throw new AppError('Material is not deleted.', 400);
    }

    academicMaterial.isDeleted = false;
    academicMaterial.deletedAt = null;
    await academicMaterial.save();

    return { message: 'Academic material restored successfully.' };
  }

  // 🚀 Implementing Bulk Soft Delete & Restore for Academic Materials
  // 1️⃣ Update Service Layer (Bulk Operations)
  // Bulk soft delete materials
  static async bulkDeleteAcademicMaterialsService(materialIds, userId) {
    const materials = await AcademicMaterial.find({
      _id: { $in: materialIds },
    });

    if (materials.length === 0) {
      throw new AppError('No valid academic materials found.', 404);
    }

    // Ensure all materials belong to the user
    const unauthorizedMaterials = materials.filter(
      (material) => material.createdBy.toString() !== userId.toString(),
    );

    if (unauthorizedMaterials.length > 0) {
      throw new AppError(
        'You are not authorized to delete some of these materials.',
        403,
      );
    }

    // Check if they are already deleted
    const alreadyDeleted = materials.filter((material) => material.isDeleted);
    if (alreadyDeleted.length > 0) {
      throw new AppError('Some materials are already deleted.', 400);
    }

    // Perform bulk update
    await AcademicMaterial.updateMany(
      { _id: { $in: materialIds } },
      { isDeleted: true, deletedAt: new Date() },
    );

    return { message: 'Academic materials soft deleted successfully.' };
  }

  // Bulk restore materials
  static async bulkRestoreAcademicMaterialsService(materialIds, userId) {
    const materials = await AcademicMaterial.find({
      _id: { $in: materialIds },
    });

    if (materials.length === 0) {
      throw new AppError('No valid academic materials found.', 404);
    }

    // Ensure all materials belong to the user
    const unauthorizedMaterials = materials.filter(
      (material) => material.createdBy.toString() !== userId.toString(),
    );

    if (unauthorizedMaterials.length > 0) {
      throw new AppError(
        'You are not authorized to restore some of these materials.',
        403,
      );
    }

    // Check if they are already restored
    const notDeleted = materials.filter((material) => !material.isDeleted);
    if (notDeleted.length > 0) {
      throw new AppError('Some materials are not deleted.', 400);
    }

    // Perform bulk restore
    await AcademicMaterial.updateMany(
      { _id: { $in: materialIds } },
      { isDeleted: false, deletedAt: null },
    );

    return { message: 'Academic materials restored successfully.' };
  }

  // 🔄 Implementing a Restore Endpoint for Deleted Academic Materials
  // 1️⃣ Add Restore Functionality in the Service Layer
  static async restoreAcademicMaterial(materialId) {
    const material = await AcademicMaterial.findById(materialId);

    if (!material) {
      throw new AppError('Material not found.', 404);
    }

    if (!material.isDeleted) {
      throw new AppError('Material is not deleted.', 400);
    }

    // Check if it's within the 30-day recovery period
    const deletionDate = new Date(material.deletedAt);
    const currentDate = new Date();
    const timeDifference = (currentDate - deletionDate) / (1000 * 60 * 60 * 24); // Convert to days

    if (timeDifference > 30) {
      throw new AppError(
        'Material cannot be restored. It has been permanently deleted.',
        400,
      );
    }

    // Restore the material
    material.isDeleted = false;
    material.deletedAt = null;
    await material.save();

    return material;
  }

  // 🚀 Implementing an Admin Restore Feature
  /**
   * Admin Restore - Allows admins to restore any deleted academic material.
   * @param {string} materialId - ID of the material to restore.
   */
  static async adminRestoreAcademicMaterial(materialId) {
    const material = await AcademicMaterial.findById(materialId);

    if (!material) {
      throw new AppError('Material not found.', 404);
    }

    if (!material.isDeleted) {
      throw new AppError('Material is not deleted.', 400);
    }

    // Admins can restore beyond 30 days
    material.isDeleted = false;
    material.deletedAt = null;
    await material.save();

    return material;
  }

  // 🚀 Implementing a Permanent Delete Feature for Admins
  /**
   * Admin Permanent Delete - Allows admins to permanently delete any academic material.
   * @param {string} materialId - ID of the material to permanently delete.
   */
  static async adminPermanentDeleteAcademicMaterial(materialId) {
    const material = await AcademicMaterial.findById(materialId);

    if (!material) {
      throw new AppError('Material not found.', 404);
    }

    if (!material.isDeleted) {
      throw new AppError(
        'Material is not deleted, cannot permanently delete.',
        400,
      );
    }

    // Permanently delete the material from the database
    await material.remove();

    return { message: 'Material permanently deleted.' };
  }

  static async searchMaterials(query) {
    const {
      search,
      sort,
      page = 1,
      limit = 12,
      materialType,
      level,
      priceMin,
      priceMax,
      // ...rest
    } = query;

    const filters = {};

    if (materialType) filters.materialType = materialType;
    if (level) filters.level = level;
    if (priceMin || priceMax) {
      filters.price = {};
      if (priceMin) filters.price.$gte = priceMin;
      if (priceMax) filters.price.$lte = priceMax;
    }

    let materialQuery = AcademicMaterial.find(filters);

    // 🔍 Full-text search
    if (search) {
      materialQuery = materialQuery
        .find({
          $text: { $search: search },
        })
        .select({
          score: { $meta: 'textScore' },
        })
        .sort({
          score: { $meta: 'textScore' },
        });
    } else {
      // If no search, apply default sort
      materialQuery = materialQuery.sort(sort || '-createdAt');
    }

    // 🌐 Add pagination
    const skip = (page - 1) * limit;
    materialQuery = materialQuery.skip(skip).limit(limit);

    // 📦 Populate and Execute
    const materials = await materialQuery
      .populate('categories', 'name')
      .populate('shop', 'businessName')
      .exec();

    const total = await AcademicMaterial.countDocuments({
      ...(search ? { $text: { $search: search } } : {}),
      ...filters,
    });

    const metadata = {
      page: Number(page),
      limit: Number(limit),
      total,
      totalPages: Math.ceil(total / limit),
    };

    return { materials, metadata };
  }
}

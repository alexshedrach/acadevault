import slugify from "slugify";
import Category from "../api/models/CategoryModel.js";
import AppError from "./HandleAppErrors.js";
import { generateUniqueSlug } from "../helper/generateUniqueSlug.js";
import AcademicMaterial from "../api/models/AcademicMaterialModel.js";
import { validateUpdatedFields } from "../api/validations/validateUpdatedFields.js";
import EmailService from "../services/EmailService.js";

export const handleDeliveryFormat = (updates, existingMaterial) => {
  if (!updates.deliveryFormat) return updates;

  const validFormats = ["digital", "physical", "hybrid"];
  if (!validFormats.includes(updates.deliveryFormat)) {
    throw new AppError(
      "Invalid delivery format. Choose 'digital', 'physical', or 'hybrid'.",
      400
    );
  }

  if (updates.deliveryFormat === "digital") {
    updates.digitalContent =
      updates.digitalContent || existingMaterial.digitalContent || {};
    delete updates.digitalContent.file; // Ensure no direct file modifications
    updates.physicalContent = undefined;
  } else if (updates.deliveryFormat === "physical") {
    updates.physicalContent =
      updates.physicalContent || existingMaterial.physicalContent || {};
    updates.digitalContent = undefined;
  } else if (updates.deliveryFormat === "hybrid") {
    updates.digitalContent =
      updates.digitalContent || existingMaterial.digitalContent || {};
    updates.physicalContent =
      updates.physicalContent || existingMaterial.physicalContent || {};
    delete updates.digitalContent.file;
  }

  return updates;
};

export const handlePurchaseType = (updates) => {
  if (!updates.purchaseType) return updates;

  const validTypes = ["direct", "affiliate"];
  if (!validTypes.includes(updates.purchaseType)) {
    throw new AppError(
      "Invalid purchase type. Must be 'direct' or 'affiliate'.",
      400
    );
  }

  if (updates.purchaseType === "affiliate") {
    if (!updates.purchaseOptions || updates.purchaseOptions.length === 0) {
      throw new AppError("Affiliate purchase options must be provided.", 400);
    }
  } else {
    delete updates.purchaseOptions;
  }

  return updates;
};

export const generateUpdatedSlug = async (updates, existingMaterial) => {
  const categoryNames = await Category.find({
    _id: { $in: updates.categories || existingMaterial.categories },
  }).select("name");

  const baseSlug = slugify(
    `${updates.title}-${categoryNames.map((cat) => cat.name).join("-")}`,
    { lower: true, strict: true }
  );

  return await generateUniqueSlug(AcademicMaterial, baseSlug);
};

export const approvePendingChanges = async (academicMaterial, adminUser) => {
  const updates = academicMaterial.pendingChanges;

  // ✅ Validate only the updated fields
  await validateUpdatedFields(updates);

  // ✅ Apply updates and clear pendingChanges
  await AcademicMaterial.findByIdAndUpdate(academicMaterial._id, {
    ...updates,
    pendingChanges: {},
    updateStatus: "approved",
  });

  // ✅ Send approval notification
  await EmailService.sendApprovalEmail(
    academicMaterial.createdBy,
    academicMaterial.title,
    adminUser
  );

  return {
    message: "Pending changes have been approved and applied successfully.",
    updatedMaterial: updates,
  };
};

export const rejectPendingChanges = async (
  academicMaterial,
  adminUser,
  feedback
) => {
  if (!feedback || feedback.trim() === "") {
    throw new AppError("Feedback is required when rejecting changes.", 400);
  }

  // ✅ Retain original data but clear pending changes
  await AcademicMaterial.findByIdAndUpdate(academicMaterial._id, {
    pendingChanges: {},
    updateStatus: null,
  });

  // ✅ Send rejection notification
  await EmailService.sendRejectionEmail(
    academicMaterial.createdBy,
    academicMaterial.title,
    adminUser,
    feedback
  );

  return {
    message: "Pending changes have been rejected.",
  };
};

import { v4 as uuidv4 } from 'uuid';

import {
  handleFileUpload,
  handleProfileUpload,
} from '../../helper/handleFileUpload.js';
import { catchAsyncErrors } from '../../utils/catchAsyncErrors.js';
import { deleteOldFile } from '../../utils/deleteOldFile.js';
import { extractFileMetadata } from '../../utils/extractFileMetadata.js';
import AppError from '../../utils/HandleAppErrors.js';
import { validateURLs } from '../../utils/validateURLs.js';
import Shop from '../models/ShopModel.js';
import User from '../models/UserModel.js';
import VerificationDocument from '../models/VerificationDocumentModel.js';

// 1️⃣ Generic Media Upload Handler
export const uploadMedia = async ({
  model,
  documentId,
  fieldName,
  file,
  externalUrl,
}) => {
  if (!model || !documentId || !fieldName) {
    throw new AppError('Missing required parameters for upload.', 400);
  }

  const useLocal = process.env.NODE_ENV !== 'production';

  const document = await model.findById(documentId);
  if (!document) throw new AppError('Document not found.', 404);

  // Delete old file
  const existingFileId = document[fieldName];
  if (existingFileId) {
    const existingFile = await File.findById(existingFileId);
    await deleteOldFile({
      fileData: existingFile,
      storageType: useLocal ? 'local' : 'cloud',
    });
    await File.findByIdAndDelete(existingFileId);
  }

  let fileDetails;

  if (externalUrl) {
    if (!validateURLs(externalUrl))
      throw new AppError('Invalid external URL.', 400);
    fileDetails = {
      fileName: null,
      fileSize: null,
      fileType: null,
      mimeType: null,
      fileCategory: 'external',
      storageType: 'external',
      fileUrl: externalUrl,
      fileId: null,
      metadata: null,
      uploadedAt: new Date(),
    };
  } else if (file) {
    const uploadedFile = await handleFileUpload(file, useLocal);
    if (!uploadedFile) throw new AppError('File processing failed.', 400);

    const meta = extractFileMetadata(file);
    fileDetails = {
      ...meta,
      storageType: useLocal ? 'local' : 'cloud',
      fileUrl: uploadedFile.url,
      fileId: uploadedFile.public_id || uuidv4(),
      metadata: uploadedFile.metadata || {},
      uploadedAt: new Date(),
    };
  } else {
    throw new AppError('No file or URL provided for upload.', 400);
  }

  const savedFile = await File.create(fileDetails);
  document[fieldName] = savedFile._id;
  await document.save();

  return { message: 'Media uploaded successfully.', media: savedFile };
};

// 2️⃣ Shop Document Upload Helper
export const uploadShopDocumentHelper = async (
  shopId,
  userId,
  file,
  documentType,
  metadata = {},
) => {
  const shop = await Shop.findOne({ _id: shopId, owner: userId });
  if (!shop) throw new AppError('Shop not found or access denied.', 404);

  const validTypes = ['businessDocument', 'identityProof', 'addressProof'];
  if (!validTypes.includes(documentType))
    throw new AppError('Invalid document type specified.', 400);
  if (!file)
    throw new AppError('No file uploaded. Please provide a valid file.', 400);

  const isImage = file.mimetype.startsWith('image/');
  const isPDF = file.mimetype === 'application/pdf';

  if (documentType === 'businessDocument' && !isPDF) {
    throw new AppError('Only PDF files allowed for business documents.', 400);
  }
  if (['identityProof', 'addressProof'].includes(documentType) && !isImage) {
    throw new AppError(
      'Only image files allowed for identity or address proof.',
      400,
    );
  }

  let verificationDocument = await VerificationDocument.findOne({
    shop: shopId,
  });
  if (!verificationDocument) {
    verificationDocument = new VerificationDocument({
      shop: shopId,
      type: process.env.NODE_ENV === 'production' ? 'cloud' : 'local',
    });
  }

  // Delete old file if it exists
  const existingDoc = verificationDocument[documentType];
  await deleteOldFile({
    fileData: existingDoc,
    storageType: verificationDocument.type,
  });

  const uploadResult = await handleFileUpload(
    file,
    process.env.NODE_ENV !== 'production',
    `shops/${shopId}/verificationDocuments`,
    `${shop.businessName}`,
  );

  verificationDocument[documentType] = {
    url: uploadResult.url,
    metadata: { ...metadata, size: file.size, type: file.mimetype },
    uploadedAt: new Date(),
    status: 'pending',
    public_id: uploadResult.public_id || null,
  };

  await verificationDocument.save();

  return {
    success: true,
    message: `${documentType} uploaded successfully.`,
    document: verificationDocument[documentType],
  };
};

// 3️⃣ Profile Picture Upload Handler
export const uploadProfilePicture = catchAsyncErrors(async (req, res, next) => {
  if (!req.file) return next(new AppError('No file uploaded.', 400));

  const useLocal = process.env.NODE_ENV !== 'production';
  const uploadedFile = await handleProfileUpload(req.file, useLocal);
  if (!uploadedFile) return next(new AppError('File processing failed.', 400));

  const user = await User.findById(req.user.id);
  if (!user) return next(new AppError('User not found.', 404));

  // Delete old picture
  await deleteOldFile({
    fileData: user.profilePicture,
    storageType: useLocal ? 'local' : 'cloud',
  });

  user.profilePicture = {
    public_id: uploadedFile.public_id || uuidv4(),
    url: uploadedFile.url || uploadedFile,
    type: 'image',
  };

  await user.save();

  res.status(201).json({
    message: 'Profile picture uploaded successfully.',
    file: user.profilePicture,
  });
});

// 4️⃣ Profile Picture Delete Handler
export const deleteProfilePicture = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return next(new AppError('User not found.', 404));
    if (!user.profilePicture)
      return next(new AppError('No profile picture to delete.', 400));

    await deleteOldFile({
      fileData: user.profilePicture,
      storageType: process.env.NODE_ENV !== 'production' ? 'local' : 'cloud',
    });
    user.profilePicture = null;
    await user.save();

    res.status(200).json({ message: 'Profile picture deleted successfully.' });
  } catch (error) {
    console.error('Error deleting profile picture:', error.message);
    next(new AppError('Internal server error', 500));
  }
};

// import fs from "fs/promises";
// import path from "path";
// import User from "../models/UserModel.js";
// import { deleteFromCloudinary } from "../../helper/cloudinaryHelper.js";
// import AppError from "../../utils/HandleAppErrors.js";
// import {
//   handleFileUpload,
//   handleProfileUpload,
// } from "../../helper/handleFileUpload.js";
// import cloudinary from "../../config/cloudinary.js";
// import { catchAsyncErrors } from "../../utils/catchAsyncErrors.js";
// import { validateURLs } from "../../utils/validateURLs.js";
// import Shop from "../models/ShopModel.js";
// import VerificationDocument from "../models/VerificationDocumentModel.js";
// import File from "../models/FileModel.js";
// // import Payment from "../models/Payment.js";
// // import File from "../models/File.js";
// import { v4 as uuidv4 } from "uuid";
// import { logger } from "../../utils/logger.js";
// import { extractFileMetadata } from "../../utils/extractFileMetadata.js";

// /**
//  * Generic file upload handler for any resource with a media field schema.
//  * Supports both external URLs and direct file uploads.
//  *
//  * @param {Object} options - Configuration options for the upload.
//  * @param {mongoose.Model} options.model - The Mongoose model to update.
//  * @param {String} options.documentId - The ID of the document to update.
//  * @param {String} options.fieldName - The media field name to update.
//  * @param {Object} options.file - The uploaded file object (if any).
//  * @param {String} [options.externalUrl] - The external URL to associate (if provided).
//  */

// export const uploadMedia = async ({
//   model,
//   documentId,
//   fieldName,
//   file,
//   externalUrl,
// }) => {
//   if (!model || !documentId || !fieldName) {
//     throw new AppError("Missing required parameters for upload.", 400);
//   }

//   const useLocal = process.env.NODE_ENV !== "production";

//   try {
//     // Find the resource document
//     const document = await model.findById(documentId);
//     if (!document) {
//       throw new AppError("Document not found.", 404);
//     }

//     // Handle deletion of existing file for the same resource
//     const existingFileId = document[fieldName];
//     if (existingFileId) {
//       try {
//         const existingFile = await File.findById(existingFileId);

//         if (existingFile) {
//           if (existingFile.storageType === "cloud" && existingFile.fileId) {
//             // Delete from Cloudinary
//             await deleteFromCloudinary(existingFile.fileId);
//           } else if (useLocal && existingFile.fileUrl) {
//             // Delete local file
//             const localFilePath = path.resolve(
//               "public",
//               existingFile.fileUrl.replace(/^\/+/, "")
//             );
//             await fs.access(localFilePath); // Check if file exists
//             await fs.unlink(localFilePath); // Delete file
//           }

//           // Remove the existing file entry from the database
//           await File.findByIdAndDelete(existingFileId);
//         }
//       } catch (error) {
//         console.warn(
//           "Failed to delete existing file or clean up resources:",
//           error.message
//         );
//       }
//     }

//     let fileDetails; // Object to hold file information

//     // If external URL is provided
//     if (externalUrl) {
//       if (!validateURLs(externalUrl)) {
//         throw new AppError("Invalid external URL.", 400);
//       }

//       fileDetails = {
//         fileName: null,
//         fileSize: null,
//         fileType: null,
//         mimeType: null,
//         fileCategory: "external",
//         storageType: "external",
//         fileUrl: externalUrl,
//         fileId: null,
//         metadata: null,
//         uploadedAt: new Date(),
//       };
//     } else if (file) {
//       // Handle file upload
//       const uploadedFile = await handleFileUpload(file, useLocal);

//       if (!uploadedFile) {
//         throw new AppError('File processing failed.', 400);
//       }

//       const meta = extractFileMetadata(file); // 🎯

//       fileDetails = {
//         ...meta,
//         storageType: useLocal ? 'local' : 'cloud',
//         fileUrl: uploadedFile.url,
//         fileId: uploadedFile.public_id || uuidv4(),
//         metadata: uploadedFile.metadata || {},
//         uploadedAt: new Date(),
//       };
//     } else {
//       throw new AppError("No file or URL provided for upload.", 400);
//     }

//     // Save new file details to File collection
//     const savedFile = await File.create(fileDetails);

//     // Update the document with the new file's ObjectId
//     document[fieldName] = savedFile._id;
//     await document.save();

//     return {
//       message: "Media uploaded successfully.",
//       media: savedFile,
//     };
//   } catch (error) {
//     console.error("Error during media upload:", error.message);
//     throw new AppError(`Internal server error: ${error.message}`, 500);
//   }
// };

// /**
//  * Helper function to handle shop document uploads.
//  * @param {string} shopId - The ID of the shop.
//  * @param {string} userId - The ID of the user (for ownership validation).
//  * @param {Object} file - The uploaded file object.
//  * @param {string} documentType - The type of document being uploaded.
//  * @param {Object} metadata - Optional metadata for the document.
//  */

// export const uploadShopDocumentHelper = async (
//   shopId,
//   userId,
//   file,
//   documentType,
//   metadata = {}
// ) => {
//   // Validate the shop's existence and ownership
//   const shop = await Shop.findOne({ _id: shopId, owner: userId });
//   if (!shop) {
//     throw new AppError("Shop not found or access denied.", 404);
//   }

//   // Validate document type
//   const validDocumentTypes = [
//     "businessDocument",
//     "identityProof",
//     "addressProof",
//   ];
//   if (!validDocumentTypes.includes(documentType)) {
//     throw new AppError("Invalid document type specified.", 400);
//   }

//   // Ensure file is provided
//   if (!file) {
//     throw new AppError("No file uploaded. Please provide a valid file.", 400);
//   }

//   // Validate MIME type
//   const isImage = file.mimetype.startsWith("image/");
//   const isPDF = file.mimetype === "application/pdf";

//   if (documentType === "businessDocument" && !isPDF) {
//     throw new AppError(
//       "Only PDF files are allowed for business documents.",
//       400
//     );
//   }
//   if (
//     (documentType === "identityProof" || documentType === "addressProof") &&
//     !isImage
//   ) {
//     throw new AppError(
//       "Only image files (JPEG, PNG) are allowed for identity or address proof.",
//       400
//     );
//   }

//   // Check or create a VerificationDocument for the shop
//   let verificationDocument = await VerificationDocument.findOne({
//     shop: shopId,
//   });

//   if (!verificationDocument) {
//     verificationDocument = new VerificationDocument({
//       shop: shopId,
//       type: process.env.NODE_ENV === "production" ? "cloud" : "local",
//     });
//   }

//   // // Handle existing file deletion (cloud/local)
//   const existingDocument = verificationDocument[documentType];

//   // Handle existing file deletion (only if the document type matches)
//   if (existingDocument?.[documentType]?.url) {
//     try {
//       const existingFile = existingDocument[documentType]; // Extract the matching document type
//       if (verificationDocument.type === "cloud" && existingFile.public_id) {
//         // Delete from Cloudinary
//         await deleteFromCloudinary(existingFile.public_id);
//       } else if (verificationDocument.type === "local") {
//         const localFilePath = path.resolve(
//           "public",
//           existingFile.url.replace(/^\/+/, "")
//         );
//         await fs.access(localFilePath); // Check if the file exists
//         await fs.unlink(localFilePath); // Delete the local file
//       }
//     } catch (error) {
//       logger.warn(
//         `Failed to delete old file for ${documentType}: ${error.message}`
//       );
//     }
//   }

//   // Upload the new file (Cloudinary/local)
//   const uploadResult = await handleFileUpload(
//     file,
//     process.env.NODE_ENV !== "production",
//     `shops/${shopId}/verificationDocuments`,
//     `${shop.businessName}`
//   );

//   const documentField = {
//     url: uploadResult.url,
//     metadata: {
//       ...metadata,
//       size: file.size,
//       type: file.mimetype,
//     },
//     uploadedAt: new Date(),
//     status: "pending",
//     public_id: uploadResult.public_id || null,
//   };

//   // Update the specific document type field
//   verificationDocument[documentType] = documentField;
//   await verificationDocument.save();

//   return {
//     success: true,
//     message: `${documentType} uploaded successfully.`,
//     document: verificationDocument[documentType],
//   };
// };

// /**
//  * Upload Profile Picture
//  * Handles uploading and updating a user's profile picture using handleFileUpload.
//  */

// export const uploadProfilePicture = catchAsyncErrors(async (req, res, next) => {
//   try {
//     if (!req.file) {
//       return next(new AppError("No file uploaded.", 400));
//     }

//     const useLocal = process.env.NODE_ENV !== "production"; // Use local storage in development
//     const uploadedFile = await handleProfileUpload(req.file, useLocal);

//     if (!uploadedFile) {
//       return next(new AppError("File processing failed.", 400));
//     }

//     const user = await User.findById(req.user.id);
//     if (!user) {
//       return next(new AppError("User not found.", 404));
//     }

//     // Handle existing profile picture deletion
//     if (user.profilePicture?.url) {
//       try {
//         if (user.profilePicture.public_id && !useLocal) {
//           // Delete from Cloudinary
//           await deleteFromCloudinary(user.profilePicture.public_id);
//         } else if (useLocal) {
//           const localFilePath = path.resolve(
//             "public",
//             user.profilePicture.url.replace(/^\/+/, "")
//           );
//           await fs.access(localFilePath); // Check if file exists
//           await fs.unlink(localFilePath); // Delete file locally
//         }
//       } catch (error) {
//         console.warn("Failed to delete old profile picture:", error.message);
//       }
//     }

//     // Assign new profile picture (generate public_id for local storage)
//     // (user.profilePicture = uploadedFile.url || uploadedFile),
//     user.profilePicture = {
//       public_id: uploadedFile.public_id || uuidv4(), // Generate UUID for local storage
//       url: uploadedFile.url || uploadedFile, // Local file path or cloud URL
//       type: "image",
//     };

//     await user.save();

//     res.status(201).json({
//       message: "Profile picture uploaded successfully.",
//       file: user.profilePicture,
//     });
//   } catch (error) {
//     console.error("Error uploading profile picture:", error.message);
//     next(new AppError(`Internal server error: ${error.message}`, 500));
//   }
// });

// /**
//  * Delete Profile Picture
//  * Handles deleting a user's profile picture from both storage and database.
//  */
// export const deleteProfilePicture = async (req, res, next) => {
//   try {
//     // Find the user in the database
//     const user = await User.findById(req.user.id);
//     if (!user) {
//       return next(new AppError("User not found", 404));
//     }

//     // Check if the user has a profile picture
//     if (user.profilePicture) {
//       const { public_id, url } = user.profilePicture;

//       try {
//         if (public_id) {
//           // Delete the profile picture from Cloudinary
//           await deleteFromCloudinary(public_id);
//           console.log(`Deleted Cloudinary file: ${public_id}`);
//         } else if (url) {
//           // Delete the profile picture from local storage
//           const localFilePath = path.resolve(
//             `public${url.replace("/uploads", "")}`
//           );
//           console.log("Deleting file at:", localFilePath);

//           try {
//             await fs.unlink(localFilePath);
//             console.log(`Deleted local file: ${localFilePath}`);
//           } catch (error) {
//             if (error.code === "ENOENT") {
//               console.warn("Local file not found, skipping deletion.");
//             } else {
//               throw error; // Re-throw for unexpected errors
//             }
//           }
//         }

//         // Clear the profile picture reference in the database
//         user.profilePicture = null;
//         await user.save();

//         res
//           .status(200)
//           .json({ message: "Profile picture deleted successfully" });
//       } catch (deleteError) {
//         console.error("Error deleting profile picture:", deleteError.message);
//         return next(new AppError("Failed to delete profile picture", 500));
//       }
//     } else {
//       return next(new AppError("No profile picture to delete", 400));
//     }
//   } catch (error) {
//     console.error("Error deleting profile picture:", error.message);
//     next(new AppError("Internal server error", 500));
//   }
// };

// /**
//  * Controller for listing files in a specified Cloudinary folder
//  * Supports pagination and customization via query parameters.
//  * GET /api/v1/files?folder=images/profiles&limit=50
//  */
// export const listFiles = catchAsyncErrors(async (req, res, next) => {
//   const { folder = "user_files", limit = 100, next_cursor } = req.query;

//   // Validate limit parameter
//   if (limit > 500 || limit < 1) {
//     return next(
//       new AppError(
//         "Invalid 'limit' parameter. It must be between 1 and 500.",
//         400
//       )
//     );
//   }

//   try {
//     // Fetch resources from Cloudinary
//     const result = await cloudinary.api.resources({
//       type: "upload",
//       prefix: folder, // Folder name
//       max_results: parseInt(limit, 10), // Number of files to return
//       next_cursor, // For pagination
//     });

//     // Respond with the list of files
//     res.status(200).json({
//       message: "Files retrieved successfully.",
//       files: result.resources.map((file) => ({
//         public_id: file.public_id,
//         url: file.secure_url,
//         format: file.format,
//         size: file.bytes,
//         created_at: file.created_at,
//         width: file.width,
//         height: file.height,
//       })),
//       next_cursor: result.next_cursor, // Cursor for fetching the next batch
//       total_count: result.total_count || undefined, // Total count if available
//     });
//   } catch (error) {
//     // Handle Cloudinary-specific errors gracefully
//     if (error.http_code) {
//       return next(
//         new AppError(`Cloudinary Error: ${error.message}`, error.http_code)
//       );
//     }

//     // General server-side error
//     console.error("Error listing files:", error.message);
//     next(new AppError("Failed to retrieve files. Please try again.", 500));
//   }
// });

// /**
//  * Controller for retrieving file information from Cloudinary.
//  * @route GET /api/v1/files/:public_id
//  * @param {string} public_id - The public ID of the file to retrieve.
//  * @returns {Object} File details or an error response.
//  */
// export const getFileInfo = catchAsyncErrors(async (req, res, next) => {
//   const { public_id } = req.params;

//   if (!public_id) {
//     return next(
//       new AppError("Public ID is required to retrieve file information.", 400)
//     );
//   }

//   try {
//     // Fetch file information from Cloudinary
//     const result = await cloudinary.api.resource(public_id);

//     res.status(200).json({
//       message: "File retrieved successfully.",
//       file: {
//         public_id: result.public_id,
//         url: result.secure_url,
//         format: result.format,
//         size: result.bytes,
//         created_at: result.created_at,
//         width: result.width,
//         height: result.height,
//         tags: result.tags,
//         folder: result.folder,
//         type: result.resource_type,
//       },
//     });
//   } catch (error) {
//     // Handle Cloudinary-specific errors
//     if (error.http_code === 404) {
//       return next(
//         new AppError(`File with public ID '${public_id}' not found.`, 404)
//       );
//     }

//     console.error("Error retrieving file information:", error.message);
//     next(
//       new AppError(`Failed to retrieve file information: ${error.message}`, 500)
//     );
//   }
// });

// // Update File Metadata
// export const updateFileMetadata = catchAsyncErrors(async (req, res, next) => {
//   const { public_id } = req.params;
//   const { tags, context } = req.body;

//   if (!public_id) {
//     return next(new AppError("Public ID is required to update metadata.", 400));
//   }

//   try {
//     const result = await cloudinary.api.update(public_id, {
//       tags,
//       context,
//     });

//     res.status(200).json({
//       message: "File metadata updated successfully.",
//       file: {
//         public_id: result.public_id,
//         tags: result.tags,
//         context: result.context,
//         updated_at: result.updated_at,
//       },
//     });
//   } catch (error) {
//     console.error("Error updating file metadata:", error.message);
//     next(new AppError(`Failed to update metadata: ${error.message}`, 500));
//   }
// });

// // Generate File Transformation URL
// export const getFileTransformationUrl = catchAsyncErrors(
//   async (req, res, next) => {
//     const { public_id } = req.params;
//     const {
//       width,
//       height,
//       crop = "fill",
//       quality = "auto",
//       format = "auto",
//     } = req.query;

//     if (!public_id) {
//       return next(
//         new AppError(
//           "Public ID is required to generate transformation URL.",
//           400
//         )
//       );
//     }

//     try {
//       const transformationUrl = cloudinary.url(public_id, {
//         width: parseInt(width),
//         height: parseInt(height),
//         crop,
//         quality,
//         fetch_format: format,
//       });

//       res.status(200).json({
//         message: "File transformation URL generated successfully.",
//         url: transformationUrl,
//       });
//     } catch (error) {
//       console.error("Error generating transformation URL:", error.message);
//       next(
//         new AppError(
//           `Failed to generate transformation URL: ${error.message}`,
//           500
//         )
//       );
//     }
//   }
// );

// // Bulk Delete Files
// export const bulkDeleteFiles = catchAsyncErrors(async (req, res, next) => {
//   const { public_ids } = req.body;

//   if (!Array.isArray(public_ids) || public_ids.length === 0) {
//     return next(new AppError("No public IDs provided for deletion.", 400));
//   }

//   try {
//     const result = await cloudinary.api.delete_resources(public_ids);

//     res.status(200).json({
//       message: "Files deleted successfully.",
//       deleted: result.deleted,
//       not_found: result.not_found,
//       partial: result.partial,
//     });
//   } catch (error) {
//     console.error("Error deleting files:", error.message);
//     next(new AppError(`Failed to delete files: ${error.message}`, 500));
//   }
// });

// // Generate a unique download code for the file (to be issued after successful payment)
// // export const generateDownloadCode = catchAsyncErrors(async (req, res, next) => {
// //   const { fileId } = req.params;

// //   // Check if the file exists
// //   const file = await File.findById(fileId);
// //   if (!file) {
// //     return next(new AppError("File not found.", 404));
// //   }

// //   // Check payment status
// //   const payment = await Payment.findOne({
// //     user: req.user.id,
// //     file: fileId,
// //     status: "completed", // Payment must be marked as completed
// //   });

// //   if (!payment) {
// //     return next(new AppError("Payment not verified for this file.", 403));
// //   }

// //   // Generate a unique download code and store it in the payment record
// //   const downloadCode = uuidv4();
// //   payment.downloadCode = downloadCode;
// //   await payment.save();

// //   res.status(200).json({
// //     message: "Download code generated successfully.",
// //     downloadCode,
// //   });
// // });

// // // Download file if the user has a valid download code
// // export const downloadFile = catchAsyncErrors(async (req, res, next) => {
// //   const { fileId, downloadCode } = req.params;

// //   // Check if the file exists
// //   const file = await File.findById(fileId);
// //   if (!file) {
// //     return next(new AppError("File not found.", 404));
// //   }

// //   // Validate the download code and payment
// //   const payment = await Payment.findOne({
// //     user: req.user.id,
// //     file: fileId,
// //     status: "completed", // Payment must be completed
// //     downloadCode, // Validate the download code
// //   });

// //   if (!payment) {
// //     return next(new AppError("Invalid or expired download code.", 403));
// //   }

// //   // Construct the file path
// //   const filePath = path.resolve("public/files", file.fileName); // Adjust base path as needed
// //   try {
// //     // Ensure the file exists
// //     await fs.access(filePath);

// //     // Set headers and send the file
// //     res.download(filePath, file.originalName, (err) => {
// //       if (err) {
// //         console.error("Error sending file:", err.message);
// //         next(new AppError("Failed to download the file. Please try again.", 500));
// //       }
// //     });
// //   } catch (err) {
// //     console.error("File not found:", err.message);
// //     next(new AppError("The requested file is not available.", 404));
// //   }
// // });

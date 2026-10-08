import crypto from "crypto";
// import { v4 as uuidv4 } from "uuid";
import DownloadCode from "../api/models/downloadCodeModel.js";

// export const generateDownloadCode = async (
//   userId,
//   contentId,
//   validityPeriod
// ) => {
//   const code = uuidv4(); // Generate a unique code
//   const expirationDate = new Date(Date.now() + validityPeriod); // Set expiration based on validity period

//   const downloadCode = await DownloadCode.create({
//     code,
//     digitalContent: contentId,
//     user: userId,
//     expirationDate,
//   });

//   return downloadCode;
// };

export const generateDownloadCode = async (userId, digitalContentId) => {
  const code = crypto.randomBytes(12).toString("hex"); // Generate a random unique code

  const expirationDate = new Date();
  expirationDate.setDate(expirationDate.getDate() + 7); // Code expires in 7 days

  const downloadCode = new DownloadCode({
    code,
    digitalContent: digitalContentId,
    user: userId,
    expirationDate,
    isUsed: false,
  });

  await downloadCode.save();
  return code;
};

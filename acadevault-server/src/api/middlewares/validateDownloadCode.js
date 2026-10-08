import DownloadCode from "../models/downloadCodeModel.js";

export const validateDownloadCode = async (req, res, next) => {
  const { code } = req.body;

  const downloadCode = await DownloadCode.findOne({ code });

  if (!downloadCode) {
    return res.status(404).json({ message: "Invalid download code." });
  }

  if (downloadCode.expirationDate < Date.now()) {
    return res.status(403).json({ message: "Download code has expired." });
  }

  if (downloadCode.usageCount >= downloadCode.usageLimit) {
    return res
      .status(403)
      .json({ message: "Download code usage limit reached." });
  }

  downloadCode.usageCount += 1;
  await downloadCode.save();

  req.downloadCode = downloadCode;
  next();
};

import Banner from "../models/Banner.js";
import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import AppError from "../../utils/HandleAppErrors.js";

// Create banner
export const createBanner = catchAsyncErrors(async (req, res, next) => {
  const banner = await Banner.create({ ...req.body, createdBy: req.user._id });
  res.status(201).json({ success: true, banner });
});

// Get all banners (with filtering)
export const getBanners = catchAsyncErrors(async (req, res, next) => {
  const { position, isActive } = req.query;

  const query = {};
  if (position) query.position = position;
  if (isActive !== undefined) query.isActive = isActive === "true";

  const banners = await Banner.find(query).sort({ displayOrder: 1 });
  res.status(200).json({ success: true, count: banners.length, banners });
});

// Update banner
export const updateBanner = catchAsyncErrors(async (req, res, next) => {
  const banner = await Banner.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!banner) return next(new AppError("Banner not found", 404));

  res.status(200).json({ success: true, banner });
});

// Delete banner
export const deleteBanner = catchAsyncErrors(async (req, res, next) => {
  const banner = await Banner.findByIdAndDelete(req.params.id);
  if (!banner) return next(new AppError("Banner not found", 404));

  res.status(200).json({ success: true, message: "Banner deleted" });
});

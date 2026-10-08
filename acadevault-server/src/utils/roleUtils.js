import User from "../api/models/UserModel.js";
import AppError from "./HandleAppErrors.js";

export const ensureAdmin = async (userId) => {
  const user = await User.findById(userId).select("role").lean();
  if (!user || user.role !== "Admin") {
    throw new AppError("You are not authorized to perform this action.", 403);
  }
};

import mongoose from "mongoose";

// Utility: Handle transaction session
export const handleTransaction = async (session, fn) => {
  try {
    if (!session) {
      session = await mongoose.startSession();
      session.startTransaction();
    }
    await fn(session);
    if (session.inTransaction()) await session.commitTransaction();
  } catch (error) {
    if (session?.inTransaction()) await session.abortTransaction();
    throw error;
  } finally {
    session?.endSession();
  }
};

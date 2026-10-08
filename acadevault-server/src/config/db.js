import mongoose from 'mongoose';
import { logger } from '../utils/logger.js';

const connectDB = async () => {
  const mongoURI = process.env.DB_URI_CLOUD;

  if (!mongoURI) {
    logger.error('MongoDB URI is not defined in the environment variables.');
    // In dev, continue without DB
    if (process.env.NODE_ENV === 'production') {
      process.exit(1);
    } else {
      logger.warn('Continuing without MongoDB connection (DEV MODE).');
      return;
    }
  }

  try {
    const connection = await mongoose.connect(mongoURI);
    logger.info(
      `✅ MongoDB connected successfully: ${connection.connection.host}`,
    );
  } catch (err) {
    logger.error('❌ MongoDB connection failed', {
      message: err.message,
      stack: err.stack,
    });

    if (process.env.NODE_ENV === 'production') {
      process.exit(1);
    } else {
      logger.warn(
        '⚠️ Skipping DB connection. Server will run in offline mode.',
      );
    }
  }

  mongoose.connection.on('disconnected', () => {
    logger.info('🔌 MongoDB connection disconnected.');
  });

  mongoose.connection.on('reconnected', () => {
    logger.info('🔁 MongoDB reconnected.');
  });
};

export default connectDB;

// import mongoose from "mongoose";
// import { logger } from "../utils/logger.js";

// const connectDB = async () => {
//   const mongoURI = process.env.DB_URI_CLOUD;

//   // Check if the MongoDB URI is defined in the environment
//   if (!mongoURI) {
//     logger.error("MongoDB URI is not defined in the environment variables.");
//     process.exit(1);
//   }

//   try {
//     // Establish a connection to MongoDB with options
//     const connection = await mongoose.connect(mongoURI);

//     // Log the successful connection
//     logger.info(
//       `MongoDB connected successfully: ${connection.connection.host}`
//     );
//   } catch (err) {
//     // Log error details if the connection fails
//     logger.error("MongoDB connection failed", {
//       message: err.message,
//       stack: err.stack,
//     });

//     // Exit the process with failure
//     process.exit(1);
//   }

//   // Optionally listen to MongoDB events for additional logging or actions
//   mongoose.connection.on("disconnected", () => {
//     logger.info("MongoDB connection disconnected.");
//   });

//   mongoose.connection.on("reconnected", () => {
//     logger.info("MongoDB reconnected.");
//   });
// };

// // Export the function for use in other modules
// export default connectDB;

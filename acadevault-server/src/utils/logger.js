import { createLogger, format, transports } from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';
import morgan from 'morgan';
import path from 'path';
import fs from 'fs';

import { LOG_DIR } from '../constants/paths.js';
import { formatDate } from '../utils/commonUtils.js';
import { isProduction } from './envUtils.js';
import { appConfig } from '../constants/appConfig.js';

// Ensure the logs directory exists
if (!fs.existsSync(LOG_DIR)) {
  fs.mkdirSync(LOG_DIR, { recursive: true });
}

// Define the log format
const logFormat = format.printf(
  ({ timestamp, level, message, stack, label }) => {
    return `${timestamp} [${label || appConfig.APP_NAME}] [${level.toUpperCase()}]: ${
      stack || message
    }`;
  },
);

// Create logger instance
export const logger = createLogger({
  level: isProduction ? 'info' : 'debug', // Adjust verbosity based on environment
  format: format.combine(
    format.label({ label: appConfig.APP_NAME }),
    format.timestamp({ format: formatDate() }), // Use utility function for date
    format.errors({ stack: true }),
    logFormat,
  ),
  transports: [
    // Console transport with environment-aware formatting
    new transports.Console({
      format: format.combine(
        isProduction ? format.uncolorize() : format.colorize(),
        logFormat,
      ),
    }),

    // Daily rotated file transport for all logs
    new DailyRotateFile({
      filename: path.join(LOG_DIR, 'application-%DATE%.log'),
      datePattern: 'YYYY-MM-DD',
      maxFiles: '14d', // Retain logs for 14 days
    }),

    // File transport for error-specific logs
    new transports.File({
      filename: path.join(LOG_DIR, 'error.log'),
      level: 'error',
    }),
  ],
});

// Handle uncaught exceptions
// logger.exceptions.handle(
//   new transports.File({
//     filename: path.join(LOG_DIR, 'exceptions.log'),
//   }),
// );

// Handle unhandled rejections
// logger.rejections.handle(
//   new transports.File({
//     filename: path.join(LOG_DIR, 'rejections.log'),
//   }),
// );

// Stream for Morgan integration
export const stream = {
  write: (message) => logger.info(message.trim()),
};

// Morgan middleware integration
export const setupMorgan = (app) => {
  app.use(morgan(isProduction ? 'combined' : 'dev', { stream }));
};

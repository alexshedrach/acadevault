import http from 'http';
import app from './app.js';
import setupWebSocket from './websockets/websocket.js';
import connectDB from './config/db.js';
import { logger } from './utils/logger.js';
// import { appConfig } from './constants/appConfig.js';

// DATABASE CONNECTION
await connectDB();

// Define server configurations
const PORT = process.env.PORT || 4001;
const server = http.createServer(app);

// Initialize WebSocket
setupWebSocket(server);

// Log Application Configurations
// logger.info(`🔧 App Name: ${appConfig.APP_NAME}`);
// logger.info(`🌐 Base URL: ${appConfig.BASE_URL}`);
// logger.info(`📧 Support Email: ${appConfig.SUPPORT.email}`);
// logger.info(`☎️ Support Phone: ${appConfig.SUPPORT.phone}`);
// logger.info(
//   `💰 Default Currency: ${appConfig.DISPLAY.currency} (${appConfig.DISPLAY.currencySymbol})`,
// );
// logger.info(`🕒 Timezone: ${appConfig.DISPLAY.timezone}`);
// logger.info(`📂 Max Upload Size: ${appConfig.UPLOAD.maxSizeMB} MB`);
// logger.info(
//   `📄 Allowed File Types: ${appConfig.UPLOAD.allowedFileTypes.join(', ')}`,
// );

// Start the server
// Start the server
const appServer = server.listen(PORT, () => {
  const url = `http://localhost:${PORT}`;
  logger.info(`✅ Server running on port ${PORT}`);
  logger.info(`🌐 Visit: ${url}`);
});

// Catch port conflicts or underlying HTTP errors
appServer.on('error', (error) => {
  if (error.code === 'EADDRINUSE') {
    console.error(`❌ Port ${PORT} is already in use. Please kill the process or change the port.`);
    process.exit(1);
  } else {
    console.error('❌ Server encountered an error:', error);
  }
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  // 1. Native console.error guarantees the stack trace is immediately visible
  console.error('🚨 CRITICAL: Uncaught Exception! Shutting down...');
  console.error(err); 
  
  // 2. Pass to your custom logger
  logger.error(`❌ Uncaught Exception: ${err.stack || err.message}`);
  
  // 3. Give Winston a 1-second window to flush the logs to file before killing the process
  setTimeout(() => {
    process.exit(1);
  }, 1000).unref();
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
  console.error('🚨 CRITICAL: Unhandled Rejection! Shutting down...');
  console.error('Reason:', reason);
  
  logger.error(`❌ Unhandled Rejection at: ${promise} | Reason: ${reason}`);
  
  // Close server gracefully before exiting
  appServer.close(() => {
    process.exit(1);
  });
});
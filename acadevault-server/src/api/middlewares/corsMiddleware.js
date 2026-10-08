import cors from "cors";
import { isProduction } from "../../utils/envUtils.js";

/**
 * CORS Middleware Setup
 * Configures Cross-Origin Resource Sharing (CORS) for the application.
 * @param {object} app - The Express application instance.
 */
const corsMiddleware = (app) => {
  // Define allowed origins for different environments
  const allowedOrigins = isProduction
    ? [
        "https://academate.com", // Main production domain
        "https://sub_academate.com", // Subdomain for specific services
      ]
    : [
        "http://localhost:3004", // Localhost for frontend during development
        "http://127.0.0.1:4001", // Alternative localhost address
      ];

  // Define CORS options
  const corsOptions = {
    
    //  * Configure the allowed origin dynamically based on the request.
    origin: (origin, callback) => {
      if (!origin) {
        // Allow requests with no origin (e.g., mobile apps or Postman)
        return callback(null, true);
      }
      if (allowedOrigins.includes(origin)) {
        callback(null, true); // Allow origins in the list
      } else {
        callback(new Error("Not allowed by CORS")); // Reject unauthorized origins
      }
    },
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"], // Specify allowed HTTP methods
    allowedHeaders: [
      "Origin",
      "X-Requested-With",
      "Content-Type",
      "Accept",
      "Authorization",
    ], // Allowed custom headers
    credentials: true, // Enable cookies and authentication headers
    preflightContinue: false, // Skip response for preflight requests
    optionsSuccessStatus: 204, // HTTP status for successful preflight
  };

  // Apply CORS middleware
  app.use(cors(corsOptions));

  // Handle preflight (OPTIONS) requests for all routes
  // app.options("*", cors(corsOptions));
  
};

export default corsMiddleware;

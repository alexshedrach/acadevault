import express from 'express';
import cookieParser from 'cookie-parser';
// REMOVED: import dotenv from 'dotenv';

import corsMiddleware from './api/middlewares/corsMiddleware.js';
import globalAppErrorHandler from './api/middlewares/globalAppErrorHandler.js';
import { captureClientInfo } from './api/middlewares/captureClientInfo.js';
import rateLimiter from './api/middlewares/rateLimiter.js';

import AppError from './utils/HandleAppErrors.js';
import { setupMorgan } from './utils/logger.js';

import { userRouter } from './api/routes/UserRoutes.js';
import { followRouter } from './api/routes/FollowRoutes.js';
import { shopRouter } from './api/routes/ShopRoutes.js';
import { categoryRouter } from './api/routes/categoryRoutes.js';
import { academicMaterialRouter } from './api/routes/academicMaterialRoutes.js';
import { priceRouter } from './api/routes/PriceRoutes.js';
import { notificationRouter } from './api/routes/notificationRoutes.js';
import { scheduleFollowerValidationJob } from './tasks/validateAllFollowerCounts.js';
import { cartRouter } from './api/routes/CartRoutes.js';
import { staticMiddleware } from './api/middlewares/staticMiddleware.js';
import { searchRouter } from './api/routes/searchRoutes.js';
import { couponRouter } from './api/routes/CouponRoutes.js';
import { checkoutRoutes } from './api/routes/CheckoutRoutes.js';
import { paymentRoutes } from './api/routes/PaymentRoutes.js';

// REMOVED: dotenv.config();

// Initialize the Express application
const app = express();

// ─── Trust proxy ──────────────────────────────────────────────────
// If you're behind one proxy (ngrok, ELB, etc.), use `1`.
// If multiple or you want to trust all, use `true`.
app.set('trust proxy', 1);

// Rate Limiting to prevent abuse
app.use(rateLimiter());

// -----------------------------------------------------
// ** ===========  GLOBAL MIDDLEWARES ============= **
// -----------------------------------------------------

// CORS Middleware
corsMiddleware(app);

// HTTP Request Logging (Development/Production Configurations)
setupMorgan(app);

// Extract client information
app.use(captureClientInfo);

// Raw body parser ONLY for payment webhooks (must come before express.json)
// ✅ Good Order
app.use('/api/v2/payment/webhook/paystack', express.raw({ type: '*/*' }));

// Parse incoming JSON payloads for all other routes
app.use(express.json({ limit: '10kb' }));

// Parse URL-encoded payloads
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// Parse cookies for request headers
app.use(cookieParser());

// Serve static files (e.g., user assets, uploads)
staticMiddleware(app);

// ---------------------------------------------
// ** =========== API ROUTES ============= **
// ---------------------------------------------

app.use('/api/v2/users', userRouter);
app.use('/api/v2/follow', followRouter);
app.use('/api/v2/shops', shopRouter);
app.use('/api/v2/categories', categoryRouter);
app.use('/api/v2/academic-materials', academicMaterialRouter);
app.use('/api/v2/search', searchRouter);
app.use('/api/v2/prices', priceRouter);
app.use('/api/v2/notifications', notificationRouter);
app.use('/api/v2/carts', cartRouter);
app.use('/api/v2/coupons', couponRouter);
app.use('/api/v2/checkout', checkoutRoutes);
app.use('/api/v2/payment', paymentRoutes);

// Initialize background tasks
// to periodically validate the followerCount for all shops
scheduleFollowerValidationJob();

// ---------------------------------------------------------------
// ** =========== ERROR HANDLING MIDDLEWARE ============= **
// ---------------------------------------------------------------

// Handle Non-existing Routes
app.all('/{*splat}', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});
// Error Handling Middleware
app.use(globalAppErrorHandler);

// EXPORT APPLICATION INSTANCE
export default app;

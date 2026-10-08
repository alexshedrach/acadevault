import express from 'express';
import {
  MATERIAL_ASSETS_DIR,
  USER_ASSETS_DIR,
} from '../../constants/paths.js';

export const staticMiddleware = (app) => {
  app.use('/users', express.static(USER_ASSETS_DIR));
  app.use(
    '/uploads',
    express.static(MATERIAL_ASSETS_DIR, {
      maxAge: '30d', // Example cache header for 30 days
    }),
  );
};

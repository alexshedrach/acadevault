import express from 'express';
import {
  autoCompleteController,
  globalSearchController,
} from '../controllers/globalSearchController.js';

const router = express.Router();

// Global Search Endpoint
router.get('/', globalSearchController);
router.get('/auto-complete', autoCompleteController);

export const searchRouter = router;

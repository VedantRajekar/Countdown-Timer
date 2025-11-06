import express from 'express';
import { createTimer, getTimers, deleteTimer } from '../controllers/timerController.js';
import protect from '../middleware/authMiddleware.js';
const router = express.Router();
router.route('/').get(protect, getTimers).post(protect, createTimer);
router.route('/:id').delete(protect, deleteTimer);
export default router;

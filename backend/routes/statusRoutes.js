import express from 'express';
import { getUserClubStatus } from '../controllers/statusController.js';
import ensureAuth from '../middlewares/authMiddleware.js';

const router = express.Router();

// GET /api/user/clubs?status=considering
router.get('/user/clubs', ensureAuth, getUserClubStatus);

export default router;
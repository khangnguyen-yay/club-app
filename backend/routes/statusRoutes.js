import express from 'express';
import { getUserClubStatus, addUserPreference } from '../controllers/statusController.js';
import ensureAuth from '../middlewares/authMiddleware.js';

const router = express.Router();

// GET /api/user/clubs?status=considering
router.get('/user/clubs', ensureAuth, getUserClubStatus);

// POST /users/:userId/preferences
router.post("/users/:userId/preferences", addUserPreference);

export default router;
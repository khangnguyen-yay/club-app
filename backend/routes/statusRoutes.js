import express from 'express';
import { getUserClubStatus, modifyUserClubStatus } from '../controllers/statusController.js';
import ensureAuth from '../middlewares/authMiddleware.js';

const router = express.Router();

// route for GET /api/user/clubs?status=considering
router.get('/user/clubs', ensureAuth, getUserClubStatus);

// route for POST api/user/statuses
router.post("/user/statuses", ensureAuth, modifyUserClubStatus);

export default router;
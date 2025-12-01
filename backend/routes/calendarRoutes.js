// routes/calendarRoutes.js
import { Router } from 'express';
import ensureAuth from '../middlewares/authMiddleware.js';
import { getClubDeadlines } from '../controllers/calendarController.js';

const router = Router();

// GET /api/calendar/deadlines -> fetch all of user's club application deadlines
router.get('/deadlines', ensureAuth, getClubDeadlines);

export default router;

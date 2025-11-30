// routes/calendarRoutes.js
import { Router } from 'express';
import ensureAuth from '../middlewares/authMiddleware.js';   // adjust path if needed
import db from '../config/db.js';                            // same db import as userService

const router = Router();

// GET /api/calendar/deadlines
router.get('/deadlines', ensureAuth, async (req, res) => {
  try {
    // req.user is set by Passport; it should include the 'id' from your users table
    const userId = req.user.id;

    const [rows] = await db.query(
      `SELECT
         c.id,
         c.club_name,
         c.type,
         c.app_date,
         cp.preference
       FROM clubs c
       JOIN club_preferences cp ON cp.club_id = c.id
       WHERE cp.user_id = ?
         AND cp.preference IN ('considering', 'applying', 'applied')
         AND c.app_date IS NOT NULL
         AND c.app_date >= NOW()
       ORDER BY c.app_date ASC`,
      [userId]
    );

    // rows is an array of plain JS objects
    res.json({ deadlines: rows });
  } catch (err) {
    console.error('Error fetching deadlines:', err);
    res.status(500).json({ message: 'Failed to fetch deadlines' });
  }
});

export default router;

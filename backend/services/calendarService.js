import db from '../config/db.js';

export const getClubAppDeadlines = async (userId) => {

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

    return rows;
};
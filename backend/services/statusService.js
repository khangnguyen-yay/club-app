import db from '../config/db.js';

export const getUserClubsByStatus = async (userId, status) => {
    const query = `
        SELECT c.id AS clubID, c.club_name, c.type, cp.preferences
        FROM clubs c
        JOIN club_preferences cp ON c.id = cp.club_id
        WHERE cp.user_id = ? AND cp.preferences = ?
        `;

        const [rows] = await pool.query(query, [userId, status]);
        return rows;
};

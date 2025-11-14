import db from '../config/db.js';

export const getUserClubsByStatus = async (userId, status) => {
    const query = `
        SELECT c.id AS clubID, c.club_name, c.type, cp.preference
        FROM clubs c
        JOIN club_preferences cp ON c.id = cp.club_id
            WHERE cp.user_id = ? AND cp.preference = ?
        `;
    const [rows] = await db.query(query, [userId, status]);
    return rows;
};

export const getAllUserClubsWithStatus = async (userId) => {
    const query = `
        SELECT c.id AS clubID, c.club_name, c.type, cp.preference
        FROM clubs c
        JOIN club_preferences cp ON c.id = cp.club_id
        WHERE cp.user_id = ?
    `;
    const [rows] = await db.query(query, [userId]);
    return rows;
};

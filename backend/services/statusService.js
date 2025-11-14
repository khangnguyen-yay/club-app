import db from '../config/db.js';

export const getUserClubsByStatus = async (userId, status) => {
    //When I go into mysql db and do SHOW COLUMNS FROM club_preferences;, it returns "status" instead of "preference"
    const query = `
        SELECT c.id AS clubID, c.club_name, c.type, cp.status
        FROM clubs c
        JOIN club_preferences cp ON c.id = cp.club_id
            WHERE cp.user_id = ? AND cp.status = ?
        `;
    const [rows] = await db.query(query, [userId, status]);
    return rows;
};

export const getAllUserClubsWithStatus = async (userId) => {
    const query = `
        SELECT c.id AS clubID, c.club_name, c.type, cp.status
        FROM clubs c
        JOIN club_preferences cp ON c.id = cp.club_id
        WHERE cp.user_id = ?
    `;
    const [rows] = await db.query(query, [userId]);
    return rows;
};

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

export async function insertUserPreference(userId, clubId, preference = "none") {
  await db.query(
    "INSERT INTO user_preferences (user_id, club_id, preference) VALUES (?, ?, ?)",
    [userId, clubId, preference]
  );
  return { userId, clubId, preference };
}

export async function updateUserPreference(userId, clubId, preference) {
  await db.query(
    "UPDATE user_preferences SET preference = ? WHERE user_id = ? AND club_id = ?",
    [preference, userId, clubId]
  );
  return { userId, clubId, preference };
}
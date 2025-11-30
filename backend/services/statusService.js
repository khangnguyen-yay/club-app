import db from '../config/db.js';

//these functions are used only during GET requests (GET api/user/clubs?status=___)
// ---returns clubs with a certain status---
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
// ---returns clubs with any status at all---
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

//these functions are used during POST requests (POST api/user/statuses)
// ---checks if a user already has a status for that club selected---
export async function getUserClubPreference(userId, clubId) {
  const query = `SELECT * FROM club_preferences WHERE user_id = ? AND club_id = ? LIMIT 1`;
  const [rows] = await db.query(query, [userId, clubId]);
  return rows.length ? rows[0] : null;
}

// ---add a status to a club for a user---
export async function insertUserStatus(userId, clubId, preference = "none") {
  await db.query(
    "INSERT INTO club_preferences (user_id, club_id, preference) VALUES (?, ?, ?)",
    [userId, clubId, preference]
  );
  return { userId, clubId, preference };
}
// ---set a user's status for a club with their new status---
export async function updateUserStatus(userId, clubId, preference) {
  await db.query(
    "UPDATE club_preferences SET preference = ? WHERE user_id = ? AND club_id = ?",
    [preference, userId, clubId]
  );
  return { userId, clubId, preference };
}
import db from '../config/db.js';
/*
NOTE: "Status" and "Preference" are used interchangeably in this context. To make it easier to differentiate between
functions for GET and POST requests, "Status" is used in function names for GET requests, while "Preference" is 
used in function names for POST requests.
*/

//these functions are used only during GET requests (GET api/user/clubs?status=___)
// ---returns all clubs for a user that match a specific status---
export const getUserClubsByStatus = async (userId, status) => {
    const query = `
        SELECT c.*
        FROM clubs c
        JOIN club_preferences cp ON c.id = cp.club_id
        WHERE cp.user_id = ? AND cp.preference = ?
        `;
    const [rows] = await db.query(query, [userId, status]);
    return rows;
};
// ---returns all clubs for a user, regardless of status---
export const getAllUserClubsWithStatus = async (userId) => {
    const query = `
        SELECT 
    c.id AS club_id,
    c.club_name,
    c.type,
    c.app_date,
    c.fb,
    c.ig,
    c.website,
    c.notes,
    cp.preference
  FROM clubs c
  LEFT JOIN club_preferences cp
    ON cp.club_id = c.id
    AND cp.user_id = ?;  
    `;
    const [rows] = await db.query(query, [userId]);
    return rows;
};

//these functions are used during POST requests (POST api/user/statuses)
// ---returns the preference for a single club for a single user---
export async function getUserClubPreference(userId, clubId) {
  const query = `SELECT * FROM club_preferences WHERE user_id = ? AND club_id = ? LIMIT 1`;
  const [rows] = await db.query(query, [userId, clubId]);
  return rows.length ? rows[0] : null;
}

// ---add a preference to a club for a user---
export async function addUserClubPreference(userId, clubId, preference = "none") {
  await db.query(
    "INSERT INTO club_preferences (user_id, club_id, preference) VALUES (?, ?, ?)",
    [userId, clubId, preference]
  );
  return { userId, clubId, preference };
}
// ---set a user's preference for a club with a new preference---
export async function updateUserClubPreference(userId, clubId, preference) {
  await db.query(
    "UPDATE club_preferences SET preference = ? WHERE user_id = ? AND club_id = ?",
    [preference, userId, clubId]
  );
  return { userId, clubId, preference };
}
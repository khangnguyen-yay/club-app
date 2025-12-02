import db from '../config/db.js';

//select all clubs from the database
export const getAllClubs = async (userID) => {
  const query = `SELECT 
    c.id AS id,
    c.club_name,
    c.type,
    c.app_date,
    c.fb,
    c.ig,
    c.website,
    c.notes,
    c.created_at,
    cp.preference
  FROM clubs c
  LEFT JOIN club_preferences cp
    ON cp.club_id = c.id
    AND cp.user_id = ?;`;
  const [rows] = await db.query(query, [userID]);
  return rows;
};

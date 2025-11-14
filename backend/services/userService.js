import db from '../config/db.js';

export const findOrCreateUser = async (profile) => {
  const googleId = profile.id;
  const name = profile.displayName;
  const email = profile.emails?.[0]?.value;

  // check if user already exists
  const [rows] = await db.query('SELECT * FROM users WHERE google_id = ?', [googleId]);
  if (rows.length > 0) return rows[0];

  // otherwise, create a new user
  const [result] = await db.query(
    'INSERT INTO users (google_id, email, display_name) VALUES (?, ?, ?)',
    [googleId, email, name]
  );

  return {
    id: result.insertId,
    google_id: googleId,
    name,
    email
  };
};


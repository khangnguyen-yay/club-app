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

  const insertId = result.insertId;
  const [newRows] = await db.query('SELECT * FROM users WHERE id = ? LIMIT 1', [insertId]);
  return newRows[0] || {
    id: insertId,
    google_id: googleId,
    display_name: name,
    email
  };
};

export const findUserById = async (id) => {
  const [rows] = await db.query('SELECT * FROM users WHERE id = ? LIMIT 1', [id]);
  return rows[0] || null;
};


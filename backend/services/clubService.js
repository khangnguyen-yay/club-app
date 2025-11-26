import db from '../config/db.js';

export const getAllClubs = async () => {
  const query = 'SELECT * FROM clubs';
  const [rows] = await db.query(query);
  return rows;
};

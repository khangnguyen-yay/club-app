import db from '../config/db.js';

//select all clubs from the database
export const getAllClubs = async () => {
  const query = 'SELECT * FROM clubs';
  const [rows] = await db.query(query);
  return rows;
};

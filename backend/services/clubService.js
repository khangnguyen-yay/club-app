import db from '../config/db.js';

export const getAllClubs = async () => {
  return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM clubs';
    db.query(query, (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
};

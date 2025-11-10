import db from '../config/db.js';

export const getClubs = (req, res) => {
  const query = 'SELECT * FROM clubs';
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
};


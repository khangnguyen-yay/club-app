const db = require('../config/db');

// Get all clubs from the database
exports.getClubs = (req, res) => {
  const query = 'SELECT * FROM clubapp_db'; 
  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

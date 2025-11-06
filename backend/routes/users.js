const express = require('express');
const router = express.Router();
const clubController = require('../controllers/clubController');

// GET /api/clubs -> fetch all clubs
router.get('/clubs', clubController.getClubs);

module.exports = router;

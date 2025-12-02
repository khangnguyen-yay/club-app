import express from 'express';
import { getClubs } from '../controllers/clubController.js';
import { getAllUserClubsWithStatus } from '../services/statusService.js';

const router = express.Router();

// GET /api/clubs -> fetch all clubs
router.get('/clubs', getClubs);

// GET /api/clubsWithStatus -> fetch all clubs along with status
router.get('/clubsWithStatus', getAllUserClubsWithStatus);

export default router;

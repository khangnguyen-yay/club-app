import express from 'express';
import { getClubs } from '../controllers/clubController.js';
//import { getAllUserClubsWithStatus } from '../services/statusService.js';

const router = express.Router();

// GET /api/clubs -> fetch all clubs
router.get('/clubs', getClubs);

export default router;

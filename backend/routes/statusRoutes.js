import express from 'express';
import {getUserStatus} from '../controllers/statusController.js';

const router = express.Router();

router.get('/', getUserStatus);

export default router;
import express from 'express';
import dotenv from 'dotenv';
import clubRoutes from './routes/clubRoutes.js';
import cors from 'cors';

dotenv.config();

const app = express();

// Enable CORS
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

app.use(express.json());
app.use('/api', clubRoutes);

export default app; 

import express from 'express';
import dotenv from 'dotenv';
import clubRoutes from './routes/clubRoutes.js'; 
import cors from 'cors';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
//Enable CORS to handle Access-Control-Allow-Origin issues
app.use(cors({
  origin: 'http://localhost:5173', // frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // allowed HTTP methods
  credentials: true // if you want to allow cookies/auth headers
}));

app.use(express.json());
app.use('/api', clubRoutes);
//app.use(logger);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

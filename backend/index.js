import express from 'express';
import dotenv from 'dotenv';
import clubRoutes from './routes/clubRoutes.js'; 

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/api', clubRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

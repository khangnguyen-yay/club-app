import express from 'express';
import dotenv from 'dotenv';
import clubRoutes from './routes/clubRoutes.js';
import cors from 'cors';
import passport from 'passport';
import session from 'express-session';

import authRoutes from './routes/authRoutes.js';
import './config/passport.js';
import statusRoutes from './routes/statusRoutes.js';

dotenv.config();

const app = express();

// Setup: Enable CORS
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

app.use(express.json());

//Passport and Session for Google OAuth
app.use(session({
  secret: process.env.SESSION_SECRET || 'keyboard cat', //only good for testing, not production
  resave: false,
  saveUninitialized: false
}));

// Initialize passport and session
app.use(passport.initialize());
app.use(passport.session());

//Routes
app.use('/api', clubRoutes);
// Mount auth routes under /auth -> endpoints: /auth/google and /auth/google/callback
app.use('/auth', authRoutes);
app.use('/status', statusRoutes);

// app.get('/protected', (req, res) => {
//   if (req.isAuthenticated && req.isAuthenticated()) {
//     res.send('This is a protected route.');
//   } else {
//     res.status(401).send('Unauthorized');
//   }
// });
//Look into why we need /protected route

export default app; 

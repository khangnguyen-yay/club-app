import { Router } from 'express';
import passport from 'passport';
import { loginSuccess, logout } from '../controllers/authController.js';

const router = Router();

// Start Google OAuth login flow -> GET /auth/google
router.get('/google', passport.authenticate('google', { scope: ['email', 'profile'] }));

// Handle Google callback
router.get( '/google/callback',
    passport.authenticate('google', { failureRedirect: '/' }),
    // On success, passport will attach user to req.user and call next -> loginSuccess
    loginSuccess
);

// Logout route
router.get('/logout', logout); //Not fully set up yet

export default router;

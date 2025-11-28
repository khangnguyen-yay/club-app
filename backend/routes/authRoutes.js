import { Router } from 'express';
import passport from 'passport';
import { loginSuccess, logout } from '../controllers/authController.js';
import { createUser } from '../controllers/userController.js';

const router = Router();

// Start Google OAuth login flow -> GET /auth/google
router.get('/google', passport.authenticate('google', { scope: ['email', 'profile'] }));

// Handle Google callback
router.get( '/google/callback',
    passport.authenticate('google', { failureRedirect: '/' }),
    // On success, passport will attach user to req.user and call next -> loginSuccess
    loginSuccess //replace with findOrCreateUser
);

router.post('/logout', logout);
//router.get('/logout', logout); // legacy convenience; consider removing later

export default router;

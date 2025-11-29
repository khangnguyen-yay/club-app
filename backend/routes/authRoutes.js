import { Router } from 'express';
import passport from 'passport';
import { loginSuccess, logout, getStatus } from '../controllers/authController.js';
import { createUser } from '../controllers/userController.js';
import ensureAuth from '../middlewares/authMiddleware.js';

const router = Router();

const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN;

// Start Google OAuth login flow -> GET /auth/google
router.get('/google', passport.authenticate('google', { scope: ['email', 'profile'] }));

// Handle Google callback
router.get( '/google/callback',
    passport.authenticate('google', { failureRedirect: `${FRONTEND_ORIGIN}/login`, session: true }),
    // On success, passport will attach user to req.user and call next -> loginSuccess
    loginSuccess
);

router.post('/logout', logout);
router.get('/status', ensureAuth, getStatus);

export default router;

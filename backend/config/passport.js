import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as LocalStrategy } from 'passport-local';
import dotenv from 'dotenv';

dotenv.config();

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: 'http://localhost:3000/auth/google/callback'
}, (accessToken, refreshToken, profile, done) => {
  done(null, profile);
  // Connect with database here
  /*
  User.findOrCreate({ googleId: profile.id }, (err, user) => {
    return done(err, user);
  });
  */
}));

passport.use(new LocalStrategy((username, password, done) => {
  // Replace with real user authentication logic
  if (username === 'testuser' && password === 'testpass') {
    return done(null, { username: 'testuser' });
  } else {
    return done(null, false, { message: 'Incorrect credentials.' });
  }
}));

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

export default passport;
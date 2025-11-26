export const loginSuccess = (req, res) => {
  if (!req.user) {
    return res.status(401).json({ message: 'Authentication failed' });
  }

    // For testing: redirect the browser to frontend after every login, but would probably be where 
    //home page is located 
    //redirect('/api/clubs');
  const frontendOrigin = process.env.FRONTEND_ORIGIN || 'http://localhost:5173';
    return res.redirect(frontendOrigin);
};

export const logout = (req, res) => {
  // Passport v0.6 logout requires callback; remove req.user then destroy session.
  req.logout(err => {
    if (err) return res.status(500).json({ message: 'Error logging out' });

    const finish = (statusOk = true) => {
      // Clear session cookie (name depends on express-session default: connect.sid)
      res.clearCookie('connect.sid');
      // Always return JSON response for SPA to handle navigation client-side
      const code = statusOk ? 200 : 500;
      const msg = statusOk ? 'Logged out' : 'Partial logout';
      return res.status(code).json({ message: msg });
    };

    if (req.session) {
      req.session.destroy(sessionErr => {
        if (sessionErr) {
          console.error('Session destroy failed:', sessionErr);
          return finish(false);
        }
        finish(true);
      });
    } else {
      finish(true);
    }
  });
};


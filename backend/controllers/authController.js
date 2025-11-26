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
      const frontendOrigin = process.env.FRONTEND_ORIGIN || 'http://localhost:5173';
      if (wantsJSON(req)) {
        return res.status(statusOk ? 200 : 500).json({ message: statusOk ? 'Logged out' : 'Partial logout' });
      }
      //Redirect to wherever the login page is (https://localhost:5173/login perhaps?)
      return res.redirect(frontendOrigin);
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

function wantsJSON(req) {
  return req.query.format === 'json' || (req.headers.accept && req.headers.accept.includes('application/json'));
}
